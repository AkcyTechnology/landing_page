export type ProjectCategory = "web" | "mobil" | "ui-ux" | "ai" | "otomasyon";

export interface ProjectCategoryDef {
  slug: ProjectCategory;
  label: string;
}

export const projectCategories: ProjectCategoryDef[] = [
  { slug: "web", label: "Web" },
  { slug: "mobil", label: "Mobil" },
  { slug: "ui-ux", label: "UI/UX" },
  { slug: "ai", label: "AI" },
  { slug: "otomasyon", label: "Otomasyon" },
];

export interface CaseStudySection {
  title: string;
  text: string;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
  /** Dikey (telefon) ekran görüntüsü: kırpılmadan, telefon oranında gösterilir. */
  portrait?: boolean;
}

export interface FeatureHighlight {
  title: string;
  description: string;
  steps: { number: string; title: string }[];
  image: CaseStudyImage;
}

export interface ProjectDef {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  sector?: string;
  platform?: string;
  summary: string;
  tagline?: string;
  liveUrl?: string;
  cover: { src: string; alt: string };
  gallery: CaseStudyImage[];
  servicesUsed: string[];
  size?: "large" | "standard";
  problem?: string;
  ourRole?: string[];
  approach?: string;
  caseStudy?: CaseStudySection[];
  featureHighlight?: FeatureHighlight;
  outcomes?: string[];
  /** Gerçek müşteri projesi mi, yoksa AKCY'nin kendi konsept çalışması mı. */
  kind: "client" | "concept";
  imagesPending?: boolean;
}

