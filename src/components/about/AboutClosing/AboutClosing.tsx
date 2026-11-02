import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import FallingTags from "./FallingTags";
import RotatingWord from "./RotatingWord";
import styles from "./AboutClosing.module.scss";

/* Kapanış: değişen kelimeli başlık ve sürekli dolup boşalan etiket alanı.
   İletişim çağrısı sayfada tekrarlanmaz; ortak footer'daki çağrı kullanılır. */
export default function AboutClosing({ content }: { content: AboutContent["closing"] }) {
  return (
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

        <FallingTags
          tags={content.tags}
          label={content.tagsLabel}
          pauseLabel={content.pause}
          resumeLabel={content.resume}
        />
      </Container>
    </section>
  );
}
