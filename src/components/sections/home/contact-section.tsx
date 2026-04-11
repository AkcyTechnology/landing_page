"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="iletisim" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-500/8 blur-[120px] pointer-events-none" />

      <Container className="relative">
        <div className="flex flex-col gap-14">
          <SectionHeading
            title="Bizimle İletişime"
            titleHighlight="Geçin"
            description="Projenizi birlikte şekillendirelim ve ihtiyaçlarınıza uygun en doğru çözümü oluşturalım."
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
            {/* Form */}
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-card/60 p-6 backdrop-blur-sm sm:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-white/60">Ad</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Adınız"
                        required
                        className="input-dark h-11 rounded-xl px-4 text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-white/60">Soyad</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Soyadınız"
                        required
                        className="input-dark h-11 rounded-xl px-4 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/60">E-posta</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ornek@sirket.com"
                      required
                      className="input-dark h-11 rounded-xl px-4 text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/60">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+90 555 000 00 00"
                      className="input-dark h-11 rounded-xl px-4 text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/60">Mesajınız</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Projeniz veya ihtiyacınız hakkında kısaca bilgi verin..."
                      rows={4}
                      required
                      className="input-dark resize-none rounded-xl px-4 py-3 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-medium text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(236,72,153,0.45)]"
                  >
                    Gönder
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>

                  <p className="text-center text-xs text-white/30">
                    Bilgileriniz güvenli şekilde saklanır. KVKK uyumludur.
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Mesajınız Alındı!</h3>
                    <p className="mt-1 text-sm text-muted">En kısa sürede sizinle iletişime geçeceğiz.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: visual + info */}
            <div className="flex flex-col gap-6">
              {/* Info cards */}
              {[
                {
                  icon: "mail",
                  label: "E-posta",
                  value: "merhaba@akcy.tech",
                  sub: "7/24 cevap veriyoruz",
                },
                {
                  icon: "map",
                  label: "Konum",
                  value: "Türkiye",
                  sub: "Uzaktan & yüz yüze çalışıyoruz",
                },
                {
                  icon: "clock",
                  label: "Yanıt Süresi",
                  value: "< 24 saat",
                  sub: "Ortalama yanıt süremiz",
                },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-card/60 p-5 backdrop-blur-sm card-glow"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-light">
                    {info.icon === "mail" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}
                    {info.icon === "map" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    )}
                    {info.icon === "clock" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted">{info.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-white">{info.value}</p>
                    <p className="mt-0.5 text-xs text-muted/70">{info.sub}</p>
                  </div>
                </div>
              ))}

              {/* Visual decorative card */}
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-purple-500/15 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent min-h-[140px]">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
                <div className="relative p-6 flex flex-col gap-2">
                  <p className="text-sm font-semibold text-white">Ücretsiz Danışma</p>
                  <p className="text-xs text-muted">
                    İlk görüşme tamamen ücretsiz. Projenizi anlatın, size en uygun
                    çözümü birlikte tasarlayalım.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
