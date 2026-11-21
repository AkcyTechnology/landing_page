import type { CSSProperties } from "react";

/*
  Hero başlıkları için ortak, sakin animasyon: satır bir bütün olarak hafifçe
  yukarı süzülerek belirir (globals.css › .hero-line). Aynı başlıktaki ikinci
  satır, önceki satırın kelime sayısına göre biraz daha geç gelir.
  start: aynı başlıktaki önceki kelime sayısı. Hareket azaltmada animasyon yoktur.
*/
export function dropWordCount(text: string) {
  return text.split(" ").filter(Boolean).length;
}

export default function DropWords({ text, start = 0, delay = 0.2 }: { text: string; start?: number; delay?: number }) {
  return (
    <span className="hero-line" style={{ "--line-delay": `${delay + Math.min(start, 4) * 0.06}s` } as CSSProperties}>
      {text}
    </span>
  );
}
