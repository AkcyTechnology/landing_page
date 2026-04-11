import Container from "@/components/ui/container";
import HeroForm from "./home/hero-form";

export default function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="hero-vignette absolute inset-0" />

        <div className="hero-glow hero-glow-top" />
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-glow hero-glow-bottom" />

        {/* Twinkle stars */}
        <div className="hero-twinkle-layer">
          <span className="hero-twinkle-dot hero-twinkle-dot-1" />
          <span className="hero-twinkle-dot hero-twinkle-dot-2" />
          <span className="hero-twinkle-dot hero-twinkle-dot-3" />
          <span className="hero-twinkle-dot hero-twinkle-dot-4" />
          <span className="hero-twinkle-dot hero-twinkle-dot-5" />
          <span className="hero-twinkle-dot hero-twinkle-dot-6" />
          <span className="hero-twinkle-dot hero-twinkle-dot-7" />
          <span className="hero-twinkle-dot hero-twinkle-dot-8" />
        </div>

        <span className="hero-star left-[14%] top-[16%] opacity-50" />
        <span className="hero-star right-[18%] top-[24%] opacity-40" />
        <span className="hero-star right-[8%] bottom-[26%] opacity-50" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-start pt-24 sm:pt-28 lg:pt-32">
          {/* Text block */}
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <p className="hero-kicker animate-fade-in-up">
              Launching 2026
            </p>

            <h1
              className="hero-title animate-fade-in-up [animation-delay:80ms]"
              style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
            >
              İşinizi Akıllı Büyütelim,
              <br />
              Birlikte Büyüyelim
            </h1>

            <p className="hero-description animate-fade-in-up [animation-delay:160ms]">
              AKCY olarak, işinizi ileri taşıyan ölçeklenebilir, sürdürülebilir ve
              yenilikçi yazılım çözümleri geliştiriyoruz. Her projede sadece kod
              değil, değer üretiyoruz.
            </p>

            <div className="hero-form-wrap animate-fade-in-up [animation-delay:240ms]">
              <HeroForm />
              <p className="hero-privacy">
                Verilerinize önem veriyoruz. Detaylar için privacy policy.
              </p>
            </div>
          </div>

          {/* Orb block */}
          <div className="hero-orb-stage mt-20 sm:mt-20 lg:mt-24">
            <div className="hero-orb-backglow" />

            <div className="hero-orb-ring hero-orb-ring-one" />
            <div className="hero-orb-ring hero-orb-ring-two" />

            <div className="hero-orb-wrap">
              <div className="hero-orb-shadow" />
              <div className="hero-orb">
                <div className="hero-orb-core" />
                <div className="hero-orb-swirl hero-orb-swirl-one" />
                <div className="hero-orb-swirl hero-orb-swirl-two" />
                <div className="hero-orb-swirl hero-orb-swirl-three" />
                <div className="hero-orb-texture" />
                <div className="hero-orb-highlight" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}