import Image from "next/image";

import { getT } from "@/i18n/server";
import styles from "./BlogHero.module.scss";

/*
  Blog açılışı: solda editoryal metin, sağda gerçek bir çalışma masası
  fotoğrafı. Alt kenarı, ardından gelen "Tüm yazılar" bölümünün zemin
  rengine yumuşakça geçer.
*/
export default function BlogHero() {
  const t = getT().blog.hero;

  return (
    <section className={styles.hero} aria-labelledby="blog-hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1 id="blog-hero-title" className={styles.title}>
            <span className={styles.lead}>{t.headingLead}</span>{" "}
            <span className={styles.accent}>{t.headingAccent}</span>
          </h1>
          <p className={styles.text}>{t.description}</p>
        </div>

        <figure className={styles.media}>
          <span className={styles.frame} aria-hidden="true" />
          <div className={styles.photoWrap}>
            <Image
              src="/images/blog/hero-masa.webp"
              alt={t.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 44vw"
              className={styles.photo}
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
