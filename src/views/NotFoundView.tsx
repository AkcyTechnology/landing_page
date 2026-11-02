import Link from "@/i18n/Link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Container from "@/components/common/Container/Container";

import styles from "./NotFoundView.module.scss";

export default function NotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).notFound;
  const nav = getDictionary(locale).nav;
  return (
    <section className={styles.section}>
      <Container>
        <span className={styles.eyebrow}>404</span>

        <h1 className={styles.heading}>{t.title}</h1>

        <p className={styles.description}>{t.description}</p>

        <Link href="/" className={styles.link}>
          <span>{t.home}</span>
          <b aria-hidden="true">↗</b>
        </Link>

        <nav className={styles.shortcuts} aria-label={t.shortcutsLabel}>
          <Link href="/hizmetler">{nav.services}</Link>
          <Link href="/projelerimiz">{nav.projects}</Link>
          <Link href="/iletisim">{nav.contact}</Link>
        </nav>
      </Container>
    </section>
  );
}
