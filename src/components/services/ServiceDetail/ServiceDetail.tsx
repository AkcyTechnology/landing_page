import Image from "next/image";

import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import type { ServiceDef } from "@/data/services";

import ServiceTimeline from "./ServiceTimeline";
import styles from "./ServiceDetail.module.scss";

type Scope = { title: string; items: string[]; note: string; flow?: string[] };

function Label({ index, children }: { index: number; children: string }) {
  return (
    <p className={styles.label}>
      <span>{String(index).padStart(2, "0")}</span>
      {children}
    </p>
  );
}

/* ---------- Açılış ---------- */
export function ServiceHero({ service, total }: { service: ServiceDef; total: number }) {
  const t = getT();
  const chips = service.offerings.slice(0, 3);

  return (
    <section className={styles.hero}>
      <span className={styles.bigNumber} aria-hidden="true">
        {service.number}
      </span>
      <Container>
        <nav className={styles.breadcrumb} aria-label={t.blog.detail.breadcrumb}>
          <ol>
            <li>
              <Link href="/">{t.nav.home}</Link>
            </li>
            <li>
              <Link href="/hizmetler">{t.nav.services}</Link>
            </li>
            <li aria-current="page">{service.title}</li>
          </ol>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              {t.services.serviceOf} {service.number} / {String(total).padStart(2, "0")}
            </p>
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.lead}>{service.heroDescription}</p>
            <p className={styles.sub}>{service.shortDescription}</p>
            <div className={styles.actions}>
              <Link href="/iletisim" className={styles.primary}>
                {t.services.talkCta} <span aria-hidden="true">→</span>
              </Link>
              <Link href="/hizmetler" className={styles.secondary}>
                {t.common.allServices}
              </Link>
            </div>
          </div>

          <figure className={styles.heroMedia}>
            <div className={styles.frame}>
              <Image
                src={service.image.src}
                alt={service.image.alt}
                width={720}
                height={600}
                sizes="(max-width: 1050px) 92vw, 560px"
                className={styles.heroImage}
                priority
              />
            </div>
            {/* Sunulanlardan üçü görselin çevresinde süzülür */}
            {chips.map((chip, index) => (
              <span key={chip} className={`${styles.chip} ${styles[`chip${index}`]}`} aria-hidden="true">
                <i />
                {chip}
              </span>
            ))}
          </figure>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Genel bakış + sunulanlar ---------- */
export function ServiceOffer({ service }: { service: ServiceDef }) {
  const t = getT().services;
  return (
    <section className={styles.offer}>
      <Container>
        <div className={styles.offerGrid}>
          <div data-reveal>
            <Label index={1}>{t.labels.overview}</Label>
            <p className={styles.overview}>{service.overview}</p>
          </div>
          <div>
            <Label index={2}>{t.labels.offerings}</Label>
            <ul className={styles.offerings}>
              {service.offerings.map((offering, index) => (
                <li key={offering} data-reveal style={{ ["--reveal-delay" as string]: `${index * 0.05}s` }}>
                  <span className={styles.check} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {offering}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Kapsam: maddeler veya akış ---------- */
export function ServiceScopeSection({ service }: { service: ServiceDef }) {
  const t = getT().services;
  const scopes = t.scopes as Record<string, Scope>;
  const scope = scopes[service.slug];
  if (!scope) return null;

  return (
    <section className={styles.scope}>
      <Container>
        <div className={styles.scopeHead} data-reveal>
          <Label index={3}>{t.labels.scope}</Label>
          <h2 className={styles.sectionTitle}>{scope.title}</h2>
        </div>

        {scope.flow && (
          <ol className={styles.flow} data-reveal>
            {scope.flow.map((step, index) => (
              <li key={step} style={{ ["--i" as string]: index }}>
                <span className={styles.flowNode}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.flowText}>{step}</span>
              </li>
            ))}
          </ol>
        )}

        {scope.items.length > 0 && (
          <ul className={styles.scopeGrid}>
            {scope.items.map((item, index) => (
              <li key={item} data-reveal style={{ ["--reveal-delay" as string]: `${index * 0.06}s` }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        <p className={styles.scopeNote} data-reveal>
          {scope.note}
        </p>
      </Container>
    </section>
  );
}

/* ---------- Süreç ---------- */
export function ServiceProcessSection({ service }: { service: ServiceDef }) {
  const t = getT().services;
  return (
    <section className={styles.process}>
      <Container>
        <div className={styles.processHead} data-reveal>
          <Label index={4}>{t.labels.process}</Label>
          <h2 className={styles.sectionTitle}>{t.processHeading}</h2>
        </div>
        <ServiceTimeline steps={service.process} />
      </Container>
    </section>
  );
}

/* ---------- Teknolojiler: kayan şerit ---------- */
export function ServiceTech({ technologies }: { technologies: string[] }) {
  const t = getT().services;
  if (technologies.length === 0) return null;
  const loop = [...technologies, ...technologies, ...technologies, ...technologies];
  return (
    <section className={styles.tech} aria-label={t.labels.technologies}>
      <Container>
        <Label index={5}>{t.labels.technologies}</Label>
      </Container>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack} aria-hidden="true">
          {[...loop, ...loop].map((tech, index) => (
            <span key={`${tech}-${index}`}>{tech}</span>
          ))}
        </div>
        {/* Ekran okuyucular için düz liste */}
        <ul className={styles.srOnly}>
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Sonraki hizmet ---------- */
export function ServiceNext({ service }: { service: ServiceDef }) {
  const t = getT().services;
  return (
    <section className={styles.next}>
      <Container>
        <Link href={`/hizmetler/${service.slug}`} className={styles.nextLink}>
          <span className={styles.nextLabel}>
            {t.nextService} · {service.number}
          </span>
          <span className={styles.nextTitle}>
            {service.title}
            <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={styles.nextText}>{service.shortDescription}</span>
        </Link>
      </Container>
    </section>
  );
}
