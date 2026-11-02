"use client";

import { usePathname } from "next/navigation";

import { LOCALE_STORAGE_KEY, locales, switchLocalePath, type Locale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/LocaleProvider";

import styles from "./LanguageSwitcher.module.scss";

/*
  TR / EN dil seçici. Bulunulan sayfanın diğer dildeki karşılığına geçer ve
  tercihi hatırlar. Türkçe ve İngilizce ayrı kök düzen kullandığından geçiş
  tam sayfa yüklemesiyle yapılır (normal <a> bağlantısı).
*/
export default function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "menu" }) {
  const pathname = usePathname() || "/";
  const locale = useLocale();
  const t = useT().language;

  const remember = (target: Locale) => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, target);
    } catch {
      /* Depolama kapalıysa tercih yalnızca bu ziyaret için geçerlidir */
    }
  };

  return (
    <nav className={`${styles.switcher} ${variant === "menu" ? styles.menu : ""}`} aria-label={t.label}>
      {locales.map((target, index) => {
        const active = target === locale;
        const href = switchLocalePath(pathname, target);
        return (
          <span key={target} className={styles.item}>
            {index > 0 && (
              <span className={styles.divider} aria-hidden="true">
                /
              </span>
            )}
            <a
              href={href}
              hrefLang={target}
              lang={target}
              aria-current={active ? "true" : undefined}
              aria-label={t.names[target]}
              className={active ? styles.active : undefined}
              onClick={() => remember(target)}
            >
              {target.toUpperCase()}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
