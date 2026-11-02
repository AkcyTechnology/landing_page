import Link from "next/link";

import type { BlogPost } from "@/data/blog";
import {
  formatPostDate,
  getCategoryAccent,
  getCategoryLabel,
} from "@/components/blog/categoryMeta";
import CoverParallax from "./CoverParallax";

import styles from "./DetailHero.module.scss";

interface DetailHeroProps {
  post: BlogPost;
}

export default function DetailHero({ post }: DetailHeroProps) {
  const categoryLabel = getCategoryLabel(post.category);
  const authorName = post.author?.name ?? "AKCY";

  return (
    <>
      <section
        className={styles.hero}
        style={
          { "--accent": getCategoryAccent(post.category) } as React.CSSProperties
        }
      >
        <div className={styles.aurora} aria-hidden="true">
          <span />
          <span />
        </div>

        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/blog?category=${post.category}`}>{categoryLabel}</Link>
          </nav>

          <div className={styles.chips}>
            <span className={styles.category}>
              <i aria-hidden="true" />
              {categoryLabel}
            </span>
            <span className={styles.chip}>{post.readingTime} dk okuma</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          <p className={styles.lead}>{post.excerpt}</p>

          <div className={styles.meta}>
            <div className={styles.author}>
              <span className={styles.avatar} aria-hidden="true">
                {authorName.slice(0, 2).toLocaleUpperCase("tr-TR")}
              </span>
              <span>
                <b>{authorName}</b>
                {post.author?.role && <small>{post.author.role}</small>}
              </span>
            </div>

            <dl className={styles.facts}>
              <div>
                <dt>Yayın tarihi</dt>
                <dd>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </dd>
              </div>

              {post.updatedDate && post.updatedDate !== post.date && (
                <div>
                  <dt>Güncelleme</dt>
                  <dd>
                    <time dateTime={post.updatedDate}>
                      {formatPostDate(post.updatedDate)}
                    </time>
                  </dd>
                </div>
              )}

              <div>
                <dt>Okuma süresi</dt>
                <dd>{post.readingTime} dakika</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className={styles.coverWrap}>
        <div className={styles.coverContainer}>
          <CoverParallax src={post.coverImage.src} alt={post.coverImage.alt} />
        </div>
      </div>
    </>
  );
}
