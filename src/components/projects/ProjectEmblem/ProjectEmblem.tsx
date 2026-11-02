import Image from "next/image";

import type { EmblemId } from "@/content/projects-page";

/*
  AKCY ürün amblemleri: Connectly'nin düğüm-ağ diliyle çizilmiş işaretler.
  Çizgiler pathLength=1 ile normalize edilir; böylece ProjectsShowcase
  animasyonu her çizgiyi aynı şekilde "çizebilir".
*/
const COLOR = "#11998e";

type Line = [number, number, number, number];
type Node = [number, number, number];

const SHAPES: Record<Exclude<EmblemId, "connectly">, { lines: Line[]; nodes: Node[] }> = {
  // Düğümlerden oluşan onay işareti: tamamlanan görev
  "calm-do": {
    lines: [
      [18, 52, 40, 74], [40, 74, 60, 51], [60, 51, 82, 26], [18, 52, 32, 44],
      [32, 44, 40, 74], [32, 44, 60, 51], [60, 51, 66, 72], [40, 74, 66, 72],
    ],
    nodes: [[18, 52, 6], [40, 74, 7.5], [82, 26, 7.5], [60, 51, 5.5], [32, 44, 4.5], [66, 72, 4.5]],
  },
  // Düğümlerden oluşan soru işareti: tahmin
  "guess-player": {
    lines: [
      [30, 36, 40, 20], [40, 20, 60, 15], [60, 15, 73, 28], [73, 28, 68, 45],
      [68, 45, 52, 55], [52, 55, 50, 68], [40, 20, 73, 28], [60, 15, 68, 45], [30, 36, 60, 15],
    ],
    nodes: [[30, 36, 6], [40, 20, 5], [60, 15, 6.5], [73, 28, 6], [68, 45, 5], [52, 55, 5.5], [50, 68, 5], [50, 86, 7.5]],
  },
  // Yükselen düğüm akışı: ihaleden teklife, satışa
  bidflow: {
    lines: [
      [14, 76, 36, 56], [36, 56, 56, 64], [56, 64, 84, 26], [14, 76, 56, 64],
      [36, 56, 84, 26], [56, 64, 74, 80], [84, 26, 88, 56], [56, 64, 88, 56],
    ],
    nodes: [[14, 76, 6], [36, 56, 6], [56, 64, 7], [84, 26, 8], [74, 80, 4.5], [88, 56, 4.5]],
  },
};

interface ProjectEmblemProps {
  id: EmblemId;
  size: number;
  /** Ekran okuyucu metni; verilmezse süs olarak gizlenir */
  label?: string;
  className?: string;
}

export default function ProjectEmblem({ id, size, label, className }: ProjectEmblemProps) {
  if (id === "connectly") {
    return (
      <Image
        src="/images/projects/connectly/emblem.png"
        alt={label ?? ""}
        width={size}
        height={size}
        className={className}
        aria-hidden={label ? undefined : true}
      />
    );
  }

  const shape = SHAPES[id];
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} focusable="false" {...a11y}>
      <g stroke={COLOR} strokeWidth={size < 48 ? 4 : 3} strokeLinecap="round">
        {shape.lines.map(([x1, y1, x2, y2], index) => (
          <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1} style={{ ["--i" as string]: index }} />
        ))}
      </g>
      <g fill={COLOR}>
        {shape.nodes.map(([cx, cy, r], index) => (
          <circle key={index} cx={cx} cy={cy} r={size < 48 ? r + 1 : r} style={{ ["--i" as string]: index }} />
        ))}
      </g>
    </svg>
  );
}
