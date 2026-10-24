export type BlogCategory =
  | "yazilim"
  | "ui-ux"
  | "web"
  | "yapay-zeka"
  | "projeler"
  | "notlar";

export interface CategoryDef {
  slug: BlogCategory;
  label: string;
}

export const categories: CategoryDef[] = [
  { slug: "yazilim", label: "Yazılım" },
  { slug: "ui-ux", label: "UI / UX" },
  { slug: "web", label: "Web" },
  { slug: "yapay-zeka", label: "Yapay Zekâ" },
  { slug: "projeler", label: "Projeler" },
  { slug: "notlar", label: "Notlar" },
];

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "list"; style: "ordered" | "unordered"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "gallery";
      images: [
        { src: string; alt: string },
        { src: string; alt: string }
      ];
      caption?: string;
    }
  | { type: "code"; language: string; code: string; filename?: string }
  | { type: "callout"; variant: "info" | "note"; text: string }
  | {
      type: "video";
      provider: "youtube" | "vimeo";
      videoId: string;
      caption?: string;
    }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "divider" };

/* Arama motorlarında gösterilecek soru-cevap bloğu (FAQPage schema) */
export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  excerpt: string;
  coverImage: { src: string; alt: string };
  readingTime: number;
  featured?: boolean;
  size?: "large" | "standard";
}

export interface BlogPost extends BlogPostMeta {
  author?: { name: string; role?: string };
  content: ContentBlock[];

  /*
    SEO alanları.
    seoTitle / metaDescription verilmezse title / excerpt kullanılır;
    böylece mevcut yazılar değişiklik gerektirmez.
  */
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  faq?: FaqItem[];
  updatedDate?: string;
}

