"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  [data-reveal] öğeleri ekrana girdikçe yumuşakça belirir (stil: globals.css).
  JS yoksa veya hareket azaltma açıksa içerik doğrudan görünür: gizleme
  yalnızca bu bileşen <html data-reveal-ready> eklediğinde uygulanır.
*/
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    const items = document.querySelectorAll("[data-reveal]:not([data-in])");
    items.forEach((item) => observer.observe(item));
    root.setAttribute("data-reveal-ready", "");
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
