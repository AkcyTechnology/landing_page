import Link from "@/i18n/Link";
import { getLocale, getT } from "@/i18n/server";

import styles from "./AuthorCard.module.scss";

interface AuthorCardProps {
  name: string;
  role?: string;
}

export default function AuthorCard({ name, role }: AuthorCardProps) {
  const t = getT().blog.author;
  return (
    <aside className={styles.card} aria-label={t.label}>
      <span className={styles.avatar} aria-hidden="true">
        {name.slice(0, 2).toLocaleUpperCase(getLocale())}
      </span>

      <div className={styles.body}>
        <span className={styles.eyebrow}>{t.eyebrow}</span>
        <h2 className={styles.name}>
          {name}
          {role && <small>{role}</small>}
        </h2>
        <p className={styles.bio}>
          {t.bio}
        </p>
        <Link href="/hakkimizda" className={styles.link}>
          {t.link} <b aria-hidden="true">→</b>
        </Link>
      </div>
    </aside>
  );
}
