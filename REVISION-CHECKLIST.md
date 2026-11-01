# AKCY revizyon checklist — 26 Eylül 2026

## Navigasyon ve hatalar
- [x] Hakkımızda ve İletişim rotaları açılıyor. Bozuk `.next/dev/types` rota çıktıları temizlenip yeniden üretildi.
- [x] Header ve footer üzerinden altı ana sayfaya erişim.
- [x] Mobil menü: sayfa seçince kapanma, Escape, klavye odağı, kapalı menünün odak sırasından çıkarılması, masaüstüne geçince kaydırma kilidinin kaldırılması.
- [x] Tablet genişliğinde menünün taşmaması için mobil navigasyon eşiği güncellendi.
- [x] İç içe `main` etiketleri ve lint hataları düzeltildi.

## Ortak tasarım
- [x] Ağır gölgeler kaldırıldı; ana butonun hover yükselmesi kaldırıldı.
- [x] Header hover yalnızca renk değiştiriyor; aktif menüde font kalınlığı sabit.
- [x] Hero dekoratif gradient ve mouse parallax kaldırıldı; sonsuz yazma efekti sadeleştirildi.
- [x] Tek footer, AKCY adı, `akcyglobal@gmail.com`, istenen açıklama ve copyright formatı.
- [x] Hakkımızda ve hizmet detaylarındaki tekrarlanan final CTA kaldırıldı.
- [x] Binary cursor izi: küçük karakter, throttle, kısa ömür, gölgesiz; küçük ekran, dokunmatik ve reduced-motion kontrolü.

## Sayfa içerikleri
- [x] Ana sayfa: Hero → Selected Work → Services → Why AKCY → Nasıl Çalışıyoruz → Yetkinlikler / Çalıştığımız Alanlar → Blog → footer CTA.
- [x] Hizmet sırası: Web → UI/UX → Mobil → AI → Otomasyon → AI Content. Ana sayfa, hero, menü, yetkinlikler ve form ortak veriyi kullanıyor.
- [x] Web: ürün türleri, performans yaklaşımı ve iki gerçek proje.
- [x] UI/UX: deliverables; mobil: uygulama türleri ve yayın süreci.
- [x] AI: kullanım alanları; otomasyon: Form → CRM → Teklif → E-posta → Dashboard.
- [x] AI Content: önce / süreç / çıktı ve kanal akışı. Workflow mobilde dikey.
- [x] Hakkımızda: mevcut başlıklar, dört kontrollü görsel alanı, prensipler, ekip/teknoloji yaklaşımı, koyu statement ve tek CTA.
- [x] İletişim: koyu hero, proje ekranı, doğrudan iletişim, İstanbul konumu, iki kolonlu form, tahmini başlangıç alanı ve mobil düzen.
- [x] Form: istemci/sunucu doğrulaması, başarısız gönderimde e-posta alternatifi; boş CONTACT_FROM varsayılanı düzeltildi.
- [x] Gerçek projeler ve Concept/Lab ayrımı korundu. Case study metinleri, nitel sonuçlar ve canlı site bağlantıları mevcut.
- [x] Kısa/demo blog içerikleri yayından ayrıldı; kapsamlı AI otomasyonu yazısı ve detay yapısı korundu.
- [x] Çalışmayan abonelik formu kaldırıldı.

## SEO ve metinler
- [x] Marka eki bir kez; sayfaya özel canonical, açıklama, Open Graph ve Twitter metadata.
- [x] Eksik sosyal paylaşım görseli yerine mevcut gerçek proje görseli.
- [x] Sitemap: ana sayfalar, hizmetler, projeler, yayımlanan yazı ve yasal sayfalar.
- [x] Yasal sayfalardaki dil hataları düzeltildi; kurulu olmayan Analytics/reklam/çerez iddiaları çıkarıldı.
- [x] Organization iletişim alanı `contactPoint` olarak düzeltildi.

## Görseller ve dış bağımlılıklar
- [x] Gökçe Kombi ana sayfa, ürün listesi, ürün detayı, mobil menü ve kapasite aracı gerçek siteden alındı. Kaynak: https://gokcekombi.com/ ve /product/baymak-duotec-24-kw-tam-yogusmali-kombi/.
- [x] Erişilemeyen kampanya sayfasının placeholder görseli galeriden çıkarıldı.
- [x] AI görselleri için nötr, açıklayıcı SVG iş akışları eklendi; hayali ekran/sonuç üretilmedi.
- [x] Çakıroğlu gerçek ekranları (24 Ekim 2026): https://cakiroglusavunma.com/ sitesinden sektörel çözümler, teknik yetkinlikler, üretim teknolojileri, ürün kataloğu ve mobil ana sayfa ekranları alındı; galeri ve “Marka Bazlı Ürün Kataloğu” öne çıkan özelliği eklendi. Eski yer tutucu dosyalar (`homepage.jpg`, `iletisim.jpg`) artık kullanılmıyor.
- [ ] Gerçek form teslimi: `.env.local` içinde geçerli `RESEND_API_KEY` ve uygun gönderici hesabı gerekli. Anahtar olmadan gerçek gönderim doğrulanamaz. Test mesajı gönderilmedi.
- [ ] Canlı sunucuya dağıtım bu çalışmanın parçası olarak yapılmadı; kontroller yerel ortamda.

## Kontrol kanıtı
- [x] Production build ve TypeScript kontrolü.
- [x] ESLint.
- [x] Tarayıcı: 9 ana sayfa HTTP 200, tek h1/main, başlık ve canonical.
- [x] 23 iç bağlantı HTTP 200.
- [x] 390 / 768 / 1024 / 1440 genişliklerinde belge taşması kontrolü.
- [x] Mobil Hakkımızda geçişi, menünün kapanması, Escape ve zorunlu form alanları.
- [x] Boş API form isteği HTTP 400; tarayıcı çalışma zamanı hatası yok.

Tekrar kontrol: `npm.cmd run build`, `npm.cmd run lint`. Tarayıcı kontrolü `scripts/check-site.mjs`; Playwright kurulu değilse `PLAYWRIGHT_PATH` kurulu paketin yolunu gösterebilir. `TEST_BASE_URL` varsayılanı http://localhost:3000.
