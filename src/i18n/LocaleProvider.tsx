"use client";

import { createContext, useContext, type ReactNode } from "react";

import { localizePath, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

const LocaleContext = createContext<Locale>("tr");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useT() {
  return getDictionary(useLocale());
}

/** Türkçe (kanonik) site içi adresi seçili dile çevirir */
export function useLocalizedHref() {
  const locale = useLocale();
  return (href: string) => localizePath(href, locale);
}
