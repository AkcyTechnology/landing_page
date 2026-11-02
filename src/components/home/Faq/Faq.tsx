import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";

import Container from "@/components/common/Container/Container";
import { StructuredData } from "@/lib/StructuredData";

import styles from "./Faq.module.scss";

export default function Faq() {
  const t = getT().home.faq;
  const faqs = t.items;
  return (
    <section className={styles.section} id="sss" aria-labelledby="faq-heading">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.label}>{t.label}</span>
            <h2 id="faq-heading">{t.headingStart} <span>{t.headingAccent}</span></h2>
            <p>{t.intro}</p>
            <Link href="/iletisim" className={styles.link}>
              {t.cta} <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.list}>
            {faqs.map((item, index) => (
              <details key={item.question} className={styles.item} name="faq" open={index === 0}>
                <summary>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
