import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalSlug, localizeSlug, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { getAdjacentProject, getAllProjects, getProjectBySlug } from "@/data/projects";
import { projectsPage } from "@/content/projects-page";
import ProjectsShowcase from "@/components/projects/ProjectsShowcase/ProjectsShowcase";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero/ProjectDetailHero";
import ProjectProblemApproach from "@/components/projects/ProjectProblemApproach/ProjectProblemApproach";
import ProjectFeatureHighlight from "@/components/projects/ProjectFeatureHighlight/ProjectFeatureHighlight";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy/ProjectCaseStudy";
import NextProject from "@/components/projects/NextProject/NextProject";


export function projectsMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.projects;
  return pageMetadata(locale, t.title, t.description, "/projelerimiz");
}

export default function ProjectsView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  return <ProjectsShowcase content={projectsPage[locale]} />;
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
