"use client";

import { createContext, useContext, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

import { localizePath, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

const LocaleContext = createContext<Locale>("tr");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  // reducedMotion="user": işletim sisteminde "hareketi azalt" açıksa motion
  // animasyonlarındaki kayma/ölçek hareketleri kapatılır, yalnızca opaklık kalır.
  return (
    <LocaleContext.Provider value={locale}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LocaleContext.Provider>
  );
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
