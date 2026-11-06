import type { Locale } from "@/i18n/config";

/*
  Projelerimiz sayfasının içeriği (Türkçe ve İngilizce).
  Yalnızca doğrulanmış bilgi ve bağlantılar kullanılır: mağaza bağlantısı,
  canlı adres veya detay sayfası olmayan projelerde buton gösterilmez.

  GÖRSELLER: Calm Do, Guess Player, Connectly ve BidFlow'un gerçek
  ekranları visual.screens içinde; ilk ekran öne/ortaya yerleşir. Bu projelerde uydurma ekran yerine yalnızca
  amblem ve boş cihaz çerçevesi gösterilir (visual.screens boş). Gerçek
  ekranlar geldiğinde visual.screens doldurulmalıdır.
*/

export type EmblemId = "calm-do" | "guess-player" | "connectly" | "bidflow";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ShowcaseProject {
  id: string;
  name: string;
  label: string;
  title: string;
  description: string;
  scope?: string[];
  emblem?: EmblemId;
  /** Uygulama ikonu (adın yanında gösterilir; yoksa amblem kullanılır) */
  icon?: string;
  visual:
    | { kind: "app"; device: "phone" | "browser"; screens: ProjectImage[] }
    | { kind: "web"; host: string; desktop: ProjectImage; mobile: ProjectImage };
  liveUrl?: string;
  detailHref?: string;
}

export interface ProjectsPageContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  visitSite: string;
  viewCaseStudy: string;
  newTab: string;
  projects: ShowcaseProject[];
}

const CAKIROGLU_DESKTOP = { src: "/images/projects/cakiroglu/cover.jpg", width: 1892, height: 862 };
const CAKIROGLU_MOBILE = { src: "/images/projects/cakiroglu/mobil.jpg", width: 390, height: 844 };
const GOKCE_DESKTOP = { src: "/images/projects/gokce-kombi/cover.jpg", width: 1440, height: 1000 };
/* Telefon çerçevesi: sitenin gerçek ürün listeleme ekranından, kombi modelleri görünecek şekilde dar ekrana dizildi */
const GOKCE_MOBILE = { src: "/images/projects/gokce-kombi/mobil-urunler.jpg", width: 390, height: 844 };
/* Calm Do uygulamasının gerçek ekranları (sırasıyla ortadaki, soldaki, sağdaki telefon) */
const CALMDO_SCREENS = [
  { src: "/images/projects/calm-do/bugun.webp", width: 480, height: 972 },
  { src: "/images/projects/calm-do/gorev-ekle.webp", width: 480, height: 972 },
  { src: "/images/projects/calm-do/ai-asistan.webp", width: 480, height: 972 },
];
/* Guess Player oyununun gerçek ekranları (sırasıyla ortadaki, soldaki, sağdaki telefon) */
const GUESSPLAYER_SCREENS = [
  { src: "/images/projects/guess-player/ana-sayfa.webp", width: 480, height: 972 },
  { src: "/images/projects/guess-player/kategori.webp", width: 480, height: 972 },
  { src: "/images/projects/guess-player/oyun.webp", width: 480, height: 972 },
];
/* BidFlow platformunun gerçek ekranları (sırasıyla öndeki, ortadaki, arkadaki tarayıcı) */
const BIDFLOW_SCREENS = [
  { src: "/images/projects/bidflow/anasayfa.webp", width: 1400, height: 633 },
  { src: "/images/projects/bidflow/gorevler.webp", width: 1400, height: 630 },
  { src: "/images/projects/bidflow/teklif-mektubu.webp", width: 1400, height: 613 },
];
/* Connectly uygulamasının gerçek ekranları (sırasıyla ortadaki, soldaki, sağdaki telefon) */
const CONNECTLY_SCREENS = [
  { src: "/images/projects/connectly/ana-sayfa.webp", width: 480, height: 972 },
  { src: "/images/projects/connectly/kisi-ekle.webp", width: 480, height: 972 },
  { src: "/images/projects/connectly/profil.webp", width: 480, height: 972 },
];

