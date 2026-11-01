"use client";

import { useCopyToClipboard } from "@/lib/useCopyToClipboard";

import styles from "./ArticleContent.module.scss";

interface CopyCodeButtonProps {
  code: string;
}

export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={() => copy(code)}
    >
      {copied ? "Kopyalandı" : "Kopyala"}
    </button>
  );
}