const editorialDrafts: BlogPost[] = [
  {
    slug: "nextjs-16-ile-olceklenebilir-mimari-kurmak",
    title: "Next.js 16 ile Ölçeklenebilir Mimari Kurmak",
    category: "yazilim",
    date: "2026-08-14",
    excerpt:
      "Büyüyen bir ürünün kod tabanını sürdürülebilir tutmak için App Router, server component sınırları ve veri katmanı tasarımında dikkat ettiğimiz noktaları paylaşıyoruz.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
      alt: "Kod ekranı ve geliştirme ortamı",
    },
    readingTime: 9,
    featured: true,
    size: "large",
    author: { name: "AKCY", role: "Mühendislik Ekibi" },
    content: [
      {
        type: "paragraph",
        text: "Bir ürünün kod tabanı büyüdükçe, en başta hızlı görünen kararlar zamanla en pahalı borçlara dönüşür. Bu yazıda, **Next.js 16** üzerinde kurduğumuz projelerde tekrar tekrar işimize yarayan mimari prensipleri paylaşıyoruz.",
      },
      {
        type: "h2",
        text: "Server ve client sınırını bilinçli çizmek",
      },
      {
        type: "paragraph",
        text: "App Router ile birlikte gelen en büyük değişim, *her bileşenin* varsayılan olarak sunucuda render edilmesi. Bu, `\"use client\"` direktifini sadece gerçekten interaktif olan yapraklara eklemeyi bir disiplin haline getiriyor.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Bir bileşen hiçbir hook veya tarayıcı API'si kullanmıyorsa, client bir ağacın içinden çağrılsa bile \"use client\" direktifine ihtiyaç duymaz.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Etkileşimin gerçekleştiği en küçük bileşeni bulun",
          "Sadece o bileşeni client sınırına alın",
          "Veri çekme ve türetme mantığını sunucuda tutun",
        ],
      },
      {
        type: "h3",
        text: "Pratikte nasıl görünüyor?",
      },
      {
        type: "code",
        language: "typescript",
        filename: "app/blog/page.tsx",
        code: `export default async function BlogPage({\n  searchParams,\n}: {\n  searchParams: Promise<{ category?: string }>;\n}) {\n  const { category } = await searchParams;\n  const posts = getAllPosts();\n\n  return <BlogListingClient allPosts={posts} initialCategory={category} />;\n}`,
      },
      {
        type: "quote",
        text: "İyi bir mimari, en az kod yazmak değil; değişimin nereye izole olacağını önceden bilmektir.",
      },
      {
        type: "h2",
        text: "Veri katmanını değiştirilebilir tutmak",
      },
      {
        type: "paragraph",
        text: "Statik bir veri dosyasıyla başlasanız bile, erişim fonksiyonlarını (`getAllPosts`, `getPostBySlug` gibi) ayrı tutmak, ileride bir CMS veya API'ye geçişi neredeyse sızıntısız hale getirir.",
      },
      {
        type: "table",
        headers: ["Katman", "Bugün", "Yarın"],
        rows: [
          ["Veri", "Statik TS dizisi", "CMS / API"],
          ["Erişim", "Saf fonksiyonlar", "Aynı imza, async"],
          ["Bileşenler", "Değişmez", "Değişmez"],
        ],
      },
      {
        type: "gallery",
        images: [
          {
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
            alt: "Ekran üzerinde kod incelemesi",
          },
          {
            src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=900&auto=format&fit=crop",
            alt: "Ekip halinde planlama",
          },
        ],
      },
      {
        type: "h2",
        text: "Sonuç",
      },
      {
        type: "paragraph",
        text: "Ölçeklenebilirlik tek bir teknoloji seçimiyle gelmiyor; sınırları net çizmek ve bu sınırları korumakla geliyor. [Hizmetlerimiz](/hizmetler) sayfasında bu yaklaşımı uyguladığımız proje türlerini bulabilirsiniz.",
      },
    ],
  },
  {
    slug: "mikro-etkilesimlerin-kullanici-deneyimine-etkisi",
    title: "Mikro Etkileşimlerin Kullanıcı Deneyimine Etkisi",
    category: "ui-ux",
    date: "2026-07-22",
    excerpt:
      "Bir düğmenin hover davranışı, bir kartın hafif yükselmesi ya da bir imlecin akıcı geçişi — küçük detaylar kullanıcının ürüne duyduğu güveni doğrudan etkiliyor.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      alt: "Arayüz tasarımı üzerinde çalışan tasarımcı",
    },
    readingTime: 6,
    content: [
      {
        type: "paragraph",
        text: "Mikro etkileşimler genellikle fark edilmeden çalışır — ve en iyi olanları zaten böyle olmalıdır. Ama bir arayüzden çıkarıldıklarında ürün aniden cansız hissettirir.",
      },
      { type: "h2", text: "Neden önemli?" },
      {
        type: "paragraph",
        text: "Kullanıcı bir eylemde bulunduğunda, arayüzün bunu *fark ettiğini* hissetmesi gerekir. Bu geri bildirim, güven inşa etmenin en ucuz ve en etkili yoludur.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Hover'da hafif ölçek veya renk değişimi",
          "Tıklamada anlık basılma hissi",
          "Yüklenme sırasında iskelet animasyonları",
        ],
      },
      {
        type: "quote",
        text: "İyi tasarım sadece güzel görünmek değil, kullanıcının düşünmek zorunda kalmadan hareket edebilmesini sağlamaktır.",
      },
    ],
  },
  {
    slug: "web-performansini-artiran-7-teknik",
    title: "Web Performansını Artıran 7 Teknik",
    category: "web",
    date: "2026-06-30",
    excerpt:
      "Hız artık bir lüks değil, temel bir kullanıcı deneyimi beklentisi. Gerçek dünya projelerinde en çok fark yaratan yedi optimizasyonu inceliyoruz.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
      alt: "Performans grafikleri ekranda",
    },
    readingTime: 7,
    size: "standard",
    content: [
      {
        type: "paragraph",
        text: "Performans optimizasyonu genellikle en sona bırakılır, ama en çok etkiyi en erken uygulandığında yaratır.",
      },
      { type: "h2", text: "Öncelik sırası" },
      {
        type: "list",
        style: "ordered",
        items: [
          "Görsellerin doğru formatta ve boyutta sunulması",
          "Kritik olmayan script'lerin ertelenmesi",
          "Font yüklemenin `font-display: swap` ile yönetilmesi",
          "Sunucu tarafı önbellekleme",
          "Gereksiz client bileşenlerinin azaltılması",
          "Üçüncü parti script sayısının sınırlanması",
          "Düzenli Lighthouse denetimleri",
        ],
      },
      {
        type: "callout",
        variant: "note",
        text: "Performans bir özellik değil, bir alışkanlıktır — tek seferlik bir denetimle kalıcı olmaz.",
      },
    ],
  },
  {
    slug: "isletmeler-icin-yapay-zeka-otomasyonu-rehberi",
    title: "İşletmeler İçin Yapay Zekâ Otomasyonu Rehberi",
    category: "yapay-zeka",
    date: "2026-05-18",
    excerpt:
      "Yapay zekâyı bir vitrin özelliği olarak değil, operasyonel bir avantaj olarak kullanmak isteyen ekipler için pratik bir başlangıç noktası.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
      alt: "Veri ve otomasyon görselleştirmesi",
    },
    readingTime: 8,
    content: [
      {
        type: "paragraph",
        text: "Yapay zekâ otomasyonunun en büyük hatası, doğrudan en karmaşık süreçle başlamaktır. En sürdürülebilir yaklaşım, küçük ve ölçülebilir bir alanla başlamaktır.",
      },
      { type: "h2", text: "Nereden başlamalı?" },
      {
        type: "paragraph",
        text: "Tekrarlayan, kurallara dayalı ve yüksek hacimli bir süreç seçin. İlk kazanım burada görünür olacaktır.",
      },
      {
        type: "h3",
        text: "Örnek bir süreç haritası",
      },
      {
        type: "table",
        headers: ["Aşama", "Süre", "Sorumlu"],
        rows: [
          ["Süreç analizi", "1 hafta", "Operasyon"],
          ["Prototipleme", "2 hafta", "AKCY"],
          ["Pilot uygulama", "3 hafta", "Ortak ekip"],
        ],
      },
    ],
  },
  {
    slug: "bir-saas-urununu-sifirdan-nasil-kurguladik",
    title: "Bir SaaS Ürününü Sıfırdan Nasıl Kurguladık",
    category: "projeler",
    date: "2026-04-09",
    excerpt:
      "Fikir aşamasından ilk kullanıcıya kadar geçen süreçte aldığımız kararlar, vazgeçtiğimiz özellikler ve öğrendiğimiz dersler.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
      alt: "Ekip planlama toplantısında",
    },
    readingTime: 10,
    content: [
      {
        type: "paragraph",
        text: "Her SaaS projesi 'her şeyi yapabilen' bir ürün hayaliyle başlar. Bizim için dönüm noktası, bu hayali bilinçli olarak küçültmekti.",
      },
      { type: "h2", text: "İlk sürüm neyi içermedi?" },
      {
        type: "list",
        style: "unordered",
        items: [
          "Takım yönetimi ve roller",
          "Gelişmiş raporlama",
          "Üçüncü parti entegrasyonlar",
        ],
      },
      {
        type: "paragraph",
        text: "Bunun yerine tek bir kullanıcı akışını mükemmelleştirmeye odaklandık. [Projelerimiz](/projelerimiz) sayfasında bu sürecin sonucunu inceleyebilirsiniz.",
      },
    ],
  },
  {
    slug: "ekip-olarak-ogrendigimiz-5-ders",
    title: "Ekip Olarak Öğrendiğimiz 5 Ders",
    category: "notlar",
    date: "2026-03-11",
    excerpt:
      "Zor projelerden, iptal olan planlardan ve beklenmedik başarılardan çıkardığımız, kısa ama kalıcı notlar.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop",
      alt: "Ofis ortamında ekip notları",
    },
    readingTime: 5,
    content: [
      {
        type: "paragraph",
        text: "Bazı dersler dokümantasyonla değil, sadece tekrar tekrar yaşayarak öğrenilir. Bu yazıda bize en çok şey öğreten beş anı paylaşıyoruz.",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "Erken geri bildirim, geç mükemmellikten değerlidir",
          "Basit bir çözüm, karmaşık bir plandan daha sürdürülebilirdir",
          "İletişim eksikliği her zaman teknik borçtan daha pahalıya patlar",
          "Küçük ekipte netlik, büyük ekipte süreçten önemlidir",
          "Bitirmek, mükemmelleştirmekten daha değerlidir",
        ],
      },
    ],
  },
  {
    slug: "typescriptte-tip-guvenligini-maksimize-etmek",
    title: "TypeScript'te Tip Güvenliğini Maksimize Etmek",
    category: "yazilim",
    date: "2026-02-25",
    excerpt:
      "`any` kullanmadan, aşırı karmaşık generic'lere boğulmadan gerçekçi bir tip güvenliği seviyesine nasıl ulaşılır?",
    coverImage: {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
      alt: "Kod editöründe TypeScript",
    },
    readingTime: 6,
    content: [
      {
        type: "paragraph",
        text: "Tip güvenliği bir uç nokta değil, bir tercih yelpazesidir. Amaç en katı sistemi kurmak değil, hatanın en erken yakalandığı noktayı bulmaktır.",
      },
      {
        type: "code",
        language: "typescript",
        code: `type ContentBlock =\n  | { type: "paragraph"; text: string }\n  | { type: "code"; language: string; code: string };\n\nfunction render(block: ContentBlock) {\n  switch (block.type) {\n    case "paragraph":\n      return block.text;\n    case "code":\n      return block.code;\n  }\n}`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Discriminated union'lar, switch/case içinde exhaustiveness check almanın en pratik yoludur.",
      },
    ],
  },
  {
    slug: "tasarim-sistemleri-neden-artik-zorunlu",
    title: "Tasarım Sistemleri Neden Artık Zorunlu",
    category: "ui-ux",
    date: "2026-02-05",
    excerpt:
      "Küçük bir ekip için bile bir tasarım sistemi kurmanın maliyeti, kurmamanın uzun vadeli maliyetinden çok daha düşük.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1600&auto=format&fit=crop",
      alt: "Tasarım sistemi bileşenleri ekranda",
    },
    readingTime: 5,
    content: [
      {
        type: "paragraph",
        text: "Bir tasarım sistemi lüks değil, tutarlılığın maliyetini önceden ödemektir. Her yeni ekran için renk ve boşluk yeniden tartışılmaz.",
      },
      { type: "h2", text: "Neyle başlamalı?" },
      {
        type: "paragraph",
        text: "Renk paleti, tipografi ölçeği ve boşluk sistemiyle başlayın — bileşen kütüphanesi bunun doğal bir sonucu olarak gelir.",
      },
    ],
  },
  {
    slug: "yapay-zeka-ile-is-surecleri-otomasyonu",
    title: "Yapay Zekâ ile İş Süreçleri Otomasyonu Nedir?",
    seoTitle: "Yapay Zekâ ile İş Süreçleri Otomasyonu Nedir? | AKCY",
    metaDescription:
      "Yapay zekâ ile iş süreçleri otomasyonu nedir? Şirketlerin hangi süreçleri AI ile otomatikleştirebileceğini, avantajlarını ve başlangıç adımlarını keşfedin.",
    focusKeyword: "yapay zekâ ile iş süreçleri otomasyonu",
    secondaryKeywords: [
      "iş süreçleri otomasyonu",
      "AI otomasyon",
      "yapay zekâ otomasyonu",
      "şirketlerde yapay zekâ kullanımı",
      "iş otomasyonu",
      "dijital otomasyon",
    ],
    category: "yapay-zeka",
    date: "2026-09-12",
    excerpt:
      "Şirketlerde tekrar eden operasyonlar yapay zekâ ile nasıl otomatikleştirilir? Hangi süreçlerin otomasyona uygun olduğunu, klasik otomasyondan farkını ve pilot projeye nereden başlanacağını anlatıyoruz.",
    coverImage: {
      src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop",
      alt: "Otomatikleştirilmiş iş akışlarını temsil eden dijital süreç görseli",
    },
    readingTime: 14,
    author: { name: "AKCY", role: "Otomasyon Ekibi" },
    content: [
      {
        type: "paragraph",
        text: "Bir şirkette her gün yapılan işlerin önemli bir bölümü aslında benzer adımların tekrarından oluşur. Gelen e-postaların incelenmesi, Excel dosyalarına veri girilmesi, tekliflerin hazırlanması, müşterilere bilgi verilmesi, raporların oluşturulması, belgelerin sınıflandırılması veya farklı sistemler arasında veri aktarılması bunlardan yalnızca birkaçıdır.",
      },
      {
        type: "paragraph",
        text: "Bu işlemler tek başına küçük görünse de yüzlerce veya binlerce kez tekrarlandığında ciddi zaman ve kaynak tüketir. Üstelik süreçlerin manuel ilerlemesi yalnızca zaman kaybına değil; veri giriş hatalarına, unutulan görevlerin oluşmasına, bilgiye erişimin zorlaşmasına ve çalışanların daha değerli işlere ayırabileceği zamanın azalmasına da neden olabilir.",
      },
      {
        type: "paragraph",
        text: "İşte **yapay zekâ ile iş süreçleri otomasyonu**, şirketlerin bu tekrar eden operasyonlarını daha hızlı, düzenli ve ölçeklenebilir hale getirmek için kullanılan yaklaşımı ifade eder.",
      },
      {
        type: "paragraph",
        text: "Klasik otomasyon sistemleri belirli kuralları takip ederken yapay zekâ destekli otomasyon sistemleri metinleri okuyabilir, belgelerden bilgi çıkarabilir, verileri sınıflandırabilir, doğal dilde gelen talepleri anlayabilir ve belirli koşullar altında öneriler veya aksiyonlar oluşturabilir.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Günümüzde iş süreçleri otomasyonu yalnızca “bir işi bilgisayara yaptırmak” anlamına gelmiyor. Asıl amaç, şirket içindeki farklı verileri ve sistemleri birbirine bağlayan daha akıllı iş akışları oluşturmaktır.",
      },
      { type: "h2", text: "İş süreçleri otomasyonu nedir?" },
      {
        type: "paragraph",
        text: "İş süreçleri otomasyonu, bir işletmede belirli kurallara göre tekrar eden operasyonların yazılım sistemleri aracılığıyla otomatik şekilde yürütülmesidir.",
      },
      {
        type: "paragraph",
        text: "Örneğin bir satış ekibini düşünelim. Bir müşteri şirketin web sitesindeki formu doldurduğunda satış ekibinin manuel olarak formu kontrol etmesi, bilgileri CRM sistemine girmesi, ilgili satış temsilcisini belirlemesi ve müşteriye ilk bilgilendirme e-postasını göndermesi gerekebilir.",
      },
      {
        type: "paragraph",
        text: "Otomasyon kullanıldığında ise form gönderildiği anda bilgiler CRM sistemine aktarılabilir, müşterinin talep ettiği hizmete göre doğru satış temsilcisi atanabilir, takip görevi oluşturulabilir ve müşteriye otomatik olarak kişiselleştirilmiş bir e-posta gönderilebilir. Böylece süreç birkaç farklı manuel adım yerine tek bir otomatik iş akışına dönüşür.",
      },
      {
        type: "paragraph",
        text: "Yapay zekânın bu yapıya dahil olması ise otomasyonu bir adım daha ileri taşır. Örneğin sistem yalnızca formdaki bilgileri CRM'e aktarmak yerine müşterinin yazdığı mesajı analiz edebilir, talebin hangi hizmetle ilgili olduğunu anlayabilir, öncelik seviyesini belirleyebilir ve satış ekibine kısa bir özet hazırlayabilir.",
      },
      {
        type: "quote",
        text: "Klasik otomasyon önceden tanımlanmış kuralları uygular. Yapay zekâ destekli otomasyon ise yapılandırılmamış bilgileri anlayarak iş akışına dahil edebilir.",
      },
      { type: "h2", text: "Yapay zekâ iş süreçlerini nasıl otomatikleştirir?" },
      {
        type: "paragraph",
        text: "Şirketlerde kullanılan verilerin tamamı düzenli tablolar içinde bulunmaz. Önemli bilgilerin büyük bölümü e-postalarda, PDF belgelerinde, teklif dosyalarında, Word dokümanlarında, müşteri mesajlarında veya çalışanların yazdığı açıklamalarda bulunabilir.",
      },
      {
        type: "paragraph",
        text: "Geleneksel yazılım sistemleri yapılandırılmış verilerle oldukça başarılı çalışır. Ancak doğal dilde yazılmış bir e-postayı yorumlamak veya bir PDF teklif dosyasından ürün, fiyat ve teslim tarihi gibi bilgileri çıkarmak daha karmaşık bir problemdir.",
      },
      {
        type: "paragraph",
        text: "Yapay zekâ teknolojilerinin iş süreçleri otomasyonundaki en önemli katkısı burada ortaya çıkar. AI destekli sistemler doğal dil işleme, belge analizi, veri sınıflandırma ve büyük dil modelleri gibi teknolojileri kullanarak yapılandırılmamış bilgileri işleyebilir.",
      },
      {
        type: "paragraph",
        text: "Örneğin bir tedarikçi tarafından gönderilen teklif PDF'si sisteme ulaştığında yapay zekâ belgeyi analiz ederek ürün adı, miktar, birim fiyat, para birimi ve teslim süresi gibi bilgileri çıkarabilir. Bu veriler daha sonra otomatik olarak satın alma sistemine aktarılabilir veya başka teklifler ile karşılaştırılabilir.",
      },
      {
        type: "h2",
        text: "Şirketlerde hangi süreçler yapay zekâ ile otomatikleştirilebilir?",
      },
      {
        type: "paragraph",
        text: "Yapay zekâ otomasyonunun kullanılabileceği alanlar şirketin sektörüne, büyüklüğüne ve mevcut dijital altyapısına göre değişir. Ancak birçok işletmede ortak olarak tekrar eden bazı süreçler bulunur.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "**Satış:** müşteri taleplerinin sınıflandırılması, CRM kayıtlarının oluşturulması, satış fırsatlarının takibi, teklif süreçlerinin hazırlanması",
          "**Satın alma:** tedarikçi tekliflerinin toplanması, belgelerden fiyat bilgisi çıkarılması, tekliflerin karşılaştırılması, taleplerin yönlendirilmesi",
          "**Operasyon:** günlük raporların hazırlanması, farklı sistemlerden veri toplanması, belirli durumlarda otomatik bildirim oluşturulması",
          "**Müşteri hizmetleri:** gelen taleplerin sınıflandırılması, sık sorulan soruların AI asistanları ile yanıtlanması, karmaşık taleplerin doğru kişiye aktarılması",
        ],
      },
      {
        type: "paragraph",
        text: "Burada dikkat edilmesi gereken önemli nokta, her sürecin tamamen otomatik hale getirilmesinin gerekli olmadığıdır. Bazı süreçlerde en verimli model, yapay zekânın çalışanlara yardımcı olduğu *insan + AI* yaklaşımıdır.",
      },
      {
        type: "callout",
        variant: "note",
        text: "Sistem müşteri talebini analiz edip cevap taslağı oluşturabilir ancak nihai gönderim kararını çalışan verebilir. Bu yaklaşım özellikle finansal, hukuki veya ticari açıdan önemli kararların bulunduğu süreçlerde daha güvenlidir.",
      },
      { type: "h2", text: "Manuel süreçlerin işletmelere gerçek maliyeti" },
      {
        type: "paragraph",
        text: "Birçok işletme manuel süreçlerin maliyetini yalnızca çalışanların harcadığı zaman üzerinden değerlendirir. Oysa asıl maliyet çoğu zaman bundan daha büyüktür.",
      },
      {
        type: "paragraph",
        text: "Bir çalışanın her gün bir saatini farklı sistemlerden veri kopyalamaya ayırdığını düşünelim. Tek bir çalışan için bu süre küçük görünebilir. Ancak aynı işi on kişinin yaptığı bir organizasyonda ayda yüzlerce saat yalnızca veri aktarımı için harcanabilir.",
      },
      {
        type: "paragraph",
        text: "Bunun yanında manuel işlemler hata riskini de artırır. Yanlış kopyalanan bir rakam, unutulan bir müşteri talebi veya güncellenmeyen bir CRM kaydı satış kaybına veya operasyonel problemlere yol açabilir.",
      },
      {
        type: "paragraph",
        text: "Ayrıca süreçlerin kişiler üzerinden ilerlemesi şirket içinde bilgi bağımlılığı oluşturabilir. Bir işlemin nasıl yapılacağını yalnızca belirli çalışanlar biliyorsa bu kişilerin izinli olduğu veya şirketten ayrıldığı durumlarda operasyon aksayabilir. İyi tasarlanmış otomasyon sistemleri süreçlerin standartlaştırılmasına yardımcı olur.",
      },
      {
        type: "h2",
        text: "Yapay zekâ otomasyonu ile klasik otomasyon arasındaki fark",
      },
      {
        type: "paragraph",
        text: "Klasik otomasyon sistemleri uzun yıllardır şirketlerde kullanılıyor. Örneğin bir Excel dosyasındaki verilerin başka bir sisteme aktarılması veya belirli bir koşul gerçekleştiğinde e-posta gönderilmesi klasik otomasyon örnekleridir. Bu sistemler oldukça faydalıdır ancak önceden belirlenmiş kurallarla çalışırlar.",
      },
      {
        type: "table",
        headers: ["", "Klasik otomasyon", "Yapay zekâ destekli otomasyon"],
        rows: [
          [
            "Çalışma biçimi",
            "Önceden tanımlı kuralları uygular",
            "Bağlamı yorumlar, sınıflandırır, özet çıkarır",
          ],
          [
            "Veri tipi",
            "Yapılandırılmış (tablo, form, alan)",
            "Yapılandırılmamış (e-posta, PDF, doğal dil)",
          ],
          [
            "Örnek kural",
            "“Tutar 100.000 TL üzerindeyse yöneticiye gönder”",
            "“Bu mesaj bir teslimat şikâyeti mi, öncelik seviyesi ne?”",
          ],
          [
            "Güçlü olduğu yer",
            "Net, değişmeyen, sayısal kurallar",
            "Metin, doküman, görsel ve karmaşık veri",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "Örneğin müşteriden gelen “Geçen hafta aldığımız ürünlerin bir kısmı henüz ulaşmadı. Acil ihtiyacımız var, teslimat durumunu kontrol edebilir misiniz?” şeklindeki bir mesajı düşünelim. Klasik bir otomasyon sistemi bu mesajın anlamını yorumlamakta zorlanabilir. Yapay zekâ ise mesajın bir teslimat problemi olduğunu anlayabilir, sipariş numarasını bulmaya çalışabilir, ilgili departmanı belirleyebilir ve talebi yüksek öncelikli olarak sınıflandırabilir.",
      },
      { type: "h2", text: "İş süreçleri otomasyonunun temel yapısı" },
      {
        type: "paragraph",
        text: "Modern bir AI otomasyon sistemi genellikle tek bir uygulamadan oluşmaz. Birden fazla sistemin birbirine bağlandığı bir mimari kullanılır. Örneğin şirketin CRM sistemi, ERP yazılımı, e-posta altyapısı, dosya depolama sistemi ve yapay zekâ servisi aynı iş akışının parçaları olabilir.",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "E-posta sistemi mesajı alır",
          "Yapay zekâ içeriği analiz eder",
          "Talebin satış, teknik destek veya finans konularından hangisine ait olduğunu belirler",
          "CRM sistemi ilgili müşteri kaydını bulur",
          "Talep doğru departmana yönlendirilir",
          "Gerekirse görev oluşturulur",
          "Süreç sonucunda müşteriye otomatik veya onaylı bir cevap gönderilir",
        ],
      },
      {
        type: "paragraph",
        text: "Buradaki amaç her şeyi yapay zekâya bırakmak değildir. Asıl değer, AI ile mevcut şirket sistemlerini doğru şekilde birbirine bağlamaktır. Bu nedenle başarılı bir otomasyon projesi yalnızca yapay zekâ modeli seçmekten ibaret değildir; süreç analizi, entegrasyon mimarisi, veri güvenliği, kullanıcı yetkileri, hata yönetimi ve insan onay noktaları da sistemin önemli parçalarıdır.",
      },
      { type: "h2", text: "AI otomasyonunun işletmelere sağladığı avantajlar" },
      {
        type: "paragraph",
        text: "Yapay zekâ ile iş süreçleri otomasyonunun en görünür avantajı zaman tasarrufudur. Ancak şirketler için kazanımlar yalnızca hızla sınırlı değildir.",
      },
      {
        type: "paragraph",
        text: "Doğru tasarlanan otomasyon sistemleri operasyonların daha tutarlı ilerlemesini sağlar. Aynı işlem farklı çalışanlar tarafından farklı şekillerde yapılmak yerine standart bir iş akışı üzerinden yürütülebilir. Veri girişindeki insan hataları azaltılabilir. Çalışanlar sürekli tekrar eden operasyonlar yerine karar verme, müşteri ilişkileri, strateji veya ürün geliştirme gibi daha yüksek katma değerli işlere odaklanabilir.",
      },
      {
        type: "paragraph",
        text: "Ayrıca şirket büyüdükçe aynı operasyonun yönetilmesi için sürekli yeni çalışan ekleme ihtiyacı azalabilir. Örneğin günlük 100 talebi manuel olarak işleyen bir süreç, şirket büyüdüğünde 1.000 talebe ulaşabilir. Tamamen manuel bir sistemde operasyon ekibinin de benzer ölçüde büyümesi gerekebilir. Otomasyon sistemi ise altyapı doğru tasarlanmışsa daha yüksek işlem hacimlerine daha kolay ölçeklenebilir.",
      },
      { type: "h2", text: "Yapay zekâ ile teklif süreçleri nasıl otomatikleştirilebilir?" },
      {
        type: "paragraph",
        text: "Teklif hazırlama, özellikle B2B şirketlerde otomasyona uygun süreçlerden biridir. Bir teklif hazırlanırken müşteri talebinin okunması, teknik gereksinimlerin anlaşılması, ürünlerin veya hizmetlerin belirlenmesi, maliyetlerin hesaplanması, fiyatların oluşturulması ve teklif dokümanının hazırlanması gerekebilir.",
      },
      {
        type: "paragraph",
        text: "Bu sürecin bazı bölümleri yapay zekâ ile desteklenebilir. Örneğin müşteri tarafından gönderilen RFQ veya talep dokümanı sisteme yüklendiğinde yapay zekâ ilgili ürünleri, miktarları ve teknik şartları çıkarabilir. Sistem daha sonra şirketin ürün veya fiyat veri tabanında eşleştirme yapabilir. Hazırlanan teklif bir şablona otomatik olarak aktarılabilir.",
      },
      {
        type: "paragraph",
        text: "Ancak fiyatlandırma veya ticari koşullar gibi kritik karar noktalarında yetkili kişinin onayı alınabilir. Böylece yapay zekâ çalışanı tamamen ortadan kaldırmak yerine teklif hazırlama sürecindeki tekrar eden işleri üstlenir. Bu yaklaşım hem teklif hazırlama süresini azaltabilir hem de bilgilerin farklı dosyalar arasında kopyalanmasından kaynaklanan hataları azaltabilir.",
      },
      { type: "h2", text: "Doküman ve veri işleme otomasyonu" },
      {
        type: "paragraph",
        text: "Şirketlerde en fazla zaman kaybettiren alanlardan biri de doküman işlemedir. Faturalar, teklifler, sözleşmeler, satın alma belgeleri, teknik dokümanlar ve e-postalar çoğu zaman manuel olarak kontrol edilir.",
      },
      {
        type: "paragraph",
        text: "AI tabanlı doküman işleme sistemleri bu belgelerdeki önemli bilgileri otomatik olarak çıkarabilir. Örneğin bir faturadan firma adı, fatura numarası, tarih, toplam tutar, vergi bilgileri ve ürün kalemleri tespit edilebilir. Benzer şekilde teknik bir dokümandan ürün kodları, miktarlar veya teknik özellikler çıkarılabilir. Bu bilgiler daha sonra ERP, CRM veya şirketin özel yazılım sistemine aktarılabilir.",
      },
      { type: "h2", text: "CRM ve satış süreçlerinde AI otomasyonu" },
      {
        type: "paragraph",
        text: "CRM sistemleri birçok şirket tarafından kullanılmasına rağmen önemli bir problem vardır: verilerin güncel tutulması gerekir. Satış temsilcilerinin her görüşmeden sonra müşteri notlarını sisteme girmesi, fırsatları güncellemesi ve takip görevleri oluşturması gerekir. Yoğun çalışma temposunda bu işlemler atlanabilir.",
      },
      {
        type: "paragraph",
        text: "AI destekli sistemler satış görüşmelerinden veya e-postalardan bilgi çıkararak CRM kayıtlarının güncellenmesine yardımcı olabilir. Örneğin müşteri e-postasında “Projeyi önümüzdeki ay başlatmayı planlıyoruz, teklifinizi cuma gününe kadar iletebilir misiniz?” şeklinde bir mesaj varsa sistem bunu analiz ederek fırsat tarihini, teklif beklentisini ve takip tarihini belirleyebilir.",
      },
      {
        type: "paragraph",
        text: "Satış temsilcisi ise yalnızca önerilen bilgileri kontrol ederek onaylayabilir. Bu şekilde CRM sistemi çalışanlar için ekstra bir yük olmaktan çıkar ve satış sürecinin doğal bir parçasına dönüşür.",
      },
      { type: "h2", text: "AI asistanları şirketlerde nasıl kullanılabilir?" },
      {
        type: "paragraph",
        text: "AI asistanları iş süreçleri otomasyonunun önemli bileşenlerinden biri haline gelmektedir. Ancak burada genel amaçlı sohbet botları ile şirket içi bilgiye bağlı AI asistanlarını ayırmak gerekir.",
      },
      {
        type: "paragraph",
        text: "Kurumsal bir AI asistanı şirketin ürün bilgileri, prosedürleri, teknik dokümanları veya iç bilgi kaynaklarıyla entegre edilebilir. Örneğin bir çalışan “X ürününün garanti süresi nedir?” diye sorduğunda sistem ilgili dokümanı bulup cevap oluşturabilir. Benzer şekilde satış ekibi “Bu müşteriye geçen yıl hangi ürünleri teklif ettik?” diye sorabilir.",
      },
      {
        type: "callout",
        variant: "note",
        text: "Bu tür sistemlerde en önemli konulardan biri erişim yetkisidir. Her çalışan bütün şirket verilerine erişmemelidir. Bu nedenle kurumsal AI projelerinde kullanıcı yetkilendirme ve veri güvenliği mimarinin temel parçalarından biri olmalıdır.",
      },
      { type: "h2", text: "Her süreç otomatikleştirilmeli mi?" },
      {
        type: "paragraph",
        text: "Hayır. Başarılı otomasyon projelerinde en önemli kararlardan biri hangi süreçlerin otomatikleştirilmemesi gerektiğini belirlemektir. Çok seyrek gerçekleşen, sürekli değişen veya yoğun insan muhakemesi gerektiren bazı işlemler için otomasyon geliştirmek maliyet açısından anlamlı olmayabilir.",
      },
      {
        type: "paragraph",
        text: "Otomasyon için en uygun süreçler genellikle yüksek tekrar oranına sahip, belirli kurallarla ilerleyen, çok fazla manuel veri girişi içeren ve çalışanların zamanını önemli ölçüde tüketen süreçlerdir.",
      },
      {
        type: "quote",
        text: "“Nerede yapay zekâ kullanabiliriz?” sorusundan önce şunu sormak daha faydalıdır: “Hangi süreçlerimiz gereğinden fazla zaman ve kaynak tüketiyor?”",
      },
      { type: "h2", text: "Yapay zekâ otomasyon projesine nereden başlanmalı?" },
      {
        type: "paragraph",
        text: "Bir şirketin bütün süreçlerini tek seferde otomatikleştirmeye çalışması genellikle doğru yaklaşım değildir. Daha sağlıklı yöntem, ölçülebilir bir problem seçerek küçük bir pilot proje ile başlamaktır.",
      },
      {
        type: "paragraph",
        text: "Örneğin günde yüzlerce müşteri e-postası alan bir şirket için ilk proje e-postaların otomatik sınıflandırılması olabilir. Satış ekibinin çok zaman harcadığı bir şirkette CRM veri girişinin otomasyonu seçilebilir. Yoğun teklif hazırlayan bir B2B şirkette ise RFQ analizi ve teklif dokümanı üretimi iyi bir başlangıç olabilir.",
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "En fazla manuel zaman harcanan süreçleri belirleyin",
          "Sürecin mevcut adımlarını net şekilde dokümante edin",
          "Hangi adımların otomatikleştirilebileceğini analiz edin",
          "Yapay zekâ gerektiren ve klasik otomasyonla çözülebilecek bölümleri ayırın",
          "Küçük ve ölçülebilir bir pilot uygulama geliştirin",
          "Sonuçları süre, hata oranı ve operasyon maliyeti gibi metriklerle ölçün",
          "Başarılı olan yapıyı diğer süreçlere genişletin",
        ],
      },
      {
        type: "paragraph",
        text: "Bu yaklaşım hem yatırım riskini azaltır hem de çalışanların yeni sisteme alışmasını kolaylaştırır.",
      },
      { type: "h2", text: "Yapay zekâ otomasyonunda veri güvenliği" },
      {
        type: "paragraph",
        text: "Şirketlerin AI projelerinde en fazla dikkat etmesi gereken konulardan biri veri güvenliğidir. Müşteri bilgileri, finansal veriler, teklifler, sözleşmeler veya şirket içi dokümanlar yapay zekâ sistemleri tarafından işlenebilir. Bu nedenle kullanılan sistemin hangi verileri işlediği, bu verilerin nerede saklandığı ve kimlerin erişebildiği açık şekilde belirlenmelidir.",
      },
      {
        type: "paragraph",
        text: "Ayrıca bütün süreçlerin loglanması önemlidir. Sistem hangi veriyi ne zaman işledi, hangi aksiyonu gerçekleştirdi ve hangi kullanıcı işlemi onayladı gibi bilgilerin gerektiğinde izlenebilmesi gerekir. Özellikle kritik operasyonlarda yapay zekânın doğrudan aksiyon alması yerine belirli karar noktalarında insan onayı eklenebilir. Bu yaklaşım *human-in-the-loop* olarak da adlandırılır.",
      },
      { type: "h2", text: "İş süreçleri otomasyonunda en sık yapılan hatalar" },
      {
        type: "paragraph",
        text: "Bir otomasyon projesinin başarısı yalnızca kullanılan teknolojinin kalitesine bağlı değildir. En sık yapılan hatalardan biri kötü tasarlanmış bir süreci doğrudan otomatikleştirmektir. Eğer mevcut iş akışı gereksiz veya karmaşık adımlardan oluşuyorsa otomasyon bu problemi ortadan kaldırmak yerine daha hızlı çalıştırabilir. Bu nedenle otomasyondan önce sürecin sadeleştirilmesi gerekir.",
      },
      {
        type: "paragraph",
        text: "Bir diğer hata ise yapay zekânın her probleme çözüm olarak görülmesidir. Bazı süreçler basit API entegrasyonları veya klasik otomasyonlarla çok daha güvenilir ve düşük maliyetli şekilde çözülebilir. Doğru mimari çoğu zaman AI, klasik otomasyon ve mevcut şirket sistemlerinin birlikte kullanılmasıyla oluşur.",
      },
      {
        type: "paragraph",
        text: "Ayrıca çalışanların projeye dahil edilmemesi de önemli bir problemdir. Bir otomasyon sistemi teknik olarak başarılı olsa bile kullanıcıların günlük iş akışına uymuyorsa benimsenmesi zor olabilir.",
      },
      { type: "h2", text: "Yapay zekâ otomasyonunun ROI'si nasıl değerlendirilir?" },
      {
        type: "paragraph",
        text: "AI otomasyon yatırımlarının değerlendirilmesinde yalnızca “kaç çalışan yerine geçecek?” sorusuna odaklanmak doğru değildir. Asıl amaç çalışanların zamanını daha değerli işlere yönlendirmek ve operasyonun verimliliğini artırmaktır.",
      },
      {
        type: "paragraph",
        text: "ROI hesaplanırken süreç için harcanan mevcut çalışma süresi, hata maliyetleri, gecikmeler, müşteri kayıpları ve şirket büyüdüğünde oluşacak ek operasyon ihtiyacı birlikte değerlendirilmelidir. Örneğin aylık 300 saat manuel işlem gerektiren bir süreç otomasyon sayesinde 60 saate düşüyorsa 240 saatlik kapasite başka işlere yönlendirilebilir.",
      },
      {
        type: "paragraph",
        text: "Bunun yanında hata oranının azalması veya müşterilere daha hızlı cevap verilmesi gibi dolaylı kazanımlar da bulunabilir. Bu nedenle başarılı otomasyon projelerinde proje başlamadan önce ölçülebilir KPI'lar belirlemek önemlidir.",
      },
      { type: "h2", text: "KOBİ'ler de yapay zekâ otomasyonu kullanabilir mi?" },
      {
        type: "paragraph",
        text: "Yapay zekâ otomasyonu yalnızca büyük şirketlere yönelik değildir. Hatta küçük ve orta ölçekli işletmelerde manuel iş yükü daha sınırlı ekipler tarafından yönetildiği için otomasyonun etkisi oldukça yüksek olabilir.",
      },
      {
        type: "paragraph",
        text: "Örneğin beş kişilik bir işletmede çalışanlardan birinin haftada sekiz saatini rapor hazırlamakla geçirmesi önemli bir kaynak kaybıdır. Bu sürecin otomatik hale gelmesi doğrudan şirket kapasitesini artırabilir. Günümüzde API tabanlı servisler, bulut yazılımlar ve modern AI modelleri sayesinde otomasyon projeleri geçmişe göre daha modüler şekilde geliştirilebilmektedir.",
      },
      { type: "h2", text: "Yapay zekâ ile iş süreçleri otomasyonunun geleceği" },
      {
        type: "paragraph",
        text: "Şirket yazılımları uzun yıllar boyunca kullanıcıların sisteme veri girdiği araçlar olarak tasarlandı. Yeni nesil sistemlerde ise yazılımların yalnızca bilgiyi saklaması değil, bilgiyi yorumlaması ve belirli görevleri gerçekleştirmesi bekleniyor. Bu dönüşüm özellikle AI agent sistemleriyle daha görünür hale geliyor.",
      },
      {
        type: "paragraph",
        text: "Gelecekte şirket çalışanları birçok uygulamayı ayrı ayrı açmak yerine doğal dil kullanarak sistemlerle etkileşim kurabilir. Örneğin bir satış yöneticisi “Bu ay teklif verdiğimiz ancak henüz dönüş alamadığımız müşterileri listele ve satış temsilcilerine takip görevi oluştur.” dediğinde AI sistemi CRM verilerini analiz edebilir, müşterileri belirleyebilir ve gerekli görevleri oluşturabilir.",
      },
      {
        type: "paragraph",
        text: "Ancak bu geleceğin tamamen insansız şirketler anlamına geldiğini düşünmek doğru değildir. Daha gerçekçi senaryo, insanların karar verme ve ilişki yönetimi gibi güçlü oldukları alanlara odaklandığı; yazılım ve yapay zekânın ise veri işleme ve tekrar eden operasyonları üstlendiği hibrit çalışma modelidir.",
      },
      { type: "divider" },
      { type: "h2", text: "İşletmeniz için doğru otomasyon nereden başlar?" },
      {
        type: "paragraph",
        text: "Yapay zekâ ile iş süreçleri otomasyonu teknoloji satın almakla başlamaz. İlk adım şirket içinde tekrar eden, yavaş ilerleyen veya gereksiz insan emeği gerektiren süreçleri tespit etmektir.",
      },
      {
        type: "paragraph",
        text: "Bazı şirketler için en büyük fırsat teklif hazırlama sürecinde olabilir. Bazılarında müşteri taleplerinin yönetimi, bazılarında raporlama veya veri girişi öncelikli olabilir. Bu nedenle hazır bir otomasyon paketini mevcut sisteme zorla uygulamak yerine şirketin gerçek operasyonuna göre çözüm tasarlamak daha sağlıklı sonuç verir.",
      },
      {
        type: "paragraph",
        text: "AKCY olarak yaklaşımımız da burada başlıyor. Önce mevcut süreci analiz ediyor, hangi adımların klasik otomasyonla, hangi adımların yapay zekâ ile çözülebileceğini belirliyoruz. Ardından mevcut CRM, ERP, web uygulamaları veya şirket içi sistemlerle entegre çalışan özel iş akışları geliştiriyoruz. Amaç yalnızca yeni bir AI aracı eklemek değil; işletmenin günlük operasyonunda gerçekten çalışan bir sistem oluşturmak.",
      },
    ],
    faq: [
      {
        question: "Yapay zekâ ile iş süreçleri otomasyonu nedir?",
        answer:
          "Yapay zekâ ile iş süreçleri otomasyonu; şirketlerde tekrar eden operasyonların AI ve yazılım sistemleri kullanılarak otomatikleştirilmesidir. Yapay zekâ özellikle e-posta, PDF, doküman ve doğal dil gibi yapılandırılmamış verilerin işlenmesini mümkün hale getirir.",
      },
      {
        question: "Hangi iş süreçleri otomatikleştirilebilir?",
        answer:
          "Teklif hazırlama, CRM güncelleme, müşteri taleplerini sınıflandırma, dokümanlardan veri çıkarma, raporlama, e-posta yönetimi, satın alma süreçleri ve içerik üretimi gibi birçok tekrar eden operasyon otomasyona uygun olabilir.",
      },
      {
        question: "Küçük işletmeler AI otomasyonu kullanabilir mi?",
        answer:
          "Evet. Özellikle az sayıda çalışanla çok sayıda operasyon yöneten işletmeler için otomasyon önemli verimlilik sağlayabilir. Bütün şirketi otomatikleştirmek yerine belirli bir süreçten başlanabilir.",
      },
      {
        question: "AI otomasyonu çalışanların yerini alır mı?",
        answer:
          "Her zaman değil. Birçok projede en verimli yaklaşım yapay zekânın tekrar eden işleri üstlendiği, insanların ise karar verme, kontrol ve müşteri ilişkileri gibi alanlara odaklandığı hibrit modeldir.",
      },
      {
        question:
          "AI otomasyonu için şirketin bütün sistemlerinin değiştirilmesi gerekir mi?",
        answer:
          "Genellikle hayır. Modern API ve entegrasyon teknolojileri sayesinde mevcut CRM, ERP, web uygulamaları ve diğer sistemlerin üzerine otomasyon katmanları geliştirilebilir.",
      },
      {
        question: "Yapay zekâ otomasyon projesi ne kadar sürer?",
        answer:
          "Süre projenin kapsamına bağlıdır. Tek bir iş akışını otomatikleştiren pilot uygulamalar ile birden fazla kurumsal sistemin entegre edildiği projeler arasında önemli süre farkı bulunur. Bu nedenle projeye süreç analiziyle başlamak gerekir.",
      },
    ],
  },
  {
    slug: "web-tipografisi-rehberi",
    title: "Web Tipografisi Rehberi: Okunabilir ve Güçlü Bir Site İçin Yazı Tipi Kuralları",
    seoTitle: "Web Tipografisi Rehberi: Font Seçimi ve Okunabilirlik | AKCY",
    metaDescription:
      "Web sitenizde doğru yazı tipini nasıl seçersiniz? Türkçe karakter desteği, yazı ölçeği, satır uzunluğu, satır aralığı, kontrast ve font performansı için uygulanabilir rehber.",
    focusKeyword: "web tipografisi",
    secondaryKeywords: [
      "web sitesi için font seçimi",
      "okunabilirlik",
      "Türkçe karakter desteği",
      "satır aralığı",
      "font performansı",
    ],
    category: "ui-ux",
    date: "2026-10-20",
    featured: true,
    size: "large",
    excerpt:
      "Bir web sitesindeki içeriğin büyük kısmı metindir. Doğru yazı tipi, ölçek, satır uzunluğu ve kontrast; sitenizin hem daha profesyonel görünmesini hem de daha kolay okunmasını sağlar.",
    coverImage: {
      src: "/images/blog/web-tipografisi.jpg",
      alt: "Farklı boyut ve ağırlıklarda harflerden oluşan tipografi kompozisyonu",
    },
    readingTime: 9,
    author: { name: "AKCY", role: "Tasarım Ekibi" },
    content: [
      {
        type: "paragraph",
        text: "Bir ziyaretçi web sitenize girdiğinde ilk birkaç saniyede renklerden, görsellerden ve düzenden bir izlenim edinir. Ancak sayfada geçirdiği sürenin büyük bölümünde yaptığı şey okumaktır: başlıkları, hizmet açıklamalarını, fiyat bilgilerini, form etiketlerini ve butonları.",
      },
      {
        type: "paragraph",
        text: "Bu yüzden **web tipografisi**, tasarımın süsleme kısmı değil, taşıyıcı kolonudur. Aynı içerik iyi bir tipografiyle güven veren ve kolay taranan bir sayfaya dönüşürken, kötü bir tipografiyle yorucu ve amatör görünen bir sayfaya dönüşebilir.",
      },
      {
        type: "callout",
        variant: "info",
        text: "İyi tipografi fark edilmez; okuyucu yalnızca metnin kolay okunduğunu hisseder. Kötü tipografi ise hemen fark edilir.",
      },
      { type: "h2", text: "Tipografi neden bu kadar önemli?" },
      {
        type: "paragraph",
        text: "Tipografi üç işi aynı anda yapar. Birincisi okunabilirliktir: metnin zorlanmadan okunması. İkincisi hiyerarşidir: ziyaretçinin sayfayı tarayıp neyin önemli olduğunu birkaç saniyede anlaması. Üçüncüsü ise marka algısıdır: seçtiğiniz yazı tipi, markanızın ciddi mi, samimi mi, teknik mi yoksa yaratıcı mı olduğunu kelimelerden önce anlatır.",
      },
      {
        type: "paragraph",
        text: "Sistem yazı tiplerinin (Arial, Helvetica gibi) varsayılan ayarlarla kullanıldığı siteler bu yüzden çoğu zaman “şablon gibi” görünür. Sorun yazı tipinin kendisi değil; ölçeğin, aralıkların ve hiyerarşinin bilinçli olarak tasarlanmamış olmasıdır.",
      },
      { type: "h2", text: "Doğru yazı tipini seçmek" },
      {
        type: "paragraph",
        text: "Web sitelerinin büyük çoğunluğu için gövde metninde sans-serif (tırnaksız) bir yazı tipi güvenli bir başlangıçtır. Ekranda net görünür, farklı boyutlarda tutarlı kalır ve arayüz öğeleriyle uyumludur. Serif (tırnaklı) yazı tipleri ise uzun okuma metinlerinde, editoryal sitelerde veya daha klasik bir marka karakterinde güçlü bir tercih olabilir.",
      },
      {
        type: "paragraph",
        text: "Seçim yaparken yalnızca harflerin güzelliğine değil, ailenin ne kadar eksiksiz olduğuna da bakın. İyi bir web yazı tipi ailesinde en az normal, orta ve kalın ağırlıklar bulunmalı; rakamlar, noktalama işaretleri ve özel karakterler tutarlı tasarlanmış olmalıdır.",
      },
      { type: "h3", text: "Türkçe karakter desteğini mutlaka test edin" },
      {
        type: "paragraph",
        text: "Türkçe bir site için en sık atlanan kontrol budur. Bazı yazı tiplerinde ğ, ş, ı, İ gibi karakterler hiç bulunmaz ve tarayıcı bu harfleri başka bir yazı tipinden getirir. Sonuç, kelimelerin ortasında farklı görünen harflerdir. Google Fonts gibi servislerde Türkçe karakterler genellikle **latin-ext** alt kümesindedir; bu alt kümenin yüklendiğinden emin olun.",
      },
      {
        type: "paragraph",
        text: "Hızlı bir test için tüm Türkçe harfleri içeren şu cümleyi hem küçük hem büyük harfle, farklı ağırlıklarda yazdırın: “Pijamalı hasta yağız şoföre çabucak güvendi.”",
      },
      {
        type: "callout",
        variant: "note",
        text: "Büyük harf dönüşümlerine de dikkat edin. CSS’teki text-transform: uppercase kuralı, sayfanın dili lang=\"tr\" olarak tanımlıysa “i” harfini doğru şekilde “İ” yapar. JavaScript tarafında ise toUpperCase() yerine toLocaleUpperCase(\"tr\") kullanılmalıdır; aksi halde “STRATEJİSİ” yerine “STRATEJISI” gibi hatalı sonuçlar ortaya çıkar.",
      },
      { type: "h2", text: "Kaç yazı tipi kullanmalı?" },
      {
        type: "paragraph",
        text: "Çoğu site için bir veya iki yazı tipi ailesi yeterlidir. Yaygın ve dengeli bir yaklaşım; başlıklar için karakterli bir yazı tipi, gövde metni için okunabilirliği yüksek bir yazı tipi kullanmaktır. Tek bir ailenin farklı ağırlıklarıyla da güçlü bir hiyerarşi kurulabilir.",
      },
      {
        type: "paragraph",
        text: "Üçüncü bir yazı tipi eklemeden önce iki soruyu sorun: Bu yazı tipi okuyucuya yeni bir bilgi katmanı mı veriyor (örneğin kod örnekleri için monospace bir yazı tipi), yoksa yalnızca çeşitlilik mi ekliyor? Ayrıca her yeni yazı tipi, sayfanın yüklemesi gereken ek dosyalar demektir.",
      },
      { type: "h2", text: "Yazı boyutu ve tipografik ölçek" },
      {
        type: "paragraph",
        text: "Gövde metni için 16 piksel, tarayıcıların varsayılan değeridir ve alt sınır olarak düşünülmelidir. Okuma ağırlıklı sayfalarda 17–18 piksel çoğu zaman daha rahat bir deneyim sunar. Açıklama, etiket ve dipnot gibi ikincil metinlerde ise 12 pikselin altına inmemek iyi bir kuraldır.",
      },
      {
        type: "paragraph",
        text: "Başlık boyutlarını rastgele seçmek yerine bir **tipografik ölçek** kullanın. Örneğin her seviyenin bir öncekinden 1,25 kat büyük olduğu bir ölçek; gövde, ara başlık, bölüm başlığı ve sayfa başlığı arasında tutarlı bir ritim oluşturur. Modern CSS’te clamp() fonksiyonu sayesinde başlıklar ekran genişliğine göre akışkan şekilde büyüyüp küçülebilir.",
      },
      {
        type: "code",
        language: "css",
        filename: "typography.css",
        code: `:root {
  --text-base: 1rem;                              /* 16px */
  --text-lg: 1.125rem;                            /* 18px */
  --text-h3: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --text-h2: clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem);
  --text-h1: clamp(2.25rem, 1.6rem + 3vw, 4rem);
}

body { font-size: var(--text-base); line-height: 1.65; }
h1   { font-size: var(--text-h1); line-height: 1.08; }
h2   { font-size: var(--text-h2); line-height: 1.15; }`,
      },
      { type: "h2", text: "Satır uzunluğu: en çok göz ardı edilen kural" },
      {
        type: "paragraph",
        text: "Geniş ekranlarda metnin sayfanın tamamına yayılması, okumayı ciddi şekilde zorlaştırır. Göz, uzun bir satırın sonundan bir sonraki satırın başına dönerken yerini kaybeder. Okuma metinleri için genel olarak kabul gören aralık, satır başına yaklaşık **45 ile 75 karakter** arasıdır.",
      },
      {
        type: "paragraph",
        text: "CSS’te bunu sağlamanın en kolay yolu, metin kapsayıcısına karakter birimiyle bir genişlik sınırı vermektir: max-width: 65ch gibi. Böylece yazı tipi veya boyutu değişse bile satır uzunluğu okunabilir aralıkta kalır.",
      },
      { type: "h2", text: "Satır aralığı ve harf aralığı" },
      {
        type: "paragraph",
        text: "Gövde metninde satır aralığı (line-height) genellikle 1,5 ile 1,7 arasında rahat okunur. Büyük başlıklarda ise aynı oran fazla boşluk yaratır; başlıklar için 1,05 ile 1,2 arası daha derli toplu görünür. Kural basittir: yazı büyüdükçe satır aralığı oransal olarak küçülür.",
      },
      {
        type: "paragraph",
        text: "Harf aralığında (letter-spacing) da benzer bir mantık vardır. Çok büyük başlıklarda hafif negatif bir değer (örneğin -0,02em) harfleri toparlayarak daha güçlü bir görünüm sağlar. Ancak bu değeri abartmak, özellikle Türkçedeki şapkalı ve noktalı harflerde karakterlerin birbirine yapışmasına neden olur. Tamamı büyük harfle yazılmış küçük etiketlerde ise pozitif harf aralığı (0,08–0,15em) okunabilirliği artırır.",
      },
      {
        type: "table",
        headers: ["Metin türü", "Önerilen boyut", "Satır aralığı", "Harf aralığı"],
        rows: [
          ["Gövde metni", "16–18 px", "1,5–1,7", "0"],
          ["Ara başlık (H3)", "20–24 px", "1,25–1,35", "0 / -0,01em"],
          ["Bölüm başlığı (H2)", "28–40 px", "1,1–1,2", "-0,02em"],
          ["Sayfa başlığı (H1)", "36–64 px", "1,05–1,1", "-0,02 / -0,03em"],
          ["Büyük harf etiket", "11–13 px", "1,4–1,6", "0,08–0,15em"],
        ],
      },
      { type: "h2", text: "Kontrast ve erişilebilirlik" },
      {
        type: "paragraph",
        text: "Açık gri metinler şık görünebilir, ancak çoğu zaman okunabilirliği düşürür. Web erişilebilirliği standardı WCAG, AA seviyesi için normal metinde arka planla en az **4,5:1**, büyük metinde (yaklaşık 24 piksel ve üzeri veya 18,66 piksel kalın) en az **3:1** kontrast oranı önerir.",
      },
      {
        type: "paragraph",
        text: "Kontrastı tahminle değil, ölçerek kontrol edin. Tarayıcıların geliştirici araçları ve çevrim içi kontrast denetleyicileri, seçtiğiniz renk çiftinin bu eşikleri karşılayıp karşılamadığını anında gösterir.",
      },
      { type: "h2", text: "Font performansı: güzel görünmesi yetmez" },
      {
        type: "paragraph",
        text: "Web yazı tipleri, sayfanın indirmesi gereken dosyalardır. Yanlış yüklendiklerinde metin bir süre görünmez kalabilir veya yazı tipi yüklendiğinde sayfa düzeni kayabilir. Bu da hem kullanıcı deneyimini hem de Core Web Vitals metriklerini olumsuz etkiler.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "**WOFF2 formatını kullanın:** Web için en verimli sıkıştırılmış yazı tipi formatıdır.",
          "**Yalnızca ihtiyacınız olan ağırlıkları yükleyin:** Kullanılmayan her ağırlık gereksiz indirme demektir. Değişken (variable) yazı tipleri birçok ağırlığı tek dosyada sunabilir.",
          "**font-display: swap kullanın:** Yazı tipi yüklenene kadar metin yedek yazı tipiyle görünür kalır.",
          "**Yazı tiplerini kendi sunucunuzdan sunun:** Ek bir alan adına bağlantı kurma ihtiyacını ortadan kaldırır; Next.js gibi çatılar bunu otomatik yapabilir.",
          "**Yedek yazı tipini ayarlayın:** size-adjust gibi özelliklerle yedek yazı tipinin ölçüsünü web yazı tipine yaklaştırmak, yükleme anındaki kaymayı azaltır.",
        ],
      },
      { type: "h2", text: "Hiyerarşi: ziyaretçiye nereye bakacağını söyleyin" },
      {
        type: "paragraph",
        text: "Ziyaretçilerin çoğu sayfayı satır satır okumaz; tarar. Başlıklar, kalın ifadeler, kısa paragraflar ve listeler bu taramayı kolaylaştırır. Hiyerarşi kurmak için yalnızca boyutu değil, ağırlığı, rengi ve boşluğu da kullanın. Bir başlığın üstündeki boşluğun altındakinden fazla olması, o başlığın hangi içeriğe ait olduğunu gözün anında anlamasını sağlar.",
      },
      {
        type: "quote",
        text: "Bir sayfada her şey vurgulanırsa, hiçbir şey vurgulanmamış olur.",
      },
      { type: "h2", text: "Hızlı kontrol listesi" },
      {
        type: "list",
        style: "ordered",
        items: [
          "En fazla iki yazı tipi ailesi kullanılıyor mu?",
          "Türkçe karakterler tüm ağırlıklarda doğru görünüyor mu?",
          "Gövde metni en az 16 piksel mi?",
          "Okuma metinlerinde satır uzunluğu 45–75 karakter aralığında mı?",
          "Gövdede satır aralığı 1,5 civarında, başlıklarda daha sıkı mı?",
          "Metin ve arka plan kontrastı WCAG AA eşiklerini karşılıyor mu?",
          "Yazı tipleri WOFF2 formatında ve yalnızca gereken ağırlıklarla mı yükleniyor?",
          "Başlık ölçeği tutarlı bir orana dayanıyor mu?",
        ],
      },
      { type: "divider" },
      { type: "h2", text: "Sonuç" },
      {
        type: "paragraph",
        text: "İyi bir web tipografisi pahalı bir yazı tipi satın almakla değil, birkaç temel kuralı tutarlı şekilde uygulamakla başlar. Doğru yazı tipi ailesi, net bir ölçek, okunabilir satır uzunluğu ve yeterli kontrast; sitenizin hem daha profesyonel görünmesini hem de ziyaretçilerin aradığını daha hızlı bulmasını sağlar.",
      },
      {
        type: "paragraph",
        text: "AKCY olarak web projelerinde tipografiyi tasarımın en başında, marka dili ve içerik yapısıyla birlikte kurguluyoruz. Böylece tasarım sistemi büyüdükçe her yeni sayfa aynı tutarlılığı korur.",
      },
    ],
    faq: [
      {
        question: "Web sitesi için en iyi yazı tipi hangisidir?",
        answer:
          "Tek bir doğru yazı tipi yoktur. Gövde metni için ekranda net görünen, Türkçe karakterleri eksiksiz destekleyen ve farklı ağırlıklara sahip bir sans-serif yazı tipi çoğu site için güvenli bir başlangıçtır. Seçim marka karakterine ve içeriğin türüne göre yapılmalıdır.",
      },
      {
        question: "Web sitesinde gövde metni kaç piksel olmalı?",
        answer:
          "Gövde metni için 16 piksel alt sınır olarak kabul edilir. Okuma ağırlıklı sayfalarda 17–18 piksel daha rahat bir okuma deneyimi sunabilir.",
      },
      {
        question: "Bir satırda kaç karakter olmalı?",
        answer:
          "Okuma metinleri için genel olarak satır başına yaklaşık 45 ile 75 karakter önerilir. CSS’te max-width: 65ch gibi bir değer bunu sağlamanın kolay bir yoludur.",
      },
      {
        question: "Google Fonts Türkçe karakterleri destekler mi?",
        answer:
          "Birçok Google Fonts yazı tipi Türkçe karakterleri destekler; bu karakterler genellikle latin-ext alt kümesinde bulunur. Yine de seçtiğiniz yazı tipini tüm Türkçe harflerle ve kullandığınız her ağırlıkta test etmeniz gerekir.",
      },
    ],
  },
  {
    slug: "core-web-vitals-rehberi",
    title: "Core Web Vitals Nedir? LCP, INP ve CLS’yi İyileştirme Rehberi",
    seoTitle: "Core Web Vitals Nedir? LCP, INP ve CLS İyileştirme Rehberi | AKCY",
    metaDescription:
      "Core Web Vitals nedir, nasıl ölçülür? LCP, INP ve CLS metriklerinin eşik değerlerini ve web sitenizde her birini iyileştirmek için uygulanabilir yöntemleri öğrenin.",
    focusKeyword: "Core Web Vitals",
    secondaryKeywords: [
      "LCP nedir",
      "INP nedir",
      "CLS nedir",
      "web sitesi hızı",
      "sayfa performansı",
      "PageSpeed Insights",
    ],
    category: "web",
    date: "2026-10-06",
    excerpt:
      "Google’ın sayfa deneyimini ölçmek için kullandığı üç metrik olan LCP, INP ve CLS ne anlama geliyor? Eşik değerlerini, nasıl ölçüleceklerini ve her birini iyileştirmenin pratik yollarını anlatıyoruz.",
    coverImage: {
      src: "/images/blog/core-web-vitals.jpg",
      alt: "LCP, INP ve CLS metriklerini gösteren performans paneli illüstrasyonu",
    },
    readingTime: 10,
    author: { name: "AKCY", role: "Web Ekibi" },
    content: [
      {
        type: "paragraph",
        text: "Bir web sitesinin hızlı olup olmadığını uzun yıllar boyunca tek bir soruyla değerlendirdik: Sayfa kaç saniyede açılıyor? Oysa kullanıcı açısından “hızlı” hissi tek bir sayıdan ibaret değildir. Ana içerik ne kadar sürede görünüyor, bir butona tıkladığınızda sayfa ne kadar çabuk tepki veriyor, okurken içerik aniden kayıyor mu?",
      },
      {
        type: "paragraph",
        text: "**Core Web Vitals**, Google’ın bu üç deneyimi ölçmek için tanımladığı metrik setidir. Google bu metrikleri sayfa deneyimi sinyallerinin bir parçası olarak değerlendirir; ancak asıl önemli olan, iyi skorların doğrudan daha iyi bir kullanıcı deneyimi anlamına gelmesidir.",
      },
      { type: "h2", text: "Üç temel metrik ve eşik değerleri" },
      {
        type: "paragraph",
        text: "Core Web Vitals üç metrikten oluşur. Her birinin “iyi”, “iyileştirilmeli” ve “zayıf” olarak tanımlanmış eşikleri vardır. Bir sayfanın iyi sayılması için bu değerlerin, gerçek ziyaretlerin %75’inde (75. yüzdelik dilimde) karşılanması gerekir.",
      },
      {
        type: "table",
        headers: ["Metrik", "Ne ölçer?", "İyi", "Zayıf"],
        rows: [
          ["LCP (Largest Contentful Paint)", "Ana içeriğin yüklenme hızı", "≤ 2,5 sn", "> 4 sn"],
          ["INP (Interaction to Next Paint)", "Etkileşimlere tepki hızı", "≤ 200 ms", "> 500 ms"],
          ["CLS (Cumulative Layout Shift)", "Görsel kararlılık", "≤ 0,1", "> 0,25"],
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "INP, Mart 2024’te etkileşim metriği olarak FID’nin (First Input Delay) yerini aldı. FID yalnızca ilk etkileşimin gecikmesini ölçerken INP, sayfadaki etkileşimlerin genel tepki süresini değerlendirir.",
      },
      { type: "h2", text: "Saha verisi ve laboratuvar verisi farkı" },
      {
        type: "paragraph",
        text: "Performans ölçümünde iki tür veri vardır. **Saha verisi**, gerçek kullanıcıların gerçek cihaz ve bağlantılarla sitenizi ziyaret ettiğinde toplanır. Google’ın Chrome Kullanıcı Deneyimi Raporu (CrUX) bu veriyi sunar ve Search Console’daki Core Web Vitals raporu da buna dayanır.",
      },
      {
        type: "paragraph",
        text: "**Laboratuvar verisi** ise Lighthouse gibi araçların kontrollü bir ortamda tek bir yüklemeyi simüle etmesiyle elde edilir. Laboratuvar verisi sorunları bulmak ve düzeltmeleri test etmek için idealdir; ancak sitenizin gerçek durumunu gösteren saha verisidir. PageSpeed Insights her ikisini aynı sayfada gösterdiği için iyi bir başlangıç noktasıdır.",
      },
      { type: "h2", text: "LCP: Ana içerik ne kadar hızlı görünüyor?" },
      {
        type: "paragraph",
        text: "LCP, sayfanın görünür alanındaki en büyük içerik öğesinin (genellikle hero görseli, büyük bir başlık veya kapak fotoğrafı) ekranda belirdiği anı ölçer. Kullanıcının “sayfa yüklendi” hissine en yakın metriktir.",
      },
      { type: "h3", text: "LCP’yi iyileştirmenin yolları" },
      {
        type: "list",
        style: "unordered",
        items: [
          "**LCP görselini tembel yüklemeyin:** loading=\"lazy\" ekranın altındaki görseller içindir. Hero görseline bunun yerine fetchpriority=\"high\" vererek tarayıcıya öncelik bildirin.",
          "**Görselleri doğru boyutta ve modern formatta sunun:** AVIF veya WebP formatları ve srcset ile cihaza uygun boyut seçimi dosya boyutunu belirgin şekilde düşürür.",
          "**Sunucu yanıt süresini kısaltın:** Önbellekleme, CDN kullanımı ve statik üretilebilen sayfaların önceden oluşturulması ilk baytın daha hızlı gelmesini sağlar.",
          "**Oluşturmayı engelleyen kaynakları azaltın:** Kritik olmayan CSS ve JavaScript dosyaları, ana içeriğin çizilmesini geciktirmemelidir.",
        ],
      },
      {
        type: "code",
        language: "html",
        filename: "hero.html",
        code: `<!-- Ekranın üstündeki ana görsel: öncelikli, tembel yükleme yok -->
<img
  src="/hero-1600.avif"
  srcset="/hero-800.avif 800w, /hero-1600.avif 1600w"
  sizes="100vw"
  width="1600" height="900"
  fetchpriority="high"
  alt="Ürün arayüzü">`,
      },
      { type: "h2", text: "INP: Sayfa tıklamalara ne kadar hızlı tepki veriyor?" },
      {
        type: "paragraph",
        text: "INP, kullanıcının bir butona tıklaması, menüyü açması veya form alanına yazması gibi etkileşimlerden sonra ekranın ne kadar sürede güncellendiğini ölçer. Kötü bir INP, “butona bastım ama hiçbir şey olmadı” hissidir ve kullanıcıların aynı butona tekrar tekrar basmasına yol açar.",
      },
      {
        type: "paragraph",
        text: "INP sorunlarının neredeyse tamamının kaynağı ana iş parçacığını (main thread) uzun süre meşgul eden JavaScript kodudur. Tarayıcı bir görevi yürütürken kullanıcının etkileşimine yanıt veremez.",
      },
      { type: "h3", text: "INP’yi iyileştirmenin yolları" },
      {
        type: "list",
        style: "unordered",
        items: [
          "**Uzun görevleri bölün:** 50 milisaniyeden uzun süren görevler “uzun görev” kabul edilir. Ağır işleri parçalara ayırıp aralarda tarayıcıya nefes aldırın.",
          "**Gereksiz JavaScript’i azaltın:** Kullanılmayan kütüphaneler ve sayfanın ilk açılışında gerekmeyen kodlar ihtiyaç anında yüklenmelidir.",
          "**Üçüncü parti betikleri denetleyin:** Sohbet araçları, reklam ve takip kodları ana iş parçacığını en çok meşgul eden kaynaklar arasındadır.",
          "**Olay işleyicilerini hafif tutun:** Tıklama anında yalnızca görsel geri bildirim için gereken işi yapın; ağır hesaplamaları sonraya bırakın.",
        ],
      },
      { type: "h2", text: "CLS: Sayfa okurken kayıyor mu?" },
      {
        type: "paragraph",
        text: "CLS, sayfa yüklenirken veya kullanılırken içeriğin beklenmedik şekilde yer değiştirme miktarını ölçer. Bir habere tıklamak üzereyken üstte bir reklamın belirmesi ve parmağınızın başka bir bağlantıya denk gelmesi, kötü CLS’nin en bilinen örneğidir.",
      },
      { type: "h3", text: "CLS’yi iyileştirmenin yolları" },
      {
        type: "list",
        style: "unordered",
        items: [
          "**Görsellere ve videolara boyut verin:** width ve height öznitelikleri veya CSS aspect-ratio, tarayıcının yükleme öncesinde doğru alanı ayırmasını sağlar.",
          "**Sonradan yüklenen içerik için yer ayırın:** Reklam alanları, gömülü içerikler ve çerez bildirimleri mevcut içeriği itmemelidir.",
          "**Yazı tipi geçişini yönetin:** Yedek yazı tipinin ölçüsünü web yazı tipine yaklaştırmak, yazı tipi yüklendiği andaki kaymayı azaltır.",
          "**Animasyonlarda transform kullanın:** top, left veya height gibi özellikleri canlandırmak düzeni yeniden hesaplatır; transform ve opacity ise düzeni etkilemez.",
        ],
      },
      { type: "h2", text: "Hangi araçlarla ölçmeli?" },
      {
        type: "list",
        style: "unordered",
        items: [
          "**PageSpeed Insights:** Tek bir URL için hem saha hem laboratuvar verisi.",
          "**Google Search Console:** Sitenin genelinde hangi sayfa gruplarının sorunlu olduğunu gösteren Core Web Vitals raporu.",
          "**Chrome Geliştirici Araçları:** Performance paneliyle uzun görevleri, düzen kaymalarını ve LCP öğesini ayrıntılı inceleme imkânı.",
          "**Lighthouse:** Geliştirme sürecinde düzenli laboratuvar testleri için.",
        ],
      },
      {
        type: "quote",
        text: "Performans bir kez yapılıp biten bir iş değildir. Her yeni görsel, betik ve özellik, skorları yeniden değiştirebilir.",
      },
      { type: "h2", text: "Performansı süreç haline getirmek" },
      {
        type: "paragraph",
        text: "Birçok site yayına alındığı gün hızlıdır; sorunlar zamanla eklenen kampanya görselleri, takip kodları ve yeni bölümlerle başlar. Bu yüzden performansı tek seferlik bir optimizasyon yerine geliştirme sürecinin parçası yapmak gerekir: görseller için boyut ve format kuralları belirlemek, yeni betik eklemeden önce etkisini ölçmek ve Search Console raporunu düzenli takip etmek.",
      },
      { type: "divider" },
      { type: "h2", text: "Sonuç" },
      {
        type: "paragraph",
        text: "Core Web Vitals, teknik bir puan tablosu gibi görünse de aslında üç basit kullanıcı sorusuna cevap verir: İçerik hızlı göründü mü, sayfa tepkime hızlı karşılık verdi mi, okurken hiçbir şey yerinden oynadı mı? Bu üç sorunun cevabı “evet” olduğunda ziyaretçiler sitede daha rahat gezinir.",
      },
      {
        type: "paragraph",
        text: "AKCY olarak geliştirdiğimiz web projelerinde görsel optimizasyonu, yazı tipi yükleme stratejisini ve JavaScript bütçesini en baştan planlıyor; yayından sonra da metrikleri gerçek kullanıcı verisiyle takip ediyoruz.",
      },
    ],
    faq: [
      {
        question: "Core Web Vitals nedir?",
        answer:
          "Core Web Vitals, Google’ın web sayfalarındaki kullanıcı deneyimini ölçmek için tanımladığı üç metriktir: yükleme hızı için LCP, etkileşime tepki için INP ve görsel kararlılık için CLS.",
      },
      {
        question: "İyi bir LCP değeri kaç saniyedir?",
        answer:
          "Google’a göre ziyaretlerin %75’inde 2,5 saniye veya daha kısa LCP iyi kabul edilir. 4 saniyenin üzerindeki değerler zayıf olarak değerlendirilir.",
      },
      {
        question: "INP ile FID arasındaki fark nedir?",
        answer:
          "FID yalnızca sayfadaki ilk etkileşimin gecikmesini ölçüyordu. INP ise sayfa boyunca yapılan etkileşimlerin tepki süresini değerlendirir ve Mart 2024’te FID’nin yerini almıştır.",
      },
      {
        question: "PageSpeed skoru ile Core Web Vitals aynı şey mi?",
        answer:
          "Hayır. PageSpeed Insights’taki 0–100 arası performans skoru Lighthouse laboratuvar testine dayanır. Core Web Vitals değerlendirmesi ise gerçek kullanıcılardan toplanan saha verisine göre yapılır.",
      },
    ],
  },
  {
    slug: "kurumsal-web-sitesi-yaptirmadan-once",
    title: "Kurumsal Web Sitesi Yaptırmadan Önce Bilmeniz Gereken 10 Şey",
    seoTitle: "Kurumsal Web Sitesi Yaptırırken Dikkat Edilmesi Gerekenler | AKCY",
    metaDescription:
      "Kurumsal web sitesi yaptırmadan önce nelere dikkat etmelisiniz? Hedef belirleme, içerik, alan adı sahipliği, SEO, KVKK, bakım ve teklif karşılaştırma için 10 maddelik rehber.",
    focusKeyword: "kurumsal web sitesi",
    secondaryKeywords: [
      "web sitesi yaptırmak",
      "kurumsal web tasarım",
      "web sitesi teklifi",
      "alan adı ve hosting",
      "web sitesi bakımı",
    ],
    category: "web",
    date: "2026-09-28",
    excerpt:
      "Yeni bir kurumsal web sitesi projesine başlamadan önce sorulması gereken soruları, sık yapılan hataları ve teklifleri karşılaştırırken dikkat edilmesi gereken noktaları 10 maddede topladık.",
    coverImage: {
      src: "/images/blog/kurumsal-web-sitesi.jpg",
      alt: "Kurumsal web sitesi planlamasını temsil eden sayfa şeması illüstrasyonu",
    },
    readingTime: 11,
    author: { name: "AKCY", role: "Web Ekibi" },
    content: [
      {
        type: "paragraph",
        text: "Kurumsal web sitesi projeleri çoğu zaman tek bir cümleyle başlar: “Sitemiz eskidi, yenilememiz gerekiyor.” Ardından birkaç ajanstan teklif alınır, fiyatlar karşılaştırılır ve proje başlar. Ancak sitenin ne amaçla yenileneceği, kimin için tasarlanacağı ve yayından sonra nasıl yönetileceği netleşmeden başlayan projeler genellikle uzar, revizyonlarla dolar ve beklenen sonucu vermez.",
      },
      {
        type: "paragraph",
        text: "Bu yazıda bir **kurumsal web sitesi** projesine başlamadan önce netleştirmeniz gereken 10 konuyu, en sık karşılaştığımız hatalarla birlikte ele alıyoruz.",
      },
      { type: "h2", text: "1. Sitenin işini tanımlayın" },
      {
        type: "paragraph",
        text: "“Modern bir site istiyoruz” bir hedef değildir. Sitenin şirketiniz için hangi işi yapacağını tanımlayın: Teklif talebi toplamak mı, bayilere ürün bilgisi sunmak mı, nitelikli eleman çekmek mi, yatırımcılara güven vermek mi? Her hedef farklı bir yapı, farklı sayfalar ve farklı çağrılar (CTA) gerektirir.",
      },
      {
        type: "paragraph",
        text: "Hedefi tanımladıktan sonra nasıl ölçeceğinizi de belirleyin. Form gönderimleri, telefon tıklamaları veya katalog indirmeleri gibi ölçülebilir hedefler, sitenin yayından sonra gerçekten işe yarayıp yaramadığını anlamanızı sağlar.",
      },
      { type: "h2", text: "2. Ziyaretçinizi tanıyın" },
      {
        type: "paragraph",
        text: "Sitenizi kimler ziyaret ediyor ve ne arıyor? Bir satın alma yöneticisi teknik belgelere ve sertifikalara hızla ulaşmak isterken, potansiyel bir çalışan şirket kültürünü merak eder. Ana ziyaretçi gruplarını ve her birinin sitede bulmak istediği üç şeyi listelemek, bilgi mimarisinin temelini oluşturur.",
      },
      { type: "h2", text: "3. İçerik tasarımdan önce gelir" },
      {
        type: "paragraph",
        text: "En sık karşılaştığımız sorunlardan biri, tasarımın boş metinlerle (lorem ipsum) onaylanması ve gerçek içeriğin en sona bırakılmasıdır. Gerçek metin geldiğinde başlıklar sığmaz, bölümler boş kalır veya fazla uzar. Mümkünse ana sayfa ve hizmet sayfalarının içerik taslaklarını tasarım başlamadan hazırlayın; en azından hangi bilgilerin yer alacağını netleştirin.",
      },
      {
        type: "callout",
        variant: "note",
        text: "Gerçek fotoğraflar da içeriğin parçasıdır. Ekibinizi, üretim alanınızı veya projelerinizi gösteren özgün görseller, stok fotoğraflardan çok daha fazla güven oluşturur.",
      },
      { type: "h2", text: "4. Site haritasını birlikte kurgulayın" },
      {
        type: "paragraph",
        text: "Hangi sayfaların olacağı, menüde nasıl gruplanacağı ve sayfaların birbirine nasıl bağlanacağı tasarımdan önce belirlenmelidir. Ziyaretçinin aradığı bilgiye en fazla iki üç tıklamada ulaşabilmesi iyi bir hedeftir. Hizmetlerinizi kendi iç organizasyonunuza göre değil, müşterinin ihtiyacına göre gruplamak da önemlidir.",
      },
      { type: "h2", text: "5. Hazır tema mı, özel tasarım mı?" },
      {
        type: "paragraph",
        text: "Hazır temalar hızlı ve ekonomik bir başlangıç sunar; ancak markanızı rakiplerinizden ayırmakta zorlanabilir ve ihtiyaç duymadığınız birçok özellikle siteyi ağırlaştırabilir. Özel tasarım ise markanıza ve içeriğinize göre şekillenir, fakat daha fazla zaman ve bütçe gerektirir. Doğru seçim; bütçenize, zaman planınıza ve sitenin şirketiniz için ne kadar kritik olduğuna bağlıdır.",
      },
      {
        type: "table",
        headers: ["", "Hazır tema", "Özel tasarım"],
        rows: [
          ["Süre", "Daha kısa", "Daha uzun"],
          ["Maliyet", "Daha düşük", "Daha yüksek"],
          ["Marka farklılaşması", "Sınırlı", "Yüksek"],
          ["Performans", "Gereksiz kodlarla ağırlaşabilir", "Yalnızca gereken özellikler"],
          ["Esneklik", "Temanın izin verdiği kadar", "İhtiyaca göre şekillenir"],
        ],
      },
      { type: "h2", text: "6. İçeriği kim, nasıl güncelleyecek?" },
      {
        type: "paragraph",
        text: "Yayından sonra haber, ürün, referans veya ilan eklemeniz gerekecek mi? Bunu kimin yapacağını ve ne sıklıkla yapılacağını baştan belirleyin. Sık güncellenen içerikler için kolay kullanılan bir içerik yönetim paneli şarttır; nadiren değişen sayfalar için ise daha basit ve hızlı yapılar tercih edilebilir.",
      },
      { type: "h2", text: "7. Mobil uyum ve hız pazarlık konusu değildir" },
      {
        type: "paragraph",
        text: "Ziyaretçilerinizin önemli bir kısmı sitenize telefondan ulaşacaktır ve Google sitenizi değerlendirirken mobil sürümünü esas alır. Tasarım onayını yalnızca masaüstü görünüm üzerinden vermeyin; mobil ekranları da ayrıca inceleyin. Teklif alırken performans hedeflerini (örneğin Core Web Vitals eşikleri) sözleşmeye eklemek de iyi bir uygulamadır.",
      },
      { type: "h2", text: "8. SEO’yu yayından sonraya bırakmayın" },
      {
        type: "paragraph",
        text: "Arama motoru optimizasyonu, site bittikten sonra eklenen bir hizmet değil, yapının parçasıdır. Doğru başlık hiyerarşisi, sayfaya özel başlık ve açıklama etiketleri, anlamlı URL’ler, site haritası ve yapılandırılmış veri geliştirme sürecinde kurulmalıdır.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Mevcut bir siteyi yeniliyorsanız eski adreslerin yeni adreslere 301 yönlendirmesiyle bağlanması kritik önemdedir. Aksi halde yıllar içinde kazanılmış arama görünürlüğü ve dış bağlantılar kaybolabilir.",
      },
      { type: "h2", text: "9. Alan adı, barındırma ve sahiplik" },
      {
        type: "paragraph",
        text: "Alan adınızın şirketiniz adına kayıtlı olduğundan ve yönetim paneline sizin de erişiminiz bulunduğundan emin olun. Aynı şekilde barındırma (hosting) hesabı, kaynak kodlar ve tasarım dosyalarının kime ait olacağı sözleşmede açıkça yazılmalıdır. Ajansla yollarınız ayrıldığında sitenize erişemiyor olmak, en can sıkıcı ve en kolay önlenebilecek sorunlardan biridir.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Alan adı kimin adına kayıtlı?",
          "Barındırma hesabının sahibi kim ve yedekleme nasıl yapılıyor?",
          "SSL sertifikası ve yenilemesi dahil mi?",
          "Kaynak kod ve tasarım dosyaları proje sonunda teslim ediliyor mu?",
        ],
      },
      { type: "h2", text: "10. Yasal yükümlülükler ve bakım" },
      {
        type: "paragraph",
        text: "İletişim formu, bülten aboneliği veya analiz araçları kullanıyorsanız kişisel veri işliyorsunuz demektir. KVKK aydınlatma metni, gerekli durumlarda açık rıza ve çerez bilgilendirmesi sitenin parçası olmalıdır. Yalnızca gerçekten kullandığınız araçları metinlerde belirtmek de önemlidir.",
      },
      {
        type: "paragraph",
        text: "Son olarak, bir web sitesi yayına alındığı gün bitmez. Güvenlik güncellemeleri, yedekleme, içerik güncellemeleri ve performans takibi için bir bakım planı oluşturun. Teklif karşılaştırırken bakım hizmetinin kapsamını ve maliyetini de sorun.",
      },
      { type: "h2", text: "Teklifleri karşılaştırırken sorulacak sorular" },
      {
        type: "list",
        style: "ordered",
        items: [
          "Fiyata hangi sayfalar ve özellikler dahil?",
          "Kaç tur tasarım revizyonu yapılabiliyor?",
          "İçerik girişi kimin sorumluluğunda?",
          "Mobil uyum, performans ve temel SEO kurulumu dahil mi?",
          "Proje takvimi ve ara teslim tarihleri neler?",
          "Yayından sonra destek ve bakım nasıl işliyor?",
          "Alan adı, barındırma ve kaynak kodların sahipliği kimde olacak?",
        ],
      },
      {
        type: "quote",
        text: "En ucuz teklif, kapsamı en dar olan teklif olabilir. Karşılaştırmayı fiyat üzerinden değil, kapsam üzerinden yapın.",
      },
      { type: "divider" },
      { type: "h2", text: "Sonuç" },
      {
        type: "paragraph",
        text: "Başarılı bir kurumsal web sitesi projesi, tasarım ekranlarından çok önce verilen kararlarla başlar: net bir hedef, tanımlanmış ziyaretçi grupları, hazır içerik ve açık bir sahiplik yapısı. Bu kararlar netleştiğinde tasarım ve geliştirme süreci hem daha hızlı hem de daha az revizyonla ilerler.",
      },
      {
        type: "paragraph",
        text: "AKCY olarak web projelerine bir keşif aşamasıyla başlıyor; hedefleri, ziyaretçi gruplarını ve içerik yapısını sizinle birlikte netleştirdikten sonra tasarım ve geliştirmeye geçiyoruz.",
      },
    ],
    faq: [
      {
        question: "Kurumsal web sitesi ne kadar sürede hazırlanır?",
        answer:
          "Süre; sayfa sayısına, içeriğin hazır olup olmadığına, özel tasarım veya hazır tema tercihine ve entegrasyon ihtiyaçlarına göre değişir. İçeriğin baştan hazırlanması projeyi belirgin şekilde hızlandırır.",
      },
      {
        question: "Kurumsal web sitesinde hangi sayfalar olmalı?",
        answer:
          "Genellikle ana sayfa, hakkımızda, hizmetler veya ürünler, referanslar veya projeler, iletişim ve yasal metin sayfaları temel yapıyı oluşturur. Kesin yapı, sitenin hedefine ve ziyaretçi gruplarına göre belirlenmelidir.",
      },
      {
        question: "Alan adı kimin adına kayıtlı olmalı?",
        answer:
          "Alan adı şirketinizin adına kayıtlı olmalı ve yönetim paneline şirketinizin de erişimi bulunmalıdır. Bu, ileride ajans veya barındırma firması değiştirdiğinizde sorun yaşamamanızı sağlar.",
      },
      {
        question: "Site yenilenirken Google sıralaması kaybolur mu?",
        answer:
          "Doğru planlanırsa kaybolmaz. Eski sayfa adreslerinin yeni adreslere 301 yönlendirmesiyle bağlanması, sayfa başlıklarının ve içeriğin korunması ve yeni site haritasının Search Console’a gönderilmesi geçiş sürecini güvenli hale getirir.",
      },
    ],
  },
  {
    slug: "mobil-oncelikli-tasarim-rehberi",
    title: "Mobil Öncelikli Tasarım: Responsive Web Sitesi Nasıl Planlanır?",
    seoTitle: "Mobil Öncelikli Tasarım ve Responsive Web Rehberi | AKCY",
    metaDescription:
      "Mobil öncelikli tasarım nedir? İçerik önceliklendirme, dokunma alanları, mobil formlar, kırılma noktaları ve responsive görseller için uygulanabilir rehber.",
    focusKeyword: "mobil öncelikli tasarım",
    secondaryKeywords: [
      "responsive web tasarım",
      "mobil uyumlu web sitesi",
      "mobile first",
      "dokunma alanı boyutu",
      "mobil form tasarımı",
    ],
    category: "ui-ux",
    date: "2026-09-22",
    excerpt:
      "Masaüstü tasarımı küçülterek iyi bir mobil deneyim elde edilemez. Mobil öncelikli yaklaşımın mantığını, dokunma alanlarından formlara kadar dikkat edilmesi gereken detayları anlatıyoruz.",
    coverImage: {
      src: "/images/blog/mobil-oncelikli-tasarim.jpg",
      alt: "Mobil, tablet ve masaüstü ekranlarda aynı arayüzün yerleşimini gösteren illüstrasyon",
    },
    readingTime: 8,
    author: { name: "AKCY", role: "Tasarım Ekibi" },
    content: [
      {
        type: "paragraph",
        text: "Birçok web projesinde süreç şöyle ilerler: Önce geniş bir masaüstü ekran için tasarım yapılır, onaylanır, ardından “mobil uyumlu hale getirilir.” Bu yaklaşımda mobil sürüm çoğu zaman masaüstü tasarımın sıkıştırılmış bir kopyasına dönüşür. Kolonlar alt alta dizilir, menüler küçülür, butonlar parmakla dokunulamayacak kadar ufak kalır.",
      },
      {
        type: "paragraph",
        text: "**Mobil öncelikli tasarım** (mobile first) bu süreci tersine çevirir: Tasarım en küçük ve en kısıtlı ekrandan başlar, ekran büyüdükçe genişletilir. Bu yalnızca teknik bir sıralama değil, içeriği önceliklendirmeye zorlayan bir düşünme biçimidir.",
      },
      { type: "h2", text: "Neden mobil öncelikli?" },
      {
        type: "paragraph",
        text: "Birçok sektörde web trafiğinin büyük bölümü artık mobil cihazlardan gelir. Bunun yanında Google, siteleri dizine eklerken ve sıralarken sitenin mobil sürümünü esas alır. Mobil sürümde eksik olan bir içerik, arama motoru açısından da eksik kabul edilebilir.",
      },
      {
        type: "paragraph",
        text: "Ancak en önemli neden tasarımsal bir nedendir: Küçük bir ekranda her şeye yer yoktur. Mobilden başlamak, “Bu sayfada gerçekten ne önemli?” sorusunu en başta sormanızı sağlar. Bu soruya verilen cevap, masaüstü tasarımı da daha sade ve odaklı hale getirir.",
      },
      { type: "h2", text: "1. İçeriği önceliklendirin" },
      {
        type: "paragraph",
        text: "Mobil ekranda ziyaretçi sayfayı yukarıdan aşağıya tek bir sütunda okur. Bu yüzden içerik sıralaması, masaüstündeki yan yana yerleşimden çok daha belirleyicidir. Her sayfa için ziyaretçinin ilk ekranda görmesi gereken bilgiyi ve yapmasını istediğiniz ana eylemi belirleyin.",
      },
      {
        type: "callout",
        variant: "note",
        text: "Masaüstünde iki sütunlu bir düzende soldaki metin ve sağdaki görsel dengeli görünebilir. Mobilde ise hangisinin önce geleceğine bilinçli karar verilmelidir; çoğu zaman başlık önce, görsel sonra gelir.",
      },
      { type: "h2", text: "2. Parmak için tasarlayın, fare için değil" },
      {
        type: "paragraph",
        text: "Fare imleci tek bir pikseli hedefleyebilir; parmak ise çok daha geniş bir alana dokunur. Küçük bağlantılar ve birbirine çok yakın butonlar yanlış dokunmalara ve kullanıcının hayal kırıklığına yol açar.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "**Apple’ın arayüz yönergeleri** dokunma hedefleri için en az 44×44 punto önerir.",
          "**Google’ın Material Design yönergeleri** en az 48×48 dp dokunma alanı önerir.",
          "**WCAG 2.2** AA seviyesinde hedefler için en az 24×24 CSS pikseli alt sınır olarak tanımlar.",
        ],
      },
      {
        type: "paragraph",
        text: "Görsel olarak küçük bir ikon kullansanız bile, dokunma alanını dolgu (padding) ile genişletebilirsiniz. Ayrıca sık kullanılan eylemleri ekranın başparmakla rahat ulaşılan alt ve orta bölümlerine yerleştirmek, tek elle kullanımı kolaylaştırır.",
      },
      { type: "h2", text: "3. Navigasyonu sadeleştirin" },
      {
        type: "paragraph",
        text: "Masaüstündeki geniş menüler mobilde genellikle bir menü butonunun arkasına taşınır. Bu kaçınılmazdır, ancak menünün içi de sade kalmalıdır. Birden fazla seviyeli menülerde alt menülerin açılıp kapanabilir olması, menünün açıkken sayfanın kaydırılmaması ve Escape tuşu ile odak yönetimi gibi erişilebilirlik detayları da unutulmamalıdır.",
      },
      {
        type: "paragraph",
        text: "En önemli eylem (örneğin “Teklif Al” veya “Bize Ulaşın”) menünün içinde kaybolmamalı; mümkünse menü kapalıyken de görünür olmalıdır.",
      },
      { type: "h2", text: "4. Formları mobil için optimize edin" },
      {
        type: "paragraph",
        text: "Mobilde form doldurmak masaüstüne göre daha zahmetlidir. Her gereksiz alan, formun yarıda bırakılma ihtimalini artırır. Yalnızca gerçekten ihtiyaç duyduğunuz bilgileri isteyin ve tarayıcının sunduğu kolaylıklardan yararlanın.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Doğru **input type** kullanın: type=\"email\" e-posta klavyesini, type=\"tel\" sayısal klavyeyi açar.",
          "**autocomplete** öznitelikleriyle tarayıcının ad, e-posta ve telefon bilgilerini otomatik doldurmasına izin verin.",
          "Form etiketlerini alanın içine (placeholder) değil, üstüne yazın; yazmaya başlayınca kaybolan etiketler kullanıcıyı şaşırtır.",
          "Hata mesajlarını ilgili alanın hemen altında, açık bir dille gösterin.",
          "Giriş alanlarında en az 16 piksel yazı boyutu kullanın; bazı mobil tarayıcılar daha küçük yazılı alanlara odaklanınca sayfayı yakınlaştırır.",
        ],
      },
      {
        type: "code",
        language: "html",
        filename: "contact-form.html",
        code: `<label for="email">E-posta</label>
<input id="email" type="email" autocomplete="email" required>

<label for="phone">Telefon</label>
<input id="phone" type="tel" autocomplete="tel" inputmode="tel">`,
      },
      { type: "h2", text: "5. Kırılma noktalarını cihaza göre değil, içeriğe göre belirleyin" },
      {
        type: "paragraph",
        text: "Belirli telefon veya tablet modellerinin ekran genişliklerine göre kırılma noktası (breakpoint) belirlemek, her yeni cihazla eskiyen bir yaklaşımdır. Bunun yerine tasarımı en küçük ekrandan başlayarak genişletin ve düzenin bozulmaya başladığı noktada kırılma noktası ekleyin.",
      },
      {
        type: "paragraph",
        text: "Mobil öncelikli CSS’te temel stiller küçük ekran için yazılır, daha geniş ekranlar için min-width medya sorgularıyla ek düzenlemeler yapılır.",
      },
      {
        type: "code",
        language: "css",
        filename: "layout.css",
        code: `/* Temel: tek sütun (mobil) */
.services { display: grid; gap: 24px; }

/* İçerik iki sütunu taşıyabildiğinde */
@media (min-width: 700px) {
  .services { grid-template-columns: repeat(2, 1fr); }
}

/* Geniş ekranlarda üç sütun */
@media (min-width: 1100px) {
  .services { grid-template-columns: repeat(3, 1fr); }
}`,
      },
      { type: "h2", text: "6. Görselleri ekrana göre sunun" },
      {
        type: "paragraph",
        text: "Masaüstü için hazırlanmış 2000 piksel genişliğindeki bir görselin telefonda da aynen indirilmesi, mobil kullanıcının zamanını ve veri paketini boşa harcar. srcset ve sizes öznitelikleri tarayıcının ekran boyutuna uygun görseli seçmesini sağlar. Bazı durumlarda mobil için görselin farklı kırpılmış bir versiyonunu sunmak da gerekir; örneğin geniş bir manzara fotoğrafının odak noktası küçük ekranda kaybolabilir.",
      },
      { type: "h2", text: "7. Gerçek cihazlarda test edin" },
      {
        type: "paragraph",
        text: "Tarayıcının geliştirici araçlarındaki cihaz simülasyonu hızlı kontroller için kullanışlıdır, ancak gerçek deneyimi tam olarak yansıtmaz. Dokunma hissi, ekran parlaklığı, yavaş bir mobil bağlantı ve tek elle kullanım ancak gerçek cihazda test edilebilir. Yayına çıkmadan önce siteyi en az bir iOS ve bir Android cihazda baştan sona gezin ve formları gerçekten doldurun.",
      },
      {
        type: "quote",
        text: "Mobil uyumlu olmak, sitenin telefonda açılması değil; telefonda rahatça kullanılabilmesidir.",
      },
      { type: "divider" },
      { type: "h2", text: "Sonuç" },
      {
        type: "paragraph",
        text: "Mobil öncelikli tasarım, küçük ekranı bir kısıtlama olarak değil, odaklanma fırsatı olarak görür. İçeriği önceliklendirmek, dokunma alanlarını büyütmek, formları sadeleştirmek ve gerçek cihazlarda test etmek; yalnızca mobil deneyimi değil, sitenin bütününü iyileştirir.",
      },
      {
        type: "paragraph",
        text: "AKCY olarak web projelerinde tasarımı mobil ekranlardan başlayarak kurguluyor, her kırılma noktasını içerik akışına göre belirliyor ve yayından önce gerçek cihazlarda test ediyoruz.",
      },
    ],
    faq: [
      {
        question: "Mobil öncelikli tasarım nedir?",
        answer:
          "Mobil öncelikli tasarım, bir web sitesinin önce küçük ekranlar için tasarlanması ve ekran büyüdükçe genişletilmesi yaklaşımıdır. İçeriği önceliklendirmeyi ve sade bir deneyim kurmayı kolaylaştırır.",
      },
      {
        question: "Responsive tasarım ile mobil öncelikli tasarım aynı şey mi?",
        answer:
          "Tam olarak değil. Responsive tasarım, sitenin farklı ekran boyutlarına uyum sağlamasıdır. Mobil öncelikli tasarım ise bu uyumu en küçük ekrandan başlayarak kurgulama yöntemidir. Responsive bir site masaüstünden başlanarak da yapılabilir.",
      },
      {
        question: "Mobilde buton boyutu ne kadar olmalı?",
        answer:
          "Apple en az 44×44 punto, Google Material Design en az 48×48 dp dokunma alanı önerir. WCAG 2.2 ise AA seviyesinde en az 24×24 CSS pikseli alt sınır olarak tanımlar.",
      },
      {
        question: "Google mobil sürümü mü dikkate alıyor?",
        answer:
          "Evet. Google siteleri dizine eklerken ve sıralarken ağırlıklı olarak sayfanın mobil sürümünü kullanır. Bu nedenle önemli içeriklerin mobil sürümde de eksiksiz yer alması gerekir.",
      },
    ],
  },
];

