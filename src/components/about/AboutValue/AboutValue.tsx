"use client";

import { useState } from "react";

import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import ValueVisual from "./ValueVisual";
import styles from "./AboutValue.module.scss";

export default function AboutValue({ content }: { content: AboutContent["value"] }) {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section} aria-labelledby="about-value-title">
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 id="about-value-title" className={styles.title}>
            {content.title}
          </h2>
        </div>

        <div className={styles.layout}>
          <ol className={styles.rows}>
            {content.rows.map((row, index) => (
              <li
                key={row.title}
                className={`${styles.row} ${active === index ? styles.rowActive : ""}`}
                onMouseEnter={() => setActive(index)}
              >
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.rowText}>
                  <h3 className={styles.rowTitle}>{row.title}</h3>
                  <p className={styles.rowDescription}>{row.description}</p>
                </div>
                {/* Mobilde ve tablette çizim satırın içinde, hareketsiz görünür */}
                <div className={styles.inlineVisual}>
                  <ValueVisual type={row.visual} active />
                </div>
              </li>
            ))}
          </ol>

          {/* Masaüstünde üzerine gelinen satırın çizimi bu alanda değişir */}
          <div className={styles.panel} aria-hidden="true">
            {content.rows.map((row, index) => (
              <div key={row.visual} className={`${styles.panelItem} ${active === index ? styles.panelItemActive : ""}`}>
                <ValueVisual type={row.visual} active={active === index} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
