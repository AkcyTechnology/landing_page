import LegalView, { legalMetadata } from "@/views/LegalView";

export const metadata = legalMetadata("kvkk", "en");

export default function Page() {
  return <LegalView page="kvkk" locale="en" />;
}
