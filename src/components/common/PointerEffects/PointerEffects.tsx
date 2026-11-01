"use client";

import { useEffect } from "react";

/* Manyetik butonlar en fazla bu kadar piksel çekilir */
const MAGNET_STRENGTH = 0.3;
const MAGNET_MAX = 10;
/* Kart eğimi en fazla bu kadar derece */
const TILT_MAX = 5;

/*
  [data-magnetic] öğeleri fareye doğru hafifçe çekilir (CSS translate ile),
  [data-tilt] öğeleri fare konumuna göre 3B eğilir (--rx, --ry, --mx, --my).
  Yalnızca fareli cihazlarda ve hareket azaltma kapalıyken çalışır.
*/
export default function PointerEffects() {
  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduceMotion.matches) return;

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const resetMagnet = () => {
      if (magnet) {
        const from = magnet.style.translate;
        magnet.style.translate = "";
        /* Bileşenlerin kendi transition'larına dokunmadan yumuşak geri dönüş */
        if (from) magnet.animate([{ translate: from }, { translate: "0px 0px" }], { duration: 350, easing: "cubic-bezier(0.22, 0.8, 0.25, 1)" });
      }
      magnet = null;
    };
    const resetTilt = () => {
      if (tilt) {
        tilt.style.removeProperty("--rx");
        tilt.style.removeProperty("--ry");
        tilt.removeAttribute("data-tilt-active");
      }
      tilt = null;
    };

    const handleMove = (event: PointerEvent) => {
      const target = event.target as Element | null;

      const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== magnet) resetMagnet();
      magnet = nextMagnet;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const clamp = (value: number) => Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, value));
        const dx = clamp((event.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH);
        const dy = clamp((event.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH);
        magnet.style.translate = `${dx}px ${dy}px`;
      }

      const nextTilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (nextTilt !== tilt) resetTilt();
      tilt = nextTilt;
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        tilt.setAttribute("data-tilt-active", "");
        tilt.style.setProperty("--rx", `${(0.5 - py) * TILT_MAX * 2}deg`);
        tilt.style.setProperty("--ry", `${(px - 0.5) * TILT_MAX * 2}deg`);
        tilt.style.setProperty("--mx", `${px * 100}%`);
        tilt.style.setProperty("--my", `${py * 100}%`);
      }
    };

    const handleLeave = () => {
      resetMagnet();
      resetTilt();
    };

    document.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
      handleLeave();
    };
  }, []);

  return null;
}
