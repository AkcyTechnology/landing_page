"use client";

import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

// Görünüm alanına girdiğinde içeriği yumuşakça yukarı kaydırarak gösterir.
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.8, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
