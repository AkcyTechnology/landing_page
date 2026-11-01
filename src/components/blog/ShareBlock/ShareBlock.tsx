"use client";

import { useCopyToClipboard } from "@/lib/useCopyToClipboard";

import styles from "./ShareBlock.module.scss";

interface ShareBlockProps {
  title: string;
  slug: string;
}

export default function ShareBlock({ title, slug }: ShareBlockProps) {
  const { copied, copy } = useCopyToClipboard();

  const getUrl = () => {
    if (typeof window === "undefined") return `/blog/${slug}`;
    return `${window.location.origin}/blog/${slug}`;
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareX = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={styles.share}>
      <span className={styles.label}>Yazıyı paylaş</span>

      <div className={styles.actions}>
        <button type="button" onClick={shareLinkedIn}>
          LinkedIn
        </button>

        <button type="button" onClick={shareX}>
          X
        </button>

        <button type="button" onClick={() => copy(getUrl())}>
          {copied ? "Kopyalandı" : "Link Kopyala"}
        </button>
      </div>
    </div>
  );
}
