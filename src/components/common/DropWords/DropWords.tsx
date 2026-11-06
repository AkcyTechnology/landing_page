import { Fragment, type CSSProperties } from "react";

/*
  Hero başlıkları için ortak animasyon: her kelime yukarıdan, farklı bir
  açıyla düşer, hafifçe sekip yerine oturur (globals.css › .drop-word).
  start: aynı başlıktaki önceki kelime sayısı (sıralı gecikme için).
  Hareket azaltmada animasyon yoktur.
*/
const TILT = [-7, 5, -4, 8, -6, 4];

export function dropWordCount(text: string) {
  return text.split(" ").filter(Boolean).length;
}

export default function DropWords({ text, start = 0, delay = 0.2 }: { text: string; start?: number; delay?: number }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className="drop-word"
            style={
              {
                "--drop-delay": `${delay + (start + index) * 0.11}s`,
                "--tilt": `${TILT[(start + index) % TILT.length]}deg`,
              } as CSSProperties
            }
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
