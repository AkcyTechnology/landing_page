import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  blogPosts,
  getAdjacentPost,
  getPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
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

import styles from "./page.module.scss";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://akcy.com.tr";

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Yazı Bulunamadı | AKCY" };
  }

  // seoTitle verilmişse olduğu gibi kullanılır (marka eki dahil edilmiş olabilir)
  const title = post.seoTitle ?? `${post.title} | AKCY`;
  const description = post.metaDescription ?? post.excerpt;
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: { absolute: title },
    description,
    keywords: post.focusKeyword
      ? [post.focusKeyword, ...(post.secondaryKeywords ?? [])]
      : post.secondaryKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "AKCY",
      locale: "tr_TR",
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      images: [
        {
          url: post.coverImage.src,
          alt: post.coverImage.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.coverImage.src],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const nextPost = getAdjacentPost(post);
  const relatedPosts = getRelatedPosts(post);

  const url = `${baseUrl}/blog/${post.slug}`;

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
      inLanguage: "tr-TR",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: {
        "@type": "Organization",
        name: post.author?.name ?? "AKCY",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "AKCY",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/brand/logo.svg`,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
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
        <div
          className={`${styles.container} ${
            headings.length >= 3 ? "" : styles.noSidebar
          }`}
        >
          {headings.length >= 3 && (
            <TableOfContents headings={headings} />
          )}

          <div className={styles.main}>
            <ArticleContent blocks={post.content} />

            {post.faq?.length ? <FaqSection items={post.faq} /> : null}

            <ShareBlock title={post.title} slug={post.slug} />
            <AuthorCard
              name={post.author?.name ?? "AKCY"}
              role={post.author?.role}
            />
            <NextArticle post={nextPost} />
          </div>
        </div>
      </section>

      <RelatedArticles posts={relatedPosts} />
    </>
  );
}
