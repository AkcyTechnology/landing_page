"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import type { BlogPostMeta } from "@/data/blog";
import { dateLocale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import CategoryFilters, {
  ALL_SLUG,
} from "@/components/blog/CategoryFilters/CategoryFilters";
import SearchInput from "@/components/blog/SearchInput/SearchInput";
import FeaturedArticle from "@/components/blog/FeaturedArticle/FeaturedArticle";
import BlogGrid from "@/components/blog/BlogGrid/BlogGrid";
import Pagination from "@/components/blog/Pagination/Pagination";
import EmptyState from "@/components/blog/EmptyState/EmptyState";
import Reveal from "@/components/blog/Reveal/Reveal";

import styles from "./BlogListingClient.module.scss";

interface BlogListingClientProps {
  allPosts: BlogPostMeta[];
  availableCategories?: string[];
  categoryCounts?: Record<string, number>;
  featuredPost?: BlogPostMeta;
}

// İlk kart geniş gösterildiğinde 8 kart 3 kolonlu ızgarayı tam doldurur.
const PAGE_SIZE = 8;

const NO_PARAMS = new URLSearchParams();

/*
  Site statik HTML olarak yayınlandığı için URL parametreleri (kategori,
  arama, sayfa) sunucuda değil tarayıcıda okunur. Statik HTML'e filtresiz
  liste basılır; tarayıcıda URL'deki filtre uygulanır.
*/
export default function BlogListingClient(props: BlogListingClientProps) {
  return (
    <Suspense fallback={<BlogListing {...props} searchParams={NO_PARAMS} />}>
      <BlogListingWithParams {...props} />
    </Suspense>
  );
}

function BlogListingWithParams(props: BlogListingClientProps) {
  const searchParams = useSearchParams();
  return <BlogListing {...props} searchParams={searchParams} />;
}

function BlogListing({
  allPosts,
  availableCategories,
  categoryCounts,
  featuredPost,
  searchParams,
}: BlogListingClientProps & {
  searchParams: Pick<URLSearchParams, "get" | "toString">;
}) {
  const t = useT().blog.listing;
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const skipNextDebounce = useRef(false);
  const listTop = useRef<HTMLDivElement>(null);

  const category = searchParams.get("category") ?? ALL_SLUG;
  const page = Number(searchParams.get("page")) || 1;

  const pushParams = (
    next: Partial<{ category: string; q: string; page: number }>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    const merged = {
      category: next.category ?? category,
      q: next.q ?? query,
      page: next.page ?? page,
    };

    if (merged.category && merged.category !== ALL_SLUG) {
      params.set("category", merged.category);
    } else {
      params.delete("category");
    }

    if (merged.q) {
      params.set("q", merged.q);
    } else {
      params.delete("q");
    }

    if (merged.page && merged.page > 1) {
      params.set("page", String(merged.page));
    } else {
      params.delete("page");
    }

    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (skipNextDebounce.current) {
      skipNextDebounce.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      if (query !== (searchParams.get("q") ?? "")) {
        pushParams({ q: query, page: 1 });
      }
    }, 300);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleCategoryChange = (slug: string) => {
    pushParams({ category: slug, page: 1 });
  };

  const handlePageChange = (nextPage: number) => {
    pushParams({ page: nextPage });

    // Yeni sayfanın kartları görünsün diye yazı listesinin başına kaydır.
    listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClear = () => {
    skipNextDebounce.current = true;
    setQuery("");
    pushParams({ category: ALL_SLUG, q: "", page: 1 });
  };

  // Öne çıkan yazı yalnızca filtresiz görünümde ayrı kartta gösterilir;
  // filtre veya arama varken normal sonuçların arasında yer alır.
  const showFeatured = Boolean(featuredPost) && !query && category === ALL_SLUG;

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(dateLocale[locale]);

    return allPosts.filter((post) => {
      if (showFeatured && post.slug === featuredPost?.slug) return false;

      const matchesCategory =
        category === ALL_SLUG || post.category === category;

      const matchesQuery =
        !normalizedQuery ||
        post.title.toLocaleLowerCase(dateLocale[locale]).includes(normalizedQuery) ||
        post.excerpt.toLocaleLowerCase(dateLocale[locale]).includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [allPosts, category, query, featuredPost, showFeatured, locale]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(
    () =>
      filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage]
  );

  // Öne çıkan yazı dışında yazı yoksa filtre, arama ve liste gösterilmez.
  const hasOtherPosts = allPosts.some(
    (post) => post.slug !== featuredPost?.slug
  );

  if (!hasOtherPosts) {
    return (
      <section className={styles.listing}>
        <div className={styles.container}>
          {featuredPost && (
            <div className={styles.featuredWrap}>
              <FeaturedArticle post={featuredPost} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={styles.listing}>
      <div className={styles.container}>
        <AnimatePresence initial={false}>
          {showFeatured && featuredPost && (
            <motion.div
              key="featured"
              className={styles.featuredCollapse}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.8, 0.25, 1] }}
            >
              <Reveal y={40} className={styles.featuredWrap}>
                <FeaturedArticle post={featuredPost} />
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={listTop} className={styles.listTop} aria-hidden="true" />

        <Reveal className={styles.headingRow}>
          <div>
            <span className={styles.eyebrow}>
              <i aria-hidden="true" />
              {t.allPosts}
            </span>
            <h2 className={styles.sectionHeading}>
              {t.headingStart} <em>{t.headingAccent}</em>
            </h2>
          </div>
          <span className={styles.resultCount}>
            <b>{filtered.length}</b> {t.resultCount}
          </span>
        </Reveal>

        <div className={styles.controls}>
          <CategoryFilters
            active={category}
            onChange={handleCategoryChange}
            available={availableCategories}
            counts={categoryCounts}
          />
          <SearchInput value={query} onChange={setQuery} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${query}-${safePage}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.22, 0.8, 0.25, 1] }}
          >
            {paged.length > 0 ? (
              <>
                <BlogGrid posts={paged} />

                <Pagination
                  page={safePage}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              </>
            ) : (
              <EmptyState onClear={handleClear} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
