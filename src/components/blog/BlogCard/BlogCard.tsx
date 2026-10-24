import Image from "next/image";
import Link from "next/link";

import { categories, type BlogPostMeta } from "@/data/blog";

import styles from "./BlogCard.module.scss";

interface BlogCardProps {
  post: BlogPostMeta;
  size?: "large" | "standard";
}

export default function BlogCard({ post, size = "standard" }: BlogCardProps) {
  const categoryLabel =
    categories.find((category) => category.slug === post.category)?.label ??
    post.category;

  const formattedDate = new Date(post.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.card} ${
        size === "large" ? styles.cardLarge : ""
      }`}
    >
      <div className={styles.image}>
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
          className={styles.img}
        />
      </div>

      <span className={styles.category}>{categoryLabel}</span>

      <h3 className={styles.title}>{post.title}</h3>

      <p className={styles.excerpt}>{post.excerpt}</p>

      <div className={styles.footer}>
        <span className={styles.date}>
          {formattedDate} · {post.readingTime} dk
        </span>

        <span className={styles.link}>
          <span>Oku</span>
          <b aria-hidden="true">→</b>
        </span>
      </div>
    </Link>
  );
}
