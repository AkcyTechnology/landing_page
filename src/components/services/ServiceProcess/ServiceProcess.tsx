import type { ServiceProcessStep } from "@/data/services";
import Container from "@/components/common/Container/Container";
import SectionLabel from "@/components/common/SectionLabel/SectionLabel";

import styles from "./ServiceProcess.module.scss";

interface ServiceProcessProps {
  steps: ServiceProcessStep[];
}

export default function ServiceProcess({ steps }: ServiceProcessProps) {
  return (
    <section className={styles.process}>
      <Container>
        <SectionLabel>03 / Süreç</SectionLabel>

        <h2 className={styles.heading}>Nasıl ilerliyoruz</h2>

        <div className={styles.list}>
          {steps.map((step) => (
            <div key={step.number} className={styles.item}>
              <span className={styles.number}>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
