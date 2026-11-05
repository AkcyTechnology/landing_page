"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import Link from "@/i18n/Link";

import styles from "./ServicesPage.module.scss";

export interface ArcCard {
  id: string;
  number: string;
  title: string;
  image: string;
}

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  arcLabel: string;
  cards: ArcCard[];
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

/*
  Açılış: hizmet kartları içten bakılan bir silindir yüzeyine dizilir
  (ortadakiler küçük, kenardakiler büyük ve izleyiciye dönük). Fare
  hareketiyle dizi hafifçe döner. Mobilde kaydırılabilir düz şerit olur.
*/
export default function ServicesHero({ eyebrow, title, description, primaryCta, secondaryCta, arcLabel, cards }: Props) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const fine = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 761px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    let target = 0;
    let current = 0;
    const tick = () => {
      current += (target - current) * 0.08;
      element.style.setProperty("--tilt", `${current.toFixed(3)}deg`);
      frame = Math.abs(target - current) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    const handleMove = (event: PointerEvent) => {
      target = ((event.clientX / window.innerWidth) - 0.5) * -8;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const middle = (cards.length - 1) / 2;

  return (
    <section className={styles.hero} aria-labelledby="services-hero-title">
      <div className={styles.heroHead}>
        <p className={styles.heroEyebrow}>{eyebrow}</p>
        <h1 id="services-hero-title" className={styles.heroTitle}>{title}</h1>
      </div>

      <nav className={styles.arc} aria-label={arcLabel}>
        <div ref={track} className={styles.arcTrack}>
          {cards.map((card, index) => {
            const offset = index - middle;
            return (
              <a
                key={card.id}
                href={`#${card.id}`}
                onClick={(event) => scrollToId(event, card.id)}
                className={styles.arcCard}
                style={{ "--o": offset, "--a": Math.abs(offset) } as CSSProperties}
              >
                <span className={styles.arcFace}>
                  {/* Arka plan görseli: yalnızca süsleme, metin bağlantının kendisinde */}
                  <span className={styles.arcImage} style={{ backgroundImage: `url(${card.image})` }} aria-hidden="true" />
                  <span className={styles.arcNumber}>{card.number}</span>
                  <span className={styles.arcTitle}>{card.title}</span>
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      <div className={styles.heroFoot}>
        <p className={styles.heroText}>{description}</p>
        <div className={styles.heroActions}>
          <a href="#hizmet-gruplari" onClick={(event) => scrollToId(event, "hizmet-gruplari")} className={styles.heroPrimary}>
            {primaryCta}
            <span aria-hidden="true">↓</span>
          </a>
          <Link href="/iletisim" className={styles.heroSecondary}>
            {secondaryCta}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
