import Image from "next/image";
import Container from "@/components/ui/container";
import HeroForm from "./hero-form";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start">
      {/* Very subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-[0.18]" />
        <div className="absolute left-1/2 -top-24 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-purple-500/7 blur-[160px]" />
        <div className="absolute right-[6%] top-[12%] h-[240px] w-[240px] rounded-full bg-pink-500/5 blur-[100px] animate-float" />
        <div className="absolute left-[6%] top-[28%] h-[200px] w-[200px] rounded-full bg-violet-500/5 blur-[90px] animate-float-reverse" />
      </div>

      {/* Large orb — half visible at bottom */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 pointer-events-none"
        style={{ width: 860, height: 860 }}
      >
        <div
          className="absolute rounded-full border border-purple-500/[0.06] animate-spin-slow"
          style={{ width: 1020, height: 1020, top: -80, left: -80 }}
        />
        <div
          className="absolute rounded-full border border-pink-500/[0.04] animate-spin-slow"
          style={{ width: 1180, height: 1180, top: -160, left: -160, animationDirection: "reverse", animationDuration: "44s" }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500/18 via-pink-500/12 to-violet-600/8 blur-[80px] scale-105 animate-pulse-glow" />
        <div className="absolute inset-0 rounded-full border border-white/[0.06] overflow-hidden animate-orb-spin">
          <Image src="/hero-orb.svg" alt="AKCY hero orb" fill priority className="object-contain" />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.08),transparent_18%)]" />
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-24 sm:pt-24 pb-8">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">

          {/* Eyebrow — refined, no uppercase */}
          <p
            className="mb-2 text-[10px] tracking-[0.35em] text-white/28 animate-fade-in-up"
            style={{ fontFamily: "var(--font-inter), sans-serif", textTransform: "uppercase" }}
          >
            Yenilikçi yazılım çözümleri &nbsp;·&nbsp; 2026
          </p>

          {/* Heading — Cormorant Garamond, light */}
          <h1
            className="animate-fade-in-up [animation-delay:80ms] text-white"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 4.4vw, 3.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            İşinizi{" "}
            <span className="gradient-text" style={{ fontWeight: 400 }}>Akıllı</span>{" "}
            Büyütelim,
            <br />
            Birlikte{" "}
            <span className="gradient-text-orange" style={{ fontWeight: 400 }}>Büyüyelim</span>.
          </h1>

          {/* Divider line */}
          {/* <div className="animate-fade-in-up [animation-delay:160ms] w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" /> */}

          {/* Description */}
          <p
            className="animate-fade-in-up [animation-delay:200ms] max-w-sm text-white/42 mt-4"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.82rem",
              lineHeight: 1.5,
              letterSpacing: "0.012em",
            }}
          >
            İşinizi ileri taşıyan ölçeklenebilir, sürdürülebilir ve yenilikçi
            yazılım çözümleri geliştiriyoruz. Her projede{" "}
            <span style={{ color: "rgba(255,255,255,0.62)" }}>değer</span> üretiyoruz.
          </p>

          {/* CTA */}
          <div className="animate-fade-in-up [animation-delay:280ms] w-full">
            <HeroForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
