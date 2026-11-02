"use client";

import { useEffect, useRef, useState } from "react";
import type Matter from "matter-js";

import styles from "./AboutClosing.module.scss";

interface FallingTagsProps {
  tags: string[];
  label: string;
  pauseLabel: string;
  resumeLabel: string;
}

const MOBILE_QUERY = "(max-width: 700px)";
const DESKTOP_COUNT = 40;
const MOBILE_COUNT = 20;
const TONES = ["primary", "blue", "neutral"] as const;

/* Döngü zamanlaması (ms, simülasyon zamanı: duraklatınca durur) */
const SPAWN_MIN = 90;
const SPAWN_MAX = 230;
const SETTLE_MAX = 5000;
const HOLD = 2000;
const REMOVE_STEP = 110;
const FADE = 380;
const GAP = 700;
/* Etiketler en fazla bu kadar döner (radyan): okunur kalır */
const MAX_ANGLE = 0.38;
const STEP = 1000 / 60;

type Phase = "spawn" | "settle" | "hold" | "clear" | "gap";

/* Her döngüde farklı sıra: kelimeler karıştırılır, gerekirse tekrar eder */
function pickWords(tags: string[], count: number) {
  const words: string[] = [];
  while (words.length < count) {
    const shuffled = [...tags];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    words.push(...shuffled);
  }
  return words.slice(0, count);
}

