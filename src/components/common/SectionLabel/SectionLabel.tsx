import styles from "./SectionLabel.module.scss";

interface SectionLabelProps {
  children: string;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return <span className={styles.label}>{children}</span>;
}
