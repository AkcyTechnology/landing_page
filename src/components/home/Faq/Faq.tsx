import Link from "next/link";

import Container from "@/components/common/Container/Container";
import { StructuredData } from "@/lib/StructuredData";

import styles from "./Faq.module.scss";

const faqs = [
  {
    question: "Bir proje ne kadar sürer?",
    answer:
      "Süre; kapsama, içeriğin hazır olup olmadığına ve entegrasyon ihtiyaçlarına göre değişir. Keşif görüşmesinden sonra aşamaları ve teslim tarihlerini içeren net bir takvim paylaşıyoruz.",
  },
  {
    question: "Fiyatlandırma nasıl belirleniyor?",
    answer:
      "Her proje farklı olduğu için sabit paketler yerine kapsama göre teklif hazırlıyoruz. İletişim formunda tahmini bütçe aralığınızı paylaşmanız, size en uygun kapsamı önermemizi kolaylaştırır.",
  },
  {
    question: "Kaynak kodlar, alan adı ve hesaplar kime ait olur?",
    answer:
      "Kaynak kod, tasarım dosyaları ve hesapların sahipliği proje başında sözleşmede açıkça tanımlanır. Alan adının şirketiniz adına kayıtlı olmasını ve yönetim erişiminin sizde bulunmasını öneriyoruz.",
  },
  {
    question: "Yayından sonra destek veriyor musunuz?",
    answer:
      "Evet. Yayından sonraki bakım, güncelleme ve yeni geliştirme ihtiyaçları için kapsamını birlikte belirlediğimiz destek planları sunuyoruz.",
  },
  {
    question: "Mevcut sistemlerimizle entegre çalışabilir mi?",
    answer:
      "Çoğu durumda evet. CRM, ERP, muhasebe, ödeme ve e-ticaret sistemleriyle API üzerinden entegrasyon kuruyor; mevcut altyapınızı değiştirmek yerine üzerine çalışan çözümler geliştiriyoruz.",
  },
  {
    question: "Küçük işletmelerle de çalışıyor musunuz?",
    answer:
      "Evet. Küçük ekiplerden kurumsal yapılara kadar farklı ölçekte işletmelerle çalışıyoruz. Büyük bir projeyle başlamak yerine en çok fayda sağlayacak tek bir adımla başlamak da mümkün.",
  },
];

export default function Faq() {
  return (
    <section className={styles.section} id="sss" aria-labelledby="faq-heading">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.label}>06 / SIK SORULAN SORULAR</span>
            <h2 id="faq-heading">Aklınızdaki <span>sorular.</span></h2>
            <p>Burada cevabını bulamadığınız bir soru varsa bize doğrudan yazabilirsiniz.</p>
            <Link href="/iletisim" className={styles.link}>
              Soru sorun <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.list}>
            {faqs.map((item, index) => (
              <details key={item.question} className={styles.item} name="faq" open={index === 0}>
                <summary>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