/*
  Kelime etiketleri üstten farklı zaman ve konumlardan düşer, çarpışıp birikir,
  alan dolunca 2 sn bekler, sonra sırayla küçülüp silinir ve döngü yeniden başlar.
  - Silinen etiketin fizik gövdesi dünyadan kaldırılır; sabit sayıda DOM öğesi
    her döngüde yeniden kullanılır (nesne, zamanlayıcı ve dinleyici birikmez).
  - Bütün zamanlama tek bir requestAnimationFrame döngüsündedir; alan ekran
    dışındayken, sekme gizliyken veya kullanıcı duraklattığında döngü durur.
  - Etiketler dokunmayı yakalamaz; mobilde sayfa kaydırması engellenmez.
  - Hareket azaltma tercihinde ve JavaScript yokken sabit bir kompozisyon görünür.
*/
export default function FallingTags({ tags, label, pauseLabel, resumeLabel }: FallingTagsProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const syncRef = useRef<() => void>(() => {});
  const pausedRef = useRef(false);
  const [physics, setPhysics] = useState(false);
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(DESKTOP_COUNT);

  useEffect(() => {
    const narrow = window.matchMedia(MOBILE_QUERY);
    const sync = () => setCount(narrow.matches ? MOBILE_COUNT : DESKTOP_COUNT);
    sync();
    narrow.addEventListener("change", sync);
    return () => narrow.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current();
  }, [paused]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let started = false;
    let inView = false;
    let frame = 0;
    let lastTime = 0;
    let sim = 0;
    let M: typeof Matter | null = null;
    let engine: Matter.Engine | null = null;
    let walls: Matter.Body[] = [];
    let bodies: (Matter.Body | null)[] = [];
    let spawnAt: number[] = [];
    let spawnX: number[] = [];
    let spawned = 0;
    let cycleSize = 0;
    let acc = 0;
    let removeOrder: number[] = [];
    let removed = 0;
    let nextRemove = 0;
    let phase: Phase = "gap";
    let phaseStart = 0;
    let resizeTimer: number | undefined;

    const slots = () => slotRefs.current.slice(0, count).filter((el): el is HTMLSpanElement => Boolean(el));
    const mobile = () => window.matchMedia(MOBILE_QUERY).matches;

    const buildWalls = () => {
      if (!M || !engine) return;
      if (walls.length) M.Composite.remove(engine.world, walls);
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const thick = 200;
      walls = [
        M.Bodies.rectangle(width / 2, height + thick / 2, width * 3, thick, { isStatic: true }),
        M.Bodies.rectangle(-thick / 2, height / 2 - 600, thick, height * 4, { isStatic: true }),
        M.Bodies.rectangle(width + thick / 2, height / 2 - 600, thick, height * 4, { isStatic: true }),
      ];
      M.Composite.add(engine.world, walls);
    };

    const removeAllBodies = () => {
      if (!M || !engine) return;
      bodies.forEach((body) => body && M!.Composite.remove(engine!.world, body));
      bodies = [];
    };

    const startCycle = () => {
      removeAllBodies();
      const els = slots();
      /* Etiket havuzu henüz DOM'da değilse kısa süre sonra yeniden dene */
      if (els.length === 0) {
        cycleSize = 0;
        phase = "gap";
        phaseStart = sim - (FADE + GAP) + 100;
        return;
      }
      cycleSize = els.length;
      const words = pickWords(tags, els.length);
      const width = stage.clientWidth;
      let t = sim + 150;
      spawnAt = [];
      spawnX = [];
      els.forEach((el, index) => {
        el.textContent = words[index];
        el.dataset.state = "wait";
        el.style.transform = "translate(-9999px, -9999px)";
        t += SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
        spawnAt.push(t);
        spawnX.push(Math.random() * width);
      });
      bodies = els.map(() => null);
      spawned = 0;
      removed = 0;
      phase = "spawn";
      phaseStart = sim;
    };

    const spawn = (index: number) => {
      if (!M || !engine) return;
      const el = slots()[index];
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const width = stage.clientWidth;
      const x = Math.min(width - w / 2, Math.max(w / 2, spawnX[index]));
      const body = M.Bodies.rectangle(x, -h - 10, w, h, {
        chamfer: { radius: h / 2 - 1 },
        restitution: 0.2,
        friction: 0.5,
        frictionAir: mobile() ? 0.025 : 0.015,
        density: 0.002,
        sleepThreshold: 45,
      });
      /* Hafifçe döner ama ters dönüp okunmaz hâle gelmez */
      M.Body.setInertia(body, body.inertia * 8);
      M.Body.setAngle(body, (Math.random() - 0.5) * 0.5);
      M.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      M.Composite.add(engine.world, body);
      bodies[index] = body;
      el.dataset.state = "in";
    };

    const render = () => {
      const els = slots();
      bodies.forEach((body, index) => {
        const el = els[index];
        if (!body || !el) return;
        el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`;
      });
    };

    const step = () => {
      const els = slots();
      switch (phase) {
        case "spawn":
          while (spawned < cycleSize && sim >= spawnAt[spawned]) spawn(spawned++);
          if (spawned >= cycleSize) {
            phase = "settle";
            phaseStart = sim;
          }
          break;
        case "settle": {
          const resting = bodies.every((body) => !body || body.isSleeping || body.speed < 0.08);
          if ((resting && sim - phaseStart > 600) || sim - phaseStart > SETTLE_MAX) {
            phase = "hold";
            phaseStart = sim;
          }
          break;
        }
        case "hold":
          if (sim - phaseStart >= HOLD) {
            /* Üstteki etiketlerden başlayarak sırayla silinir */
            removeOrder = bodies
              .map((body, index) => ({ index, y: body ? body.position.y : 0 }))
              .sort((a, b) => a.y - b.y)
              .map((item) => item.index);
            removed = 0;
            nextRemove = sim;
            phase = "clear";
          }
          break;
        case "clear":
          while (removed < removeOrder.length && sim >= nextRemove) {
            const index = removeOrder[removed++];
            const body = bodies[index];
            if (body && M && engine) M.Composite.remove(engine.world, body);
            bodies[index] = null;
            const el = els[index];
            if (el) el.dataset.state = "out";
            nextRemove += REMOVE_STEP;
            /* Kalan etiketler boşalan yere yerleşebilsin */
            bodies.forEach((other) => other && M?.Sleeping.set(other, false));
          }
          if (removed >= removeOrder.length) {
            phase = "gap";
            phaseStart = sim;
          }
          break;
        case "gap":
          if (sim - phaseStart >= FADE + GAP) startCycle();
          break;
      }
    };

    const running = () => inView && !document.hidden && !pausedRef.current && !disposed;

    const loop = (time: number) => {
      frame = 0;
      if (!M || !engine || !running()) return;
      const delta = Math.min(50, lastTime ? time - lastTime : 16.67);
      lastTime = time;
      sim += delta;
      /* Sabit adımlı fizik: kararlı çarpışma, en fazla 3 adım/kare */
      acc = Math.min(acc + delta, STEP * 3);
      while (acc >= STEP) {
        M.Engine.update(engine, STEP);
        acc -= STEP;
      }
      bodies.forEach((body) => {
        if (!body || Math.abs(body.angle) <= MAX_ANGLE) return;
        M!.Body.setAngle(body, Math.sign(body.angle) * MAX_ANGLE);
        M!.Body.setAngularVelocity(body, 0);
      });
      step();
      render();
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      if (running() && engine && !frame) {
        lastTime = 0;
        frame = requestAnimationFrame(loop);
      } else if (!running() && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    syncRef.current = sync;

    const start = async () => {
      started = true;
      const mod = await import("matter-js");
      if (disposed) return;
      M = (mod.default ?? mod) as typeof Matter;
      engine = M.Engine.create({ enableSleeping: true });
      setPhysics(true);
      /* Etiket havuzu render edildikten sonra ölçüm yapılır */
      requestAnimationFrame(() => {
        if (disposed) return;
        buildWalls();
        startCycle();
        sync();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !started) start();
        else sync();
      },
      { threshold: 0.15 }
    );
    observer.observe(stage);

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);

    let lastWidth = stage.clientWidth;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!engine || stage.clientWidth === lastWidth) return;
        lastWidth = stage.clientWidth;
        buildWalls();
        startCycle();
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      syncRef.current = () => {};
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      if (engine && M) {
        M.Composite.clear(engine.world, false);
        M.Engine.clear(engine);
      }
    };
  }, [count, tags]);

  /* Hareket yokken (JS kapalı, hareket azaltma) gösterilen sabit kompozisyon */
  const staticTags = tags.slice(0, count === MOBILE_COUNT ? 12 : tags.length);

  return (
    <div className={styles.tagsArea}>
      {physics && (
        <button
          type="button"
          className={styles.motionToggle}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">
            {paused ? (
              <svg viewBox="0 0 18 18" width="18" height="18"><path d="M5 3.5v11l9-5.5z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 18 18" width="18" height="18"><path d="M5 3.5h3v11H5zM10 3.5h3v11h-3z" fill="currentColor" /></svg>
            )}
          </span>
          {paused ? resumeLabel : pauseLabel}
        </button>
      )}

      <div ref={stageRef} className={`${styles.stage} ${physics ? styles.stagePhysics : ""}`} role="img" aria-label={`${label}: ${tags.join(", ")}`}>
        {physics
          ? Array.from({ length: count }, (_, index) => (
              <span
                key={index}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                className={`${styles.tag} ${styles.tagSlot} ${styles[`tag_${TONES[index % TONES.length]}`]}`}
                aria-hidden="true"
              />
            ))
          : staticTags.map((tag, index) => (
              <span key={tag} className={`${styles.tag} ${styles[`tag_${TONES[index % TONES.length]}`]}`} aria-hidden="true">
                {tag}
              </span>
            ))}
      </div>
    </div>
  );
}
