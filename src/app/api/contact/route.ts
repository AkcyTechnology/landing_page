import { Resend } from "resend";

const CONTACT_EMAIL = "akcyglobal@gmail.com";

/*
  Resend hesabınızda doğrulanmış bir domain yoksa gönderici olarak
  onboarding@resend.dev kullanılabilir (sadece kendi adresinize gönderir).
  Domain doğruladıktan sonra CONTACT_FROM'u ör. "AKCY <iletisim@akcy.com.tr>" yapın.
*/
const FROM_ADDRESS =
  process.env.CONTACT_FROM?.trim() || "AKCY İletişim <onboarding@resend.dev>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

/*
  Basit IP başına sınır: tek sunucu örneğinde bellek içinde tutulur.
  Serverless ortamda örnekler arasında paylaşılmaz; yine de art arda
  gelen bot isteklerini büyük ölçüde keser.
*/
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  recentRequests.set(ip, timestamps);

  if (recentRequests.size > 1000) {
    for (const [key, times] of recentRequests) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        recentRequests.delete(key);
      }
    }
  }

  return false;
}

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  startTimeline: string;
  message: string;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot: gerçek kullanıcılar bu gizli alanı görmez. Doluysa bot
  // başarılı sanacak şekilde yanıt verip mail göndermeyiz.
  if (asString(raw.website)) {
    return Response.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  const payload: ContactPayload = {
    name: asString(raw.name),
    email: asString(raw.email),
    phone: asString(raw.phone),
    company: asString(raw.company),
    projectType: asString(raw.projectType),
    budget: asString(raw.budget),
    startTimeline: asString(raw.startTimeline),
    message: asString(raw.message),
  };

  // Sunucu tarafı doğrulama: istemci kontrolleri atlanabilir.
  if (!payload.name || !payload.message || !EMAIL_PATTERN.test(payload.email)) {
    return Response.json(
      { error: "Ad, e-posta ve mesaj alanları zorunludur." },
      { status: 400 }
    );
  }

  const { message, ...shortFields } = payload;

  if (
    message.length > MAX_MESSAGE_LENGTH ||
    Object.values(shortFields).some((value) => value.length > MAX_FIELD_LENGTH)
  ) {
    return Response.json(
      { error: "Alanlardan biri izin verilen uzunluğu aşıyor." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY tanımlı değil.");

    return Response.json(
      { error: "Mail servisi yapılandırılmamış." },
      { status: 500 }
    );
  }

  const rows: [string, string][] = [
    ["Ad Soyad", payload.name],
    ["E-posta", payload.email],
    ["Telefon", payload.phone || "—"],
    ["Firma / Marka", payload.company || "—"],
    ["Proje türü", payload.projectType || "—"],
    ["Tahmini bütçe", payload.budget || "—"],
    ["Tahmini başlangıç", payload.startTimeline || "—"],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#06101f;">
      <h2 style="margin:0 0 18px;font-size:18px;">Yeni iletişim formu mesajı</h2>

      <table style="border-collapse:collapse;margin-bottom:20px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 16px 6px 0;color:#6b7280;">${label}</td>
            <td style="padding:6px 0;font-weight:600;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>

      <div style="padding:16px;background:#f7f9fb;border-radius:6px;">
        <div style="margin-bottom:8px;color:#6b7280;">Mesaj</div>
        <div style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(
          payload.message
        )}</div>
      </div>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_EMAIL,
      replyTo: payload.email,
      subject: `Yeni proje talebi — ${payload.name}`,
      html,
    });

    if (error) {
      console.error("Resend gönderim hatası:", error);

      return Response.json(
        { error: "Mail gönderilemedi." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Beklenmeyen mail hatası:", error);

    return Response.json({ error: "Mail gönderilemedi." }, { status: 500 });
  }
}
