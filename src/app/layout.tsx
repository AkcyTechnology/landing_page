import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { StructuredData } from "@/lib/StructuredData";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import CursorTrail from "@/components/common/CursorTrail/CursorTrail";
import WhatsAppButton from "@/components/common/WhatsAppButton/WhatsAppButton";
import PointerEffects from "@/components/common/PointerEffects/PointerEffects";
import "./globals.css";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://akcy.com.tr";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Yapay Zekâ ve Otomasyon Çözümleri | AKCY",
    template: "%s | AKCY",
  },
  description:
    "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz. Küçük ekiplerden kurumsal yapılara.",
  keywords: [
    "yapay zekâ",
    "otomasyon",
    "dijital ürünler",
    "web geliştirme",
    "mobil uygulama",
    "AI çözümleri",
    "dijital dönüşüm",
  ],
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
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: baseUrl,
    siteName: "AKCY",
    title: "Yapay Zekâ ve Otomasyon Çözümleri | AKCY",
    description:
      "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz.",
    images: [
      {
        url: `${baseUrl}/images/hero/hero-bg.jpg`,
        width: 2000,
        height: 1200,
        alt: "AKCY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yapay Zekâ ve Otomasyon Çözümleri | AKCY",
    description:
      "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz.",
    images: [`${baseUrl}/images/hero/hero-bg.jpg`],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AKCY",
  url: baseUrl,
  logo: `${baseUrl}/images/brand/logo.svg`,
  description:
    "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz.",
  sameAs: [
    "https://linkedin.com/company/akcy-technologies",
    "https://instagram.com/akcytech",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "akcyglobal@gmail.com",
    telephone: "+905526290420",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={sans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#06101f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <StructuredData data={organizationSchema} />
      </head>
      <body>
        <CursorTrail />
        <PointerEffects />

        <Header />

        <main>{children}</main>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}