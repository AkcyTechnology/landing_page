/*
  Hizmetler sayfasının metinleri (tek sayfa; hizmetlerin ayrı detay sayfası yoktur).
  Her hizmet kartı, sayfada kendi bağlantısıyla (#slug) bulunur. slug her zaman
  Türkçe (kanonik) yazılır; İngilizce bağlantı localizeSlug() ile üretilir.
*/

import type { Locale } from "@/i18n/config";

export type ServiceTone = "light" | "navy" | "teal" | "mint";

/* Kart görselleri (Unsplash; kaynaklar public/images/solutions/SOURCES.md) — iki dilde ortak */
export const servicePhotos: Record<string, string> = {
  "web-gelistirme": "/images/services/web.jpg",
  "ui-ux-tasarim": "/images/services/uiux.jpg",
  "mobil-uygulamalar": "/images/services/mobile.jpg",
  "kurumsal-yazilim": "/images/solutions/business.jpg",
  "dijital-otomasyon": "/images/services/automation.jpg",
  "yapay-zeka": "/images/services/ai.jpg",
  "ai-icerik-uretimi": "/images/services/ai-content.jpg",
};

export interface ServicesPageContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    arcLabel: string;
  };
  servicesLabel: string;
  quoteCta: string;
  flip: { show: string; hide: string; overview: string; more: string };
  groups: {
    title: string;
    items: { slug: string; title: string; description: string; tone: ServiceTone }[];
  }[];
  cta: { title: string; description: string; button: string };
}

export const servicesPageContent: Record<Locale, ServicesPageContent> = {
  tr: {
    meta: {
      title: "Hizmetler",
      description:
        "Web, mobil, özel yazılım, yapay zekâ ve otomasyon çözümlerini tek ekipte geliştiriyoruz. İhtiyacı anlamaktan yayına ve sonrasına kadar yanınızdayız.",
    },
    hero: {
      eyebrow: "Neler yapıyoruz?",
      title: "Fikirden yayına, tek ekip.",
      description:
        "İhtiyacı anlamadan tasarım ve geliştirmeye, yayına alma sürecinden sonrasına kadar dijital ürününüzün tüm aşamalarında yanınızdayız. Web, mobil, özel yazılım, yapay zekâ ve otomasyon çözümlerini tek ekipte geliştiriyoruz.",
      primaryCta: "Hizmetleri incele",
      secondaryCta: "Projenizi konuşalım",
      arcLabel: "Hizmetlerimiz",
    },
    servicesLabel: "hizmet",
    quoteCta: "Teklif al",
    flip: { show: "Detayları gör", hide: "Görsele dön", overview: "Genel bakış", more: "Ayrıca" },
    groups: [
      {
        title: "Dijital Ürünler",
        items: [
          { slug: "web-gelistirme", title: "Web Geliştirme", description: "Modern, hızlı ve ölçeklenebilir web siteleri ve web uygulamaları geliştiriyoruz.", tone: "navy" },
          { slug: "ui-ux-tasarim", title: "UI/UX Tasarım", description: "Kullanıcı ihtiyaçlarını merkeze alan, anlaşılır ve güçlü dijital deneyimler tasarlıyoruz.", tone: "light" },
          { slug: "mobil-uygulamalar", title: "Mobil Uygulamalar", description: "iOS ve Android için kullanıcı odaklı mobil uygulamalar geliştiriyoruz.", tone: "teal" },
        ],
      },
      {
        title: "İşletmelere Özel Çözümler",
        items: [
          { slug: "kurumsal-yazilim", title: "Kuruma Özel Yazılım", description: "Hazır yazılımların karşılamadığı iş süreçleri için işletmenize özel yönetim sistemleri geliştiriyoruz.", tone: "light" },
          { slug: "dijital-otomasyon", title: "Dijital Otomasyon", description: "Tekrarlayan işleri azaltan, ekiplerin ve dijital sistemlerin birlikte çalışmasını sağlayan iş akışları kuruyoruz.", tone: "navy" },
        ],
      },
      {
        title: "Yapay Zekâ ile Yeni Olanaklar",
        items: [
          { slug: "yapay-zeka", title: "Yapay Zekâ Çözümleri", description: "İşletmenizin ihtiyaçlarına uygun yapay zekâ uygulamaları ve akıllı sistemler geliştiriyoruz.", tone: "teal" },
          { slug: "ai-icerik-uretimi", title: "AI İçerik Üretimi", description: "Markalar için yapay zekâ destekli görsel ve dijital içerik üretim süreçleri tasarlıyoruz.", tone: "mint" },
        ],
      },
    ],
    cta: {
      title: "Fikrinizi birlikte hayata geçirelim",
      description: "İhtiyacınızı konuşalım, size uygun dijital çözümün kapsamını birlikte belirleyelim.",
      button: "Projenizi konuşalım",
    },
  },
  en: {
    meta: {
      title: "Services",
      description:
        "We build web, mobile, custom software, AI and automation solutions in one team. We’re with you from understanding the need to launch and beyond.",
    },
    hero: {
      eyebrow: "What we do",
      title: "From idea to launch, one team.",
      description:
        "From understanding the need through design and development to launch and beyond, we’re with you at every stage of your digital product. We build web, mobile, custom software, AI and automation solutions in one team.",
      primaryCta: "Explore services",
      secondaryCta: "Let’s talk about your project",
      arcLabel: "Our services",
    },
    servicesLabel: "services",
    quoteCta: "Get a quote",
    flip: { show: "See details", hide: "Back to image", overview: "Overview", more: "Also" },
    groups: [
      {
        title: "Digital Products",
        items: [
          { slug: "web-gelistirme", title: "Web Development", description: "We build modern, fast and scalable websites and web applications.", tone: "navy" },
          { slug: "ui-ux-tasarim", title: "UI/UX Design", description: "We design clear, powerful digital experiences built around user needs.", tone: "light" },
          { slug: "mobil-uygulamalar", title: "Mobile Apps", description: "We build user-focused mobile apps for iOS and Android.", tone: "teal" },
        ],
      },
      {
        title: "Custom Solutions for Businesses",
        items: [
          { slug: "kurumsal-yazilim", title: "Custom Software", description: "We build management systems tailored to your business for processes that off-the-shelf software can’t handle.", tone: "light" },
          { slug: "dijital-otomasyon", title: "Digital Automation", description: "We set up workflows that cut repetitive work and help teams and digital systems work together.", tone: "navy" },
        ],
      },
      {
        title: "New Possibilities with AI",
        items: [
          { slug: "yapay-zeka", title: "AI Solutions", description: "We build AI applications and intelligent systems suited to your business needs.", tone: "teal" },
          { slug: "ai-icerik-uretimi", title: "AI Content Production", description: "We design AI-assisted visual and digital content production processes for brands.", tone: "mint" },
        ],
      },
    ],
    cta: {
      title: "Let’s bring your idea to life together",
      description: "Let’s talk about what you need and define the scope of the right digital solution together.",
      button: "Let’s talk about your project",
    },
  },
};
