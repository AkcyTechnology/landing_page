"use client";

import styles from "./WhyAKCY.module.scss";

const values = [
  {
    title: "İhtiyaca Özel Çözüm",
    description:
      "Şablon çözümler yerine, işletmenizin spesifik sorunlarını çözen özel sistemler geliştiririz.",
  },
  {
    title: "Mevcut Sistemlerle Entegrasyon",
    description:
      "Yeni altyapı oluşturmak yerine, halihazırda kullandığınız araçları daha akıllı hale getiririz.",
  },
  {
    title: "Ölçülebilir İş Sonucu",
    description:
      "Zaman tasarrufu, maliyet düşüşü, verimlilikte artış — sonuçlar rakamlarla konuşur.",
  },
  {
    title: "Uçtan Uca Geliştirme",
    description:
      "Fikir aşamasından canlı sisteme kadar tüm süreci yönetir, devamlı destek sağlarız.",
  },
];

export default function WhyAKCY() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>04 / NEDEN AKCY?</span>
          <h2 className={styles.heading}>Neden AKCY?</h2>
        </div>

        <div className={styles.grid}>
          {values.map((value, index) => (
            <article key={index} className={styles.item}>
              <div className={styles.dot} />
              <h3 className={styles.title}>{value.title}</h3>
              <p className={styles.description}>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
