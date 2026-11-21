import QuoteView, { quoteMetadata } from "@/views/QuoteView";

export const metadata = quoteMetadata("en");

export default function Page() {
  return <QuoteView locale="en" />;
}
