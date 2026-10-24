import type { BlogPostMeta } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard/BlogCard";

import styles from "./RelatedArticles.module.scss";

interface RelatedArticlesProps {
  posts: BlogPostMeta[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.related}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Bunlar da İlginizi Çekebilir</h2>

        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
