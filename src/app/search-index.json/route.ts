import { getAllPosts } from "@/data/blog";
import { getAllProjects } from "@/data/projects";
import { projectsPage } from "@/content/projects-page";
import { getAllServices } from "@/data/services";
import { locales, localizeSlug, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategoryLabel } from "@/components/blog/categoryMeta";
import type { SearchEntry } from "@/components/common/SiteSearch/types";

/*
  Site içi arama dizini (⌘K). Build sırasında statik bir JSON dosyası olarak
  üretilir; arama penceresi ilk açıldığında bir kez indirilir. Adresler Türkçe
  (kanonik) yazılır, istemci seçili dile çevirir.
*/
export const dynamic = "force-static";

function entries(locale: Locale): SearchEntry[] {
  const t = getDictionary(locale);

  const pages: SearchEntry[] = [
    { type: "page", title: t.nav.services, text: t.pages.services.description, href: "/hizmetler" },
    { type: "page", title: t.nav.projects, text: t.pages.projects.description, href: "/projelerimiz" },
    { type: "page", title: t.nav.about, text: t.about.hero.description, href: "/hakkimizda" },
    { type: "page", title: t.nav.blog, text: t.pages.blog.description, href: "/blog" },
    { type: "page", title: t.nav.contact, text: t.pages.contact.description, href: "/iletisim" },
    { type: "page", title: t.quoteWizard.pageTitle, text: t.quoteWizard.pageDescription, href: "/teklif" },
  ];

  const services: SearchEntry[] = getAllServices(locale).map((service) => ({
    type: "service",
    title: service.title,
    text: service.shortDescription,
    keywords: [...service.offerings, ...service.technologies].join(" "),
    href: `/hizmetler#${localizeSlug("hizmetler", service.slug, locale)}`,
  }));

  const projects: SearchEntry[] = getAllProjects(locale)
    .filter((project) => project.kind === "client")
    .map((project) => ({
      type: "project",
      title: project.title,
      text: project.summary,
      keywords: [project.sector, project.platform, ...project.servicesUsed].filter(Boolean).join(" "),
      href: `/projelerimiz/${project.slug}`,
    }));

  /*
    Projelerimiz vitrinindeki uygulamalar (Calm Do, Guess Player…): ayrıntı
    sayfası olmayanlar sayfadaki kendi bölümlerine (#proje-…) bağlanır.
    Ayrıntı sayfası olanlar yukarıda zaten listelendiği için atlanır.
  */
  const showcase: SearchEntry[] = projectsPage[locale].projects
    .filter((project) => !project.detailHref)
    .map((project) => ({
      type: "project",
      title: project.name,
      text: `${project.label} — ${project.description}`,
      keywords: [project.title, ...(project.scope ?? [])].join(" "),
      href: `/projelerimiz#proje-${project.id}`,
    }));

  const posts: SearchEntry[] = getAllPosts(locale).map((post) => ({
    type: "post",
    title: post.title,
    text: post.excerpt,
    keywords: getCategoryLabel(post.category, locale),
    href: `/blog/${post.slug}`,
  }));

  return [...pages, ...services, ...projects, ...showcase, ...posts];
}

export function GET() {
  const index = Object.fromEntries(locales.map((locale) => [locale, entries(locale)]));
  return Response.json(index);
}
