/* Blog kategorileri (istemci bileşenleri yazı içeriklerini yüklemeden kullanabilsin diye ayrı dosyada) */
export type BlogCategory =
  | "yazilim"
  | "ui-ux"
  | "web"
  | "yapay-zeka"
  | "otomasyon"
  | "wordpress"
  | "projeler"
  | "notlar";

export interface CategoryDef {
  slug: BlogCategory;
  label: string;
}

export const categories: CategoryDef[] = [
  { slug: "yazilim", label: "Yazılım" },
  { slug: "ui-ux", label: "UI / UX" },
  { slug: "web", label: "Web" },
  { slug: "yapay-zeka", label: "Yapay Zekâ" },
  { slug: "otomasyon", label: "Süreç Otomasyonu" },
  { slug: "wordpress", label: "WordPress" },
  { slug: "projeler", label: "Projeler" },
  { slug: "notlar", label: "Notlar" },
];

export const blogCategoryLabelsEn: Record<BlogCategory, string> = {
  yazilim: "Software",
  "ui-ux": "UI / UX",
  web: "Web",
  "yapay-zeka": "AI",
  otomasyon: "Process Automation",
  wordpress: "WordPress",
  projeler: "Projects",
  notlar: "Notes",
};
