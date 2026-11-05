import { localizeSlug, type Locale } from "@/i18n/config";
import { getAllServices } from "./services";

/* Menü başlıkları sözlükten (t.nav) okunur; adresler Türkçe (kanonik) yazılır */
export type NavKey = "home" | "services" | "projects" | "about" | "blog" | "contact";

/** Hizmetler tek sayfadır: her hizmet o sayfadaki kartına (#bağlantı) gider */
export function serviceHref(slug: string, locale: Locale = "tr") {
  return `/hizmetler#${localizeSlug("hizmetler", slug, locale)}`;
}

export function getServiceLinks(locale: Locale = "tr") {
  return getAllServices(locale).map((service) => ({
    number: service.number,
    title: service.title,
    description: service.shortDescription,
    href: serviceHref(service.slug, locale),
  }));
}

export const navigation: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/hizmetler" },
  { key: "projects", href: "/projelerimiz" },
  { key: "about", href: "/hakkimizda" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/iletisim" },
];

export const footerNavigation: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/hakkimizda" },
  { key: "services", href: "/hizmetler" },
  { key: "projects", href: "/projelerimiz" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/iletisim" },
];
