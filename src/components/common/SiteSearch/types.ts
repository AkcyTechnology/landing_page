export type SearchType = "page" | "service" | "project" | "post" | "faq";

export interface SearchEntry {
  type: SearchType;
  title: string;
  text: string;
  /** Aramada eşleşen ama gösterilmeyen ek kelimeler (teknolojiler, kategori…) */
  keywords?: string;
  /** Türkçe (kanonik) site içi adres; "faq" türünde soru kimliği */
  href: string;
}

/** Header ve diğer bileşenlerin arama penceresini açması için olay adı */
export const OPEN_SEARCH_EVENT = "akcy:open-search";
