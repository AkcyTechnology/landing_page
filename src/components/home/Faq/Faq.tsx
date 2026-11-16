import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";

import Container from "@/components/common/Container/Container";
import { StructuredData } from "@/lib/StructuredData";
import { faqSchema, graph } from "@/lib/schema";
import type { FaqItem } from "@/data/blog";

import styles from "./Faq.module.scss";

interface FaqProps {
  /* Verilmezse ana sayfanın SSS içeriği kullanılır (hizmet sayfaları kendi sorularını geçer) */
  items?: FaqItem[];
  label?: string;
  headingStart?: string;
  headingAccent?: string;
  intro?: string;
  id?: string;
  /* Sayfa başka bir şema grafiği içinde FAQPage basıyorsa false */
  withSchema?: boolean;
}

export default function Faq({ items, label, headingStart, headingAccent, intro, id = "sss", withSchema = true }: FaqProps = {}) {
  const t = getT().home.faq;
  const faqs = items ?? t.items;
  if (!faqs.length) return null;
  const headingId = `${id}-heading`;
  return (
    <section className={styles.section} id={id} aria-labelledby={headingId}>
      {withSchema && <StructuredData data={graph(faqSchema(faqs))} />}
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.label}>{label ?? t.label}</span>
            <h2 id={headingId}>{headingStart ?? t.headingStart} <span>{headingAccent ?? t.headingAccent}</span></h2>
            <p>{intro ?? t.intro}</p>
            <Link href="/iletisim" className={styles.link}>
              {t.cta} <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.list}>
            {faqs.map((item, index) => (
              <details key={item.question} className={styles.item} name={id} open={index === 0}>
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
