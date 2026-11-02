"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "@/i18n/Link";

import styles from "./Services.module.scss";
import { services as servicesData } from "@/data/services";

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>03 / HİZMETLER</span>

          <h2 className={styles.heading}>Neler Yapıyoruz</h2>
        </div>

        <div className={styles.list}>
          {servicesData.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={service.id} className={styles.row}>
                <button
                  type="button"
                  className={styles.rowHeader}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.number}>
                    {service.number}
                  </span>

                  <span className={styles.title}>
                    {service.title}
                  </span>

                  <span
                    className={`${styles.icon} ${
                      isOpen ? styles.iconOpen : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.rowBody}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 0.8, 0.25, 1],
                      }}
                    >
                      <div className={styles.rowBodyInner}>
                        <p className={styles.description}>
                          {service.heroDescription}
                        </p>

                        <div className={styles.items}>
                          {service.offerings.map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>

                        <Link
                          href={`/hizmetler/${service.slug}`}
                          className={styles.learnMore}
                        >
                          Detay Sayfasını Gör →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
