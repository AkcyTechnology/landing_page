import Image from "next/image";
import Container from "@/components/ui/container";
import HeroForm from "./hero-form";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-[15%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/15 blur-[100px] animate-pulse-glow" />
        <div className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[80px] animate-float" />
        <div className="absolute left-[5%] bottom-[20%] h-[350px] w-[350px] rounded-full bg-green-500/8 blur-[80px] animate-float-reverse" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <Container className="relative z-10 pb-24 pt-32 sm:pb-32 sm:pt-40">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-5 py-2 text-xs font-medium tracking-widest text-purple-light uppercase">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            Yenilikçi yazılım çözümleri — 2026
          </div>

          {/* Heading */}
          <h1
            className="max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            İşinizi{" "}
            <span className="gradient-text">Akıllı</span>{" "}
            Büyütelim,
            <br className="hidden sm:block" />
            {" "}Birlikte{" "}
            <span className="gradient-text-green">Büyüyelim</span>.
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            AKCY olarak, işinizi ileri taşıyan ölçeklenebilir, sürdürülebilir ve
            yenilikçi yazılım çözümleri geliştiriyoruz. Her projede sadece kod değil,{" "}
            <span className="text-white/80">değer</span> üretiyoruz.
          </p>

          {/* CTA form */}
          <HeroForm />

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Güvenli & Şifreli
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              KVKK Uyumlu
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              7/24 Destek
            </span>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto mt-20 max-w-3xl">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-spin-slow scale-110" />
          <div className="absolute inset-0 rounded-full border border-pink-500/10 animate-spin-slow scale-125" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

          {/* Main orb */}
          <div className="relative mx-auto flex h-[360px] w-[360px] items-center justify-center sm:h-[420px] sm:w-[420px]">
            {/* Outer glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent blur-2xl animate-pulse-glow" />

            {/* Core orb */}
            <div className="relative h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/35 via-pink-500/20 to-violet-600/35 blur-2xl" />
              <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 backdrop-blur-[2px]" />
              <div className="absolute inset-0 animate-orb-spin overflow-hidden rounded-full shadow-[0_0_40px_rgba(168,85,247,0.18)]">
                <Image
                  src="/hero-orb.svg"
                  alt="AKCY hero orb"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="pointer-events-none absolute inset-5 rounded-full bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.24),transparent_26%),radial-gradient(circle_at_72%_72%,rgba(255,255,255,0.08),transparent_22%)]" />
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-[30%] flex items-center gap-2 rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm px-3 py-2 shadow-xl">
              <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
              <span className="text-xs text-white/80">Sistem Aktif</span>
            </div>
            <div className="absolute -right-4 bottom-[30%] flex items-center gap-2 rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm px-3 py-2 shadow-xl">
              <span className="text-xs font-medium gradient-text">+3 Uygulama</span>
            </div>
            <div className="absolute left-[20%] -bottom-4 flex items-center gap-2 rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm px-3 py-2 shadow-xl">
              <span className="text-xs text-white/80">24/7 Destek</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
