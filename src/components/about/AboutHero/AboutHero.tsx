import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import PhotoStack from "./PhotoStack";
import TagRain from "./TagRain";
import styles from "./AboutHero.module.scss";

interface AboutHeroProps {
  content: AboutContent["hero"];
  pageName: string;
}

/*
  Hakkımızda hero: metin solda ve üstte, etiketlerin önünde.
  Başlık, açıklama ve buton her zaman ilk HTML'de görünür (JS'e bağlı gizleme yok).
*/
export default function AboutHero({ content, pageName }: AboutHeroProps) {
  return (
    <section className={styles.hero}>
      <TagRain tags={content.tags} />

      <Container className={styles.container}>
        <div className={styles.layout}>
        <div className={styles.content}>
          <nav className={styles.breadcrumb} aria-label={getT().blog.detail.breadcrumb}>
            <ol>
              <li>
                <Link href="/">{content.breadcrumb}</Link>
              </li>
              <li aria-current="page">{pageName}</li>
            </ol>
          </nav>

          <p className={styles.eyebrow}>{content.eyebrow}</p>

          <h1 className={styles.heading}>
            {content.titleLines.map((line) => (
              <span key={line} className={styles.line}>
                {line}{" "}
              </span>
            ))}
          </h1>

          <p className={styles.description}>{content.description}</p>

          <div className={styles.actions}>
            <Link href="/iletisim" className={styles.primary}>
              {content.primaryCta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <PhotoStack images={content.gallery} />
        </div>
      </Container>
    </section>
  );
}
