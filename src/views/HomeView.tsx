import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/lib/StructuredData";
import { graph, ORGANIZATION_ID, webPageSchema } from "@/lib/schema";
import Hero from "@/components/home/Hero/Hero";
import ProblemsSolved from "@/components/home/ProblemsSolved/ProblemsSolved";
import ProjectShowcase from "@/components/home/ProjectShowcase/ProjectShowcase";
import { WorkProcess, CapabilitiesOverview } from "@/components/home/StudioOverview/StudioOverview";
import Faq from "@/components/home/Faq/Faq";

export function homeMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.home;
  return pageMetadata(locale, t.title, t.description, "/");
}

export default function HomeView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = getDictionary(locale).pages.home;
  /* Ana sayfa: kuruluşu konu alan sayfa (kuruluş ve site şeması SiteShell'de) */
  const schema = graph(
    webPageSchema({ path: "/", locale, name: t.title, description: t.description, about: { "@id": ORGANIZATION_ID } })
  );
  return (
    <>
      <StructuredData data={schema} />
      <Hero />
      <ProjectShowcase />
      <ProblemsSolved />
      <WorkProcess />
      <CapabilitiesOverview />
      <Faq />
    </>
  );
}
