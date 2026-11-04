"use client";

import { useEffect, useRef, useState } from "react";

import type { ServiceProcessStep } from "@/data/services";

import styles from "./ServiceDetail.module.scss";

/*
  Süreç zaman çizgisi: bölüm ekranda ilerledikçe çizgi dolar ve adımlar
  sırayla etkinleşir. Kaydırma kilitlenmez; hareket azaltmada tümü etkin.
*/
export default function ServiceTimeline({ steps }: { steps: ServiceProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.35;
      const value = (start - rect.top) / (start - end + rect.height * 0.6);
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.round(progress * steps.length);

  return (
    <div ref={ref} className={styles.timelineWrap} style={{ ["--progress" as string]: progress }}>
      <span className={styles.timelineTrack} aria-hidden="true">
        <i />
      </span>
      <ol className={styles.timeline}>
      {steps.map((step, index) => (
        <li key={step.number} className={index < active ? styles.stepOn : undefined}>
          <span className={styles.stepDot} aria-hidden="true" />
          <span className={styles.stepNumber}>{step.number}</span>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepText}>{step.description}</p>
        </li>
      ))}
      </ol>
    </div>
  );
}
