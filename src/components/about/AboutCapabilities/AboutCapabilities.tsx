"use client";

import Image from "next/image";
import { services } from "@/data/services";
import { motion } from "motion/react";

import Container from "@/components/common/Container/Container";

import styles from "./AboutCapabilities.module.scss";

const capabilities = services.map(service => ({ title: service.title, description: service.shortDescription }));

export default function AboutCapabilities() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span className={styles.eyebrow}>03 / YETKİNLİKLER</span>

          <h2 className={styles.heading}>Tek bir disipline bağlı değiliz.</h2>
        </div>

        <div className={styles.capabilitiesVisual}>
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1800&auto=format&fit=crop"
            alt="Modern ofis ortamında ekip çalışması"
            fill
            sizes="(max-width: 1050px) 100vw, 1200px"
            className={styles.capabilitiesImage}
          />
        </div>

        <div className={styles.grid}>
          {capabilities.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.08,
                ease: [0.22, 0.8, 0.25, 1],
              }}
            >
              <h3 className={styles.title}>{item.title}</h3>

              <p className={styles.text}>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
