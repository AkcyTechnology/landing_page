import Link from "next/link";

import Container from "@/components/common/Container/Container";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <Container>
        <span className={styles.eyebrow}>404</span>

        <h1 className={styles.heading}>Bu sayfa burada değil.</h1>

        <p className={styles.description}>
          Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
        </p>

        <Link href="/" className={styles.link}>
          <span>Ana Sayfaya Dön</span>
          <b aria-hidden="true">↗</b>
        </Link>

        <nav className={styles.shortcuts} aria-label="Sık ziyaret edilen sayfalar">
          <Link href="/hizmetler">Hizmetler</Link>
          <Link href="/projelerimiz">Projelerimiz</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>
      </Container>
    </section>
  );
}
