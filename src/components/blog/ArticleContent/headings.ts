import type { ContentBlock } from "@/data/blog";

const TR_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

export function slugify(text: string): string {
  const normalized = text
    .split("")
    .map((char) => TR_CHAR_MAP[char] ?? char)
    .join("");

  return normalized
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(blocks: ContentBlock[]): HeadingItem[] {
  return blocks
    .filter(
      (block): block is Extract<ContentBlock, { type: "h2" | "h3" }> =>
        block.type === "h2" || block.type === "h3"
    )
    .map((block) => ({
      id: block.id ?? slugify(block.text),
      text: block.text,
      level: block.type === "h2" ? 2 : 3,
    }));
}
