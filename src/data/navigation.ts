import { services as serviceDefs } from "./services";

export const services = serviceDefs.map((service) => ({
  number: service.number,
  title: service.title,
  description: service.shortDescription,
  href: `/hizmetler/${service.slug}`,
}));

export const navigation = [
  {
    title: "Ana Sayfa",
    href: "/",
  },
  {
    title: "Hizmetler",
    href: "/hizmetler",
    children: services,
  },
  {
    title: "Projelerimiz",
    href: "/projelerimiz",
  },
  {
    title: "Hakkımızda",
    href: "/hakkimizda",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "İletişim",
    href: "/iletisim",
  },
];

export const footerNavigation = [
  { title: "Ana Sayfa", href: "/" },
  { title: "Hakkımızda", href: "/hakkimizda" },
  { title: "Hizmetler", href: "/hizmetler" },
  { title: "Projelerimiz", href: "/projelerimiz" },
  { title: "Blog", href: "/blog" },
  { title: "İletişim", href: "/iletisim" },
];
