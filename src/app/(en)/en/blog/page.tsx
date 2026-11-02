import BlogView, { blogMetadata } from "@/views/BlogView";

export const metadata = blogMetadata("en");

export default function Page() {
  return <BlogView locale="en" />;
}
