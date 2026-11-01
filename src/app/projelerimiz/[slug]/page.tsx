import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAdjacentProject,
  getAllProjects,
  getProjectBySlug,
} from "@/data/projects";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero/ProjectDetailHero";
import ProjectProblemApproach from "@/components/projects/ProjectProblemApproach/ProjectProblemApproach";
import ProjectFeatureHighlight from "@/components/projects/ProjectFeatureHighlight/ProjectFeatureHighlight";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy/ProjectCaseStudy";
import NextProject from "@/components/projects/NextProject/NextProject";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Proje Bulunamadı | AKCY" };
  }

  return pageMetadata(project.title + " Case Study", project.summary, `/projelerimiz/${project.slug}`, project.cover);
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getAdjacentProject(project);

  return (
    <>
      <ProjectDetailHero project={project} />

      <ProjectProblemApproach
        problem={project.problem}
        ourRole={project.ourRole}
        approach={project.approach}
      />

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
