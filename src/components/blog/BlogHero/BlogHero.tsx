import { getT } from "@/i18n/server";
import PageHero from "@/components/common/PageHero/PageHero";
import SearchTrigger from "@/components/common/SiteSearch/SearchTrigger";
import RollingNumber from "@/components/common/RollingNumber/RollingNumber";
import styles from "./BlogHero.module.scss";

/*
  Blog açılışı: ortak fotoğraflı hero. Altında site içi aramayı açan kutu
  ve yazı / konu sayısı yer alır.
*/
export default function BlogHero({ stats }: { stats: { posts: number; topics: number } }) {
  const t = getT().blog.hero;

  return (
    <PageHero
      id="blog-hero-title"
      eyebrow={t.eyebrow}
      titleLead={t.headingLead}
      titleAccent={t.headingAccent}
      description={t.description}
      image="/images/solutions/business.jpg"
      objectPosition="70% 50%"
    >
      <div className={styles.actions}>
        <SearchTrigger className={styles.searchButton}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          {t.search}
        </SearchTrigger>
        <p className={styles.stats}>
          <strong><RollingNumber value={stats.posts} /></strong> {t.statPosts}
          <span aria-hidden="true" />
          <strong><RollingNumber value={stats.topics} /></strong> {t.statTopics}
        </p>
      </div>
    </PageHero>
  );
}
