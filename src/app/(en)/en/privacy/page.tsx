import LegalView, { legalMetadata } from "@/views/LegalView";

export const metadata = legalMetadata("privacy", "en");

export default function Page() {
  return <LegalView page="privacy" locale="en" />;
}
