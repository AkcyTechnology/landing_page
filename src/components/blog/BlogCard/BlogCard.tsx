"use client";

import Image from "next/image";
import Link from "next/link";

import type { BlogPostMeta } from "@/data/blog";
import {
  formatPostDate,
  getCategoryAccent,
  getCategoryLabel,
} from "@/components/blog/categoryMeta";
import { trackPointer } from "@/components/blog/trackPointer";

import styles from "./BlogCard.module.scss";

interface BlogCardProps {
  post: BlogPostMeta;
  size?: "large" | "standard";
}

export default function BlogCard({ post, size = "standard" }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      onPointerMove={trackPointer}
      className={`${styles.card} ${
        size === "large" ? styles.cardLarge : ""
      }`}
      style={
        { "--accent": getCategoryAccent(post.category) } as React.CSSProperties
      }
    >
      <div className={styles.image}>
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.alt}
          fill
          sizes={
            size === "large"
              ? "(max-width: 1050px) 100vw, 40vw"
              : "(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
          }
          className={styles.img}
        />

        <span className={styles.category}>
          <i aria-hidden="true" />
          {getCategoryLabel(post.category)}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true" className={styles.sep} />
          <span>{post.readingTime} dk okuma</span>
        </div>

        <h3 className={styles.title}>{post.title}</h3>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <span className={styles.link}>
          <span>Yazıyı oku</span>
          <b aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </b>
        </span>
      </div>
    </Link>
  );
}
