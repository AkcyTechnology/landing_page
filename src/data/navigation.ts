import type { Locale } from "@/i18n/config";
import { getAllServices } from "./services";

/* Menü başlıkları sözlükten (t.nav) okunur; adresler Türkçe (kanonik) yazılır */
export type NavKey = "home" | "services" | "projects" | "about" | "blog" | "contact";

export function getServiceLinks(locale: Locale = "tr") {
  return getAllServices(locale).map((service) => ({
    number: service.number,
    title: service.title,
    description: service.shortDescription,
    href: `/hizmetler/${service.slug}`,
  }));
}

export const navigation: { key: NavKey; href: string; hasChildren?: boolean }[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/hizmetler", hasChildren: true },
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
