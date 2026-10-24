"use client";

import styles from "./NewsletterCTA.module.scss";

export default function NewsletterCTA() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h2 className={styles.heading}>
            Yeni yazılardan haberdar olun.
          </h2>

          <p className={styles.subtext}>
            Yeni içerikler ve proje notları yayınlandığında e-posta ile
            haberdar olun.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="E-posta adresiniz"
            aria-label="E-posta adresiniz"
            className={styles.input}
          />

          <button type="submit" className={styles.submit}>
            <span>Abone Ol</span>
            <b>→</b>
          </button>
        </form>
      </div>
    </section>
  );
}
