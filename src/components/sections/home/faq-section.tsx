"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { faqItems } from "@/data/faq";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16 lg:items-start">
          {/* Left: heading */}
          <div className="flex flex-col gap-6 lg:col-span-2 lg:sticky lg:top-28">
            <h2
              className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
            >
              Sıkça Sorulan{" "}
              <span className="gradient-text">Sorular</span>
            </h2>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Aklınızdaki soruların cevaplarını burada bulabilirsiniz. Daha fazlası
              için bizimle iletişime geçin.
            </p>
            <a
              href="#iletisim"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-sm font-medium text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105"
            >
              Ücretsiz Tanışma Görüşmesi
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col gap-2 lg:col-span-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                    isOpen
                      ? "border-purple-500/30 bg-purple-500/5"
                      : "border-white/8 bg-card/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium text-white sm:text-base">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen
                          ? "border-purple-500/40 bg-purple-500/20 text-purple-light rotate-45"
                          : "border-white/10 bg-white/5 text-white/50"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
