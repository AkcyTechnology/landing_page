import { getT } from "@/i18n/server";
import styles from "./ContactInfo.module.scss";

function getItems(t: { email: string; phone: string; location: string; locationValue: string }) {
  return [
  {
    label: t.email,
    value: "akcyglobal@gmail.com",
    href: "mailto:akcyglobal@gmail.com",
  },
  {
    label: t.phone,
    value: "+90 552 629 04 20",
    href: "tel:+905526290420",
  },
  {
    label: "Instagram",
    value: "@akcytechnology",
    href: "https://www.instagram.com/akcytechnology/",
  },
  {
    label: t.location,
    value: t.locationValue,
    href: undefined,
  },
];
}

export default function ContactInfo() {
  const t = getT().contact.info;
  const items = getItems(t);
  return (
    <aside className={styles.info}>
      <h2 className={styles.heading}>{t.heading}</h2>

      <p className={styles.intro}>
        {t.intro}
      </p>

      <div className={styles.contactGroup}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <span className={styles.label}>{item.label}</span>

            {item.href ? (
              <a
                href={item.href}
                className={styles.value}
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
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