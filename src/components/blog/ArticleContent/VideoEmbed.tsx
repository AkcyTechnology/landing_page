"use client";

import { useState } from "react";
import Link from "@/i18n/Link";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import styles from "./ArticleContent.module.scss";

export default function VideoEmbed({provider, videoId, caption}: {provider: "youtube" | "vimeo"; videoId: string; caption?: string}) {
  const [allowed, setAllowed] = useState(false);
  const locale = useLocale();
  const t = useT().blog.video;
  const src = provider === "youtube" ? `https://www.youtube-nocookie.com/embed/${videoId}` : `https://player.vimeo.com/video/${videoId}?dnt=1`;
  return <figure className={styles.video}>
    <div className={styles.videoFrame}>
      {allowed ? <iframe src={src} title={caption ?? t.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <div className={styles.videoConsent}>
        <span>{t.label} / {provider.toLocaleUpperCase(locale)}</span>
        <p>{t.consent.replace("{provider}", provider === "youtube" ? "YouTube" : "Vimeo")}</p>
        <button type="button" onClick={() => setAllowed(true)}>{t.allow} <span aria-hidden="true">↗</span></button>
        <Link href="/cookies">{t.cookiePolicy}</Link>
      </div>}
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
