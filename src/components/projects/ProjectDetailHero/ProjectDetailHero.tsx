import Image from "next/image";
import ImagePlaceholder from "@/components/common/ImagePlaceholder/ImagePlaceholder";
import Link from "next/link";

import type { ProjectDef } from "@/data/projects";
import Container from "@/components/common/Container/Container";

import styles from "./ProjectDetailHero.module.scss";

interface ProjectDetailHeroProps {
  project: ProjectDef;
}

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const facts = [
    { label: "Hizmet", value: project.servicesUsed.join(", ") },
    { label: "Yıl", value: project.year },
    project.sector ? { label: "Sektör", value: project.sector } : null,
    project.platform ? { label: "Platform", value: project.platform } : null,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <section className={styles.hero}>
      <Container>
        <Link href="/projelerimiz" className={styles.back}>
          <span aria-hidden="true">←</span>
          <span>Projelerimize Dön</span>
        </Link>

        <span className={styles.eyebrow}>
          {project.servicesUsed[0]?.toLocaleUpperCase("tr")} / {project.year}
        </span>

        <div className={styles.grid}>
          <h1 className={styles.title}>{project.title}</h1>

          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className={styles.summary}>
          {project.tagline ?? project.summary}
        </p>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.liveLink}
          >
            <span>Canlı Siteyi Ziyaret Et</span>
            <b aria-hidden="true">↗</b>
          </a>
        )}

        <div className={styles.cover}>
          {project.imagesPending ? <ImagePlaceholder label="Proje ekranları hazırlanıyor" ratio="wide" /> : <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="90vw"
            priority
            className={styles.coverImage}
          />}
        </div>
      </Container>
    </section>
  );
}
