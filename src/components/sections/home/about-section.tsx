import Container from "@/components/ui/container";

const highlights = [
  {
    icon: "leaf",
    label: "Sürdürülebilirlik",
    description: "Her projede uzun ömürlü ve sorumlu dijital çözümler üretiriz.",
  },
  {
    icon: "shield",
    label: "Güven & Kalite",
    description: "Her ayrıntıda güvenilirlik, kalite ve özenli mühendislik yaklaşımı.",
  },
  {
    icon: "heart",
    label: "İnsan Odaklı",
    description: "Teknolojiyi, kullanıcıların hayatını kolaylaştıran deneyimlere dönüştürürüz.",
  },
];

const metrics = [
  {
    label: "Aktif Proje",
    value: "3+",
  },
  {
    label: "Memnuniyet",
    value: "100%",
  },
  {
    label: "Uptime",
    value: "99.9%",
  },
  {
    label: "Destek",
    value: "24/7",
  },
];

export default function AboutSection() {
  return (
    <section id="sirketimiz" className="about-section">
      <div className="about-bg" />
      <div className="about-glow about-glow-top" />
      <div className="about-glow about-glow-left" />
      <div className="about-glow about-glow-right" />

      <Container className="about-container">
        <div className="about-grid">
          {/* Left */}
          <div className="about-content">
            <div className="about-badge">AKCY Hakkında</div>

            <h2 className="about-title">
              Teknolojiyi
              <span> zarafet, güven ve değer</span>
              ile geliştiriyoruz.
            </h2>

            <div className="about-divider" />

            <div className="about-texts">
              <p>
                AKCY, <strong>2026 yılında iki kız kardeş tarafından kurulan</strong>,
                yenilikçi ve sürdürülebilir yazılım çözümleri geliştiren modern bir
                teknoloji markasıdır.
              </p>

              <p>
                İşletmelerin dijital dönüşüm süreçlerini daha akıllı, daha düzenli ve
                daha etkili hale getirmeyi hedefliyoruz. Geliştirdiğimiz her üründe;
                <strong> estetik, işlevsellik, kalite ve insan odaklı yaklaşım</strong>
                birlikte ilerler.
              </p>

              <p>
                Bizim için yazılım yalnızca teknik bir üretim değil; güven veren,
                sadeleştiren ve uzun vadeli değer oluşturan bir deneyim tasarımıdır.
              </p>
            </div>

            <div className="about-highlights">
              {highlights.map((item) => (
                <div key={item.label} className="about-highlight-card">
                  <div className="about-highlight-icon">
                    {item.icon === "leaf" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                      >
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                      </svg>
                    )}

                    {item.icon === "shield" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}

                    {item.icon === "heart" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                  </div>

                  <div className="about-highlight-body">
                    <span className="about-highlight-label">{item.label}</span>
                    <span className="about-highlight-description">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="about-visual-wrap">
            <div className="about-visual-card">
              <div className="about-window-top">
                <div className="about-window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="about-window-url">akcy.tech / about</span>
              </div>

              <div className="about-visual-body">
                <div className="about-quote-card">
                  <span className="about-quote-kicker">Vizyonumuz</span>
                  <p className="about-quote">
                    Güçlü mühendisliği, sade tasarımı ve insan merkezli düşünceyi bir
                    araya getirerek kalıcı dijital değer üretmek.
                  </p>
                </div>

                <div className="about-metrics">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="about-metric-card">
                      <span className="about-metric-label">{metric.label}</span>
                      <span className="about-metric-value">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <div className="about-system-card">
                  <div className="about-system-top">
                    <span className="about-system-title">Operasyon Dengesi</span>
                    <span className="about-system-status">İstikrarlı</span>
                  </div>

                  <div className="about-bars">
                    {[56, 74, 62, 88, 72, 81, 68, 91, 76, 84, 70, 94].map((h, i) => (
                      <span
                        key={i}
                        className="about-bar"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="about-status-line">
                  <span className="about-status-dot" />
                  <span>Tüm sistemler kararlı şekilde çalışıyor</span>
                </div>
              </div>
            </div>

            <div className="about-card-glow" />
          </div>
        </div>
      </Container>
    </section>
  );
}