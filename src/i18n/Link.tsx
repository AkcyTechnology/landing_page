"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

import { localizePath } from "./config";
import { useLocale } from "./LocaleProvider";

type LinkProps = ComponentProps<typeof NextLink>;

/*
  next/link ile aynı kullanım; site içi adresler (Türkçe kanonik adresle yazılır)
  otomatik olarak seçili dilin adresine çevrilir.
*/
export default function Link({ href, ...props }: LinkProps) {
  const locale = useLocale();
  const target = typeof href === "string" ? localizePath(href, locale) : href;
  return <NextLink href={target} {...props} />;
}
