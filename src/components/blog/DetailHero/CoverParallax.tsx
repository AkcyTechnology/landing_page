"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import styles from "./DetailHero.module.scss";

interface CoverParallaxProps {
  src: string;
  alt: string;
}

// Kapak görseli sayfa kaydırıldıkça hafifçe yaklaşır ve yukarı kayar.
export default function CoverParallax({ src, alt }: CoverParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12]);

  return (
    <div ref={ref} className={styles.cover}>
      <motion.div
        className={styles.coverInner}
        style={reduceMotion ? undefined : { y, scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1050px) 100vw, 1200px"
          priority
          className={styles.coverImage}
        />
      </motion.div>
    </div>
  );
}
