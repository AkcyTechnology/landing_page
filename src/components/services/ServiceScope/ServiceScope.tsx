import { getT } from "@/i18n/server";
import Container from "@/components/common/Container/Container";
import type { ServiceDef } from "@/data/services";
import styles from "./ServiceScope.module.scss";

export default function ServiceScope({ service }: { service: ServiceDef }) {
  const scopes: Record<string, { title: string; items: string[]; note: string; flow?: string[] }> = getT().services.scopes;
  const scope = scopes[service.slug];
  if (!scope) return null;
  return <section className={styles.section}><Container>
    <h2>{scope.title}</h2>
    {scope.items.length > 0 && <ul className={styles.grid}>{scope.items.map(item => <li key={item}>{item}</li>)}</ul>}
    {scope.flow && <ol className={styles.flow}>{scope.flow.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}{i < scope.flow!.length - 1 && <b aria-hidden="true">→</b>}</li>)}</ol>}
    <p>{scope.note}</p>
  </Container></section>;
}
