"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "./ServicesPage.module.scss";

interface Props {
  title: string;
  photo: string;
  overview: string;
  more: string[];
  labels: { show: string; hide: string; overview: string; more: string };
}

/*
  Hizmetin yanındaki görselli kart: fareyle üzerine gelince (ya da düğmeyle,
  dokunmatikte dokununca) arkaya döner ve hizmetin genel bakışını gösterir.
  İki yüz de DOM'da kalır; arka yüz ekran okuyucular için her zaman okunur.
*/
export default function FlipCard({ title, photo, overview, more, labels }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`${styles.flip} ${flipped ? styles.flipped : ""}`} data-reveal="" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
      <div className={styles.flipInner}>
        <div className={styles.flipFront} aria-hidden="true">
          <Image src={photo} alt="" fill sizes="(max-width: 900px) 100vw, 45vw" className={styles.flipPhoto} />
          <span className={styles.flipTitle}>{title}</span>
        </div>

        <div className={styles.flipBack}>
          <p className={styles.flipLabel}>{labels.overview}</p>
          <p className={styles.flipText}>{overview}</p>
          {more.length > 0 && (
            <>
              <p className={styles.flipLabel}>{labels.more}</p>
              <ul className={styles.flipList}>
                {more.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        className={styles.flipButton}
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
      >
        <span aria-hidden="true">↻</span>
        {flipped ? labels.hide : labels.show}
        <span className={styles.srOnly}> — {title}</span>
      </button>
    </div>
  );
}
