import type { Locale } from "@/i18n/config";
import type { FaqItem } from "./blog";

/*
  Hizmet detay sayfalarındaki "Kimler için", "Çözdüğü problemler" ve SSS içerikleri.
  Arama motorlarının ve yapay zekâ destekli arama sistemlerinin hizmeti doğru
  anlayabilmesi için somut ve doğrulanabilir bilgiler içerir; rakam, müşteri
  veya sertifika iddiası bulunmaz. Anahtar: Türkçe (kanonik) hizmet slug'ı.
*/
export interface ServiceInsight {
  audience: string[];
  problems: string[];
  faq: FaqItem[];
  /** İlgili diğer hizmetler (Türkçe slug) */
  related: string[];
}

const tr: Record<string, ServiceInsight> = {
  "web-gelistirme": {
    audience: [
      "Kurumsal web sitesini yenilemek isteyen şirketler",
      "Teklif, katalog veya başvuru toplayan hizmet işletmeleri",
      "Ürün veya müşteri paneline ihtiyaç duyan SaaS girişimleri",
      "Yavaş, mobilde bozulan veya yönetilemeyen bir siteye sahip ekipler",
    ],
    problems: [
      "Mobilde yavaş açılan ve ziyaretçi kaybettiren sayfalar",
      "Arama motorlarında görünmeyen hizmet ve ürün sayfaları",
      "İçerik güncellemek için her seferinde yazılımcıya ihtiyaç duyulması",
      "Formlardan gelen taleplerin e-posta kutularında kaybolması",
    ],
    faq: [
      {
        question: "Mevcut sitemizi yenilerken arama motoru sıralamamız korunur mu?",
        answer:
          "Eski adresleri yeni adreslere 301 yönlendirmesiyle bağlıyor, sayfa başlıklarını ve içerik yapısını koruyor, yeni site haritasını Search Console'a göndermeniz için hazırlıyoruz. Bu adımlar geçiş sırasında görünürlük kaybı riskini en aza indirir.",
      },
      {
        question: "Hangi teknolojiyle geliştiriyorsunuz, WordPress de yapıyor musunuz?",
        answer:
          "Performans ve özelleştirme gerektiren projelerde Next.js, React ve TypeScript kullanıyoruz. İçeriği ekibinizin sık güncelleyeceği kurumsal sitelerde WordPress de uygun bir seçenek olabilir; karar, içerik yönetimi ihtiyacınıza ve bütçenize göre keşif aşamasında verilir.",
      },
      {
        question: "Site teslim edildikten sonra içerikleri kendimiz güncelleyebilir miyiz?",
        answer:
          "Evet. İhtiyaca göre bir içerik yönetim paneli kuruyor veya içerik yapısını ekibinizin düzenleyebileceği şekilde hazırlıyoruz. Teslimde düzenleme adımlarını gösteren kısa bir kullanım rehberi paylaşıyoruz.",
      },
      {
        question: "SEO ve hız optimizasyonu ayrıca mı ücretlendiriliyor?",
        answer:
          "Temel teknik SEO (başlık ve açıklama alanları, site haritası, yapılandırılmış veri, doğru başlık hiyerarşisi) ve Core Web Vitals odaklı geliştirme her projenin standart kapsamındadır. Düzenli içerik üretimi veya kampanya bazlı SEO çalışmaları ayrıca planlanır.",
      },
    ],
    related: ["ui-ux-tasarim", "kurumsal-yazilim"],
  },
  "ui-ux-tasarim": {
    audience: [
      "Yeni bir dijital ürünü geliştirmeden önce doğrulamak isteyen ekipler",
      "Kullanıcıların zorlandığı mevcut bir uygulamayı iyileştirmek isteyen şirketler",
      "Birden fazla ürün için ortak bir tasarım dili kurmak isteyen markalar",
      "Tasarımı geliştirici ekibine net biçimde teslim etmek isteyen yazılım ekipleri",
    ],
    problems: [
      "Kullanıcıların formu veya satın alma adımını yarıda bırakması",
      "Her ekranın farklı görünmesi ve tutarsız bileşenler",
      "Geliştirme sırasında sürekli değişen ve belirsiz tasarım kararları",
      "Ürün fikrinin kod yazılmadan önce test edilememesi",
    ],
    faq: [
      {
        question: "UI ve UX arasındaki fark nedir?",
        answer:
          "UX (kullanıcı deneyimi), kullanıcının bir işi hangi adımlarla ve ne kadar kolay tamamladığını tasarlar: akışlar, bilgi mimarisi ve etkileşim. UI (kullanıcı arayüzü) ise bu akışın görsel katmanıdır: tipografi, renk, bileşenler ve yerleşim. İyi bir ürün için ikisi birlikte ele alınır.",
      },
      {
        question: "Tasarımları hangi araçla ve hangi formatta teslim ediyorsunuz?",
        answer:
          "Tasarımları Figma'da hazırlıyor; ekranları, etkileşimli prototipi ve bileşen kütüphanesini düzenli bir dosya yapısıyla teslim ediyoruz. Renk, tipografi ve boşluk değerlerini geliştiricilerin doğrudan kullanabileceği tasarım token'ları olarak belgeliyoruz.",
      },
      {
        question: "Sadece tasarım hizmeti alıp geliştirmeyi kendi ekibimizle yapabilir miyiz?",
        answer:
          "Evet. Teslim sürecini kendi geliştirici ekibinizin çalışma biçimine göre planlıyor, bileşen davranışlarını ve kenar durumlarını belgeliyoruz. Geliştirme sırasında tasarım sorularına destek verebiliriz.",
      },
    ],
    related: ["web-gelistirme", "mobil-uygulamalar"],
  },
  "mobil-uygulamalar": {
    audience: [
      "Müşterilerine iOS ve Android üzerinden hizmet sunmak isteyen işletmeler",
      "Saha ekipleri için kurum içi uygulamaya ihtiyaç duyan şirketler",
      "Web ürününü tamamlayan bir mobil uygulama planlayan SaaS ekipleri",
      "Fikrini ilk sürümle pazarda test etmek isteyen girişimler",
    ],
    problems: [
      "Müşterilerle düzenli ve doğrudan iletişim kuracak bir kanalın olmaması",
      "Sahadaki ekiplerin kâğıt formlar veya mesajlaşma uygulamalarıyla çalışması",
      "Mağaza yayın sürecinin ve gereksinimlerinin bilinmemesi",
      "Yayından sonra güncellenmeyen ve eskiyen uygulamalar",
    ],
    faq: [
      {
        question: "Native mi, cross-platform mu geliştirmeliyiz?",
        answer:
          "Çoğu iş uygulamasında React Native ile tek kod tabanından iOS ve Android uygulaması geliştirmek maliyet ve bakım açısından avantaj sağlar. Cihaz donanımına yoğun erişim veya platforma özel performans gereken durumlarda Swift ve Kotlin ile native geliştirme öneriyoruz.",
      },
      {
        question: "App Store ve Google Play yayın sürecini siz mi yönetiyorsunuz?",
        answer:
          "Evet. Mağaza hesaplarının hazırlığını, uygulama açıklamalarını, ekran görüntülerini, gizlilik bildirimlerini ve inceleme sürecini proje kapsamında planlıyoruz. Geliştirici hesaplarının şirketiniz adına açılmasını öneriyoruz.",
      },
      {
        question: "Uygulamanın arka uç (backend) altyapısını da geliştiriyor musunuz?",
        answer:
          "Evet. Kullanıcı yönetimi, bildirimler, veri senkronizasyonu ve mevcut sistemlerinizle entegrasyon için API altyapısını kuruyor ya da var olan API'nize bağlanıyoruz. İhtiyaca göre Firebase gibi hazır servisler de kullanılabilir.",
      },
    ],
    related: ["ui-ux-tasarim", "kurumsal-yazilim"],
  },
  "kurumsal-yazilim": {
    audience: [
      "Teklif, sipariş veya servis süreçlerini Excel ve e-postayla yürüten şirketler",
      "Hazır CRM veya ERP yazılımının iş akışına uymadığı işletmeler",
      "Farklı departmanların aynı veriyi ayrı yerlerde tuttuğu ekipler",
      "Yöneticilerin güncel operasyon verisine tek bir ekrandan ulaşmak istediği kurumlar",
    ],
    problems: [
      "Aynı bilginin birden fazla dosyaya elle girilmesi ve hatalar",
      "Onay adımlarının e-posta ve telefon arasında kaybolması",
      "Hangi işin kimde ve hangi aşamada olduğunun görülememesi",
      "Rapor hazırlamak için her ay saatlerce veri derlenmesi",
    ],
    faq: [
      {
        question: "Hazır bir yazılım yerine neden kuruma özel yazılım tercih edilmeli?",
        answer:
          "Hazır yazılımlar standart süreçler için hızlı bir başlangıç sunar. Süreciniz şirketinize özgü onay adımları, roller veya hesaplamalar içeriyorsa hazır yazılımı uyarlamak yerine ihtiyacınıza göre geliştirilen bir sistem daha sürdürülebilir olur. Keşif aşamasında hazır bir çözümün yeterli olup olmadığını da açıkça değerlendiriyoruz.",
      },
      {
        question: "Mevcut verilerimizi yeni sisteme aktarabilir misiniz?",
        answer:
          "Evet. Excel dosyalarındaki veya mevcut sistemlerdeki verileri temizleyip yeni yapıya aktarıyor, geçiş sırasında iki sistemin bir süre paralel çalışmasını planlıyoruz.",
      },
      {
        question: "Tüm sistemi tek seferde mi geliştiriyorsunuz?",
        answer:
          "Hayır. Önce en çok zaman kaybettiren süreçle başlayan bir ilk sürüm geliştiriyor, ekibiniz kullanmaya başladıktan sonra modül modül genişletiyoruz. Bu yaklaşım riski azaltır ve gerçek kullanım geri bildirimine göre ilerlemeyi sağlar.",
      },
      {
        question: "Muhasebe, ERP veya CRM yazılımımızla entegre çalışır mı?",
        answer:
          "Sistemin API sunduğu durumlarda REST veya GraphQL üzerinden entegrasyon kuruyoruz. API olmayan sistemlerde dosya aktarımı veya veritabanı düzeyinde güvenli alternatifleri keşif aşamasında değerlendiriyoruz.",
      },
    ],
    related: ["dijital-otomasyon", "yapay-zeka"],
  },
  "yapay-zeka": {
    audience: [
      "Yoğun doküman, teklif veya e-posta trafiğini elle işleyen ekipler",
      "Kurum içi bilgiye hızlı erişim için asistan isteyen şirketler",
      "Müşteri taleplerini sınıflandırıp doğru ekibe yönlendirmek isteyen işletmeler",
      "Yapay zekâyı küçük bir pilotla güvenli şekilde denemek isteyen KOBİ'ler",
    ],
    problems: [
      "Fatura, sözleşme ve formlardaki bilgilerin elle sisteme girilmesi",
      "Kurum içi dokümanlarda aranan bilgiye ulaşmanın zaman alması",
      "Benzer müşteri sorularının her seferinde baştan yanıtlanması",
      "Yapay zekâ araçlarının kontrolsüz kullanımıyla oluşan veri riski",
    ],
    faq: [
      {
        question: "Şirket verilerimiz yapay zekâ modellerinin eğitiminde kullanılır mı?",
        answer:
          "Sistemleri, verilerin model eğitiminde kullanılmadığı kurumsal API ayarlarıyla kuruyoruz. Hangi verinin sisteme gönderileceğini, kimlerin erişebileceğini ve kişisel verilerin nasıl maskeleneceğini KVKK yükümlülükleriyle birlikte proje başında belirliyoruz.",
      },
      {
        question: "Kurumsal bir yapay zekâ asistanı nasıl çalışır?",
        answer:
          "Asistan, dokümanlarınızı aranabilir bir bilgi tabanına (vektör veritabanı) dönüştürür ve bir soru geldiğinde ilgili bölümleri bulup dil modeline bağlam olarak verir. Bu yöntem (RAG) yanıtların sizin kaynaklarınıza dayanmasını ve kaynak gösterilmesini sağlar.",
      },
      {
        question: "Yapay zekânın yanlış sonuç üretmesi nasıl önleniyor?",
        answer:
          "Kritik adımlarda insan onayı, çıktıların kurallarla doğrulanması ve emin olunamayan durumlarda işi bir çalışana yönlendiren kontroller tasarlıyoruz. Canlıya almadan önce gerçek örnek verilerle doğruluk testi yapıyoruz.",
      },
      {
        question: "Yapay zekâ projesine nereden başlamalıyız?",
        answer:
          "Tekrarlayan, kuralları belli ve sonucu ölçülebilen tek bir süreçle başlamanızı öneriyoruz; örneğin gelen faturaların okunması veya destek taleplerinin sınıflandırılması. Sınırlı bir pilot ihtiyacı doğruladıktan sonra kapsam genişletilir.",
      },
    ],
    related: ["dijital-otomasyon", "kurumsal-yazilim"],
  },
  "dijital-otomasyon": {
    audience: [
      "Form, CRM ve e-posta arasında veriyi elle taşıyan satış ve operasyon ekipleri",
      "Birden fazla yazılımı birbirine bağlamak isteyen işletmeler",
      "Raporlarını düzenli olarak elle hazırlayan yöneticiler",
      "Büyürken ek personel yerine süreçlerini ölçeklemek isteyen şirketler",
    ],
    problems: [
      "Web sitesinden gelen taleplerin geç yanıtlanması veya unutulması",
      "Aynı verinin farklı sistemlere tekrar tekrar girilmesi",
      "Teklif, onay ve bildirim adımlarının kişilere bağlı yürümesi",
      "Süreçlerin nerede tıkandığının görülememesi",
    ],
    faq: [
      {
        question: "İş süreci otomasyonu nedir?",
        answer:
          "Belirli kurallarla tekrarlanan işlerin (veri aktarımı, bildirim, onay, raporlama gibi) yazılımlar arasında kurulan akışlarla otomatik yürütülmesidir. Örneğin bir form talebi CRM'e kaydedilir, ilgili kişiye bildirim gider ve durum bir panelde izlenir.",
      },
      {
        question: "Zapier, Make veya n8n gibi araçlar mı, özel geliştirme mi kullanıyorsunuz?",
        answer:
          "İkisini de. Standart entegrasyonlarda Zapier, Make veya n8n gibi araçlar hızlı ve ekonomik çözüm sunar. Yüksek hacim, özel iş kuralı veya veri güvenliği gerektiren akışlarda Node.js ile özel entegrasyon geliştiriyoruz.",
      },
      {
        question: "Otomasyon bir hata verdiğinde ne oluyor?",
        answer:
          "Akışları hata kayıtları, tekrar deneme kuralları ve başarısız işlemler için bildirimlerle kuruyoruz. Böylece bir adım çalışmadığında veri kaybolmaz ve sorun hızla fark edilir.",
      },
    ],
    related: ["yapay-zeka", "kurumsal-yazilim"],
  },
  "ai-icerik-uretimi": {
    audience: [
      "Çok sayıda ürün için görsel ve açıklama hazırlayan e-ticaret markaları",
      "Kampanya dönemlerinde hızlı kreatif üretmesi gereken pazarlama ekipleri",
      "Ürünlerini farklı model, renk veya ortam varyasyonlarıyla göstermek isteyen moda markaları",
      "İçerik üretimini tekrarlanabilir bir sürece dönüştürmek isteyen ajanslar",
    ],
    problems: [
      "Her ürün için ayrı çekim yapmanın zaman ve maliyet yükü",
      "Farklı kanallarda tutarsız görünen marka görselleri",
      "Yüzlerce ürün açıklamasının elle yazılması",
      "Yapay zekâ çıktılarının ürünü gerçeğe aykırı göstermesi riski",
    ],
    faq: [
      {
        question: "Yapay zekâ ile üretilen görseller ürünü olduğundan farklı gösterir mi?",
        answer:
          "Süreci ürünün gerçek fotoğrafından başlatıyor, renk, desen ve form gibi özelliklerin korunmasını her üretimde insan kontrolüyle doğruluyoruz. Ürünü yanıltıcı biçimde değiştiren çıktılar yayına alınmaz.",
      },
      {
        question: "Marka tutarlılığı nasıl sağlanıyor?",
        answer:
          "Markanızın renk, ışık, kompozisyon ve metin tonu kurallarını şablonlara ve yönergelere dönüştürüyoruz. Tüm üretimler bu kurallara göre yapılır ve yayından önce seçkiden geçer.",
      },
      {
        question: "Üretilen içeriklerin kullanım hakkı kime aittir?",
        answer:
          "Kullanılan araçların ticari kullanım koşullarına uygun çalışıyor ve teslim edilen içeriklerin kullanım haklarını sözleşmede açıkça tanımlıyoruz. Gerçek kişilere ait yüz veya marka unsurlarını izinsiz kullanmıyoruz.",
      },
    ],
    related: ["dijital-otomasyon", "yapay-zeka"],
  },
};

