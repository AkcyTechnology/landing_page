import type { BlogPostTranslation } from "../blog";

export const post: BlogPostTranslation = {
  title: "WordPress Site Maintenance: A Monthly Checklist for Updates, Backups and Security",
  seoTitle: "WordPress Maintenance: A Monthly Checklist and Guide | AKCY",
  metaDescription:
    "A weekly and monthly maintenance checklist to keep your WordPress site secure, fast and trouble-free: updates, backups, security scans, performance and database clean-up.",
  focusKeyword: "WordPress maintenance",
  secondaryKeywords: ["WordPress updates", "WordPress backups", "WordPress security", "website maintenance service"],
  excerpt:
    "When a WordPress site goes live, the work doesn’t end — it begins. Outdated plugins, missing backups and unnoticed security holes are the problems we see most often. We’ve put together a practical maintenance checklist to keep your site healthy.",
  coverAlt: "A half-open laptop with a bright screen in a dark setting",
  authorRole: "Web Team",
  content: [
    {
      type: "paragraph",
      text: "WordPress powers a large share of the websites on the internet. That popularity also makes it one of the platforms attackers target most. Most attacks don’t come from the WordPress core but from **outdated plugins and themes**.",
    },
    {
      type: "paragraph",
      text: "Regular **WordPress maintenance** is the cheapest way to keep a site secure, fast and working. Fixing things after a problem appears is always more expensive, both in cost and in reputation.",
    },
    { type: "h2", text: "Weekly checks" },
    {
      type: "list",
      style: "unordered",
      items: [
        "Are the homepage, the contact form and, if you have one, the checkout working?",
        "Are automatic backups completing successfully? When was the last backup?",
        "Is there a new warning from the security plugin or on the server side?",
        "Has the uptime monitoring tool recorded any downtime?",
      ],
    },
    { type: "h2", text: "Monthly maintenance checklist" },
    { type: "h3", text: "1. Updates" },
    {
      type: "paragraph",
      text: "The WordPress core, themes and plugins should be updated regularly. But running updates directly on the live site with “update all” is risky. The right method is to update first in a **staging environment**, check the critical pages and then push to live.",
    },
    {
      type: "callout",
      variant: "note",
      text: "Always take a fresh backup before updating. Being able to roll back within minutes if a plugin update breaks the site is the most important part of maintenance.",
    },
    { type: "h3", text: "2. Backups and restore testing" },
    {
      type: "paragraph",
      text: "Taking backups isn’t enough; you need to test that a backup can actually be restored. Backups should be stored somewhere other than the server hosting the site (such as cloud storage) and should include both the files and the database.",
    },
    {
      type: "table",
      headers: ["Site type", "Recommended backup frequency", "Retention period"],
      rows: [
        ["Corporate brochure site", "Weekly", "At least 4 weeks"],
        ["Blog / content site", "Daily", "At least 30 days"],
        ["E-commerce (WooCommerce)", "Daily + after orders", "At least 30 days"],
      ],
    },
    { type: "h3", text: "3. Security" },
    {
      type: "list",
      style: "unordered",
      items: [
        "**Delete** unused plugins and themes completely rather than just deactivating them",
        "Review admin accounts and remove access for employees who have left",
        "Use **two-factor authentication** on all admin accounts",
        "Run file integrity and malware scans",
        "Check the expiry date of the SSL certificate",
      ],
    },
    { type: "h3", text: "4. Performance" },
    {
      type: "paragraph",
      text: "Plugins added over time, unoptimised images and a growing database slow a site down. Once a month, check the [Core Web Vitals](/blog/core-web-vitals-rehberi) of the homepage and your most visited pages with PageSpeed Insights.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Verify that the caching plugin is working correctly",
        "Make sure newly uploaded images are compressed and in WebP/AVIF format",
        "Clean up revisions, spam comments and temporary data in the database",
        "Check that the PHP version is current and supported",
      ],
    },
    { type: "h3", text: "5. Content and SEO health" },
    {
      type: "paragraph",
      text: "Review broken links, 404 errors and indexing warnings in Google Search Console. Test that your forms actually send emails; a contact form that silently stops working loses you customers without anyone noticing.",
    },
    {
      type: "quote",
      text: "Maintenance is invisible work; you only understand its value when it isn’t done.",
    },
    { type: "h2", text: "Do it yourself or hire a service?" },
    {
      type: "paragraph",
      text: "A simple brochure site with few plugins can be maintained in-house using this checklist. But for e-commerce sites, projects with many custom plugins or integrations, and teams without a technical owner, a professional maintenance service reduces both risk and workload.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "We explain what to look out for when setting up your site in our [corporate website with WordPress](/blog/wordpress-ile-kurumsal-web-sitesi) guide. At AKCY, we offer regular maintenance, security and performance services for WordPress sites; [get in touch](/iletisim).",
    },
  ],
  faq: [
    {
      question: "How often should a WordPress site be updated?",
      answer:
        "Security updates should be applied as soon as they are released, and other updates at least once a month — preferably after testing them in a staging environment first.",
    },
    {
      question: "Where should WordPress backups be stored?",
      answer:
        "Backups should be stored in a location independent of the server hosting the site, such as a cloud storage service. If there is a problem with the server, a backup stored in the same place may also become inaccessible.",
    },
    {
      question: "Is it enough to deactivate unused plugins?",
      answer:
        "No. The files of deactivated plugins remain on the server and can create security holes. Unused plugins and themes should be deleted completely.",
    },
  ],
};
