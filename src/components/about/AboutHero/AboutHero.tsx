"use client";

import Image from "next/image";
import { motion } from "motion/react";

import Container from "@/components/common/Container/Container";

import styles from "./AboutHero.module.scss";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.layout}>
          <motion.div
            className={styles.intro}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.8, 0.25, 1] }}
          >
            <span className={styles.eyebrow}>01 / HAKKIMIZDA</span>

            <h1 className={styles.heading}>
              Teknolojiyi,
              <br />
              işin gerçekten
              <br />
              <span>çalıştığı yere taşıyoruz.</span>
            </h1>

            <p className={styles.description}>
              AKCY; yapay zekâ, otomasyon ve dijital ürün
              geliştirme alanlarını tek bir yapıda birleştirir. İşletmeler
              için yalnızca arayüzler değil, günlük operasyonları
              kolaylaştıran ve büyümeyi destekleyen dijital sistemler
              tasarlarız.
            </p>
          </motion.div>

          <motion.div
            className={styles.visual}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Ekip halinde dijital ürün üzerinde çalışma anı"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              className={styles.visualImage}
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
