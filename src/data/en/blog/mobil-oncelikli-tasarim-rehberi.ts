import type { BlogPostTranslation } from "../blog";

export const post: BlogPostTranslation = {
  title: "Mobile-First Design: How to Plan a Responsive Website",
  seoTitle: "Mobile-First Design and Responsive Web Guide | AKCY",
  metaDescription:
    "What is mobile-first design? A practical guide to prioritising content, touch targets, mobile forms, breakpoints and responsive images.",
  focusKeyword: "mobile-first design",
  secondaryKeywords: ["responsive web design", "mobile-friendly website", "mobile first", "touch target size", "mobile form design"],
  excerpt:
    "You can’t get a good mobile experience by shrinking a desktop design. We explain the logic behind the mobile-first approach and the details to watch, from touch targets to forms.",
  coverAlt: "Illustration showing the layout of the same interface on mobile, tablet and desktop screens",
  authorRole: "Design Team",
  content: [
    {
      type: "paragraph",
      text: "In many web projects, the process goes like this: first a design is created for a wide desktop screen and approved, then it is “made mobile-friendly”. With this approach, the mobile version often becomes a compressed copy of the desktop design. Columns stack on top of each other, menus shrink and buttons end up too small to tap with a finger.",
    },
    {
      type: "paragraph",
      text: "**Mobile-first design** reverses this process: design starts with the smallest, most constrained screen and expands as the screen gets bigger. This isn’t just a technical order of work; it is a way of thinking that forces you to prioritise content.",
    },
    { type: "h2", text: "Why mobile first?" },
    {
      type: "paragraph",
      text: "In many industries, most web traffic now comes from mobile devices. On top of that, Google uses the mobile version of a site when indexing and ranking it. Content missing from the mobile version may also be considered missing by the search engine.",
    },
    {
      type: "paragraph",
      text: "But the most important reason is a design one: there isn’t room for everything on a small screen. Starting with mobile makes you ask, right at the start, “What really matters on this page?” The answer to that question makes the desktop design simpler and more focused as well.",
    },
    { type: "h2", text: "1. Prioritise content" },
    {
      type: "paragraph",
      text: "On a mobile screen, visitors read the page from top to bottom in a single column. That makes the order of content far more decisive than the side-by-side layout on desktop. For each page, decide what information visitors should see on the first screen and the main action you want them to take.",
    },
    {
      type: "callout",
      variant: "note",
      text: "On desktop, text on the left and an image on the right can look balanced in a two-column layout. On mobile, you have to decide consciously which comes first; most of the time, the heading comes first and the image second.",
    },
    { type: "h2", text: "2. Design for fingers, not for a mouse" },
    {
      type: "paragraph",
      text: "A mouse pointer can target a single pixel; a finger touches a much larger area. Small links and buttons that are too close together lead to mis-taps and frustrated users.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "**Apple’s interface guidelines** recommend touch targets of at least 44×44 points.",
        "**Google’s Material Design guidelines** recommend a touch area of at least 48×48 dp.",
        "**WCAG 2.2** sets a minimum of 24×24 CSS pixels for targets at level AA.",
      ],
    },
    {
      type: "paragraph",
      text: "Even if you use a visually small icon, you can enlarge the touch area with padding. Placing frequently used actions in the lower and middle areas of the screen, which are easy to reach with your thumb, also makes one-handed use easier.",
    },
    { type: "h2", text: "3. Simplify navigation" },
    {
      type: "paragraph",
      text: "Wide desktop menus usually move behind a menu button on mobile. This is unavoidable, but the menu itself should also stay simple. For multi-level menus, accessibility details such as collapsible submenus, preventing the page from scrolling while the menu is open, and focus management with the Escape key shouldn’t be forgotten.",
    },
    {
      type: "paragraph",
      text: "The most important action (for example, “Get a Quote” or “Contact Us”) shouldn’t get lost inside the menu; if possible, it should stay visible while the menu is closed too.",
    },
    { type: "h2", text: "4. Optimise forms for mobile" },
    {
      type: "paragraph",
      text: "Filling in a form is more effort on mobile than on desktop. Every unnecessary field increases the chance that the form is abandoned halfway. Ask only for the information you really need and take advantage of what the browser offers.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Use the right **input type**: type=\"email\" opens the email keyboard, and type=\"tel\" opens the numeric keypad.",
        "Let the browser autofill name, email and phone details with **autocomplete** attributes.",
        "Put form labels above the field, not inside it (as a placeholder); labels that disappear when you start typing confuse users.",
        "Show error messages directly below the relevant field, in clear language.",
        "Use a font size of at least 16 pixels in input fields; some mobile browsers zoom the page when you focus on a field with smaller text.",
      ],
    },
    {
      type: "code",
      language: "html",
      filename: "contact-form.html",
      code: `<label for="email">Email</label>
<input id="email" type="email" autocomplete="email" required>

<label for="phone">Phone</label>
<input id="phone" type="tel" autocomplete="tel" inputmode="tel">`,
    },
    { type: "h2", text: "5. Set breakpoints by content, not by device" },
    {
      type: "paragraph",
      text: "Setting breakpoints based on the screen widths of particular phone or tablet models is an approach that becomes outdated with every new device. Instead, start the design from the smallest screen, expand it and add a breakpoint where the layout starts to break.",
    },
    {
      type: "paragraph",
      text: "In mobile-first CSS, the base styles are written for small screens, and additional adjustments are made for wider screens with min-width media queries.",
    },
    {
      type: "code",
      language: "css",
      filename: "layout.css",
      code: `/* Base: single column (mobile) */
.services { display: grid; gap: 24px; }

/* When the content can carry two columns */
@media (min-width: 700px) {
  .services { grid-template-columns: repeat(2, 1fr); }
}

/* Three columns on wide screens */
@media (min-width: 1100px) {
  .services { grid-template-columns: repeat(3, 1fr); }
}`,
    },
    { type: "h2", text: "6. Serve images to suit the screen" },
    {
      type: "paragraph",
      text: "Downloading a 2000-pixel-wide image prepared for desktop on a phone as well wastes the mobile user’s time and data. The srcset and sizes attributes let the browser choose the right image for the screen size. In some cases, you also need to serve a differently cropped version of the image for mobile; for example, the focal point of a wide landscape photo can get lost on a small screen.",
    },
    { type: "h2", text: "7. Test on real devices" },
    {
      type: "paragraph",
      text: "Device simulation in the browser’s developer tools is handy for quick checks, but it doesn’t fully reflect the real experience. Touch feel, screen brightness, a slow mobile connection and one-handed use can only be tested on a real device. Before launch, browse the site from start to finish on at least one iOS and one Android device, and actually fill in the forms.",
    },
    {
      type: "quote",
      text: "Being mobile-friendly doesn’t mean the site opens on a phone; it means it can be used comfortably on a phone.",
    },
    { type: "divider" },
    { type: "h2", text: "Conclusion" },
    {
      type: "paragraph",
      text: "Mobile-first design treats the small screen not as a limitation but as an opportunity to focus. Prioritising content, enlarging touch targets, simplifying forms and testing on real devices improve not only the mobile experience but the site as a whole.",
    },
    {
      type: "paragraph",
      text: "At AKCY, we plan web projects starting from mobile screens, set every breakpoint according to the content flow and test on real devices before launch.",
    },
  ],
  faq: [
    {
      question: "What is mobile-first design?",
      answer:
        "Mobile-first design is the approach of designing a website for small screens first and expanding it as the screen gets bigger. It makes it easier to prioritise content and build a simple experience.",
    },
    {
      question: "Are responsive design and mobile-first design the same thing?",
      answer:
        "Not exactly. Responsive design means the site adapts to different screen sizes. Mobile-first design is a method of building that adaptation starting from the smallest screen. A responsive site can also be built starting from desktop.",
    },
    {
      question: "How big should buttons be on mobile?",
      answer:
        "Apple recommends a touch area of at least 44×44 points and Google Material Design at least 48×48 dp. WCAG 2.2 sets a minimum of 24×24 CSS pixels at level AA.",
    },
    {
      question: "Does Google look at the mobile version?",
      answer:
        "Yes. Google mainly uses the mobile version of a page when indexing and ranking sites. That is why important content must also be fully present in the mobile version.",
    },
  ],
};
