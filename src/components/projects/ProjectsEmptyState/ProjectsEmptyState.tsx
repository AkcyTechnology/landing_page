"use client";

import { useT } from "@/i18n/LocaleProvider";
import styles from "./ProjectsEmptyState.module.scss";

interface ProjectsEmptyStateProps {
  onClear: () => void;
}

export default function ProjectsEmptyState({ onClear }: ProjectsEmptyStateProps) {
  const t = useT().projects;
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
