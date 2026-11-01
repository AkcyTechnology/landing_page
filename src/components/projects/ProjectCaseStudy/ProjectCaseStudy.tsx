import Image from "next/image";

import type { CaseStudyImage, CaseStudySection } from "@/data/projects";
import Container from "@/components/common/Container/Container";

import styles from "./ProjectCaseStudy.module.scss";

interface ProjectCaseStudyProps {
  sections: CaseStudySection[];
  gallery: CaseStudyImage[];
  outcomes?: string[];
  liveUrl?: string;
}

export default function ProjectCaseStudy({
  sections,
  gallery,
  outcomes,
  liveUrl,
}: ProjectCaseStudyProps) {
  if (sections.length === 0 && gallery.length === 0 && !outcomes?.length) {
    return null;
  }

  const [leadImage, ...restImages] = gallery;

  return (
    <section className={styles.caseStudy}>
      {leadImage && (
        <div className={styles.leadImageFrame}>
          <Image
            src={leadImage.src}
            alt={leadImage.alt}
            fill
            sizes="100vw"
            className={styles.image}
          />
          {leadImage.caption && (
            <span className={styles.caption}>{leadImage.caption}</span>
          )}
        </div>
      )}

      <Container>
        <div className={styles.sections}>
          {sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
        </div>

        {restImages.length > 0 && (
          <div className={styles.gallery}>
            {restImages.map((image) => (
              <figure
                key={image.src}
                className={`${styles.imageFrame} ${image.portrait ? styles.portraitFrame : ""}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={image.portrait ? "320px" : "(max-width: 1050px) 100vw, 50vw"}
                  className={image.portrait ? styles.portraitImage : styles.image}
                />
                {image.caption && (
                  <figcaption className={styles.caption}>
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {outcomes && outcomes.length > 0 && (
          <div className={styles.outcomes}>
            <span className={styles.label}>Sonuçlar</span>
            <ul>
              {outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        )}
        {liveUrl && <a className={styles.liveLink} href={liveUrl} target="_blank" rel="noopener noreferrer">Canlı Siteyi Ziyaret Et ↗</a>}
      </Container>
    </section>
  );
}
