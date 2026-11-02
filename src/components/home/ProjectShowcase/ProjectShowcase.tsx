"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "@/i18n/Link";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { motion } from "motion/react";

import { getClientProjects } from "@/data/projects";
import Container from "@/components/common/Container/Container";
import SectionLabel from "@/components/common/SectionLabel/SectionLabel";
import ArrowLink from "@/components/common/ArrowLink/ArrowLink";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import styles from "./ProjectShowcase.module.scss";

export default function ProjectShowcase() {
  const locale = useLocale();
  const t = useT().home.showcase;
  const projects = getClientProjects(locale);
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);

      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 701px)",
        () => {
          panels.forEach((panel) => {
            const q = gsap.utils.selector(panel);
            const stage = q(`.${styles.stage}`)[0];
            const imageWrap = q(`.${styles.imageWrap}`)[0];

            if (!stage || !imageWrap) return;

            /* Başlangıç: görsel ekranın ortasında yuvarlak köşeli bir kart */
            gsap.set(imageWrap, {
              clipPath: "inset(9% 13% round 28px)",
            });
            gsap.set(q(`.${styles.imageInner}`), { scale: 1.18 });
            gsap.set(q(`.${styles.veil}`), { opacity: 0.15 });
            gsap.set(q(`.${styles.word}`), { yPercent: 110 });
            gsap.set(q(`.${styles.eyebrowLine}`), { scaleX: 0 });
            gsap.set(q(`[data-reveal]`), { opacity: 0, y: 24 });
            gsap.set(q(`.${styles.counter}`), { opacity: 0, x: 30 });
            gsap.set(q(`.${styles.progress} i`), { scaleX: 0 });

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: panel,
                start: "top top",
                end: "+=170%",
                scrub: 1,
                pin: stage,
                anticipatePin: 1,
              },
            });

            tl
              /* 1. Kart tam ekrana açılır, fotoğraf yavaşça uzaklaşır */
              .to(imageWrap, { clipPath: "inset(0% 0% round 0px)", duration: 0.5 }, 0)
              .to(q(`.${styles.imageInner}`), { scale: 1, duration: 0.6 }, 0)
              .to(q(`.${styles.hostChip}`), { opacity: 0, y: -12, duration: 0.2 }, 0.05)
              /* 2. Perde iner */
              .to(q(`.${styles.veil}`), { opacity: 1, duration: 0.3 }, 0.25)
              /* 3. Metin kademeli olarak gelir */
              .to(q(`.${styles.eyebrowLine}`), { scaleX: 1, duration: 0.12, ease: "power2.out" }, 0.45)
              .to(q(`[data-reveal="eyebrow"]`), { opacity: 1, y: 0, duration: 0.12 }, 0.47)
              .to(q(`.${styles.word}`), { yPercent: 0, duration: 0.16, stagger: 0.035, ease: "power3.out" }, 0.5)
              .to(q(`[data-reveal="text"]`), { opacity: 1, y: 0, duration: 0.14 }, 0.62)
              .to(q(`[data-reveal="meta"]`), { opacity: 1, y: 0, duration: 0.12, stagger: 0.04 }, 0.68)
              .to(q(`[data-reveal="cta"]`), { opacity: 1, y: 0, duration: 0.12 }, 0.78)
              .to(q(`.${styles.counter}`), { opacity: 1, x: 0, duration: 0.18, ease: "power2.out" }, 0.55)
              /* İlerleme çizgisi tüm sahne boyunca dolar */
              .to(q(`.${styles.progress} i`), { scaleX: 1, duration: 1 }, 0);
          });
        }
      );

      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 700px)",
        () => {
          panels.forEach((panel) => {
            const textReveal = panel.querySelector<HTMLElement>(
              `.${styles.textReveal}`
            );
            if (!textReveal) return;

            gsap.from(textReveal, {
              opacity: 0,
              y: 16,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top 70%",
                end: "top 30%",
                scrub: 1,
              },
            });
          });
        }
      );

      return () => mm.revert();
    }, wrapper);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && wrapper.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, [projects.length]);

  return (
    <section
      className={styles.showcase}
      ref={wrapperRef}
      aria-labelledby="showcase-heading"
      id="secili-projeler"
    >
      <Container>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.25, 1] }}
        >
          <div>
            <SectionLabel>{t.label}</SectionLabel>
            <h2 className={styles.heading} id="showcase-heading">
              {t.heading}
            </h2>
          </div>

          <ArrowLink href="/projelerimiz">{t.allProjects}</ArrowLink>
        </motion.div>
      </Container>

      {projects.map((project, index) => {
        const number = String(index + 1).padStart(2, "0");
        const host = project.liveUrl
          ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
          : undefined;

        return (
          <div className={styles.panel} key={project.slug}>
            <div className={styles.stage}>
              <Link
                href={`/projelerimiz/${project.slug}`}
                className={styles.imageWrap}
                aria-label={`${project.title} — ${t.detailsLabel}`}
              >
                <div className={styles.imageInner}>
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="100vw"
                    quality={78}
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    className={styles.image}
                  />
                </div>
                <div className={styles.veil} aria-hidden="true" />
                {host && (
                  <span className={styles.hostChip} aria-hidden="true">
                    <i />
                    {host}
                  </span>
                )}
              </Link>

              <div className={styles.textReveal}>
                <div className={styles.textRevealInner}>
                  <div className={styles.copy}>
                    <span className={styles.eyebrow} data-reveal="eyebrow">
                      <span className={styles.eyebrowLine} aria-hidden="true" />
                      {number} — {project.year}
                    </span>

                    <h3 aria-label={project.title}>
                      {project.title.split(" ").map((word, wordIndex) => (
                        <span className={styles.mask} key={`${word}-${wordIndex}`} aria-hidden="true">
                          <span className={styles.word}>{word}</span>
                        </span>
                      ))}
                    </h3>

                    <p data-reveal="text">{project.tagline ?? project.summary}</p>

                    <dl className={styles.meta}>
                      <div data-reveal="meta"><dt>{t.sector}</dt><dd>{project.sector}</dd></div>
                      <div data-reveal="meta"><dt>{t.platform}</dt><dd>{project.platform}</dd></div>
                      <div data-reveal="meta"><dt>{t.year}</dt><dd>{project.year}</dd></div>
                    </dl>

                    <Link
                      href={`/projelerimiz/${project.slug}`}
                      className={styles.cta}
                      data-magnetic
                      data-reveal="cta"
                    >
                      {t.cta} <b aria-hidden="true">↗</b>
                    </Link>
                  </div>

                  <div className={styles.counter} aria-hidden="true">
                    <strong>{number}</strong>
                    <span>/ {String(projects.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>

              <div className={styles.progress} aria-hidden="true"><i /></div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
