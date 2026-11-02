import type { ProjectDef } from "@/data/projects";
import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import SectionLabel from "@/components/common/SectionLabel/SectionLabel";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";

import styles from "./RelatedProjects.module.scss";

interface RelatedProjectsProps {
  projects: ProjectDef[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;
  const t = getT().services;

  return (
    <section className={styles.related}>
      <Container>
        <SectionLabel>{t.relatedLabel}</SectionLabel>

        <h2 className={styles.heading}>{t.relatedHeading}</h2>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
