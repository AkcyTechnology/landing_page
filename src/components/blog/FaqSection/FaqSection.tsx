import type { FaqItem } from "@/data/blog";

import styles from "./FaqSection.module.scss";

interface FaqSectionProps {
  items: FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
  if (!items.length) return null;

  return (
    <section className={styles.wrap} aria-labelledby="sss">
      <span className={styles.eyebrow}>SIK SORULAN SORULAR</span>

      <h2 id="sss" className={styles.heading}>
        Sık Sorulan Sorular
      </h2>

      <div className={styles.list}>
        {items.map((item) => (
          /*
            details/summary kullanıyoruz: JavaScript olmadan da açılır,
            içerik DOM'da her zaman bulunduğu için arama motorları okuyabilir.
          */
          <details key={item.question} className={styles.item}>
            <summary className={styles.question}>
              {item.question}
              <span className={styles.icon} aria-hidden="true" />
            </summary>

            <div className={styles.answer}>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
