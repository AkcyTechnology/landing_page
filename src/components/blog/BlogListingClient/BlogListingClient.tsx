"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import type { BlogPostMeta } from "@/data/blog";
import CategoryFilters, {
  ALL_SLUG,
} from "@/components/blog/CategoryFilters/CategoryFilters";
import SearchInput from "@/components/blog/SearchInput/SearchInput";
import FeaturedArticle from "@/components/blog/FeaturedArticle/FeaturedArticle";
import BlogGrid from "@/components/blog/BlogGrid/BlogGrid";
import Pagination from "@/components/blog/Pagination/Pagination";
import EmptyState from "@/components/blog/EmptyState/EmptyState";

import styles from "./BlogListingClient.module.scss";

interface BlogListingClientProps {
  allPosts: BlogPostMeta[];
  initialCategory: string;
  initialQuery: string;
  initialPage: number;
  featuredPost?: BlogPostMeta;
}

// 3 kolonlu ızgarada tek kart açıkta kalmasın.
const PAGE_SIZE = 6;

export default function BlogListingClient({
  allPosts,
  initialCategory,
  initialQuery,
  initialPage,
  featuredPost,
}: BlogListingClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const skipNextDebounce = useRef(false);

  const category = searchParams.get("category") ?? initialCategory;
  const page = Number(searchParams.get("page") ?? initialPage) || 1;

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
  };

  const handleClear = () => {
    skipNextDebounce.current = true;
    setQuery("");
    pushParams({ category: ALL_SLUG, q: "", page: 1 });
  };

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allPosts.filter((post) => {
      if (featuredPost && post.slug === featuredPost.slug) return false;

      const matchesCategory =
        category === ALL_SLUG || post.category === category;

      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [allPosts, category, query, featuredPost]);

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
        {featuredPost && !query && category === ALL_SLUG && (
          <div className={styles.featuredWrap}>
            <FeaturedArticle post={featuredPost} />
          </div>
        )}

        <div className={styles.controls}>
          <CategoryFilters active={category} onChange={handleCategoryChange} />
          <SearchInput value={query} onChange={setQuery} />
        </div>

        <h2 className={styles.sectionHeading}>Son Yazılar</h2>

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
