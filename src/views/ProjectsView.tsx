import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalSlug, localizeSlug, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { baseUrl, pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/lib/StructuredData";
import { absoluteUrl, breadcrumbSchema, graph, ORGANIZATION_ID, schemaLanguage, webPageSchema } from "@/lib/schema";
import { getAdjacentProject, getAllProjects, getProjectBySlug } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { projectsPage } from "@/content/projects-page";
import ProjectsShowcase from "@/components/projects/ProjectsShowcase/ProjectsShowcase";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero/ProjectDetailHero";
import ProjectProblemApproach from "@/components/projects/ProjectProblemApproach/ProjectProblemApproach";
import ProjectFeatureHighlight from "@/components/projects/ProjectFeatureHighlight/ProjectFeatureHighlight";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy/ProjectCaseStudy";
import ProjectResults from "@/components/projects/ProjectResults/ProjectResults";
import OtherProjects from "@/components/projects/OtherProjects/OtherProjects";
import NextProject from "@/components/projects/NextProject/NextProject";


export function projectsMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.projects;
  return pageMetadata(locale, t.title, t.description, "/projelerimiz");
}

export default function ProjectsView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = getDictionary(locale);

  /* Projeler sayfası: koleksiyon sayfası + müşteri projelerinin listesi + breadcrumb */
  const schema = graph(
    webPageSchema({
      path: "/projelerimiz",
      locale,
      name: t.pages.projects.title,
      description: t.pages.projects.description,
      type: "CollectionPage",
    }),
    {
      "@type": "ItemList",
      itemListElement: getAllProjects(locale)
        .filter((project) => project.kind === "client")
        .map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: absoluteUrl(`/projelerimiz/${project.slug}`, locale),
        })),
    },
    breadcrumbSchema(
      [
        { name: t.nav.home, path: "/" },
        { name: t.nav.projects, path: "/projelerimiz" },
      ],
      locale
    )
  );

  return (
    <>
      <StructuredData data={schema} />
      <ProjectsShowcase content={projectsPage[locale]} />
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
  /* Konsept çalışmalar müşteri projesi değildir: sayfa kalır, arama sonuçlarına girmez */
  if (project.kind === "concept") {
    return pageMetadata(locale, project.title, project.summary, `/projelerimiz/${project.slug}`, project.cover, {
      noindex: true,
    });
  }
  return pageMetadata(locale, `${project.title} ${t.projects.caseStudySuffix}`, project.summary, `/projelerimiz/${project.slug}`, project.cover);
}

export function ProjectDetailView({ slug, locale }: { slug: string; locale: Locale }) {
  setRequestLocale(locale);
  const project = resolveProject(slug, locale);
  if (!project) notFound();

  const nextProject = getAdjacentProject(project, locale);
  const t = getDictionary(locale);
  const path = `/projelerimiz/${project.slug}`;
  const image = project.cover.src.startsWith("http") ? project.cover.src : `${baseUrl}${project.cover.src}`;

  /* Müşteri projeleri: AKCY'nin ürettiği iş olarak kuruluşa ve kullanılan hizmetlere bağlanır */
  const schema = graph(
    project.kind === "client" && {
      "@type": "CreativeWork",
      "@id": `${absoluteUrl(path, locale)}#project`,
      name: project.title,
      description: project.summary,
      url: absoluteUrl(path, locale),
      image,
      inLanguage: schemaLanguage[locale],
      dateCreated: project.year,
      creator: { "@id": ORGANIZATION_ID },
      ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
      about: (project.serviceIds ?? [])
        .map((id) => getServiceBySlug(id, locale))
        .filter(Boolean)
        .map((service) => ({ "@id": `${absoluteUrl(`/hizmetler/${service!.slug}`, locale)}#service` })),
    },
    breadcrumbSchema(
      [
        { name: t.nav.home, path: "/" },
        { name: t.nav.projects, path: "/projelerimiz" },
        { name: project.title, path },
      ],
      locale
    )
  );

  return (
    <>
      <StructuredData data={schema} />
      <ProjectDetailHero project={project} />

      <ProjectProblemApproach problem={project.problem} ourRole={project.ourRole} approach={project.approach} />

      <ProjectFeatureHighlight feature={project.featureHighlight} />

      <ProjectCaseStudy
        sections={project.caseStudy ?? []}
        gallery={project.imagesPending ? [] : project.gallery}
        outcomes={project.outcomes}
        liveUrl={project.liveUrl}
      />

      <ProjectResults metrics={project.metrics} testimonial={project.testimonial} />

      <OtherProjects currentHref={path} />

      <NextProject project={nextProject} />
    </>
  );
}
