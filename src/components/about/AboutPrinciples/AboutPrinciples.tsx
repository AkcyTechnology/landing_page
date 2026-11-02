import Container from "@/components/common/Container/Container";
import type { AboutContent } from "@/content/about";

import styles from "./AboutPrinciples.module.scss";

export default function AboutPrinciples({ content }: { content: AboutContent["principles"] }) {
  return (
    <section className={styles.section} aria-labelledby="about-principles-title">
      <Container>
        <div className={styles.layout}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2 id="about-principles-title" className={styles.title}>
              {content.title}
            </h2>
          </div>

          <dl className={styles.list}>
            {content.items.map((item) => (
              <div key={item.title} className={styles.item}>
                <dt className={styles.itemTitle}>{item.title}</dt>
                <dd className={styles.itemText}>{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
