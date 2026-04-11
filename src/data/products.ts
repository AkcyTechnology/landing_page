type AccentColor = "purple" | "pink" | "green";

interface Product {
  id: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  accentColor: AccentColor;
  reverse: boolean;
}

export const products: Product[] = [
  {
    id: "calmdo",
    title: "CalmDo",
    tag: "AI Todo App",
    description:
      "CalmDo, günlük planlama sürecini daha sade, odaklı ve sürdürülebilir hale getiren yapay zekâ destekli mobil yapılacaklar uygulamasıdır. Kullanıcının önceliklerini analiz eder, görevleri anlamlı bir akışa dönüştürür ve yoğunluk anlarında karar yükünü azaltır.",
    features: [
      "Yapay zekâ destekli görev önceliklendirme ve gün planı oluşturma",
      "Kişisel odak seviyesine göre önerilen çalışma blokları",
      "Erteleme eğilimini azaltan akıllı hatırlatma ve yönlendirmeler",
      "Minimal ve sakin deneyim sunan mobil odaklı kullanıcı arayüzü",
    ],
    accentColor: "purple",
    reverse: false,
  },
  {
    id: "seyahat",
    title: "AI Destekli Seyahat ve Liste Uygulaması",
    tag: "Travel Planner",
    description:
      "Bu ürün, seyahat planlama sürecini tek bir akışta birleştirir. Kullanıcıya rota, hazırlık ve yapılacaklar listesi yönetimini aynı deneyim içinde sunarken yapay zekâ desteğiyle daha doğru, daha hızlı ve daha kişisel öneriler üretir.",
    features: [
      "Seyahat amacına ve süreye göre akıllı plan önerileri",
      "Valiz, belge, görev ve rezervasyon takibi için entegre listeler",
      "Lokasyon bazlı içerik, gezi akışı ve hazırlık kontrol noktaları",
      "Dağınık planları tek ekranda toplayan kullanıcı dostu deneyim",
    ],
    accentColor: "pink",
    reverse: true,
  },
  {
    id: "erisilebilirlik",
    title: "Erişilebilirlik Entegrasyonu",
    tag: "Inclusive Tech",
    description:
      "Erişilebilirlik Entegrasyonu, dijital ürünlerin engelli bireyler tarafından daha rahat, güvenli ve bağımsız kullanılabilmesi için geliştirilen kapsamlı bir çözüm setidir. Mevcut sistemlere entegre edilerek erişilebilirlik standartlarını güçlendirir ve kapsayıcı deneyim tasarımını destekler.",
    features: [
      "Ekran okuyucu, klavye navigasyonu ve odak yönetimi uyumluluğu",
      "Renk kontrastı, tipografi ve etkileşim alanları için erişilebilir arayüz iyileştirmeleri",
      "WCAG odaklı denetim, raporlama ve geliştirme önerileri",
      "Engelli bireylerin dijital hizmetlere daha eşit erişimi için sürdürülebilir entegrasyon yaklaşımı",
    ],
    accentColor: "green",
    reverse: false,
  },
];