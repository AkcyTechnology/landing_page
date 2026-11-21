import type { Locale } from "@/i18n/config";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/lib/contact";

/*
  SORU-CEVAP ASİSTANI — sitedeki sohbet penceresinin bütün içeriği bu dosyadadır.

  Yeni soru eklemek için listeye bir öge ekleyin:
    {
      id: "benzersiz-kisa-ad",             // değiştirmeyin; aramada ve bağlantılarda kullanılır
      question: "Ziyaretçinin göreceği soru?",
      answer: "Cevap metni. Paragraf için boş satır bırakın (\n\n).",
      keywords: ["fiyat", "ücret", "maliyet"], // ziyaretçi yazdığında eşleşecek kelimeler
      links: [{ label: "Teklif alın", href: "/teklif" }], // isteğe bağlı butonlar
    }

  - Bağlantılar Türkçe adresle yazılır (/hizmetler, /teklif…); İngilizce sitede
    otomatik olarak İngilizce adrese çevrilir.
  - Anahtar kelimeleri küçük harfle ve Türkçe karakter düşünmeden yazabilirsiniz;
    eşleşmede büyük/küçük harf ve ç/ğ/ı/ö/ş/ü farkı yok sayılır.
  - "featured: true" olan sorular sohbet açıldığında ilk öneri olarak görünür.
*/

export interface FaqLink {
  label: string;
  href: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  links?: FaqLink[];
  featured?: boolean;
}

