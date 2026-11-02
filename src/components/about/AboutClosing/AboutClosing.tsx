import Link from "@/i18n/Link";

import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import FallingTags from "./FallingTags";
import RotatingWord from "./RotatingWord";
import styles from "./AboutClosing.module.scss";

export default function AboutClosing({ content }: { content: AboutContent["closing"] }) {
  return (
    <>
      <section className={styles.section} aria-labelledby="about-closing-title">
        <Container>
          {/* Ekran okuyucular sabit başlığı bir kez duyar; değişen kelimeler gizlidir */}
          <h2 id="about-closing-title" className={styles.title}>
            <span className={styles.srOnly}>{content.accessibleTitle}</span>
            <span aria-hidden="true" className={styles.titleVisual}>
              <span className={styles.titleLine}>{content.titleStart}</span>{" "}
              <span className={styles.titleLine}>
                <RotatingWord words={content.words} staticWord={content.staticWord} />
              </span>{" "}
              <span className={styles.titleLine}>{content.titleEnd}</span>
            </span>
          </h2>
        </Container>

        <FallingTags tags={content.tags} replayLabel={content.replay} />
      </section>

      <section className={styles.band} aria-labelledby="about-band-title">
        <Container>
          <div className={styles.bandInner}>
            <div>
              <h2 id="about-band-title" className={styles.bandTitle}>
                {content.bandTitle}
              </h2>
              <p className={styles.bandText}>{content.bandText}</p>
            </div>
            <Link href="/iletisim" className={styles.bandCta}>
              {content.bandCta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
