import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import type { ProjectDef } from "@/data/projects";

import styles from "./ProjectResults.module.scss";

/*
  Proje sonuçları: büyük rakamlarla ölçülebilir etkiler ve müşteri yorumu.
  İkisi de isteğe bağlıdır; veri girilmemişse bölüm hiç render edilmez.
*/
export default function ProjectResults({ metrics, testimonial }: Pick<ProjectDef, "metrics" | "testimonial">) {
  if (!metrics?.length && !testimonial) return null;
  const t = getT().projects;

  return (
    <section className={styles.results} aria-label={t.resultsLabel}>
      <Container>
        {metrics && metrics.length > 0 && (
          <>
            <p className={styles.eyebrow}>{t.resultsLabel}</p>
            <dl className={styles.metrics}>
              {metrics.map((metric) => (
                <div key={metric.label} className={styles.metric}>
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        {testimonial && (
          <figure className={styles.quote}>
            <span className={styles.mark} aria-hidden="true">“</span>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              <strong>{testimonial.author}</strong>
              {testimonial.role && <span>{testimonial.role}</span>}
            </figcaption>
          </figure>
        )}
      </Container>
    </section>
  );
}
