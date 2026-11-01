import type { ProjectDef } from "@/data/projects";
import Container from "@/components/common/Container/Container";
import SectionLabel from "@/components/common/SectionLabel/SectionLabel";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";

import styles from "./RelatedProjects.module.scss";

interface RelatedProjectsProps {
  projects: ProjectDef[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className={styles.related}>
      <Container>
        <SectionLabel>05 / İlgili Projeler</SectionLabel>

        <h2 className={styles.heading}>Bu hizmetle üretilenler</h2>

        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
