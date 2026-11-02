import { cache } from "react";

import type { Locale } from "./config";
import { getDictionary } from "./dictionaries";

/*
  Sunucu bileşenleri için istek kapsamlı dil bilgisi.
  Her sayfa en başta setRequestLocale() çağırır; aynı istekte render edilen
  sunucu bileşenleri getLocale() / getT() ile dili okur.
*/
const store = cache(() => ({ locale: "tr" as Locale }));

export function setRequestLocale(locale: Locale) {
  store().locale = locale;
}

export function getLocale(): Locale {
  return store().locale;
}

export function getT() {
  return getDictionary(getLocale());
}
