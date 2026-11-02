"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "@/i18n/Link";
import { useT } from "@/i18n/LocaleProvider";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import { getCategoryAccent } from "@/components/blog/categoryMeta";

import styles from "./BlogHero.module.scss";

interface BlogHeroTopic {
  slug: string;
  label: string;
  count: number;
}

interface BlogHeroProps {
  postCount: number;
  totalMinutes: number;
  topics: BlogHeroTopic[];
}

const EASE = [0.22, 0.8, 0.25, 1] as const;

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  // inView sunucuda ve ilk istemci render'ında false olduğu için hidrasyon uyumludur
  return <span ref={ref}>{inView && reduceMotion ? value : display}</span>;
}

export default function BlogHero({
  postCount,
  totalMinutes,
  topics,
}: BlogHeroProps) {
  const t = useT().blog.hero;
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const maxCount = Math.max(...topics.map((topic) => topic.count), 1);

  // İmleci takip eden ışık efekti için CSS değişkenlerini günceller.
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    hero.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  // Boşluk maskenin dışında olmalı; inline-block içindeki son boşluk yutulur.
  const word = (text: string, index: number, accent = false) => (
    <Fragment key={`${text}-${index}`}>
      <span className={styles.wordMask}>
        <motion.span
          className={accent ? styles.accentWord : styles.word}
          initial={reduceMotion ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 + index * 0.06, ease: EASE }}
        >
          {text}
        </motion.span>
      </span>{" "}
    </Fragment>
  );

  const leadWords = t.headingLead.split(" ");
  const accentWords = t.headingAccent.split(" ");

  const stats = [
    { value: postCount, label: t.statPosts },
    { value: topics.length, label: t.statTopics },
    { value: totalMinutes, label: t.statMinutes },
  ];

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      onPointerMove={handlePointerMove}
    >
      <div className={styles.aurora} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.orbThree} />
      </div>
      <div className={styles.spotlight} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <motion.span
            className={styles.eyebrow}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <i aria-hidden="true" />
            {t.eyebrow}
          </motion.span>

          <h1 className={styles.heading}>
            {leadWords.map((text, index) => word(text, index))}
            {accentWords.map((text, index) =>
              word(text, leadWords.length + index, true)
            )}
          </h1>

          <motion.p
            className={styles.description}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          >
            {t.description}
          </motion.p>

          <motion.dl
            className={styles.stats}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt>{stat.label}</dt>
                <dd>
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.aside
          className={styles.panel}
          initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        >
          <div className={styles.panelHead}>
            <span>{t.topicsTitle}</span>
            <b>{t.postCount.replace("{count}", String(postCount))}</b>
          </div>

          <ul className={styles.topics}>
            {topics.map((topic, index) => (
              <motion.li
                key={topic.slug}
                style={
                  {
                    "--accent": getCategoryAccent(topic.slug),
                  } as React.CSSProperties
                }
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.55 + index * 0.07,
                  ease: EASE,
                }}
              >
                <Link href={`/blog?category=${topic.slug}`} scroll={false}>
                  <i className={styles.dot} aria-hidden="true" />
                  <span className={styles.topicLabel}>{topic.label}</span>
                  <span className={styles.bar} aria-hidden="true">
                    <motion.span
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: topic.count / maxCount }}
                      transition={{
                        duration: 1.1,
                        delay: 0.8 + index * 0.07,
                        ease: EASE,
                      }}
                    />
                  </span>
                  <small>{String(topic.count).padStart(2, "0")}</small>
                  <b aria-hidden="true">→</b>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.aside>
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...t.marquee, ...t.marquee].map((item, index) => (
            <span key={index}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
