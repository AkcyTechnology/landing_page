"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Link from "@/i18n/Link";
import { useT } from "@/i18n/LocaleProvider";
import Container from "@/components/common/Container/Container";
import type { ServiceDef } from "@/data/services";

import styles from "./ServicesLanding.module.scss";

/*
  Hizmetler genel sayfası
  - Açılış: başlık + hizmetlerin gerçek kapsam başlıklarından oluşan,
    zıt yönlerde akan iki sütun (dekoratif)
  - Liste: satır üzerine gelince zemin soldan dolar; masaüstünde hizmetin
    görseli imleci takip eden önizlemede belirir. Mobilde görsel satırdadır.
*/
export default function ServicesLanding({ services }: { services: ServiceDef[] }) {
  const t = useT().services;
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  /* Önizleme imleci yumuşakça takip eder (yalnızca fareli cihazlar) */
  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    const tick = () => {
      cx += (x - cx) * (reduce ? 1 : 0.16);
      cy += (y - cy) * (reduce ? 1 : 0.16);
      preview.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      const rect = list.getBoundingClientRect();
      x = event.clientX - rect.left + 28;
      y = event.clientY - rect.top - 110;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    list.addEventListener("pointermove", onMove);
    return () => {
      list.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const offerings = services.flatMap((service) => service.offerings);
  const columnA = offerings.filter((_, index) => index % 2 === 0);
  const columnB = offerings.filter((_, index) => index % 2 === 1);

  return (
    <>
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>{t.heroLabel}</p>
              <h1 className={styles.heading}>{t.heroTitle}</h1>
              <p className={styles.lead}>{t.heroDescription}</p>
              <p className={styles.count}>
                <strong>{String(services.length).padStart(2, "0")}</strong>
                <span>{t.countLabel}</span>
              </p>
            </div>

            <div className={styles.flow} aria-hidden="true">
              {[columnA, columnB].map((column, columnIndex) => (
                <div key={columnIndex} className={`${styles.flowColumn} ${columnIndex === 1 ? styles.flowReverse : ""}`}>
                  <div className={styles.flowTrack}>
                    {[...column, ...column].map((item, index) => (
                      <span key={`${item}-${index}`} className={styles.flowItem}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.listSection} aria-label={t.listLabel}>
        <Container>
          <div ref={listRef} className={styles.list} onPointerLeave={() => setHovered(null)}>
            <div ref={previewRef} className={`${styles.preview} ${hovered !== null ? styles.previewOn : ""}`} aria-hidden="true">
              {services.map((service, index) => (
                <Image
                  key={service.slug}
                  src={service.image.src}
                  alt=""
                  width={560}
                  height={420}
                  sizes="300px"
                  className={`${styles.previewImage} ${hovered === index ? styles.previewImageOn : ""}`}
                />
              ))}
            </div>

            <ol className={styles.rows}>
              {services.map((service, index) => (
                <li key={service.slug} data-reveal style={{ ["--reveal-delay" as string]: `${index * 0.06}s` }}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className={styles.row}
                    onPointerEnter={() => setHovered(index)}
                    onFocus={() => setHovered(index)}
                  >
                    <span className={styles.number}>{service.number}</span>
                    <span className={styles.thumb} aria-hidden="true">
                      <Image src={service.image.src} alt="" width={560} height={420} sizes="96px" />
                    </span>
                    <span className={styles.rowMain}>
                      <span className={styles.rowTitle}>{service.title}</span>
                      <span className={styles.rowText}>{service.shortDescription}</span>
                    </span>
                    <span className={styles.rowTags}>
                      {service.offerings.slice(0, 3).map((offering) => (
                        <span key={offering}>{offering}</span>
                      ))}
                    </span>
                    <span className={styles.rowArrow} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
