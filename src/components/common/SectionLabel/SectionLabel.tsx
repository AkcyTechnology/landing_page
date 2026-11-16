import styles from "./SectionLabel.module.scss";

interface SectionLabelProps {
  children: string;
  /* Bölüm başlığı olarak kullanıldığında h2/h3 (görünüm değişmez) */
  as?: "span" | "h2" | "h3";
}

export default function SectionLabel({ children, as: Tag = "span" }: SectionLabelProps) {
  return <Tag className={styles.label}>{children}</Tag>;
}
