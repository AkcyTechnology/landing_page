"use client";

import { useT } from "@/i18n/LocaleProvider";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const t = useT().blog.listing;
  // Tek sayfa varken sayfalama gösterilmez.
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: Math.max(totalPages, 1) },
    (_, index) => index + 1
  );

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav className={styles.pagination} aria-label={t.pagination}>
      <button
        type="button"
        className={styles.arrow}
        disabled={!canGoPrev}
        onClick={() => canGoPrev && onChange(page - 1)}
        aria-label={t.previousPage}
      >
        ←
      </button>

      <div className={styles.pages}>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`${styles.page} ${
              pageNumber === page ? styles.pageActive : ""
            }`}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.arrow}
        disabled={!canGoNext}
        onClick={() => canGoNext && onChange(page + 1)}
        aria-label={t.nextPage}
      >
        →
      </button>
    </nav>
  );
}
