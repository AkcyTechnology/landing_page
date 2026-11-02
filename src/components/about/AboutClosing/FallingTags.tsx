"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Matter from "matter-js";

import styles from "./AboutClosing.module.scss";

interface FallingTagsProps {
  tags: string[];
  replayLabel: string;
}

const MOBILE_QUERY = "(max-width: 700px)";
const MOBILE_TAG_COUNT = 5;
const TAG_TONES = ["primary", "blue", "neutral"] as const;

/*
  Kelime etiketleri bölüm ilk göründüğünde düşer ve zeminde yerleşir.
  - Fizik motoru yalnızca bu bölümde, ihtiyaç anında yüklenir.
  - Bölüm ekran dışındayken ya da etiketler durulduğunda hesaplama durur.
  - Masaüstünde etiketler sürüklenebilir; dokunmatikte kaydırma engellenmez.
  - JavaScript yoksa veya hareket azaltılmışsa etiketler sabit bir sırada görünür.
*/
export default function FallingTags({ tags, replayLabel }: FallingTagsProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dropRef = useRef<(() => void) | null>(null);
  const [physics, setPhysics] = useState(false);
  const [visibleCount, setVisibleCount] = useState(tags.length);

  useEffect(() => {
    const narrow = window.matchMedia(MOBILE_QUERY);
    const sync = () => setVisibleCount(narrow.matches ? Math.min(MOBILE_TAG_COUNT, tags.length) : tags.length);
    sync();
    narrow.addEventListener("change", sync);
    return () => narrow.removeEventListener("change", sync);
  }, [tags.length]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let started = false;
    let inView = false;
    let frame = 0;
    let engine: Matter.Engine | null = null;
    let bodies: Matter.Body[] = [];
    let walls: Matter.Body[] = [];
    let drag: Matter.Constraint | null = null;
    let M: typeof Matter | null = null;
    let lastTime = 0;
    const cleanups: (() => void)[] = [];

    const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;
    const canDrag = () => window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    const elements = () =>
      tagRefs.current.filter((el): el is HTMLSpanElement => Boolean(el) && el!.offsetParent !== null);

    const render = () => {
      const els = elements();
      bodies.forEach((body, i) => {
        const el = els[i];
        if (!el) return;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
      });
    };

    const allSleeping = () => bodies.every((body) => body.isSleeping) && !drag;

    const loop = (time: number) => {
      if (!engine || !M) return;
      const delta = Math.min(32, lastTime ? time - lastTime : 16.67);
      lastTime = time;
      M.Engine.update(engine, delta);
      render();
      if (inView && !allSleeping()) frame = requestAnimationFrame(loop);
      else frame = 0;
    };

    const wake = () => {
      if (!M || !engine) return;
      bodies.forEach((body) => M!.Sleeping.set(body, false));
      if (!frame && inView) {
        lastTime = 0;
        frame = requestAnimationFrame(loop);
      }
    };

    const buildWorld = () => {
      if (!M || !engine) return;
      const { Bodies, Composite, Body } = M;
      Composite.clear(engine.world, false);
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const thick = 200;

      walls = [
        Bodies.rectangle(width / 2, height + thick / 2, width * 3, thick, { isStatic: true }),
        Bodies.rectangle(-thick / 2, height / 2 - 600, thick, height * 4, { isStatic: true }),
        Bodies.rectangle(width + thick / 2, height / 2 - 600, thick, height * 4, { isStatic: true }),
      ];

      const mobile = isMobile();
      bodies = elements().map((el, i) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const x = Math.min(width - w / 2, Math.max(w / 2, w / 2 + Math.random() * (width - w)));
        const y = -h - i * (mobile ? 50 : 70) - Math.random() * 40;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: h / 2 - 1 },
          restitution: 0.25,
          friction: 0.4,
          frictionAir: mobile ? 0.03 : 0.015,
          density: 0.002,
          sleepThreshold: 40,
        });
        /* Etiketler hafifçe döner ama ters dönüp okunmaz hâle gelmez */
        Body.setInertia(body, body.inertia * 6);
        Body.setAngle(body, (Math.random() - 0.5) * 0.8);
        Body.setAngularVelocity(body, (Math.random() - 0.5) * (mobile ? 0.05 : 0.12));
        return body;
      });

      Composite.add(engine.world, [...walls, ...bodies]);
      render();
    };

    const drop = () => {
      buildWorld();
      wake();
    };

    const start = async () => {
      started = true;
      const mod = await import("matter-js");
      if (disposed) return;
      M = (mod.default ?? mod) as typeof Matter;
      engine = M.Engine.create({ enableSleeping: true });
      engine.gravity.y = 1;
      setPhysics(true);
      /* Etiketler mutlak konuma geçtikten sonra ölçülür */
      requestAnimationFrame(() => {
        if (disposed) return;
        drop();
      });
    };

    dropRef.current = drop;

    /* Görünürlük: ilk girişte başlat, ekran dışında döngüyü durdur */
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !started) start();
        else if (inView) wake();
        else if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(stage);

    /* Boyut değişince etiketleri yeni genişliğe göre yeniden yerleştir */
    let resizeTimer: number | undefined;
    let lastWidth = stage.clientWidth;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!engine || stage.clientWidth === lastWidth) return;
        lastWidth = stage.clientWidth;
        drop();
      }, 200);
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

    /* Sürükleme (yalnızca fareli cihazlarda) */
    const localPoint = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!M || !engine || !canDrag()) return;
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-tag-index]");
      if (!target) return;
      const index = elements().indexOf(target as HTMLSpanElement);
      const body = bodies[index];
      if (!body) return;
      event.preventDefault();
      target.setPointerCapture(event.pointerId);
      const point = localPoint(event);
      drag = M.Constraint.create({
        pointA: point,
        bodyB: body,
        pointB: { x: point.x - body.position.x, y: point.y - body.position.y },
        stiffness: 0.2,
        damping: 0.1,
        length: 0,
      });
      M.Composite.add(engine.world, drag);
      stage.dataset.dragging = "true";
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag) return;
      const point = localPoint(event);
      drag.pointA = { x: point.x, y: Math.max(0, point.y) };
      wake();
    };

    const onPointerUp = () => {
      if (!drag || !M || !engine) return;
      M.Composite.remove(engine.world, drag);
      drag = null;
      delete stage.dataset.dragging;
      wake();
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    cleanups.push(() => {
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    });

    return () => {
      disposed = true;
      dropRef.current = null;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      cleanups.forEach((fn) => fn());
      if (engine && M) {
        M.Composite.clear(engine.world, false);
        M.Engine.clear(engine);
      }
    };
  }, [visibleCount]);

  const replay = useCallback(() => dropRef.current?.(), []);

  return (
    <div className={styles.tagsArea}>
      <div
        ref={stageRef}
        className={`${styles.stage} ${physics ? styles.stagePhysics : ""}`}
        aria-hidden="true"
      >
        {tags.slice(0, visibleCount).map((tag, index) => (
          <span
            key={tag}
            ref={(el) => {
              tagRefs.current[index] = el;
            }}
            data-tag-index={index}
            className={`${styles.tag} ${styles[`tag_${TAG_TONES[index % TAG_TONES.length]}`]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {physics && (
        <button type="button" className={styles.replay} onClick={replay}>
          <span aria-hidden="true">↻</span> {replayLabel}
        </button>
      )}
    </div>
  );
}
