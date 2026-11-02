import LegalView, { legalMetadata } from "@/views/LegalView";

export const metadata = legalMetadata("privacy", "tr");

export default function Page() {
  return <LegalView page="privacy" locale="tr" />;
}
