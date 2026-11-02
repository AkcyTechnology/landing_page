/*
  Hakkımızda sayfasının metinleri.
  Bileşenler metni doğrudan yazmaz; buradaki sözlükten okur. İngilizce dil
  seçeneği eklendiğinde aynı yapıdaki "en" sözlüğü kullanılabilir.
*/

export type Locale = "tr" | "en";

export interface AboutContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    titleLines: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
    flow: string[];
    flowLabel: string;
    visualAlt: { desktop: string; mobile: string };
  };
  intro: {
    eyebrow: string;
    title: string;
    body: string;
    statement: string;
    illustrationLabel: string;
    illustrationSteps: string[];
  };
  value: {
    eyebrow: string;
    title: string;
    rows: { title: string; description: string; visual: "merge" | "connect" | "interface" }[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { number: string; title: string; description: string }[];
  };
  principles: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string }[];
  };
  closing: {
    titleStart: string;
    titleEnd: string;
    staticWord: string;
    words: string[];
    accessibleTitle: string;
    tags: string[];
    pause: string;
    resume: string;
    tagsLabel: string;
  };
}

export const aboutContent: Record<Locale, AboutContent> = {
  tr: {
    meta: {
      title: "Hakkımızda",
      description:
        "2025’te kurulan AKCY Technologies; web ve mobil yazılım, yapay zekâ ve iş süreçleri otomasyonu alanlarında işletmelere çözümler geliştirir.",
    },
    hero: {
      eyebrow: "AKCY / Hakkımızda",
      titleLines: ["Fikirlerinize", "teknolojiyle", "hayat veriyoruz."],
      description:
        "İşletmelerin ihtiyaçlarını anlayarak web, mobil, yapay zekâ ve otomasyon çözümleri geliştiriyoruz. Fikirleri kullanılabilir ürünlere, karmaşık süreçleri daha verimli iş akışlarına dönüştürüyoruz.",
      primaryCta: "Projenizi Konuşalım",
      secondaryCta: "Bizi Tanıyın",
      flow: ["Bir fikir", "Bir çözüm", "Gerçek kullanım"],
      flowLabel: "Bir fikirden bir çözüme, oradan gerçek kullanıma.",
      visualAlt: {
        desktop: "AKCY’nin geliştirdiği Gökçe Kombi web sitesinin masaüstü görünümü",
        mobile: "AKCY’nin geliştirdiği Çakıroğlu Savunma web sitesinin mobil görünümü",
      },
    },
    intro: {
      eyebrow: "Biz kimiz?",
      title: "İhtiyaçtan çözüme.",
      body: "2025’te kurulan AKCY Technologies, işletmeler için yazılım, yapay zekâ ve otomasyon çözümleri geliştirir. Her projeye ihtiyacı anlamakla başlar; tasarım ve teknolojiyi, günlük kullanımda karşılık bulan çözümler üretmek için bir araya getiririz.",
      statement: "Önce anlarız. Sonra geliştiririz.",
      illustrationLabel: "Tasarımdan koda, koddan kullanıma hazır ürüne uzanan süreç çizimi",
      illustrationSteps: ["Tasarım", "Geliştirme", "Ürün"],
    },
    value: {
      eyebrow: "Neden önemli?",
      title: "Teknoloji, işinizde karşılık bulduğunda değerli.",
      rows: [
        {
          title: "Daha az tekrar.",
          description: "Tekrarlayan işleri otomasyonla sadeleştiren çözümler.",
          visual: "merge",
        },
        {
          title: "Daha bağlantılı süreçler.",
          description: "Veri ve uygulamaları bir araya getiren entegrasyonlar.",
          visual: "connect",
        },
        {
          title: "Daha iyi dijital deneyimler.",
          description: "Kullanıcı ihtiyaçlarına göre tasarlanan web ve mobil uygulamalar.",
          visual: "interface",
        },
      ],
    },
    process: {
      eyebrow: "Çalışma yaklaşımımız",
      title: "Fikirden kullanıma, birlikte.",
      description: "Her projede aynı dört adımı izleriz; kapsam ve hız ihtiyaca göre şekillenir.",
      steps: [
        { number: "01", title: "Anlıyoruz", description: "İhtiyaçları, hedefleri ve mevcut süreci birlikte netleştiriyoruz." },
        { number: "02", title: "Tasarlıyoruz", description: "Kullanıcı deneyimini ve teknik yapıyı çözümün amacına göre şekillendiriyoruz." },
        { number: "03", title: "Geliştiriyoruz", description: "Çözümü adım adım geliştiriyor, test ediyor ve geri bildirimlerle iyileştiriyoruz." },
        { number: "04", title: "Birlikte İlerliyoruz", description: "Kullanıma geçişin ardından destek ve geliştirmelerle süreci sürdürüyoruz." },
      ],
    },
    principles: {
      eyebrow: "İlkelerimiz",
      title: "Çalışma biçimimizin temelinde",
      items: [
        { title: "Açık iletişim", description: "Süreci, kararları ve beklentileri anlaşılır tutarız." },
        { title: "Kullanılabilirlik", description: "Çözümü, onu her gün kullanacak insanlar için tasarlarız." },
        { title: "Sürdürülebilir geliştirme", description: "Bakımı ve geliştirilmesi mümkün yapılar kurmayı önemseriz." },
        { title: "Amaca uygun teknoloji", description: "Teknoloji tercihlerimizi ihtiyaca göre yaparız." },
      ],
    },
    closing: {
      titleStart: "Birlikte harika",
      titleEnd: "geliştirelim.",
      staticWord: "bir şey",
      words: ["bir şey", "bir web deneyimi", "bir mobil uygulama", "akıllı bir çözüm"],
      accessibleTitle: "Birlikte harika bir şey geliştirelim.",
      tags: [
        "Web Tasarım", "Mobil Uygulama", "Yapay Zekâ", "Otomasyon", "Yazılım", "Entegrasyon", "Dijital Deneyim",
        "API", "E-Ticaret", "Arayüz Tasarımı", "Kullanıcı Deneyimi", "Veri Analizi", "İş Süreçleri",
        "Bulut Çözümleri", "Dijital Dönüşüm", "Fikir", "Tasarım", "Teknoloji", "Geliştirme", "İnovasyon",
      ],
      pause: "Hareketi duraklat",
      resume: "Hareketi sürdür",
      tagsLabel: "Çalışma alanlarımız",
    },
  },
  en: {
    meta: {
      title: "About Us",
      description:
        "Founded in 2025, AKCY Technologies builds web and mobile software, artificial intelligence and business process automation solutions for companies.",
    },
    hero: {
      eyebrow: "AKCY / About Us",
      titleLines: ["We bring your", "ideas to life", "with technology."],
      description:
        "We build web, mobile, AI and automation solutions by understanding what businesses need. We turn ideas into usable products and complex processes into more efficient workflows.",
      primaryCta: "Let’s Talk About Your Project",
      secondaryCta: "Get to Know Us",
      flow: ["An idea", "A solution", "Real use"],
      flowLabel: "From an idea to a solution, and on to real use.",
      visualAlt: {
        desktop: "Desktop view of the Gökçe Kombi website built by AKCY",
        mobile: "Mobile view of the Çakıroğlu Savunma website built by AKCY",
      },
    },
    intro: {
      eyebrow: "Who are we?",
      title: "From need to solution.",
      body: "Founded in 2025, AKCY Technologies builds software, AI and automation solutions for businesses. Every project starts with understanding the need; we bring design and technology together to create solutions that hold up in everyday use.",
      statement: "First we understand. Then we build.",
      illustrationLabel: "Illustration of the process from design to code to a product ready for use",
      illustrationSteps: ["Design", "Development", "Product"],
    },
    value: {
      eyebrow: "Why it matters",
      title: "Technology is valuable when it pays off in your business.",
      rows: [
        { title: "Less repetition.", description: "Solutions that simplify repetitive work through automation.", visual: "merge" },
        { title: "More connected processes.", description: "Integrations that bring data and applications together.", visual: "connect" },
        { title: "Better digital experiences.", description: "Web and mobile applications designed around user needs.", visual: "interface" },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "From idea to use, together.",
      description: "Every project follows the same four steps; scope and pace adapt to the need.",
      steps: [
        { number: "01", title: "We understand", description: "We clarify needs, goals and the current process together." },
        { number: "02", title: "We design", description: "We shape the user experience and technical structure around the purpose of the solution." },
        { number: "03", title: "We build", description: "We develop the solution step by step, test it and improve it with feedback." },
        { number: "04", title: "We move forward together", description: "After launch, we keep the process going with support and improvements." },
      ],
    },
    principles: {
      eyebrow: "Our principles",
      title: "At the core of how we work",
      items: [
        { title: "Open communication", description: "We keep the process, decisions and expectations clear." },
        { title: "Usability", description: "We design the solution for the people who will use it every day." },
        { title: "Sustainable development", description: "We care about building structures that can be maintained and extended." },
        { title: "Fit-for-purpose technology", description: "We choose technology based on the need." },
      ],
    },
    closing: {
      titleStart: "Let’s build",
      titleEnd: "together.",
      staticWord: "something great",
      words: ["something great", "a great web experience", "a great mobile app", "a smart solution"],
      accessibleTitle: "Let’s build something great together.",
      tags: [
        "Web Design", "Mobile App", "AI", "Automation", "Software", "Integration", "Digital Experience",
        "API", "E-Commerce", "Interface Design", "User Experience", "Data Analysis", "Business Processes",
        "Cloud Solutions", "Digital Transformation", "Idea", "Design", "Technology", "Development", "Innovation",
      ],
      pause: "Pause motion",
      resume: "Resume motion",
      tagsLabel: "Our areas of work",
    },
  },
};
