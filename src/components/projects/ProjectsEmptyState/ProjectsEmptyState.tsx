import styles from "./ProjectsEmptyState.module.scss";

interface ProjectsEmptyStateProps {
  onClear: () => void;
}

export default function ProjectsEmptyState({ onClear }: ProjectsEmptyStateProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.message}>
        Bu kategoride henüz yayınlanmış bir proje bulunmuyor.
      </p>

      <button type="button" className={styles.clear} onClick={onClear}>
        <span>Filtreleri Temizle</span>
      </button>
    </div>
  );
}
