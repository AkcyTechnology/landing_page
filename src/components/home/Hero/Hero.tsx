"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "@/i18n/Link";
import { useT } from "@/i18n/LocaleProvider";
import Image from "next/image";
import type { CSSProperties } from "react";

import styles from "./Hero.module.scss";
import HeroArc from "./HeroArc";

const EASE_STANDARD: [number, number, number, number] = [0.22, 0.8, 0.25, 1];

export default function Hero() {
  const t = useT().home.hero;
  const displayText = t.titleDynamic;

  // useReducedMotion SSR-safe değildir (sunucu "false" varsayar); yalnızca
  // dekoratif yay animasyonunun inline stilini etkilediği için
  // suppressHydrationWarning ile kullanılır. Metin animasyonları CSS'tedir.
  const prefersReduced = useReducedMotion();
  const reduceMotion = Boolean(prefersReduced);


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

      {/*
        Metinlerin giriş animasyonu (alttan kayarak, sırayla belirme) saf CSS
        ile yapılır (Hero.module.scss → .rise). İlk boyamada başlar; JavaScript
        yüklenmesini beklemez. Böylece LCP öğesi (açıklama metni) gecikmez.
      */}
      <div className={styles.heroIntro}>
        {/*
          Üst etiket (YAPAY ZEKÂ · OTOMASYON · DİJİTAL ÜRÜNLER) H1'in parçasıdır:
          görünüm aynı kalır, arama motorları başlığı anahtar kelimeleriyle okur.
        */}
        <h1 className={styles.heading}>
          <span className={`${styles.eyebrow} ${styles.rise}`} style={{ "--rise-i": 0 } as CSSProperties}>
            <span aria-hidden="true" />
            <b>{t.eyebrow}</b>
          </span>

          <span className={`${styles.heroFixed} ${styles.rise}`} style={{ "--rise-i": 1 } as CSSProperties}>
            {t.titleFixed}
          </span>

          <span className={`${styles.heroDynamic} ${styles.rise}`} style={{ "--rise-i": 2 } as CSSProperties}>
            {displayText}
          </span>
        </h1>

        <p className={`${styles.description} ${styles.rise}`} style={{ "--rise-i": 3 } as CSSProperties}>
          {t.description}
        </p>

        <div className={`${styles.actions} ${styles.rise}`} style={{ "--rise-i": 4 } as CSSProperties}>
          <Link href="/iletisim" className={styles.primaryButton}>
            <span>{t.primaryCta}</span>
            <b aria-hidden="true">↗</b>
          </Link>

          <Link
            href="/projelerimiz"
            className={styles.secondaryButton}
          >
            {t.secondaryCta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={`${styles.scrollHint} ${styles.rise}`} style={{ "--rise-i": 5 } as CSSProperties}>
          <span>{t.scrollHint}</span>
          <span className={styles.scrollLine} />
        </div>
      </div>

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
