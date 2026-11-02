import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalSlug, localizeSlug, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { getAllServices, getServiceBySlug } from "@/data/services";
import { getAllProjects } from "@/data/projects";
import Container from "@/components/common/Container/Container";
import ServicesHero from "@/components/services/ServicesHero/ServicesHero";
import ServiceRow from "@/components/services/ServiceRow/ServiceRow";
import ServiceDetailHero from "@/components/services/ServiceDetailHero/ServiceDetailHero";
import ServiceOverview from "@/components/services/ServiceOverview/ServiceOverview";
import ServiceScope from "@/components/services/ServiceScope/ServiceScope";
import ServiceProcess from "@/components/services/ServiceProcess/ServiceProcess";
import ServiceTechnologies from "@/components/services/ServiceTechnologies/ServiceTechnologies";
import RelatedProjects from "@/components/services/RelatedProjects/RelatedProjects";
import SectionCTA from "@/components/common/SectionCTA/SectionCTA";

import styles from "./ServicesView.module.scss";

export function servicesMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.services;
  return pageMetadata(locale, t.title, t.description, "/hizmetler");
}

export default function ServicesView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const services = getAllServices(locale);

  return (
    <>
      <ServicesHero />

      <section className={styles.list}>
        <Container>
          {services.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </Container>
      </section>
    </>
  );
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
  const t = getDictionary(locale);
  const service = resolveService(slug, locale);
  if (!service) notFound();

  const relatedProjects = getAllProjects(locale)
    .filter(
      (project) =>
        project.kind === "client" &&
        (project.serviceIds?.includes(service.slug) || (service.slug === "web-gelistirme" && project.category === "web"))
    )
    .slice(0, 3);

  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceOverview service={service} />
      <ServiceScope service={service} />
      <ServiceProcess steps={service.process} />
      <ServiceTechnologies technologies={service.technologies} />
      <RelatedProjects projects={relatedProjects} />

      <SectionCTA eyebrow={t.services.ctaEyebrow} title={t.services.ctaTitle} />
    </>
  );
}
