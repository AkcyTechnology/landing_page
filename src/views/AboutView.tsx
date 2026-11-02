import type { Locale } from "@/i18n/config";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { aboutContent } from "@/content/about";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutIntro from "@/components/about/AboutIntro/AboutIntro";
import AboutValue from "@/components/about/AboutValue/AboutValue";
import AboutProcess from "@/components/about/AboutProcess/AboutProcess";
import AboutPrinciples from "@/components/about/AboutPrinciples/AboutPrinciples";
import AboutClosing from "@/components/about/AboutClosing/AboutClosing";

export function aboutMetadata(locale: Locale) {
  const meta = aboutContent[locale].meta;
  return pageMetadata(locale, meta.title, meta.description, "/hakkimizda");
}

export default function AboutView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const content = aboutContent[locale];
  const introId = locale === "tr" ? "biz-kimiz" : "who-we-are";

  return (
    <>
      <AboutHero content={content.hero} nextSectionId={introId} />
      <AboutIntro id={introId} content={content.intro} />
      <AboutValue content={content.value} />
      <AboutProcess content={content.process} />
      <AboutPrinciples content={content.principles} />
      <AboutClosing content={content.closing} />
    </>
  );
}
