import Container from "@/components/common/Container/Container";
import SectionLabel from "@/components/common/SectionLabel/SectionLabel";

import styles from "./ServiceTechnologies.module.scss";

interface ServiceTechnologiesProps {
  technologies: string[];
}

export default function ServiceTechnologies({
  technologies,
}: ServiceTechnologiesProps) {
  if (technologies.length === 0) return null;

  return (
    <section className={styles.technologies}>
      <Container>
        <SectionLabel>04 / Teknolojiler</SectionLabel>

        <ul className={styles.list}>
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
