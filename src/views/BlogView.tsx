import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalSlug, localizeSlug, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { baseUrl, pageMetadata } from "@/lib/metadata";
import { getAdjacentPost, getAllPosts, getBlogPosts, getCategories, getFeaturedPost, getPostBySlug, getRelatedPosts } from "@/data/blog";
import BlogHero from "@/components/blog/BlogHero/BlogHero";
import BlogListingClient from "@/components/blog/BlogListingClient/BlogListingClient";
import BlogCTA from "@/components/blog/BlogCTA/BlogCTA";
import DetailHero from "@/components/blog/DetailHero/DetailHero";
import ArticleContent from "@/components/blog/ArticleContent/ArticleContent";
import { extractHeadings } from "@/components/blog/ArticleContent/headings";
import TableOfContents from "@/components/blog/TableOfContents/TableOfContents";
import ShareBlock from "@/components/blog/ShareBlock/ShareBlock";
import FaqSection from "@/components/blog/FaqSection/FaqSection";
import NextArticle from "@/components/blog/NextArticle/NextArticle";
import RelatedArticles from "@/components/blog/RelatedArticles/RelatedArticles";
import ReadingProgress from "@/components/blog/ReadingProgress/ReadingProgress";
import AuthorCard from "@/components/blog/AuthorCard/AuthorCard";
import { StructuredData } from "@/lib/StructuredData";
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  graph,
  ORGANIZATION_ID,
  schemaLanguage,
  webPageSchema,
  WEBSITE_ID,
} from "@/lib/schema";

import styles from "./BlogDetailView.module.scss";

export function blogMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.blog;
  return pageMetadata(locale, t.title, t.description, "/blog");
}

export default function BlogView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const allPosts = getAllPosts(locale);
  const featuredPost = getFeaturedPost(locale);

  // Yalnızca yazısı olan kategoriler filtrelerde listelenir.
  const topics = getCategories(locale)
    .map((category) => ({
      ...category,
      count: allPosts.filter((post) => post.category === category.slug).length,
    }))
    .filter((topic) => topic.count > 0);

  /* Blog sayfası: koleksiyon sayfası + yazı listesi + breadcrumb */
  const t = getDictionary(locale);
  const schema = graph(
    webPageSchema({
      path: "/blog",
      locale,
      name: t.pages.blog.title,
      description: t.pages.blog.description,
      type: "CollectionPage",
    }),
    {
      "@type": "ItemList",
      itemListElement: allPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`, locale),
      })),
    },
    breadcrumbSchema(
      [
        { name: t.nav.home, path: "/" },
        { name: t.nav.blog, path: "/blog" },
      ],
      locale
    )
  );

  return (
    <>
      <StructuredData data={schema} />
      <BlogHero />

      <BlogListingClient
        allPosts={allPosts}
        availableCategories={topics.map((topic) => topic.slug)}
        categoryCounts={Object.fromEntries(topics.map((topic) => [topic.slug, topic.count]))}
        featuredPost={featuredPost}
      />

      <BlogCTA />
    </>
  );
}

/* ---------- Blog yazısı ---------- */

export function blogStaticParams(locale: Locale) {
  return getBlogPosts(locale).map((post) => ({ slug: localizeSlug("blog", post.slug, locale) }));
}

function resolvePost(slug: string, locale: Locale) {
  const id = canonicalSlug("blog", decodeURIComponent(slug), locale);
  return id ? getPostBySlug(id, locale) : undefined;
}

export function blogDetailMetadata(slug: string, locale: Locale): Metadata {
  const post = resolvePost(slug, locale);
  if (!post) return { title: getDictionary(locale).pages.notFound.title };

  // seoTitle verilmişse olduğu gibi kullanılır (marka eki dahil edilmiş olabilir)
  const title = post.seoTitle ?? `${post.title} | AKCY`;
  const description = post.metaDescription ?? post.excerpt;
  const base = pageMetadata(locale, post.title, description, `/blog/${post.slug}`, undefined, {
    absoluteTitle: title,
    type: "article",
  });

  return {
    ...base,
    keywords: post.focusKeyword ? [post.focusKeyword, ...(post.secondaryKeywords ?? [])] : post.secondaryKeywords,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      images: [{ url: post.coverImage.src, alt: post.coverImage.alt, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [post.coverImage.src] },
  };
}

export function BlogDetailView({ slug, locale }: { slug: string; locale: Locale }) {
  setRequestLocale(locale);
  const t = getDictionary(locale);
  const post = resolvePost(slug, locale);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const nextPost = getAdjacentPost(post, locale);
  const relatedPosts = getRelatedPosts(post, locale);

  const postPath = `/blog/${post.slug}`;
  const url = absoluteUrl(postPath, locale);
  const image = post.coverImage.src.startsWith("http") ? post.coverImage.src : `${baseUrl}${post.coverImage.src}`;

  /* Yazı + breadcrumb (+ SSS) tek grafikte; yazar ve yayıncı kuruluşun @id'sine bağlanır */
  const schema = graph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.metaDescription ?? post.excerpt,
      image,
      datePublished: post.date,
      dateModified: post.updatedDate ?? post.date,
      inLanguage: schemaLanguage[locale],
      keywords: [post.focusKeyword, ...(post.secondaryKeywords ?? [])].filter(Boolean).join(", ") || undefined,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      isPartOf: { "@id": WEBSITE_ID },
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
    },
    breadcrumbSchema(
      [
        { name: t.nav.home, path: "/" },
        { name: t.nav.blog, path: "/blog" },
        { name: post.title, path: postPath },
      ],
      locale
    ),
    post.faq?.length ? faqSchema(post.faq) : null
  );

  return (
    <>
      <StructuredData data={schema} />

      <ReadingProgress />

      <DetailHero post={post} />

      <section className={styles.body}>
        <div className={`${styles.container} ${headings.length >= 3 ? "" : styles.noSidebar}`}>
          {headings.length >= 3 && <TableOfContents headings={headings} />}

          <div className={styles.main}>
            <ArticleContent blocks={post.content} />

            {post.faq?.length ? <FaqSection items={post.faq} /> : null}

            <ShareBlock title={post.title} slug={post.slug} />
            <AuthorCard name={post.author?.name ?? "AKCY"} role={post.author?.role} />
            <NextArticle post={nextPost} />
          </div>
        </div>
      </section>

      <RelatedArticles posts={relatedPosts} />
    </>
  );
}