export const projectsPage: Record<Locale, ProjectsPageContent> = {
  tr: {
    eyebrow: "AKCY / Projelerimiz",
    title: "Fikirden Ürüne,",
    titleAccent: "Geliştirdiğimiz Projeler.",
    description:
      "Günlük yaşamı kolaylaştıran uygulamalardan işletmelere özel dijital çözümlere kadar geliştirdiğimiz projeleri keşfedin.",
    visitSite: "Siteyi Ziyaret Et",
    viewCaseStudy: "Proje Detayı",
    newTab: "yeni sekmede açılır",
    projects: [
      {
        id: "calm-do",
        name: "Calm Do",
        label: "Yapay Zekâ Destekli Görev Yönetimi",
        title: "Gününüzü Daha Sakin Planlayın.",
        description:
          "Calm Do, yapılacak işleri düzenlemeye ve günlük planlamayı kolaylaştırmaya odaklanan yapay zekâ destekli bir görev yönetimi uygulamasıdır.",
        emblem: "calm-do",
        icon: "/images/projects/icons/calm-do.svg",
        visual: {
          kind: "app",
          device: "phone",
          screens: [
            { ...CALMDO_SCREENS[0], alt: "Calm Do bugün ekranı: tamamlanan ve bekleyen görevler, hızlı adımlar" },
            { ...CALMDO_SCREENS[1], alt: "Yeni görev ekleme ekranı: tahmini süre, başlangıç ve bitiş" },
            { ...CALMDO_SCREENS[2], alt: "AI asistan ekranı: premium özellik ve giriş seçenekleri" },
          ],
        },
      },
      {
        id: "guess-player",
        name: "Guess Player",
        label: "Sporcu Tahmin Oyunu",
        title: "Spor Bilginizi Oyuna Dönüştürün.",
        description:
          "Guess Player, sporcuları tahmin etmeye dayanan bir oyundur. Spor bilgisini eğlenceli bir oyun deneyimiyle buluşturur.",
        emblem: "guess-player",
        icon: "/images/projects/icons/guess-player.png",
        visual: {
          kind: "app",
          device: "phone",
          screens: [
            { ...GUESSPLAYER_SCREENS[0], alt: "Guess Player ana ekranı: oyun logosu, günlük çark ve Başla butonu" },
            { ...GUESSPLAYER_SCREENS[1], alt: "Kategori seçimi: günlük görevler, zorluk seviyesi ve spor dalları" },
            { ...GUESSPLAYER_SCREENS[2], alt: "Oyun ekranı: bulanık oyuncu fotoğrafı, ipuçları ve geri sayım" },
          ],
        },
      },
      {
        id: "connectly",
        name: "Connectly",
        label: "Kişisel İlişki Yönetimi",
        title: "Önem Verdiğiniz İnsanlara Yakın Kalın.",
        description:
          "Connectly, kişisel ilişkileri daha özenli takip etmeye odaklanan bir kişisel CRM uygulamasıdır. İnsanlara dair önemli detayları hatırlamayı ve iletişimi sürdürmeyi kolaylaştırmayı amaçlar.",
        emblem: "connectly",
        icon: "/images/projects/icons/connectly.webp",
        visual: {
          kind: "app",
          device: "phone",
          screens: [
            { ...CONNECTLY_SCREENS[0], alt: "Connectly ana sayfası: bağ ağacı, haftalık hedef ve günün kişisi" },
            { ...CONNECTLY_SCREENS[1], alt: "Connectly'de kişi ekleme ekranı: ilişki türü ve hatırlatma sıklığı" },
            { ...CONNECTLY_SCREENS[2], alt: "Connectly profil ekranı: bağlantı puanı ve hesap ayarları" },
          ],
        },
      },
      {
        id: "bidflow",
        name: "BidFlow",
        label: "İhale, Teklif ve Satış Yönetimi",
        title: "İhaleden Teklife, Satış Sürecine Bütünsel Bakış.",
        description:
          "BidFlow, işletmelerin ihale, teklif ve satış süreçlerini tek bir çalışma alanında yönetmesine odaklanan bir platformdur. İş fırsatlarını ve teklif süreçlerini daha düzenli takip etmeyi amaçlar.",
        emblem: "bidflow",
        icon: "/images/projects/icons/bidflow.webp",
        visual: {
          kind: "app",
          device: "browser",
          screens: [
            { ...BIDFLOW_SCREENS[0], alt: "BidFlow ana sayfası: proje, kazanma oranı ve teklif pipeline göstergeleri" },
            { ...BIDFLOW_SCREENS[1], alt: "Görevler panosu" },
            { ...BIDFLOW_SCREENS[2], alt: "Teklif mektubu oluşturma adımları" },
          ],
        },
      },
      {
        id: "cakiroglu",
        name: "Çakıroğlu Savunma",
        label: "Kurumsal Web Sitesi",
        title: "Endüstriyel Yetkinliği Dijitalde Görünür Kılmak.",
        description:
          "Çakıroğlu Savunma ve Kaynak Teknolojileri için ürünleri, hizmetleri ve sektörel yetkinlikleri ziyaretçilere sunan kurumsal web sitesi çalışması.",
        scope: ["Bilgi mimarisi", "UI/UX ve responsive tasarım", "Frontend geliştirme"],
        visual: {
          kind: "web",
          host: "cakiroglusavunma.com",
          desktop: { ...CAKIROGLU_DESKTOP, alt: "Çakıroğlu Savunma web sitesi ana sayfa görünümü" },
          mobile: { ...CAKIROGLU_MOBILE, alt: "Çakıroğlu Savunma ana sayfasının mobil görünümü" },
        },
        liveUrl: "https://cakiroglusavunma.com/",
        detailHref: "/projelerimiz/cakiroglu-savunma",
      },
      {
        id: "gokce-kombi",
        name: "Gökçe Kombi",
        label: "Kurumsal Web Sitesi",
        title: "Hizmetleri Anlaşılır, İletişimi Kolay Bir Deneyim.",
        description:
          "Gökçe Kombi için hizmetlerini dijital ortamda tanıtan ve ziyaretçilerin işletmeyle iletişime geçmesini kolaylaştırmaya odaklanan web sitesi çalışması.",
        scope: ["Bilgi mimarisi ve ürün keşfi", "UI tasarım", "Frontend geliştirme"],
        visual: {
          kind: "web",
          host: "gokcekombi.com",
          desktop: { ...GOKCE_DESKTOP, alt: "Gökçe Kombi web sitesi ana sayfa görünümü" },
          mobile: { ...GOKCE_MOBILE, alt: "Gökçe Kombi web sitesinde öne çıkan kombi modelleri" },
        },
        liveUrl: "https://gokcekombi.com/",
        detailHref: "/projelerimiz/gokce-kombi",
      },
    ],
  },
  en: {
    eyebrow: "AKCY / Projects",
    title: "From Idea to Product,",
    titleAccent: "Projects We’ve Built.",
    description:
      "Explore the projects we’ve built, from apps that make everyday life easier to digital solutions tailored to businesses.",
    visitSite: "Visit the Site",
    viewCaseStudy: "Case Study",
    newTab: "opens in a new tab",
    projects: [
      {
        id: "calm-do",
        name: "Calm Do",
        label: "AI-Assisted Task Management",
        title: "Plan Your Day More Calmly.",
        description:
          "Calm Do is an AI-assisted task management app focused on organising to-dos and making daily planning easier.",
        emblem: "calm-do",
        icon: "/images/projects/icons/calm-do.svg",
        visual: {
          kind: "app",
          device: "phone",
          screens: [
            { ...CALMDO_SCREENS[0], alt: "Calm Do today screen: completed and pending tasks, quick steps" },
            { ...CALMDO_SCREENS[1], alt: "Adding a new task: estimated duration, start and end" },
            { ...CALMDO_SCREENS[2], alt: "AI assistant screen: premium feature and sign-in options" },
          ],
        },
      },
      {
        id: "guess-player",
        name: "Guess Player",
        label: "Athlete Guessing Game",
        title: "Turn Your Sports Knowledge into a Game.",
        description:
          "Guess Player is a game built around guessing athletes. It brings sports knowledge together with a fun game experience.",
        emblem: "guess-player",
        icon: "/images/projects/icons/guess-player.png",
        visual: {
          kind: "app",
          device: "phone",
          screens: [
            { ...GUESSPLAYER_SCREENS[0], alt: "Guess Player home screen: game logo, daily wheel and Start button" },
            { ...GUESSPLAYER_SCREENS[1], alt: "Category selection: daily missions, difficulty and sports" },
            { ...GUESSPLAYER_SCREENS[2], alt: "Game screen: blurred player photo, hints and countdown" },
          ],
        },
      },
      {
        id: "connectly",
        name: "Connectly",
        label: "Personal Relationship Management",
        title: "Stay Close to the People Who Matter.",
        description:
          "Connectly is a personal CRM app focused on keeping track of personal relationships with more care. It aims to make it easier to remember important details about people and keep in touch.",
        emblem: "connectly",
        icon: "/images/projects/icons/connectly.webp",
        visual: {
          kind: "app",
          device: "phone",
          screens: [
            { ...CONNECTLY_SCREENS[0], alt: "Connectly home screen: connection tree, weekly goal and person of the day" },
            { ...CONNECTLY_SCREENS[1], alt: "Adding a contact in Connectly: relationship type and reminder frequency" },
            { ...CONNECTLY_SCREENS[2], alt: "Connectly profile screen: connection score and account settings" },
          ],
        },
      },
      {
        id: "bidflow",
        name: "BidFlow",
        label: "Tender, Quote and Sales Management",
        title: "A Complete View from Tender to Quote to Sale.",
        description:
          "BidFlow is a platform focused on helping businesses manage their tender, quote and sales processes in a single workspace. It aims to make business opportunities and quote processes easier to track.",
        emblem: "bidflow",
        icon: "/images/projects/icons/bidflow.webp",
        visual: {
          kind: "app",
          device: "browser",
          screens: [
            { ...BIDFLOW_SCREENS[0], alt: "BidFlow dashboard: project, win rate and proposal pipeline metrics" },
            { ...BIDFLOW_SCREENS[1], alt: "Tasks board" },
            { ...BIDFLOW_SCREENS[2], alt: "Proposal letter creation steps" },
          ],
        },
      },
      {
        id: "cakiroglu",
        name: "Çakıroğlu Savunma",
        label: "Corporate Website",
        title: "Making Industrial Expertise Visible Online.",
        description:
          "A corporate website for Çakıroğlu Savunma ve Kaynak Teknolojileri that presents its products, services and industry capabilities to visitors.",
        scope: ["Information architecture", "UI/UX and responsive design", "Frontend development"],
        visual: {
          kind: "web",
          host: "cakiroglusavunma.com",
          desktop: { ...CAKIROGLU_DESKTOP, alt: "Çakıroğlu Savunma website homepage" },
          mobile: { ...CAKIROGLU_MOBILE, alt: "Mobile view of the Çakıroğlu Savunma homepage" },
        },
        liveUrl: "https://cakiroglusavunma.com/",
        detailHref: "/projelerimiz/cakiroglu-savunma",
      },
      {
        id: "gokce-kombi",
        name: "Gökçe Kombi",
        label: "Corporate Website",
        title: "Clear Services, Easy Contact.",
        description:
          "A website for Gökçe Kombi that presents its services online and focuses on making it easy for visitors to get in touch with the business.",
        scope: ["Information architecture and product discovery", "UI design", "Frontend development"],
        visual: {
          kind: "web",
          host: "gokcekombi.com",
          desktop: { ...GOKCE_DESKTOP, alt: "Gökçe Kombi website homepage" },
          mobile: { ...GOKCE_MOBILE, alt: "Featured boiler models on the Gökçe Kombi website" },
        },
        liveUrl: "https://gokcekombi.com/",
        detailHref: "/projelerimiz/gokce-kombi",
      },
    ],
  },
};
