import styles from "./EmptyState.module.scss";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.message}>
        Aradığınız kriterlere uygun yazı bulunamadı.
      </p>

      <button type="button" className={styles.clear} onClick={onClear}>
        <span>Filtreleri Temizle</span>
      </button>
    </div>
  );
}
