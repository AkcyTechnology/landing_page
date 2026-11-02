import { ProjectDetailView, projectDetailMetadata, projectStaticParams } from "@/views/ProjectsView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projectStaticParams("en");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return projectDetailMetadata(slug, "en");
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectDetailView slug={slug} locale="en" />;
}
