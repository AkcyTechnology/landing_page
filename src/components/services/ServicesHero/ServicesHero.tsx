"use client";

import { motion } from "motion/react";

import SectionLabel from "@/components/common/SectionLabel/SectionLabel";
import Container from "@/components/common/Container/Container";

import styles from "./ServicesHero.module.scss";

export default function ServicesHero() {
  return (
    <section className={styles.hero}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.25, 1] }}
        >
          <SectionLabel>Hizmetler</SectionLabel>

          <h1 className={styles.heading}>
            Fikirden ürüne, dijital sürecin her aşamasında yanınızdayız.
          </h1>

          <p className={styles.description}>
            Web, mobil, tasarım, yapay zekâ ve otomasyon çözümlerini tek
            bir ürün yaklaşımı altında bir araya getiriyoruz.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
