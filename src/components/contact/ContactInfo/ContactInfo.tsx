import styles from "./ContactInfo.module.scss";

const items = [
  {
    label: "E-posta",
    value: "akcyglobal@gmail.com",
    href: "mailto:akcyglobal@gmail.com",
  },
  {
    label: "Telefon",
    value: "+90 552 629 04 20",
    href: "tel:+905526290420",
  },
  {
    label: "Konum",
    value: "İstanbul, Türkiye",
    href: undefined,
  },
];

export default function ContactInfo() {
  return (
    <aside className={styles.info}>
      <h2 className={styles.heading}>Birlikte başlayalım.</h2>

      <p className={styles.intro}>
        Yeni projeler ve iş birlikleri için bize ulaşabilirsiniz. Mesajınıza
        en kısa sürede dönüş yapıyoruz.
      </p>

      <div className={styles.contactGroup}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <span className={styles.label}>{item.label}</span>

            {item.href ? (
              <a href={item.href} className={styles.value}>
                {item.value}
                <span aria-hidden="true">↗</span>
              </a>

            ) : (
              <span className={styles.value}>{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}