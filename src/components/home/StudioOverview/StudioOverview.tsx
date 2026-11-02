import Link from "@/i18n/Link";
import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import styles from "./StudioOverview.module.scss";

export function WorkProcess() {
  const t = getT().home.process;
  return <section className={styles.process} id="calisma-sureci" aria-labelledby="process-heading"><Container>
    <div className={styles.processHeader}>
      <div><span className={styles.label}>{t.label}</span><h2 id="process-heading">{t.headingStart}<br /><span>{t.headingAccent}</span></h2></div>
      <p>{t.introLine1}<br />{t.introLine2}</p>
      <span className={styles.processStamp}>{t.stampLine1}<br />{t.stampLine2} <b aria-hidden="true">↘</b></span>
    </div>
    <ol className={styles.roadmap}>{t.steps.map((step, index) => <li key={step.title} className={styles.step}>
      <div className={styles.stepTop}><span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span><span className={styles.stepNode} aria-hidden="true" /></div>
      <span className={styles.stepCaption}>{step.caption}</span>
      <h3>{step.title}</h3><p>{step.description}</p>
      <div className={styles.outcome}><span>{t.outcomeLabel}</span>{step.outcome}</div>
    </li>)}</ol>
    <div className={styles.processFootnote}><span className={styles.statusDot} aria-hidden="true" />{t.footnote}<span className={styles.processFootnoteEnd}>{t.footnoteEnd}</span></div>
  </Container></section>;
}

export function CapabilitiesOverview() {
  const t = getT().home.capabilities;
  return <section className={styles.capabilities} id="yetkinlikler" aria-labelledby="capabilities-heading"><Container>
    <div className={styles.capabilityHeader}>
      <span className={styles.label}>{t.label}</span>
      <span className={styles.sideNote}>{t.sideNote}</span>
    </div>
    <div className={styles.capabilityLayout}>
      <div className={styles.capabilityIntro}><h2 id="capabilities-heading">{t.headingLine1}<br /><span>{t.headingAccent}</span><br />{t.headingLine3}<br />{t.headingLine4}</h2>
        <div className={styles.signature} aria-hidden="true"><span>AKCY</span><span>{t.signature}</span></div>
      </div>
      <div className={styles.capabilityBody}>
        <div className={styles.approaches}>
          {t.approaches.map((approach) => <div key={approach.index}><span className={styles.approachIndex}>{approach.index}</span><h3>{approach.title}</h3><p>{approach.text}</p></div>)}
        </div>
        <ul className={styles.skills}>{t.skills.map((skill,index) => <li key={skill}><span>{String(index+1).padStart(2,"0")}</span>{skill}</li>)}</ul>
      </div>
    </div>
    <div className={styles.sectors}>
      <div><h3>{t.sectorsTitle}</h3><p>{t.sectorsLine1}<br />{t.sectorsLine2}</p></div>
      <ul>{t.sectors.map(item=><li key={item}>{item}</li>)}</ul>
      <Link className={styles.link} href="/hakkimizda">{t.aboutLink} <span aria-hidden="true">↗</span></Link>
    </div>
  </Container></section>;
}
