import type { BlogPost } from "../blog";
import { post as p0 } from "./blog/core-web-vitals-rehberi";
import { post as p1 } from "./blog/kobiler-icin-yapay-zeka-yol-haritasi";
import { post as p2 } from "./blog/kurumsal-web-sitesi-yaptirmadan-once";
import { post as p3 } from "./blog/kurumsal-yapay-zeka-asistani-nasil-kurulur";
import { post as p4 } from "./blog/mobil-oncelikli-tasarim-rehberi";
import { post as p5 } from "./blog/n8n-ile-is-akisi-otomasyonu";
import { post as p6 } from "./blog/sirket-surec-otomasyonu-rehberi";
import { post as p7 } from "./blog/web-tipografisi-rehberi";
import { post as p8 } from "./blog/wordpress-ile-kurumsal-web-sitesi";
import { post as p9 } from "./blog/wordpress-site-bakimi-kontrol-listesi";
import { post as p10 } from "./blog/yapay-zeka-ile-belge-isleme";
import { post as p11 } from "./blog/yapay-zeka-ile-is-surecleri-otomasyonu";

/*
  Blog yazılarının İngilizce metinleri (anahtar: Türkçe slug).
  Tarih, kategori, kapak görseli ve okuma süresi Türkçe yazıyla ortaktır.
*/
export type BlogPostTranslation = Pick<BlogPost, "title" | "excerpt" | "content"> &
  Partial<Pick<BlogPost, "seoTitle" | "metaDescription" | "focusKeyword" | "secondaryKeywords" | "faq">> & {
    coverAlt: string;
    authorRole?: string;
  };

export const blogPostsEn: Record<string, BlogPostTranslation> = {
  "core-web-vitals-rehberi": p0,
  "kobiler-icin-yapay-zeka-yol-haritasi": p1,
  "kurumsal-web-sitesi-yaptirmadan-once": p2,
  "kurumsal-yapay-zeka-asistani-nasil-kurulur": p3,
  "mobil-oncelikli-tasarim-rehberi": p4,
  "n8n-ile-is-akisi-otomasyonu": p5,
  "sirket-surec-otomasyonu-rehberi": p6,
  "web-tipografisi-rehberi": p7,
  "wordpress-ile-kurumsal-web-sitesi": p8,
  "wordpress-site-bakimi-kontrol-listesi": p9,
  "yapay-zeka-ile-belge-isleme": p10,
  "yapay-zeka-ile-is-surecleri-otomasyonu": p11,
};
