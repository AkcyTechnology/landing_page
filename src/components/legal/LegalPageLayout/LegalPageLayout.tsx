import type { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/common/Container/Container";
import LegalContents from "./LegalContents";
import styles from "./LegalPageLayout.module.scss";

export interface LegalSection { id: string; title: string; content: ReactNode; }
interface LegalPageProps { title: string; introduction: string; sections: LegalSection[]; }

export default function LegalPageLayout({ title, introduction, sections }: LegalPageProps) {
  return <div className={styles.page}>
    <header className={styles.hero}><Container>
      <span className={styles.label}>YASAL / AKCY</span>
      <h1>{title}</h1>
      <p>Verilerinizin nasıl işlendiği ve korunduğu hakkında şeffaf bilgi.</p>
      <div className={styles.updated}>Son Güncelleme <span aria-hidden="true">/</span> <time dateTime="2026-10-03">03.10.2026</time></div>
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
        <div className={styles.contact}><h2>Sorunuz mu var?</h2><p>Kişisel verileriniz veya gizlilik uygulamalarımız hakkında bizimle iletişime geçebilirsiniz.</p><Link href="/iletisim">Bizimle İletişime Geçin <span aria-hidden="true">↗</span></Link></div>
      </article>
    </div></Container>
  </div>;
}
