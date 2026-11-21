import type { CSSProperties } from "react";

import styles from "./RollingNumber.module.scss";

/*
  Sayaç rakamları: her basamak 0–9'luk dikey bir şerit; öğe ekrana girince
  (RevealObserver › data-in) şerit doğru rakama kayar — saat kadranı gibi.
  Ekran okuyucular yalnızca sayının kendisini duyar. JS kapalıysa veya
  hareket azaltma açıksa rakam doğrudan yerinde görünür.
*/
/* delay: dönüşün başlama gecikmesi (sn). Varsayılan, hero alt satırının belirmesinden sonrasıdır. */
export default function RollingNumber({ value, className, delay = 1.1 }: { value: number; className?: string; delay?: number }) {
  const digits = String(value).split("");

  return (
    <span className={`${styles.number} ${className ?? ""}`} data-reveal="" style={{ "--base": `${delay}s` } as CSSProperties}>
      <span className={styles.srOnly}>{value}</span>
      <span className={styles.digits} aria-hidden="true">
        {digits.map((digit, index) => (
          <span
            key={index}
            className={styles.digit}
            style={{ "--d": Number(digit), "--i": index } as CSSProperties}
          >
            <span className={styles.strip}>
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
