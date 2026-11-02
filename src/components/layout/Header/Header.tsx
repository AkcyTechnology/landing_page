"use client";

import { useEffect, useState, useRef } from "react";
import Link from "@/i18n/Link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";
import { getServiceLinks, navigation } from "@/data/navigation";
import { canonicalPath } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher/LanguageSwitcher";

export default function Header() {
  const locale = useLocale();
  const t = useT();
  const services = getServiceLinks(locale);
  /* Etkin menü öğesi Türkçe (kanonik) adres üzerinden bulunur */
  const pathname = canonicalPath(usePathname() || "/").replace(/(.)\/$/, "$1");
  const isHome = pathname === "/";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);

  const transparent = isHome && !scrolled && !mobileOpen;

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
    const close = () => { setMobileOpen(false); setServicesOpen(false); };
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
            setServicesOpen(false);
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
            {navigation.map((item) => {
              const hasChildren = Boolean(item.hasChildren);

              if (hasChildren) {
                return (
                  <div
                    key={item.key}
                    className={styles.navDropdown}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`${styles.navLink} ${
                        isActive(item.href)
                          ? styles.active
                          : ""
                      }`}
                    >
                      {t.nav[item.key]}

                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    {/* MEGA MENU */}
                    <div className={styles.megaMenu}>
                      <div className={styles.megaInner}>
                        <div className={styles.megaIntro}>
                          <span className={styles.megaEyebrow}>
                            {t.header.megaEyebrow}
                          </span>

                          <h3>
                            {t.header.megaTitle}
                            <span> {t.header.megaTitleAccent}</span>
                          </h3>

                          <p>
                            {t.header.megaText}
                          </p>

                          <Link
                            href="/hizmetler"
                            className={styles.allServices}
                          >
                            {t.header.allServices}
                            <span aria-hidden="true">↗</span>
                          </Link>
                        </div>

                        <div className={styles.serviceGrid}>
                          {services.map((service) => (
                            <Link
                              href={service.href}
                              key={service.href}
                              className={styles.serviceItem}
                            >
                              <span
                                className={styles.serviceNumber}
                              >
                                {service.number}
                              </span>

                              <div
                                className={styles.serviceContent}
                              >
                                <strong>
                                  {service.title}
                                </strong>

                                <p>
                                  {service.description}
                                </p>
                              </div>

                              <span
                                className={styles.serviceArrow}
                              >
                                ↗
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`${styles.navLink} ${
                    isActive(item.href)
                      ? styles.active
                      : ""
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <div className={styles.headerActions}>
            <LanguageSwitcher />
            <Link
              href="/iletisim"
              className={styles.cta}
            >
              <span>{t.header.cta}</span>

              <span aria-hidden="true">↗</span>
            </Link>
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
            setServicesOpen(false);
          }
        }}
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuInner}>
          <nav className={styles.mobileNav} aria-label={t.header.mobileNav}>
            {navigation.map((item, index) => (
              <div key={item.href}>
                <div className={styles.mobileServiceHeader}>
                  <Link href={item.href} className={styles.mobileLink} aria-current={pathname === item.href ? "page" : undefined}>
                    <span>{String(index + 1).padStart(2, "0")}</span>{t.nav[item.key]}
                  </Link>
                  {item.hasChildren && <button type="button" className={styles.serviceToggle} onClick={() => setServicesOpen(open => !open)} aria-expanded={servicesOpen} aria-controls="mobile-service-links" aria-label={servicesOpen ? t.header.closeServices : t.header.openServices}>
                    <span className={servicesOpen ? styles.mobileArrowOpen : ""} aria-hidden="true">+</span>
                  </button>}
                </div>
                {item.hasChildren && <div id="mobile-service-links" inert={!servicesOpen} aria-hidden={!servicesOpen} className={`${styles.mobileServiceList} ${servicesOpen ? styles.mobileServiceListOpen : ""}`}>
                  {services.map(service => <Link href={service.href} key={service.href}><span>{service.number}</span>{service.title}</Link>)}
                  <Link href={item.href} className={styles.mobileAllServices}>{t.common.allServices} <span aria-hidden="true">↗</span></Link>
                </div>}
              </div>
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
