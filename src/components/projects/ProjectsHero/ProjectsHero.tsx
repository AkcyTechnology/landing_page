"use client";

import { motion } from "motion/react";

import SectionLabel from "@/components/common/SectionLabel/SectionLabel";
import Container from "@/components/common/Container/Container";

import styles from "./ProjectsHero.module.scss";

export default function ProjectsHero() {
  return (
    <section className={styles.hero}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.25, 1] }}
        >
          <SectionLabel>Projeler</SectionLabel>

          <h1 className={styles.heading}>Gerçek işler, canlıdaki ürünler.</h1>

          <p className={styles.description}>
            Web, mobil, tasarım ve dijital ürün alanlarında geliştirdiğimiz
            seçili çalışmalar.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
