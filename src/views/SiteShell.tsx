import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Sora } from "next/font/google";

import { StructuredData } from "@/lib/StructuredData";
import { baseUrl, DEFAULT_OG_IMAGE, localeAlternates } from "@/lib/metadata";
import { rssPath } from "@/lib/rss";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { getAllServices } from "@/data/services";
import { htmlLang, LOCALE_STORAGE_KEY, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import ContactDock from "@/components/common/ContactDock/ContactDock";
import FaqChat from "@/components/common/FaqChat/FaqChat";
import CookieConsent from "@/components/common/CookieConsent/CookieConsent";
import RevealObserver from "@/components/common/RevealObserver/RevealObserver";

import "@/app/globals.css";

/* Gövde metinleri: Geist */
const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-brand",
  display: "swap",
});

/* Başlık fontu: geometrik yapısı logodaki keskin "A" ile uyumlu */
const display = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

/* Kök düzenin varsayılan meta bilgileri (sayfalar kendi değerleriyle ezer) */
export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(baseUrl),
    title: { default: t.defaultTitle, template: "%s | AKCY" },
    description: t.defaultDescription,
    keywords: t.keywords,
    applicationName: "AKCY Technologies",
    authors: [{ name: "AKCY Technologies", url: `${baseUrl}/` }],
    creator: "AKCY Technologies",
    publisher: "AKCY Technologies",
    // Search Console / Bing Webmaster doğrulaması: değerler .env'de tanımlıysa etiket üretilir
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    alternates: localeAlternates("/", locale),
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: locale === "tr" ? `${baseUrl}/` : `${baseUrl}/en/`,
      siteName: "AKCY Technologies",
      title: t.defaultTitle,
      description: t.shortDescription,
      images: [{ ...DEFAULT_OG_IMAGE[locale], url: `${baseUrl}${DEFAULT_OG_IMAGE[locale].url}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.defaultTitle,
      description: t.shortDescription,
      images: [`${baseUrl}${DEFAULT_OG_IMAGE[locale].url}`],
    },
  };
}

/* Daha önce İngilizceyi seçmiş biri dışarıdan Türkçe ana sayfaya gelirse
   sayfa çizilmeden /en/ adresine alınır. */
const bootScript = `try{
var p=location.pathname;
if(p==="/"){var r=document.referrer,inside=r&&new URL(r).origin===location.origin;
if(localStorage.getItem("${LOCALE_STORAGE_KEY}")==="en"&&!inside){location.replace("/en/")}}
}catch(e){}`;

export default function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale).meta;
  /* Kuruluş + web sitesi: diğer sayfa şemaları bu @id'lere bağlanır */
  const siteSchema = graph(
    organizationSchema(
      locale,
      t.shortDescription,
      getAllServices(locale).map((service) => service.title)
    ),
    websiteSchema(locale, t.shortDescription)
  );

  return (
    <html lang={htmlLang[locale]} className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#06101f" />
        <link rel="alternate" type="application/rss+xml" title={`AKCY Blog (${locale.toUpperCase()})`} href={rssPath(locale)} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <StructuredData data={siteSchema} />
        {/* Sayfa çizilmeden önce dil tercihine göre yönlendirme (bkz. bootScript) */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <LocaleProvider locale={locale}>
          <Header />

          <main>{children}</main>

          <Footer />

          {/* Tek iletişim butonu (WhatsApp, SSS, teklif, telefon) + soru-cevap penceresi */}
          <ContactDock />
          <FaqChat />
          <CookieConsent />
          <RevealObserver />
        </LocaleProvider>
      </body>
    </html>
  );
}
