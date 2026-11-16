import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Sora } from "next/font/google";
import Image from "next/image";

import { StructuredData } from "@/lib/StructuredData";
import { baseUrl, localeAlternates } from "@/lib/metadata";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { getAllServices } from "@/data/services";
import { htmlLang, LOCALE_STORAGE_KEY, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import CursorTrail from "@/components/common/CursorTrail/CursorTrail";
import QuoteButton from "@/components/common/QuoteButton/QuoteButton";
import WhatsAppButton from "@/components/common/WhatsAppButton/WhatsAppButton";
import CookieConsent from "@/components/common/CookieConsent/CookieConsent";
import RevealObserver from "@/components/common/RevealObserver/RevealObserver";
import SiteIntro from "@/components/common/SiteIntro/SiteIntro";
import PointerEffects from "@/components/common/PointerEffects/PointerEffects";

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
      images: [{ url: `${baseUrl}/images/hero/hero-bg.jpg`, width: 2000, height: 1200, alt: "AKCY" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.defaultTitle,
      description: t.shortDescription,
      images: [`${baseUrl}/images/hero/hero-bg.jpg`],
    },
  };
}

const bootScript = `try{
var d=document.documentElement,s=sessionStorage,p=location.pathname;
if(p==="/"){try{var r=document.referrer,inside=r&&new URL(r).origin===location.origin;
if(localStorage.getItem("${LOCALE_STORAGE_KEY}")==="en"&&!inside){d.setAttribute("data-redirect","");location.replace("/en/")}}catch(e){}}
if(!d.hasAttribute("data-redirect")){
if(/^\\/(en\\/?)?(index\\.html)?$/.test(p)&&!s.getItem("akcy-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-intro","");d.setAttribute("data-loaded","");s.setItem("akcy-intro","1");s.setItem("akcy-loaded","1")}
else if(s.getItem("akcy-loaded")){d.setAttribute("data-loaded","")}else{s.setItem("akcy-loaded","1")}}
}catch(e){}`;

export default function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale).meta;
  const intro = getDictionary(locale).intro;
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <StructuredData data={siteSchema} />
        {/*
          Sayfa çizilmeden önce çalışır:
          1. Daha önce İngilizceyi seçmiş biri dışarıdan Türkçe ana sayfaya
             gelirse hemen /en/ adresine alınır (intro Türkçe başlayıp yarıda
             kesilmesin diye bu karar burada verilir).
          2. Ana sayfa oturumda ilk kez açılıyorsa (ve hareket azaltma
             kapalıysa) yükleme ekranı yerine yazı introsu gösterilir.
          3. Diğer sayfalarda yükleme ekranı oturum başına bir kez görünür.
          Betik çalışmazsa intro hiç görünmez, içerik doğrudan açılır.
        */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {/* Açılış ekranı: CSS ile kendiliğinden kaybolur (JS gerekmez), tıklamayı engellemez */}
        <div className="site-loader" aria-hidden="true">
          <div className="site-loader__inner">
            <svg className="site-loader__net" viewBox="0 0 160 120" width="160" height="120">
              <g className="site-loader__lines">
                <line x1="80" y1="60" x2="36" y2="30" pathLength={1} style={{ animationDelay: "0.15s" }} />
                <line x1="80" y1="60" x2="124" y2="26" pathLength={1} style={{ animationDelay: "0.20s" }} />
                <line x1="80" y1="60" x2="30" y2="88" pathLength={1} style={{ animationDelay: "0.25s" }} />
                <line x1="80" y1="60" x2="132" y2="92" pathLength={1} style={{ animationDelay: "0.30s" }} />
                <line x1="80" y1="60" x2="80" y2="14" pathLength={1} style={{ animationDelay: "0.35s" }} />
                <line x1="80" y1="60" x2="80" y2="106" pathLength={1} style={{ animationDelay: "0.40s" }} />
                <line x1="36" y1="30" x2="80" y2="14" pathLength={1} style={{ animationDelay: "0.45s" }} />
                <line x1="124" y1="26" x2="80" y2="14" pathLength={1} style={{ animationDelay: "0.50s" }} />
                <line x1="30" y1="88" x2="80" y2="106" pathLength={1} style={{ animationDelay: "0.55s" }} />
                <line x1="132" y1="92" x2="80" y2="106" pathLength={1} style={{ animationDelay: "0.60s" }} />
                <line x1="36" y1="30" x2="30" y2="88" pathLength={1} style={{ animationDelay: "0.65s" }} />
                <line x1="124" y1="26" x2="132" y2="92" pathLength={1} style={{ animationDelay: "0.70s" }} />
              </g>
              <g className="site-loader__nodes">
                <circle cx="80" cy="60" r="7" style={{ animationDelay: "0.05s" }} />
                <circle cx="36" cy="30" r="4.5" style={{ animationDelay: "0.37s" }} />
                <circle cx="124" cy="26" r="5" style={{ animationDelay: "0.44s" }} />
                <circle cx="30" cy="88" r="5" style={{ animationDelay: "0.51s" }} />
                <circle cx="132" cy="92" r="4.5" style={{ animationDelay: "0.58s" }} />
                <circle cx="80" cy="14" r="4" style={{ animationDelay: "0.65s" }} />
                <circle cx="80" cy="106" r="4" style={{ animationDelay: "0.72s" }} />
              </g>
            </svg>
            <Image src="/images/brand/logo-sm.webp" alt="" width={132} height={75} className="site-loader__logo" priority />
          </div>
        </div>
        <SiteIntro words={intro.words} areas={intro.areas} />
        <LocaleProvider locale={locale}>
          <CursorTrail />
          <PointerEffects />

          <Header />

          <main>{children}</main>

          <Footer />

          <WhatsAppButton />
          <QuoteButton />
          <CookieConsent />
          <RevealObserver />
        </LocaleProvider>
      </body>
    </html>
  );
}
