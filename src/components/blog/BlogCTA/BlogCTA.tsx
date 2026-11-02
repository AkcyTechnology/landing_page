import Link from "next/link";

import Reveal from "@/components/blog/Reveal/Reveal";

import styles from "./BlogCTA.module.scss";

export default function BlogCTA() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.container}>
        <div className={styles.card}>
          <div className={styles.text}>
            <span className={styles.eyebrow}>PROJENİZ Mİ VAR?</span>

            <h2 className={styles.heading}>
              Okuduklarınızı işletmenizde hayata geçirelim.
            </h2>

            <p className={styles.description}>
              WordPress siteniz, süreç otomasyonunuz veya yapay zekâ
              projeniz için ihtiyacınızı birlikte netleştirip size özel bir yol
              haritası hazırlayalım.
            </p>
          </div>

          <div className={styles.actions}>
            <Link href="/iletisim" className={styles.primary}>
              <span>Ön görüşme planlayın</span>
              <b aria-hidden="true">→</b>
            </Link>

            <Link href="/hizmetler" className={styles.secondary}>
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
