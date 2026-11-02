"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import styles from "./AboutProcess.module.scss";

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
                  <span className={styles.number}>{step.number} /</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.description}</p>
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
