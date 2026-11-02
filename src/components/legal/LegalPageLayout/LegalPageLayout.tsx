import type { ReactNode } from "react";
import Link from "@/i18n/Link";
import { getLocale, getT } from "@/i18n/server";
import { dateLocale } from "@/i18n/config";
import Container from "@/components/common/Container/Container";
import LegalContents from "./LegalContents";
import styles from "./LegalPageLayout.module.scss";

export interface LegalSection { id: string; title: string; content: ReactNode; }
interface LegalPageProps { title: string; introduction: string; sections: LegalSection[]; }

export default function LegalPageLayout({ title, introduction, sections }: LegalPageProps) {
  const t = getT().legal;
  const updated = new Date("2026-10-03").toLocaleDateString(dateLocale[getLocale()], { day: "2-digit", month: "2-digit", year: "numeric" });
  return <div className={styles.page}>
    <header className={styles.hero}><Container>
      <span className={styles.label}>{t.label}</span>
      <h1>{title}</h1>
      <p>{t.subtitle}</p>
      <div className={styles.updated}>{t.updated} <span aria-hidden="true">/</span> <time dateTime="2026-10-03">{updated}</time></div>
    </Container></header>
    <Container><div className={styles.layout}>
      <LegalContents sections={sections.map(({id, title}) => ({id, title}))} />
      <article className={styles.content}>
        <p className={styles.introduction}>{introduction}</p>
        {sections.map((section, index) => <section className={styles.textSection} id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <h2 id={`${section.id}-heading`}>{section.title}</h2>
          {section.content}
        </section>)}
        <div className={styles.contact}><h2>{t.questionTitle}</h2><p>{t.questionText}</p><Link href="/iletisim" className={styles.contactCta}>{t.cta} <span aria-hidden="true">↗</span></Link></div>
      </article>
    </div></Container>
  </div>;
}
