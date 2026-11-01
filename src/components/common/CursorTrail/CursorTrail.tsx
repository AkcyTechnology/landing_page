"use client";

import { useEffect } from "react";

import styles from "./CursorTrail.module.scss";

const SPAWN_THROTTLE_MS = 400;
const MIN_DURATION_MS = 550;
const MAX_DURATION_MS = 700;
const MIN_SPACING_PX = 90;
const MAX_VISIBLE_DIGITS = 2;

export default function CursorTrail() {
  useEffect(() => {
    if (window.innerWidth < 1024 || !window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    let lastSpawn = 0;
    const activeDigits = new Set<HTMLSpanElement>();

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const now = performance.now();

      if (now - lastSpawn < SPAWN_THROTTLE_MS) return;
      if (activeDigits.size >= MAX_VISIBLE_DIGITS) return;

      // Keep new digits clear of the ones still fading, including on slow turns.
      for (const activeDigit of activeDigits) {
        const rect = activeDigit.getBoundingClientRect();
        if (Math.hypot(
          event.clientX - (rect.left + rect.width / 2),
          event.clientY - (rect.top + rect.height / 2)
        ) < MIN_SPACING_PX) return;
      }
      lastSpawn = now;

      const digit = document.createElement("span");
      digit.className = styles.digit;
      digit.textContent = Math.random() > 0.5 ? "1" : "0";
      digit.setAttribute("aria-hidden", "true");

      digit.style.left = `${event.clientX}px`;
      digit.style.top = `${event.clientY}px`;
      digit.style.fontSize = `${34 + Math.random() * 4}px`;

      document.body.appendChild(digit);
      activeDigits.add(digit);

      const driftX = (Math.random() - 0.5) * 6;
      const driftY = 8 + Math.random() * 6;
      const rotate = (Math.random() - 0.5) * 14;

      const animation = digit.animate(
        [
          {
            opacity: 0.8,
            transform: `translate(-50%, -50%) rotate(${rotate}deg) translate(0, 0)`,
          },
          {
            opacity: 0,
            transform: `translate(-50%, -50%) rotate(${rotate}deg) translate(${driftX}px, ${driftY}px)`,
          },
        ],
        {
          duration:
            MIN_DURATION_MS + Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS),
          easing: "ease-out",
          fill: "forwards",
        }
      );

      animation.onfinish = () => {
        activeDigits.delete(digit);
        digit.remove();
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      for (const digit of activeDigits) {
        digit.getAnimations().forEach((animation) => animation.cancel());
        digit.remove();
      }
      activeDigits.clear();
    };
  }, []);

  return null;
}
