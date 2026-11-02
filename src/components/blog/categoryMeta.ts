import { categories, type BlogCategory } from "@/data/blog";

// Kartlarda, filtrelerde ve detay sayfasında kullanılan kategori vurgu renkleri.
const ACCENTS: Record<BlogCategory, string> = {
  yazilim: "#16c3ce",
  "ui-ux": "#e8679a",
  web: "#3aa0ff",
  "yapay-zeka": "#8b7cf6",
  otomasyon: "#f2a541",
  wordpress: "#4f8df7",
  projeler: "#2fc28f",
  notlar: "#94a3b8",
};

export function getCategoryLabel(slug: string): string {
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}

export function getCategoryAccent(slug: string): string {
  return ACCENTS[slug as BlogCategory] ?? "#16c3ce";
}

export function formatPostDate(
  date: string,
  month: "long" | "short" = "long"
): string {
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month,
    year: "numeric",
  });
}
