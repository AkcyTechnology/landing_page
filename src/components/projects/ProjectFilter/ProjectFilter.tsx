"use client";

import { getProjectCategories } from "@/data/projects";
import { useLocale, useT } from "@/i18n/LocaleProvider";

import styles from "./ProjectFilter.module.scss";

interface ProjectFilterProps {
  active: string;
  onChange: (slug: string) => void;
}

export const ALL_PROJECTS_SLUG = "tumu";

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  const locale = useLocale();
  const t = useT().projects;
  const items = [
    { slug: ALL_PROJECTS_SLUG, label: t.filterAll },
    ...getProjectCategories(locale),
  ];

  return (
    <div className={styles.filters} role="group" aria-label={t.filterLabel}>
      {items.map((item) => (
        <button
          key={item.slug}
          type="button"
          className={`${styles.item} ${
            active === item.slug ? styles.itemActive : ""
          }`}
          onClick={() => onChange(item.slug)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
