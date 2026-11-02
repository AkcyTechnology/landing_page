import Link from "@/i18n/Link";
import { getLocale, getT } from "@/i18n/server";

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
  const locale = getLocale();
  const t = getT();
  const b = t.blog.card;
  const categoryLabel = getCategoryLabel(post.category, locale);
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
          <nav className={styles.breadcrumb} aria-label={t.blog.detail.breadcrumb}>
            <Link href="/">{t.nav.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">{t.nav.blog}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/blog?category=${post.category}`}>{categoryLabel}</Link>
          </nav>

          <div className={styles.chips}>
            <span className={styles.category}>
              <i aria-hidden="true" />
              {categoryLabel}
            </span>
            <span className={styles.chip}>{b.readingTime.replace("{minutes}", String(post.readingTime))}</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>

          <p className={styles.lead}>{post.excerpt}</p>

          <div className={styles.meta}>
            <div className={styles.author}>
              <span className={styles.avatar} aria-hidden="true">
                {authorName.slice(0, 2).toLocaleUpperCase(locale)}
              </span>
              <span>
                <b>{authorName}</b>
                {post.author?.role && <small>{post.author.role}</small>}
              </span>
            </div>

            <dl className={styles.facts}>
              <div>
                <dt>{t.blog.detail.published}</dt>
                <dd>
                  <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                </dd>
              </div>

              {post.updatedDate && post.updatedDate !== post.date && (
                <div>
                  <dt>{t.blog.detail.updated}</dt>
                  <dd>
                    <time dateTime={post.updatedDate}>
                      {formatPostDate(post.updatedDate, locale)}
                    </time>
                  </dd>
                </div>
              )}

              <div>
                <dt>{t.blog.detail.readingTimeLabel}</dt>
                <dd>{t.blog.detail.minutes.replace("{minutes}", String(post.readingTime))}</dd>
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
