import Image from "next/image";
import { getLocale, getT } from "@/i18n/server";
import Link from "@/i18n/Link";

import type { BlogPostMeta } from "@/data/blog";
import { getCategoryLabel } from "@/components/blog/categoryMeta";

import styles from "./NextArticle.module.scss";

interface NextArticleProps {
  post?: BlogPostMeta;
}

export default function NextArticle({ post }: NextArticleProps) {
  if (!post) return null;

  return (
    <div className={styles.wrap}>
      <Link href={`/blog/${post.slug}`} className={styles.next}>
        <Image
          src={post.coverImage.src}
          alt=""
          fill
          sizes="(max-width: 1050px) 100vw, 760px"
          className={styles.img}
        />

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            {getT().blog.next} · {getCategoryLabel(post.category, getLocale()).toLocaleUpperCase(getLocale())}
          </span>

          <h3 className={styles.title}>{post.title}</h3>

          <span className={styles.meta}>
            {getT().blog.card.readingTime.replace("{minutes}", String(post.readingTime))}
          </span>
        </div>

        <span className={styles.arrow} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 16 16">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}
