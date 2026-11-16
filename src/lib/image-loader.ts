/*
  next/image özel loader'ı (next.config → images.loaderFile).
  Yerel raster görseller için build öncesi üretilen WebP sürümlerini
  (public/_img/…-{genişlik}.webp) döndürür; logo, SVG ve harici adresler
  olduğu gibi kalır. Kurallar: src/lib/image-variants.mjs
*/
import { hasVariants, pickWidth, variantPath } from "./image-variants.mjs";

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!hasVariants(src)) return src;
  return variantPath(src, pickWidth(width));
}
