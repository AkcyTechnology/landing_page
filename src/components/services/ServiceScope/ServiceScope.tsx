import Container from "@/components/common/Container/Container";
import type { ServiceDef } from "@/data/services";
import styles from "./ServiceScope.module.scss";

const scopes: Record<string, { title: string; items: string[]; note: string; flow?: string[] }> = {
  "web-gelistirme": { title: "Her projede standart", items: ["SEO altyapısı", "Core Web Vitals", "Responsive tasarım", "Erişilebilirlik", "Güvenlik"], note: "Bunları sonradan eklenen özellikler olarak değil, geliştirme sürecinin bir parçası olarak ele alıyoruz." },
  "ui-ux-tasarim": { title: "Tasarım teslimleri", items: ["Kullanıcı akışları", "Tel çerçeve (wireframe)", "Prototip", "Arayüz tasarımı", "Tasarım sistemi", "Geliştiriciye teslim"], note: "Kullanıcı akışından geliştirici teslimine kadar kararları ve bileşen davranışlarını belgeleriz. Seçilmiş projeler bölümünde gerçek arayüzlerimizi inceleyebilirsiniz." },
  "mobil-uygulamalar": { title: "Uygulama türleri", items: ["Tüketici uygulamaları", "Kurum içi uygulamalar", "Pazaryerleri", "SaaS tamamlayıcı uygulamalar", "Saha uygulamaları"], note: "App Store ve Google Play hazırlıklarını, cihaz testlerini ve yayın sürecini proje kapsamıyla birlikte planlarız." },
  "kurumsal-yazilim": { title: "Örnek modüller", items: ["Teklif ve sipariş", "Müşteri ve görüşme takibi", "Servis ve saha işleri", "Stok ve tedarik", "Onay akışları", "Yönetim raporları"], note: "Her şeyi baştan yazmak yerine önce en çok zaman kaybettiren süreçle başlıyor, mevcut CRM, ERP veya muhasebe sistemlerinizle entegre çalışan modüler bir yapı kuruyoruz." },
  "yapay-zeka": { title: "Kullanım alanları", items: ["Doküman analizi", "Kurumsal AI asistanları", "AI iş akışları", "Veri sınıflandırma", "Raporlama", "CRM / ERP entegrasyonları"], note: "Veri erişimini, insan kontrolünü ve çıktı doğrulamasını baştan tasarlarız. Önce sınırlı bir pilotla ihtiyacı doğrular, ardından kapsamı genişletiriz." },
  "dijital-otomasyon": { title: "Talebi çalışan bir sürece dönüştürün.", items: [], flow: ["Form", "CRM", "Teklif", "E-posta", "Dashboard"], note: "Örnek akış: form talebi CRM kaydına dönüşür, onaylanan teklif e-posta ile iletilir ve durum panelden izlenir. Her adımda hata ve tekrar denemeleri izlenebilir." },
  "ai-icerik-uretimi": { title: "Üründen yayınlanabilir içeriğe.", items: ["Önce: orijinal ürün ve marka brief'i", "Süreç: üretim, seçki ve insan kontrolü", "Çıktı: kanala uygun görsel ve metin"], flow: ["Orijinal ürün", "AI kampanya", "Sosyal medya", "E-ticaret"], note: "Örnek üretim akışı. Ürünün gerçek özelliklerini ve marka tutarlılığını koruyarak farklı kanallar için içerik hazırlarız." },
};

export default function ServiceScope({ service }: { service: ServiceDef }) {
  const scope = scopes[service.slug];
  if (!scope) return null;
  return <section className={styles.section}><Container>
    <h2>{scope.title}</h2>
    {scope.items.length > 0 && <ul className={styles.grid}>{scope.items.map(item => <li key={item}>{item}</li>)}</ul>}
    {scope.flow && <ol className={styles.flow}>{scope.flow.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}{i < scope.flow!.length - 1 && <b aria-hidden="true">→</b>}</li>)}</ol>}
    <p>{scope.note}</p>
  </Container></section>;
}
