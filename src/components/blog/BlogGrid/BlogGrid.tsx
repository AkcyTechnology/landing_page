"use client";

import { motion, useReducedMotion } from "motion/react";

import type { BlogPostMeta } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard/BlogCard";

import styles from "./BlogGrid.module.scss";

interface BlogGridProps {
  posts: BlogPostMeta[];
}

/*
  3 sütunlu ızgarada son satır boş kalmasın diye bazı kartlar 2 sütun kaplar:
  kalan 2 ise ilk kart, kalan 1 ise ilk ve son kart geniş gösterilir.
*/
function getWideIndexes(count: number): number[] {
  if (count < 2) return [];

  const remainder = count % 3;

  if (remainder === 2) return [0];
  if (remainder === 1) return [0, count - 1];

  return [];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const reduceMotion = useReducedMotion();
  const wide = getWideIndexes(posts.length);

  return (
    <div
      className={`${styles.grid} ${posts.length === 1 ? styles.single : ""}`}
    >
      {posts.map((post, index) => {
        const isWide = wide.includes(index);

        return (
          <motion.div
            key={post.slug}
            className={isWide ? styles.spanLarge : undefined}
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{
              duration: 0.7,
              delay: (index % 3) * 0.08,
              ease: [0.22, 0.8, 0.25, 1],
            }}
          >
            <BlogCard post={post} size={isWide ? "large" : "standard"} />
          </motion.div>
        );
      })}
    </div>
  );
}
