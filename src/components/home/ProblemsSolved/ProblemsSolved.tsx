"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/i18n/Link";
import { useT } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n/dictionaries";
import Container from "@/components/common/Container/Container";
import styles from "./ProblemsSolved.module.scss";

type VisualKind = "web" | "mobile" | "ai" | "software" | "integration" | "analytics";

/* Metinler sözlükte (home.problems.solutions); görsel ve bağlantılar burada */
const solutionMeta: { visual: VisualKind; href: string }[] = [
  { visual: "web", href: "/hizmetler/web-gelistirme" },
  { visual: "mobile", href: "/hizmetler/mobil-uygulamalar" },
  { visual: "ai", href: "/hizmetler/yapay-zeka" },
  { visual: "software", href: "/hizmetler/kurumsal-yazilim" },
  { visual: "integration", href: "/hizmetler/dijital-otomasyon" },
  { visual: "analytics", href: "/hizmetler/dijital-otomasyon" },
];

type ProblemsCopy = Dictionary["home"]["problems"];

function useSolutions() {
  const t = useT().home.problems;
  return t.solutions.map((solution, index) => ({ ...solution, ...solutionMeta[index] }));
}

/* Her çözüm için kodla çizilmiş, stok fotoğraf yerine geçen mini arayüz */
function Visual({ kind, t }: { kind: VisualKind; t: ProblemsCopy["visuals"] }) {
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
          {t.flow.map((step, index) => (
            <li key={step} style={{ animationDelay: `${index * 0.6}s` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>{step}
            </li>
          ))}
        </ol>
      );
    case "software":
      return (
        <div className={styles.vTable}>
          {t.table.map(([name, status], index) => (
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
          {t.hub.map((node, index) => (
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
  const t = useT().home.problems;
  const solution = useSolutions()[index];
  return (
    <div className={styles.panel}>
      <div className={styles.visual} aria-hidden="true">
        <Visual kind={solution.visual} t={t.visuals} />
      </div>
      <div className={styles.panelBody}>
        <span className={styles.category}>{solution.category}</span>
        <h3>{solution.title}</h3>
        <p>{solution.description}</p>
        <ul className={styles.tags} aria-label={t.tagsLabel}>
          {solution.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <Link className={styles.link} href={solution.href} data-magnetic>
          {t.cta} <b aria-hidden="true">↗</b>
        </Link>
      </div>
    </div>
  );
}

export default function ProblemsSolved() {
  const t = useT().home.problems;
  const solutions = useSolutions();
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
            <span className={styles.label}>{t.label}</span>
            <h2 className={styles.heading} id="solutions-heading">{t.headingStart}<br /><span>{t.headingAccent}</span></h2>
          </div>
          <p className={styles.intro}>{t.intro}</p>
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
