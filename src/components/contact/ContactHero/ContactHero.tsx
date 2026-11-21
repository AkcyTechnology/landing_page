import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import ScrollToForm from "./ScrollToForm";
import PageHero from "@/components/common/PageHero/PageHero";
import styles from "./ContactHero.module.scss";

/*
  İletişim açılışı: ortak fotoğraflı hero (ekip fotoğrafı) ve altında
  sürecin üç adımı.
*/
export default function ContactHero() {
  const t = getT().contact.hero;

  return (
    <>
      <PageHero
        id="contact-hero-title"
        eyebrow={t.eyebrow}
        titleLead={t.titleLine1}
        titleAccent={t.titleLine2}
        description={t.description}
        image="/images/contact/hero-ekip.webp"
        objectPosition="62% 40%"
        mobilePosition="64% 22%"
      >
        <ScrollToForm className={styles.cta} label={t.cta} />
      </PageHero>

      <section className={styles.steps} aria-label={t.processLabel}>
        <Container>
          <div className={styles.stepsInner}>
            <p className={styles.stepsLabel}>{t.processLabel}</p>
            <ol className={styles.stepList}>
              {t.steps.map((step, index) => (
                <li key={step.title} data-reveal="" style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
