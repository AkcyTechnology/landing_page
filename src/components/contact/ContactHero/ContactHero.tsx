import Container from "@/components/common/Container/Container";
import styles from "./ContactHero.module.scss";

const steps = [
  { title: "Formu doldurun", text: "İhtiyacınızı ve varsa zaman planınızı kısaca paylaşın." },
  { title: "Ön görüşme yapalım", text: "Hedefleri, kapsamı ve öncelikleri birlikte netleştirelim." },
  { title: "Yol haritası ve teklif", text: "Kapsama uygun bir plan ve teklifle size dönelim." },
];

export default function ContactHero() {
  return <section className={styles.hero}><Container><div className={styles.layout}>
    <div className={styles.content}><span>İLETİŞİM</span><h1>Bir fikriniz mi var?<br />Konuşalım.</h1>
      <p>Yeni bir ürün, daha iyi bir deneyim veya daha akıllı bir iş akışı. İhtiyacınızı birlikte netleştirelim.</p>
      <a href="#proje-formu">Projenizi anlatın ↗</a></div>
    <div className={styles.visual}>
      <span className={styles.visualLabel}>SÜREÇ NASIL İLERLER?</span>
      <ol>{steps.map((step, index) => <li key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{step.title}</strong><p>{step.text}</p></div></li>)}</ol>
    </div>
  </div></Container></section>;
}
