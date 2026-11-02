import { pageMetadata } from "@/lib/metadata";
import { aboutContent } from "@/content/about";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutIntro from "@/components/about/AboutIntro/AboutIntro";
import AboutValue from "@/components/about/AboutValue/AboutValue";
import AboutProcess from "@/components/about/AboutProcess/AboutProcess";
import AboutPrinciples from "@/components/about/AboutPrinciples/AboutPrinciples";
import AboutClosing from "@/components/about/AboutClosing/AboutClosing";

/* Site şimdilik yalnızca Türkçe yayında; İngilizce sözlük aynı yapıda hazır */
const content = aboutContent.tr;

export const metadata = pageMetadata(content.meta.title, content.meta.description, "/hakkimizda");

export default function AboutPage() {
  return (
    <>
      <AboutHero content={content.hero} nextSectionId="biz-kimiz" />
      <AboutIntro id="biz-kimiz" content={content.intro} />
      <AboutValue content={content.value} />
      <AboutProcess content={content.process} />
      <AboutPrinciples content={content.principles} />
      <AboutClosing content={content.closing} />
    </>
  );
}
