import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactSection from "@/components/contact/ContactSection/ContactSection";

export function contactMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.contact;
  return pageMetadata(locale, t.title, t.description, "/iletisim");
}

export default function ContactView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  return (
    <div>
      <ContactHero />
      <ContactSection />
    </div>
  );
}
