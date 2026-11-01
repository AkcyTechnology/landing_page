"use client";

import Image from "next/image";
import { motion } from "motion/react";

import styles from "./ClientReferences.module.scss";

export interface ClientReference {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
}

interface ViewProps {
  references: (ClientReference & { hasLogo: boolean })[];
}

/* Logo dosyası yoksa marka adının baş harfleri gösterilir */
function LogoMark({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return <span className={styles.logoFallback}>{initials}</span>;
}

export default function ClientReferencesView({ references }: ViewProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>06 / MÜŞTERİLER</span>
          <h2 className={styles.heading}>Bize Güvenen Markalar</h2>
        </div>

        <div className={styles.grid}>
          {references.map((ref, index) => (
            <motion.article
              key={ref.id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 0.8, 0.25, 1],
              }}
            >
              <div className={styles.logoArea}>
                {ref.hasLogo ? (
                  <Image
                    src={ref.logo}
                    alt={`${ref.name} logosu`}
                    width={280}
                    height={120}
                    className={styles.logo}
                    loading="lazy"
                  />
                ) : (
                  <LogoMark name={ref.name} />
                )}
              </div>

              <div className={styles.content}>
                <span className={styles.category}>{ref.category}</span>

                <h3 className={styles.name}>{ref.name}</h3>

                <p className={styles.description}>{ref.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
