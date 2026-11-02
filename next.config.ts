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

  images: {
    // Sunucu olmadığı için görseller olduğu gibi sunulur.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
