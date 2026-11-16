import type { NextConfig } from "next";

/*
  Site Turhost'ta (cPanel, Node.js yok) statik HTML olarak yayınlanır:
  "npm run build" çıktısı "out" klasörüne yazılır ve public_html'e yüklenir.
  - Güvenlik başlıkları ve adres yönlendirmeleri public/.htaccess içindedir
    (statik export'ta next.config "headers" desteklenmez).
  - İletişim formu public/api/contact.php ile çalışır.
*/
const nextConfig: NextConfig = {
  output: "export",

  // Her sayfa kendi klasöründe index.html olarak üretilir (/blog/ → blog/index.html).
  // Apache/LiteSpeed bu yapıyı ek ayar gerektirmeden sunar.
  trailingSlash: true,

  // Türkçe ve İngilizce iki ayrı kök düzen kullandığı için eşleşmeyen
  // adreslerin 404 sayfası app/global-not-found.tsx dosyasından üretilir.
  // CSS dosyaları ayrı istek yerine HTML'in <head> kısmına gömülür:
  // ilk ziyarette render'ı engelleyen CSS istekleri kalkar (FCP/LCP).
  experimental: {
    globalNotFound: true,
    inlineCss: true,
  },

  images: {
    // Sunucu olmadığı için Next.js görselleri anlık küçültemez. Bunun yerine
    // build öncesi her görselin genişlik sürümleri üretilir
    // (scripts/generate-responsive-images.mjs) ve loader srcset'i bunlara
    // yönlendirir; telefonlar küçük, masaüstü büyük sürümü indirir.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // src/lib/image-variants.mjs → RESPONSIVE_WIDTHS ile aynı tutulmalı
    deviceSizes: [640, 828, 1080, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
