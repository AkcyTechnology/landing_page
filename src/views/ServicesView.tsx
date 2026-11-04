import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalSlug, localizeSlug, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { getAllServices, getServiceBySlug } from "@/data/services";
import { getAllProjects } from "@/data/projects";
import ServicesLanding from "@/components/services/ServicesLanding/ServicesLanding";
import {
  ServiceHero,
  ServiceNext,
  ServiceOffer,
  ServiceProcessSection,
  ServiceScopeSection,
  ServiceTech,
} from "@/components/services/ServiceDetail/ServiceDetail";
import RelatedProjects from "@/components/services/RelatedProjects/RelatedProjects";

export function servicesMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.services;
  return pageMetadata(locale, t.title, t.description, "/hizmetler");
}

export default function ServicesView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  return <ServicesLanding services={getAllServices(locale)} />;
}

/* ---------- Hizmet detayı ---------- */

export function serviceStaticParams(locale: Locale) {
  return getAllServices(locale).map((service) => ({ slug: localizeSlug("hizmetler", service.slug, locale) }));
}

function resolveService(slug: string, locale: Locale) {
  const id = canonicalSlug("hizmetler", decodeURIComponent(slug), locale);
  return id ? getServiceBySlug(id, locale) : undefined;
}

export function serviceDetailMetadata(slug: string, locale: Locale): Metadata {
  const service = resolveService(slug, locale);
  if (!service) return { title: getDictionary(locale).pages.notFound.title };
  return pageMetadata(locale, service.title, service.shortDescription, `/hizmetler/${service.slug}`, service.image);
}

export function ServiceDetailView({ slug, locale }: { slug: string; locale: Locale }) {
  setRequestLocale(locale);
  const service = resolveService(slug, locale);
  if (!service) notFound();

  const all = getAllServices(locale);
  const next = all[(all.findIndex((item) => item.slug === service.slug) + 1) % all.length];

  const relatedProjects = getAllProjects(locale)
    .filter(
      (project) =>
        project.kind === "client" &&
        (project.serviceIds?.includes(service.slug) || (service.slug === "web-gelistirme" && project.category === "web"))
    )
    .slice(0, 3);

  return (
    <>
      <ServiceHero service={service} total={all.length} />
      <ServiceOffer service={service} />
      <ServiceScopeSection service={service} />
      <ServiceProcessSection service={service} />
      <ServiceTech technologies={service.technologies} />
      <RelatedProjects projects={relatedProjects} />
      <ServiceNext service={next} />
    </>
  );
}
