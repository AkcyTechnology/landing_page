"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/common/Container/Container";
import styles from "./ProblemsSolved.module.scss";

type VisualKind = "web" | "mobile" | "ai" | "software" | "integration" | "analytics";

const solutions: {
  problem: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  visual: VisualKind;
  href: string;
}[] = [
  {
    problem: "Web siteniz sadece bir vitrin mi?",
    category: "WEB VE DİJİTAL ÜRÜNLER",
    title: "Kurumsal Web Siteleri ve Web Platformları",
    description: "Markanızın yalnızca dijital vitrini değil, satış, iletişim ve operasyon süreçlerine hizmet eden yüksek performanslı web deneyimleri tasarlıyor ve geliştiriyoruz.",
    tags: ["Kurumsal Web Sitesi", "Web Uygulaması", "E-Ticaret", "Yönetim Paneli"],
    visual: "web",
    href: "/hizmetler/web-gelistirme",
  },
  {
    problem: "Müşterileriniz size cebinden ulaşamıyor mu?",
    category: "MOBİL GELİŞTİRME",
    title: "iOS ve Android Mobil Uygulamalar",
    description: "Fikir aşamasından App Store ve Google Play yayınına kadar kullanıcı odaklı, hızlı ve ölçeklenebilir mobil ürünler geliştiriyoruz.",
    tags: ["iOS", "Android", "Çapraz Platform", "API Entegrasyonu"],
    visual: "mobile",
    href: "/hizmetler/mobil-uygulamalar",
  },
  {
    problem: "Ekibiniz aynı işi her gün elle mi yapıyor?",
    category: "YAPAY ZEKÂ VE OTOMASYON",
    title: "Yapay Zekâ ve İş Süreci Otomasyonu",
    description: "Tekrarlayan operasyonları yapay zekâ ve otomasyonla dönüştürerek ekiplerin manuel iş yükünü azaltıyor, süreçleri daha hızlı ve ölçülebilir hale getiriyoruz.",
    tags: ["AI Asistanları", "İş Akışı Otomasyonu", "Doküman Analizi", "Üretken Yapay Zekâ"],
    visual: "ai",
    href: "/hizmetler/yapay-zeka",
  },
  {
    problem: "Hazır yazılımlar iş akışınıza uymuyor mu?",
    category: "KURUMSAL YAZILIM",
    title: "Kuruma Özel Yazılım Çözümleri",
    description: "Hazır yazılımların karşılamadığı iş süreçlerini, şirketinize özel geliştirilen merkezi ve sürdürülebilir yazılım sistemleriyle çözüyoruz.",
    tags: ["CRM", "ERP Modülleri", "Teklif Sistemleri", "Operasyon Yönetimi"],
    visual: "software",
    href: "/hizmetler/kurumsal-yazilim",
  },
  {
    problem: "Sistemleriniz birbiriyle konuşmuyor mu?",
    category: "SİSTEM ENTEGRASYONU",
    title: "Sistem ve API Entegrasyonları",
    description: "Birbirinden bağımsız çalışan yazılımları ve veri kaynaklarını entegre ederek tek merkezden yönetilebilen dijital bir ekosistem oluşturuyoruz.",
    tags: ["API", "CRM / ERP", "Ödeme Sistemleri", "Harici Servisler"],
    visual: "integration",
    href: "/hizmetler/dijital-otomasyon",
  },
  {
    problem: "Veriniz var ama karar vermek hâlâ zor mu?",
    category: "VERİ VE ANALİTİK",
    title: "Dashboard, Raporlama ve Veri Analitiği",
    description: "Dağınık verileri anlaşılır dashboard ve raporlara dönüştürerek yöneticilerin operasyonları gerçek zamanlı takip etmesini sağlıyoruz.",
    tags: ["Yönetim Paneli", "KPI Takibi", "Otomatik Raporlar", "Veri Görselleştirme"],
    visual: "analytics",
    href: "/hizmetler/dijital-otomasyon",
  },
];

