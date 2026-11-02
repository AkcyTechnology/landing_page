"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import ProcessIllustration from "./ProcessIllustration";
import styles from "./AboutIntro.module.scss";

interface AboutIntroProps {
  id: string;
  content: AboutContent["intro"];
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, ["#c9cdd0", "#1d2226"]);
  return <motion.span style={{ color }}>{children} </motion.span>;
}

export default function AboutIntro({ id, content }: AboutIntroProps) {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.9", "end 0.5"],
  });

  const words = content.statement.split(" ");

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Container>
        <div className={styles.columns}>
          <div className={styles.text}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2 id={`${id}-title`} className={styles.title}>
              {content.title}
            </h2>
            <p className={styles.body}>{content.body}</p>

            {/* Yalnızca bu vurgu cümlesinde kelimeler kaydırmayla koyulaşır;
                hareket azaltma tercihinde renk CSS ile sabitlenir */}
            <p ref={statementRef} className={styles.statement}>
              {words.map((word, index) => (
                <Word
                  key={`${word}-${index}`}
                  progress={scrollYProgress}
                  range={[index / words.length, (index + 1) / words.length]}
                >
                  {word}
                </Word>
              ))}
            </p>
          </div>

          <div className={styles.illustration}>
            <ProcessIllustration label={content.illustrationLabel} steps={content.illustrationSteps} />
          </div>
        </div>
      </Container>
    </section>
  );
}
