import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { products } from "@/data/products";

type AccentColor = "purple" | "pink" | "green";

const accentColors: Record<AccentColor, {
  badge: string;
  check: string;
  glow: string;
  border: string;
  bar: string;
  panel: string;
}> = {
  purple: {
    badge: "text-purple-light border-purple-500/30 bg-purple-500/10",
    check: "text-purple-400",
    glow: "bg-purple-500/10",
    border: "border-purple-500/20",
    bar: "from-purple-500 to-pink-500",
    panel: "from-purple-500/10 via-transparent to-pink-500/10",
  },
  pink: {
    badge: "text-pink-300 border-pink-500/30 bg-pink-500/10",
    check: "text-pink-400",
    glow: "bg-pink-500/10",
    border: "border-pink-500/20",
    bar: "from-pink-500 to-rose-500",
    panel: "from-pink-500/10 via-transparent to-rose-500/10",
  },
  green: {
    badge: "text-green-300 border-green-500/30 bg-green-500/10",
    check: "text-green-400",
    glow: "bg-green-500/10",
    border: "border-green-500/20",
    bar: "from-green-500 to-emerald-500",
    panel: "from-green-500/10 via-transparent to-emerald-500/10",
  },
};

export default function ProductsSection() {
  return (
    <section id="urunler" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[10%] h-[320px] w-[320px] rounded-full bg-purple-500/8 blur-[110px]" />
        <div className="absolute right-[6%] top-[22%] h-[260px] w-[260px] rounded-full bg-pink-500/8 blur-[100px]" />
        <div className="absolute left-[18%] bottom-[6%] h-[280px] w-[280px] rounded-full bg-green-500/8 blur-[110px]" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          badge="Ürünlerimiz"
          title="Yapay zekâ ile güçlenen"
          titleHighlight="ürün ekosistemimiz"
          description="Gerçek ihtiyaçlara odaklanan, kullanıcı deneyimini merkeze alan ve sürdürülebilir büyüme sağlayan dijital ürünler geliştiriyoruz."
        />

        <div className="mt-16 flex flex-col gap-16 lg:gap-24">
          {products.map((product) => {
            const colors = accentColors[product.accentColor];

            return (
              <div
                key={product.id}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  product.reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="flex flex-col gap-6">
                  <div
                    className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs ${colors.badge}`}
                  >
                    {product.tag}
                  </div>

                  <div className="space-y-4">
                    <h3
                      className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
                      style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                    >
                      {product.title}
                    </h3>

                    <p className="max-w-xl text-base leading-8 text-slate-300">
                      {product.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3.5 pt-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${colors.border} ${colors.glow}`}
                        >
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
                        <span className="text-sm leading-7 text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#iletisim"
                    className={`inline-flex w-fit items-center gap-2 rounded-xl border ${colors.border} bg-white/5 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/8`}
                  >
                    Detaylı Bilgi Al
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={colors.check}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>

                <div className="relative">
                  <div className={`absolute -inset-5 -z-10 rounded-[32px] ${colors.glow} blur-3xl`} />

                  <div className="overflow-hidden rounded-[28px] border border-white/10 bg-card/70 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                      <div className="flex gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                      </div>

                      <div className={`rounded-full border px-3 py-1 text-[11px] ${colors.badge}`}>
                        {product.tag}
                      </div>
                    </div>

                    <div className={`bg-gradient-to-br ${colors.panel} p-5 sm:p-6`}>
                      <div className="rounded-2xl border border-white/8 bg-background/60 p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <div className="h-3 w-24 rounded-full bg-white/12" />
                            <div className="mt-2 h-2.5 w-16 rounded-full bg-white/8" />
                          </div>
                          <div className={`h-8 w-20 rounded-xl bg-gradient-to-r ${colors.bar} opacity-75`} />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                            <div className="h-2.5 w-10 rounded-full bg-white/10" />
                            <div className={`mt-4 h-12 rounded-lg bg-gradient-to-br ${colors.bar} opacity-60`} />
                          </div>
                          <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                            <div className="h-2.5 w-12 rounded-full bg-white/10" />
                            <div className="mt-4 flex h-12 items-end gap-1">
                              {[45, 70, 55, 82].map((h, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 rounded-t-sm bg-gradient-to-t ${colors.bar} opacity-70`}
                                  style={{ height: `${h}%` }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                            <div className="h-2.5 w-8 rounded-full bg-white/10" />
                            <div className="mt-4 h-12 rounded-full border border-white/10 bg-white/5" />
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          {[0, 1, 2].map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-3 py-3"
                            >
                              <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${colors.bar}`} />
                              <div className="h-2.5 flex-1 rounded-full bg-white/10" />
                              <div className="h-2.5 w-14 rounded-full bg-white/10" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}