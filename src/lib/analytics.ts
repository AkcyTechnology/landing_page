/*
  GA4 olay gönderimi. gtag yalnızca ziyaretçi çerez onayı verdiyse yüklenir
  (CookieConsent); yüklenmemişse bu fonksiyon hiçbir şey yapmaz.
*/
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}

/*
  Sitedeki bağlantı tıklamalarını dönüşüm olaylarına çevirir:
  telefon, e-posta, WhatsApp, teklif (iletişim sayfası), proje ve hizmet detayı.
*/
export function trackLinkClick(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href") ?? "";
  const label = anchor.textContent?.trim().slice(0, 80) || undefined;

  if (href.startsWith("tel:")) return trackEvent("click_phone", { link_text: label });
  if (href.startsWith("mailto:")) return trackEvent("click_email", { link_text: label });
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return trackEvent("click_whatsapp");

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return;
  }
  if (url.origin !== window.location.origin) return;

  const path = url.pathname.replace(/^\/en(?=\/)/, "");
  if (/^\/(iletisim|contact|teklif|quote)\/?$/.test(path)) return trackEvent("click_quote", { link_text: label });
  if (/^\/(projelerimiz|projects)\/[^/]+\/?$/.test(path)) return trackEvent("view_project_click", { project: path });
  if (/^\/(hizmetler|services)\/?$/.test(path)) return trackEvent("view_service_click", { service: url.hash.slice(1) || undefined });
}