const tr: FaqItem[] = [
  {
    id: "hizmetler",
    question: "Hangi hizmetleri sunuyorsunuz?",
    answer:
      "Web geliştirme, UI/UX tasarım, mobil uygulamalar, kuruma özel yazılım, yapay zekâ çözümleri, dijital otomasyon ve yapay zekâ destekli içerik üretimi alanlarında çalışıyoruz.\n\nİhtiyacı anlamaktan tasarıma, geliştirmeden yayına kadar bütün süreci tek ekipte yürütüyoruz.",
    keywords: ["hizmet", "ne yapiyorsunuz", "neler", "web", "mobil", "uygulama", "tasarim", "yazilim", "otomasyon"],
    links: [{ label: "Tüm hizmetler", href: "/hizmetler" }],
    featured: true,
  },
  {
    id: "teklif",
    question: "Nasıl teklif alabilirim?",
    answer:
      "Teklif sayfamızdaki 4 adımlık formu doldurmanız yeterli: ihtiyacınızı, projenizin aşamasını, bütçe aralığınızı ve iletişim bilgilerinizi paylaşın. Talebinizi inceleyip size özel bir yol haritası ve teklifle dönüyoruz.",
    keywords: ["teklif", "fiyat teklifi", "baslamak", "baslayalim", "proje baslat", "form"],
    links: [{ label: "Teklif al", href: "/teklif" }],
    featured: true,
  },
  {
    id: "sure",
    question: "Bir proje ne kadar sürer?",
    answer:
      "Süre; kapsama, içeriğin hazır olup olmadığına ve entegrasyon ihtiyaçlarına göre değişir. Keşif görüşmesinden sonra aşamaları ve teslim tarihlerini içeren net bir takvim paylaşıyoruz.",
    keywords: ["sure", "ne kadar surer", "zaman", "takvim", "teslim", "kac gun", "kac hafta", "kac ay"],
    featured: true,
  },
  {
    id: "fiyat",
    question: "Fiyatlandırma nasıl belirleniyor?",
    answer:
      "Her proje farklı olduğu için sabit paketler yerine kapsama göre teklif hazırlıyoruz. Teklif formunda tahmini bütçe aralığınızı paylaşmanız, size en uygun kapsamı önermemizi kolaylaştırır.",
    keywords: ["fiyat", "ucret", "maliyet", "butce", "kac para", "ne kadar tutar", "paket"],
    links: [{ label: "Teklif al", href: "/teklif" }],
    featured: true,
  },
  {
    id: "surec",
    question: "Süreç nasıl ilerliyor?",
    answer:
      "1. Formu doldurursunuz: ihtiyacınızı ve varsa zaman planınızı kısaca paylaşırsınız.\n2. Ön görüşme yaparız: hedefleri, kapsamı ve öncelikleri birlikte netleştiririz.\n3. Yol haritası ve teklif: kapsama uygun bir plan ve teklifle size döneriz.",
    keywords: ["surec", "nasil ilerliyor", "adim", "asama", "nasil calisiyorsunuz", "gorusme"],
  },
  {
    id: "destek",
    question: "Yayından sonra destek veriyor musunuz?",
    answer:
      "Evet. Yayından sonraki bakım, güncelleme ve yeni geliştirme ihtiyaçları için kapsamını birlikte belirlediğimiz destek planları sunuyoruz.",
    keywords: ["destek", "bakim", "guncelleme", "yayindan sonra", "garanti"],
  },
  {
    id: "sahiplik",
    question: "Kaynak kodlar, alan adı ve hesaplar kime ait olur?",
    answer:
      "Kaynak kod, tasarım dosyaları ve hesapların sahipliği proje başında sözleşmede açıkça tanımlanır. Alan adının şirketiniz adına kayıtlı olmasını ve yönetim erişiminin sizde bulunmasını öneriyoruz.",
    keywords: ["kaynak kod", "sahiplik", "alan adi", "domain", "hesap", "kime ait", "sozlesme"],
  },
  {
    id: "entegrasyon",
    question: "Mevcut sistemlerimizle entegre çalışabilir mi?",
    answer:
      "Çoğu durumda evet. CRM, ERP, muhasebe, ödeme ve e-ticaret sistemleriyle API üzerinden entegrasyon kuruyor; mevcut altyapınızı değiştirmek yerine üzerine çalışan çözümler geliştiriyoruz.",
    keywords: ["entegrasyon", "crm", "erp", "muhasebe", "odeme", "api", "mevcut sistem", "e-ticaret"],
  },
  {
    id: "yapay-zeka",
    question: "Yapay zekâ ile neler yapabilirsiniz?",
    answer:
      "İş süreçlerinize özel yapay zekâ çözümleri geliştiriyoruz: şirket bilgisinden cevap veren asistanlar, belge ve veri işleme, satış ve teklif otomasyonu gibi.\n\nAmacımız gösterişli bir demo değil, günlük işte gerçekten zaman kazandıran sistemler kurmak.",
    keywords: ["yapay zeka", "ai", "asistan", "chatbot", "otomasyon", "belge", "veri"],
    links: [{ label: "Yapay zekâ çözümleri", href: "/hizmetler#yapay-zeka" }],
  },
  {
    id: "kucuk-isletme",
    question: "Küçük işletmelerle de çalışıyor musunuz?",
    answer:
      "Evet. Küçük ekiplerden kurumsal yapılara kadar farklı ölçekte işletmelerle çalışıyoruz. Büyük bir projeyle başlamak yerine en çok fayda sağlayacak tek bir adımla başlamak da mümkün.",
    keywords: ["kucuk", "kobi", "esnaf", "startup", "girisim", "olcek"],
  },
  {
    id: "sektorler",
    question: "Hangi sektörlerle çalışıyorsunuz?",
    answer:
      "Kurumsal firmalar, endüstri, e-ticaret, SaaS, teknoloji ve dijital ürün alanlarında projeler geliştiriyoruz. Farklı sektörler, aynı özen.",
    keywords: ["sektor", "alan", "endustri", "kurumsal", "saas", "hangi firmalar"],
    links: [{ label: "Projelerimiz", href: "/projelerimiz" }],
  },
  {
    id: "projeler",
    question: "Daha önce hangi projeleri yaptınız?",
    answer:
      "Kurumsal web sitelerinden mobil uygulamalara kadar farklı alanlarda geliştirdiğimiz projeleri Projelerimiz sayfasında ekran görüntüleriyle inceleyebilirsiniz.",
    keywords: ["proje", "referans", "portfolyo", "ornek", "is", "musteri"],
    links: [{ label: "Projelerimiz", href: "/projelerimiz" }],
  },
  {
    id: "iletisim",
    question: "Size nasıl ulaşabilirim?",
    answer: `E-posta: ${CONTACT_EMAIL}\nTelefon / WhatsApp: ${CONTACT_PHONE_DISPLAY}\n\nİletişim sayfamızdaki formdan da yazabilirsiniz; mesajınıza en kısa sürede dönüş yapıyoruz.`,
    keywords: ["iletisim", "ulasmak", "telefon", "mail", "e-posta", "whatsapp", "adres", "numara"],
    links: [{ label: "İletişim", href: "/iletisim" }],
  },
];

