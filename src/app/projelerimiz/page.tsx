import { pageMetadata } from "@/lib/metadata";

import { getClientProjects, getConceptProjects } from "@/data/projects";
import Container from "@/components/common/Container/Container";
import ProjectsHero from "@/components/projects/ProjectsHero/ProjectsHero";
import ProjectsListingClient from "@/components/projects/ProjectsListingClient/ProjectsListingClient";
import ProjectGrid from "@/components/projects/ProjectGrid/ProjectGrid";

import styles from "./page.module.scss";

export const metadata = pageMetadata("Projelerimiz", "Web, mobil, tasarım ve dijital ürün alanlarında geliştirdiğimiz seçili çalışmalar.", "/projelerimiz");

export default function ProjectsPage() {
  const clientProjects = getClientProjects();
  const conceptProjects = getConceptProjects();

  return (
    <>
      <ProjectsHero />

      <section className={styles.listing}>
        <Container>
          <ProjectsListingClient allProjects={clientProjects} />
        </Container>
      </section>

      {conceptProjects.length > 0 && (
        <section className={styles.lab}>
          <Container>
            <div className={styles.labHeader}>
              <span className={styles.labLabel}>LAB / KONSEPTLER</span>
              <p className={styles.labDescription}>
                Gerçek müşteri işleri değil; AKCY&apos;nin kendi yaklaşımını
                sınadığı konsept çalışmalar.
              </p>
            </div>

            <ProjectGrid projects={conceptProjects} />
          </Container>
        </section>
      )}
    </>
  );
}
