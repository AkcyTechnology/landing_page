"use client";

import { useEffect, useState, useRef } from "react";
import Link from "@/i18n/Link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";
import { navigation } from "@/data/navigation";
import { canonicalPath } from "@/i18n/config";
import { useT } from "@/i18n/LocaleProvider";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher/LanguageSwitcher";

export default function Header() {
  const t = useT();
  /* Etkin menü öğesi Türkçe (kanonik) adres üzerinden bulunur */
  const pathname = canonicalPath(usePathname() || "/").replace(/(.)\/$/, "$1");
  /* Menü sayfalarının hepsi koyu petrol zeminli ortak hero ile açılır:
     sayfa en üstteyken menü bu zeminin üzerinde şeffaf ve beyaz yazılıdır,
     kaydırınca bütün sayfalarda aynı beyaz menüye döner. */
  const onHero = ["/", "/hizmetler", "/projelerimiz", "/hakkimizda", "/blog", "/iletisim"].includes(pathname);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);

  const transparent = onHero && !scrolled && !mobileOpen;
  /* Logoya tıklamak ana sayfaya gider; menüde ayrıca "Ana Sayfa" gösterilmez */
  const menuItems = navigation.filter((item) => item.key !== "home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const close = () => setMobileOpen(false);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { close(); menuButton.current?.focus(); }
      if (event.key !== "Tab") return;
      const links = [...(mobileMenu.current?.querySelectorAll<HTMLElement>("a, button") ?? [])]
        .filter(element => element.getClientRects().length && getComputedStyle(element).visibility !== "hidden" && !element.closest("[inert]"));
      const first = menuButton.current;
      const last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1101px)");
    const handleResize = () => { if (desktop.matches) close(); };
    document.addEventListener("keydown", handleKey);
    desktop.addEventListener("change", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      desktop.removeEventListener("change", handleResize);
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) {
            setMobileOpen(false);
          }
        }}
        className={`${styles.header} ${
          scrolled ? styles.scrolled : ""
        } ${transparent ? styles.transparent : ""}`}
      >
        <div className={styles.container}>
          {/* LOGO */}
          <Link
            href="/"
            className={styles.logo}
            aria-label={t.header.homeLabel}
          >
            <Image
              src="/images/brand/logo.svg"
              alt="AKCY"
              width={109}
              height={62}
              priority
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className={styles.desktopNav}
            aria-label={t.header.mainNav}
          >
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div className={styles.headerActions}>
            <Link
              href="/iletisim"
              className={styles.cta}
            >
              <span>{t.header.cta}</span>

              <span aria-hidden="true">↗</span>
            </Link>

            <LanguageSwitcher />
          </div>

          {/* MOBILE BUTTON */}
          <button
            ref={menuButton}
            aria-controls="mobile-navigation"
            type="button"
            className={`${styles.menuButton} ${
              mobileOpen ? styles.menuButtonOpen : ""
            }`}
            onClick={() =>
              setMobileOpen((prev) => !prev)
            }
            aria-label={
              mobileOpen
                ? t.header.closeMenu
                : t.header.openMenu
            }
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        id="mobile-navigation"
        ref={mobileMenu}
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) {
            setMobileOpen(false);
          }
        }}
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuInner}>
          <nav className={styles.mobileNav} aria-label={t.header.mobileNav}>
            {menuItems.map((item, index) => (
              <Link key={item.href} href={item.href} className={styles.mobileLink} aria-current={pathname === item.href ? "page" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>{t.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className={styles.mobileBottom}>
            <div className={styles.mobileLanguage}>
              <p>{t.language.menuTitle}</p>
              <LanguageSwitcher variant="menu" />
            </div>

            <p>
              {t.header.mobileIdea}
            </p>

            <Link href="/iletisim" className={styles.mobileCta}>
              {t.header.mobileCta}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
