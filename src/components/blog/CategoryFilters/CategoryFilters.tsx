"use client";

import { motion, useReducedMotion } from "motion/react";

import { categories } from "@/data/blogCategories";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { getCategoryAccent, getCategoryLabel } from "@/components/blog/categoryMeta";

import styles from "./CategoryFilters.module.scss";

interface CategoryFiltersProps {
  active: string;
  onChange: (slug: string) => void;
  // Verilirse yalnızca bu kategoriler gösterilir (boş kategoriler gizlenir).
  available?: string[];
  // Verilirse her kategorinin yanında yazı sayısı gösterilir.
  counts?: Record<string, number>;
}

const ALL_SLUG = "tumu";

export default function CategoryFilters({
  active,
  onChange,
  available,
  counts,
}: CategoryFiltersProps) {
  const t = useT().blog.listing;
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  const visible = available
    ? categories.filter((category) => available.includes(category.slug))
    : categories;

  const total = counts
    ? Object.values(counts).reduce((sum, count) => sum + count, 0)
    : undefined;

  const items = [
    { slug: ALL_SLUG, label: t.all, count: total },
    ...visible.map((category) => ({
      ...category,
      label: getCategoryLabel(category.slug, locale),
      count: counts?.[category.slug],
    })),
  ];

  return (
    <div className={styles.filters} role="group" aria-label={t.categoriesLabel}>
      {items.map((item) => {
        const isActive = active === item.slug;

        return (
          <button
            key={item.slug}
            type="button"
            className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
            style={
              {
                "--accent":
                  item.slug === ALL_SLUG
                    ? "#16c3ce"
                    : getCategoryAccent(item.slug),
              } as React.CSSProperties
            }
            aria-pressed={isActive}
            onClick={() => onChange(item.slug)}
          >
            {isActive && (
              <motion.span
                layoutId="blog-category-pill"
                className={styles.pill}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
              />
            )}

            <span className={styles.label}>
              {item.slug !== ALL_SLUG && (
                <i className={styles.dot} aria-hidden="true" />
              )}
              {item.label}
              {item.count !== undefined && (
                <small className={styles.count}>{item.count}</small>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { ALL_SLUG };