export const projects: ProjectDef[] = [
  {
    slug: "cakiroglu-savunma",
    title: "Çakıroğlu Savunma",
    category: "web",
    year: "2026",
    sector: "Savunma · Havacılık · Ağır Sanayi",
    platform: "Web",
    tagline: "Mühendislik hassasiyetini dijital bir deneyime taşımak.",
    liveUrl: "https://cakiroglusavunma.com/",
    summary:
      "Savunma, havacılık, enerji ve ağır sanayi alanlarında çalışan bir mühendislik ve üretim markası için kurumsal web deneyimi.",
    cover: {
      src: "/images/projects/cakiroglu/cover.jpg",
      alt: "Çakıroğlu Savunma web sitesi ana sayfa görünümü",
    },
    /* Ekranlar canlı siteden alındı: https://cakiroglusavunma.com/ */
    gallery: [
      {
        src: "/images/projects/cakiroglu/sektorler.jpg",
        alt: "Çakıroğlu Savunma sektörel çözümler sayfası",
        caption: "Sektörel Çözümler",
      },
      {
        src: "/images/projects/cakiroglu/teknik-yetkinlikler.jpg",
        alt: "Teknik yetkinlikler sayfası ve mühendislik kontrol paneli",
        caption: "Teknik Yetkinlikler",
      },
      {
        src: "/images/projects/cakiroglu/uretim-teknolojileri.jpg",
        alt: "Üretim ve kaynak teknolojileri sayfası",
        caption: "Üretim Teknolojileri",
      },
      {
        src: "/images/projects/cakiroglu/mobil.jpg",
        alt: "Çakıroğlu Savunma ana sayfasının mobil görünümü",
        caption: "Mobil Ana Sayfa",
        portrait: true,
      },
    ],
    servicesUsed: [
      "Strateji",
      "Bilgi Mimarisi",
      "UI/UX Tasarım",
      "Responsive Tasarım",
      "Frontend Geliştirme",
      "İçerik Yapılandırma",
    ],
    size: "large",
    problem:
      "Endüstriyel ve teknik açıdan güçlü bir markanın dijital varlığını, kurumsal kimliğini ve mühendislik yetkinliklerini daha anlaşılır ve çağdaş bir dijital deneyime dönüştürmek.",
    ourRole: [
      "Strateji",
      "Bilgi Mimarisi",
      "UI/UX Tasarım",
      "Responsive Tasarım",
      "Frontend Geliştirme",
      "İçerik Yapılandırma",
    ],
    approach:
      "Teknik içeriğin ziyaretçiyi boğmadan anlaşılabilmesi için ürün, hizmet ve teknik yetkinlikler yeniden yapılandırıldı. Mühendislik ve savunma sanayii karakterini koruyan; güçlü tipografi, teknik görseller ve sade bir grid sistemi üzerine kurulu bir arayüz geliştirildi.",
    caseStudy: [
      {
        title: "Çözüm",
        text: "Teknik içeriğin ziyaretçiyi boğmadan anlaşılabilmesi için ürün, hizmet ve teknik yetkinlikler yeniden yapılandırıldı. Kaynak teknolojileri, mekanik üretim, kalite ve NDT, Ar-Ge / prototip gibi alanlar netleştirilerek sade bir bilgi mimarisi kuruldu.",
      },
      {
        title: "Geliştirme",
        text: "Responsive bir web sitesi, yeniden kullanılabilir componentler ve yapılandırılmış içerik mimarisi üzerine kuruldu. Performansı gözeten bir frontend ve arama motorlarına hazır sayfa yapısı geliştirildi.",
      },
      {
        title: "Tasarım Sistemi",
        text: "Teknik içeriği okunabilir tutan tipografi, sade grid ve tutarlı sayfa düzenleri; ürün, hizmet ve yetkinlik bölümlerini ortak bir görsel dilde bir araya getiriyor.",
      },
    ],
    featureHighlight: {
      title: "Marka Bazlı Ürün Kataloğu",
      description:
        "Kendi üretimi ve temsil ettiği markaların ürünlerini sunan şirket için ürünler marka bazında gruplandı. Ziyaretçi önce markayı seçip ilgili kataloğa geçiyor; henüz hazırlanan kataloglar açıkça “yakında” olarak işaretleniyor.",
      steps: [
        { number: "01", title: "Marka Seçimi" },
        { number: "02", title: "Ürün Kataloğunu İnceleme" },
        { number: "03", title: "Teklif Talebi" },
      ],
      image: {
        src: "/images/projects/cakiroglu/urunler.jpg",
        alt: "Marka kartlarıyla düzenlenmiş ürün kataloğu sayfası",
      },
    },
    outcomes: [
      "Daha anlaşılır hizmet mimarisi",
      "Teknik yetkinliklerin daha görünür sunumu",
      "Mobil ve masaüstünde tutarlı deneyim",
      "Kurumsal marka algısının güçlendirilmesi",
    ],
    kind: "client",
  },
  {
    slug: "gokce-kombi",
    title: "Gökçe Kombi",
    category: "web",
    year: "2026",
    sector: "Isıtma · Soğutma · Yapı",
    platform: "Web",
    tagline: "Daha iyi ürün keşfi üzerine kurulu bir dijital ticaret deneyimi.",
    liveUrl: "https://gokcekombi.com/",
    summary:
      "Isıtma, soğutma, yapı ve profesyonel mekanik çözümler sunan bir marka için ürün odaklı dijital ticaret deneyimi.",
    cover: {
      src: "/images/projects/gokce-kombi/cover.jpg",
      alt: "Gökçe Kombi web sitesi ana sayfa görünümü",
    },
    gallery: [
      {
        src: "/images/projects/gokce-kombi/homepage.jpg",
        alt: "Gökçe Kombi anasayfa görünümü",
        caption: "Ana Sayfa",
      },
      {
        src: "/images/projects/gokce-kombi/urun-listeleme.jpg",
        alt: "Ürün listeleme sayfası ekran görüntüsü",
        caption: "Ürün Listeleme",
      },
      {
        src: "/images/projects/gokce-kombi/urun-detay.jpg",
        alt: "Ürün detay sayfası ekran görüntüsü",
        caption: "Ürün Detayı",
      },
      {
        src: "/images/projects/gokce-kombi/mobil-navigasyon.jpg",
        alt: "Mobil navigasyon ekran görüntüsü",
        caption: "Mobil Navigasyon",
        portrait: true,
      },
    ],
    servicesUsed: [
      "UX Stratejisi",
      "Bilgi Mimarisi",
      "UI Tasarım",
      "Ürün Keşfi",
      "Frontend Geliştirme",
      "Responsive Tasarım",
    ],
    size: "large",
    problem:
      "Çok sayıda ürün, kategori ve teknik bilginin kullanıcı açısından anlaşılır hale getirilmesi ve ziyaretçinin ihtiyacına uygun ürüne daha hızlı ulaşmasını sağlayan bir dijital deneyim oluşturulması.",
    ourRole: [
      "UX Stratejisi",
      "Bilgi Mimarisi",
      "UI Tasarım",
      "Ürün Keşfi",
      "Frontend Geliştirme",
      "Responsive Tasarım",
    ],
    approach:
      "Ürün odaklı klasik bir katalog deneyimi yerine kullanıcıyı ihtiyacına göre yönlendiren bir bilgi mimarisi oluşturuldu. Isıtma, soğutma ve yapı ürünleri ayrı kullanıcı yolculukları altında düzenlendi. Ürün keşfini desteklemek için kategori yapıları ve kapasite hesaplama deneyimi birlikte ele alındı.",
    caseStudy: [
      {
        title: "Çözüm",
        text: "Ürün odaklı klasik bir katalog deneyimi yerine kullanıcıyı ihtiyacına göre yönlendiren bir bilgi mimarisi oluşturuldu. Isıtma, soğutma ve yapı ürünleri ayrı kullanıcı yolculukları altında düzenlendi.",
      },
      {
        title: "Ürün Keşfi",
        text: "Ürün keşfini desteklemek için kategori yapıları ve kapasite hesaplama deneyimi birlikte ele alındı. Kullanıcı, ihtiyacına uygun ürüne daha az adımda ulaşacak şekilde yönlendirildi.",
      },
      {
        title: "Geliştirme",
        text: "Ürün listeleri, ürün detayları ve kapasite hesaplama akışı aynı web deneyimi içinde bir araya getirildi. Mobil navigasyon, farklı ekranlarda ürün keşfinin devam etmesini destekliyor.",
      },
    ],
    featureHighlight: {
      title: "Kapasite Hesaplama",
      description:
        "Ziyaretçinin ihtiyacına uygun ürünü teknik bilgiye boğulmadan bulabilmesi için geliştirilen kapasite hesaplama aracı, case study içinde ayrı bir görsel özellik olarak öne çıkarıldı.",
      steps: [
        { number: "01", title: "Sistem Seçimi" },
        { number: "02", title: "Alan Bilgilerinin Girilmesi" },
        { number: "03", title: "Ön Kapasite Önerisinin Alınması" },
      ],
      image: {
        src: "/images/projects/gokce-kombi/kapasite-hesaplama.jpg",
        alt: "Kapasite hesaplama aracı ekran görüntüsü",
      },
    },
    outcomes: [
      "Daha kolay ürün keşfi",
      "Karmaşık ürün kataloğunun sadeleştirilmesi",
      "Teknik ürün seçiminde yönlendirilmiş kullanıcı deneyimi",
      "Masaüstü ve mobilde tutarlı e-ticaret deneyimi",
    ],
    kind: "client",
  },
  {
    slug: "concept-web-platformu",
    title: "AKCY Konsept — Web Platformu",
    category: "web",
    year: "2026",
    sector: "Teknoloji",
    platform: "Web",
    summary:
      "Kurumsal bir marka için performans odaklı, ölçeklenebilir bir web platformu konsepti.",
    cover: {
      src: "/images/projects/concepts/web.svg",
      alt: "Web platformu arayüzü ekranda",
    },
    gallery: [],
    servicesUsed: ["Web Geliştirme", "UI/UX Tasarım"],
    size: "standard",
    problem:
      "Büyüyen bir kullanıcı tabanına hızlı ve tutarlı bir dijital deneyim sunacak esnek bir platform mimarisi kurma ihtiyacı.",
    approach:
      "Next.js tabanlı bir mimari ve tutarlı bir tasarım sistemi üzerinden, AKCY'nin kendi yaklaşımını sınadığı bir konsept çalışması.",
    kind: "concept",
  },
  {
    slug: "concept-mobil-uygulama",
    title: "AKCY Konsept — Mobil Uygulama",
    category: "mobil",
    year: "2025",
    sector: "Perakende",
    platform: "iOS / Android",
    summary:
      "Kullanıcı odaklı, sade bir arayüze sahip platformlar arası mobil uygulama konsepti.",
    cover: {
      src: "/images/projects/concepts/mobil.svg",
      alt: "Mobil uygulama arayüzü",
    },
    gallery: [],
    servicesUsed: ["Mobil Uygulamalar", "UI/UX Tasarım"],
    size: "standard",
    problem: "Temel işlemlerin sade bir akışta, platformlar arası tutarlı şekilde tamamlanabilmesi.",
    approach: "Kullanıcı testleriyle doğrulanan sade bir akış tasarlanıp platformlar arası olarak sınandı.",
    kind: "concept",
  },
  {
    slug: "concept-tasarim-sistemi",
    title: "AKCY Konsept — Tasarım Sistemi",
    category: "ui-ux",
    year: "2025",
    sector: "SaaS",
    platform: "Web",
    summary:
      "Büyüyen bir ürün ekibi için ölçeklenebilir bir tasarım sistemi ve bileşen kütüphanesi konsepti.",
    cover: {
      src: "/images/projects/concepts/tasarim-sistemi.svg",
      alt: "Tasarım sistemi bileşenleri",
    },
    gallery: [],
    servicesUsed: ["UI/UX Tasarım"],
    size: "standard",
    problem: "Büyüyen bir ürün ekibinde her yeni ekranla birlikte renk, boşluk ve bileşen kararlarının yeniden tartışılması.",
    approach: "Renk paleti, tipografi ölçeği ve boşluk sisteminden başlanıp bunların doğal bir sonucu olarak yeniden kullanılabilir bir bileşen kütüphanesi kurgulandı.",
    kind: "concept",
  },
  {
    slug: "concept-yapay-zeka-asistani",
    title: "AKCY Konsept — Yapay Zekâ Asistanı",
    category: "ai",
    year: "2025",
    sector: "Müşteri Hizmetleri",
    platform: "Web",
    summary:
      "Müşteri destek süreçlerini hızlandıran, yapay zekâ destekli bir asistan sistemi konsepti.",
    cover: {
      src: "/images/projects/concepts/ai-asistani.svg",
      alt: "Yapay zekâ asistanı arayüzü",
    },
    gallery: [],
    servicesUsed: ["Yapay Zekâ Çözümleri"],
    size: "standard",
    problem: "Müşteri hizmetleri ekibinin sık sorulan talepleri manuel olarak yanıtlamakla çok zaman geçirmesi.",
    approach: "Sık sorulan taleplerin yapay zekâ destekli bir asistanla otomatik yanıtlanıp, karmaşık taleplerin doğru kişiye yönlendirildiği bir akış tasarlandı.",
    kind: "concept",
  },
  {
    slug: "concept-otomasyon-paneli",
    title: "AKCY Konsept — Otomasyon Paneli",
    category: "otomasyon",
    year: "2025",
    sector: "Lojistik",
    platform: "Web",
    summary:
      "Operasyonel süreçleri tek panelden yöneten bir otomasyon ve raporlama sistemi konsepti.",
    cover: {
      src: "/images/projects/concepts/otomasyon.svg",
      alt: "Otomasyon paneli dashboard ekranı",
    },
    gallery: [],
    servicesUsed: ["Dijital Otomasyon"],
    size: "standard",
    problem: "Operasyonel verilerin farklı sistemlerde dağınık durması ve tek bir yerden takip edilememesi.",
    approach: "Farklı kaynaklardan gelen operasyonel verileri tek bir panelde birleştiren, anomalileri bildirim olarak ileten bir raporlama yapısı kurgulandı.",
    kind: "concept",
  },
];

export function getAllProjects(): ProjectDef[] {
  return projects;
}

export function getClientProjects(): ProjectDef[] {
  return projects.filter((project) => project.kind === "client");
}

export function getConceptProjects(): ProjectDef[] {
  return projects.filter((project) => project.kind === "concept");
}

export function getProjectBySlug(slug: string): ProjectDef | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(
  current: ProjectDef,
  count = 3
): ProjectDef[] {
  const rest = projects.filter((project) => project.slug !== current.slug);
  const sameCategory = rest.filter(
    (project) => project.category === current.category
  );
  const others = rest.filter(
    (project) => project.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, count);
}

export function getAdjacentProject(current: ProjectDef): ProjectDef | undefined {
  const index = projects.findIndex((project) => project.slug === current.slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
