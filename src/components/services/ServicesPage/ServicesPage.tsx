import Link from "@/i18n/Link";
import { localizeSlug, type Locale } from "@/i18n/config";
import { getServiceBySlug } from "@/data/services";
import { servicePhotos, servicesPageContent } from "@/content/services-page";

import ServicesHero, { type ArcCard } from "./ServicesHero";
import styles from "./ServicesPage.module.scss";

const pad = (value: number) => String(value).padStart(2, "0");

/*
  Hizmetler: tek sayfa. Kartlı açılış, üç grupta hizmet kartları
  (her kart #slug bağlantısıyla adreslenebilir) ve kapanış çağrısı.
*/
export default function ServicesPage({ locale }: { locale: Locale }) {
  const content = servicesPageContent[locale];
  const groups = content.groups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const service = getServiceBySlug(item.slug, locale);
      if (!service) throw new Error(`Hizmet bulunamadı: ${item.slug}`);
      return { ...item, id: localizeSlug("hizmetler", item.slug, locale), service, photo: servicePhotos[item.slug] ?? service.image.src };
    }),
  }));

  let counter = 0;
  const numbered = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, number: pad(++counter) })),
  }));

  const cards: ArcCard[] = numbered.flatMap((group) =>
    group.items.map((item) => ({ id: item.id, number: item.number, title: item.title, image: item.photo }))
  );

  return (
    <>
      <ServicesHero {...content.hero} cards={cards} />

      <div id="hizmet-gruplari" className={styles.groups}>
        {numbered.map((group, groupIndex) => (
          <section key={group.title} className={styles.group} aria-labelledby={`grup-${groupIndex + 1}`}>
            <header className={styles.groupHead} data-reveal="">
              <span className={styles.groupNumber} aria-hidden="true">{pad(groupIndex + 1)}</span>
              <h2 id={`grup-${groupIndex + 1}`} className={styles.groupTitle}>{group.title}</h2>
              <p className={styles.groupCount}>
                {group.items.length} {content.servicesLabel}
              </p>
            </header>

            <div className={`${styles.grid} ${styles[`grid${group.items.length}`]}`}>
              {group.items.map((item, index) => (
                <article
                  key={item.slug}
                  id={item.id}
                  className={`${styles.card} ${styles[item.tone]}`}
                  data-tilt=""
                  data-reveal=""
                  style={{ "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties}
                >
                  {item.tone === "image" && (
                    <span className={styles.cardImage} style={{ backgroundImage: `url(${item.photo})` }} aria-hidden="true" />
                  )}
                  <span className={styles.cardGlow} aria-hidden="true" />

                  <div className={styles.cardTop}>
                    <span className={styles.cardNumber}>{item.number}</span>
                    <span className={styles.cardMark} aria-hidden="true">»</span>
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.description}</p>

                  <ul className={styles.cardTags}>
                    {item.service.offerings.slice(0, 3).map((offering) => (
                      <li key={offering}>{offering}</li>
                    ))}
                  </ul>

                  <Link href="/iletisim" className={styles.cardLink}>
                    {content.quoteCta}
                    <span className={styles.srOnly}> — {item.title}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className={styles.cta} aria-labelledby="services-cta-title" data-reveal="">
          <h2 id="services-cta-title" className={styles.ctaTitle}>{content.cta.title}</h2>
          <p className={styles.ctaText}>{content.cta.description}</p>
          <Link href="/iletisim" className={styles.ctaButton}>
            {content.cta.button}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </>
  );
}
