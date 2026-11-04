import { aboutContent } from "@/content/about";

/*
  Türkçe arayüz metinleri. en.ts aynı yapıyı birebir izler (TypeScript eksik
  anahtarları derlemede yakalar). Uzun içerikler (hizmetler, projeler, blog,
  yasal sayfalar) src/data ve src/content altındadır.
*/
export const tr = {
  meta: {
    defaultTitle: "Yapay Zekâ ve Otomasyon Çözümleri | AKCY",
    defaultDescription:
      "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz. Küçük ekiplerden kurumsal yapılara.",
    shortDescription: "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz.",
    keywords: ["yapay zekâ", "otomasyon", "dijital ürünler", "web geliştirme", "mobil uygulama", "AI çözümleri", "dijital dönüşüm"],
  },
  pages: {
    home: {
      title: "Yapay Zekâ ve Otomasyon Çözümleri",
      description:
        "Yapay zekâ, otomasyon ve dijital ürünlerle işletmelerin daha akıllı çalışmasını sağlıyoruz. Küçük ekiplerden kurumsal yapılara.",
    },
    services: {
      title: "Hizmetler",
      description: "Web geliştirme, mobil uygulama, UI/UX tasarım, yapay zekâ ve dijital otomasyon çözümleri.",
    },
    projects: {
      title: "Projelerimiz",
      description: "Günlük yaşamı kolaylaştıran uygulamalardan işletmelere özel dijital çözümlere kadar geliştirdiğimiz projeleri keşfedin.",
    },
    blog: {
      title: "Blog",
      description:
        "Web, WordPress, şirket süreç otomasyonu ve yapay zekâ üzerine uygulanabilir rehberler, deneyimler ve öğrendiklerimiz.",
    },
    contact: {
      title: "İletişim",
      description: "Web, mobil uygulama, UI/UX, yapay zekâ ve dijital ürün projeleriniz için AKCY ile iletişime geçin.",
    },
    notFound: { title: "Sayfa Bulunamadı | AKCY" },
  },
  nav: {
    home: "Ana Sayfa",
    services: "Hizmetler",
    projects: "Projelerimiz",
    about: "Hakkımızda",
    blog: "Blog",
    contact: "İletişim",
  },
  language: {
    label: "Dil seçimi",
    menuTitle: "Dil",
    names: { tr: "Türkçe", en: "English (İngilizce)" },
  },
  common: {
    allServices: "Tüm Hizmetler",
  },
  header: {
    homeLabel: "AKCY Ana Sayfa",
    mainNav: "Ana navigasyon",
    mobileNav: "Mobil navigasyon",
    megaEyebrow: "NELER YAPIYORUZ?",
    megaTitle: "Fikirden yayına,",
    megaTitleAccent: "tek ekip.",
    megaText: "Tasarımdan geliştirmeye, yapay zekâdan otomasyona kadar dijital ürününüzün tüm sürecinde yanınızdayız.",
    allServices: "Tüm hizmetleri keşfet",
    cta: "Proje Başlatalım",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    openServices: "Hizmet alt menüsünü aç",
    closeServices: "Hizmet alt menüsünü kapat",
    mobileIdea: "Bir fikrin mi var?",
    mobileCta: "Birlikte hayata geçirelim",
  },
  footer: {
    eyebrow: "BİRLİKTE DAHA FAZLASI MÜMKÜN",
    headingStart: "Fikirlerinizi",
    headingAccent: "Dijital Gerçekliğe",
    headingEnd: "Dönüştürelim.",
    description: "Web, mobil, yapay zekâ ve otomasyon çözümleriyle işletmenizin dijital yolculuğunda yanınızdayız.",
    cta: "Bizimle İletişime Geçin",
    homeLabel: "AKCY Technologies — Ana Sayfa",
    brandText: "Web, mobil, yapay zekâ ve otomasyon çözümleriyle dijital ürünler geliştiriyoruz.",
    social: "Sosyal medya",
    navLabel: "Footer navigasyonu",
    quickLinks: "HIZLI LİNKLER",
    servicesLabel: "Footer hizmetleri",
    services: "HİZMETLER",
    contact: "İLETİŞİM",
    location: "İstanbul, Türkiye",
    rights: "Tüm hakları saklıdır.",
    legalLabel: "Yasal linkler",
    privacy: "Gizlilik Politikası",
    kvkk: "KVKK Aydınlatma Metni",
    cookies: "Çerez Politikası",
  },
  notFound: {
    title: "Bu sayfa burada değil.",
    description: "Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.",
    home: "Ana Sayfaya Dön",
    shortcutsLabel: "Sık ziyaret edilen sayfalar",
  },
  services: {
    heroLabel: "Hizmetler",
    heroTitle: "Fikirden ürüne, dijital sürecin her aşamasında yanınızdayız.",
    heroDescription: "Web, mobil, tasarım, yapay zekâ ve otomasyon çözümlerini tek bir ürün yaklaşımı altında bir araya getiriyoruz.",
    rowCta: "Detayları İncele",
    overviewLabel: "01 / Genel Bakış",
    offeringsLabel: "02 / Neler Yapıyoruz",
    processLabel: "03 / Süreç",
    processHeading: "Nasıl ilerliyoruz",
    technologies: "04 / Teknolojiler",
    relatedLabel: "05 / İlgili Projeler",
    relatedHeading: "Bu hizmetle üretilenler",
    scopes: {
      "web-gelistirme": { title: "Her projede standart", items: ["SEO altyapısı", "Core Web Vitals", "Responsive tasarım", "Erişilebilirlik", "Güvenlik"], note: "Bunları sonradan eklenen özellikler olarak değil, geliştirme sürecinin bir parçası olarak ele alıyoruz." },
      "ui-ux-tasarim": { title: "Tasarım teslimleri", items: ["Kullanıcı akışları", "Tel çerçeve (wireframe)", "Prototip", "Arayüz tasarımı", "Tasarım sistemi", "Geliştiriciye teslim"], note: "Kullanıcı akışından geliştirici teslimine kadar kararları ve bileşen davranışlarını belgeleriz. Seçilmiş projeler bölümünde gerçek arayüzlerimizi inceleyebilirsiniz." },
      "mobil-uygulamalar": { title: "Uygulama türleri", items: ["Tüketici uygulamaları", "Kurum içi uygulamalar", "Pazaryerleri", "SaaS tamamlayıcı uygulamalar", "Saha uygulamaları"], note: "App Store ve Google Play hazırlıklarını, cihaz testlerini ve yayın sürecini proje kapsamıyla birlikte planlarız." },
      "kurumsal-yazilim": { title: "Örnek modüller", items: ["Teklif ve sipariş", "Müşteri ve görüşme takibi", "Servis ve saha işleri", "Stok ve tedarik", "Onay akışları", "Yönetim raporları"], note: "Her şeyi baştan yazmak yerine önce en çok zaman kaybettiren süreçle başlıyor, mevcut CRM, ERP veya muhasebe sistemlerinizle entegre çalışan modüler bir yapı kuruyoruz." },
      "yapay-zeka": { title: "Kullanım alanları", items: ["Doküman analizi", "Kurumsal AI asistanları", "AI iş akışları", "Veri sınıflandırma", "Raporlama", "CRM / ERP entegrasyonları"], note: "Veri erişimini, insan kontrolünü ve çıktı doğrulamasını baştan tasarlarız. Önce sınırlı bir pilotla ihtiyacı doğrular, ardından kapsamı genişletiriz." },
      "dijital-otomasyon": { title: "Talebi çalışan bir sürece dönüştürün.", items: [] as string[], flow: ["Form", "CRM", "Teklif", "E-posta", "Dashboard"], note: "Örnek akış: form talebi CRM kaydına dönüşür, onaylanan teklif e-posta ile iletilir ve durum panelden izlenir. Her adımda hata ve tekrar denemeleri izlenebilir." },
      "ai-icerik-uretimi": { title: "Üründen yayınlanabilir içeriğe.", items: ["Önce: orijinal ürün ve marka brief'i", "Süreç: üretim, seçki ve insan kontrolü", "Çıktı: kanala uygun görsel ve metin"], flow: ["Orijinal ürün", "AI kampanya", "Sosyal medya", "E-ticaret"], note: "Örnek üretim akışı. Ürünün gerçek özelliklerini ve marka tutarlılığını koruyarak farklı kanallar için içerik hazırlarız." },
    },
    ctaEyebrow: "BİR PROJENİZ Mİ VAR?",
    ctaTitle: "Birlikte hayata geçirelim.",
  },
  projects: {
    heroLabel: "Projeler",
    heroTitle: "Gerçek işler, canlıdaki ürünler.",
    heroDescription: "Web, mobil, tasarım ve dijital ürün alanlarında geliştirdiğimiz seçili çalışmalar.",
    detailsLabel: "Proje detayları",
    conceptBar: "AKCY / KONSEPT",
    conceptTag: "AKCY Konsept",
    imagesPending: "Proje ekranları hazırlanıyor",
    cardCta: "Projeyi İncele",
    liveSite: "Canlı Site",
    liveSiteLabel: "Canlı site (yeni sekme)",
    filterAll: "Tümü",
    filterLabel: "Proje kategorileri",
    emptyMessage: "Bu kategoride henüz yayınlanmış bir proje bulunmuyor.",
    clearFilters: "Filtreleri Temizle",
    nextProject: "SONRAKİ PROJE",
    factService: "Hizmet",
    factYear: "Yıl",
    factSector: "Sektör",
    factPlatform: "Platform",
    back: "Projelerimize Dön",
    visitLive: "Canlı Siteyi Ziyaret Et",
    outcomes: "Sonuçlar",
    featureLabel: "Öne Çıkan Özellik",
    challenge: "Challenge",
    ourRole: "Our Role",
    solution: "Solution",
    labLabel: "LAB / KONSEPTLER",
    labDescription: "Gerçek müşteri işleri değil; AKCY'nin kendi yaklaşımını sınadığı konsept çalışmalar.",
    caseStudySuffix: "Case Study",
  },
  about: aboutContent.tr,
  home: {
    hero: {
      eyebrow: "YAPAY ZEKÂ · OTOMASYON · DİJİTAL ÜRÜNLER",
      titleFixed: "İşinizi",
      titleDynamic: "dönüştürüyoruz.",
      description:
        "Küçük ekiplerden kurumsal yapılara kadar; yapay zekâ, otomasyon ve dijital ürünlerle iş süreçlerini daha hızlı, verimli ve ölçeklenebilir hale getiriyoruz.",
      primaryCta: "Bir Proje Başlatalım",
      secondaryCta: "Projelerimizi Keşfet",
      scrollHint: "KEŞFETMEK İÇİN KAYDIR",
    },
    heroArc: {
      cardLink: "Hizmeti incele",
      previous: "Önceki hizmet",
      next: "Sonraki hizmet",
    },
    showcase: {
      label: "02 / SEÇİLİ PROJELER",
      heading: "Üzerinde çalıştığımız bazı işler.",
      allProjects: "Tüm Projeleri Gör",
      detailsLabel: "Proje detayları",
      sector: "Sektör",
      platform: "Platform",
      year: "Yıl",
      cta: "Projeyi İncele",
    },
    problems: {
      label: "03 / ÇÖZÜMLERİMİZ",
      headingStart: "Dijital problemlere",
      headingAccent: "çalışan çözümler.",
      intro:
        "Web platformlarından mobil uygulamalara, yapay zekâ otomasyonlarından kurumsal entegrasyonlara kadar işletmelerin dijital süreçlerini uçtan uca tasarlıyor, geliştiriyor ve ölçekliyoruz.",
      tagsLabel: "Yetkinlikler",
      cta: "Çözümü İncele",
      solutions: [
        {
          problem: "Web siteniz sadece bir vitrin mi?",
          category: "WEB VE DİJİTAL ÜRÜNLER",
          title: "Kurumsal Web Siteleri ve Web Platformları",
          description:
            "Markanızın yalnızca dijital vitrini değil, satış, iletişim ve operasyon süreçlerine hizmet eden yüksek performanslı web deneyimleri tasarlıyor ve geliştiriyoruz.",
          tags: ["Kurumsal Web Sitesi", "Web Uygulaması", "E-Ticaret", "Yönetim Paneli"],
        },
        {
          problem: "Müşterileriniz size cebinden ulaşamıyor mu?",
          category: "MOBİL GELİŞTİRME",
          title: "iOS ve Android Mobil Uygulamalar",
          description:
            "Fikir aşamasından App Store ve Google Play yayınına kadar kullanıcı odaklı, hızlı ve ölçeklenebilir mobil ürünler geliştiriyoruz.",
          tags: ["iOS", "Android", "Çapraz Platform", "API Entegrasyonu"],
        },
        {
          problem: "Ekibiniz aynı işi her gün elle mi yapıyor?",
          category: "YAPAY ZEKÂ VE OTOMASYON",
          title: "Yapay Zekâ ve İş Süreci Otomasyonu",
          description:
            "Tekrarlayan operasyonları yapay zekâ ve otomasyonla dönüştürerek ekiplerin manuel iş yükünü azaltıyor, süreçleri daha hızlı ve ölçülebilir hale getiriyoruz.",
          tags: ["AI Asistanları", "İş Akışı Otomasyonu", "Doküman Analizi", "Üretken Yapay Zekâ"],
        },
        {
          problem: "Hazır yazılımlar iş akışınıza uymuyor mu?",
          category: "KURUMSAL YAZILIM",
          title: "Kuruma Özel Yazılım Çözümleri",
          description:
            "Hazır yazılımların karşılamadığı iş süreçlerini, şirketinize özel geliştirilen merkezi ve sürdürülebilir yazılım sistemleriyle çözüyoruz.",
          tags: ["CRM", "ERP Modülleri", "Teklif Sistemleri", "Operasyon Yönetimi"],
        },
        {
          problem: "Sistemleriniz birbiriyle konuşmuyor mu?",
          category: "SİSTEM ENTEGRASYONU",
          title: "Sistem ve API Entegrasyonları",
          description:
            "Birbirinden bağımsız çalışan yazılımları ve veri kaynaklarını entegre ederek tek merkezden yönetilebilen dijital bir ekosistem oluşturuyoruz.",
          tags: ["API", "CRM / ERP", "Ödeme Sistemleri", "Harici Servisler"],
        },
        {
          problem: "Veriniz var ama karar vermek hâlâ zor mu?",
          category: "VERİ VE ANALİTİK",
          title: "Dashboard, Raporlama ve Veri Analitiği",
          description:
            "Dağınık verileri anlaşılır dashboard ve raporlara dönüştürerek yöneticilerin operasyonları gerçek zamanlı takip etmesini sağlıyoruz.",
          tags: ["Yönetim Paneli", "KPI Takibi", "Otomatik Raporlar", "Veri Görselleştirme"],
        },
      ],
      visuals: {
        flow: ["Doküman", "AI analiz", "İnsan kontrolü", "Çıktı"],
        table: [
          ["Teklif #1042", "Onaylandı"],
          ["Sipariş #2231", "Hazırlanıyor"],
          ["Servis #0318", "Atandı"],
          ["Teklif #1043", "Bekliyor"],
        ],
        hub: ["CRM", "ERP", "E-ticaret", "Ödeme", "Muhasebe"],
      },
    },
    process: {
      label: "04 / NASIL ÇALIŞIYORUZ",
      headingStart: "Her adımda",
      headingAccent: "netlik.",
      introLine1: "Birlikte düşünür, birlikte geliştiririz.",
      introLine2: "İlk sorudan yayına kadar, neyi neden yaptığımız nettir.",
      stampLine1: "FİKİRDEN",
      stampLine2: "ÇALIŞAN ÜRÜNE",
      outcomeLabel: "ÇIKTI",
      steps: [
        { title: "Keşif", description: "İş hedeflerini, kullanıcıları ve mevcut süreci birlikte anlarız.", outcome: "Hedefler & yol haritası", caption: "DOĞRU SORULAR" },
        { title: "Tasarım", description: "Akışları ve prototipleri somutlaştırır, geri bildirimle geliştiririz.", outcome: "Akışlar & prototip", caption: "SOMUT BİR DENEYİM" },
        { title: "Geliştirme", description: "Tasarımı çalışan ürüne dönüştürür, küçük adımlarla paylaşırız.", outcome: "Çalışan ürün & entegrasyon", caption: "ÇALIŞAN SİSTEMLER" },
        { title: "Yayın", description: "Senaryoları test eder, yayına geçişi ve sonraki adımları planlarız.", outcome: "Test & yayına geçiş", caption: "SAĞLAM BİR BAŞLANGIÇ" },
      ],
      footnote: "Her aşamada iletişim. Her kararda ortak hedef.",
      footnoteEnd: "01 → 04 / UÇTAN UCA",
    },
    capabilities: {
      label: "05 / YETKİNLİKLER",
      sideNote: "BİRBİRİNİ TAMAMLAYAN YETKİNLİKLER",
      headingLine1: "İhtiyaca göre",
      headingAccent: "teknoloji.",
      headingLine3: "Birlikte çalışan",
      headingLine4: "bir ekip.",
      signature: "TASARIM + YAZILIM + YAPAY ZEKÂ",
      approaches: [
        {
          index: "01 / İNSAN",
          title: "Ekip yaklaşımımız",
          text: "Tasarım ve geliştirmeyi ortak hedef etrafında buluşturuyoruz. Kararları birlikte alıyor, ilerlemeyi düzenli paylaşıyor ve geri bildiriminizi sürece dahil ediyoruz.",
        },
        {
          index: "02 / TEKNOLOJİ",
          title: "Teknoloji yaklaşımımız",
          text: "Araçları popülerliğine göre değil; ürünün ihtiyacı, bakım kolaylığı, veri güvenliği ve büyüme planına göre seçiyoruz. Web, mobil, API entegrasyonları ve otomasyon aynı ürünün parçaları olarak ele alınır.",
        },
      ],
      skills: ["Web & API", "Mobil", "UI/UX", "Yapay zekâ", "Otomasyon", "Tasarım sistemleri"],
      sectorsTitle: "Çalıştığımız Alanlar",
      sectorsLine1: "Farklı sektörler.",
      sectorsLine2: "Aynı özen.",
      sectors: ["Kurumsal", "Endüstri", "E-ticaret", "SaaS", "Teknoloji", "Dijital Ürünler"],
      aboutLink: "AKCY’yi tanıyın",
    },
    faq: {
      label: "06 / SIK SORULAN SORULAR",
      headingStart: "Aklınızdaki",
      headingAccent: "sorular.",
      intro: "Burada cevabını bulamadığınız bir soru varsa bize doğrudan yazabilirsiniz.",
      cta: "Soru sorun",
      items: [
        {
          question: "Bir proje ne kadar sürer?",
          answer:
            "Süre; kapsama, içeriğin hazır olup olmadığına ve entegrasyon ihtiyaçlarına göre değişir. Keşif görüşmesinden sonra aşamaları ve teslim tarihlerini içeren net bir takvim paylaşıyoruz.",
        },
        {
          question: "Fiyatlandırma nasıl belirleniyor?",
          answer:
            "Her proje farklı olduğu için sabit paketler yerine kapsama göre teklif hazırlıyoruz. İletişim formunda tahmini bütçe aralığınızı paylaşmanız, size en uygun kapsamı önermemizi kolaylaştırır.",
        },
        {
          question: "Kaynak kodlar, alan adı ve hesaplar kime ait olur?",
          answer:
            "Kaynak kod, tasarım dosyaları ve hesapların sahipliği proje başında sözleşmede açıkça tanımlanır. Alan adının şirketiniz adına kayıtlı olmasını ve yönetim erişiminin sizde bulunmasını öneriyoruz.",
        },
        {
          question: "Yayından sonra destek veriyor musunuz?",
          answer:
            "Evet. Yayından sonraki bakım, güncelleme ve yeni geliştirme ihtiyaçları için kapsamını birlikte belirlediğimiz destek planları sunuyoruz.",
        },
        {
          question: "Mevcut sistemlerimizle entegre çalışabilir mi?",
          answer:
            "Çoğu durumda evet. CRM, ERP, muhasebe, ödeme ve e-ticaret sistemleriyle API üzerinden entegrasyon kuruyor; mevcut altyapınızı değiştirmek yerine üzerine çalışan çözümler geliştiriyoruz.",
        },
        {
          question: "Küçük işletmelerle de çalışıyor musunuz?",
          answer:
            "Evet. Küçük ekiplerden kurumsal yapılara kadar farklı ölçekte işletmelerle çalışıyoruz. Büyük bir projeyle başlamak yerine en çok fayda sağlayacak tek bir adımla başlamak da mümkün.",
        },
      ],
    },
  },
  blog: {
    hero: {
      eyebrow: "AKCY BLOG · BİLGİ MERKEZİ",
      headingLead: "Dijital ürünler, otomasyon ve yapay zekâ üzerine",
      headingAccent: "uygulanabilir rehberler.",
      description:
        "Web, WordPress, şirket süreç otomasyonu ve yapay zekâ projelerinde edindiğimiz deneyimleri; karar vermenizi kolaylaştıracak net ve pratik yazılara dönüştürüyoruz.",
      statPosts: "Rehber yazı",
      statTopics: "Konu başlığı",
      statMinutes: "Dakika içerik",
      topicsTitle: "KONULARA GÖZ ATIN",
      postCount: "{count} yazı",
      marquee: ["Yapay Zekâ", "Süreç Otomasyonu", "WordPress", "n8n & Entegrasyon", "Core Web Vitals", "UI / UX", "Belge İşleme", "Kurumsal Web"],
    },
    listing: {
      allPosts: "TÜM YAZILAR",
      headingStart: "Son yazılar ve",
      headingAccent: "rehberler",
      resultCount: "yazı listeleniyor",
      all: "Tümü",
      categoriesLabel: "Kategoriler",
      searchLabel: "Yazılarda ara",
      searchPlaceholder: "Yazılarda ara...",
      emptyMessage: "Aradığınız kriterlere uygun yazı bulunamadı.",
      clearFilters: "Filtreleri Temizle",
      pagination: "Sayfalama",
      previousPage: "Önceki sayfa",
      nextPage: "Sonraki sayfa",
    },
    card: {
      readingTime: "{minutes} dk okuma",
      readMore: "Yazıyı oku",
      editor: "AKCY Editör",
      featured: "Öne çıkan yazı",
    },
    detail: {
      breadcrumb: "Sayfa yolu",
      published: "Yayın tarihi",
      updated: "Güncelleme",
      readingTimeLabel: "Okuma süresi",
      minutes: "{minutes} dakika",
    },
    article: {
      tip: "İpucu",
      note: "Dikkat",
      copy: "Kopyala",
      copied: "Kopyalandı",
    },
    video: {
      title: "Video",
      label: "VİDEO",
      consent: "Videoyu yüklediğinizde {provider} ile bağlantı kurulur; hizmet kendi gizlilik ve çerez uygulamalarını kullanabilir.",
      allow: "İzin ver ve videoyu yükle",
      cookiePolicy: "Çerez Politikası",
    },
    toc: { title: "İçindekiler" },
    faq: { eyebrow: "SIK SORULAN SORULAR", heading: "Sık Sorulan Sorular" },
    share: {
      label: "Yazıyı paylaş",
      text: "Faydalı bulduysanız ekibinizle paylaşın.",
      linkedin: "LinkedIn'de paylaş",
      x: "X'te paylaş",
      whatsapp: "WhatsApp'ta paylaş",
      copyLink: "Linki kopyala",
      copied: "Kopyalandı",
    },
    author: {
      label: "Yazar hakkında",
      eyebrow: "YAZAR",
      bio: "AKCY; kurumsal web siteleri, WordPress projeleri, şirket süreç otomasyonu ve yapay zekâ çözümleri geliştiren bir dijital ürün stüdyosu. Bu blogda sahada edindiğimiz deneyimleri paylaşıyoruz.",
      link: "Ekibimizi tanıyın",
    },
    next: "SONRAKİ YAZI",
    related: { eyebrow: "OKUMAYA DEVAM EDİN", heading: "Bunlar da ilginizi çekebilir", all: "Tüm yazılar" },
    cta: {
      eyebrow: "PROJENİZ Mİ VAR?",
      heading: "Okuduklarınızı işletmenizde hayata geçirelim.",
      description:
        "WordPress siteniz, süreç otomasyonunuz veya yapay zekâ projeniz için ihtiyacınızı birlikte netleştirip size özel bir yol haritası hazırlayalım.",
      primary: "Ön görüşme planlayın",
      secondary: "Hizmetlerimiz",
    },
  },
  contact: {
    hero: {
      eyebrow: "İLETİŞİM",
      titleLine1: "Bir fikriniz mi var?",
      titleLine2: "Konuşalım.",
      description: "Yeni bir ürün, daha iyi bir deneyim veya daha akıllı bir iş akışı. İhtiyacınızı birlikte netleştirelim.",
      cta: "Projenizi anlatın",
      processLabel: "SÜREÇ NASIL İLERLER?",
      steps: [
        { title: "Formu doldurun", text: "İhtiyacınızı ve varsa zaman planınızı kısaca paylaşın." },
        { title: "Ön görüşme yapalım", text: "Hedefleri, kapsamı ve öncelikleri birlikte netleştirelim." },
        { title: "Yol haritası ve teklif", text: "Kapsama uygun bir plan ve teklifle size dönelim." },
      ],
    },
    info: {
      heading: "Birlikte başlayalım.",
      intro: "Yeni projeler ve iş birlikleri için bize ulaşabilirsiniz. Mesajınıza en kısa sürede dönüş yapıyoruz.",
      email: "E-posta",
      phone: "Telefon",
      location: "Konum",
      locationValue: "İstanbul, Türkiye",
    },
    section: {
      eyebrow: "PROJENİZİ ANLATIN",
      heading: "Nasıl yardımcı olabiliriz?",
      description: "Projeniz hakkında birkaç detay paylaşın; ihtiyacınızı inceleyip sizinle iletişime geçelim.",
    },
    form: {
      honeypot: "Web siteniz",
      name: "Ad Soyad",
      namePlaceholder: "Adınız ve soyadınız",
      email: "E-posta",
      emailPlaceholder: "ornek@email.com",
      phone: "Telefon",
      company: "Firma / Marka",
      companyPlaceholder: "Firma veya marka adı",
      projectType: "Proje türü",
      projectTypePlaceholder: "Bir hizmet seçin",
      otherType: "Diğer",
      budget: "Tahmini bütçe",
      budgetPlaceholder: "Bir aralık seçin",
      budgetRanges: ["Henüz belirlenmedi", "25.000 TL – 50.000 TL", "50.000 TL – 100.000 TL", "100.000 TL – 250.000 TL", "250.000 TL+", "Görüşelim"],
      timeline: "Tahmini başlangıç",
      timelinePlaceholder: "Bir zaman aralığı seçin",
      timelines: ["En kısa sürede", "1 ay içinde", "1–3 ay", "Henüz planlama aşamasında"],
      message: "Projenizden bahsedin",
      messagePlaceholder: "Projenizin amacı, ihtiyacınız ve varsa hedeflediğiniz zaman planından kısaca bahsedebilirsiniz.",
      errors: {
        name: "Lütfen adınızı ve soyadınızı girin.",
        emailRequired: "Lütfen e-posta adresinizi girin.",
        emailInvalid: "Geçerli bir e-posta adresi girin.",
        message: "Lütfen projeniz hakkında birkaç bilgi paylaşın.",
      },
      serverErrors: {
        "400": "Ad, e-posta ve mesaj alanları zorunludur.",
        "413": "İstek çok büyük.",
        "429": "Çok fazla istek gönderildi. Lütfen biraz sonra tekrar deneyin.",
      },
      successTitle: "Mesajınızı aldık.",
      successText: "Teşekkür ederiz. Projenizi inceleyip en kısa sürede sizinle iletişime geçeceğiz.",
      newMessage: "Yeni mesaj gönder",
      errorGeneric: "Mesajınız gönderilemedi.",
      errorRetryStart: "Tekrar deneyebilir veya",
      errorRetryEnd: " adresine yazabilirsiniz.",
      consent: "Formu göndererek sizinle iletişime geçmemizi kabul etmiş olursunuz.",
      submitting: "Gönderiliyor...",
      verifying: "Doğrulama bekleniyor...",
      submit: "Mesaj Gönder",
    },
  },
  legal: {
    label: "YASAL / AKCY",
    subtitle: "Verilerinizin nasıl işlendiği ve korunduğu hakkında şeffaf bilgi.",
    updated: "Son Güncelleme",
    questionTitle: "Sorunuz mu var?",
    questionText: "Kişisel verileriniz veya gizlilik uygulamalarımız hakkında bizimle iletişime geçebilirsiniz.",
    cta: "Bizimle İletişime Geçin",
    contents: "İçindekiler",
    contentsLabel: "İÇİNDEKİLER",
  },
  quote: {
    label: "Teklif alın: projenizi konuşalım",
    ring: "TEKLİF AL",
  },
  //@@SECTIONS_TR
};

/* Sözlüğün yapısı (değerler dile göre değişir) */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof tr>;
