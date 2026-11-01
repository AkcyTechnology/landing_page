"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { HeadingItem } from "@/components/blog/ArticleContent/headings";

import styles from "./TableOfContents.module.scss";

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -70% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const list = (
    <ol className={styles.list}>
      {headings.map((heading, index) => (
        <li
          key={heading.id}
          className={heading.level === 3 ? styles.subItem : undefined}
        >
          <a
            href={`#${heading.id}`}
            className={`${styles.link} ${
              activeId === heading.id ? styles.linkActive : ""
            }`}
          >
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className={styles.desktopToc} aria-label="İçindekiler">
        <span className={styles.title}>İçindekiler</span>
        {list}
      </nav>

      <div className={styles.mobileToc}>
        <button
          type="button"
          className={styles.mobileHeader}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
        >
          <span>İçindekiler</span>
          <span
            className={`${styles.icon} ${
              mobileOpen ? styles.iconOpen : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 0.8, 0.25, 1] }}
              className={styles.mobileBody}
            >
              {list}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
