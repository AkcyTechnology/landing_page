"use client";

import { useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

import styles from "./Hero.module.scss";
import HeroArc from "./HeroArc";

const EASE_STANDARD: [number, number, number, number] = [0.22, 0.8, 0.25, 1];

function buildIntroVariants(reduceMotion: boolean) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };
}

function buildItemVariants(reduceMotion: boolean) {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.7, ease: EASE_STANDARD },
    },
  };
}

export default function Hero() {
  const displayText = "dönüştürüyoruz.";

  // framer-motion'ın useReducedMotion'ı SSR-safe değildir: ilk client
  // render'ında bile senkron olarak gerçek işletim sistemi tercihini
  // okur, bu da sunucunun (window erişimi olmadığı için) ürettiği
  // "false" varsayımıyla çakışıp yalnızca bu inline animasyon
  // stillerinde bir hydration uyarısına yol açar. İçerik/metin
  // değişmediğinden, bu amaçla suppressHydrationWarning kullanmak
  // React'ın önerdiği güvenli yoldur.
  const prefersReduced = useReducedMotion();
  const reduceMotion = Boolean(prefersReduced);

  const introVariants = buildIntroVariants(reduceMotion);
  const itemVariants = buildItemVariants(reduceMotion);

  return (
    <section className={styles.hero}>
      {/*
        Arka plan katmanı: sabit oranlı kapsayıcı içinde durduğu için
        yüklenirken layout kayması (CLS) oluşturmaz.
      */}
      <div className={styles.heroMedia} aria-hidden="true">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className={styles.heroMediaImage}
        />
        <div className={styles.heroMediaVeil} />
      </div>

      <div
        className={styles.heroBackground}
      />

      <motion.div
        className={styles.heroIntro}
        initial="hidden"
        animate="visible"
        variants={introVariants}
        suppressHydrationWarning
      >
        <motion.div className={styles.eyebrow} variants={itemVariants} suppressHydrationWarning>
          <span />
          <b>YAPAY ZEKÂ · OTOMASYON · DİJİTAL ÜRÜNLER</b>
        </motion.div>

        <h1 className={styles.heading}>
          <motion.span className={styles.heroFixed} variants={itemVariants} suppressHydrationWarning>
            İşinizi
          </motion.span>

          <motion.span className={styles.heroDynamic} variants={itemVariants} suppressHydrationWarning>
            {displayText}
          </motion.span>
        </h1>

        <motion.p className={styles.description} variants={itemVariants} suppressHydrationWarning>
          Küçük ekiplerden kurumsal yapılara kadar; yapay zekâ, otomasyon ve dijital ürünlerle iş süreçlerini daha hızlı, verimli ve ölçeklenebilir hale getiriyoruz.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants} suppressHydrationWarning>
          <Link href="/iletisim" className={styles.primaryButton} data-magnetic>
            <span>Bir Proje Başlatalım</span>
            <b aria-hidden="true">↗</b>
          </Link>

          <Link
            href="/projelerimiz"
            className={styles.secondaryButton}
          >
            Projelerimizi Keşfet
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.div className={styles.scrollHint} variants={itemVariants} suppressHydrationWarning>
          <span>KEŞFETMEK İÇİN KAYDIR</span>
          <span className={styles.scrollLine} />
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.heroArcArea}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE_STANDARD, delay: reduceMotion ? 0 : 0.7 }}
        suppressHydrationWarning
      >
        <HeroArc />
      </motion.div>
    </section>
  );
}
