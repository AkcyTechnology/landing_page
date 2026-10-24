import Container from "@/components/common/Container/Container";
import ContactInfo from "@/components/contact/ContactInfo/ContactInfo";
import ContactForm from "@/components/contact/ContactForm/ContactForm";

import styles from "./ContactSection.module.scss";

export default function ContactSection() {
  return (
    <section className={styles.section} id="proje-formu">
      <Container>
        <div className={styles.wrapper}>
          <ContactInfo />

          <div className={styles.formArea}>
            <div className={styles.formHeader}>
              <span>PROJENİZİ ANLATIN</span>
              <h2>Nasıl yardımcı olabiliriz?</h2>
              <p>
                Projeniz hakkında birkaç detay paylaşın; ihtiyacınızı
                inceleyip sizinle iletişime geçelim.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}