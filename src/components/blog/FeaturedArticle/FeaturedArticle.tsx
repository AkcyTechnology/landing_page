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

import styles from "./FeaturedArticle.module.scss";

interface FeaturedArticleProps {
  post: BlogPostMeta;
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={styles.featured}
      onPointerMove={trackPointer}
      style={
        { "--accent": getCategoryAccent(post.category) } as React.CSSProperties
      }
    >
      <div className={styles.inner}>
        <div className={styles.image}>
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes="(max-width: 1050px) 100vw, 55vw"
            className={styles.img}
            priority
          />

          <span className={styles.badge}>
            <i aria-hidden="true" />
            Öne çıkan yazı
          </span>

          <span className={styles.readTime}>
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <circle
                cx="8"
                cy="8"
                r="6.25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M8 4.75V8l2.25 1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            {post.readingTime} dk okuma
          </span>
        </div>

        <div className={styles.content}>
          <span className={styles.category}>
            <i aria-hidden="true" />
            {getCategoryLabel(post.category)}
          </span>

          <h2 className={styles.title}>{post.title}</h2>

          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.footer}>
            <span className={styles.author}>
              <span className={styles.avatar} aria-hidden="true">
                AK
              </span>
              <span>
                <b>AKCY Editör</b>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>
            </span>

            <span className={styles.cta}>
              <span>Yazıyı oku</span>
              <b aria-hidden="true">→</b>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
