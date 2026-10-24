import styles from "./ImagePlaceholder.module.scss";

interface ImagePlaceholderProps {
  label: string;
  ratio?: "portrait" | "square" | "wide" | "ultraWide";
  className?: string;
}

const ratioClassMap: Record<NonNullable<ImagePlaceholderProps["ratio"]>, string> = {
  portrait: styles.ratioPortrait,
  square: styles.ratioSquare,
  wide: styles.ratioWide,
  ultraWide: styles.ratioUltraWide,
};

export default function ImagePlaceholder({
  label,
  ratio = "wide",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${styles.placeholder} ${ratioClassMap[ratio]} ${
        className ?? ""
      }`}
      aria-hidden="true"
    >
      <span className={styles.label}>{label}</span>
    </div>
  );
}
