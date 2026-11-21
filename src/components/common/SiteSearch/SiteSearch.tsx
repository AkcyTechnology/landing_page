"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import Link from "@/i18n/Link";
import { localizePath } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { trackEvent } from "@/lib/analytics";
import { getFaqItems } from "@/content/sss-asistan";
import { openFaq } from "@/components/common/FaqChat/events";
import { OPEN_SEARCH_EVENT, type SearchEntry, type SearchType } from "./types";
import styles from "./SiteSearch.module.scss";

/*
  Site içi arama (⌘K / Ctrl+K / "/"). Dizin build'de üretilen
  /search-index.json dosyasından ilk açılışta bir kez indirilir. Arama
  tamamen tarayıcıda yapılır; Türkçe karakterler ve büyük/küçük harf yok sayılır.
*/

type Index = Record<string, SearchEntry[]>;
let indexPromise: Promise<Index> | null = null;

function loadIndex(): Promise<Index> {
  indexPromise ??= fetch("/search-index.json")
    .then((response) => (response.ok ? (response.json() as Promise<Index>) : {}))
    .catch(() => {
      indexPromise = null;
      return {};
    });
  return indexPromise;
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

const TYPE_ORDER: SearchType[] = ["page", "faq", "service", "project", "post"];
const MAX_PER_GROUP = 6;

function search(entries: SearchEntry[], query: string): SearchEntry[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return entries.filter((entry) => entry.type === "page");

  const scored = entries
    .map((entry) => {
      const title = normalize(entry.title);
      // Boşluksuz yazımlar da eşleşsin: "calmdo" → "Calm Do", "guessplayer" → "Guess Player"
      const compactTitle = title.replace(/\s+/g, "");
      const keywords = normalize(entry.keywords ?? "");
      const text = normalize(entry.text);
      let score = 0;
      for (const term of terms) {
        if (title.startsWith(term) || compactTitle.startsWith(term)) score += 6;
        else if (title.includes(term) || compactTitle.includes(term)) score += 4;
        else if (keywords.includes(term)) score += 2;
        else if (text.includes(term)) score += 1;
        else return null; // her kelime bir yerde geçmeli
      }
      return { entry, score };
    })
    .filter((item): item is { entry: SearchEntry; score: number } => item !== null)
    .sort((a, b) => b.score - a.score);

  /* Gruplar en iyi eşleşmelerine göre sıralanır (eşitlikte sabit sıra) */
  const best = (type: SearchType) => scored.find((item) => item.entry.type === type)?.score ?? 0;
  const order = [...TYPE_ORDER].sort((a, b) => best(b) - best(a));
  return order.flatMap((type) =>
    scored.filter((item) => item.entry.type === type).slice(0, MAX_PER_GROUP).map((item) => item.entry)
  );
}

function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  const terms = normalize(query).split(/\s+/).filter((term) => term.length > 1);
  if (!terms.length) return text;
  // normalize() karakter sayısını korur (tek karakter → tek karakter), konumlar eşleşir
  const plain = normalize(text);
  const marks = new Array<boolean>(text.length).fill(false);
  for (const term of terms) {
    let from = plain.indexOf(term);
    while (from !== -1) {
      for (let i = from; i < from + term.length; i += 1) marks[i] = true;
      from = plain.indexOf(term, from + term.length);
    }
  }
  const parts: ReactNode[] = [];
  let start = 0;
  for (let i = 1; i <= text.length; i += 1) {
    if (i === text.length || marks[i] !== marks[start]) {
      const chunk = text.slice(start, i);
      parts.push(marks[start] ? <mark key={start}>{chunk}</mark> : chunk);
      start = i;
    }
  }
  return parts;
}

const ICONS: Record<SearchType, ReactNode> = {
  page: <path d="M6 3h8l4 4v14H6zM14 3v4h4" />,
  service: <path d="M12 3l2.6 5.6L20 9.5l-4 4 1 5.9-5-2.8-5 2.8 1-5.9-4-4 5.4-.9z" />,
  project: <path d="M4 6h16v12H4zM4 10h16M8 6v4" />,
  post: <path d="M5 4h14v16H5zM9 8h6M9 12h6M9 16h4" />,
  faq: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5zM9.5 8.2a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.7-.9 1.3M12 13.8v.1" />,
};

