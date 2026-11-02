import type { BlogPostTranslation } from "../blog";

export const post: BlogPostTranslation = {
  title: "What Are Core Web Vitals? A Guide to Improving LCP, INP and CLS",
  seoTitle: "What Are Core Web Vitals? A Guide to Improving LCP, INP and CLS | AKCY",
  metaDescription:
    "What are Core Web Vitals and how are they measured? Learn the thresholds for LCP, INP and CLS and practical ways to improve each one on your website.",
  focusKeyword: "Core Web Vitals",
  secondaryKeywords: ["what is LCP", "what is INP", "what is CLS", "website speed", "page performance", "PageSpeed Insights"],
  excerpt:
    "What do LCP, INP and CLS — the three metrics Google uses to measure page experience — actually mean? We explain the thresholds, how to measure them and practical ways to improve each one.",
  coverAlt: "Illustration of a performance dashboard showing LCP, INP and CLS metrics",
  authorRole: "Web Team",
  content: [
    {
      type: "paragraph",
      text: "For years, we judged whether a website was fast with a single question: how many seconds does the page take to load? But from a user’s point of view, feeling “fast” is not a single number. How long does it take for the main content to appear? How quickly does the page respond when you click a button? Does the content suddenly jump while you are reading?",
    },
    {
      type: "paragraph",
      text: "**Core Web Vitals** is the set of metrics Google defined to measure these three experiences. Google considers these metrics as part of its page experience signals, but what really matters is that good scores translate directly into a better user experience.",
    },
    { type: "h2", text: "The three core metrics and their thresholds" },
    {
      type: "paragraph",
      text: "Core Web Vitals consists of three metrics. Each has thresholds defined as “good”, “needs improvement” and “poor”. For a page to be considered good, these values must be met for 75% of real visits (the 75th percentile).",
    },
    {
      type: "table",
      headers: ["Metric", "What does it measure?", "Good", "Poor"],
      rows: [
        ["LCP (Largest Contentful Paint)", "How fast the main content loads", "≤ 2.5 s", "> 4 s"],
        ["INP (Interaction to Next Paint)", "How fast the page responds to interactions", "≤ 200 ms", "> 500 ms"],
        ["CLS (Cumulative Layout Shift)", "Visual stability", "≤ 0.1", "> 0.25"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "In March 2024, INP replaced FID (First Input Delay) as the interaction metric. While FID only measured the delay of the first interaction, INP assesses the overall responsiveness of interactions on the page.",
    },
    { type: "h2", text: "Field data vs. lab data" },
    {
      type: "paragraph",
      text: "There are two types of data in performance measurement. **Field data** is collected when real users visit your site on real devices and connections. Google’s Chrome User Experience Report (CrUX) provides this data, and the Core Web Vitals report in Search Console is based on it.",
    },
    {
      type: "paragraph",
      text: "**Lab data** comes from tools such as Lighthouse simulating a single page load in a controlled environment. Lab data is ideal for finding problems and testing fixes, but it is field data that shows the real state of your site. PageSpeed Insights shows both on the same page, which makes it a good starting point.",
    },
    { type: "h2", text: "LCP: How fast does the main content appear?" },
    {
      type: "paragraph",
      text: "LCP measures the moment the largest content element in the visible area of the page (usually a hero image, a large heading or a cover photo) appears on screen. It is the metric closest to the user’s feeling that “the page has loaded”.",
    },
    { type: "h3", text: "How to improve LCP" },
    {
      type: "list",
      style: "unordered",
      items: [
        "**Don’t lazy-load the LCP image:** loading=\"lazy\" is for images below the fold. Give the hero image fetchpriority=\"high\" instead to tell the browser it is a priority.",
        "**Serve images at the right size and in modern formats:** AVIF or WebP formats and choosing the right size for each device with srcset significantly reduce file size.",
        "**Reduce server response time:** Caching, using a CDN and pre-rendering pages that can be generated statically help the first byte arrive faster.",
        "**Reduce render-blocking resources:** Non-critical CSS and JavaScript files should not delay rendering the main content.",
      ],
    },
    {
      type: "code",
      language: "html",
      filename: "hero.html",
      code: `<!-- Main image above the fold: high priority, no lazy loading -->
<img
  src="/hero-1600.avif"
  srcset="/hero-800.avif 800w, /hero-1600.avif 1600w"
  sizes="100vw"
  width="1600" height="900"
  fetchpriority="high"
  alt="Product interface">`,
    },
    { type: "h2", text: "INP: How quickly does the page respond to clicks?" },
    {
      type: "paragraph",
      text: "INP measures how long it takes for the screen to update after interactions such as clicking a button, opening a menu or typing in a form field. A poor INP is the feeling of “I pressed the button but nothing happened”, and it makes users press the same button again and again.",
    },
    {
      type: "paragraph",
      text: "Almost all INP problems come from JavaScript that keeps the main thread busy for a long time. While the browser is running a task, it cannot respond to the user’s interaction.",
    },
    { type: "h3", text: "How to improve INP" },
    {
      type: "list",
      style: "unordered",
      items: [
        "**Break up long tasks:** Tasks that take longer than 50 milliseconds are considered “long tasks”. Split heavy work into pieces and give the browser room to breathe in between.",
        "**Reduce unnecessary JavaScript:** Unused libraries and code that isn’t needed on the first load should be loaded only when needed.",
        "**Audit third-party scripts:** Chat tools, ads and tracking code are among the biggest sources of main-thread work.",
        "**Keep event handlers light:** At the moment of a click, do only the work needed for visual feedback; defer heavy calculations.",
      ],
    },
    { type: "h2", text: "CLS: Does the page shift while you read?" },
    {
      type: "paragraph",
      text: "CLS measures how much content moves unexpectedly while the page is loading or being used. An ad suddenly appearing at the top just as you are about to tap a news story — so your finger lands on another link — is the best-known example of poor CLS.",
    },
    { type: "h3", text: "How to improve CLS" },
    {
      type: "list",
      style: "unordered",
      items: [
        "**Give images and videos dimensions:** width and height attributes or CSS aspect-ratio let the browser reserve the right space before loading.",
        "**Reserve space for content that loads later:** Ad slots, embeds and cookie notices should not push existing content around.",
        "**Manage the font swap:** Bringing the fallback font’s metrics closer to the web font reduces the shift when the font loads.",
        "**Use transform for animations:** Animating properties such as top, left or height forces the layout to be recalculated; transform and opacity do not affect layout.",
      ],
    },
    { type: "h2", text: "Which tools should you use to measure?" },
    {
      type: "list",
      style: "unordered",
      items: [
        "**PageSpeed Insights:** Both field and lab data for a single URL.",
        "**Google Search Console:** The Core Web Vitals report, showing which groups of pages have problems across the site.",
        "**Chrome DevTools:** The Performance panel lets you examine long tasks, layout shifts and the LCP element in detail.",
        "**Lighthouse:** For regular lab testing during development.",
      ],
    },
    {
      type: "quote",
      text: "Performance is not a one-off job. Every new image, script and feature can change the scores again.",
    },
    { type: "h2", text: "Making performance part of the process" },
    {
      type: "paragraph",
      text: "Many sites are fast on launch day; problems start with campaign images, tracking code and new sections added over time. That is why performance needs to be part of the development process rather than a one-time optimisation: setting size and format rules for images, measuring the impact of a script before adding it and following the Search Console report regularly.",
    },
    { type: "divider" },
    { type: "h2", text: "Conclusion" },
    {
      type: "paragraph",
      text: "Core Web Vitals may look like a technical scorecard, but it really answers three simple user questions: Did the content appear quickly? Did the page respond quickly to my action? Did anything move while I was reading? When the answer to all three is “yes”, visitors navigate the site more comfortably.",
    },
    {
      type: "paragraph",
      text: "In the web projects we build at AKCY, we plan image optimisation, font loading strategy and the JavaScript budget from the start, and after launch we keep tracking the metrics with real user data.",
    },
  ],
  faq: [
    {
      question: "What are Core Web Vitals?",
      answer:
        "Core Web Vitals are three metrics Google defined to measure user experience on web pages: LCP for loading speed, INP for responsiveness to interactions and CLS for visual stability.",
    },
    {
      question: "What is a good LCP value?",
      answer:
        "According to Google, an LCP of 2.5 seconds or less for 75% of visits is considered good. Values above 4 seconds are considered poor.",
    },
    {
      question: "What is the difference between INP and FID?",
      answer:
        "FID only measured the delay of the first interaction on a page. INP assesses the response time of interactions throughout the page and replaced FID in March 2024.",
    },
    {
      question: "Is the PageSpeed score the same as Core Web Vitals?",
      answer:
        "No. The 0–100 performance score in PageSpeed Insights is based on a Lighthouse lab test. The Core Web Vitals assessment is based on field data collected from real users.",
    },
  ],
};
