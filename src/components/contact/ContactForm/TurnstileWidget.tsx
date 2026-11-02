"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import Script from "next/script";

import styles from "./ContactForm.module.scss";

interface TurnstileApi {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      language?: string;
      theme?: "light" | "dark" | "auto";
    }
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
}

/*
  Cloudflare Turnstile robot doğrulaması. Çoğu kullanıcı hiçbir şeye
  tıklamadan geçer; şüpheli durumlarda tek tıklık bir kutu gösterilir.
  Site anahtarı tanımlı değilse hiçbir şey render edilmez.
*/
const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onToken }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | null>(null);

    useImperativeHandle(ref, () => ({
      // Token tek kullanımlıktır; her gönderimden sonra yenisi alınır.
      reset: () => {
        onToken("");
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      },
    }));

    const renderWidget = () => {
      if (!TURNSTILE_SITE_KEY || !window.turnstile || !containerRef.current) {
        return;
      }

      if (widgetId.current) window.turnstile.remove(widgetId.current);

      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
        language: "tr",
        theme: "light",
      });
    };

    if (!TURNSTILE_SITE_KEY) return null;

    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderWidget}
        />
        <div ref={containerRef} className={styles.turnstile} />
      </>
    );
  }
);

export default TurnstileWidget;
