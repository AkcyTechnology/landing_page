"use client";

import { useT } from "@/i18n/LocaleProvider";
import { trackEvent } from "@/lib/analytics";
import styles from "./BookingLink.module.scss";

/*
  Ücretsiz keşif görüşmesi randevusu (Cal.com, Calendly vb.).
  .env.local → NEXT_PUBLIC_BOOKING_URL=https://cal.com/akcy/kesif-gorusmesi
  Adres tanımlı değilse hiçbir şey render edilmez. Takvim yeni sekmede açılır;
  sitede üçüncü taraf betik ya da çerez yüklenmez.
*/
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "";

export default function BookingLink({ variant = "card" }: { variant?: "card" | "inline" | "dark" }) {
  const t = useT().booking;
  if (!BOOKING_URL) return null;

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.link} ${styles[variant]}`}
      onClick={() => trackEvent("booking_click", { placement: variant })}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      </span>
      <span className={styles.text}>
        <strong>{t.title}</strong>
        <span>{t.text}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">↗</span>
    </a>
  );
}
