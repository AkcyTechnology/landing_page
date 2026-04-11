import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";

const highlights = [
  {
    icon: "leaf",
    label: "Sürdürülebilirlik",
    description: "Her projede çevre bilinci",
  },
  {
    icon: "shield",
    label: "Güven & Kalite",
    description: "Titiz kalite kontrol süreçleri",
  },
  {
    icon: "heart",
    label: "İnsan Odaklı",
    description: "Kullanıcı deneyimi her şeyden önce",
  },
];

export default function AboutSection() {
  return (
    <section id="sirketimiz" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-500/6 blur-[80px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-green-500/6 blur-[80px] pointer-events-none" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              badge="AKCY Hakkında"
              title="Teknolojide"
              titleHighlight="Güven ve Kalite"
              align="left"
            />

            <div className="flex flex-col gap-5 text-slate-400">
              <p className="text-base leading-7 sm:text-lg">
                AKCY, <span className="text-white/80 font-medium">2026 yılında iki kız kardeş tarafından</span> kurulmuş,
                yenilikçi ve sürdürülebilir yazılım çözümleri sunan bir teknoloji firmasıdır.
              </p>
              <p className="text-base leading-7">
                İşletmelerin dijital dönüşümünü hızlandırırken, çevreye duyarlı ve uzun vadeli değer
                yaratan projeler geliştirmeyi hedefliyoruz. Her geliştirdiğimiz yazılımda{" "}
                <span className="text-white/80 font-medium">kalite, güven ve insan odaklı yaklaşım</span>ı temel alıyoruz.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 rounded-xl border border-white/8 bg-card/60 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-light">
                    {item.icon === "leaf" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                      </svg>
                    )}
                    {item.icon === "shield" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                    {item.icon === "heart" && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  <span className="text-xs text-muted">{item.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-card/60 backdrop-blur-sm p-1">
              {/* Top bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-white/30">akcy.tech</span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Aktif Proje", value: "3+", color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20" },
                    { label: "Müşteri Memnuniyeti", value: "100%", color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20" },
                    { label: "Uptime", value: "99.9%", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
                    { label: "Destek", value: "24/7", color: "from-orange-500/20 to-yellow-500/20", border: "border-orange-500/20" },
                  ].map((metric) => (
                    <div key={metric.label} className={`flex flex-col gap-1 rounded-xl border ${metric.border} bg-gradient-to-br ${metric.color} p-4`}>
                      <span className="text-xs text-white/50">{metric.label}</span>
                      <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Activity bar */}
                <div className="rounded-xl border border-white/8 bg-background/40 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/50">Sistem Performansı</span>
                    <span className="text-xs font-medium text-green-400">Mükemmel</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {[65, 80, 45, 90, 75, 85, 70, 95, 60, 88, 72, 92].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-purple-500/60 to-pink-500/40"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
                  <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  <span className="text-sm text-green-300">Tüm sistemler çalışıyor</span>
                </div>
              </div>
            </div>

            {/* Glow behind card */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-purple-500/10 blur-2xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
