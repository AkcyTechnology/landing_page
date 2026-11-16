/*
  Statik export sonrası RSC segment dosyası düzeltmesi ("npm run build" sonrası
  postbuild olarak kendiliğinden çalışır).

  Neden: Next.js segment dosyalarını "__next" + yol ("/" → ".") + ".txt" adıyla
  yazar ve tarayıcı da bu düz adı ister, ör.:
    /projelerimiz/__next.!KHRyKQ.projelerimiz.__PAGE__.txt
  Windows'ta yol ayırıcısı "\" olduğu için Next bu dönüşümü yapamaz ve dosyaları
  klasör olarak yazar:
    /projelerimiz/__next.!KHRyKQ/projelerimiz/__PAGE__.txt
  Sonuç: sayfa geçişlerindeki prefetch istekleri 404 döner.

  Bu betik klasörlü dosyaları beklenen düz adlarla kopyalar ve klasörleri siler.
  Linux/macOS'ta build alınırsa ortada klasör olmadığından hiçbir şey yapmaz.
*/
import { promises as fs } from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve(process.argv[2] ?? "out");

async function listFiles(dir, prefix = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const parts = [...prefix, entry.name];
    if (entry.isDirectory()) files.push(...(await listFiles(path.join(dir, entry.name), parts)));
    else files.push(parts);
  }
  return files;
}

async function walk(dir, stats) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);

    if (entry.name.startsWith("__next.")) {
      // __next.X/a/b.txt  →  __next.X.a.b.txt (aynı klasörde)
      for (const parts of await listFiles(full)) {
        const flatName = [entry.name, ...parts].join(".");
        await fs.copyFile(path.join(full, ...parts), path.join(dir, flatName));
        stats.files += 1;
      }
      await fs.rm(full, { recursive: true, force: true });
      stats.dirs += 1;
      continue;
    }

    if (entry.name === "_next") continue; // derlenmiş JS/CSS: segment dosyası içermez
    await walk(full, stats);
  }
}

try {
  await fs.access(OUT_DIR);
} catch {
  console.log(`[fix-export-segments] ${OUT_DIR} bulunamadı, atlandı.`);
  process.exit(0);
}

const stats = { files: 0, dirs: 0 };
await walk(OUT_DIR, stats);
console.log(`[fix-export-segments] ${stats.dirs} klasör düzleştirildi, ${stats.files} segment dosyası yazıldı.`);
