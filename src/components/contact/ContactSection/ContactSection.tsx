import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import ContactInfo from "@/components/contact/ContactInfo/ContactInfo";
import ContactForm from "@/components/contact/ContactForm/ContactForm";

import styles from "./ContactSection.module.scss";

export default function ContactSection() {
  const t = getT().contact.section;
  return (
    <section className={styles.section} id="proje-formu">
      <Container>
        <div className={styles.wrapper}>
          <ContactInfo />

          <div className={styles.formArea}>
            <div className={styles.formHeader}>
              <span>{t.eyebrow}</span>
              <h2>{t.heading}</h2>
              <p>
                {t.description}
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}