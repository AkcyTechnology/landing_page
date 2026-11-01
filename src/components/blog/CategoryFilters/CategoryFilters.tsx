import { categories } from "@/data/blog";

import styles from "./CategoryFilters.module.scss";

interface CategoryFiltersProps {
  active: string;
  onChange: (slug: string) => void;
}

const ALL_SLUG = "tumu";

export default function CategoryFilters({
  active,
  onChange,
}: CategoryFiltersProps) {
  const items = [{ slug: ALL_SLUG, label: "Tümü" }, ...categories];

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

export { ALL_SLUG };
