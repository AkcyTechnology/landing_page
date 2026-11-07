import { getT } from "@/i18n/server";
import DropWords, { dropWordCount } from "@/components/common/DropWords/DropWords";
import styles from "./BlogHero.module.scss";

/*
  Blog açılışı (ortak petrol hero): solda başlık ve kısa açıklama, sağda
  ince çizgilerden, katmanlardan ve soyut yazı kartlarından oluşan sade bir
  editoryal kompozisyon. Kartlar yalnızca süslemedir (metin içermez).
*/
export default function BlogHero() {
  const t = getT().blog.hero;

  return (
    <section className={styles.hero} aria-labelledby="blog-hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1 id="blog-hero-title" className={styles.title}>
            <span className={styles.lead}>
              <DropWords text={t.headingLead} />
            </span>{" "}
            <span className={styles.accent}>
              <DropWords text={t.headingAccent} start={dropWordCount(t.headingLead)} />
            </span>
          </h1>
          <p className={styles.text}>{t.description}</p>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <span className={styles.rule} data-rule="1" />
          <span className={styles.rule} data-rule="2" />
          <span className={styles.rule} data-rule="3" />

          <div className={`${styles.sheet} ${styles.sheetBack}`}>
            <i className={styles.lineShort} />
            <i className={styles.line} />
            <i className={styles.line} />
          </div>

          <div className={`${styles.sheet} ${styles.sheetMid}`}>
            <span className={styles.thumb} />
            <i className={styles.chip} />
            <i className={styles.lineLong} />
            <i className={styles.line} />
            <i className={styles.lineShort} />
          </div>

          <div className={`${styles.sheet} ${styles.sheetFront}`}>
            <div className={styles.sheetHead}>
              <i className={styles.dot} />
              <i className={styles.chip} />
              <i className={styles.meta} />
            </div>
            <i className={styles.titleBar} />
            <i className={styles.titleBarShort} />
            <span className={styles.figure}>
              <b />
              <b />
              <b />
              <b />
            </span>
            <i className={styles.line} />
            <i className={styles.lineLong} />
            <i className={styles.lineShort} />
          </div>

          <span className={styles.tagFloat} data-tag="1" />
          <span className={styles.tagFloat} data-tag="2" />
        </div>
      </div>
    </section>
  );
}
