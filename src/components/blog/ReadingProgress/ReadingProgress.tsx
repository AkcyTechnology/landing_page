"use client";

import { motion, useScroll, useSpring } from "motion/react";

import styles from "./ReadingProgress.module.scss";

// Sayfanın ne kadarının okunduğunu üstte ince bir çubukla gösterir.
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
