"use client";

import { useT } from "@/i18n/LocaleProvider";
import styles from "./LegalPageLayout.module.scss";

export default function LegalContents({sections}: {sections: {id: string; title: string}[]}) {
  const t = useT().legal;
  return <aside className={styles.contents}><nav aria-label={t.contents}>
    <span className={styles.contentsLabel}>{t.contentsLabel}</span>
    <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} onClick={event => {
      const target = document.getElementById(section.id);
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, "", `#${section.id}`);
      target.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
    }}><span>{String(index+1).padStart(2,"0")}</span>{section.title}</a></li>)}</ol>
  </nav></aside>;
}
