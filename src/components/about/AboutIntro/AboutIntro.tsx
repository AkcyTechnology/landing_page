"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

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
    offset: ["start 0.9", "end 0.45"],
  });

  const words = content.statement.split(" ");

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <Container>
        <div className={styles.columns}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2 id={`${id}-title`} className={styles.title}>
              {content.title}
            </h2>
          </div>
          <p className={styles.body}>{content.body}</p>
        </div>

        {/* Yalnızca bu büyük vurgu cümlesinde kelimeler kaydırmayla koyulaşır */}
        <p ref={statementRef} className={styles.statement}>
          {/* Hareket azaltma tercihinde renk CSS ile sabitlenir (sunucu ve istemci aynı HTML'i üretir) */}
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
      </Container>
    </section>
  );
}
