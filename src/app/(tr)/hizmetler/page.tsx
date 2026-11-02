import ServicesView, { servicesMetadata } from "@/views/ServicesView";

export const metadata = servicesMetadata("tr");

export default function Page() {
  return <ServicesView locale="tr" />;
}
