"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, type CSSProperties } from "react";

import Link from "@/i18n/Link";
import Container from "@/components/common/Container/Container";
import ProjectEmblem from "@/components/projects/ProjectEmblem/ProjectEmblem";
import type { ProjectsPageContent, ShowcaseProject } from "@/content/projects-page";

import styles from "./ProjectsShowcase.module.scss";

/*
  Projelerimiz: tüm projeler alt alta, tam genişlikte bölümler.
  Hareket (yalnızca JS çalışırsa ve hareket azaltma kapalıysa):
  - soldaki "yolculuk" çizgisi kaydırdıkça dolar, geçilen proje düğümü dolar
  - bölüm ekrana girince görsel kendi tarafından perde gibi açılır,
    amblem kendini çizer, metinler sırayla yükselir
  Kaydırma kilitlenmez, otomatik kayan galeri yoktur.
*/

/* Başlık kelimeleri: her biri farklı açıyla düşer, hafif sekip yerine oturur */
const DROP_TILT = [-7, 5, -4, 8, -6, 4];
function DropWords({ text, start }: { text: string; start: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            className={styles.dropWord}
            style={{ "--i": start + index, "--tilt": `${DROP_TILT[(start + index) % DROP_TILT.length]}deg` } as CSSProperties}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/* Arka plan: proje amblemlerinin düğüm-ağ dilinde, yavaşça süzülen bir ağ */
const NET_NODES: [number, number, number][] = [
  [620, 70, 5], [720, 40, 3.5], [800, 110, 6], [900, 60, 4], [980, 150, 5.5], [1080, 90, 3.5],
  [700, 190, 4], [860, 220, 7], [1000, 260, 4], [1120, 210, 5], [760, 300, 3.5], [940, 330, 5],
  [1180, 320, 4], [1060, 360, 3],
];
const NET_LINKS: [number, number][] = [
  [0, 1], [1, 2], [0, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7], [2, 7], [7, 4], [4, 8], [8, 9], [5, 9],
  [7, 8], [6, 10], [10, 7], [10, 11], [11, 8], [8, 12], [9, 12], [11, 13], [12, 13],
];
function IntroNetwork() {
  return (
    <svg className={styles.introNet} viewBox="560 0 680 400" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <g className={styles.netLines}>
        {NET_LINKS.map(([a, b], index) => (
          <line
            key={`${a}-${b}`}
            x1={NET_NODES[a][0]}
            y1={NET_NODES[a][1]}
            x2={NET_NODES[b][0]}
            y2={NET_NODES[b][1]}
            pathLength={1}
            style={{ "--d": `${0.5 + index * 0.06}s` } as CSSProperties}
          />
        ))}
      </g>
      <g className={styles.netNodes}>
        {NET_NODES.map(([x, y, r], index) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} style={{ "--d": `${0.35 + index * 0.07}s`, "--f": `${6 + (index % 4) * 1.5}s` } as CSSProperties} />
        ))}
      </g>
    </svg>
  );
}

