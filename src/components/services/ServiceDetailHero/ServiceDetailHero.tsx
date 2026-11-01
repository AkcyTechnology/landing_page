import Image from "next/image";

import type { ServiceDef } from "@/data/services";
import Container from "@/components/common/Container/Container";

import styles from "./ServiceDetailHero.module.scss";

interface ServiceDetailHeroProps {
  service: ServiceDef;
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>
              {service.number} / {service.title.toLocaleUpperCase("tr")}
            </span>

            <h1 className={styles.heading}>{service.heroDescription}</h1>

            <p className={styles.description}>{service.shortDescription}</p>
          </div>

          <div className={styles.imageFrame}>
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(max-width: 1050px) 100vw, 45vw"
              className={styles.image}
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
