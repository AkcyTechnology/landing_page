import Image from "next/image";
import Container from "../ui/container";

export default function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="absolute inset-0 -z-30 hero-grid opacity-40" />
      <div className="absolute inset-0 -z-20 hero-vignette" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="hero-glow hero-glow-top" />
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="hero-glow hero-glow-bottom" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="hero-star left-[7%] top-[10%]" />
        <span className="hero-star right-[12%] top-[14%]" />
        <span className="hero-star right-[8%] top-[58%]" />
      </div>

      <Container className="relative z-10 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <span className="hero-kicker animate-fade-in-up">LAUNCHING 2026</span>

          <h1 className="hero-title animate-fade-in-up [animation-delay:120ms]">
            İŞİNİZİ AKILLI BÜYÜTELİM,
            <br />
            BİRLİKTE BÜYÜYELİM
          </h1>

          <p className="hero-description animate-fade-in-up [animation-delay:220ms]">
            AKCY olarak, işinizi ileri taşıyan ölçeklenebilir, sürdürülebilir ve
            yenilikçi yazılım çözümleri geliştiriyoruz. Her projede sadece kod değil,
            değer üretiyoruz.
          </p>

          <div className="hero-form-wrap animate-fade-in-up [animation-delay:320ms]">
            <form className="hero-form">
              <input
                type="email"
                placeholder="Mail Adresinizi Girin"
                className="hero-input"
              />
              <button type="button" className="hero-submit">
                Tanışalım
              </button>
            </form>

            <p className="hero-privacy">
              We care about your data in our{" "}
              <a
                href="/gizlilik-politikasi"
                className="underline underline-offset-2 transition hover:text-white/80"
              >
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-14 flex max-w-6xl justify-center sm:mt-16 lg:mt-20">
          <div className="hero-orb-stage">
            <div className="hero-orb-backglow" />
            <div className="hero-orb-ring hero-orb-ring-one" />
            <div className="hero-orb-ring hero-orb-ring-two" />

            <div className="hero-orb-wrap">
              <div className="hero-orb-shadow" />

              <div className="hero-orb animate-orb-spin">
                <Image
                  src="/hero-orb.svg"
                  alt="AKCY hero orb"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <div className="hero-orb-highlight" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}