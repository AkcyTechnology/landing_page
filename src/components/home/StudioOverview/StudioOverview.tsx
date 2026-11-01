import Link from "next/link";
import Container from "@/components/common/Container/Container";
import styles from "./StudioOverview.module.scss";

const steps = [
  { number: "01", title: "Keşif", description: "İş hedeflerini, kullanıcıları ve mevcut süreci birlikte anlarız.", outcome: "Hedefler & yol haritası", caption: "DOĞRU SORULAR" },
  { number: "02", title: "Tasarım", description: "Akışları ve prototipleri somutlaştırır, geri bildirimle geliştiririz.", outcome: "Akışlar & prototip", caption: "SOMUT BİR DENEYİM" },
  { number: "03", title: "Geliştirme", description: "Tasarımı çalışan ürüne dönüştürür, küçük adımlarla paylaşırız.", outcome: "Çalışan ürün & entegrasyon", caption: "ÇALIŞAN SİSTEMLER" },
  { number: "04", title: "Yayın", description: "Senaryoları test eder, yayına geçişi ve sonraki adımları planlarız.", outcome: "Test & yayına geçiş", caption: "SAĞLAM BİR BAŞLANGIÇ" },
];

export function WorkProcess() {
  return <section className={styles.process} id="calisma-sureci" aria-labelledby="process-heading"><Container>
    <div className={styles.processHeader}>
      <div><span className={styles.label}>04 / NASIL ÇALIŞIYORUZ</span><h2 id="process-heading">Her adımda<br /><span>netlik.</span></h2></div>
      <p>Birlikte düşünür, birlikte geliştiririz.<br />İlk sorudan yayına kadar, neyi neden yaptığımız nettir.</p>
      <span className={styles.processStamp}>FİKİRDEN<br />ÇALIŞAN ÜRÜNE <b aria-hidden="true">↘</b></span>
    </div>
    <ol className={styles.roadmap}>{steps.map(step => <li key={step.number} className={styles.step}>
      <div className={styles.stepTop}><span className={styles.stepNumber}>{step.number}</span><span className={styles.stepNode} aria-hidden="true" /></div>
      <span className={styles.stepCaption}>{step.caption}</span>
      <h3>{step.title}</h3><p>{step.description}</p>
      <div className={styles.outcome}><span>ÇIKTI</span>{step.outcome}</div>
    </li>)}</ol>
    <div className={styles.processFootnote}><span className={styles.statusDot} aria-hidden="true" />Her aşamada iletişim. Her kararda ortak hedef.<span className={styles.processFootnoteEnd}>01 → 04 / UÇTAN UCA</span></div>
  </Container></section>;
}

export function CapabilitiesOverview() {
  const skills = ["Web & API", "Mobil", "UI/UX", "Yapay zekâ", "Otomasyon", "Tasarım sistemleri"];
  return <section className={styles.capabilities} id="yetkinlikler" aria-labelledby="capabilities-heading"><Container>
    <div className={styles.capabilityHeader}>
      <span className={styles.label}>05 / YETKİNLİKLER</span>
      <span className={styles.sideNote}>BİRBİRİNİ TAMAMLAYAN YETKİNLİKLER</span>
    </div>
    <div className={styles.capabilityLayout}>
      <div className={styles.capabilityIntro}><h2 id="capabilities-heading">İhtiyaca göre<br /><span>teknoloji.</span><br />Birlikte çalışan<br />bir ekip.</h2>
        <div className={styles.signature} aria-hidden="true"><span>AKCY</span><span>TASARIM + YAZILIM + YAPAY ZEKÂ</span></div>
      </div>
      <div className={styles.capabilityBody}>
        <div className={styles.approaches}>
          <div><span className={styles.approachIndex}>01 / İNSAN</span><h3>Ekip yaklaşımımız</h3><p>Tasarım ve geliştirmeyi ortak hedef etrafında buluşturuyoruz. Kararları birlikte alıyor, ilerlemeyi düzenli paylaşıyor ve geri bildiriminizi sürece dahil ediyoruz.</p></div>
          <div><span className={styles.approachIndex}>02 / TEKNOLOJİ</span><h3>Teknoloji yaklaşımımız</h3><p>Araçları popülerliğine göre değil; ürünün ihtiyacı, bakım kolaylığı, veri güvenliği ve büyüme planına göre seçiyoruz. Web, mobil, API entegrasyonları ve otomasyon aynı ürünün parçaları olarak ele alınır.</p></div>
        </div>
        <ul className={styles.skills}>{skills.map((skill,index) => <li key={skill}><span>{String(index+1).padStart(2,"0")}</span>{skill}</li>)}</ul>
      </div>
    </div>
    <div className={styles.sectors}>
      <div><h3>Çalıştığımız Alanlar</h3><p>Farklı sektörler.<br />Aynı özen.</p></div>
      <ul>{["Kurumsal", "Endüstri", "E-ticaret", "SaaS", "Teknoloji", "Dijital Ürünler"].map(item=><li key={item}>{item}</li>)}</ul>
      <Link className={styles.link} href="/hakkimizda">AKCY’yi tanıyın <span aria-hidden="true">↗</span></Link>
    </div>
  </Container></section>;
}
