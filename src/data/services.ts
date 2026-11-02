import type { Locale } from "@/i18n/config";
import { servicesEn } from "./en/services";

export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceDef {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  heroDescription: string;
  overview: string;
  offerings: string[];
  process: ServiceProcessStep[];
  technologies: string[];
  image: { src: string; alt: string };
}

const serviceDefinitions: ServiceDef[] = [
  {
    id: "yapay-zeka",
    slug: "yapay-zeka",
    number: "01",
    title: "Yapay Zekâ Çözümleri",
    shortDescription:
      "İş süreçlerine özel geliştirilen akıllı AI sistemleri ve uygulamaları.",
    heroDescription:
      "Yapay zekâyı vitrin değil, operasyonel bir avantaja dönüştürüyoruz.",
    overview:
      "İş süreçlerinizi analiz ederek, gerçek ölçülebilir fayda sağlayan yapay zekâ destekli sistemler tasarlıyor ve entegre ediyoruz.",
    offerings: [
      "Doküman ve Veri İşleme",
      "AI Asistanları",
      "Satış ve Teklif Otomasyonu",
      "Raporlama ve Veri Analizi",
      "CRM/ERP Entegrasyonları",
      "AI Destekli Arama",
      "AI Workflow Sistemleri",
    ],
    process: [
      { number: "01", title: "Keşif", description: "Süreçleri ve veri kaynaklarını analiz ederiz." },
      { number: "02", title: "Strateji", description: "Uygulanabilir AI kullanım alanlarını belirleriz." },
      { number: "03", title: "Tasarım", description: "Model ve entegrasyon mimarisini kurgularız." },
      { number: "04", title: "Geliştirme", description: "Sistemi geliştirir ve entegre ederiz." },
      { number: "05", title: "Test", description: "Doğruluk ve performansı ölçeriz." },
      { number: "06", title: "Yayın", description: "Canlıya alır, sonuçları izleriz." },
    ],
    technologies: ["Python", "OpenAI API", "LangChain", "Vector DB"],
    image: {
      src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop",
      alt: "Yapay zekâ veri görselleştirmesi",
    },
  },
  {
    id: "dijital-otomasyon",
    slug: "dijital-otomasyon",
    number: "02",
    title: "Dijital Otomasyon",
    shortDescription:
      "Tekrarlayan operasyonları azaltan ve süreçleri hızlandıran dijital iş akışları.",
    heroDescription:
      "Ekiplerin zamanını tekrarlayan işlerden kurtarıp, gerçek işe odaklanmasını sağlıyoruz.",
    overview:
      "Operasyonel süreçlerinizi analiz ederek, manuel iş yükünü azaltan ve hataları en aza indiren otomasyon sistemleri kuruyoruz.",
    offerings: [
      "Süreç Analizi",
      "İş Akışı Otomasyonu",
      "Sistem Entegrasyonları",
      "Dashboard & Raporlama",
      "Bildirim Sistemleri",
    ],
    process: [
      { number: "01", title: "Keşif", description: "Mevcut süreçleri haritalandırırız." },
      { number: "02", title: "Strateji", description: "Otomasyon fırsatlarını önceliklendiririz." },
      { number: "03", title: "Tasarım", description: "İş akışı mimarisini tasarlarız." },
      { number: "04", title: "Geliştirme", description: "Entegrasyonları geliştiririz." },
      { number: "05", title: "Test", description: "Süreci uçtan uca test ederiz." },
      { number: "06", title: "Yayın", description: "Sistemi devreye alır, izleriz." },
    ],
    technologies: ["Node.js", "Zapier", "REST API", "Make"],
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      alt: "Otomasyon dashboard ekranı",
    },
  },
  {
    id: "ai-icerik-uretimi",
    slug: "ai-icerik-uretimi",
    number: "03",
    title: "AI İçerik Üretimi",
    shortDescription:
      "Markalar için yapay zekâ destekli görsel ve dijital içerik üretim sistemleri.",
    heroDescription:
      "Marka sesinizi koruyarak, ölçekte içerik üretmenizi sağlıyoruz.",
    overview:
      "Yapay zekâ destekli içerik araçlarını marka kimliğinize uyarlayarak, tutarlı ve ölçeklenebilir içerik üretim süreçleri kuruyoruz.",
    offerings: [
      "E-Ticaret Ürün Görseli",
      "Kıyafet/Model Varyasyonu",
      "Kampanya Kreatifleri",
      "Toplu Ürün İçeriği",
      "İçerik Workflow Otomasyonu",
      "Görsel Varyasyon Üretimi",
    ],
    process: [
      { number: "01", title: "Keşif", description: "Marka sesini ve içerik ihtiyacını analiz ederiz." },
      { number: "02", title: "Strateji", description: "İçerik üretim akışını planlarız." },
      { number: "03", title: "Kurulum", description: "Araç ve şablon sistemini kurarız." },
      { number: "04", title: "Üretim", description: "İçerik üretim sürecini başlatırız." },
      { number: "05", title: "Test", description: "Kalite ve tutarlılığı doğrularız." },
      { number: "06", title: "Yayın", description: "Süreci ekibinize teslim ederiz." },
    ],
    technologies: ["OpenAI API", "Midjourney", "Stable Diffusion", "Zapier"],
    image: {
      src: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?q=80&w=1600&auto=format&fit=crop",
      alt: "Yapay zekâ destekli içerik üretim ekranı",
    },
  },
  {
    id: "web-gelistirme",
    slug: "web-gelistirme",
    number: "04",
    title: "Web Geliştirme",
    shortDescription:
      "Modern, hızlı, responsive ve ölçeklenebilir web siteleri ve web uygulamaları.",
    heroDescription:
      "Sadece güzel görünen değil, çalışan dijital ürünler geliştiriyoruz.",
    overview:
      "Web varlığınız markanızın dijital dünyadaki ilk temas noktasıdır. Kurumsal siteden karmaşık web uygulamalarına kadar performans ve kullanıcı deneyimini önceliklendiren çözümler üretiyoruz.",
    offerings: [
      "Kurumsal Web Siteleri",
      "SaaS ve Dashboard",
      "E-Ticaret ve Portallar",
      "Web Uygulamaları",
      "Next.js Geliştirme",
      "Web Performans Optimizasyonu",
      "Özel Web Yazılımı",
    ],
    process: [
      { number: "01", title: "Keşif", description: "İhtiyaçları ve hedef kitleyi analiz ederiz." },
      { number: "02", title: "Strateji", description: "Doğru teknoloji ve içerik yaklaşımını belirleriz." },
      { number: "03", title: "Tasarım", description: "Marka diline uygun arayüzler tasarlarız." },
      { number: "04", title: "Geliştirme", description: "Temiz ve sürdürülebilir kod yazarız." },
      { number: "05", title: "Test", description: "Performans ve uyumluluk testleri yaparız." },
      { number: "06", title: "Yayın", description: "Siteyi canlıya alır, izlemeye devam ederiz." },
    ],
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    image: {
      src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1600&auto=format&fit=crop",
      alt: "Web arayüzü tasarımı ekranda",
    },
  },
  {
    id: "mobil-uygulamalar",
    slug: "mobil-uygulamalar",
    number: "05",
    title: "Mobil Uygulamalar",
    shortDescription:
      "iOS ve Android platformlarına yönelik kullanıcı odaklı mobil ürünler.",
    heroDescription:
      "Kullanıcıların cebinde yaşayan, gerçek değer üreten mobil ürünler tasarlıyoruz.",
    overview:
      "Mobil uygulama geliştirme sürecinde performans, kullanılabilirlik ve platform uyumunu bir arada ele alıyoruz — fikirden mağazaya kadar tüm süreci yönetiyoruz.",
    offerings: [
      "iOS Geliştirme",
      "Android Geliştirme",
      "React Native Geliştirme",
      "Backend/API Entegrasyonu",
      "Push Notification",
      "App Store & Google Play",
      "Bakım ve Güncelleme",
    ],
    process: [
      { number: "01", title: "Keşif", description: "Kullanıcı ihtiyaçlarını ve platformu belirleriz." },
      { number: "02", title: "Strateji", description: "Uygulama mimarisini ve akışını planlarız." },
      { number: "03", title: "Tasarım", description: "Sezgisel mobil arayüzler tasarlarız." },
      { number: "04", title: "Geliştirme", description: "Native veya cross-platform geliştirme yaparız." },
      { number: "05", title: "Test", description: "Cihaz ve senaryo bazlı testler uygularız." },
      { number: "06", title: "Yayın", description: "Mağazalara yükler, süreci takip ederiz." },
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase"],
    image: {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop",
      alt: "Mobil uygulama arayüzü telefon ekranında",
    },
  },
  {
    id: "ui-ux-tasarim",
    slug: "ui-ux-tasarim",
    number: "06",
    title: "UI/UX Tasarım",
    shortDescription:
      "Kullanıcı deneyimini merkeze alan sade ve güçlü dijital ürün deneyimleri.",
    heroDescription:
      "Kullanıcının düşünmek zorunda kalmadan hareket edebildiği arayüzler tasarlıyoruz.",
    overview:
      "İyi tasarım görünmez çalışır. Araştırma, wireframe ve prototipleme süreçleriyle kullanıcı davranışını merkeze alan, ölçülebilir sonuçlar üreten deneyimler kurguluyoruz.",
    offerings: [
      "Ürün Tasarımı",
      "Kullanıcı Araştırması",
      "Wireframe & Prototipleme",
      "Tasarım Sistemleri",
      "Kullanılabilirlik Testleri",
      "Tasarım Yönetimi",
    ],
    process: [
      { number: "01", title: "Keşif", description: "Kullanıcı davranışını ve problemi araştırırız." },
      { number: "02", title: "Strateji", description: "Bilgi mimarisini ve akışları kurgularız." },
      { number: "03", title: "Tasarım", description: "Wireframe'den yüksek çözünürlüklü tasarıma geçeriz." },
      { number: "04", title: "Prototipleme", description: "Etkileşimli prototipler oluştururuz." },
      { number: "05", title: "Test", description: "Kullanılabilirlik testleriyle doğrularız." },
      { number: "06", title: "Teslim", description: "Geliştirme ekibine tasarım sistemini teslim ederiz." },
    ],
    technologies: ["Figma", "Framer", "Design Tokens", "Prototyping"],
    image: {
      src: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?q=80&w=1600&auto=format&fit=crop",
      alt: "Arayüz wireframe ve tasarım ekranları",
    },
  },
  {
    id: "kurumsal-yazilim",
    slug: "kurumsal-yazilim",
    number: "07",
    title: "Kuruma Özel Yazılım",
    shortDescription:
      "Hazır yazılımların karşılamadığı süreçler için işletmenize özel yönetim sistemleri.",
    heroDescription:
      "İş akışınızı yazılıma uydurmak yerine, yazılımı iş akışınıza göre geliştiriyoruz.",
    overview:
      "Teklif, sipariş, servis, stok veya proje takibi gibi süreçler çoğu şirkette Excel dosyaları, e-postalar ve birbirinden kopuk araçlar arasında yürür. Bu süreçleri tek bir merkezde toplayan, rollerinize ve onay adımlarınıza göre çalışan, mevcut sistemlerinizle entegre özel yazılımlar geliştiriyoruz.",
    offerings: [
      "Teklif ve Sipariş Yönetimi",
      "CRM ve Müşteri Takibi",
      "ERP Modülleri",
      "Servis ve Saha Operasyonu",
      "Stok ve Tedarik Takibi",
      "Rol ve Yetki Yönetimi",
      "Raporlama Panelleri",
    ],
    process: [
      { number: "01", title: "Keşif", description: "Mevcut süreci, kullanıcı rollerini ve darboğazları analiz ederiz." },
      { number: "02", title: "Kapsam", description: "İlk sürümde olması gereken modülleri önceliklendiririz." },
      { number: "03", title: "Tasarım", description: "Ekranları ve iş akışlarını kullanıcılarla birlikte doğrularız." },
      { number: "04", title: "Geliştirme", description: "Modüler, test edilebilir ve genişletilebilir bir altyapı kurarız." },
      { number: "05", title: "Geçiş", description: "Mevcut verileri aktarır, ekibinizi sisteme alıştırırız." },
      { number: "06", title: "Destek", description: "Yayından sonra sistemi izler ve yeni ihtiyaçlarla büyütürüz." },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "REST / GraphQL API"],
    image: {
      src: "/images/services/software-workflow.svg",
      alt: "Talep, onay, operasyon ve raporlama akışı",
    },
  },
];

