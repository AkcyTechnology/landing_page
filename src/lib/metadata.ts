import type { Metadata } from "next";

const DEFAULT_OG_IMAGE = { url: "/images/hero/hero-bg.jpg", alt: "AKCY — Yapay zekâ ve otomasyon çözümleri" };

export function pageMetadata(
  title: string,
  description: string,
  url: string,
  image?: { src: string; alt: string }
): Metadata {
  const fullTitle = `${title} | AKCY`;
  const ogImage = image ? { url: image.src, alt: image.alt } : DEFAULT_OG_IMAGE;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle, description, url, type: "website", locale: "tr_TR", siteName: "AKCY",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}
