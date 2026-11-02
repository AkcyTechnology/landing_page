import ContactView, { contactMetadata } from "@/views/ContactView";

export const metadata = contactMetadata("tr");

export default function Page() {
  return <ContactView locale="tr" />;
}
