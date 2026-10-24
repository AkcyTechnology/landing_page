"use client";

import { motion } from "motion/react";

import styles from "./BlogHero.module.scss";

export default function BlogHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.25, 1] }}
        >
          <span className={styles.eyebrow}>BLOG / NOTLAR</span>

          <h1 className={styles.heading}>
            Düşünceler, Projeler & Notlar
          </h1>

          <p className={styles.description}>
            Teknoloji, tasarım, yazılım ve üzerinde çalıştığımız
            projeler hakkında notlar, deneyimler ve öğrendiklerimiz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
