import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { products } from "@/data/products";

const accentColors = {
  purple: {
    badge: "text-purple-light border-purple-500/30 bg-purple-500/10",
    check: "text-purple-400",
    glow: "bg-purple-500/10",
    border: "border-purple-500/20",
    bar: "from-purple-500 to-pink-500",
  },
  pink: {
    badge: "text-pink-300 border-pink-500/30 bg-pink-500/10",
    check: "text-pink-400",
    glow: "bg-pink-500/10",
    border: "border-pink-500/20",
    bar: "from-pink-500 to-rose-500",
  },
  green: {
    badge: "text-green-300 border-green-500/30 bg-green-500/10",
    check: "text-green-400",
    glow: "bg-green-500/10",
    border: "border-green-500/20",
    bar: "from-green-500 to-emerald-500",
  },
};

export default function ProductsSection() {
  return (
    <section id="urunler" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-pink-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <Container className="relative">
        <div className="flex flex-col gap-20">
          {/* Heading */}
          <SectionHeading
            badge="Ürünlerimiz"
            title="İş süreçlerinizi"
            titleHighlight="güçlendirin"
            description="İş süreçlerini sadeleştiren, güvenli, ölçeklenebilir ve kullanıcı odaklı ürünler geliştiriyoruz."
          />

          {/* Product feature blocks */}
          <div className="flex flex-col gap-16 lg:gap-24">
            {products.map((product) => {
              const colors = accentColors[product.accentColor];
              return (
                <div
                  key={product.id}
                  className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                    product.reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Text side */}
                  <div className="flex flex-col gap-6">
                    <h3
                      className="text-2xl font-bold text-white sm:text-3xl"
                      style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-base leading-7 text-slate-400">{product.description}</p>

                    {/* Features list */}
                    <ul className="flex flex-col gap-3">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${colors.border} ${colors.glow}`}>
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={colors.check}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#iletisim"
                      className={`inline-flex w-fit items-center gap-2 rounded-xl border ${colors.border} ${colors.glow} px-5 py-2.5 text-sm font-medium transition hover:scale-105`}
                    >
                      <span className={colors.check}>Detaylı Bilgi Al</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={colors.check}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>

                  {/* Visual panel */}
                  <div className="relative">
                    <div className={`absolute -inset-4 -z-10 rounded-3xl ${colors.glow} blur-2xl`} />
                    <div className="overflow-hidden rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm">
                      {/* Window chrome */}
                      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                        <div className="flex gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                        </div>
                        <div className={`rounded-full border px-3 py-0.5 text-xs ${colors.badge}`}>
                          {product.accentColor === "purple" ? "Güvenlik" : product.accentColor === "pink" ? "Raporlama" : "Entegrasyon"}
                        </div>
                      </div>

                      {/* Mock UI content */}
                      <div className="p-5 flex flex-col gap-4">
                        {/* Header row */}
                        <div className="flex items-center justify-between">
                          <div className="h-3 w-24 rounded-full bg-white/10" />
                          <div className="flex gap-2">
                            <div className="h-6 w-16 rounded-lg bg-white/5" />
                            <div className={`h-6 w-16 rounded-lg bg-gradient-to-r ${colors.bar} opacity-70`} />
                          </div>
                        </div>

                        {/* Chart area */}
                        <div className={`rounded-xl border ${colors.border} bg-background/40 p-4`}>
                          <div className="flex items-end gap-1.5 h-20">
                            {[45, 70, 55, 85, 65, 90, 75, 80, 60, 95].map((h, i) => (
                              <div
                                key={i}
                                className={`flex-1 rounded-t-sm bg-gradient-to-t ${colors.bar} opacity-60`}
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Data rows */}
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/3 px-4 py-2.5">
                            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${colors.bar}`} />
                            <div className="h-2.5 flex-1 rounded-full bg-white/10" style={{ width: `${60 + i * 15}%` }} />
                            <div className="h-2.5 w-12 rounded-full bg-white/10" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