const serviceOrder = ["web-gelistirme", "ui-ux-tasarim", "mobil-uygulamalar", "kurumsal-yazilim", "yapay-zeka", "dijital-otomasyon", "ai-icerik-uretimi"];
const serviceVisuals: Record<string, { src: string; alt: string }> = {
  "web-gelistirme": { src: "/images/projects/cakiroglu/cover.jpg", alt: "Çakıroğlu Savunma kurumsal web sitesi" },
  "ui-ux-tasarim": { src: "/images/services/uiux-workflow.svg", alt: "Kullanıcı akışı, prototip, arayüz tasarımı ve tasarım sistemi akışı" },
  "mobil-uygulamalar": { src: "/images/services/mobile-workflow.svg", alt: "Tasarım, geliştirme, test ve mağaza yayını akışı" },
  "kurumsal-yazilim": { src: "/images/services/software-workflow.svg", alt: "Talep, onay, operasyon ve raporlama akışı" },
  "yapay-zeka": { src: "/images/services/ai-workflow.svg", alt: "Doküman, analiz, insan kontrolü ve çıktı akışı" },
  "dijital-otomasyon": { src: "/images/services/automation-workflow.svg", alt: "Form, CRM, teklif ve raporlama akışı" },
  "ai-icerik-uretimi": { src: "/images/services/content-workflow.svg", alt: "Orijinal ürün, kampanya ve yayın akışı" },
};
export const services: ServiceDef[] = serviceOrder.map((slug, index) => ({
  ...serviceDefinitions.find(service => service.slug === slug)!,
  image: serviceVisuals[slug],
  number: String(index + 1).padStart(2, "0"),
}));

/* İngilizce görsellerde yazılar İngilizcedir (*.en.svg) */
function localizedImage(image: { src: string; alt: string }, alt: string) {
  return { src: image.src.replace(/-workflow\.svg$/, "-workflow.en.svg"), alt };
}

const servicesEnglish: ServiceDef[] = services.map((service) => {
  const t = servicesEn[service.slug];
  return {
    ...service,
    title: t.title,
    shortDescription: t.shortDescription,
    heroDescription: t.heroDescription,
    overview: t.overview,
    offerings: t.offerings,
    process: t.process,
    image: localizedImage(service.image, t.imageAlt),
  };
});

/* slug alanı her dilde Türkçe (kanonik) slug'dır; adres localizePath ile çevrilir */
export function getAllServices(locale: Locale = "tr"): ServiceDef[] {
  return locale === "en" ? servicesEnglish : services;
}

export function getServiceBySlug(slug: string, locale: Locale = "tr"): ServiceDef | undefined {
  return getAllServices(locale).find((service) => service.slug === slug);
}
