import type { ServiceDef } from "../services";

/* Hizmetlerin İngilizce metinleri (anahtar: Türkçe slug / id) */
export type ServiceTranslation = Pick<
  ServiceDef,
  "title" | "shortDescription" | "heroDescription" | "overview" | "offerings" | "process"
> & { imageAlt: string };

export const servicesEn: Record<string, ServiceTranslation> = {
  "yapay-zeka": {
    title: "AI Solutions",
    shortDescription: "Smart AI systems and applications built around your business processes.",
    heroDescription: "We turn AI from a showcase into an operational advantage.",
    overview:
      "We analyse your business processes, then design and integrate AI-supported systems that deliver real, measurable benefits.",
    offerings: [
      "Document and Data Processing",
      "AI Assistants",
      "Sales and Quotation Automation",
      "Reporting and Data Analysis",
      "CRM/ERP Integrations",
      "AI-Powered Search",
      "AI Workflow Systems",
    ],
    process: [
      { number: "01", title: "Discovery", description: "We analyse processes and data sources." },
      { number: "02", title: "Strategy", description: "We identify practical AI use cases." },
      { number: "03", title: "Design", description: "We plan the model and integration architecture." },
      { number: "04", title: "Development", description: "We build and integrate the system." },
      { number: "05", title: "Testing", description: "We measure accuracy and performance." },
      { number: "06", title: "Launch", description: "We go live and monitor the results." },
    ],
    imageAlt: "Document, analysis, human review and output workflow",
  },
  "dijital-otomasyon": {
    title: "Business Process Automation",
    shortDescription: "Digital workflows that reduce repetitive operations and speed up processes.",
    heroDescription: "We free your team from repetitive tasks so they can focus on the work that matters.",
    overview:
      "We analyse your operational processes and build automation systems that reduce manual workload and keep errors to a minimum.",
    offerings: [
      "Process Analysis",
      "Workflow Automation",
      "System Integrations",
      "Dashboards & Reporting",
      "Notification Systems",
    ],
    process: [
      { number: "01", title: "Discovery", description: "We map your current processes." },
      { number: "02", title: "Strategy", description: "We prioritise automation opportunities." },
      { number: "03", title: "Design", description: "We design the workflow architecture." },
      { number: "04", title: "Development", description: "We build the integrations." },
      { number: "05", title: "Testing", description: "We test the process end to end." },
      { number: "06", title: "Launch", description: "We put the system into service and monitor it." },
    ],
    imageAlt: "Form, CRM, quotation and reporting workflow",
  },
  "ai-icerik-uretimi": {
    title: "AI Content Production",
    shortDescription: "AI-supported visual and digital content production systems for brands.",
    heroDescription: "We help you produce content at scale while keeping your brand voice intact.",
    overview:
      "We adapt AI-supported content tools to your brand identity and set up consistent, scalable content production processes.",
    offerings: [
      "E-Commerce Product Visuals",
      "Apparel/Model Variations",
      "Campaign Creatives",
      "Bulk Product Content",
      "Content Workflow Automation",
      "Visual Variation Generation",
    ],
    process: [
      { number: "01", title: "Discovery", description: "We analyse your brand voice and content needs." },
      { number: "02", title: "Strategy", description: "We plan the content production flow." },
      { number: "03", title: "Setup", description: "We set up the tools and template system." },
      { number: "04", title: "Production", description: "We start the content production process." },
      { number: "05", title: "Testing", description: "We verify quality and consistency." },
      { number: "06", title: "Launch", description: "We hand the process over to your team." },
    ],
    imageAlt: "Original product, campaign and publishing workflow",
  },
  "web-gelistirme": {
    title: "Web Development",
    shortDescription: "Modern, fast, responsive and scalable websites and web applications.",
    heroDescription: "We build digital products that work, not just ones that look good.",
    overview:
      "Your web presence is your brand’s first point of contact online. From corporate websites to complex web applications, we build solutions that put performance and user experience first.",
    offerings: [
      "Corporate Websites",
      "SaaS and Dashboards",
      "E-Commerce and Portals",
      "Web Applications",
      "Next.js Development",
      "Web Performance Optimisation",
      "Custom Web Software",
    ],
    process: [
      { number: "01", title: "Discovery", description: "We analyse your needs and target audience." },
      { number: "02", title: "Strategy", description: "We choose the right technology and content approach." },
      { number: "03", title: "Design", description: "We design interfaces that match your brand." },
      { number: "04", title: "Development", description: "We write clean, maintainable code." },
      { number: "05", title: "Testing", description: "We run performance and compatibility tests." },
      { number: "06", title: "Launch", description: "We take the site live and keep monitoring it." },
    ],
    imageAlt: "Çakıroğlu Savunma corporate website",
  },
  "mobil-uygulamalar": {
    title: "Mobile App Development",
    shortDescription: "User-focused mobile products for iOS and Android.",
    heroDescription: "We design mobile products that live in users’ pockets and deliver real value.",
    overview:
      "In mobile app development, we consider performance, usability and platform compatibility together — and manage the whole journey from idea to app store.",
    offerings: [
      "iOS Development",
      "Android Development",
      "React Native Development",
      "Backend/API Integration",
      "Push Notifications",
      "App Store & Google Play",
      "Maintenance and Updates",
    ],
    process: [
      { number: "01", title: "Discovery", description: "We define user needs and the platform." },
      { number: "02", title: "Strategy", description: "We plan the app architecture and flow." },
      { number: "03", title: "Design", description: "We design intuitive mobile interfaces." },
      { number: "04", title: "Development", description: "We build native or cross-platform apps." },
      { number: "05", title: "Testing", description: "We test across devices and scenarios." },
      { number: "06", title: "Launch", description: "We publish to the stores and follow the process." },
    ],
    imageAlt: "Design, development, testing and app store release workflow",
  },
  "ui-ux-tasarim": {
    title: "UI/UX Design",
    shortDescription: "Clear, effective digital product experiences centred on the user.",
    heroDescription: "We design interfaces people can use without having to stop and think.",
    overview:
      "Good design works invisibly. Through research, wireframing and prototyping, we build experiences around user behaviour that produce measurable results.",
    offerings: [
      "Product Design",
      "User Research",
      "Wireframing & Prototyping",
      "Design Systems",
      "Usability Testing",
      "Design Management",
    ],
    process: [
      { number: "01", title: "Discovery", description: "We research user behaviour and the problem." },
      { number: "02", title: "Strategy", description: "We plan the information architecture and flows." },
      { number: "03", title: "Design", description: "We move from wireframes to high-fidelity design." },
      { number: "04", title: "Prototyping", description: "We build interactive prototypes." },
      { number: "05", title: "Testing", description: "We validate with usability tests." },
      { number: "06", title: "Handover", description: "We hand the design system over to the development team." },
    ],
    imageAlt: "User flow, prototype, interface design and design system workflow",
  },
  "kurumsal-yazilim": {
    title: "Custom Business Software",
    shortDescription: "Management systems built for your business where off-the-shelf software falls short.",
    heroDescription: "Instead of bending your workflow to fit software, we build software that fits your workflow.",
    overview:
      "In many companies, processes such as quotations, orders, service, stock or project tracking run across Excel files, emails and disconnected tools. We build custom software that brings these processes together in one place, works with your roles and approval steps, and integrates with your existing systems.",
    offerings: [
      "Quotation and Order Management",
      "CRM and Customer Tracking",
      "ERP Modules",
      "Service and Field Operations",
      "Stock and Supply Tracking",
      "Role and Permission Management",
      "Reporting Dashboards",
    ],
    process: [
      { number: "01", title: "Discovery", description: "We analyse the current process, user roles and bottlenecks." },
      { number: "02", title: "Scope", description: "We prioritise the modules needed in the first version." },
      { number: "03", title: "Design", description: "We validate screens and workflows together with users." },
      { number: "04", title: "Development", description: "We build a modular, testable and extensible foundation." },
      { number: "05", title: "Migration", description: "We migrate existing data and help your team adopt the system." },
      { number: "06", title: "Support", description: "After launch, we monitor the system and grow it with new needs." },
    ],
    imageAlt: "Request, approval, operations and reporting workflow",
  },
};