export default function SiteSearch() {
  const locale = useLocale();
  const t = useT().search;
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [active, setActive] = useState(0);
  const show = useCallback(() => {
    setOpen(true);
    /* Sayfa dizinine sık sorulan sorular eklenir (src/content/sss-asistan.ts) */
    const faqs: SearchEntry[] = getFaqItems(locale).map((item) => ({
      type: "faq",
      title: item.question,
      text: item.answer.replace(/s+/g, " "),
      keywords: item.keywords.join(" "),
      href: item.id,
    }));
    loadIndex().then((index) => setEntries([...(index[locale] ?? []), ...faqs]));
    trackEvent("search_open");
  }, [locale]);

  const close = useCallback(() => setOpen(false), []);

  /* Kısayollar: ⌘K / Ctrl+K her yerde, "/" yazı alanı dışındayken */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, select, [contenteditable='true']");
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) close();
        else show();
      } else if (event.key === "/" && !typing && !dialog.current?.open) {
        event.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, show);
    };
  }, [show, close]);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
      requestAnimationFrame(() => input.current?.focus());
    } else if (!open && node.open) {
      node.close();
    }
  }, [open]);

  const results = useMemo(() => (entries ? search(entries, query) : []), [entries, query]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (entry: SearchEntry) => {
    trackEvent("search_select", { type: entry.type });
    close();
    if (entry.type === "faq") openFaq(entry.href);
    else router.push(localizePath(entry.href, locale));
  };

  /* Soru-cevap penceresini açar (aramada bulunamayan sorular için) */
  const askFaq = () => {
    trackEvent("faq_open", { from: "search" });
    close();
    openFaq();
  };

  const onInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (results[active]) go(results[active]);
      else if (query.trim()) askFaq();
    }
  };

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label={t.label}
      onClose={() => setOpen(false)}
      onClick={(event) => {
        // Pencere dışına (arka plana) tıklanınca kapanır
        if (event.target === dialog.current) close();
      }}
    >
      {open ? (
        <div className={styles.panel}>
          <div className={styles.inputRow}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.inputIcon}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref={input}
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              role="combobox"
              aria-expanded="true"
              aria-controls="site-search-results"
              aria-activedescendant={results[active] ? `search-option-${active}` : undefined}
              autoComplete="off"
              spellCheck={false}
            />
            <button type="button" className={styles.esc} onClick={close}>
              esc
            </button>
          </div>

          <div ref={list} id="site-search-results" role="listbox" className={styles.results} aria-label={t.label}>
            {entries === null && <p className={styles.state}>{t.loading}</p>}

            {entries !== null && results.length === 0 && (
              <div className={styles.state}>
                <p>{t.noResults.replace("{query}", query)}</p>
              </div>
            )}

            {results.map((entry, index) => {
              const heading = entry.type !== results[index - 1]?.type ? (query.trim() ? t.groups[entry.type] : t.quickLinks) : null;
              return (
                <div key={`${entry.type}-${entry.href}`}>
                  {heading && <p className={styles.group}>{heading}</p>}
                  {/* Sık sorulan sorular sayfaya gitmez, soru-cevap penceresinde açılır */}
                  <Link
                    href={entry.type === "faq" ? "#" : entry.href}
                    id={`search-option-${index}`}
                    role="option"
                    aria-selected={index === active}
                    data-index={index}
                    className={`${styles.item} ${index === active ? styles.itemActive : ""}`}
                    onMouseMove={() => setActive(index)}
                    onClick={(event) => {
                      if (entry.type === "faq") {
                        event.preventDefault();
                        go(entry);
                        return;
                      }
                      trackEvent("search_select", { type: entry.type });
                      close();
                    }}
                  >
                    <span className={styles.icon} data-type={entry.type} aria-hidden="true">
                      <svg viewBox="0 0 24 24">{ICONS[entry.type]}</svg>
                    </span>
                    <span className={styles.itemText}>
                      <strong>
                        <Highlight text={entry.title} query={query} />
                      </strong>
                      <span>{entry.text}</span>
                    </span>
                    <span className={styles.enter} aria-hidden="true">↵</span>
                  </Link>
                </div>
              );
            })}

            {query.trim().length > 2 && (
              <button type="button" className={styles.ask} onClick={askFaq}>
                <span className={styles.askIcon} aria-hidden="true">?</span>
                <span>
                  <strong>{t.askFaq}</strong>
                  <span>{t.askFaqHint}</span>
                </span>
              </button>
            )}
          </div>

          <div className={styles.footer} aria-hidden="true">
            <span><kbd>↑</kbd><kbd>↓</kbd> {t.hintNavigate}</span>
            <span><kbd>↵</kbd> {t.hintOpen}</span>
            <span><kbd>esc</kbd> {t.hintClose}</span>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
