import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";

import { StructuredData } from "@/lib/StructuredData";
import { baseUrl, localeAlternates } from "@/lib/metadata";
import { htmlLang, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import LocalePreference from "@/i18n/LocalePreference";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import CursorTrail from "@/components/common/CursorTrail/CursorTrail";
import QuoteButton from "@/components/common/QuoteButton/QuoteButton";
import PointerEffects from "@/components/common/PointerEffects/PointerEffects";

import "@/app/globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-brand",
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
    authors: [{ name: "AKCY" }],
    creator: "AKCY",
    publisher: "AKCY",
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
      siteName: "AKCY",
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

export default function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale).meta;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AKCY",
    url: baseUrl,
    logo: `${baseUrl}/images/brand/logo.svg`,
    description: t.shortDescription,
    sameAs: ["https://www.instagram.com/akcytechnology/"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "akcyglobal@gmail.com",
      telephone: "+905526290420",
      availableLanguage: ["Turkish", "English"],
    },
  };

  return (
    <html lang={htmlLang[locale]} className={sans.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#06101f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <StructuredData data={organizationSchema} />
        {/* Yükleme ekranı oturum başına bir kez gösterilir */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('akcy-loaded')){document.documentElement.setAttribute('data-loaded','')}else{sessionStorage.setItem('akcy-loaded','1')}}catch(e){}",
          }}
        />
      </head>
      <body>
        {/* Açılış ekranı: CSS ile kendiliğinden kaybolur (JS gerekmez), tıklamayı engellemez */}
        <div className="site-loader" aria-hidden="true">
          <div className="site-loader__inner">
            <Image src="/images/brand/logo.svg" alt="" width={132} height={75} className="site-loader__logo" priority />
            <span className="site-loader__bar">
              <i />
            </span>
          </div>
        </div>
        <LocaleProvider locale={locale}>
          <LocalePreference />
          <CursorTrail />
          <PointerEffects />

          <Header />

          <main>{children}</main>

          <Footer />

          <QuoteButton />
        </LocaleProvider>
      </body>
    </html>
  );
}
