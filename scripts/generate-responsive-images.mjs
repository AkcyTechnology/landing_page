/*
  Duyarlı (responsive) görsel üretimi — "npm run build" öncesinde (prebuild)
  kendiliğinden çalışır.

  Neden: Site statik export olduğu için Next.js'in görsel optimizasyonu
  çalışmaz; telefonlar da masaüstü boyutundaki görseli indirir. Bu betik
  public/images altındaki her raster görselin RESPONSIVE_WIDTHS genişliklerinde
  WebP sürümlerini public/_img/ altına yazar. src/lib/image-loader.ts de
  <Image> bileşeninin srcset'ini bu dosyalara yönlendirir; tarayıcı ekranına
  uygun olanı seçer.

  - Kaynak görseller değişmez (yalnızca okunur).
  - Görsel kırpılmaz; yalnızca genişliğe göre küçültülür (en-boy oranı korunur),
    asıl genişlikten büyük sürüm üretilmez (büyütme yok).
  - Daha önce üretilmiş ve kaynaktan yeni olan dosyalar atlanır (hızlı build).
  - public/_img/ git'e eklenmez (.gitignore).
*/
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { RESPONSIVE_WIDTHS, SKIP_PREFIXES, variantPath } from "../src/lib/image-variants.mjs";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "public", "images");
const RASTER = /\.(jpe?g|png|webp)$/i;
const QUALITY = 74;
/* Koyu perde (%55–85) altında kalan hero arka planı daha sıkı sıkıştırılır;
   fark görünmez, LCP'ye yakın görsel küçülür. */
const QUALITY_OVERRIDES = [["/images/hero/", 60]];
const qualityFor = (publicPath) => QUALITY_OVERRIDES.find(([prefix]) => publicPath.startsWith(prefix))?.[1] ?? QUALITY;

sharp.cache(false);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (RASTER.test(entry.name)) yield full;
  }
}

async function isFresh(target, sourceMtime) {
  try {
    return (await fs.stat(target)).mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

let written = 0;
let skipped = 0;

for await (const file of walk(SOURCE_DIR)) {
  const publicPath = "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
  if (SKIP_PREFIXES.some((prefix) => publicPath.startsWith(prefix))) continue;

  const { mtimeMs } = await fs.stat(file);
  const input = await fs.readFile(file);

  for (const width of RESPONSIVE_WIDTHS) {
    const target = path.join(ROOT, "public", ...variantPath(publicPath, width).split("/"));
    if (await isFresh(target, mtimeMs)) {
      skipped += 1;
      continue;
    }
    await fs.mkdir(path.dirname(target), { recursive: true });
    const output = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: qualityFor(publicPath), effort: 5 })
      .toBuffer();
    await fs.writeFile(target, output);
    written += 1;
  }
}

console.log(`[responsive-images] ${written} sürüm üretildi, ${skipped} güncel sürüm atlandı.`);
