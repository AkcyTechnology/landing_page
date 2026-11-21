"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import Link from "@/i18n/Link";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { getFaqItems, type FaqItem, type FaqLink } from "@/content/sss-asistan";
import { findAnswer } from "./match";
import { OPEN_FAQ_EVENT } from "./events";
import styles from "./FaqChat.module.scss";

/*
  Soru-cevap asistanı: içerik src/content/sss-asistan.ts dosyasındaki hazır
  sorulardan gelir (yapay zekâ veya sunucu kullanılmaz). Ziyaretçi önerilen
  sorulara tıklayabilir ya da kendi sorusunu yazabilir; yazılan soru anahtar
  kelimelerle eşleştirilir, bulunamazsa WhatsApp ve iletişim önerilir.
*/

type Message =
  | { id: number; from: "user"; text: string }
  | { id: number; from: "bot"; text: string; links?: FaqLink[]; fallback?: boolean; suggestions?: FaqItem[] };

let nextId = 1;

export default function FaqChat() {
  const locale = useLocale();
  const t = useT().faqChat;
  const items = getFaqItems(locale);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const thread = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  /* Pencere kapanınca odak, onu açan öğeye (ör. iletişim menüsü) geri döner */
  const returnFocus = useRef<HTMLElement | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const featured = items.filter((item) => item.featured);

  /* Cevaptan sonra önerilecek, henüz sorulmamış iki soru */
  const followUps = (asked: string[]) => items.filter((item) => !asked.includes(item.id)).slice(0, 3);

  const reply = (question: string, item: FaqItem | null, asked: string[]) => {
      setMessages((previous) => [...previous, { id: nextId++, from: "user", text: question }]);
      setTyping(true);
      window.clearTimeout(timer.current);
      // Kısa bir "yazıyor" anı: cevap birden belirmesin
      timer.current = window.setTimeout(() => {
        setTyping(false);
        setMessages((previous) => [
          ...previous,
          item
            ? { id: nextId++, from: "bot", text: item.answer, links: item.links, suggestions: followUps([...asked, item.id]) }
            : { id: nextId++, from: "bot", text: t.noMatch, fallback: true, suggestions: featured },
        ]);
      }, 450);
      trackEvent("faq_question", { id: item?.id ?? "no_match" });
  };

  const askedIds = () =>
    messages
      .filter((message) => message.from === "user")
      .map((message) => items.find((item) => item.question === message.text)?.id)
      .filter((id): id is string => Boolean(id));

  const ask = (item: FaqItem) => reply(item.question, item, askedIds());

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    reply(text, findAnswer(items, text), askedIds());
  };

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus();
  };

  /* İletişim menüsünden veya aramadan (belirli bir soruyla) açılma; her çizimde güncel fonksiyona bağlanır */
  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
      trackEvent("faq_open");
      const item = id ? items.find((entry) => entry.id === id) : undefined;
      if (item) reply(item.question, item, []);
    };
    window.addEventListener(OPEN_FAQ_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_FAQ_EVENT, onOpen);
  });

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => input.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <>
      <section
        id="faq-chat"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        aria-label={t.title}
        hidden={!open}
      >
        <header className={styles.head}>
          <span className={styles.avatar} aria-hidden="true">A</span>
          <div className={styles.headText}>
            <strong>{t.title}</strong>
            <span>
              <i aria-hidden="true" /> {t.subtitle}
            </span>
          </div>
          <button type="button" className={styles.close} onClick={close} aria-label={t.close}>
            ×
          </button>
        </header>

        <div ref={thread} className={styles.thread} aria-live="polite">
          <div className={styles.bot}>
            <p>{t.greeting}</p>
          </div>

          {messages.length === 0 && (
            <div className={styles.suggestions}>
              {featured.map((item) => (
                <button key={item.id} type="button" onClick={() => ask(item)}>
                  {item.question}
                </button>
              ))}
            </div>
          )}

          {messages.map((message) =>
            message.from === "user" ? (
              <div key={message.id} className={styles.user}>
                <p>{message.text}</p>
              </div>
            ) : (
              <div key={message.id} className={styles.botGroup}>
                <div className={styles.bot}>
                  {message.text.split(/\n{2,}/).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {message.fallback && (
                    <div className={styles.links}>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("click_whatsapp", { from: "faq" })}
                      >
                        {t.whatsapp} ↗
                      </a>
                      <Link href="/iletisim" onClick={() => setOpen(false)}>
                        {t.contact} →
                      </Link>
                    </div>
                  )}
                  {message.links && message.links.length > 0 && (
                    <div className={styles.links}>
                      {message.links.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {message.suggestions && message.suggestions.length > 0 && message.id === messages.at(-1)?.id && (
                  <div className={styles.suggestions}>
                    <span className={styles.suggestionsLabel}>{t.more}</span>
                    {message.suggestions.map((item) => (
                      <button key={item.id} type="button" onClick={() => ask(item)}>
                        {item.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          {typing && (
            <div className={`${styles.bot} ${styles.typing}`} aria-label={t.typing}>
              <i />
              <i />
              <i />
            </div>
          )}
        </div>

        <form className={styles.composer} onSubmit={submit}>
          <input
            ref={input}
            value={draft}
            maxLength={200}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" disabled={!draft.trim() || typing} aria-label={t.send}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </section>
    </>
  );
}
