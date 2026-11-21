import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/lib/StructuredData";
import { breadcrumbSchema, graph, ORGANIZATION_ID, webPageSchema } from "@/lib/schema";
import DropWords, { dropWordCount } from "@/components/common/DropWords/DropWords";
import QuoteWizard from "@/components/quote/QuoteWizard/QuoteWizard";
import styles from "@/components/quote/QuoteHero/QuoteHero.module.scss";

export function quoteMetadata(locale: Locale) {
  const t = getDictionary(locale).quoteWizard;
  return pageMetadata(locale, t.pageTitle, t.pageDescription, "/teklif");
}

/* Teklif sayfası: kısa petrol başlık bandı ve üzerine binen adım adım form */
export default function QuoteView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = getDictionary(locale);
  const q = t.quoteWizard;
  const schema = graph(
    webPageSchema({
      path: "/teklif",
      locale,
      name: q.pageTitle,
      description: q.pageDescription,
      type: "ContactPage",
      about: { "@id": ORGANIZATION_ID },
    }),
    breadcrumbSchema(
      [
        { name: t.nav.home, path: "/" },
        { name: q.pageTitle, path: "/teklif" },
      ],
      locale
    )
  );

  return (
    <>
      <StructuredData data={schema} />
      <section className={styles.hero} aria-labelledby="quote-title">
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{q.eyebrow}</p>
          <h1 id="quote-title" className={styles.title}>
            <DropWords text={q.titleLead} />{" "}
            <span className={styles.accent}>
              <DropWords text={q.titleAccent} start={dropWordCount(q.titleLead)} />
            </span>
          </h1>
          <p className={styles.text}>{q.intro}</p>
        </div>
      </section>
      <section className={styles.wizardArea}>
        <div className={styles.inner}>
          <QuoteWizard />
        </div>
      </section>
    </>
  );
}
