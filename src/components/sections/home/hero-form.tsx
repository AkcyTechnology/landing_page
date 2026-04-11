"use client";

import { useState } from "react";

export default function HeroForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="ml-24 mt-8 w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          required
          className="flex-1 h-11 rounded-xl px-4 text-[13px] text-white/80 placeholder:text-white/22 outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(168,85,247,0.35)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.07)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          className="h-11 px-5 rounded-xl text-[13px] text-white/90 whitespace-nowrap transition-all duration-200 hover:text-white"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.55), rgba(236,72,153,0.50))",
            border: "1px solid rgba(255,255,255,0.08)",
            letterSpacing: "0.03em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(168,85,247,0.72), rgba(236,72,153,0.66))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(168,85,247,0.55), rgba(236,72,153,0.50))";
          }}
        >
          Tanışalım
        </button>
      </form>
      <p
        className="mt-3 text-center text-white/18"
        style={{ fontSize: "11px", letterSpacing: "0.02em" }}
      >
        Gizliliğinize saygı duyuyoruz.
      </p>
    </div>
  );
}
