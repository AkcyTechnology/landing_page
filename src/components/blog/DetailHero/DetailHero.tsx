import Image from "next/image";
import Link from "next/link";

import { categories, type BlogPost } from "@/data/blog";

import styles from "./DetailHero.module.scss";

interface DetailHeroProps {
  post: BlogPost;
}

export default function DetailHero({ post }: DetailHeroProps) {
  const categoryLabel =
    categories.find((category) => category.slug === post.category)?.label ??
    post.category;

  const formattedDate = new Date(post.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <Link href="/blog" className={styles.back}>
          <span aria-hidden="true">←</span>
          <span>Blog&apos;a Dön</span>
        </Link>

        <span className={styles.category}>{categoryLabel}</span>

        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span>{formattedDate}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} dk okuma</span>

          {post.author && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.author.name}</span>
            </>
          )}
        </div>

        <div className={styles.cover}>
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes="85vw"
            priority
            className={styles.coverImage}
          />
        </div>
      </div>
    </section>
  );
}
