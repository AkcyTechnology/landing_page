import { ServiceDetailView, serviceDetailMetadata, serviceStaticParams } from "@/views/ServicesView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceStaticParams("tr");
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return serviceDetailMetadata(slug, "tr");
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceDetailView slug={slug} locale="tr" />;
}
