"use client";

import type { MouseEvent } from "react";

import Link from "@/i18n/Link";
import PageHero from "@/components/common/PageHero/PageHero";

import styles from "./ServicesPage.module.scss";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

/* Sayfa içi bağlantılar yumuşak kaydırılır; adres çubuğundaki # güncellenir */
function scrollToId(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/* Hizmetler açılışı: ortak fotoğraflı hero (tasarım sürecinden bir kare) */
export default function ServicesHero({ eyebrow, title, description, primaryCta, secondaryCta }: Props) {
  return (
    <PageHero
      id="services-hero-title"
      eyebrow={eyebrow}
      titleLead={title}
      description={description}
      image="/images/about/tasarim-sureci.webp"
      objectPosition="70% 45%"
    >
      <div className={styles.heroActions}>
        <a href="#hizmet-gruplari" onClick={(event) => scrollToId(event, "hizmet-gruplari")} className={styles.heroPrimary}>
          {primaryCta}
          <span aria-hidden="true">↓</span>
        </a>
        <Link href="/teklif" className={styles.heroSecondary}>
          {secondaryCta}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </PageHero>
  );
}
