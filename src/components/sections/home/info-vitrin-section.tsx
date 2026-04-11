import Container from "@/components/ui/container";

const features = [
  {
    icon: "sync",
    title: "Cihazlar Arası Senkronizasyon",
    description: "Telefon, tablet veya bilgisayardan — her zaman, her yerden anında erişim.",
  },
  {
    icon: "lock",
    title: "Güvenli ama Erişilebilir",
    description: "Uçtan uca şifreleme ile tam güvenlik, sezgisel arayüz ile kolayca ulaşım.",
  },
  {
    icon: "users",
    title: "Ekip Çalışmasına Uygun",
    description: "Gerçek zamanlı iş birliği araçları ile ekibinizle aynı anda çalışın.",
  },
];

export default function InfoVitrinSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/15 bg-gradient-to-br from-card via-background-secondary to-card p-1">
          {/* Inner content wrapper */}
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-b from-background-secondary to-background px-8 py-16 sm:px-16 sm:py-20">
            {/* Radar / glow effect */}
            <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-purple-500/10 animate-spin-slow" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
              <div className="absolute inset-16 rounded-full border border-pink-500/10 animate-spin-slow" style={{ animationDuration: "25s" }} />
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-2xl animate-pulse-glow" />
            </div>

            <div className="relative flex flex-col gap-10 text-center">
              {/* Badge */}
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-purple-light mx-auto">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Bilgi Yönetimi
              </span>

              {/* Heading */}
              <div className="flex flex-col gap-3">
                <h2
                  className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                >
                  Bilgiyi{" "}
                  <span className="gradient-text">kaybetmeyin</span>
                </h2>
                <p className="mx-auto max-w-xl text-base leading-7 text-slate-400">
                  Belgelerinizi, notlarınızı ve kritik verilerinizi tek merkezde güvenle
                  yönetin. Her şey senkronize, her şey güvende.
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid gap-4 sm:grid-cols-3 text-left">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-card/40 p-5 backdrop-blur-sm card-glow"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-light">
                      {feature.icon === "sync" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="23 4 23 10 17 10" />
                          <polyline points="1 20 1 14 7 14" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                      )}
                      {feature.icon === "lock" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      )}
                      {feature.icon === "users" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-muted">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
