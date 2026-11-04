"use client";

import { usePathname } from "next/navigation";
import { useId } from "react";

import Link from "@/i18n/Link";
import { canonicalPath } from "@/i18n/config";
import { useT } from "@/i18n/LocaleProvider";

import styles from "./QuoteButton.module.scss";

/*
  Sabit "Teklif Al" butonu: dönen yazı halkası, ters yönde dolanan bir uydu
  noktası ve birkaç saniyede bir fırlayıp geri gelen ok. Üzerine gelince ok
  hemen fırlar, halka hızlanır. İletişim sayfasında gösterilmez.
*/
export default function QuoteButton() {
  const t = useT().quote;
  const pathId = useId().replace(/:/g, "");
  const pathname = canonicalPath(usePathname() || "/").replace(/(.)\/$/, "$1");

  if (pathname === "/iletisim") return null;

  const ring = `${t.ring} · ${t.ring} · `;

  return (
    <Link href="/iletisim" className={styles.button} aria-label={t.label}>
      <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <defs>
          <path id={pathId} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text className={styles.ringText}>
          <textPath href={`#${pathId}`} textLength="276" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>

      <span className={styles.orbit} aria-hidden="true">
        <i />
      </span>

      <span className={styles.core} aria-hidden="true">
        <svg className={styles.arrow} viewBox="0 0 24 24" width="22" height="22">
          <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
