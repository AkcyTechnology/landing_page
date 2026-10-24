import type { ServiceDef } from "@/data/services";
import Container from "@/components/common/Container/Container";
import SectionLabel from "@/components/common/SectionLabel/SectionLabel";

import styles from "./ServiceOverview.module.scss";

interface ServiceOverviewProps {
  service: ServiceDef;
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <section className={styles.overview}>
      <Container>
        <div className={styles.grid}>
          <div>
            <SectionLabel>01 / Genel Bakış</SectionLabel>
            <p className={styles.text}>{service.overview}</p>
          </div>

          <div>
            <SectionLabel>02 / Neler Yapıyoruz</SectionLabel>

            <ul className={styles.offerings}>
              {service.offerings.map((offering) => (
                <li key={offering}>{offering}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
