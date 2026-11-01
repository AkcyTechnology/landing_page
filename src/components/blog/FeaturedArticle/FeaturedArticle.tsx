import Image from "next/image";
import Link from "next/link";

import { categories, type BlogPostMeta } from "@/data/blog";

import styles from "./FeaturedArticle.module.scss";

interface FeaturedArticleProps {
  post: BlogPostMeta;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  const categoryLabel =
    categories.find((category) => category.slug === post.category)?.label ??
    post.category;

  const formattedDate = new Date(post.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className={styles.featured}>
      <div className={styles.image}>
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          sizes="(max-width: 900px) 100vw, 55vw"
          className={styles.img}
          priority
        />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{categoryLabel}</span>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <span className={styles.date}>{formattedDate}</span>
        </div>

        <h2 className={styles.title}>{post.title}</h2>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.footer}>
          <span className={styles.cta}>
            <span>Yazıyı Oku</span>
            <b aria-hidden="true">→</b>
          </span>

          <span className={styles.readingTime}>
            {post.readingTime} dk okuma
          </span>
        </div>
      </div>
    </Link>
  );
}
