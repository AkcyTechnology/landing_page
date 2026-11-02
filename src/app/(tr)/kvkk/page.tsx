import LegalView, { legalMetadata } from "@/views/LegalView";

export const metadata = legalMetadata("kvkk", "tr");

export default function Page() {
  return <LegalView page="kvkk" locale="tr" />;
}
