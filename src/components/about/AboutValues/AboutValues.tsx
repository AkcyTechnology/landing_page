"use client";

import Image from "next/image";
import { motion } from "motion/react";

import Container from "@/components/common/Container/Container";

import styles from "./AboutValues.module.scss";

const values = [
  {
    number: "01",
    title: "Kalite önce gelir",
    description:
      "Her projede tasarım kalitesinden teknik doğruluğa kadar ayrıntıya önem veririz.",
  },
  {
    number: "02",
    title: "Şeffaf iş birliği",
    description:
      "Süreç boyunca net iletişim kurar, kararların arkasındaki mantığı paylaşırız.",
  },
  {
    number: "03",
    title: "Sürdürülebilir mimari",
    description:
      "Bugünün ihtiyacını çözerken yarının değişimine uyum sağlayabilecek sistemler tasarlarız.",
  },
  {
    number: "04",
    title: "Ölçülebilir sonuç",
    description:
      "Sadece estetik çıktılar değil, işletme açısından gerçek fayda sağlayan ürünler geliştiririz.",
  },
];

export default function AboutValues() {
  return (
    <section className={styles.values}>
      <Container>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>04 / ÇALIŞMA PRENSİPLERİ</span>

            <h2 className={styles.heading}>
              Karmaşıklığı azaltır,
              <br />
              sonuca odaklanırız.
            </h2>
          </div>

          <div className={styles.headerVisual}>
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop"
              alt="Arayüz tasarımı üzerinde çalışan tasarımcı"
              fill
              sizes="(max-width: 900px) 100vw, 32vw"
              className={styles.headerVisualImage}
            />
          </div>
        </div>

        <div className={styles.list}>
          {values.map((value, index) => (
            <motion.div
              key={value.number}
              className={styles.item}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: (index % 2) * 0.08,
                ease: [0.22, 0.8, 0.25, 1],
              }}
            >
              <span className={styles.number}>{value.number}</span>

              <div className={styles.body}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
