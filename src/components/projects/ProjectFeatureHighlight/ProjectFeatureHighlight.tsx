import Image from "next/image";

import type { FeatureHighlight } from "@/data/projects";
import Container from "@/components/common/Container/Container";

import styles from "./ProjectFeatureHighlight.module.scss";

interface ProjectFeatureHighlightProps {
  feature?: FeatureHighlight;
}

export default function ProjectFeatureHighlight({
  feature,
}: ProjectFeatureHighlightProps) {
  if (!feature) return null;

  return (
    <section className={styles.section}>
      <Container>
        <span className={styles.label}>Öne Çıkan Özellik</span>

        <div className={styles.header}>
          <h2 className={styles.title}>{feature.title}</h2>
          <p className={styles.description}>{feature.description}</p>
        </div>

        <ol className={styles.steps}>
          {feature.steps.map((step) => (
            <li key={step.number}>
              <span className={styles.stepNumber}>{step.number}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </li>
          ))}
        </ol>

        <div className={styles.imageFrame}>
          <Image
            src={feature.image.src}
            alt={feature.image.alt}
            fill
            sizes="(max-width: 1050px) 100vw, 90vw"
            className={styles.image}
          />
        </div>
      </Container>
    </section>
  );
}
