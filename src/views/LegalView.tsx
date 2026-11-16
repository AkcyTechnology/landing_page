import type { Locale } from "@/i18n/config";
import { setRequestLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { legalPages, type LegalPageKey } from "@/content/legal";
import LegalPageLayout from "@/components/legal/LegalPageLayout/LegalPageLayout";

export function legalMetadata(page: LegalPageKey, locale: Locale) {
  const content = legalPages[page][locale];
  return pageMetadata(locale, content.metaTitle, content.metaDescription, `/${page}`);
}

export default function LegalView({ page, locale }: { page: LegalPageKey; locale: Locale }) {
  setRequestLocale(locale);
  const content = legalPages[page][locale];
  return <LegalPageLayout title={content.title} introduction={content.introduction} sections={content.sections} />;
}
