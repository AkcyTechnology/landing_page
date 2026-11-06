"use client";

import type { MouseEvent } from "react";

/* "Projenizi anlatın": forma yumuşak kaydırır (hareket azaltmada anında) */
export default function ScrollToForm({ className, label }: { className: string; label: string }) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("proje-formu");
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#proje-formu");
  };

  return (
    <a href="#proje-formu" className={className} onClick={onClick}>
      {label}
      <span aria-hidden="true">↓</span>
    </a>
  );
}
