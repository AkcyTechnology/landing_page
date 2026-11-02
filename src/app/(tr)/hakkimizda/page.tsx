import AboutView, { aboutMetadata } from "@/views/AboutView";

export const metadata = aboutMetadata("tr");

export default function Page() {
  return <AboutView locale="tr" />;
}
