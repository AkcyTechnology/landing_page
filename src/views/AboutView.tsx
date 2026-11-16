import type { Locale } from "@/i18n/config";
import { setRequestLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/lib/StructuredData";
import { breadcrumbSchema, graph, ORGANIZATION_ID, webPageSchema } from "@/lib/schema";
import { aboutContent } from "@/content/about";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutIntro from "@/components/about/AboutIntro/AboutIntro";
import AboutValue from "@/components/about/AboutValue/AboutValue";
import AboutProcess from "@/components/about/AboutProcess/AboutProcess";

export function aboutMetadata(locale: Locale) {
  const meta = aboutContent[locale].meta;
  return pageMetadata(locale, meta.title, meta.description, "/hakkimizda");
}

export default function AboutView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const content = aboutContent[locale];
  const introId = locale === "tr" ? "biz-kimiz" : "who-we-are";

  const nav = getDictionary(locale).nav;
  const schema = graph(
    webPageSchema({
      path: "/hakkimizda",
      locale,
      name: content.meta.title,
      description: content.meta.description,
      type: "AboutPage",
      about: { "@id": ORGANIZATION_ID },
    }),
    breadcrumbSchema(
      [
        { name: nav.home, path: "/" },
        { name: content.meta.title, path: "/hakkimizda" },
      ],
      locale
    )
  );

  return (
    <>
      <StructuredData data={schema} />
      <AboutHero content={content.hero} pageName={content.meta.title} />
      <AboutIntro id={introId} content={content.intro} />
      <AboutValue content={content.value} />
      <AboutProcess content={content.process} />
    </>
  );
}
