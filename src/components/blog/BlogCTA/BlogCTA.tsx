import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";

import Reveal from "@/components/blog/Reveal/Reveal";

import styles from "./BlogCTA.module.scss";

export default function BlogCTA() {
  const t = getT().blog.cta;
  return (
    <section className={styles.section}>
      <Reveal className={styles.container}>
        <div className={styles.card}>
          <div className={styles.text}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>

            <h2 className={styles.heading}>
              {t.heading}
            </h2>

            <p className={styles.description}>
              {t.description}
            </p>
          </div>

          <div className={styles.actions}>
            <Link href="/iletisim" className={styles.primary}>
              <span>{t.primary}</span>
              <b aria-hidden="true">→</b>
            </Link>

            <Link href="/hizmetler" className={styles.secondary}>
              {t.secondary}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