const en: Record<string, ServiceInsight> = {
  "web-gelistirme": {
    audience: [
      "Companies that want to renew their corporate website",
      "Service businesses that collect quotes, catalogue requests or applications",
      "SaaS startups that need a product or customer dashboard",
      "Teams with a slow site that breaks on mobile or is hard to manage",
    ],
    problems: [
      "Pages that load slowly on mobile and lose visitors",
      "Service and product pages that do not appear in search results",
      "Needing a developer every time content has to be updated",
      "Form enquiries getting lost in email inboxes",
    ],
    faq: [
      {
        question: "Will our search rankings be preserved when we rebuild our website?",
        answer:
          "We map old URLs to new ones with 301 redirects, keep page titles and content structure, and prepare a new sitemap for you to submit to Search Console. These steps minimise the risk of losing visibility during the migration.",
      },
      {
        question: "Which technologies do you use, and do you build with WordPress?",
        answer:
          "For projects that need performance and customisation we use Next.js, React and TypeScript. For corporate sites where your team updates content often, WordPress can also be a good option; we decide during discovery based on your content management needs and budget.",
      },
      {
        question: "Can we update the content ourselves after launch?",
        answer:
          "Yes. Depending on your needs we set up a content management panel or structure the content so your team can edit it. At handover we share a short guide showing the editing steps.",
      },
      {
        question: "Is SEO and speed optimisation charged separately?",
        answer:
          "Technical SEO foundations (titles and descriptions, sitemap, structured data, correct heading hierarchy) and development focused on Core Web Vitals are standard in every project. Ongoing content production or campaign-based SEO work is planned separately.",
      },
    ],
    related: ["ui-ux-tasarim", "kurumsal-yazilim"],
  },
  "ui-ux-tasarim": {
    audience: [
      "Teams that want to validate a new digital product before building it",
      "Companies improving an existing app that users struggle with",
      "Brands that want a shared design language across several products",
      "Software teams that need clear design handover to developers",
    ],
    problems: [
      "Users abandoning a form or checkout halfway through",
      "Inconsistent components and screens that all look different",
      "Unclear design decisions that keep changing during development",
      "Product ideas that cannot be tested before code is written",
    ],
    faq: [
      {
        question: "What is the difference between UI and UX?",
        answer:
          "UX (user experience) designs the steps a user takes to complete a task and how easy it is: flows, information architecture and interaction. UI (user interface) is the visual layer of that flow: typography, colour, components and layout. A good product handles both together.",
      },
      {
        question: "Which tools and formats do you deliver designs in?",
        answer:
          "We design in Figma and deliver screens, an interactive prototype and a component library in an organised file structure. Colour, typography and spacing values are documented as design tokens developers can use directly.",
      },
      {
        question: "Can we hire you for design only and build with our own team?",
        answer:
          "Yes. We plan the handover around how your developers work and document component behaviour and edge cases. We can also answer design questions during development.",
      },
    ],
    related: ["web-gelistirme", "mobil-uygulamalar"],
  },
  "mobil-uygulamalar": {
    audience: [
      "Businesses that want to serve customers on iOS and Android",
      "Companies that need an internal app for field teams",
      "SaaS teams planning a mobile companion to their web product",
      "Startups that want to test an idea in the market with a first version",
    ],
    problems: [
      "No direct, regular channel to communicate with customers",
      "Field teams working with paper forms or messaging apps",
      "Unfamiliarity with app store release requirements",
      "Apps that become outdated because they are never updated after launch",
    ],
    faq: [
      {
        question: "Should we build native or cross-platform?",
        answer:
          "For most business apps, building iOS and Android apps from a single React Native codebase is more efficient to develop and maintain. When the app needs heavy access to device hardware or platform-specific performance, we recommend native development with Swift and Kotlin.",
      },
      {
        question: "Do you manage the App Store and Google Play release process?",
        answer:
          "Yes. Store account preparation, app descriptions, screenshots, privacy declarations and the review process are planned as part of the project. We recommend opening the developer accounts in your company's name.",
      },
      {
        question: "Do you also build the backend for the app?",
        answer:
          "Yes. We build the API layer for user management, notifications, data sync and integration with your existing systems, or connect to your existing API. Managed services such as Firebase can also be used where they fit.",
      },
    ],
    related: ["ui-ux-tasarim", "kurumsal-yazilim"],
  },
  "kurumsal-yazilim": {
    audience: [
      "Companies running quotes, orders or service operations on spreadsheets and email",
      "Businesses whose workflow does not fit off-the-shelf CRM or ERP software",
      "Teams where departments keep the same data in separate places",
      "Organisations where managers want current operational data on a single screen",
    ],
    problems: [
      "The same information typed into several files by hand, causing errors",
      "Approval steps getting lost between email and phone calls",
      "No visibility into who is handling which job and at what stage",
      "Hours spent every month compiling data for reports",
    ],
    faq: [
      {
        question: "Why choose custom software instead of an off-the-shelf product?",
        answer:
          "Off-the-shelf software is a fast start for standard processes. If your process includes company-specific approval steps, roles or calculations, a system built around your needs is more sustainable than bending a packaged product. During discovery we also tell you openly when an existing product would be enough.",
      },
      {
        question: "Can you migrate our existing data to the new system?",
        answer:
          "Yes. We clean the data from spreadsheets or existing systems, move it into the new structure and plan a period where both systems run in parallel during the transition.",
      },
      {
        question: "Do you build the whole system in one go?",
        answer:
          "No. We start with a first version covering the process that wastes the most time, then expand module by module once your team is using it. This reduces risk and lets real usage feedback guide the next steps.",
      },
      {
        question: "Will it integrate with our accounting, ERP or CRM software?",
        answer:
          "When the system offers an API we integrate over REST or GraphQL. For systems without an API, we evaluate secure alternatives such as file exchange or database-level integration during discovery.",
      },
    ],
    related: ["dijital-otomasyon", "yapay-zeka"],
  },
  "yapay-zeka": {
    audience: [
      "Teams that process heavy volumes of documents, quotes or emails by hand",
      "Companies that want an assistant for fast access to internal knowledge",
      "Businesses that want to classify customer requests and route them to the right team",
      "SMEs that want to try AI safely with a small pilot",
    ],
    problems: [
      "Data from invoices, contracts and forms typed into systems by hand",
      "Time lost searching internal documents for information",
      "Similar customer questions answered from scratch every time",
      "Data risk from uncontrolled use of AI tools",
    ],
    faq: [
      {
        question: "Will our company data be used to train AI models?",
        answer:
          "We set systems up with enterprise API settings under which data is not used for model training. At the start of the project we define which data is sent to the system, who can access it and how personal data is masked, in line with KVKK and GDPR obligations.",
      },
      {
        question: "How does a corporate AI assistant work?",
        answer:
          "The assistant turns your documents into a searchable knowledge base (a vector database). When a question comes in, it finds the relevant passages and gives them to the language model as context. This method (RAG) keeps answers grounded in your own sources and allows them to cite those sources.",
      },
      {
        question: "How do you prevent AI from producing wrong results?",
        answer:
          "We design human approval at critical steps, rule-based validation of outputs, and checks that route uncertain cases to a person. Before going live we test accuracy with real sample data.",
      },
      {
        question: "Where should we start with an AI project?",
        answer:
          "We recommend starting with one repetitive process that has clear rules and a measurable result, such as reading incoming invoices or classifying support requests. Once a limited pilot proves the need, the scope is expanded.",
      },
    ],
    related: ["dijital-otomasyon", "kurumsal-yazilim"],
  },
  "dijital-otomasyon": {
    audience: [
      "Sales and operations teams moving data by hand between forms, CRM and email",
      "Businesses that want to connect several software tools",
      "Managers who prepare recurring reports manually",
      "Growing companies that want to scale processes rather than headcount",
    ],
    problems: [
      "Website enquiries answered late or forgotten",
      "The same data entered into different systems again and again",
      "Quote, approval and notification steps that depend on individuals",
      "No visibility into where processes get stuck",
    ],
    faq: [
      {
        question: "What is business process automation?",
        answer:
          "It means running repetitive, rule-based work (such as data transfer, notifications, approvals and reporting) automatically through workflows between software tools. For example, a form enquiry is saved to the CRM, the right person is notified and the status is tracked on a dashboard.",
      },
      {
        question: "Do you use tools like Zapier, Make or n8n, or custom development?",
        answer:
          "Both. For standard integrations, tools such as Zapier, Make or n8n are fast and cost-effective. For high volume, custom business rules or data security requirements, we build custom integrations with Node.js.",
      },
      {
        question: "What happens when an automation fails?",
        answer:
          "We build workflows with error logs, retry rules and alerts for failed steps. That way data is not lost when a step fails and the problem is noticed quickly.",
      },
    ],
    related: ["yapay-zeka", "kurumsal-yazilim"],
  },
  "ai-icerik-uretimi": {
    audience: [
      "E-commerce brands preparing visuals and descriptions for many products",
      "Marketing teams that need creatives quickly during campaigns",
      "Fashion brands that want to show products in different model, colour or setting variations",
      "Agencies that want to turn content production into a repeatable process",
    ],
    problems: [
      "The time and cost of a separate photo shoot for every product",
      "Brand visuals that look inconsistent across channels",
      "Hundreds of product descriptions written by hand",
      "The risk of AI outputs misrepresenting the product",
    ],
    faq: [
      {
        question: "Do AI-generated visuals show the product differently from reality?",
        answer:
          "We start from a real photo of the product and check with human review that attributes such as colour, pattern and shape are preserved in every output. Outputs that misrepresent the product are not published.",
      },
      {
        question: "How is brand consistency maintained?",
        answer:
          "We turn your brand's colour, lighting, composition and tone-of-voice rules into templates and guidelines. All production follows these rules and goes through a selection step before publishing.",
      },
      {
        question: "Who owns the rights to the generated content?",
        answer:
          "We work within the commercial-use terms of the tools we use and define the usage rights of delivered content clearly in the contract. We do not use real people's faces or third-party brand elements without permission.",
      },
    ],
    related: ["dijital-otomasyon", "yapay-zeka"],
  },
};

const insights: Record<Locale, Record<string, ServiceInsight>> = { tr, en };

export function getServiceInsight(slug: string, locale: Locale): ServiceInsight | undefined {
  return insights[locale][slug];
}
