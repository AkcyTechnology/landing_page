import Image from "next/image";

/*
  Ana sayfanın ilk açılışında görünen dört aşamalı yazı introsu.
  Yalnızca CSS ile çalışır (globals.css › SİTE İNTROSU): <html data-intro>
  özniteliği SiteShell'deki satır içi betikle, yalnızca ana sayfa oturumda
  ilk kez açılırken ve hareket azaltma kapalıyken eklenir. Öznitelik yoksa
  intro hiç görüntülenmez. Kök düzende durduğu için site içi geçişlerde
  yeniden oynamaz. Tıklamaları engellemez, ekran okuyuculardan gizlidir.
*/
export default function SiteIntro({ words, areas }: { words: string[]; areas: string[] }) {
  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro__bar">
        <Image src="/images/brand/logo.svg" alt="" width={109} height={62} className="site-intro__logo" priority />
      </div>
      <div className="site-intro__stage">
        {words.map((word, i) => (
          <span key={word} className="site-intro__word" style={{ "--i": i } as React.CSSProperties}>
            {word}
          </span>
        ))}
        <span className="site-intro__word site-intro__word--areas" style={{ "--i": words.length } as React.CSSProperties}>
          {areas.map((area, i) => (
            <span key={area}>
              {i > 0 && <i className="site-intro__dot" />}
              {area}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
