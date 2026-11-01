import Link from "next/link";

import type { ProjectDef } from "@/data/projects";
import Container from "@/components/common/Container/Container";

import styles from "./NextProject.module.scss";

interface NextProjectProps {
  project?: ProjectDef;
}

export default function NextProject({ project }: NextProjectProps) {
  if (!project) return null;

  return (
    <section className={styles.section}>
      <Container>
        <Link href={`/projelerimiz/${project.slug}`} className={styles.link}>
          <span className={styles.eyebrow}>SONRAKİ PROJE</span>
          <h2 className={styles.title}>
            <span>{project.title}</span>
            <b aria-hidden="true">↗</b>
          </h2>
        </Link>
      </Container>
    </section>
  );
}
