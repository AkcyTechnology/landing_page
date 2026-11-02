import type { Metadata } from "next";

import NotFoundView from "@/views/NotFoundView";
import { getDictionary } from "@/i18n/dictionaries";

/* /en altındaki bulunamayan adresler için İngilizce 404 sayfası (public/.htaccess) */
export const metadata: Metadata = {
  title: getDictionary("en").pages.notFound.title,
  robots: { index: false, follow: true },
};

export default function EnglishNotFoundPage() {
  return <NotFoundView locale="en" />;
}
