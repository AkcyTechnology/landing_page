import type { Metadata } from "next";

import { localizePath, ogLocale, type Locale } from "@/i18n/config";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://akcy.com.tr";

const DEFAULT_OG_IMAGE: Record<Locale, { url: string; alt: string }> = {
  tr: { url: "/images/hero/hero-bg.jpg", alt: "AKCY — Yapay zekâ ve otomasyon çözümleri" },
  en: { url: "/images/hero/hero-bg.jpg", alt: "AKCY — AI and automation solutions" },
};

/* Statik yayında sayfalar "/" ile biten klasör adresleriyle sunulur */
function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Sayfanın kendi dilindeki adresi (canonical) ve diğer dildeki karşılığı (hreflang).
 * path: Türkçe (kanonik) adres, ör. "/hizmetler/web-gelistirme"
 */
export function localeAlternates(path: string, locale: Locale): Metadata["alternates"] {
  const tr = withSlash(path);
  const en = withSlash(localizePath(path, "en"));
  return {
    canonical: locale === "tr" ? tr : en,
    languages: { tr, en, "x-default": tr },
  };
}

export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path: string,
  image?: { src: string; alt: string },
  options: { absoluteTitle?: string; type?: "website" | "article" } = {}
): Metadata {
  const fullTitle = options.absoluteTitle ?? `${title} | AKCY`;
  const ogImage = image ? { url: image.src, alt: image.alt } : DEFAULT_OG_IMAGE[locale];
  const alternates = localeAlternates(path, locale);
  return {
    title: { absolute: fullTitle },
    description,
    alternates,
    openGraph: {
      title: fullTitle,
      description,
      url: alternates?.canonical as string,
      type: options.type ?? "website",
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === "tr" ? "en" : "tr"]],
      siteName: "AKCY",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}
