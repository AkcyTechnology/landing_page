import { getAllPosts } from "@/data/blog";
import { localizePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { baseUrl } from "@/lib/metadata";
import { getCategoryLabel } from "@/components/blog/categoryMeta";

/* Blog RSS 2.0 beslemesi: /rss.xml (Türkçe) ve /en/rss.xml (İngilizce) */

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function rssPath(locale: Locale) {
  return locale === "en" ? "/en/rss.xml" : "/rss.xml";
}

export function buildRss(locale: Locale): Response {
  const t = getDictionary(locale);
  const blogUrl = `${baseUrl}${localizePath("/blog/", locale)}`;
  const posts = [...getAllPosts(locale)].sort((a, b) => b.date.localeCompare(a.date));

  const items = posts
    .map((post) => {
      const url = `${baseUrl}${localizePath(`/blog/${post.slug}/`, locale)}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escape(getCategoryLabel(post.category, locale))}</category>
      <description>${escape(post.excerpt)}</description>
      <enclosure url="${escape(post.coverImage.src.startsWith("http") ? post.coverImage.src : `${baseUrl}${post.coverImage.src}`)}" type="image/jpeg" length="0" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`AKCY ${t.pages.blog.title}`)}</title>
    <link>${blogUrl}</link>
    <description>${escape(t.pages.blog.description)}</description>
    <language>${locale === "en" ? "en" : "tr-TR"}</language>
    <atom:link href="${baseUrl}${rssPath(locale)}" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
