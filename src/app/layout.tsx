import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Albert_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "AKCY — İşinizi Akıllı Büyütelim",
    template: "%s | AKCY",
  },
  description:
    "AKCY olarak, işinizi ileri taşıyan ölçeklenebilir, sürdürülebilir ve yenilikçi yazılım çözümleri geliştiriyoruz.",
  keywords: ["yazılım", "teknoloji", "dijital dönüşüm", "web", "mobil", "AKCY"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} ${albertSans.variable} ${cormorant.variable}`}
    >
      <body
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        className="bg-background text-foreground antialiased"
      >
        {children}
      </body>
    </html>
  );
}
