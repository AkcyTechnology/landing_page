"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./AboutHero.module.scss";

/*
  Üst üste görseller: kartlar açılışta sırayla düşüp yığına oturur, ardından
  birkaç saniyede bir öndeki kart arkaya geçer. Görsel verilmeyen kartlar sade
  bir çerçeve olarak görünür. Ekran dışında / gizli sekmede / hareket
  azaltmada döngü durur.
*/
const INTERVAL = 4200;

export default function PhotoStack({ images }: { images: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let inView = false;
    const sync = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (inView && !document.hidden) {
        timer = window.setInterval(() => setFront((value) => (value + 1) % images.length), INTERVAL);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [images.length]);

  return (
    <div ref={ref} className={styles.stack} aria-hidden={images.every((image) => !image.src) ? true : undefined}>
      {images.map((image, index) => {
        /* 0 = önde, 1 = ortada, 2 = arkada */
        const depth = (index - front + images.length) % images.length;
        return (
          <figure
            key={index}
            className={`${styles.card} ${styles[`depth${depth}`]}`}
            style={{ animationDelay: `${0.25 + index * 0.18}s` }}
          >
            {image.src ? (
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1050px) 80vw, 420px" className={styles.cardImage} />
            ) : (
              <span className={styles.cardEmpty} />
            )}
          </figure>
        );
      })}
    </div>
  );
}
