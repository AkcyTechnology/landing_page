import Image from "next/image";

import Link from "@/i18n/Link";
import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import styles from "./AboutHero.module.scss";

interface AboutHeroProps {
  content: AboutContent["hero"];
  nextSectionId: string;
}

/*
  Açılış: metin solda; sağda AKCY'nin geliştirdiği gerçek web ve mobil
  arayüzlerden oluşan kompozisyon ve "fikir → çözüm → kullanım" şeridi.
  Görseller herkese açık müşteri sitelerinin ekranlarıdır (kişisel/ticari veri yok).
*/
export default function AboutHero({ content, nextSectionId }: AboutHeroProps) {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>

            <h1 className={styles.heading}>
              {content.titleLines.map((line, index) => (
                <span key={line} className={styles.line} style={{ animationDelay: `${index * 90}ms` }}>
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
              <a href={`#${nextSectionId}`} className={styles.secondary}>
                {content.secondaryCta}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <figure className={styles.visual}>
            <div className={styles.screens}>
              <div className={styles.browser}>
                <div className={styles.bar} aria-hidden="true">
                  <i /><i /><i />
                </div>
                <Image
                  src="/images/projects/gokce-kombi/cover.jpg"
                  alt={content.visualAlt.desktop}
                  width={1440}
                  height={1000}
                  sizes="(max-width: 1050px) 90vw, 520px"
                  className={styles.desktopShot}
                  priority
                />
              </div>
              <div className={styles.phone}>
                <Image
                  src="/images/projects/cakiroglu/mobil.jpg"
                  alt={content.visualAlt.mobile}
                  width={390}
                  height={844}
                  sizes="150px"
                  className={styles.mobileShot}
                />
              </div>
            </div>

            <figcaption className={styles.flow} aria-label={content.flowLabel}>
              {content.flow.map((word, index) => (
                <span key={word} className={styles.flowStep} aria-hidden="true">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {word}
                </span>
              ))}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
