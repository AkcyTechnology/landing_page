import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllServices, getServiceBySlug } from "@/data/services";
import { getAllProjects } from "@/data/projects";
import ServiceDetailHero from "@/components/services/ServiceDetailHero/ServiceDetailHero";
import ServiceOverview from "@/components/services/ServiceOverview/ServiceOverview";
import ServiceScope from "@/components/services/ServiceScope/ServiceScope";
import ServiceProcess from "@/components/services/ServiceProcess/ServiceProcess";
import ServiceTechnologies from "@/components/services/ServiceTechnologies/ServiceTechnologies";
import RelatedProjects from "@/components/services/RelatedProjects/RelatedProjects";
import SectionCTA from "@/components/common/SectionCTA/SectionCTA";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Hizmet Bulunamadı | AKCY" };
  }

  return pageMetadata(service.title, service.shortDescription, `/hizmetler/${service.slug}`, service.image);
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = getAllProjects()
    .filter((project) => project.kind === "client" && (project.servicesUsed.includes(service.title) || (service.slug === "web-gelistirme" && project.category === "web")))
    .slice(0, 3);

  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceOverview service={service} />
      <ServiceScope service={service} />
      <ServiceProcess steps={service.process} />
      <ServiceTechnologies technologies={service.technologies} />
      <RelatedProjects projects={relatedProjects} />

      <SectionCTA
        eyebrow="BİR PROJENİZ Mİ VAR?"
        title="Birlikte hayata geçirelim."
      />
    </>
  );
}
