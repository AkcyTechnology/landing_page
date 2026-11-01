import { projectCategories } from "@/data/projects";

import styles from "./ProjectFilter.module.scss";

interface ProjectFilterProps {
  active: string;
  onChange: (slug: string) => void;
}

export const ALL_PROJECTS_SLUG = "tumu";

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  const items = [
    { slug: ALL_PROJECTS_SLUG, label: "Tümü" },
    ...projectCategories,
  ];

  return (
    <div className={styles.filters}>
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
