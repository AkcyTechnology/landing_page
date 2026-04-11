import Container from "@/components/ui/container";

const impactItems = [
  {
    icon: "tree",
    title: "Her Projede Bağış",
    description: "Geliştirdiğimiz her yazılım projesinde çevre kuruluşlarına bağış yapıyoruz.",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20",
    textColor: "text-green-400",
  },
  {
    icon: "globe",
    title: "Ağaç Dikimi",
    description: "Her yeni müşteri ile birlikte Türkiye'nin dört bir yanına ağaç dikiyoruz.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    textColor: "text-emerald-400",
  },
  {
    icon: "zap",
    title: "Yeşil Teknoloji",
    description: "Enerji verimli altyapılar ve sürdürülebilir kod mimarisi ile karbon ayak izimizi azaltıyoruz.",
    color: "from-teal-500/20 to-cyan-500/20",
    border: "border-teal-500/20",
    textColor: "text-teal-400",
  },
];

export default function SocialImpactSection() {
  return (
    <section id="degerler" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/6 blur-[120px] pointer-events-none" />

      <Container className="relative">
        <div className="relative overflow-hidden rounded-3xl border border-green-500/15 bg-gradient-to-br from-background-secondary via-background to-background-secondary p-10 sm:p-16">
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Corner glows */}
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-green-500/15 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-emerald-500/15 blur-3xl" />

          <div className="relative flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-4 text-center">
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-5 py-1.5 text-xs font-medium uppercase tracking-widest text-green-300 mx-auto">
                <span>🌱</span>
                Sosyal Etki
              </span>
              <h2
                className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                Sadece yazılım değil,{" "}
                <span className="gradient-text-green">etki</span> üretiyoruz.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-7 text-slate-400">
                Her projede çevresel farkındalıkla hareket ediyoruz. Yazılımın ötesinde
                — doğaya, insana ve geleceğe katkı sağlayan bir marka olmaya kararlıyız.
              </p>
            </div>

            {/* Impact cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {impactItems.map((item) => (
                <div
                  key={item.title}
                  className={`flex flex-col gap-4 rounded-2xl border ${item.border} bg-gradient-to-br ${item.color} p-6`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.border} bg-background/40 ${item.textColor}`}>
                    {item.icon === "tree" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                      </svg>
                    )}
                    {item.icon === "globe" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    {item.icon === "zap" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Manifesto quote */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6 text-center">
              <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                "Kodun kalitesi kadar, dünyaya bıraktığımız iz de önemlidir.{" "}
                <span className="text-white/80">
                  Her çalıştırdığımız algoritma, her sunduğumuz çözüm — doğaya borçluyuz.
                </span>"
              </p>
              <p className="mt-3 text-xs text-muted/50">— AKCY Kurucu Ekibi</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
