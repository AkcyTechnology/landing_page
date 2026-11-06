import Image from "next/image";

import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import ScrollToForm from "./ScrollToForm";
import styles from "./ContactHero.module.scss";

/*
  İletişim açılışı: sitenin lacivert–mavi–turkuaz tonlarına göre yeniden
  renklendirilmiş ekip fotoğrafı, solda buzlu cam panel ve başlık.
  Altında sürecin üç adımı yer alır.
*/
export default function ContactHero() {
  const t = getT().contact.hero;

  return (
    <>
      <section className={styles.hero} aria-labelledby="contact-hero-title">
        <Image
          src="/images/contact/hero-ekip.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.photo}
        />
        <span className={styles.shade} aria-hidden="true" />
        <span className={styles.grid} aria-hidden="true" />

        <Container className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>{t.eyebrow}</span>
            <h1 id="contact-hero-title" className={styles.title}>
              <span>{t.titleLine1}</span>
              <span className={styles.accent}>{t.titleLine2}</span>
            </h1>
            <p className={styles.text}>{t.description}</p>
            <ScrollToForm className={styles.cta} label={t.cta} />
          </div>
        </Container>
      </section>

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
