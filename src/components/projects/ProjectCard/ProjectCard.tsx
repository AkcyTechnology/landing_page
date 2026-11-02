"use client";

import Image from "next/image";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import ImagePlaceholder from "@/components/common/ImagePlaceholder/ImagePlaceholder";
import Link from "@/i18n/Link";
import { getProjectCategories, type ProjectDef } from "@/data/projects";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps { project: ProjectDef; size?: "large" | "standard"; }

export default function ProjectCard({project, size = "standard"}: ProjectCardProps) {
  const locale = useLocale();
  const t = useT().projects;
  const categoryLabel = getProjectCategories(locale).find(category => category.slug === project.category)?.label ?? project.category;
  const href = `/projelerimiz/${project.slug}`;
  return <article className={`${styles.card} ${size === "large" ? styles.cardLarge : ""}`}>
    <Link href={href} className={styles.mainLink} aria-label={`${project.title} — ${t.detailsLabel}`}>
      <div className={styles.preview} data-tilt>
        <div className={styles.previewBar} aria-hidden="true"><span className={styles.windowDots}><i /><i /><i /></span><span>{project.liveUrl ? new URL(project.liveUrl).hostname : t.conceptBar}</span><span>↗</span></div>
        <div className={styles.imageFrame}>
          {project.imagesPending ? <ImagePlaceholder label={t.imagesPending} ratio="wide" /> : <Image src={project.cover.src} alt={project.cover.alt} fill sizes={size === "large" ? "(max-width: 700px) 92vw, 46vw" : "(max-width: 700px) 92vw, (max-width: 1050px) 46vw, 30vw"} className={styles.image} />}
        </div>
      </div>
      <div className={styles.category}>{categoryLabel.toLocaleUpperCase(locale)}{project.kind === "concept" && <span className={styles.conceptTag}>{t.conceptTag}</span>}<span className={styles.year}>{project.year}</span></div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.meta}>{project.servicesUsed.join(" · ")}</p>
    </Link>
    <div className={styles.actions}>
      <Link href={href} className={styles.link}>{t.cardCta} <b aria-hidden="true">↗</b></Link>
      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveLink} aria-label={`${project.title} — ${t.liveSiteLabel}`}>{t.liveSite} <span aria-hidden="true">↗</span></a>}
    </div>
  </article>;
}
