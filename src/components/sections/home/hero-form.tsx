"use client";

import { useState } from "react";

export default function HeroForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: submit logic
    setEmail("");
  };

  return (
    <div className="mt-10 w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresinizi girin"
          required
          className="input-dark h-12 flex-1 rounded-2xl px-5 text-sm"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 text-sm font-medium text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(236,72,153,0.45)] whitespace-nowrap"
        >
          Tanışalım
          <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-white/30">
        Gizliliğinize saygı duyuyoruz. Spam göndermeyiz.
      </p>
    </div>
  );
}
