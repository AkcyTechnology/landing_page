import Link from "next/link";

import type { BlogPostMeta } from "@/data/blog";

import styles from "./NextArticle.module.scss";

interface NextArticleProps {
  post?: BlogPostMeta;
}

export default function NextArticle({ post }: NextArticleProps) {
  if (!post) return null;

  return (
    <div className={styles.wrap}>
      <Link href={`/blog/${post.slug}`} className={styles.next}>
        <span className={styles.eyebrow}>SONRAKİ YAZI</span>
        <h3 className={styles.title}>
          <span>{post.title}</span>
          <b aria-hidden="true">→</b>
        </h3>
      </Link>
    </div>
  );
}
