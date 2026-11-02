import Image from "next/image";
import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";

import type { ServiceDef } from "@/data/services";

import styles from "./ServiceRow.module.scss";

interface ServiceRowProps {
  service: ServiceDef;
}

export default function ServiceRow({ service }: ServiceRowProps) {
  return (
    <Link
      href={`/hizmetler/${service.slug}`}
      className={styles.row}
    >
      <span className={styles.number}>{service.number}</span>

      <div className={styles.content}>
        <h3 className={styles.title}>{service.title}</h3>

        <p className={styles.description}>{service.shortDescription}</p>

        <span className={styles.offerings}>
          {service.offerings.slice(0, 4).join(" · ")}
        </span>

        <span className={styles.cta}>
          <span>{getT().services.rowCta}</span>
          <b aria-hidden="true">↗</b>
        </span>
      </div>

      <div className={styles.imageFrame}>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(max-width: 1050px) 100vw, 320px"
          className={styles.image}
        />
      </div>
    </Link>
  );
}
