"use client";

import Image from "next/image";
import { motion } from "motion/react";

import Container from "@/components/common/Container/Container";

import styles from "./AboutApproach.module.scss";

const steps = [
  {
    number: "01",
    title: "ANLA",
    description:
      "İş akışını, kullanıcıyı ve gerçek problemi anlamadan çözüm tasarlamayız.",
  },
  {
    number: "02",
    title: "TASARLA",
    description:
      "Karmaşık süreçleri sade, anlaşılır ve kullanılabilir dijital deneyimlere dönüştürürüz.",
  },
  {
    number: "03",
    title: "GELİŞTİR",
    description:
      "Tasarladığımız sistemi modern teknolojilerle çalışan, ölçeklenebilir bir ürüne dönüştürürüz.",
  },
];

export default function AboutApproach() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <span className={styles.eyebrow}>02 / YAKLAŞIMIMIZ</span>

          <h2 className={styles.heading}>Fikirden çalışan sisteme.</h2>

          <p className={styles.description}>
            Bir ihtiyacı yalnızca tasarım problemi olarak görmüyoruz. Süreci
            analiz ediyor, doğru teknolojiyi seçiyor ve tasarımdan
            geliştirmeye kadar çalışan bir dijital deneyime dönüştürüyoruz.
          </p>
        </div>

        <div className={styles.workflowVisual}>
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
            alt="Ekip halinde tasarım ve geliştirme sürecinde çalışma anı"
            fill
            sizes="(max-width: 1050px) 100vw, 1100px"
            className={styles.workflowImage}
          />
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className={styles.step}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 0.8, 0.25, 1],
              }}
            >
              <span className={styles.number}>{step.number}</span>

              <h3 className={styles.stepTitle}>{step.title}</h3>

              <p className={styles.stepText}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
