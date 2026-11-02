import type { ProjectDef } from "../projects";

/* Projelerin İngilizce metinleri (anahtar: Türkçe slug) */
export type ProjectTranslation = Partial<
  Pick<
    ProjectDef,
    "title" | "sector" | "platform" | "summary" | "tagline" | "servicesUsed" | "problem" | "ourRole" | "approach" | "caseStudy" | "featureHighlight" | "outcomes"
  >
> & {
  coverAlt: string;
  gallery?: { alt: string; caption?: string }[];
};

export const projectCategoryLabelsEn: Record<string, string> = {
  web: "Web",
  mobil: "Mobile",
  "ui-ux": "UI/UX",
  ai: "AI",
  otomasyon: "Automation",
};

export const projectsEn: Record<string, ProjectTranslation> = {
  "cakiroglu-savunma": {
    sector: "Defence · Aerospace · Heavy Industry",
    tagline: "Bringing engineering precision to a digital experience.",
    summary:
      "A corporate web experience for an engineering and manufacturing brand working in defence, aerospace, energy and heavy industry.",
    coverAlt: "Çakıroğlu Savunma website homepage",
    gallery: [
      { alt: "Çakıroğlu Savunma industry solutions page", caption: "Industry Solutions" },
      { alt: "Technical capabilities page and engineering control panel", caption: "Technical Capabilities" },
      { alt: "Manufacturing and welding technologies page", caption: "Manufacturing Technologies" },
      { alt: "Mobile view of the Çakıroğlu Savunma homepage", caption: "Mobile Homepage" },
    ],
    servicesUsed: [
      "Strategy",
      "Information Architecture",
      "UI/UX Design",
      "Responsive Design",
      "Frontend Development",
      "Content Structuring",
    ],
    problem:
      "Turning the digital presence of an industrially and technically strong brand — its corporate identity and engineering capabilities — into a clearer, more contemporary digital experience.",
    ourRole: [
      "Strategy",
      "Information Architecture",
      "UI/UX Design",
      "Responsive Design",
      "Frontend Development",
      "Content Structuring",
    ],
    approach:
      "Products, services and technical capabilities were restructured so that technical content could be understood without overwhelming visitors. We built an interface on strong typography, technical visuals and a clean grid system that preserves the character of engineering and the defence industry.",
    caseStudy: [
      {
        title: "Solution",
        text: "Products, services and technical capabilities were restructured so that technical content could be understood without overwhelming visitors. Areas such as welding technologies, mechanical manufacturing, quality and NDT, and R&D / prototyping were clarified to create a simple information architecture.",
      },
      {
        title: "Development",
        text: "The responsive website was built on reusable components and a structured content architecture. We developed a performance-conscious frontend and a page structure ready for search engines.",
      },
      {
        title: "Design System",
        text: "Typography that keeps technical content readable, a clean grid and consistent page layouts bring the product, service and capability sections together in a shared visual language.",
      },
    ],
    featureHighlight: {
      title: "Brand-Based Product Catalogue",
      description:
        "For a company that offers both its own products and those of the brands it represents, products were grouped by brand. Visitors first choose a brand and then move to the relevant catalogue; catalogues still in preparation are clearly marked as “coming soon”.",
      steps: [
        { number: "01", title: "Choose a Brand" },
        { number: "02", title: "Browse the Product Catalogue" },
        { number: "03", title: "Request a Quote" },
      ],
      image: {
        src: "/images/projects/cakiroglu/urunler.jpg",
        alt: "Product catalogue page organised with brand cards",
      },
    },
    outcomes: [
      "A clearer service architecture",
      "More visible presentation of technical capabilities",
      "A consistent experience on mobile and desktop",
      "A stronger corporate brand perception",
    ],
  },
  "gokce-kombi": {
    sector: "Heating · Cooling · Construction",
    tagline: "A digital commerce experience built around better product discovery.",
    summary:
      "A product-focused digital commerce experience for a brand offering heating, cooling, construction and professional mechanical solutions.",
    coverAlt: "Gökçe Kombi website homepage",
    gallery: [
      { alt: "Gökçe Kombi homepage", caption: "Homepage" },
      { alt: "Product listing page screenshot", caption: "Product Listing" },
      { alt: "Product detail page screenshot", caption: "Product Detail" },
      { alt: "Mobile navigation screenshot", caption: "Mobile Navigation" },
    ],
    servicesUsed: [
      "UX Strategy",
      "Information Architecture",
      "UI Design",
      "Product Discovery",
      "Frontend Development",
      "Responsive Design",
    ],
    problem:
      "Making a large number of products, categories and technical details understandable for users, and creating a digital experience that helps visitors reach the right product for their needs faster.",
    ourRole: [
      "UX Strategy",
      "Information Architecture",
      "UI Design",
      "Product Discovery",
      "Frontend Development",
      "Responsive Design",
    ],
    approach:
      "Instead of a classic product-centred catalogue, we created an information architecture that guides users according to their needs. Heating, cooling and construction products were organised into separate user journeys. Category structures and the capacity calculation experience were designed together to support product discovery.",
    caseStudy: [
      {
        title: "Solution",
        text: "Instead of a classic product-centred catalogue, we created an information architecture that guides users according to their needs. Heating, cooling and construction products were organised into separate user journeys.",
      },
      {
        title: "Product Discovery",
        text: "Category structures and the capacity calculation experience were designed together to support product discovery. Users are guided to the right product in fewer steps.",
      },
      {
        title: "Development",
        text: "Product lists, product details and the capacity calculation flow were brought together in a single web experience. Mobile navigation helps product discovery continue across different screens.",
      },
    ],
    featureHighlight: {
      title: "Capacity Calculation",
      description:
        "The capacity calculation tool, built so visitors can find the right product without being overwhelmed by technical details, is highlighted as a separate visual feature in the case study.",
      steps: [
        { number: "01", title: "Choose a System" },
        { number: "02", title: "Enter Room Details" },
        { number: "03", title: "Get a Preliminary Capacity Recommendation" },
      ],
      image: {
        src: "/images/projects/gokce-kombi/kapasite-hesaplama.jpg",
        alt: "Capacity calculation tool screenshot",
      },
    },
    outcomes: [
      "Easier product discovery",
      "A simplified, complex product catalogue",
      "A guided experience for technical product selection",
      "A consistent e-commerce experience on desktop and mobile",
    ],
  },
  "concept-web-platformu": {
    title: "AKCY Concept — Web Platform",
    sector: "Technology",
    summary: "A performance-focused, scalable web platform concept for a corporate brand.",
    coverAlt: "Web platform interface on screen",
    servicesUsed: ["Web Development", "UI/UX Design"],
    problem:
      "The need for a flexible platform architecture that can offer a fast and consistent digital experience to a growing user base.",
    approach:
      "A concept study in which AKCY tested its own approach through a Next.js-based architecture and a consistent design system.",
  },
  "concept-mobil-uygulama": {
    title: "AKCY Concept — Mobile App",
    sector: "Retail",
    summary: "A cross-platform mobile app concept with a user-focused, simple interface.",
    coverAlt: "Mobile app interface",
    servicesUsed: ["Mobile App Development", "UI/UX Design"],
    problem: "Completing core actions in a simple flow, consistently across platforms.",
    approach: "A simple flow validated through user testing was designed and tested across platforms.",
  },
  "concept-tasarim-sistemi": {
    title: "AKCY Concept — Design System",
    summary: "A scalable design system and component library concept for a growing product team.",
    coverAlt: "Design system components",
    servicesUsed: ["UI/UX Design"],
    problem:
      "In a growing product team, colour, spacing and component decisions being debated again with every new screen.",
    approach:
      "Starting from the colour palette, type scale and spacing system, a reusable component library was designed as a natural result of these foundations.",
  },
  "concept-yapay-zeka-asistani": {
    title: "AKCY Concept — AI Assistant",
    sector: "Customer Service",
    summary: "An AI-supported assistant system concept that speeds up customer support processes.",
    coverAlt: "AI assistant interface",
    servicesUsed: ["AI Solutions"],
    problem: "The customer service team spending too much time manually answering frequently asked requests.",
    approach:
      "A flow was designed in which frequent requests are answered automatically by an AI-supported assistant, while complex requests are routed to the right person.",
  },
  "concept-otomasyon-paneli": {
    title: "AKCY Concept — Automation Dashboard",
    sector: "Logistics",
    summary: "An automation and reporting system concept that manages operational processes from a single dashboard.",
    coverAlt: "Automation dashboard screen",
    servicesUsed: ["Business Process Automation"],
    problem: "Operational data being scattered across different systems and impossible to track from one place.",
    approach:
      "A reporting structure was designed that combines operational data from different sources in a single dashboard and sends anomalies as notifications.",
  },
};
