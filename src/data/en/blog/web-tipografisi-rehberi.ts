import type { BlogPostTranslation } from "../blog";

export const post: BlogPostTranslation = {
  title: "Web Typography Guide: Typeface Rules for a Readable, Strong Website",
  seoTitle: "Web Typography Guide: Choosing Fonts and Improving Readability | AKCY",
  metaDescription:
    "How do you choose the right typeface for your website? A practical guide to Turkish character support, type scale, line length, line height, contrast and font performance.",
  focusKeyword: "web typography",
  secondaryKeywords: ["choosing a font for a website", "readability", "Turkish character support", "line height", "font performance"],
  excerpt:
    "Most of the content on a website is text. The right typeface, scale, line length and contrast make your site look more professional and easier to read.",
  coverAlt: "Typography composition made of letters in different sizes and weights",
  authorRole: "Design Team",
  content: [
    {
      type: "paragraph",
      text: "When visitors land on your website, they form an impression from the colours, images and layout in the first few seconds. But for most of the time they spend on the page, what they are actually doing is reading: headings, service descriptions, pricing information, form labels and buttons.",
    },
    {
      type: "paragraph",
      text: "That is why **web typography** is not the decorative part of design but its load-bearing column. With good typography, the same content becomes a trustworthy page that is easy to scan; with poor typography, it can become a tiring page that looks amateurish.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Good typography goes unnoticed; readers simply feel that the text is easy to read. Bad typography is noticed immediately.",
    },
    { type: "h2", text: "Why does typography matter so much?" },
    {
      type: "paragraph",
      text: "Typography does three jobs at once. The first is readability: the text can be read without effort. The second is hierarchy: visitors can scan the page and understand what matters within seconds. The third is brand perception: the typeface you choose tells people whether your brand is serious, friendly, technical or creative before they read a single word.",
    },
    {
      type: "paragraph",
      text: "This is why sites that use system fonts (such as Arial or Helvetica) with default settings often look “like a template”. The problem is not the typeface itself, but that the scale, spacing and hierarchy have not been designed deliberately.",
    },
    { type: "h2", text: "Choosing the right typeface" },
    {
      type: "paragraph",
      text: "For most websites, a sans-serif typeface is a safe starting point for body text. It looks crisp on screen, stays consistent at different sizes and works well with interface elements. Serif typefaces can be a strong choice for long-form reading, editorial sites or a more classic brand character.",
    },
    {
      type: "paragraph",
      text: "When choosing, look not only at how beautiful the letters are but also at how complete the family is. A good web type family should include at least regular, medium and bold weights, with consistently designed numerals, punctuation and special characters.",
    },
    { type: "h3", text: "Always test Turkish character support" },
    {
      type: "paragraph",
      text: "For a Turkish website, this is the most frequently skipped check. Some typefaces do not include characters such as ğ, ş, ı and İ at all, so the browser pulls these letters from another font. The result is letters that look different in the middle of words. On services such as Google Fonts, Turkish characters are usually in the **latin-ext** subset; make sure that subset is loaded.",
    },
    {
      type: "paragraph",
      text: "For a quick test, render this Turkish pangram, which contains every Turkish letter, in both lowercase and uppercase and in different weights: “Pijamalı hasta yağız şoföre çabucak güvendi.”",
    },
    {
      type: "callout",
      variant: "note",
      text: "Watch out for uppercase conversions too. The CSS rule text-transform: uppercase correctly turns “i” into “İ” if the page language is set to lang=\"tr\". In JavaScript, use toLocaleUpperCase(\"tr\") instead of toUpperCase(); otherwise you get incorrect results such as “STRATEJISI” instead of “STRATEJİSİ”.",
    },
    { type: "h2", text: "How many typefaces should you use?" },
    {
      type: "paragraph",
      text: "One or two type families are enough for most sites. A common, balanced approach is to use a typeface with character for headings and a highly readable typeface for body text. You can also build a strong hierarchy with different weights of a single family.",
    },
    {
      type: "paragraph",
      text: "Before adding a third typeface, ask two questions: Does it give readers a new layer of information (for example, a monospace font for code samples), or does it only add variety? Also remember that every new typeface means extra files the page has to load.",
    },
    { type: "h2", text: "Font size and type scale" },
    {
      type: "paragraph",
      text: "16 pixels is the browser default for body text and should be treated as the minimum. On reading-heavy pages, 17–18 pixels often provide a more comfortable experience. For secondary text such as descriptions, labels and footnotes, a good rule is not to go below 12 pixels.",
    },
    {
      type: "paragraph",
      text: "Instead of choosing heading sizes at random, use a **type scale**. For example, a scale in which each level is 1.25 times larger than the previous one creates a consistent rhythm between body text, subheadings, section headings and page titles. In modern CSS, the clamp() function lets headings grow and shrink fluidly with the screen width.",
    },
    {
      type: "code",
      language: "css",
      filename: "typography.css",
      code: `:root {
  --text-base: 1rem;                              /* 16px */
  --text-lg: 1.125rem;                            /* 18px */
  --text-h3: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --text-h2: clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem);
  --text-h1: clamp(2.25rem, 1.6rem + 3vw, 4rem);
}

body { font-size: var(--text-base); line-height: 1.65; }
h1   { font-size: var(--text-h1); line-height: 1.08; }
h2   { font-size: var(--text-h2); line-height: 1.15; }`,
    },
    { type: "h2", text: "Line length: the most overlooked rule" },
    {
      type: "paragraph",
      text: "On wide screens, text that stretches across the whole page makes reading much harder. When the eye travels from the end of a long line back to the start of the next one, it loses its place. The generally accepted range for reading text is roughly **45 to 75 characters** per line.",
    },
    {
      type: "paragraph",
      text: "The easiest way to achieve this in CSS is to give the text container a width limit in character units, such as max-width: 65ch. That way, line length stays within a readable range even if the typeface or size changes.",
    },
    { type: "h2", text: "Line height and letter spacing" },
    {
      type: "paragraph",
      text: "For body text, a line height between 1.5 and 1.7 usually reads comfortably. For large headings, the same ratio creates too much space; between 1.05 and 1.2 looks tidier for headings. The rule is simple: as text gets bigger, line height gets proportionally smaller.",
    },
    {
      type: "paragraph",
      text: "Letter spacing follows a similar logic. For very large headings, a slightly negative value (for example, -0.02em) tightens the letters and gives a stronger look. But overdoing it causes characters to touch, especially accented and dotted letters such as those in Turkish. For small all-caps labels, positive letter spacing (0.08–0.15em) improves readability.",
    },
    {
      type: "table",
      headers: ["Text type", "Recommended size", "Line height", "Letter spacing"],
      rows: [
        ["Body text", "16–18 px", "1.5–1.7", "0"],
        ["Subheading (H3)", "20–24 px", "1.25–1.35", "0 / -0.01em"],
        ["Section heading (H2)", "28–40 px", "1.1–1.2", "-0.02em"],
        ["Page title (H1)", "36–64 px", "1.05–1.1", "-0.02 / -0.03em"],
        ["All-caps label", "11–13 px", "1.4–1.6", "0.08–0.15em"],
      ],
    },
    { type: "h2", text: "Contrast and accessibility" },
    {
      type: "paragraph",
      text: "Light grey text can look elegant, but it often reduces readability. The web accessibility standard WCAG recommends a contrast ratio of at least **4.5:1** against the background for normal text and at least **3:1** for large text (roughly 24 pixels and above, or 18.66 pixels bold) at level AA.",
    },
    {
      type: "paragraph",
      text: "Check contrast by measuring, not guessing. Browser developer tools and online contrast checkers instantly show whether the colour pair you have chosen meets these thresholds.",
    },
    { type: "h2", text: "Font performance: looking good isn’t enough" },
    {
      type: "paragraph",
      text: "Web fonts are files the page has to download. When they are loaded incorrectly, text can stay invisible for a while, or the layout can shift when the font arrives. Both hurt the user experience and your Core Web Vitals metrics.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "**Use the WOFF2 format:** It is the most efficient compressed font format for the web.",
        "**Load only the weights you need:** Every unused weight is an unnecessary download. Variable fonts can deliver many weights in a single file.",
        "**Use font-display: swap:** Text stays visible in a fallback font until the web font loads.",
        "**Serve fonts from your own server:** This removes the need to connect to an extra domain; frameworks such as Next.js can do this automatically.",
        "**Tune the fallback font:** Bringing the fallback font’s metrics closer to the web font with properties such as size-adjust reduces layout shift during loading.",
      ],
    },
    { type: "h2", text: "Hierarchy: tell visitors where to look" },
    {
      type: "paragraph",
      text: "Most visitors don’t read a page line by line; they scan it. Headings, bold phrases, short paragraphs and lists make scanning easier. To build hierarchy, use not only size but also weight, colour and spacing. When there is more space above a heading than below it, the eye immediately understands which content the heading belongs to.",
    },
    {
      type: "quote",
      text: "If everything on a page is emphasised, nothing is emphasised.",
    },
    { type: "h2", text: "Quick checklist" },
    {
      type: "list",
      style: "ordered",
      items: [
        "Are you using no more than two type families?",
        "Do Turkish characters display correctly in every weight?",
        "Is body text at least 16 pixels?",
        "Is line length for reading text within 45–75 characters?",
        "Is body line height around 1.5, with tighter headings?",
        "Does text-to-background contrast meet WCAG AA thresholds?",
        "Are fonts loaded in WOFF2 format, with only the weights you need?",
        "Is the heading scale based on a consistent ratio?",
      ],
    },
    { type: "divider" },
    { type: "h2", text: "Conclusion" },
    {
      type: "paragraph",
      text: "Good web typography doesn’t start with buying an expensive typeface; it starts with applying a few basic rules consistently. The right type family, a clear scale, readable line lengths and sufficient contrast make your site look more professional and help visitors find what they are looking for faster.",
    },
    {
      type: "paragraph",
      text: "At AKCY, we plan typography at the very start of web projects, together with the brand language and content structure. That way, every new page keeps the same consistency as the design system grows.",
    },
  ],
  faq: [
    {
      question: "What is the best typeface for a website?",
      answer:
        "There is no single right typeface. For body text, a sans-serif typeface that looks crisp on screen, fully supports the characters of your language and comes in several weights is a safe starting point for most sites. The choice should reflect your brand character and the type of content.",
    },
    {
      question: "How many pixels should body text be on a website?",
      answer:
        "16 pixels is considered the minimum for body text. On reading-heavy pages, 17–18 pixels can provide a more comfortable reading experience.",
    },
    {
      question: "How many characters should a line have?",
      answer:
        "For reading text, roughly 45 to 75 characters per line is generally recommended. A value such as max-width: 65ch in CSS is an easy way to achieve this.",
    },
    {
      question: "Does Google Fonts support Turkish characters?",
      answer:
        "Many Google Fonts typefaces support Turkish characters; they are usually found in the latin-ext subset. Even so, you should test your chosen typeface with every Turkish letter and in every weight you use.",
    },
  ],
};
