# AKCY Technologies — kurumsal web sitesi

Next.js 16 ile yazılmış, **statik HTML olarak dışa aktarılan** (`output: "export"`) iki dilli (TR / EN) kurumsal site. Turhost cPanel'de Node.js olmadan yayınlanır; iletişim formu PHP ile çalışır.

## Kurulum

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_TURNSTILE_SITE_KEY vb. değerleri doldurun
npm run dev                  # http://localhost:3000
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Responsive görselleri üretir (`prebuild`), siteyi `out/` klasörüne aktarır, export düzeltmelerini uygular (`postbuild`) |
| `npm run lint` | ESLint |

## Klasör yapısı

- `src/app/(tr)` ve `src/app/(en)/en` — Türkçe ve İngilizce sayfalar (ince sarmalayıcılar)
- `src/views` — sayfa gövdeleri ve ortak `SiteShell` (html/head, metadata, JSON-LD)
- `src/components` — bileşenler (SCSS modülleriyle)
- `src/data`, `src/data/en`, `src/content` — hizmet, proje, blog ve yasal metin içerikleri
- `src/i18n` — dil ayarları ve sözlükler
- `src/lib/contact.ts` — e-posta ve telefon (tek kaynak)
- `src/lib/metadata.ts`, `src/lib/schema.ts` — SEO metadata ve Schema.org
- `public/api/contact.php` — iletişim formu (honeypot, hız sınırı, spam puanı, Cloudflare Turnstile, SMTP)
- `public/.htaccess` — HTTPS / www yönlendirmesi, güvenlik başlıkları, önbellek

## Yayına alma (Turhost)

1. `npm run build`
2. `out/` klasörünün **içeriğini** cPanel'de `public_html/` içine yükleyin.
3. Sunucuda `public_html/api/config.php` dosyasının olduğundan emin olun (şablon: `public/api/config.example.php`).
   - `turnstile_secret` boşsa form gönderimleri reddedilir.
   - `config.php` ve `.env.local` gizli bilgiler içerir; git'e eklenmez, paylaşılmamalıdır.
