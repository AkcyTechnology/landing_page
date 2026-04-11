import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export function proxy(request: Request) {
  return intlMiddleware(request as any);
}

export const config = {
  matcher: ["/", "/(tr|en)/:path*"],
};
