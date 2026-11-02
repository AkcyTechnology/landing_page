import type { ReactNode } from "react";

import SiteShell, { rootMetadata } from "@/views/SiteShell";

export const metadata = rootMetadata("en");

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
