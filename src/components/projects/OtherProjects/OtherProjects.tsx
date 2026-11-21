import type { CSSProperties } from "react";
import Image from "next/image";

import Link from "@/i18n/Link";
import { getLocale, getT } from "@/i18n/server";
import { projectsPage, type ShowcaseProject } from "@/content/projects-page";
import Container from "@/components/common/Container/Container";
import styles from "./OtherProjects.module.scss";

/*
  Proje ayrıntı sayfasının sonunda "Diğer projeler": Projelerimiz vitrinindeki
  öteki projeler (mevcut proje hariç) en fazla üç kart halinde. Ayrıntı sayfası
  olan proje oraya, olmayan Projelerimiz sayfasındaki kendi bölümüne bağlanır.
  Kartlar ekrana girince sırayla belirir (RevealObserver).
*/

function cover(project: ShowcaseProject) {
  return project.visual.kind === "web" ? project.visual.desktop : project.visual.screens[0];
}

export default function OtherProjects({ currentHref }: { currentHref: string }) {
  const t = getT().projects;
  const projects = projectsPage[getLocale()].projects
    .filter((project) => project.detailHref !== currentHref && cover(project))
    .slice(0, 3);
  if (!projects.length) return null;

  return (
    <section className={styles.section} aria-labelledby="other-projects-title">
      <Container>
        <div className={styles.head}>
          <h2 id="other-projects-title" className={styles.title}>{t.otherProjects}</h2>
          <Link href="/projelerimiz" className={styles.all}>
            {t.allProjects} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className={styles.grid}>
          {projects.map((project, index) => {
            const image = cover(project);
            return (
              <li key={project.id} data-reveal="" style={{ "--reveal-delay": `${index * 0.1}s` } as CSSProperties}>
                <Link href={project.detailHref ?? `/projelerimiz#proje-${project.id}`} className={styles.card}>
                  <span className={styles.media} data-kind={project.visual.kind}>
                    <Image src={image.src} alt="" fill sizes="(max-width: 760px) 92vw, 400px" className={styles.image} />
                  </span>
                  <span className={styles.body}>
                    <span className={styles.label}>{project.label}</span>
                    <strong className={styles.name}>
                      {project.name}
                      <span aria-hidden="true">↗</span>
                    </strong>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
