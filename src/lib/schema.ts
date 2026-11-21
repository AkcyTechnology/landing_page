/*
  Schema.org (JSON-LD) yardımcıları.
  Kuruluş ve web sitesi tek bir @id ile tanımlanır; sayfa şemaları bu @id'lere
  bağlanır. Böylece arama motorları ve yapay zekâ destekli arama sistemleri,
  hizmetleri, yazıları ve projeleri aynı kuruluşla ilişkilendirebilir.
  Yalnızca sitede doğrulanmış bilgiler kullanılır (adres, kuruluş yılı vb. eklenmez).
*/
import { localizePath, type Locale } from "@/i18n/config";
import { baseUrl } from "@/lib/metadata";
import type { FaqItem } from "@/data/blog";

export const BRAND_NAME = "AKCY Technologies";
export const BRAND_SHORT_NAME = "AKCY";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/contact";
export { CONTACT_EMAIL, CONTACT_PHONE };
export const SAME_AS = ["https://www.instagram.com/akcytechnology/"];

export const ORGANIZATION_ID = `${baseUrl}/#organization`;
export const WEBSITE_ID = `${baseUrl}/#website`;

const schemaLanguage: Record<Locale, string> = { tr: "tr-TR", en: "en" };

type Schema = Record<string, unknown>;

/** Site içi (Türkçe kanonik) adresi seçili dilde mutlak adrese çevirir */
export function absoluteUrl(path: string, locale: Locale): string {
  const localized = localizePath(path, locale);
  return `${baseUrl}${localized.endsWith("/") ? localized : `${localized}/`}`;
}

export function organizationSchema(locale: Locale, description: string, knowsAbout: string[]): Schema {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: BRAND_NAME,
    alternateName: BRAND_SHORT_NAME,
    url: `${baseUrl}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#logo`,
      url: `${baseUrl}/images/brand/akcy_logo.png`,
      caption: BRAND_NAME,
    },
    image: { "@id": `${baseUrl}/#logo` },
    description,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    sameAs: SAME_AS,
    knowsAbout,
    areaServed: { "@type": "Country", name: locale === "tr" ? "Türkiye" : "Turkey" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: locale === "tr" ? "müşteri hizmetleri" : "customer service",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      availableLanguage: ["Turkish", "English"],
    },
  };
}

export function websiteSchema(locale: Locale, description: string): Schema {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${baseUrl}/`,
    name: BRAND_NAME,
    alternateName: BRAND_SHORT_NAME,
    description,
    inLanguage: ["tr-TR", "en"],
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale): Schema {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
    })),
  };
}

export function faqSchema(items: FaqItem[]): Schema {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function webPageSchema(options: {
  path: string;
  locale: Locale;
  name: string;
  description: string;
  type?: string;
  about?: Schema;
}): Schema {
  const url = absoluteUrl(options.path, options.locale);
  return {
    "@type": options.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    inLanguage: schemaLanguage[options.locale],
    isPartOf: { "@id": WEBSITE_ID },
    ...(options.about ? { about: options.about } : {}),
  };
}

export function serviceSchema(options: {
  path: string;
  locale: Locale;
  name: string;
  description: string;
  offerings: string[];
  audience?: string[];
}): Schema {
  const url = absoluteUrl(options.path, options.locale);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: options.name,
    serviceType: options.name,
    description: options.description,
    url,
    inLanguage: schemaLanguage[options.locale],
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: options.locale === "tr" ? "Türkiye" : "Turkey" },
    availableLanguage: ["Turkish", "English"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: options.name,
      itemListElement: options.offerings.map((offering) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offering },
      })),
    },
    ...(options.audience?.length
      ? { audience: { "@type": "BusinessAudience", audienceType: options.audience.join("; ") } }
      : {}),
  };
}

/** Birden fazla şemayı tek bir @graph bloğunda birleştirir */
export function graph(...nodes: (Schema | false | undefined | null)[]): Schema {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

export { schemaLanguage };
