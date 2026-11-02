import type { BlogPostTranslation } from "../blog";

export const post: BlogPostTranslation = {
  title: "An AI Roadmap for SMEs: First Tangible Results in 90 Days",
  seoTitle: "An AI Roadmap for SMEs: Where Should You Start? | AKCY",
  metaDescription:
    "Where should SMEs start with AI? A practical 90-day AI roadmap covering use-case selection, data preparation, a pilot project, costs and measurement.",
  focusKeyword: "AI for SMEs",
  secondaryKeywords: ["AI roadmap", "AI in business", "AI pilot project", "cost of AI"],
  excerpt:
    "AI is no longer only on the agenda of large companies. But most projects that start with a feeling of “we should do something” never get past the demo stage. We’ve prepared a step-by-step roadmap that gives SMEs measurable results in 90 days.",
  coverAlt: "Humanoid robot sitting on a bench looking at a tablet",
  authorRole: "AI Team",
  content: [
    {
      type: "paragraph",
      text: "Over the last two years, almost every business owner has asked the same question: *“How can we use AI in our company?”* It’s the right question, but the answer is often sought in the wrong place. Projects that start with choosing a tool get shelved after a few weeks because they never fully define the problem to be solved.",
    },
    {
      type: "paragraph",
      text: "In this article, we use a 90-day plan to explain how SMEs working with limited budgets and small teams can start investing in **AI** in a concrete, measurable and low-risk way.",
    },
    { type: "h2", text: "Problem first, technology second" },
    {
      type: "paragraph",
      text: "AI is not a strategy; it is a tool. What successful projects have in common is that they start with a problem that already exists in the business and whose cost is felt. That is why the first step isn’t researching technology but sitting down with teams and listing the tasks that waste time.",
    },
    {
      type: "list",
      style: "unordered",
      items: [
        "Where does the team write the most **repetitive text**? (quotes, email replies, product descriptions)",
        "Which questions do customers ask **the same way every day**?",
        "Which documents are **read by hand** and entered into a system? (invoices, order forms, CVs)",
        "Which decisions require bringing **scattered data** together?",
      ],
    },
    {
      type: "callout",
      variant: "info",
      text: "A good first project is a task that is repeated often, whose results are easy to check and where a mistake doesn’t cause major harm. Starting with systems that help employees, rather than systems that reply directly to customers, reduces the risk.",
    },
    { type: "h2", text: "6 use cases that create the most value for SMEs" },
    {
      type: "table",
      headers: ["Use case", "What does it deliver?", "Difficulty"],
      rows: [
        ["Draft replies to customer questions", "Shortens the support team’s response time", "Low"],
        ["Extracting data from documents and invoices", "Reduces manual data entry", "Medium"],
        ["Internal knowledge assistant", "Fast access to procedures and documents", "Medium"],
        ["Product and content copy generation", "Speeds up e-commerce and marketing", "Low"],
        ["Meeting and call summaries", "Clarifies follow-ups and actions", "Low"],
        ["Sales and demand forecasting", "Supports stock and planning decisions", "High"],
      ],
    },
    {
      type: "paragraph",
      text: "The first five use cases in the table can be put into service within a few weeks with ready-made language models and the right integration. Projects such as forecasting depend on the quality of historical data, so they should usually be left for a second phase.",
    },
    { type: "h2", text: "The 90-day roadmap" },
    { type: "h3", text: "Days 1–30: Discovery and selection" },
    {
      type: "list",
      style: "ordered",
      items: [
        "Hold short meetings with departments and list the tasks that waste time",
        "Roughly note the weekly time spent and the error rate for each task",
        "Score them for value and feasibility, and choose **a single pilot**",
        "Write the pilot’s success criterion from the start, such as “cut quote preparation time by 40%”",
      ],
    },
    { type: "h3", text: "Days 31–60: Pilot development" },
    {
      type: "paragraph",
      text: "The goal at this stage isn’t a perfect product, but a working prototype that real users use for real work. The pilot should sit inside your existing tools (CRM, email, WhatsApp, an internal dashboard). If the team has to learn a new screen, usage drops.",
    },
    { type: "h3", text: "Days 61–90: Measurement and rollout" },
    {
      type: "paragraph",
      text: "Measure the criterion you set at the start of the pilot. Collect user feedback, categorise incorrect results and improve the instructions, examples or knowledge sources given to the model. If the target has been reached, carry the same setup over to a second process.",
    },
    {
      type: "quote",
      text: "In AI projects, the most expensive mistake isn’t choosing the wrong model; it’s starting with a goal you can’t measure.",
    },
    { type: "h2", text: "Data and privacy: what to think about from the start" },
    {
      type: "paragraph",
      text: "For processes involving personal data, compliance with **KVKK** (Turkish data protection law), the country where the data is processed, whether information sent to the model is used for training and access permissions should be clarified at the start of the project. Enterprise APIs and correctly configured infrastructure provide the necessary safeguards here; however, employees pasting customer data into free tools is a serious risk.",
    },
    {
      type: "callout",
      variant: "note",
      text: "Before the pilot starts, write a short “AI usage policy”: Which tools are approved, which data must not be shared and who checks the content that is generated?",
    },
    { type: "h2", text: "How are the costs made up?" },
    {
      type: "paragraph",
      text: "In SME-scale projects, costs come from three items: setup and integration development, usage-based model fees and maintenance. In most scenarios, model fees are lower than people expect; the real investment is integrating the system properly into your existing workflow. That is why the healthiest approach is to calculate the return as “employee hours saved × hourly cost”.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "At AKCY, we plan businesses’ first AI project together with them, from discovery to go-live. If you’re curious about the technical side, take a look at our article on the [corporate AI assistant](/blog/kurumsal-yapay-zeka-asistani-nasil-kurulur), or [get in touch with us](/iletisim) to discuss your own scenario.",
    },
  ],
  faq: [
    {
      question: "Where should a small business start with AI?",
      answer:
        "The best approach is to start with a task that is repeated often, whose results are easy to check and where the cost of a mistake is low. Drafting replies to customer questions, reading documents or generating product copy are good starting points.",
    },
    {
      question: "Does an AI project require big data?",
      answer:
        "Projects built on ready-made language models don’t need large datasets. Your company documents, sample answers and well-written instructions are enough for most scenarios.",
    },
    {
      question: "How soon can we see the first results?",
      answer:
        "A well-chosen pilot project can be put into use within 4–8 weeks. Producing a report with measurable gains by the end of 90 days is a realistic goal.",
    },
  ],
};
