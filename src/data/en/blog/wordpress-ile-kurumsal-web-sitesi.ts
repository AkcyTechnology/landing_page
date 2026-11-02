import type { BlogPostTranslation } from "../blog";

/* Site içi bağlantılar Türkçe (kanonik) adresle yazılır; İngilizce sayfada otomatik çevrilir */
export const post: BlogPostTranslation = {
  title: "A Corporate Website with WordPress: A Guide to Setup, Security and Performance",
  seoTitle: "A Corporate Website with WordPress: Setup, Security and Speed | AKCY",
  metaDescription:
    "Is WordPress the right choice for a corporate website? A practical guide to choosing themes and plugins, security, speed optimisation, maintenance and the headless WordPress approach.",
  focusKeyword: "WordPress corporate website",
  secondaryKeywords: ["WordPress security", "WordPress speed optimisation", "choosing WordPress plugins", "headless WordPress", "WordPress maintenance"],
  excerpt:
    "When is WordPress the right choice for a corporate site? From choosing themes and plugins to security, speed optimisation and a maintenance plan, we explain how to build a solid WordPress site.",
  coverAlt: "Website editing screen on an open laptop on a desk",
  authorRole: "Web Team",
  content: [
    {
      type: "paragraph",
      text: "**WordPress** is an open-source content management system that powers a very large share of the world’s websites. There is a simple reason behind this popularity: content teams can add pages without technical knowledge, there is a large plugin ecosystem and it runs on almost every hosting provider.",
    },
    {
      type: "paragraph",
      text: "But the same flexibility can turn into a serious disadvantage when it is set up incorrectly. Sites slowed down by dozens of plugins, left with security holes because they weren’t updated, or stuck within the limits of a ready-made theme are the result of setup and maintenance choices, not of WordPress itself. In this article, we look at how to set up a corporate WordPress site correctly from the start.",
    },
    { type: "h2", text: "When is WordPress the right choice?" },
    {
      type: "paragraph",
      text: "There is no single right technology for every project. WordPress is a particularly strong option for projects where content is updated frequently, several people manage pages and posts, and budget and time need to be kept reasonable.",
    },
    {
      type: "table",
      headers: ["Scenario", "WordPress", "Custom software / Headless"],
      rows: [
        ["Corporate brochure site, blog", "Very suitable", "May not be needed"],
        ["Frequent content updates", "Very suitable", "Suitable with a CMS"],
        ["Complex user dashboard, business rules", "Limited", "More suitable"],
        ["Very high traffic and specific performance targets", "Possible with the right architecture", "More flexible"],
        ["Deep integration with existing systems", "Partly, via plugins/API", "More suitable"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "When deciding, asking “Who will manage the site, how often and for what purpose?” leads to a better outcome than asking “Which technology is better?”",
    },
    { type: "h2", text: "Choosing a theme: ready-made or custom?" },
    {
      type: "paragraph",
      text: "Ready-made themes give you a quick start, but most come with hundreds of features in order to appeal to as many users as possible. These unused features load unnecessary CSS and JavaScript, slow the site down and make it harder to make the design specific to your brand.",
    },
    {
      type: "paragraph",
      text: "For corporate projects, the more sustainable approach is to use a lightweight custom theme developed around the brand’s design system and containing only the components you need — or a **block-based (Gutenberg) theme**. That way, the content team builds pages with pre-designed blocks while design consistency is preserved.",
    },
    { type: "h2", text: "The golden rule for plugins: fewer, but the right ones" },
    {
      type: "paragraph",
      text: "Every plugin adds new code, a new update schedule and a potential security risk to the site. That is why the question isn’t how many plugins you have, but why each plugin is really needed.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Check the last update date and compatibility with your WordPress version",
        "Check the number of active installations and how quickly the support forum responds",
        "Don’t use more than one plugin that does the same job",
        "Don’t install a plugin for needs that a few lines of code can solve",
        "Don’t just deactivate unused plugins — remove them completely",
      ],
    },
    { type: "h2", text: "A basic checklist for WordPress security" },
    {
      type: "paragraph",
      text: "Most security problems on WordPress sites come not from the core but from outdated plugins, weak passwords and themes downloaded from untrusted sources.",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "Update the WordPress core, themes and plugins regularly",
        "Use strong passwords and two-factor authentication on admin accounts",
        "Give each user only the permissions they need",
        "Never use unlicensed or “nulled” themes and plugins",
        "Set up automatic backups stored off the server",
        "Limit login attempts and use a web application firewall (WAF)",
        "Run a current, supported PHP version on the server",
      ],
    },
    {
      type: "callout",
      variant: "note",
      text: "Being able to restore from a backup is as important as taking one. Verify your backup plan by restoring at least once in a test environment.",
    },
    { type: "h2", text: "WordPress speed optimisation" },
    {
      type: "paragraph",
      text: "A slow WordPress site is usually the result not of a single problem but of small problems adding up. Approaching speed optimisation in the following order gives the fastest results:",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "**Hosting:** Instead of cheap shared plans, choose infrastructure optimised for WordPress with enough resources",
        "**Caching:** Use page caching and, if possible, object caching (Redis, etc.)",
        "**Images:** Serve images in WebP or AVIF format, at the size they are displayed",
        "**Script load:** Remove unused plugin and theme scripts and defer non-critical ones",
        "**CDN:** Distribute static files from servers close to your visitors",
      ],
    },
    {
      type: "paragraph",
      text: "To measure the change after optimisation, you need to track Core Web Vitals metrics. We explain these metrics and their thresholds in detail in our [Core Web Vitals guide](/blog/core-web-vitals-rehberi).",
    },
    { type: "h2", text: "Headless WordPress: the best of both worlds" },
    {
      type: "paragraph",
      text: "In the headless approach, WordPress is used only as the content management panel, while the front end of the site is built separately with a modern framework such as Next.js. The content team keeps working in the familiar WordPress panel, while visitors get a much faster and more customised interface.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "The front end can be designed independently of theme and plugin constraints",
        "Performance improves significantly thanks to static generation and caching",
        "The attack surface shrinks because the admin panel isn’t exposed to visitors",
        "The same content can be used on the website, a mobile app and other channels",
      ],
    },
    {
      type: "paragraph",
      text: "That said, a headless architecture requires more development effort, and the front-end features of some plugins won’t work directly. That is why it is recommended not for every project, but for projects with high performance and customisation needs.",
    },
    { type: "h2", text: "After launch: a maintenance plan is essential" },
    {
      type: "paragraph",
      text: "The work doesn’t end when a WordPress site goes live. Regular updates, backup checks, security scans, speed measurements and broken-link checks keep the site healthy. Clarifying who is responsible for maintenance before the project starts prevents expensive problems later on.",
    },
    {
      type: "quote",
      text: "A good WordPress site is successful not on the day it launches, but when it is still fast and secure two years later.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "If you are thinking about building a new WordPress site, speeding up your existing site or moving to a headless setup, take a look at our guide on [what to know before commissioning a corporate website](/blog/kurumsal-web-sitesi-yaptirmadan-once) or [get in touch with us](/iletisim).",
    },
  ],
  faq: [
    {
      question: "Is WordPress secure enough for corporate sites?",
      answer:
        "Yes, when it is set up correctly and maintained regularly. Most security problems come from outdated plugins, weak passwords and unlicensed themes. Updates, backups, two-factor authentication and a WAF significantly reduce the risk.",
    },
    {
      question: "How many plugins should a WordPress site have?",
      answer:
        "There is no fixed number. What matters is that each plugin meets a real need and is up to date and trustworthy. Avoid multiple plugins that do the same job and plugins you don’t use.",
    },
    {
      question: "What is headless WordPress?",
      answer:
        "Headless WordPress is an architecture in which WordPress is used only as the content management panel, while the front end of the site is built with a separate technology such as Next.js. It provides higher performance and design flexibility.",
    },
    {
      question: "Why is my WordPress site slow?",
      answer:
        "The most common causes are inadequate hosting, missing caching, unoptimised images, heavy ready-made themes and scripts loaded by many plugins. To solve a speed problem, measure first and start with the biggest bottleneck.",
    },
  ],
};
