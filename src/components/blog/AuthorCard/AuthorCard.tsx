import Link from "next/link";

import styles from "./AuthorCard.module.scss";

interface AuthorCardProps {
  name: string;
  role?: string;
}

export default function AuthorCard({ name, role }: AuthorCardProps) {
  return (
    <aside className={styles.card} aria-label="Yazar hakkında">
      <span className={styles.avatar} aria-hidden="true">
        {name.slice(0, 2).toLocaleUpperCase("tr-TR")}
      </span>

      <div className={styles.body}>
        <span className={styles.eyebrow}>YAZAR</span>
        <h2 className={styles.name}>
          {name}
          {role && <small>{role}</small>}
        </h2>
        <p className={styles.bio}>
          AKCY; kurumsal web siteleri, WordPress projeleri, şirket süreç
          otomasyonu ve yapay zekâ çözümleri geliştiren bir dijital ürün
          stüdyosu. Bu blogda sahada edindiğimiz deneyimleri paylaşıyoruz.
        </p>
        <Link href="/hakkimizda" className={styles.link}>
          Ekibimizi tanıyın <b aria-hidden="true">→</b>
        </Link>
      </div>
    </aside>
  );
}