// Taslaklar veride durur; yalnızca bu listedeki yazılar yayınlanır.
const PUBLISHED_SLUGS = [
  "web-tipografisi-rehberi",
  "core-web-vitals-rehberi",
  "kurumsal-web-sitesi-yaptirmadan-once",
  "mobil-oncelikli-tasarim-rehberi",
  "yapay-zeka-ile-is-surecleri-otomasyonu",
];

export const blogPosts = editorialDrafts.filter((post) =>
  PUBLISHED_SLUGS.includes(post.slug)
);

export function getAllPosts(): BlogPostMeta[] {
  return blogPosts
    .map((post): BlogPostMeta => {
      const { slug, title, category, date, excerpt, coverImage, readingTime, featured, size } = post;
      return { slug, title, category, date, excerpt, coverImage, readingTime, featured, size };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPostMeta | undefined {
  const featured = blogPosts.find((post) => post.featured);
  return getAllPosts().find(
    (post) => post.slug === (featured ?? blogPosts[0])?.slug
  );
}

export function getRelatedPosts(
  current: BlogPost,
  count = 3
): BlogPostMeta[] {
  const all = getAllPosts().filter((post) => post.slug !== current.slug);

  const sameCategory = all.filter(
    (post) => post.category === current.category
  );
  const rest = all.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, count);
}

export function getAdjacentPost(current: BlogPost): BlogPostMeta | undefined {
  const all = getAllPosts();
  const index = all.findIndex((post) => post.slug === current.slug);

  if (index === -1) return undefined;

  return all.length > 1 ? all[(index + 1) % all.length] : undefined;
}