function Visual({ project, priority }: { project: ShowcaseProject; priority: boolean }) {
  const { visual } = project;

  if (visual.kind === "web") {
    return (
      <div className={styles.webVisual}>
        <div className={styles.browser}>
          <div className={styles.bar} aria-hidden="true">
            <i /><i /><i />
            <span>{visual.host}</span>
          </div>
          <Image
            src={visual.desktop.src}
            alt={visual.desktop.alt}
            width={visual.desktop.width}
            height={visual.desktop.height}
            sizes="(max-width: 1050px) 92vw, 640px"
            className={styles.desktopImage}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
        <div className={styles.phone}>
          <Image
            src={visual.mobile.src}
            alt={visual.mobile.alt}
            width={visual.mobile.width}
            height={visual.mobile.height}
            sizes="160px"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  /* Gerçek ekran görüntüsü yoksa uydurma ekran yerine amblem ve boş cihaz çerçevesi */
  const emblem = project.emblem ? <ProjectEmblem id={project.emblem} size={72} className={styles.drawn} /> : null;

  /* Web platformu, gerçek ekranlarla: öndeki tarayıcıda ilk ekran, arkada diğerleri kademeli */
  if (visual.device === "browser" && visual.screens.length > 0) {
    const layers = visual.screens.slice(0, 3);
    return (
      <div className={`${styles.appVisual} ${styles.appVisualScreens}`}>
        <div className={styles.browserStack}>
          {layers
            .map((image, index) => (
              <div key={image.src} className={`${styles.browser} ${styles.stackLayer}`} data-layer={index}>
                <div className={styles.bar} aria-hidden="true">
                  <i /><i /><i />
                  <span>{project.name}</span>
                </div>
                <Image
                  src={image.src}
                  alt={index === 0 ? image.alt : ""}
                  aria-hidden={index === 0 ? undefined : true}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 1050px) 80vw, 520px"
                  className={styles.desktopImage}
                  loading="lazy"
                />
              </div>
            ))
            .reverse()}
        </div>
      </div>
    );
  }

  if (visual.device === "browser") {
    return (
      <div className={styles.appVisual}>
        <div className={`${styles.browser} ${styles.browserEmpty}`}>
          <div className={styles.bar} aria-hidden="true">
            <i /><i /><i />
            <span>{project.name}</span>
          </div>
          <div className={styles.emptyScreen}>{emblem}</div>
        </div>
      </div>
    );
  }

  /* Gerçek ekranlar varsa: ortada ilk ekran, yanlarda diğer ikisi */
  if (visual.screens.length > 0) {
    const [main, left, right] = visual.screens;
    const screen = (image: typeof main | undefined, side: boolean) =>
      image ? (
        <span className={`${styles.device} ${styles.deviceScreen} ${side ? styles.deviceSide : ""}`}>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 30vw, 200px" loading="lazy" />
        </span>
      ) : (
        <span className={`${styles.device} ${side ? styles.deviceSide : ""}`} />
      );
    return (
      <div className={`${styles.appVisual} ${styles.appVisualScreens}`}>
        <div className={styles.devices}>
          {screen(left, true)}
          {screen(main, false)}
          {screen(right, true)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appVisual}>
      <div className={styles.devices}>
        <span className={`${styles.device} ${styles.deviceSide}`} />
        <span className={styles.device}>{emblem}</span>
        <span className={`${styles.device} ${styles.deviceSide}`} />
      </div>
    </div>
  );
}

export default function ProjectsShowcase({ content }: { content: ProjectsPageContent }) {
  const listRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const journey = journeyRef.current;
    if (!list || !journey) return;

    const sections = [...list.querySelectorAll<HTMLElement>("[data-project]")];
    const nodes = [...journey.querySelectorAll<HTMLElement>("[data-node]")];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.setAttribute("data-in", ""));
      return;
    }

    list.setAttribute("data-animate", "");

    /* Bölüm ekrana girince bir kez açılır */
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    /* Yolculuk çizgisi: düğümleri bölüm başlarına yerleştir, kaydırdıkça doldur */
    const place = () => {
      const top = sections[0]?.offsetTop ?? 0;
      nodes.forEach((node, index) => {
        node.style.top = `${(sections[index]?.offsetTop ?? 0) - top + 120}px`;
      });
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = journey.getBoundingClientRect();
      const line = window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
      journey.style.setProperty("--progress", progress.toFixed(4));
      nodes.forEach((node) => node.toggleAttribute("data-passed", node.getBoundingClientRect().top < line));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      place();
      onScroll();
    };

    place();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <section className={styles.intro}>
        <IntroNetwork />
        <Container className={styles.introInner}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          {/* Kelimeler menünün altından düşüp başlıktaki yerlerine oturur */}
          <h1 className={styles.heading}>
            <DropWords text={content.title} start={0} />{" "}
            <span className={styles.headingAccent}>
              <DropWords text={content.titleAccent} start={content.title.split(" ").length} />
            </span>
          </h1>
          <p className={styles.lead}>{content.description}</p>
        </Container>
      </section>

      <div ref={listRef} className={styles.list}>
        <div ref={journeyRef} className={styles.journey} aria-hidden="true">
          <i className={styles.journeyFill} />
          {content.projects.map((project) => (
            <span key={project.id} className={styles.node} data-node />
          ))}
        </div>

        {content.projects.map((project, index) => (
          <section
            key={project.id}
            className={styles.project}
            data-project
            aria-labelledby={`project-${project.id}`}
          >
            <Container>
              <div className={`${styles.grid} ${index % 2 === 1 ? styles.flip : ""}`}>
                <div className={styles.media}>
                  <Visual project={project} priority={index === 0} />
                </div>

                <div className={styles.text}>
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className={styles.name}>
                    {project.icon ? (
                      <Image src={project.icon} alt="" width={48} height={48} className={styles.appIcon} />
                    ) : (
                      project.emblem && (
                        <span className={styles.emblemBox}>
                          <ProjectEmblem id={project.emblem} size={30} className={styles.drawn} />
                        </span>
                      )
                    )}
                    {project.name}
                  </p>

                  <p className={styles.label}>{project.label}</p>
                  <h2 id={`project-${project.id}`} className={styles.title}>
                    {project.title}
                  </h2>
                  <p className={styles.description}>{project.description}</p>

                  {project.scope && project.scope.length > 0 && (
                    <ul className={styles.scope}>
                      {project.scope.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {(project.liveUrl || project.detailHref) && (
                    <div className={styles.actions}>
                      {project.liveUrl && (
                        <a
                          className={styles.primary}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} — ${content.visitSite} (${content.newTab})`}
                        >
                          {content.visitSite} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.detailHref && (
                        <Link className={styles.secondary} href={project.detailHref}>
                          {content.viewCaseStudy} <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
