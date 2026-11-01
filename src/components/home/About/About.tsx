"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import styles from "./About.module.scss";

const images = {
  tall: {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    alt: "Ekip halinde ürün üzerinde çalışma anı",
  },
  smallTop: {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    alt: "Arayüz tasarımı üzerinde çalışan tasarımcı",
  },
  smallBottom: {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=900&auto=format&fit=crop",
    alt: "Kod ekranı ve geliştirme ortamı",
  },
  wide: {
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop",
    alt: "Modern ofis ortamında ekip çalışması",
  },
};

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.collage}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.25, 1] }}
        >
          <div className={styles.collageTall}>
            <Image
              src={images.tall.src}
              alt={images.tall.alt}
              fill
              sizes="(max-width: 900px) 50vw, 24vw"
              className={styles.collageImage}
            />
          </div>

          <div className={styles.collageSmallTop}>
            <Image
              src={images.smallTop.src}
              alt={images.smallTop.alt}
              fill
              sizes="(max-width: 900px) 50vw, 18vw"
              className={styles.collageImage}
            />
          </div>

          <div className={styles.collageSmallBottom}>
            <Image
              src={images.smallBottom.src}
              alt={images.smallBottom.alt}
              fill
              sizes="(max-width: 900px) 50vw, 18vw"
              className={styles.collageImage}
            />
          </div>

          <div className={styles.collageWide}>
            <Image
              src={images.wide.src}
              alt={images.wide.alt}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.collageImage}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 0.8, 0.25, 1],
          }}
        >
          <span className={styles.eyebrow}>01 / HAKKIMIZDA</span>

          <h2 className={styles.heading}>
            Teknoloji, tasarım ve üretimi bir araya getiriyoruz.
          </h2>

          <div className={styles.text}>
            <p>
              AKCY olarak, markaların dijital
              dünyada güçlü ve sürdürülebilir bir varlık
              kurmasına yardımcı oluyoruz. Web, mobil, yapay
              zekâ ve otomasyon alanlarında uçtan uca ürünler
              geliştiriyoruz.
            </p>

            <p>
              Küçük bir ekip disipliniyle çalışıyor, her
              projede tasarım kalitesinden teknik doğruluğa
              kadar aynı titizliği gösteriyoruz. Amacımız
              fikirlerinizi ölçeklenebilir, kalıcı dijital
              ürünlere dönüştürmek.
            </p>
          </div>

          <Link href="/hakkimizda" className={styles.cta}>
            <span>Hakkımızda Daha Fazla</span>
            <b>→</b>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
