import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "@/i18n/Link";
import { canonicalSlug, localizePath, localizeSlug, type Locale } from "@/i18n/config";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { getAllServices, getServiceBySlug } from "@/data/services";
import { servicesPageContent } from "@/content/services-page";
import ServicesPage from "@/components/services/ServicesPage/ServicesPage";

export function servicesMetadata(locale: Locale) {
  const t = servicesPageContent[locale].meta;
  return pageMetadata(locale, t.title, t.description, "/hizmetler");
}

export default function ServicesView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  return <ServicesPage locale={locale} />;
}

/* ---------- Eski hizmet detay adresleri ----------
   Hizmetler artık tek sayfadır. Eski adresler (/hizmetler/web-gelistirme)
   kırılmasın diye her biri, Hizmetler sayfasındaki kendi kartına yönlendirir. */

export function serviceStaticParams(locale: Locale) {
  return getAllServices(locale).map((service) => ({ slug: localizeSlug("hizmetler", service.slug, locale) }));
}

function resolveService(slug: string, locale: Locale) {
  const id = canonicalSlug("hizmetler", decodeURIComponent(slug), locale);
  return id ? getServiceBySlug(id, locale) : undefined;
}

function targetOf(slug: string, locale: Locale) {
  return `${localizePath("/hizmetler/", locale)}#${localizeSlug("hizmetler", slug, locale)}`;
}

export function serviceDetailMetadata(slug: string, locale: Locale): Metadata {
  const service = resolveService(slug, locale);
  const base = servicesMetadata(locale);
  if (!service) return base;
  return { ...base, title: { absolute: `${service.title} | AKCY` }, robots: { index: false, follow: true } };
}

export function ServiceDetailView({ slug, locale }: { slug: string; locale: Locale }) {
  setRequestLocale(locale);
  const service = resolveService(slug, locale);
  if (!service) notFound();
  const target = targetOf(service.slug, locale);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <section style={{ padding: "180px 16px 120px", textAlign: "center" }}>
        <p style={{ margin: 0 }}>
          <Link href={`/hizmetler#${localizeSlug("hizmetler", service.slug, locale)}`}>{service.title}</Link>
        </p>
      </section>
    </>
  );
}
