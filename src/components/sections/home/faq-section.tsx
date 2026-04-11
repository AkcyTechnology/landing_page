"use client";

import Image from "next/image";
import { useState } from "react";
import Container from "@/components/ui/container";
import { faqItems } from "@/data/faq";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="sss" className="faq-section relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[40px] h-[320px] w-[320px] rounded-full bg-purple-500/8 blur-[120px]" />
        <div className="absolute right-[-80px] bottom-[30px] h-[260px] w-[260px] rounded-full bg-pink-500/8 blur-[110px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-5 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-2 lg:sticky lg:top-28">
            <span className="faq-kicker">BİLMENİZ GEREKENLER</span>

            <h2 className="faq-title">
              Sıkça Sorulan <span className="gradient-text">Sorular</span>
            </h2>

            <p className="faq-intro">
              Süreci, teslim modelimizi ve birlikte çalışma biçimizi netleştiren
              en sık gelen soruları burada topladık.
            </p>

            <a href="#iletisim" className="faq-cta group">
              <span className="faq-cta-bg">
                <Image
                  src="/hero-orb.svg"
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover opacity-30 scale-125 group-hover:scale-150 transition-transform duration-700"
                />
              </span>

              <span className="faq-cta-overlay" />

              <span className="faq-cta-content">
                Ücretsiz Tanışma Görüşmesi
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`faq-card group ${
                    isOpen ? "faq-card-open" : "faq-card-closed"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${index}`}
                    id={`faq-trigger-${index}`}
                  >
                    <span className="faq-question">{item.question}</span>

                    <span className={`faq-icon ${isOpen ? "faq-icon-open" : ""}`}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={`faq-content-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    className={`faq-answer-wrap ${isOpen ? "faq-answer-wrap-open" : ""}`}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
