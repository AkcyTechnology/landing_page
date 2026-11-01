import type { BlogPostMeta } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard/BlogCard";

import styles from "./BlogGrid.module.scss";

interface BlogGridProps {
  posts: BlogPostMeta[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  // 3 sütunda tek kart açıkta kalacaksa ızgara 2 sütuna geçer.
  const twoColumns = posts.length === 2 || posts.length === 4;

  return (
    <div className={`${styles.grid} ${twoColumns ? styles.twoColumns : ""}`}>
      {posts.map((post, index) => (
        <div
          key={post.slug}
          className={
            index === 0 && post.size === "large" ? styles.spanLarge : ""
          }
        >
          <BlogCard
            post={post}
            size={index === 0 ? post.size : "standard"}
          />
        </div>
      ))}
    </div>
  );
}
