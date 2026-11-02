"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import styles from "./AboutProcess.module.scss";

/* Adımlara eşlik eden sade çizgisel görseller: anlama, tasarlama, geliştirme, birlikte ilerleme */
const iconProps = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STEP_ICONS = [
  <svg key="understand" {...iconProps}><rect x="5" y="4" width="16" height="21" rx="1.5" /><path d="M9 10h8M9 14h6M9 18h4" /><circle cx="21.5" cy="20.5" r="4.5" /><path d="m25 24 3.5 3.5" /></svg>,
  <svg key="design" {...iconProps}><rect x="4" y="6" width="24" height="18" rx="1.5" /><path d="M4 11h24" /><rect x="8" y="14" width="7" height="6" rx="1" /><path d="M18 15h6M18 18h4" /></svg>,
  <svg key="build" {...iconProps}><path d="m11 10-6 6 6 6M21 10l6 6-6 6M18 7l-4 18" /></svg>,
  <svg key="together" {...iconProps}><path d="M7 13a9 9 0 0 1 16-4M25 19a9 9 0 0 1-16 4" /><path d="M23 4v5h-5M9 28v-5h5" /></svg>,
];

export default function AboutProcess({ content }: { content: AboutContent["process"] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  /* Kaydırma kilitlenmez; liste ekranın ortasından geçerken aşamalar sırayla vurgulanır */
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const count = content.steps.length;
    setActive(Math.min(count - 1, Math.max(0, Math.floor(value * count))));
  });

  return (
    <section className={styles.section} aria-labelledby="about-process-title">
      <Container>
        <div className={styles.layout}>
          <div className={styles.aside}>
            <div className={styles.sticky}>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h2 id="about-process-title" className={styles.title}>
                {content.title}
              </h2>
              <p className={styles.description}>{content.description}</p>
            </div>
          </div>

          <div ref={listRef} className={styles.steps}>
            <span className={styles.track} aria-hidden="true">
              <motion.span
                className={styles.progress}
                style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
              />
            </span>

            <ol className={styles.stepList}>
            {content.steps.map((step, index) => {
              const isActive = reduceMotion || index <= active;
              return (
                <li
                  key={step.number}
                  className={`${styles.step} ${isActive ? styles.stepActive : ""}`}
                  aria-current={!reduceMotion && index === active ? "step" : undefined}
                >
                  <span className={styles.marker} aria-hidden="true" />
                  <div className={styles.stepBody}>
                    <div>
                      <span className={styles.number}>{step.number} /</span>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepText}>{step.description}</p>
                    </div>
                    <span className={styles.stepIcon} aria-hidden="true">
                      {STEP_ICONS[index % STEP_ICONS.length]}
                    </span>
                  </div>
                </li>
              );
            })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
