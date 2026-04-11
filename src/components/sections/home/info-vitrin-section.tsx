import Container from "@/components/ui/container";

const steps = [
  {
    title: "Problemi Dinliyoruz",
    description:
      "Kullanıcıyı, davranışlarını ve karşılaştığı gerçek zorlukları dikkatle analiz ediyoruz.",
  },
  {
    title: "İhtiyacı Netleştiriyoruz",
    description:
      "Yüzeyde görünen taleplerin ötesine geçerek asıl ihtiyacı ve fırsat alanlarını belirliyoruz.",
  },
  {
    title: "Doğru Çözümü Üretiyoruz",
    description:
      "İnsan odaklı, sade ve sürdürülebilir dijital ürünleri ihtiyaca göre tasarlayıp geliştiriyoruz.",
  },
];

export default function InfoVitrinSection() {
  return (
    <section className="radar-section">
      <div className="radar-bg-grid" />
      <div className="radar-glow radar-glow-top" />
      <div className="radar-glow radar-glow-left" />
      <div className="radar-glow radar-glow-right" />

      <Container className="radar-container">
        <div className="radar-shell">
          <div className="radar-header">
            <span className="radar-badge">İnsan Odaklı Yaklaşım</span>

            <h2 className="radar-title">
              Teknolojiyi değil,
              <span> insanın gerçek ihtiyacını</span>
              merkez alıyoruz.
            </h2>

            <p className="radar-subtitle">
              Her ürün fikrine bir özellik listesiyle değil, insanın yaşadığı gerçek
              problemle başlıyoruz. İhtiyaçları dikkatle analiz ediyor, çözümü buna
              göre tasarlıyor ve anlamlı dijital deneyimler üretiyoruz.
            </p>
          </div>

          <div className="radar-visual-wrap">
            <div className="radar-stage">
              <div className="radar-circle radar-circle-1" />
              <div className="radar-circle radar-circle-2" />
              <div className="radar-circle radar-circle-3" />
              <div className="radar-circle radar-circle-4" />

              <div className="radar-line radar-line-v" />
              <div className="radar-line radar-line-h" />

              <div className="radar-diagonal radar-diagonal-1" />
              <div className="radar-diagonal radar-diagonal-2" />
              <div className="radar-diagonal radar-diagonal-3" />
              <div className="radar-diagonal radar-diagonal-4" />

              <div className="radar-sweep" />
              <div className="radar-sweep-glow" />

              <div className="radar-center-pulse" />
              <div className="radar-center-node">
                <div className="radar-center-core" />
                <svg
                  className="radar-human-icon"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
              </div>

              <div className="radar-dot radar-dot-1" />
              <div className="radar-dot radar-dot-2" />
              <div className="radar-dot radar-dot-3" />
              <div className="radar-dot radar-dot-4" />
              <div className="radar-dot radar-dot-5" />

              <div className="radar-overlay-copy">
                <span className="radar-mini-badge">İnsan + Problem + İhtiyaç</span>
                <h3>Doğru çözüm, doğru analizle başlar.</h3>
                <p>
                  Kullanıcı davranışlarını, beklentileri ve gerçek ihtiyaçları
                  anlamadan geliştirilen ürünler kalıcı etki oluşturmaz.
                </p>
              </div>
            </div>
          </div>

          <div className="radar-cards">
            {steps.map((step, index) => (
              <article key={step.title} className="radar-card">
                <div className="radar-card-number">0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}