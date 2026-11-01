import { pageMetadata } from "@/lib/metadata";

import { getAllServices } from "@/data/services";
import Container from "@/components/common/Container/Container";
import ServicesHero from "@/components/services/ServicesHero/ServicesHero";
import ServiceRow from "@/components/services/ServiceRow/ServiceRow";

import styles from "./page.module.scss";

export const metadata = pageMetadata("Hizmetler", "Web geliştirme, mobil uygulama, UI/UX tasarım, yapay zekâ ve dijital otomasyon çözümleri.", "/hizmetler");

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <ServicesHero />

      <section className={styles.list}>
        <Container>
          {services.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </Container>
      </section>
    </>
  );
}
