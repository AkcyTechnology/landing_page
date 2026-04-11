"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "../ui/container";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Şirketimiz", href: "#sirketimiz" },
    { label: "Ürünlerimiz", href: "#urunler" },
    { label: "Blog", href: "#blog" },
    { label: "Bize Ulaşın", href: "#iletisim" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/8 bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-18 items-center justify-between py-4">
            {/* Logo */}
            <Link
              href="/tr"
              className="flex items-center gap-2 group"
              aria-label="AKCY Ana Sayfa"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <span className="text-sm font-bold text-white">AK</span>
              </div>
              <span
                className="text-lg font-bold tracking-wide text-white transition-opacity group-hover:opacity-80"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                AKCY
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: locale + CTA */}
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs">
                <Link
                  href="/tr"
                  className="rounded-full px-3 py-1 text-white/90 hover:bg-white/10 transition"
                >
                  TR
                </Link>
                <Link
                  href="/en"
                  className="rounded-full px-3 py-1 text-white/50 hover:bg-white/10 transition hover:text-white/90"
                >
                  EN
                </Link>
              </div>
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
              >
                Tanışalım
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menüyü aç"
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-20 md:hidden">
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative">
            <Container>
              <nav className="flex flex-col gap-1 border-t border-white/8 pt-6">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-4 flex items-center gap-3">
                  <Link href="/tr" className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-sm text-white/80">
                    TR
                  </Link>
                  <Link href="/en" className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-sm text-white/50">
                    EN
                  </Link>
                </div>
                <a
                  href="#iletisim"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-center text-sm font-medium text-white"
                >
                  Tanışalım
                </a>
              </nav>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
