import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";
import PageHero from "@/components/common/PageHero/PageHero";
import type { AboutContent } from "@/content/about";

import styles from "./AboutHero.module.scss";

interface AboutHeroProps {
  content: AboutContent["hero"];
  pageName: string;
}

/*
  Hakkımızda açılışı: ortak fotoğraflı hero (ürün akışı çizilen bir masa).
  Başlığın son satırı turkuaz vurguyla gösterilir.
*/
export default function AboutHero({ content, pageName }: AboutHeroProps) {
  const lines = content.titleLines;
  const lead = lines.slice(0, -1).join(" ");
  const accent = lines.at(-1);

  return (
    <PageHero
      id="about-hero-title"
      eyebrow={content.eyebrow}
      titleLead={lead || accent || ""}
      titleAccent={lead ? accent : undefined}
      description={content.description}
      image="/images/solutions/automation.jpg"
      objectPosition="65% 50%"
      breadcrumb={{ label: getT().blog.detail.breadcrumb, homeLabel: content.breadcrumb, current: pageName }}
    >
      <Link href="/teklif" className={styles.primary}>
        {content.primaryCta}
        <span aria-hidden="true">→</span>
      </Link>
    </PageHero>
  );
}