/* Her çözüm için kodla çizilmiş, stok fotoğraf yerine geçen mini arayüz */
function Visual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "web":
      return (
        <div className={styles.vWeb}>
          <div className={styles.vBar}><i /><i /><i /><span /></div>
          <div className={styles.vWebBody}>
            <div className={styles.vWebHero}><b /><b /><em /></div>
            <div className={styles.vWebCards}><span /><span /><span /></div>
          </div>
        </div>
      );
    case "mobile":
      return (
        <div className={styles.vMobile}>
          <div className={styles.vPhone}>
            <i className={styles.vNotch} />
            <b className={styles.vMobileHero} />
            <span /><span /><span />
            <em />
          </div>
        </div>
      );
    case "ai":
      return (
        <ol className={styles.vFlow}>
          {["Doküman", "AI analiz", "İnsan kontrolü", "Çıktı"].map((step, index) => (
            <li key={step} style={{ animationDelay: `${index * 0.6}s` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>{step}
            </li>
          ))}
        </ol>
      );
    case "software":
      return (
        <div className={styles.vTable}>
          {[["Teklif #1042", "Onaylandı"], ["Sipariş #2231", "Hazırlanıyor"], ["Servis #0318", "Atandı"], ["Teklif #1043", "Bekliyor"]].map(([name, status], index) => (
            <div key={name} style={{ animationDelay: `${index * 0.12}s` }}>
              <span>{name}</span><b data-status={index}>{status}</b>
            </div>
          ))}
        </div>
      );
    case "integration":
      return (
        <div className={styles.vHub}>
          <svg viewBox="0 0 400 260" aria-hidden="true">
            {[[70, 50], [330, 50], [40, 160], [360, 160], [200, 235]].map(([x, y]) => (
              <line key={`${x}-${y}`} x1="200" y1="125" x2={x} y2={y} />
            ))}
          </svg>
          <span className={styles.vHubCenter}>AKCY</span>
          {["CRM", "ERP", "E-ticaret", "Ödeme", "Muhasebe"].map((node, index) => (
            <span key={node} className={styles.vHubNode} data-node={index}>{node}</span>
          ))}
        </div>
      );
    case "analytics":
      return (
        <div className={styles.vChart}>
          <div className={styles.vBars}>
            {[38, 52, 46, 64, 58, 76, 88].map((height, index) => (
              <i key={index} style={{ height: `${height}%`, animationDelay: `${index * 0.07}s` }} />
            ))}
          </div>
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80 L50 66 L100 72 L150 48 L200 54 L250 30 L300 18" />
          </svg>
        </div>
      );
  }
}

function Panel({ index }: { index: number }) {
  const solution = solutions[index];
  return (
    <div className={styles.panel}>
      <div className={styles.visual} aria-hidden="true">
        <Visual kind={solution.visual} />
      </div>
      <div className={styles.panelBody}>
        <span className={styles.category}>{solution.category}</span>
        <h3>{solution.title}</h3>
        <p>{solution.description}</p>
        <ul className={styles.tags} aria-label="Yetkinlikler">
          {solution.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <Link className={styles.link} href={solution.href} data-magnetic>
          Çözümü İncele <b aria-hidden="true">↗</b>
        </Link>
      </div>
    </div>
  );
}

export default function ProblemsSolved() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Otomatik ilerleme yalnızca bölüm ekrandayken çalışır */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${inView ? styles.playing : ""}`}
      id="cozumler"
      aria-labelledby="solutions-heading"
    >
      <Container>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>03 / ÇÖZÜMLERİMİZ</span>
            <h2 className={styles.heading} id="solutions-heading">Dijital problemlere<br /><span>çalışan çözümler.</span></h2>
          </div>
          <p className={styles.intro}>Web platformlarından mobil uygulamalara, yapay zekâ otomasyonlarından kurumsal entegrasyonlara kadar işletmelerin dijital süreçlerini uçtan uca tasarlıyor, geliştiriyor ve ölçekliyoruz.</p>
        </div>

        <div className={styles.layout}>
          <ol className={styles.problems}>
            {solutions.map((solution, index) => {
              const isActive = index === active;
              return (
                <li key={solution.visual} className={isActive ? styles.problemActive : undefined}>
                  <button
                    type="button"
                    className={styles.problemButton}
                    aria-expanded={isActive}
                    onClick={() => setActive(index)}
                  >
                    <span className={styles.problemNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.problemText}>
                      {solution.problem}
                      <small>{solution.title}</small>
                    </span>
                    <span className={styles.problemArrow} aria-hidden="true">→</span>
                  </button>
                  {isActive && (
                    <span
                      className={styles.progress}
                      aria-hidden="true"
                      onAnimationEnd={() => setActive((current) => (current + 1) % solutions.length)}
                    />
                  )}
                  {/* Mobilde panel seçilen sorunun altında açılır */}
                  {isActive && <div className={styles.mobilePanel}><Panel index={index} /></div>}
                </li>
              );
            })}
          </ol>

          <div className={styles.desktopPanel} aria-live="polite">
            <Panel key={active} index={active} />
          </div>
        </div>
      </Container>
    </section>
  );
}
