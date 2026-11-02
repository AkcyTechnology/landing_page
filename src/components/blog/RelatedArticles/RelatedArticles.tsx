import Link from "next/link";

import type { BlogPostMeta } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard/BlogCard";
import Reveal from "@/components/blog/Reveal/Reveal";

import styles from "./RelatedArticles.module.scss";

interface RelatedArticlesProps {
  posts: BlogPostMeta[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.container}>
        <Reveal className={styles.head}>
          <div>
            <span className={styles.eyebrow}>
              <i aria-hidden="true" />
              OKUMAYA DEVAM EDİN
            </span>
            <h2 className={styles.heading}>Bunlar da ilginizi çekebilir</h2>
          </div>

          <Link href="/blog" className={styles.all}>
            Tüm yazılar <b aria-hidden="true">→</b>
          </Link>
        </Reveal>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.1}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
