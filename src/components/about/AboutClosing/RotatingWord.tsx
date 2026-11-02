"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import styles from "./AboutClosing.module.scss";

const INTERVAL = 2600;

/*
  Kelimeler kısa bir dikey kaymayla değişir. Tüm kelimeler görünmez olarak
  aynı hücrede durur; böylece alan en uzun kelimeye göre ayrılır ve başlık zıplamaz.
  Bölüm görünmüyorsa, sekme gizliyse veya hareket azaltılmışsa döngü durur.
*/
export default function RotatingWord({ words, staticWord }: { words: string[]; staticWord: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 700px)");
    let inView = false;
    let timer: number | undefined;

    const update = () => {
      const run = inView && !reduce.matches && !narrow.matches && !document.hidden;
      setEnabled(!reduce.matches && !narrow.matches);
      window.clearInterval(timer);
      timer = undefined;
      if (run) timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), INTERVAL);
      if (reduce.matches || narrow.matches) setIndex(0);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(node);
    reduce.addEventListener("change", update);
    narrow.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      reduce.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [words.length]);

  if (!enabled) {
    return (
      <span ref={ref} className={styles.staticWord}>
        {staticWord}
      </span>
    );
  }

  return (
    <span ref={ref} className={styles.slot}>
      {words.map((word) => (
        <span key={word} className={styles.ghost}>
          {word}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          className={styles.word}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.8, 0.25, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
