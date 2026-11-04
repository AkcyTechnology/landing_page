"use client";

import { useEffect, useRef } from "react";

import styles from "./AboutHero.module.scss";

/*
  Düşen etiketler (yalnızca Web Animations API: element.animate).
  - Sunucuda ve JS yokken / hareket azaltmada: zeminde sabit, düzenli yığın.
  - Canlı mod: etiketler hero'nun üstünden (şeffaf menünün arkasından) düşer,
    zemine çarpıp seker ve yığılır; ~3,8 sn sonra zemin açılır, etiketler
    aşağı düşüp kaybolur ve döngü yeni, rastgele bir dizilimle baştan başlar.
  - Hero ekranda değilken veya sekme arka plandayken durur; görününce baştan
    başlar. Yalnızca transform ve opacity canlandırılır.
*/

const TONES = ["dark", "brand", "light"] as const;
const HOLD = 3800;
const RESTART_DELAY = 1500;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const sign = () => (Math.random() < 0.5 ? -1 : 1);
const T = (x: number, y: number, r: number) => `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(2)}deg)`;

function shuffle<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface Placement {
  index: number;
  x: number;
  y: number;
  rotate: number;
}

export default function TagRain({ tags }: { tags: string[] }) {
  const layerRef = useRef<HTMLDivElement>(null);
  /* Daha dolu bir yığın için her kelime iki kez kullanılır; dizilim her döngüde karışır */
  const pool = [...tags, ...tags];

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = [...layer.querySelectorAll<HTMLElement>("[data-tag]")];
    const floors = [...layer.querySelectorAll<HTMLElement>("[data-floor]")];
    const timers = new Set<number>();
    let animations: Animation[] = [];
    let sizes: { w: number; h: number }[] = [];
    let placements: Placement[] = [];
    let running = false;
    let inView = false;
    let disposed = false;
    let lastWidth = 0;
    let resizeTimer: number | undefined;

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const clearAll = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };

    const measure = () => {
      sizes = els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
    };

    /* Her döngüde yeni, rastgele dizilim */
    const layout = () => {
      const width = layer.clientWidth;
      const height = layer.clientHeight;
      const narrow = window.innerWidth < 640;
      const rows = 3;
      const extrasMax = narrow ? 4 : 8;
      const side = narrow ? 8 : 16;
      const tagH = sizes[0]?.h ?? 40;
      const floorY = height - 1;
      const order = shuffle(els.map((_, index) => index));
      const result: Placement[] = [];
      let cursor = 0;

      for (let row = 0; row < rows; row++) {
        const y = floorY - (row + 1) * tagH;
        /* Tek satırlar (1., 3.) biraz içeriden başlar */
        let x = side + (row % 2 === 0 ? rand(12, 44) : rand(0, 10));
        while (cursor < order.length) {
          const index = order[cursor];
          const { w } = sizes[index];
          if (x + w > width - side) break;
          result.push({ index, x, y, rotate: row === 0 ? rand(-1.5, 1.5) : rand(-4, 4) });
          x += w + rand(2, 20);
          cursor++;
        }
      }

      /* Sığmayanlardan birkaçı yığının üstüne eğik olarak yerleşir; kalanlar gizli */
      const topY = floorY - rows * tagH;
      order.slice(cursor, cursor + extrasMax).forEach((index) => {
        const { w } = sizes[index];
        result.push({
          index,
          x: rand(side, Math.max(side, width - w - side)),
          y: topY - rand(0, tagH * 0.3),
          rotate: sign() * rand(12, 26),
        });
      });

      return result;
    };

    const exit = () => {
      const height = layer.clientHeight;
      let longest = 0;
      placements.forEach((p) => {
        const el = els[p.index];
        const { h } = sizes[p.index];
        const delay = rand(0, 450);
        const duration = rand(650, 900);
        longest = Math.max(longest, delay + duration);
        animations.push(
          el.animate(
            [
              { transform: T(p.x, p.y, p.rotate), opacity: 1 },
              { transform: T(p.x + rand(-30, 30), height + h + 80, p.rotate + sign() * rand(10, 35)), opacity: 1 },
            ],
            { duration, delay, easing: "cubic-bezier(0.55, 0, 1, 0.45)", fill: "both" }
          )
        );
      });
      /* Zemin ortadan açılır */
      floors.forEach((floor) =>
        animations.push(
          floor.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], {
            duration: 420,
            easing: "cubic-bezier(0.55, 0, 1, 0.45)",
            fill: "forwards",
          })
        )
      );
      later(cycle, longest + RESTART_DELAY);
    };

    const cycle = () => {
      if (!running) return;
      clearAll();
      placements = layout();

      floors.forEach((floor) =>
        animations.push(floor.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 300, easing: "ease-out", fill: "forwards" }))
      );

      let longest = 0;
      placements.forEach((p, order) => {
        const el = els[p.index];
        const { h } = sizes[p.index];
        const delay = order * 85 + rand(0, 60);
        const duration = rand(900, 1200);
        const bounce = rand(6, 14);
        const startX = p.x + rand(-50, 50);
        const startY = -(h + rand(40, 140));
        longest = Math.max(longest, delay + duration);
        animations.push(
          el.animate(
            [
              /* Yerçekimi: ease-in düşüş, zemine değince seker ve yerine oturur */
              { transform: T(startX, startY, rand(-45, 45)), opacity: 1, offset: 0, easing: "cubic-bezier(0.5, 0, 0.9, 0.4)" },
              { transform: T(p.x, p.y, p.rotate * 1.6), offset: 0.72, easing: "cubic-bezier(0.2, 0.7, 0.4, 1)" },
              { transform: T(p.x, p.y - bounce, p.rotate * 0.4), offset: 0.86, easing: "cubic-bezier(0.5, 0, 0.75, 0)" },
              { transform: T(p.x, p.y, p.rotate), opacity: 1, offset: 1 },
            ],
            { duration, delay, fill: "both" }
          )
        );
      });

      later(exit, longest + HOLD);
    };

    const start = () => {
      if (running || disposed) return;
      running = true;
      cycle();
    };

    const stop = () => {
      running = false;
      clearAll();
    };

    const sync = () => (inView && !document.hidden ? start() : stop());

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });

    const onVisibility = () => sync();
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const width = layer.clientWidth;
        if (Math.abs(width - lastWidth) < 40) return;
        lastWidth = width;
        measure();
        if (running) {
          stop();
          start();
        }
      }, 200);
    };

    document.fonts.ready.then(() => {
      if (disposed) return;
      layer.setAttribute("data-live", "");
      measure();
      lastWidth = layer.clientWidth;
      observer.observe(layer);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("resize", onResize);
    });

    return () => {
      disposed = true;
      stop();
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [tags]);

  return (
    <div ref={layerRef} className={styles.tags} aria-hidden="true">
      <span className={`${styles.floor} ${styles.floorLeft}`} data-floor />
      <span className={`${styles.floor} ${styles.floorRight}`} data-floor />
      {pool.map((tag, index) => (
        <span key={`${tag}-${index}`} className={`${styles.tag} ${styles[`tag_${TONES[index % TONES.length]}`]}`} data-tag>
          {tag}
        </span>
      ))}
    </div>
  );
}
