import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { canonicalSlug, dateLocale, localizePath, localizeSlug, type Locale } from "@/i18n/config";
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

import styles from "./BlogDetailView.module.scss";

export function blogMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.blog;
  return pageMetadata(locale, t.title, t.description, "/blog");
}

export default function BlogView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const allPosts = getAllPosts(locale);
  const featuredPost = getFeaturedPost(locale);

  // Yalnızca yazısı olan kategoriler hero'da ve filtrelerde listelenir.
  const topics = getCategories(locale)
    .map((category) => ({
      ...category,
      count: allPosts.filter((post) => post.category === category.slug).length,
    }))
    .filter((topic) => topic.count > 0);

  return (
    <>
      <BlogHero
        postCount={allPosts.length}
        totalMinutes={allPosts.reduce((sum, post) => sum + post.readingTime, 0)}
        topics={topics}
      />

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

  const home = `${baseUrl}${localizePath("/", locale)}`;
  const blogUrl = `${baseUrl}${localizePath("/blog/", locale)}`;
  const url = `${baseUrl}${localizePath(`/blog/${post.slug}/`, locale)}`;

  /* Google'ın yazıyı doğru yorumlaması için Article + Breadcrumb şeması */
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription ?? post.excerpt,
      image: post.coverImage.src,
      datePublished: post.date,
      dateModified: post.updatedDate ?? post.date,
      inLanguage: dateLocale[locale],
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: { "@type": "Organization", name: post.author?.name ?? "AKCY", url: baseUrl },
      publisher: {
        "@type": "Organization",
        name: "AKCY",
        logo: { "@type": "ImageObject", url: `${baseUrl}/images/brand/logo.svg` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.nav.home, item: home },
        { "@type": "ListItem", position: 2, name: t.nav.blog, item: blogUrl },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  // SSS bölümü varsa Google'da açılır soru-cevap olarak görünebilir
  if (post.faq?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}

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
