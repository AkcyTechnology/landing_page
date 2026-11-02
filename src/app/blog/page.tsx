import { pageMetadata } from "@/lib/metadata";

import { categories, getAllPosts, getFeaturedPost } from "@/data/blog";
import BlogHero from "@/components/blog/BlogHero/BlogHero";
import BlogListingClient from "@/components/blog/BlogListingClient/BlogListingClient";
import BlogCTA from "@/components/blog/BlogCTA/BlogCTA";

export const metadata = pageMetadata("Blog", "Web, WordPress, şirket süreç otomasyonu ve yapay zekâ üzerine uygulanabilir rehberler, deneyimler ve öğrendiklerimiz.", "/blog");

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();

  // Yalnızca yazısı olan kategoriler hero'da ve filtrelerde listelenir.
  const topics = categories
    .map((category) => ({
      ...category,
      count: allPosts.filter((post) => post.category === category.slug).length,
    }))
    .filter((topic) => topic.count > 0);

  return (
    <>
      <BlogHero
        postCount={allPosts.length}
        totalMinutes={allPosts.reduce((sum, post) => sum + post.readingTime, 0)}
        topics={topics}
      />

      <BlogListingClient
        allPosts={allPosts}
        availableCategories={topics.map((topic) => topic.slug)}
        categoryCounts={Object.fromEntries(
          topics.map((topic) => [topic.slug, topic.count])
        )}
        featuredPost={featuredPost}
      />

      <BlogCTA />
    </>
  );
}
