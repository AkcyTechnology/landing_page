import Link from "next/link";
import Container from "../ui/container";

const footerLinks = {
  company: [
    { label: "Hakkımızda", href: "#sirketimiz" },
    { label: "Değerlerimiz", href: "#degerler" },
    { label: "Kariyer", href: "#" },
    { label: "Blog", href: "#blog" },
  ],
  products: [
    { label: "Veri Güvenliği", href: "#urunler" },
    { label: "Raporlama", href: "#urunler" },
    { label: "Entegrasyon", href: "#urunler" },
    { label: "Tüm Ürünler", href: "#urunler" },
  ],
  support: [
    { label: "İletişim", href: "#iletisim" },
    { label: "Destek Merkezi", href: "#" },
    { label: "SSS", href: "#sss" },
  ],
  legal: [
    { label: "Gizlilik Politikası", href: "/tr/gizlilik-politikasi" },
    { label: "KVKK", href: "/tr/kvkk" },
    { label: "Kullanım Şartları", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-background-secondary">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <Container>
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 py-16 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1">
            <Link href="/tr" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <span className="text-sm font-bold text-white">AK</span>
              </div>
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                AKCY
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              İşinizi ileri taşıyan ölçeklenebilir, sürdürülebilir ve yenilikçi
              yazılım çözümleri.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-2">
              {["linkedin", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white/90"
                >
                  {social === "linkedin" && (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )}
                  {social === "twitter" && (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  )}
                  {social === "instagram" && (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Şirket
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Ürünler
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Legal */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                Destek
              </h3>
              <ul className="flex flex-col gap-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                Yasal
              </h3>
              <ul className="flex flex-col gap-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Güncel Kalın
            </h3>
            <p className="text-sm text-muted">
              Teknoloji ve yazılım dünyasındaki gelişmeleri takip edin.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="input-dark flex-1 rounded-xl px-4 py-2.5 text-sm"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2.5 text-white transition hover:scale-105"
                aria-label="Abone ol"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 py-6 sm:flex-row">
          <p className="text-xs text-muted/70">
            © {new Date().getFullYear()} AKCY Teknoloji. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted/50">Her projede</span>
            <span className="text-xs gradient-text-green font-medium">doğaya katkı</span>
            <span className="text-xs text-muted/50">sağlıyoruz 🌱</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