const en: FaqItem[] = [
  {
    id: "hizmetler",
    question: "What services do you offer?",
    answer:
      "We work on web development, UI/UX design, mobile apps, custom software, AI solutions, process automation and AI-assisted content production.\n\nWe run the whole process — from understanding the need to design, development and launch — in one team.",
    keywords: ["service", "what do you do", "web", "mobile", "app", "design", "software", "automation"],
    links: [{ label: "All services", href: "/hizmetler" }],
    featured: true,
  },
  {
    id: "teklif",
    question: "How can I get a quote?",
    answer:
      "Fill in the 4-step form on our quote page: share your needs, your project stage, your budget range and your contact details. We review your request and get back with a tailored roadmap and quote.",
    keywords: ["quote", "proposal", "start", "get started", "form"],
    links: [{ label: "Get a quote", href: "/teklif" }],
    featured: true,
  },
  {
    id: "sure",
    question: "How long does a project take?",
    answer:
      "It depends on the scope, whether the content is ready and the integrations needed. After the discovery call we share a clear schedule with phases and delivery dates.",
    keywords: ["how long", "time", "timeline", "duration", "deadline", "weeks", "months"],
    featured: true,
  },
  {
    id: "fiyat",
    question: "How is pricing determined?",
    answer:
      "Every project is different, so instead of fixed packages we prepare a quote based on scope. Sharing your estimated budget range in the quote form helps us suggest the scope that fits you best.",
    keywords: ["price", "pricing", "cost", "budget", "how much", "package", "fee"],
    links: [{ label: "Get a quote", href: "/teklif" }],
    featured: true,
  },
  {
    id: "surec",
    question: "How does the process work?",
    answer:
      "1. You fill in the form: briefly share your needs and timeline.\n2. We have an initial call: we clarify goals, scope and priorities together.\n3. Roadmap and quote: we get back with a plan and quote that fit the scope.",
    keywords: ["process", "steps", "how do you work", "call", "meeting"],
  },
  {
    id: "destek",
    question: "Do you provide support after launch?",
    answer:
      "Yes. For maintenance, updates and new development after launch, we offer support plans whose scope we define together.",
    keywords: ["support", "maintenance", "update", "after launch", "warranty"],
  },
  {
    id: "sahiplik",
    question: "Who owns the source code, domain and accounts?",
    answer:
      "Ownership of the source code, design files and accounts is clearly defined in the contract at the start of the project. We recommend that the domain is registered in your company’s name and that you keep admin access.",
    keywords: ["source code", "ownership", "domain", "account", "who owns", "contract"],
  },
  {
    id: "entegrasyon",
    question: "Can it work with our existing systems?",
    answer:
      "In most cases, yes. We integrate with CRM, ERP, accounting, payment and e-commerce systems via APIs, building on top of your existing infrastructure instead of replacing it.",
    keywords: ["integration", "crm", "erp", "accounting", "payment", "api", "existing system", "e-commerce"],
  },
  {
    id: "yapay-zeka",
    question: "What can you build with AI?",
    answer:
      "We build AI solutions tailored to your processes: assistants that answer from company knowledge, document and data processing, sales and quote automation and more.\n\nOur goal isn’t a flashy demo but systems that genuinely save time in daily work.",
    keywords: ["ai", "artificial intelligence", "assistant", "chatbot", "automation", "document", "data"],
    links: [{ label: "AI solutions", href: "/hizmetler#yapay-zeka" }],
  },
  {
    id: "kucuk-isletme",
    question: "Do you also work with small businesses?",
    answer:
      "Yes. We work with businesses of every size, from small teams to large organisations. Instead of starting with a big project, you can also start with the single step that brings the most value.",
    keywords: ["small", "sme", "startup", "small business", "size"],
  },
  {
    id: "sektorler",
    question: "Which industries do you work with?",
    answer:
      "We build projects for corporate companies, industry, e-commerce, SaaS, technology and digital products. Different industries, the same care.",
    keywords: ["industry", "sector", "corporate", "saas", "which companies"],
    links: [{ label: "Our projects", href: "/projelerimiz" }],
  },
  {
    id: "projeler",
    question: "What projects have you done before?",
    answer:
      "You can explore projects we have built — from corporate websites to mobile apps — with screenshots on our Projects page.",
    keywords: ["project", "reference", "portfolio", "example", "work", "client"],
    links: [{ label: "Our projects", href: "/projelerimiz" }],
  },
  {
    id: "iletisim",
    question: "How can I reach you?",
    answer: `Email: ${CONTACT_EMAIL}\nPhone / WhatsApp: ${CONTACT_PHONE_DISPLAY}\n\nYou can also write to us through the form on our contact page; we reply as soon as possible.`,
    keywords: ["contact", "reach", "phone", "email", "whatsapp", "address", "number"],
    links: [{ label: "Contact", href: "/iletisim" }],
  },
];

export function getFaqItems(locale: Locale): FaqItem[] {
  return locale === "en" ? en : tr;
}
