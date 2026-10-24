"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ArticleContent.module.scss";

export default function VideoEmbed({provider, videoId, caption}: {provider: "youtube" | "vimeo"; videoId: string; caption?: string}) {
  const [allowed, setAllowed] = useState(false);
  const src = provider === "youtube" ? `https://www.youtube-nocookie.com/embed/${videoId}` : `https://player.vimeo.com/video/${videoId}?dnt=1`;
  return <figure className={styles.video}>
    <div className={styles.videoFrame}>
      {allowed ? <iframe src={src} title={caption ?? "Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <div className={styles.videoConsent}>
        <span>VİDEO / {provider.toLocaleUpperCase("tr")}</span>
        <p>Videoyu yüklediğinizde {provider === "youtube" ? "YouTube" : "Vimeo"} ile bağlantı kurulur; hizmet kendi gizlilik ve çerez uygulamalarını kullanabilir.</p>
        <button type="button" onClick={() => setAllowed(true)}>İzin ver ve videoyu yükle <span aria-hidden="true">↗</span></button>
        <Link href="/cookies">Çerez Politikası</Link>
      </div>}
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
