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

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${title} ${getUrl()}`);
    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={styles.share}>
      <div className={styles.intro}>
        <span className={styles.label}>Yazıyı paylaş</span>
        <p>Faydalı bulduysanız ekibinizle paylaşın.</p>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={shareLinkedIn} aria-label="LinkedIn'de paylaş">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-1 1.84-1.8 3.62-1.8 3.87 0 4.5 2.4 4.5 5.53v5.77h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.71 0-1.97 1.33-1.97 2.7v5.2h-4.33v-11Z"
            />
          </svg>
          <span>LinkedIn</span>
        </button>

        <button type="button" onClick={shareX} aria-label="X'te paylaş">
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.7H5.58l11.09 14.5Z"
            />
          </svg>
          <span>X</span>
        </button>

        <button type="button" onClick={shareWhatsApp} aria-label="WhatsApp'ta paylaş">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.07.9.9-3-.2-.31a8.2 8.2 0 1 1 6.87 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.17-.47-.29Z"
            />
          </svg>
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={() => copy(getUrl())}
          className={copied ? styles.copied : undefined}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            {copied ? (
              <path
                d="m5 12.5 4.5 4.5L19 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M10 14a4.5 4.5 0 0 0 6.36 0l3-3a4.5 4.5 0 0 0-6.36-6.36l-1.25 1.25M14 10a4.5 4.5 0 0 0-6.36 0l-3 3a4.5 4.5 0 0 0 6.36 6.36l1.25-1.25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
          <span aria-live="polite">{copied ? "Kopyalandı" : "Linki kopyala"}</span>
        </button>
      </div>
    </div>
  );
}
