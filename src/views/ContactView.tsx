import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/lib/StructuredData";
import { breadcrumbSchema, graph, ORGANIZATION_ID, webPageSchema } from "@/lib/schema";
import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactSection from "@/components/contact/ContactSection/ContactSection";

export function contactMetadata(locale: Locale) {
  const t = getDictionary(locale).pages.contact;
  return pageMetadata(locale, t.title, t.description, "/iletisim");
}

export default function ContactView({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = getDictionary(locale);
  const schema = graph(
    webPageSchema({
      path: "/iletisim",
      locale,
      name: t.pages.contact.title,
      description: t.pages.contact.description,
      type: "ContactPage",
      about: { "@id": ORGANIZATION_ID },
    }),
    breadcrumbSchema(
      [
        { name: t.nav.home, path: "/" },
        { name: t.nav.contact, path: "/iletisim" },
      ],
      locale
    )
  );
  return (
    <div>
      <StructuredData data={schema} />
      <ContactHero />
      <ContactSection />
    </div>
  );
}
