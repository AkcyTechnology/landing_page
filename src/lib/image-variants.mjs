/*
  Duyarlı görsel sürümlerinin ortak kuralları. Hem üretim betiği
  (scripts/generate-responsive-images.mjs) hem de tarayıcıdaki image loader
  (src/lib/image-loader.ts) aynı dosyayı kullanır; böylece istenen her adresin
  diskte karşılığı olur.
*/

/* Üretilen genişlikler (px). next.config deviceSizes ile aynıdır. */
export const RESPONSIVE_WIDTHS = [640, 828, 1080, 1920];

/* Bu klasörlerdeki görseller olduğu gibi sunulur (logo: sabit küçük boyut) */
export const SKIP_PREFIXES = ["/images/brand/"];

const RASTER = /\.(jpe?g|png|webp)$/i;

/* "/images/hero/hero-bg.jpg" + 828 → "/_img/hero/hero-bg-828.webp" */
export function variantPath(src, width) {
  return src.replace(/^\/images\//, "/_img/").replace(RASTER, "") + `-${width}.webp`;
}

/* Sürümü olan yerel raster görsel mi? */
export function hasVariants(src) {
  return src.startsWith("/images/") && RASTER.test(src) && !SKIP_PREFIXES.some((prefix) => src.startsWith(prefix));
}

/* İstenen genişliği karşılayan en küçük üretilmiş genişlik */
export function pickWidth(requested) {
  return RESPONSIVE_WIDTHS.find((width) => width >= requested) ?? RESPONSIVE_WIDTHS[RESPONSIVE_WIDTHS.length - 1];
}
