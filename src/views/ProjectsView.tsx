import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalSlug, localizeSlug, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { getAdjacentProject, getAllProjects, getClientProjects, getConceptProjects, getProjectBySlug } from "@/data/projects";
import Container from "@/components/common/Container/Container";
import ProjectsHero from "@/components/projects/ProjectsHero/ProjectsHero";
import ProjectsListingClient from "@/components/projects/ProjectsListingClient/ProjectsListingClient";
import ProjectGrid from "@/components/projects/ProjectGrid/ProjectGrid";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero/ProjectDetailHero";
import ProjectProblemApproach from "@/components/projects/ProjectProblemApproach/ProjectProblemApproach";
import ProjectFeatureHighlight from "@/components/projects/ProjectFeatureHighlight/ProjectFeatureHighlight";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy/ProjectCaseStudy";
import NextProject from "@/components/projects/NextProject/NextProject";

import styles from "./ProjectsView.module.scss";

export function projectsMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.projects;
  return pageMetadata(locale, t.title, t.description, "/projelerimiz");
}

export default function ProjectsView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = getDictionary(locale).projects;
  const clientProjects = getClientProjects(locale);
  const conceptProjects = getConceptProjects(locale);

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
              <span className={styles.labLabel}>{t.labLabel}</span>
              <p className={styles.labDescription}>{t.labDescription}</p>
            </div>

            <ProjectGrid projects={conceptProjects} />
          </Container>
        </section>
      )}
    </>
  );
}

/* ---------- Proje detayı ---------- */

export function projectStaticParams(locale: Locale) {
  return getAllProjects(locale).map((project) => ({ slug: localizeSlug("projelerimiz", project.slug, locale) }));
}

function resolveProject(slug: string, locale: Locale) {
  const id = canonicalSlug("projelerimiz", decodeURIComponent(slug), locale);
  return id ? getProjectBySlug(id, locale) : undefined;
}

export function projectDetailMetadata(slug: string, locale: Locale): Metadata {
  const project = resolveProject(slug, locale);
  const t = getDictionary(locale);
  if (!project) return { title: t.pages.notFound.title };
  return pageMetadata(locale, `${project.title} ${t.projects.caseStudySuffix}`, project.summary, `/projelerimiz/${project.slug}`, project.cover);
}

export function ProjectDetailView({ slug, locale }: { slug: string; locale: Locale }) {
  setRequestLocale(locale);
  const project = resolveProject(slug, locale);
  if (!project) notFound();

  const nextProject = getAdjacentProject(project, locale);

  return (
    <>
      <ProjectDetailHero project={project} />

      <ProjectProblemApproach problem={project.problem} ourRole={project.ourRole} approach={project.approach} />

      <ProjectFeatureHighlight feature={project.featureHighlight} />

      <ProjectCaseStudy
        sections={project.caseStudy ?? []}
        gallery={project.imagesPending ? [] : project.gallery}
        outcomes={project.outcomes}
        liveUrl={project.liveUrl}
      />

      <NextProject project={nextProject} />
    </>
  );
}
