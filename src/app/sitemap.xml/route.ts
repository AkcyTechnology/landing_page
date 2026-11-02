import { getAllServices } from "@/data/services";
import { getAllProjects } from "@/data/projects";
import { getAllPosts } from "@/data/blog";

// Statik export: site haritası build sırasında dosya olarak üretilir.
export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://akcy.com.tr";

function generateSiteMap() {
  const services = getAllServices();
  const projects = getAllProjects();

  const staticPages = [
    {
      url: `${baseUrl}/`,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      url: `${baseUrl}/hizmetler`,
      changefreq: "monthly",
      priority: "0.9",
    },
    {
      url: `${baseUrl}/projelerimiz`,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/hakkimizda`,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      url: `${baseUrl}/blog`,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/iletisim`,
      changefreq: "monthly",
      priority: "0.7",
    },
  ];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    changefreq: "monthly" as const,
    priority: "0.85",
  }));

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projelerimiz/${project.slug}`,
    changefreq: "monthly" as const,
    priority: "0.75",
  }));

  const blogPages = getAllPosts().map(post => ({ url: `${baseUrl}/blog/${post.slug}`, changefreq: "monthly", priority: "0.7" }));
  const legalPages = ["privacy", "kvkk", "cookies"].map(slug => ({ url: `${baseUrl}/${slug}`, changefreq: "yearly", priority: "0.3" }));
  const allPages = [...staticPages, ...servicePages, ...projectPages, ...blogPages, ...legalPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allPages
       .map(({ url, changefreq, priority }) => {
         return `
       <url>
           <loc>${escapeXml(url.endsWith("/") ? url : `${url}/`)}</loc>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

export async function GET() {
  const xml = generateSiteMap();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
