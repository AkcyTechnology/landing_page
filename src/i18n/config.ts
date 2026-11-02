/*
  Dil ayarları ve adres eşlemesi.
  - Türkçe varsayılan dildir ve adresleri değişmez (/hizmetler/web-gelistirme).
  - İngilizce sayfalar /en altında, çevrilmiş adreslerle yayınlanır
    (/en/services/web-development).
  - Kod içindeki bütün site içi bağlantılar Türkçe (kanonik) adresle yazılır;
    localizePath() bunları seçili dile çevirir.
*/

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const htmlLang: Record<Locale, string> = { tr: "tr", en: "en" };
export const ogLocale: Record<Locale, string> = { tr: "tr_TR", en: "en_US" };
export const dateLocale: Record<Locale, string> = { tr: "tr-TR", en: "en-GB" };

export const LOCALE_STORAGE_KEY = "akcy-locale";

/* Birinci adres parçası: Türkçe → İngilizce */
const SEGMENTS: Record<string, string> = {
  hakkimizda: "about",
  hizmetler: "services",
  projelerimiz: "projects",
  blog: "blog",
  iletisim: "contact",
  privacy: "privacy",
  kvkk: "kvkk",
  cookies: "cookies",
};

/* Detay sayfası adresleri: Türkçe slug → İngilizce slug */
const SLUGS: Record<string, Record<string, string>> = {
  hizmetler: {
    "yapay-zeka": "ai-solutions",
    "dijital-otomasyon": "business-process-automation",
    "ai-icerik-uretimi": "ai-content-production",
    "web-gelistirme": "web-development",
    "mobil-uygulamalar": "mobile-apps",
    "ui-ux-tasarim": "ui-ux-design",
    "kurumsal-yazilim": "custom-software",
  },
  projelerimiz: {
    "cakiroglu-savunma": "cakiroglu-savunma",
    "gokce-kombi": "gokce-kombi",
    "concept-web-platformu": "concept-web-platform",
    "concept-mobil-uygulama": "concept-mobile-app",
    "concept-tasarim-sistemi": "concept-design-system",
    "concept-yapay-zeka-asistani": "concept-ai-assistant",
    "concept-otomasyon-paneli": "concept-automation-dashboard",
  },
  blog: {
    "web-tipografisi-rehberi": "web-typography-guide",
    "core-web-vitals-rehberi": "core-web-vitals-guide",
    "kurumsal-web-sitesi-yaptirmadan-once": "before-building-a-corporate-website",
    "mobil-oncelikli-tasarim-rehberi": "mobile-first-design-guide",
    "yapay-zeka-ile-is-surecleri-otomasyonu": "business-process-automation-with-ai",
    "wordpress-ile-kurumsal-web-sitesi": "corporate-website-with-wordpress",
    "kurumsal-yapay-zeka-asistani-nasil-kurulur": "how-to-build-a-corporate-ai-assistant",
    "sirket-surec-otomasyonu-rehberi": "company-process-automation-guide",
    "kobiler-icin-yapay-zeka-yol-haritasi": "ai-roadmap-for-smes",
    "yapay-zeka-ile-belge-isleme": "document-processing-with-ai",
    "wordpress-site-bakimi-kontrol-listesi": "wordpress-maintenance-checklist",
    "n8n-ile-is-akisi-otomasyonu": "workflow-automation-with-n8n",
  },
};

const invert = (map: Record<string, string>) =>
  Object.fromEntries(Object.entries(map).map(([key, value]) => [value, key]));

const SEGMENTS_EN = invert(SEGMENTS);
const SLUGS_EN: Record<string, Record<string, string>> = Object.fromEntries(
  Object.entries(SLUGS).map(([section, map]) => [section, invert(map)])
);

/** Türkçe slug'ın İngilizce karşılığı (bölüm: hizmetler | projelerimiz | blog) */
export function localizeSlug(section: keyof typeof SLUGS | string, slug: string, locale: Locale): string {
  if (locale === "tr") return slug;
  return SLUGS[section]?.[slug] ?? slug;
}

/** İngilizce slug'dan Türkçe (kanonik) slug */
export function canonicalSlug(section: string, slug: string, locale: Locale): string | undefined {
  if (locale === "tr") return slug;
  return SLUGS_EN[section]?.[slug];
}

function split(href: string) {
  const match = href.match(/^([^?#]*)(.*)$/);
  return { path: match?.[1] ?? href, rest: match?.[2] ?? "" };
}

/**
 * Türkçe (kanonik) site içi adresi seçili dile çevirir.
 * Dış bağlantılar, mailto/tel ve yalnızca # ile başlayan adresler olduğu gibi kalır.
 */
export function localizePath(href: string, locale: Locale): string {
  if (locale === "tr" || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) return href;
  if (href.startsWith("/en/") || href === "/en") return href;

  const { path, rest } = split(href);
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return `/en/${rest}`;

  const [section, slug, ...more] = parts;
  const segment = SEGMENTS[section];
  if (!segment) return `/en${path}${rest}`;

  const translated = [segment];
  if (slug) translated.push(localizeSlug(section, slug, "en"));
  translated.push(...more);
  const trailing = path.endsWith("/") ? "/" : "";
  return `/en/${translated.join("/")}${trailing}${rest}`;
}

/** Adresin dili */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

/** Herhangi bir dildeki adresi Türkçe (kanonik) adrese çevirir */
export function canonicalPath(pathname: string): string {
  if (localeFromPath(pathname) === "tr") return pathname;
  const { path, rest } = split(pathname);
  const parts = path.replace(/^\/en/, "").split("/").filter(Boolean);
  if (parts.length === 0) return `/${rest}`;
  const [segment, slug, ...more] = parts;
  const section = SEGMENTS_EN[segment] ?? segment;
  const translated = [section];
  if (slug) translated.push(canonicalSlug(section, slug, "en") ?? slug);
  translated.push(...more);
  const trailing = path.endsWith("/") ? "/" : "";
  return `/${translated.join("/")}${trailing}${rest}`;
}

/** Bulunulan sayfanın diğer dildeki karşılığı */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localizePath(canonicalPath(pathname), target);
}
