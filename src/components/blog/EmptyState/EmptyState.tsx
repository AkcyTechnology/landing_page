"use client";

import { useT } from "@/i18n/LocaleProvider";
import styles from "./EmptyState.module.scss";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  const t = useT().blog.listing;
  return (
    <div className={styles.empty}>
      <p className={styles.message}>
        {t.emptyMessage}
      </p>

      <button type="button" className={styles.clear} onClick={onClear}>
        <span>{t.clearFilters}</span>
      </button>
    </div>
  );
}
