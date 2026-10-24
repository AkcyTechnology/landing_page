import { pageMetadata } from "@/lib/metadata";

import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactSection from "@/components/contact/ContactSection/ContactSection";

export const metadata = pageMetadata("İletişim", "Web, mobil uygulama, UI/UX, yapay zekâ ve dijital ürün projeleriniz için AKCY ile iletişime geçin.", "/iletisim");

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactSection />
    </div>
  );
}