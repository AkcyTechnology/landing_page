import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import Link from "@/i18n/Link";
import Container from "@/components/common/Container/Container";
import DropWords, { dropWordCount } from "@/components/common/DropWords/DropWords";
import styles from "./PageHero.module.scss";

/*
  Menü sayfalarının ortak açılışı: tam genişlik fotoğraf, üstünde soldan
  sağa açılan petrol geçiş ve solda büyük başlık. Fotoğraf marka tonlarına
  yaklaşması için hafifçe soldurulur; açılışta çok yavaş yerine oturur.
  Metinler prop olarak gelir (getT çağrılmaz), böylece hem sunucu hem
  client bileşenlerinden kullanılabilir. Sayfaya özel butonlar, sayaçlar
  vb. children olarak başlığın altına yerleşir.
*/

interface PageHeroProps {
  id: string;
  eyebrow: string;
  titleLead: string;
  /** Başlığın turkuaz vurgulu ikinci satırı (isteğe bağlı) */
  titleAccent?: string;
  description: string;
  image: string;
  /** Fotoğrafın kadrajı (CSS object-position), ör. "60% 40%" */
  objectPosition?: string;
  /** Mobildeki kadraj (fotoğraf üstte görünür); verilmezse objectPosition kullanılır */
  mobilePosition?: string;
  breadcrumb?: { label: string; homeLabel: string; current: string };
  children?: ReactNode;
}

export default function PageHero({
  id,
  eyebrow,
  titleLead,
  titleAccent,
  description,
  image,
  objectPosition = "center",
  mobilePosition,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section
      className={styles.hero}
      aria-labelledby={id}
      style={{ "--pos": objectPosition, "--pos-mobile": mobilePosition ?? objectPosition } as CSSProperties}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.photo}
      />
      <span className={styles.shade} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.content}>
          {breadcrumb && (
            <nav className={styles.breadcrumb} aria-label={breadcrumb.label}>
              <ol>
                <li>
                  <Link href="/">{breadcrumb.homeLabel}</Link>
                </li>
                <li aria-current="page">{breadcrumb.current}</li>
              </ol>
            </nav>
          )}

          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id={id} className={styles.title}>
            <span>
              <DropWords text={titleLead} delay={0.35} />
            </span>
            {titleAccent && (
              <span className={styles.accent}>
                <DropWords text={titleAccent} start={dropWordCount(titleLead)} delay={0.35} />
              </span>
            )}
          </h1>
          <p className={styles.text}>{description}</p>

          {children && <div className={styles.extra}>{children}</div>}
        </div>
      </Container>
    </section>
  );
}
