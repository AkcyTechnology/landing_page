import { blogCategoryLabelsEn, categories, type BlogCategory } from "@/data/blogCategories";
import { dateLocale, type Locale } from "@/i18n/config";

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

export function getCategoryLabel(slug: string, locale: Locale = "tr"): string {
  if (locale === "en") return blogCategoryLabelsEn[slug as BlogCategory] ?? slug;
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}

export function getCategoryAccent(slug: string): string {
  return ACCENTS[slug as BlogCategory] ?? "#16c3ce";
}

export function formatPostDate(date: string, locale: Locale = "tr", month: "long" | "short" = "long"): string {
  return new Date(date).toLocaleDateString(dateLocale[locale], {
    day: "numeric",
    month,
    year: "numeric",
  });
}
