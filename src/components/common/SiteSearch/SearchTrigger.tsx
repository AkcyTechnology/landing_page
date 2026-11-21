"use client";

import type { ReactNode } from "react";

import { OPEN_SEARCH_EVENT } from "./types";

/* Site içi arama penceresini açan buton (sunucu bileşenlerinin içinde kullanılabilir) */
export default function SearchTrigger({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}>
      {children}
    </button>
  );
}
