"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "@/i18n/Link";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { motion } from "motion/react";
import { getAllServices } from "@/data/services";

import styles from "./HeroArc.module.scss";

const ANGLE_STEP = 21;
const RADIUS = 640;
/* Aktif kartın iki yanında en fazla bu kadar kart görünür */
const VISIBLE_RANGE = 2;

const AUTOPLAY_INTERVAL = 4500;
const AUTOPLAY_RESUME_DELAY = 6000;

const icons: Record<string, ReactNode> = {
  "web-gelistirme": <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>,
  "ui-ux-tasarim": <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  "mobil-uygulamalar": <><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></>,
  "kurumsal-yazilim": <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13h3M8 16h6M15 13h1" /></>,
  "yapay-zeka": <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m12 8 1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2Z" /></>,
  "dijital-otomasyon": <><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="M7 6h10M6 8l5 8.5M18 8l-5 8.5" /></>,
  "ai-icerik-uretimi": <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 16 5-5 4 4 3-3 6 6" /><path d="M17 3v4M15 5h4" /></>,
};

export default function HeroArc() {
  const locale = useLocale();
  const t = useT().home.heroArc;
  const services = getAllServices(locale);
  const [active, setActive] = useState(0);

  const autoplayTimer = useRef<ReturnType<typeof setInterval>>(
    undefined
  );
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(
    undefined
  );

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const prev = () => {
    setActive(
      (prev) => (prev - 1 + services.length) % services.length
    );
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  const pauseAutoplay = () => {
    stopAutoplay();

    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    resumeTimer.current = setTimeout(() => {
      autoplayTimer.current = setInterval(next, AUTOPLAY_INTERVAL);
    }, AUTOPLAY_RESUME_DELAY);
  };

  useEffect(() => {
    /* Hareket azaltma tercihi varsa otomatik geçişi başlatma */
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reduceMotion) {
      autoplayTimer.current = setInterval(next, AUTOPLAY_INTERVAL);
    }

    return () => {
      stopAutoplay();

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, [next]);

  return (
    <div className={styles.arc}>
      <motion.div
        className={styles.stage}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragStart={pauseAutoplay}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) next();
          if (info.offset.x > 60) prev();
        }}
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 0.8, 0.25, 1] }}
      >
        {services.map((service, index) => {
          let offset = index - active;

          if (offset > services.length / 2) {
            offset -= services.length;
          }

          if (offset < -services.length / 2) {
            offset += services.length;
          }

          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const isVisible = distance <= VISIBLE_RANGE;

          const angle = offset * ANGLE_STEP;
          const rad = (angle * Math.PI) / 180;

          const x = Math.sin(rad) * RADIUS;
          const y = (1 - Math.cos(rad)) * RADIUS;

          return (
            <motion.article
              key={service.slug}
              className={`${styles.card} ${
                isActive ? styles.cardActive : ""
              }`}
              data-distance={distance}
              aria-hidden={!isActive}
              animate={{
                x,
                y,
                rotate: angle * 0.4,
                scale: isActive ? 1 : 1 - distance * 0.07,
                /* Kartlar opak kalır; yalnızca görünür aralığın dışındakiler gizlenir */
                opacity: isVisible ? 1 : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 0.8, 0.25, 1],
              }}
              style={{
                zIndex: 50 - distance,
                pointerEvents: isVisible ? "auto" : "none",
              }}
              onClick={() => {
                if (isActive) return;
                pauseAutoplay();
                setActive(index);
              }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{service.number}</span>
                <span className={styles.cardIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[service.slug]}
                  </svg>
                </span>
              </div>

              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>

              <ul>
                {service.offerings.slice(0, 3).map((offering) => (
                  <li key={offering}>{offering}</li>
                ))}
              </ul>

              <Link
                href={`/hizmetler/${service.slug}`}
                className={styles.cardLink}
                tabIndex={isActive ? 0 : -1}
              >
                {t.cardLink} <span aria-hidden="true">↗</span>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>

      <div className={styles.controls}>
        <button
          type="button"
          aria-label={t.previous}
          onClick={() => {
            pauseAutoplay();
            prev();
          }}
        >
          ←
        </button>

        <span aria-live="polite">
          {String(active + 1).padStart(2, "0")}
          <i>
            <b style={{ width: `${((active + 1) / services.length) * 100}%` }} />
          </i>
          {String(services.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          aria-label={t.next}
          onClick={() => {
            pauseAutoplay();
            next();
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
