import QuoteView, { quoteMetadata } from "@/views/QuoteView";

export const metadata = quoteMetadata("tr");

export default function Page() {
  return <QuoteView locale="tr" />;
}
