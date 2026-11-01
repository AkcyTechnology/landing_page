import { pageMetadata } from "@/lib/metadata";

import { getAllPosts, getFeaturedPost } from "@/data/blog";
import BlogHero from "@/components/blog/BlogHero/BlogHero";
import BlogListingClient from "@/components/blog/BlogListingClient/BlogListingClient";

export const metadata = pageMetadata("Blog", "Teknoloji, tasarım, yazılım ve üzerinde çalıştığımız projeler hakkında notlar, deneyimler ve öğrendiklerimiz.", "/blog");

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();

  return (
    <>
      <BlogHero />

      <BlogListingClient
        allPosts={allPosts}
        initialCategory={params.category ?? "tumu"}
        initialQuery={params.q ?? ""}
        initialPage={Number(params.page) || 1}
        featuredPost={featuredPost}
      />


    </>
  );
}
