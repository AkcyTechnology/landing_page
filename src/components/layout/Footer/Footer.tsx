"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { footerNavigation, services as footerServices } from "@/data/navigation";
import Container from "@/components/common/Container/Container";
import styles from "./Footer.module.scss";

function Icon({ name }: { name: "arrow" | "instagram" | "youtube" | "mail" | "phone" | "location" }) {
  const paths: Record<typeof name, ReactNode> = {
    arrow: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></>,
    youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="m7 3 3 5-2 2c1 3 3 5 6 6l2-2 5 3c0 3-2 5-5 4C8 19 5 16 3 8 2 5 4 3 7 3Z" />,
    location: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Footer() {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : delay, ease: [0.22, 0.8, 0.25, 1] as const },
  });
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.cta}>
          <motion.p className={styles.ctaEyebrow} {...reveal()}>BİRLİKTE DAHA FAZLASI MÜMKÜN</motion.p>
          <motion.h2 className={styles.ctaHeading} {...reveal(0.08)}>Fikirlerinizi<br /><span>Dijital Gerçekliğe</span><br />Dönüştürelim.</motion.h2>
          <motion.p className={styles.ctaDescription} {...reveal(0.16)}>Web, mobil, yapay zekâ ve otomasyon çözümleriyle işletmenizin dijital yolculuğunda yanınızdayız.</motion.p>
          <motion.div {...reveal(0.24)}><Link href="/iletisim" className={styles.ctaButton} data-magnetic>Bizimle İletişime Geçin <Icon name="arrow" /></Link></motion.div>
        </div>

        <div className={styles.grid}>
          <motion.div className={styles.brand} {...reveal()}>
            <Link href="/" aria-label="AKCY Technologies — Ana Sayfa" className={styles.logo}>
              <Image src="/images/brand/logo.svg" alt="AKCY Technologies" width={210} height={120} />
              <Image className={styles.logoMark} src="/images/brand/logo.svg" alt="" aria-hidden="true" width={210} height={120} />
            </Link>
            <p>Web, mobil, yapay zekâ ve otomasyon çözümleriyle dijital ürünler geliştiriyoruz.</p>
            <nav className={styles.social} aria-label="Sosyal medya">
              <a href="https://www.instagram.com/akcytechnology/" target="_blank" rel="noopener noreferrer" aria-label="AKCY Instagram"><Icon name="instagram" /></a>
              {youtubeUrl && <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="AKCY YouTube"><Icon name="youtube" /></a>}
            </nav>
          </motion.div>

          <motion.nav className={styles.column} aria-label="Footer navigasyonu" {...reveal(0.08)}>
            <h3 className={styles.columnLabel}>HIZLI LİNKLER</h3>
            <ul>{footerNavigation.map(item => <li key={item.href}><Link href={item.href}>{item.title}</Link></li>)}</ul>
          </motion.nav>

          <motion.nav className={styles.column} aria-label="Footer hizmetleri" {...reveal(0.16)}>
            <h3 className={styles.columnLabel}>HİZMETLER</h3>
            <ul>{footerServices.map(item => <li key={item.href}><Link href={item.href}>{item.title}</Link></li>)}</ul>
          </motion.nav>

          <motion.div className={`${styles.column} ${styles.contact}`} {...reveal(0.24)}>
            <h3 className={styles.columnLabel}>İLETİŞİM</h3>
            <address><ul>
              <li><Icon name="mail" /><a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a></li>
              <li><Icon name="phone" /><a href="tel:+905526290420">+90 552 629 04 20</a></li>
              <li><Icon name="location" /><span>İstanbul, Türkiye</span></li>
            </ul></address>
          </motion.div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} AKCY. Tüm hakları saklıdır.</span>
          <nav className={styles.legalNav} aria-label="Yasal linkler">
            <Link href="/privacy">Gizlilik Politikası</Link>
            <Link href="/kvkk">KVKK Aydınlatma Metni</Link>
            <Link href="/cookies">Çerez Politikası</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
