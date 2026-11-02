import LegalView, { legalMetadata } from "@/views/LegalView";

export const metadata = legalMetadata("cookies", "en");

export default function Page() {
  return <LegalView page="cookies" locale="en" />;
}
