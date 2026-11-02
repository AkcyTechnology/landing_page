import LegalView, { legalMetadata } from "@/views/LegalView";

export const metadata = legalMetadata("cookies", "tr");

export default function Page() {
  return <LegalView page="cookies" locale="tr" />;
}
