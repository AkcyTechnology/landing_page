import Link from "@/i18n/Link";

import Container from "@/components/common/Container/Container";

import styles from "./SectionCTA.module.scss";

interface SectionCTAProps {
  eyebrow: string;
  title: string;
  href?: string;
}

export default function SectionCTA({
  eyebrow,
  title,
  href = "/iletisim",
}: SectionCTAProps) {
  return (
    <section className={styles.cta}>
      <Container>
        <span className={styles.eyebrow}>{eyebrow}</span>

        <Link href={href} className={styles.link}>
          <span>{title}</span>
          <b aria-hidden="true">↗</b>
        </Link>
      </Container>
    </section>
  );
}
