import { BlogDetailView, blogDetailMetadata, blogStaticParams } from "@/views/BlogView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return blogStaticParams("tr");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return blogDetailMetadata(slug, "tr");
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailView slug={slug} locale="tr" />;
}
