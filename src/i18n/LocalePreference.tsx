"use client";

import { useEffect } from "react";

import { LOCALE_STORAGE_KEY } from "./config";
import { useLocale } from "./LocaleProvider";

/*
  Dil tercihi yalnızca kullanıcı dil seçiciyi kullandığında kaydedilir.
  Siteye dışarıdan Türkçe ana sayfaya gelen ve daha önce İngilizceyi seçmiş
  kullanıcı İngilizce ana sayfaya alınır. Tarayıcı diline göre zorunlu
  yönlendirme yapılmaz; paylaşılan bağlantılar her zaman kendi dilinde açılır.
*/
export default function LocalePreference() {
  const locale = useLocale();

  useEffect(() => {
    if (locale !== "tr" || window.location.pathname !== "/") return;
    let preferred: string | null = null;
    try {
      preferred = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      return;
    }
    const internal = document.referrer && new URL(document.referrer).origin === window.location.origin;
    if (preferred === "en" && !internal) window.location.replace("/en/");
  }, [locale]);

  return null;
}
