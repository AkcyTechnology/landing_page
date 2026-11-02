import type { BlogPostTranslation } from "../blog";

export const post: BlogPostTranslation = {
  title: "Workflow Automation with n8n: Connect Your Systems Without Writing Code",
  seoTitle: "What Is n8n? A Guide to Workflow Automation with n8n | AKCY",
  metaDescription:
    "What is n8n and how is it different from Zapier and Make? A guide to building form, CRM, email and AI integrations with n8n, running it on your own server and example workflows.",
  focusKeyword: "n8n automation",
  secondaryKeywords: ["what is n8n", "workflow automation", "Zapier alternative", "webhook integration"],
  excerpt:
    "Saving a request from a web form to the CRM, notifying the team, sending the customer an automatic reply… With n8n, you can build these flows in a visual editor, on your own server and without paying per operation.",
  coverAlt: "Server racks connected with cables",
  authorRole: "Automation Team",
  content: [
    {
      type: "paragraph",
      text: "As the number of applications a company uses grows, so does the work of moving data between them. Most of the time, employees take on this “bridge” role. **n8n** is an open-source workflow automation tool that lets you build these bridges in a visual editor and run them automatically.",
    },
    { type: "h2", text: "What is n8n and why does it stand out?" },
    {
      type: "paragraph",
      text: "In n8n, each step is represented by a “node”: a trigger (a new form submission, a scheduled task, a webhook), followed by operations (transforming data, checking conditions, calling an API) and an outcome (a CRM record, an email, a Slack message). By connecting these nodes, you can build complex flows.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "**It can run on your own server:** data is processed without leaving the company",
        "**No per-operation fees:** high-volume flows don’t create extra costs on your own server",
        "**Extensible with code:** custom steps can be written in JavaScript or Python when needed",
        "**Hundreds of ready-made integrations:** Google Workspace, Microsoft 365, CRMs, databases and AI services",
      ],
    },
    { type: "h2", text: "Comparison with Zapier and Make" },
    {
      type: "table",
      headers: ["Criterion", "Zapier", "Make", "n8n"],
      rows: [
        ["Hosting", "Cloud", "Cloud", "Cloud or your own server"],
        ["Pricing", "Per task", "Per operation", "No operation limit when self-hosted"],
        ["Learning curve", "Very easy", "Moderate", "Moderate"],
        ["Custom code", "Limited", "Limited", "Flexible"],
        ["Data control", "With the provider", "With the provider", "Entirely with you"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "For a few simple flows, Zapier offers a quick start. As the number of flows and the transaction volume grow, or as data privacy becomes more important, n8n usually becomes the more sustainable option.",
    },
    { type: "h2", text: "Example flow: from web form to sales team" },
    {
      type: "paragraph",
      text: "Let’s imagine a flow in which quote requests from your website are processed automatically:",
    },
    {
      type: "list",
      style: "ordered",
      items: [
        "**Webhook:** When the form on the website is submitted, the data arrives in n8n",
        "**Validation:** The email format and required fields are checked, and spam is filtered out",
        "**Enrichment:** AI summarises the request text and identifies the relevant service category",
        "**CRM record:** The lead is created in the CRM or the existing record is updated",
        "**Routing:** A notification goes to the right sales representative based on the category",
        "**Automatic reply:** The customer receives a personalised email confirming the request was received",
      ],
    },
    {
      type: "code",
      language: "javascript",
      filename: "n8n-code-node.js",
      code: `// Converts form data into the format the CRM expects\nreturn $input.all().map((item) => {\n  const form = item.json;\n\n  return {\n    json: {\n      fullName: form.name.trim(),\n      email: form.email.toLowerCase(),\n      source: "web-form",\n      budget: Number(form.budget) || null,\n      createdAt: new Date().toISOString(),\n    },\n  };\n});`,
    },
    { type: "h2", text: "What to watch out for when going live" },
    {
      type: "list",
      style: "unordered",
      items: [
        "**Error handling:** Define an “error workflow” for every critical flow so failed runs don’t disappear silently",
        "**Credentials:** Use n8n’s credential management instead of writing API keys into nodes",
        "**Backups and versioning:** Export flows regularly and keep them in version control",
        "**Monitoring:** Track run history and durations, and get alerts on unexpected spikes",
        "**Security:** HTTPS, strong passwords and access restrictions are a must for self-hosted installations",
      ],
    },
    {
      type: "quote",
      text: "Building an automation is half the job; the other half is being the first to notice when something goes wrong.",
    },
    { type: "h2", text: "n8n and AI" },
    {
      type: "paragraph",
      text: "With n8n’s AI nodes, you can add language models to your flows as a natural step. Classifying incoming emails, drafting replies to support requests and extracting data from documents are examples of such steps. You can find the details of this approach in our article on [business process automation with AI](/blog/yapay-zeka-ile-is-surecleri-otomasyonu).",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "At AKCY, we help with n8n setup, workflow design and integration with your existing systems. [Get in touch with us](/iletisim) to assess together which of your processes can be automated.",
    },
  ],
  faq: [
    {
      question: "Is n8n free?",
      answer:
        "The version of n8n you can run on your own server can be used free of charge; you only pay for the server. The cloud version and enterprise features are paid. We recommend checking the current licence terms for your use case.",
    },
    {
      question: "Do I need software knowledge to use n8n?",
      answer:
        "Simple flows can be built in the visual editor without writing code. For flows that require data transformation or custom API integrations, basic JavaScript knowledge makes things easier.",
    },
    {
      question: "Which applications can n8n integrate with?",
      answer:
        "It has hundreds of ready-made integrations, including Google Workspace, Microsoft 365, Slack, popular CRMs, databases, e-commerce platforms and AI services. Systems without a ready-made integration can be connected through HTTP requests.",
    },
  ],
};
