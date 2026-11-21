import type { CSSProperties } from "react";

import { getAllServices } from "@/data/services";
import { getLocale, getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import styles from "./TechBand.module.scss";

/*
  Teknoloji bandı: hizmetlerde kullandığımız teknolojiler (src/data/services.ts
  › technologies) tekrarsız, sade bir şerit halinde. Liste veriden üretilir;
  hizmetlere teknoloji eklendikçe band kendiliğinden güncellenir.
  Bant ekrana girince isimler sırayla maskenin altından yukarı kayarak açılır
  (RevealObserver › data-in). JS kapalıysa isimler doğrudan görünür.
*/
export default function TechBand() {
  const t = getT().home.techBand;
  const technologies = [...new Set(getAllServices(getLocale()).flatMap((service) => service.technologies))];

  return (
    <section className={styles.band} aria-labelledby="tech-band-title" data-reveal="">
      <Container className={styles.inner}>
        <p id="tech-band-title" className={styles.label}>{t.label}</p>
        <ul className={styles.list}>
          {technologies.map((name, index) => (
            <li key={name} style={{ "--i": index } as CSSProperties}>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
