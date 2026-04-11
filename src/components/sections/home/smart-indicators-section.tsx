import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";

const indicators = [
  {
    title: "Sezonsallık Analizi",
    description: "Dönemsel trendleri otomatik olarak tespit edin ve iş planlamanızı optimize edin.",
    icon: "trend",
    bars: [40, 65, 55, 80, 70, 90, 75],
  },
  {
    title: "Mobil Sorun Tespiti",
    description: "Anlık uyarılar ile sorunları kullanıcıları etkilemeden önce yakalayın.",
    icon: "alert",
    bars: [85, 30, 90, 45, 75, 60, 88],
  },
  {
    title: "En İyi Performans",
    description: "En yüksek verimlilik noktalarını belirleyin ve başarıyı tekrarlayın.",
    icon: "star",
    bars: [55, 70, 80, 90, 85, 92, 95],
  },
  {
    title: "Çakışma Analizi",
    description: "Süreç çakışmalarını görselleştirerek verimliliği maksimize edin.",
    icon: "layers",
    bars: [75, 60, 85, 50, 78, 65, 82],
  },
  {
    title: "Pazar İçgörüsü",
    description: "Yapay zeka destekli pazar analizi ile rekabette önde kalın.",
    icon: "globe",
    bars: [50, 75, 65, 85, 70, 88, 80],
  },
  {
    title: "Fırsat Hesaplama",
    description: "Potansiyel gelir fırsatlarını hesaplayın ve önceliklendirin.",
    icon: "calc",
    bars: [65, 78, 55, 88, 72, 80, 90],
  },
];

function IndicatorIcon({ type }: { type: string }) {
  const iconProps = { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "trend":
      return <svg {...iconProps}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
    case "alert":
      return <svg {...iconProps}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
    case "star":
      return <svg {...iconProps}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case "layers":
      return <svg {...iconProps}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
    case "globe":
      return <svg {...iconProps}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    default:
      return <svg {...iconProps}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>;
  }
}

export default function SmartIndicatorsSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <Container className="relative">
        <div className="flex flex-col gap-16">
          {/* Heading */}
          <SectionHeading
            badge="Akıllı Göstergeler"
            title="Sorunları daha hızlı"
            titleHighlight="tespit edin"
            description="Sistem, dikkat gerektiren anomalileri otomatik olarak tespit ederek ekiplerin daha hızlı aksiyon almasını sağlar."
          />

          {/* Cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-5 backdrop-blur-sm card-glow"
              >
                {/* Top: icon + mini chart */}
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-light border border-purple-500/20">
                    <IndicatorIcon type={item.icon} />
                  </div>

                  {/* Micro bar chart */}
                  <div className="flex items-end gap-0.5 h-8 w-16 opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.bars.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-500 to-pink-500"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-5 text-muted">{item.description}</p>
                </div>

                {/* Hover shimmer */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer rounded-2xl" />
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mx-auto max-w-xl rounded-2xl border border-purple-500/15 bg-purple-500/5 px-6 py-4 text-center">
            <p className="text-sm text-slate-400">
              <span className="text-white/80 font-medium">Otomatik anomali tespiti</span> — İnsan müdahalesi olmaksızın
              kritik anları yakalayan akıllı sistem.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
