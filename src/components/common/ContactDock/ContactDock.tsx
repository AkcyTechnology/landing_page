"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import Link from "@/i18n/Link";
import { canonicalPath } from "@/i18n/config";
import { useT } from "@/i18n/LocaleProvider";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/contact";
import { openFaq } from "@/components/common/FaqChat/events";
import styles from "./ContactDock.module.scss";

/*
  Sağ alttaki tek iletişim butonu. Basınca dönerek kapanma işaretine
  dönüşür ve üstünde küçük bir kart açılır: WhatsApp, sık sorulan sorular
  (FaqChat penceresi), teklif formu ve telefon. Böylece sayfa köşelerinde
  ayrı ayrı yüzen butonlar olmaz.
  - Oturumda ilk kez gelen ziyaretçiye birkaç saniye sonra küçük bir
    "merhaba" balonu gösterilir; kapatılınca veya menü açılınca bir daha çıkmaz.
  - Esc veya kart dışına tıklama menüyü kapatır; odak butona döner.
*/

const GREETING_KEY = "akcy-dock-greeted";
const GREETING_DELAY = 6000;

function readGreeted(): boolean {
  try {
    return sessionStorage.getItem(GREETING_KEY) === "1";
  } catch {
    return false;
  }
}

function markGreeted() {
  try {
    sessionStorage.setItem(GREETING_KEY, "1");
  } catch {
    /* depolama kapalıysa balon yalnızca bu sayfada bir kez görünür */
  }
}

const ICONS: Record<string, ReactNode> = {
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"
    />
  ),
  faq: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5z" />
      <path d="M9.6 8.2a2.4 2.4 0 1 1 3.3 2.2c-.6.3-.9.7-.9 1.3M12 13.7v.1" />
    </>
  ),
  quote: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </>
  ),
  call: (
    <path d="M6.6 3.5h2.6l1.4 4.1-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4.1 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
};

export default function ContactDock() {
  const t = useT().dock;
  const pathname = canonicalPath(usePathname() || "/").replace(/(.)\/$/, "$1");
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const card = useRef<HTMLDivElement>(null);
  /* Klavyeyle açıldıysa odak ilk seçeneğe taşınır; fareyle açılışta taşınmaz */
  const openedByKeyboard = useRef(false);

  /* Oturumda ilk ziyarette kısa bir gecikmeyle "merhaba" balonu */
  useEffect(() => {
    if (readGreeted()) return;
    const timer = window.setTimeout(() => setGreeting(true), GREETING_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  /* Açıkken: Esc ve dışarı tıklama kapatır; ilk seçenek odaklanır */
  useEffect(() => {
    if (!open) return;
    if (openedByKeyboard.current) {
      requestAnimationFrame(() => card.current?.querySelector<HTMLElement>("a, button")?.focus());
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!card.current?.contains(target) && !toggle.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const dismissGreeting = () => {
    setGreeting(false);
    markGreeted();
  };

  const onToggle = (event: React.MouseEvent) => {
    // detail 0: tıklama klavyeden (Enter / Boşluk) geldi
    openedByKeyboard.current = event.detail === 0;
    if (!open) trackEvent("dock_open");
    dismissGreeting();
    setOpen((value) => !value);
  };

  const close = () => setOpen(false);

  const items: { id: string; label: string; hint: string; node: (content: ReactNode, className: string) => ReactNode }[] = [
    {
      id: "whatsapp",
      label: t.whatsapp,
      hint: t.whatsappHint,
      node: (content, className) => (
        <a
          className={className}
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent("click_whatsapp", { from: "dock" });
            close();
          }}
        >
          {content}
        </a>
      ),
    },
    {
      id: "faq",
      label: t.faq,
      hint: t.faqHint,
      node: (content, className) => (
        <button
          type="button"
          className={className}
          onClick={() => {
            close();
            toggle.current?.focus();
            openFaq();
          }}
        >
          {content}
        </button>
      ),
    },
    ...(pathname === "/teklif"
      ? []
      : [
          {
            id: "quote",
            label: t.quote,
            hint: t.quoteHint,
            node: (content: ReactNode, className: string) => (
              <Link className={className} href="/teklif" onClick={close}>
                {content}
              </Link>
            ),
          },
        ]),
    {
      id: "call",
      label: t.call,
      hint: CONTACT_PHONE_DISPLAY,
      node: (content, className) => (
        <a className={className} href={`tel:${CONTACT_PHONE}`} onClick={close}>
          {content}
        </a>
      ),
    },
  ];

  return (
    <div className={`${styles.dock} ${open ? styles.open : ""}`}>
      <div
        ref={card}
        id="contact-dock-menu"
        className={styles.card}
        aria-hidden={!open}
        inert={!open}
      >
        <p className={styles.cardTitle}>{t.title}</p>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={item.id} style={{ "--i": index } as React.CSSProperties}>
              {item.node(
                <>
                  <span className={styles.icon} data-kind={item.id} aria-hidden="true">
                    <svg viewBox="0 0 24 24">{ICONS[item.id]}</svg>
                  </span>
                  <span className={styles.text}>
                    <strong>{item.label}</strong>
                    <span>{item.hint}</span>
                  </span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </>,
                styles.item
              )}
            </li>
          ))}
        </ul>
      </div>

      {greeting && !open && (
        <div className={styles.greeting} role="status">
          <button type="button" className={styles.greetingText} onClick={onToggle}>
            {t.greeting}
          </button>
          <button type="button" className={styles.greetingClose} onClick={dismissGreeting} aria-label={t.dismiss}>
            ×
          </button>
        </div>
      )}

      <button
        ref={toggle}
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="contact-dock-menu"
        aria-label={open ? t.close : t.open}
      >
        <span className={styles.toggleIcon} aria-hidden="true">
          {/* Kapalıyken konuşma balonu, açıkken çarpı; ikisi üst üste döner */}
          <svg className={styles.iconChat} viewBox="0 0 24 24">
            <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z" />
            <path d="M8.5 10h.01M12 10h.01M15.5 10h.01" />
          </svg>
          <svg className={styles.iconClose} viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </span>
        {greeting && !open && <i className={styles.badge} aria-hidden="true" />}
      </button>
    </div>
  );
}
