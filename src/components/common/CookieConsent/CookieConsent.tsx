"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";

import Link from "@/i18n/Link";
import { useT } from "@/i18n/LocaleProvider";
import { trackLinkClick } from "@/lib/analytics";
import styles from "./CookieConsent.module.scss";

/*
  Çerez onayı + Google Analytics 4.
  - NEXT_PUBLIC_GA_ID boşsa hiçbir şey render edilmez (bant da GA da yok).
  - Analiz betikleri yalnızca ziyaretçi "Kabul et" dedikten sonra yüklenir.
  - Tercih bu tarayıcıda saklanır; alt bilgideki "Çerez Tercihleri"
    bağlantısı OPEN_EVENT olayını yayınlayarak bandı yeniden açar.
*/
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const OPEN_EVENT = "akcy:cookie-settings";

const STORAGE_KEY = "akcy-consent";
const CHANGE_EVENT = "akcy:consent-change";
type Consent = "granted" | "denied" | null;

/* Depolama kapalıysa (gizli pencere vb.) tercih yalnızca bu sayfa açıkken bellekte tutulur */
let memoryConsent: Consent = null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function writeConsent(value: Exclude<Consent, null>) {
  memoryConsent = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* bellekteki değer kullanılır */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/* Sunucuda (statik HTML) karar bilinmez: bant gösterilmez, tarayıcıda okunur */
const SERVER_SNAPSHOT = "unknown" as const;

/* GA yüklendikten sonra onay geri çekilirse ölçüm durdurulur */
function updateGtagConsent(value: Exclude<Consent, null>) {
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: value });
}

export default function CookieConsent() {
  const t = useT().cookieConsent;
  const consent = useSyncExternalStore<Consent | typeof SERVER_SNAPSHOT>(subscribe, readConsent, () => SERVER_SNAPSHOT);
  const [reopened, setReopened] = useState(false);
  const open = consent === null || reopened;

  /* Alt bilgideki "Çerez Tercihleri" bağlantısı bandı yeniden açar */
  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  /* Onay verildiyse bağlantı tıklamaları (telefon, e-posta, WhatsApp, teklif,
     proje/hizmet) tek bir dinleyiciyle GA olayına çevrilir */
  useEffect(() => {
    if (!GA_ID || consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (anchor instanceof HTMLAnchorElement) trackLinkClick(anchor);
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [consent]);

  const choose = useCallback((value: Exclude<Consent, null>) => {
    writeConsent(value);
    updateGtagConsent(value);
    setReopened(false);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script
            id="ga-consent"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`,
            }}
          />
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}

      {open && (
        <div className={styles.banner} data-cookie-banner role="dialog" aria-live="polite" aria-label={t.label}>
          <p className={styles.text}>
            {t.text} <Link href="/cookies">{t.policy}</Link>
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.reject} onClick={() => choose("denied")}>
              {t.reject}
            </button>
            <button type="button" className={styles.accept} onClick={() => choose("granted")}>
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
