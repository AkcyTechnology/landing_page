import BlogView, { blogMetadata } from "@/views/BlogView";

export const metadata = blogMetadata("tr");

export default function Page() {
  return <BlogView locale="tr" />;
}
