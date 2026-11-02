import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import styles from "./ContactHero.module.scss";

export default function ContactHero() {
  const t = getT().contact.hero;
  const steps = t.steps;
  return <section className={styles.hero}><Container><div className={styles.layout}>
    <div className={styles.content}><span>{t.eyebrow}</span><h1>{t.titleLine1}<br />{t.titleLine2}</h1>
      <p>{t.description}</p>
      <a href="#proje-formu">{t.cta} ↗</a></div>
    <div className={styles.visual}>
      <span className={styles.visualLabel}>{t.processLabel}</span>
      <ol>{steps.map((step, index) => <li key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{step.title}</strong><p>{step.text}</p></div></li>)}</ol>
    </div>
  </div></Container></section>;
}
