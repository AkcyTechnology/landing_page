"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import styles from "./AboutHero.module.scss";

interface AboutHeroProps {
  content: AboutContent["hero"];
  nextSectionId: string;
}

/* Etiketlerin metin kutusu içindeki konumları (yüzde) ve fareye tepki derinliği */
const FLOW_POSITIONS = [
  { x: 6, y: 10, depth: 6 },
  { x: 38, y: 44, depth: 10 },
  { x: 14, y: 80, depth: 14 },
];

export default function AboutHero({ content, nextSectionId }: AboutHeroProps) {
  const flowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  /* Çizgi, alan görünür olduğunda çizilir */
  useEffect(() => {
    const node = flowRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Fare hareketine çok hafif tepki (yalnızca fareli cihazlar, hareket azaltma kapalı) */
  useEffect(() => {
    const node = flowRef.current;
    if (!node) return;
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--mx", Math.max(-0.5, Math.min(0.5, x)).toFixed(3));
        node.style.setProperty("--my", Math.max(-0.5, Math.min(0.5, y)).toFixed(3));
      });
    };
    const onLeave = () => {
      node.style.setProperty("--mx", "0");
      node.style.setProperty("--my", "0");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>

            <h1 className={styles.heading}>
              {content.titleLines.map((line, index) => (
                <span key={line} className={styles.line} style={{ animationDelay: `${index * 90}ms` }}>
                  {line}{" "}
                </span>
              ))}
            </h1>

            <p className={styles.description}>{content.description}</p>

            <div className={styles.actions}>
              <Link href="/iletisim" className={styles.primary}>
                {content.primaryCta}
                <span aria-hidden="true">→</span>
              </Link>
              <a href={`#${nextSectionId}`} className={styles.secondary}>
                {content.secondaryCta}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div
            ref={flowRef}
            className={`${styles.flow} ${visible ? styles.flowVisible : ""}`}
            role="img"
            aria-label={content.flowLabel}
          >
            <svg className={styles.flowLine} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 22 18 C 46 18, 58 30, 58 46 S 44 72, 30 86"
                pathLength={1}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {content.flow.map((word, index) => {
              const position = FLOW_POSITIONS[index];
              return (
                <span
                  key={word}
                  aria-hidden="true"
                  className={`${styles.flowWord} ${index === content.flow.length - 1 ? styles.flowWordFinal : ""}`}
                  style={
                    {
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      "--depth": position.depth,
                      transitionDelay: `${0.2 + index * 0.35}s`,
                    } as React.CSSProperties
                  }
                >
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
