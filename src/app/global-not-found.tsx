import type { Metadata } from "next";

import SiteShell from "@/views/SiteShell";
import NotFoundView from "@/views/NotFoundView";
import { getDictionary } from "@/i18n/dictionaries";

/*
  Eşleşmeyen bütün adresler için 404 sayfası (statik yayında 404.html).
  /en altındaki adresler için İngilizce sayfa: /en/404/ (public/.htaccess).
*/
export const metadata: Metadata = {
  title: getDictionary("tr").pages.notFound.title,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <SiteShell locale="tr">
      <NotFoundView locale="tr" />
    </SiteShell>
  );
}
