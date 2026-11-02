"use client";

import { useCopyToClipboard } from "@/lib/useCopyToClipboard";
import { useT } from "@/i18n/LocaleProvider";

import styles from "./ArticleContent.module.scss";

interface CopyCodeButtonProps {
  code: string;
}

export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  const t = useT().blog.article;

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={() => copy(code)}
    >
      {copied ? t.copied : t.copy}
    </button>
  );
}
