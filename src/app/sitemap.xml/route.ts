import { getAllProjects } from "@/data/projects";
import { getAllPosts } from "@/data/blog";
import { localizePath, locales } from "@/i18n/config";
import { baseUrl } from "@/lib/metadata";

// Statik export: site haritası build sırasında dosya olarak üretilir.
export const dynamic = "force-static";

interface Entry {
  path: string; // Türkçe (kanonik) adres
  changefreq: string;
  priority: string;
}

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

function absolute(path: string) {
  return `${baseUrl}${withSlash(path)}`;
}

function generateSiteMap() {
  const staticPages: Entry[] = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/hizmetler", changefreq: "monthly", priority: "0.9" },
    { path: "/projelerimiz", changefreq: "monthly", priority: "0.8" },
    { path: "/hakkimizda", changefreq: "monthly", priority: "0.7" },
    { path: "/blog", changefreq: "weekly", priority: "0.8" },
    { path: "/iletisim", changefreq: "monthly", priority: "0.7" },
  ];

  const projectPages: Entry[] = getAllProjects().map((project) => ({
    path: `/projelerimiz/${project.slug}`,
    changefreq: "monthly",
    priority: "0.75",
  }));

  const blogPages: Entry[] = getAllPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  }));

  const legalPages: Entry[] = ["privacy", "kvkk", "cookies"].map((slug) => ({
    path: `/${slug}`,
    changefreq: "yearly",
    priority: "0.3",
  }));

  const entries = [...staticPages, ...projectPages, ...blogPages, ...legalPages];

  /* Her sayfa iki dilde listelenir; hreflang bağlantıları karşılıklıdır */
  const urls = entries.flatMap(({ path, changefreq, priority }) => {
    const alternates = locales
      .map((locale) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absolute(localizePath(path, locale)))}" />`)
      .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(path))}" />`)
      .join("\n      ");

    return locales.map(
      (locale) => `
    <url>
      <loc>${escapeXml(absolute(localizePath(path, locale)))}</loc>
      ${alternates}
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`
    );
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}
</urlset>
`;
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  return new Response(generateSiteMap(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
