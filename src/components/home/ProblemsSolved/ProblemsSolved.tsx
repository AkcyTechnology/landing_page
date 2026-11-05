"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/i18n/Link";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { serviceHref } from "@/data/navigation";
import Container from "@/components/common/Container/Container";
import styles from "./ProblemsSolved.module.scss";

/* Metinler sözlükte (home.problems.solutions); görsel ve bağlantılar burada.
   Görseller Unsplash: public/images/solutions/SOURCES.md */
const solutionMeta: { image: string; slug: string }[] = [
  { image: "/images/solutions/web.jpg", slug: "web-gelistirme" },
  { image: "/images/solutions/mobile.jpg", slug: "mobil-uygulamalar" },
  { image: "/images/solutions/automation.jpg", slug: "yapay-zeka" },
  { image: "/images/solutions/business.jpg", slug: "kurumsal-yazilim" },
  { image: "/images/solutions/integration.jpg", slug: "dijital-otomasyon" },
  { image: "/images/solutions/analytics.jpg", slug: "dijital-otomasyon" },
];

/*
  Çözümler: fotoğraflı, yan yana dizilmiş paneller. Seçili panel genişleyip
  sorunu ve çözümü anlatır; diğerleri numara ve dikey yazılmış soruyla dar
  kalır. Mobilde paneller alt alta dizilir, seçili olan açılır.
*/
export default function ProblemsSolved() {
  const t = useT().home.problems;
  const locale = useLocale();
  const solutions = t.solutions.map((solution, index) => ({ ...solution, ...solutionMeta[index] }));
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 901px)").matches;

  return (
    <section ref={sectionRef} className={styles.section} id="cozumler" aria-labelledby="solutions-heading">
      <Container>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>{t.label}</span>
            <h2 className={styles.heading} id="solutions-heading">
              {t.headingStart}
              <br />
              <span>{t.headingAccent}</span>
            </h2>
          </div>
          <p className={styles.intro}>{t.intro}</p>
        </div>

        <div
          className={`${styles.panels} ${inView && !paused ? styles.playing : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
          }}
        >
          {solutions.map((solution, index) => {
            const isActive = index === active;
            const number = String(index + 1).padStart(2, "0");
            const bodyId = `cozum-${index + 1}`;
            return (
              <article
                key={solution.title}
                className={`${styles.panel} ${isActive ? styles.panelActive : ""}`}
                onMouseEnter={() => canHover() && setActive(index)}
              >
                <Image src={solution.image} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" className={styles.photo} />
                <span className={styles.shade} aria-hidden="true" />

                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={isActive}
                  aria-controls={bodyId}
                  onClick={() => setActive(index)}
                >
                  <span className={styles.number}>{number}</span>
                  <span className={styles.question}>{solution.problem}</span>
                </button>

                <div id={bodyId} className={styles.body} aria-hidden={!isActive} inert={!isActive}>
                  <p className={styles.ask} aria-hidden="true">{solution.problem}</p>
                  <span className={styles.category}>{solution.category}</span>
                  <h3 className={styles.title}>{solution.title}</h3>
                  <p className={styles.text}>{solution.description}</p>
                  <ul className={styles.tags} aria-label={t.tagsLabel}>
                    {solution.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <Link className={styles.link} href={serviceHref(solution.slug, locale)}>
                    {t.cta} <b aria-hidden="true">↗</b>
                  </Link>
                </div>

                {/* Süre çizgisi dolunca sonraki panele geçilir; fare üzerindeyken ya da odak içerideyken durur */}
                {isActive && (
                  <span
                    className={styles.progress}
                    aria-hidden="true"
                    onAnimationEnd={() => setActive((current) => (current + 1) % solutions.length)}
                  />
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
