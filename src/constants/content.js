/* ------------------------------------------------------------------ */
/*  Social proof (fictional people and organisations)                  */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    id: "0",
    name: "Ines Marchetti",
    role: "Policy researcher, Halden Institute",
    text: "The citations are what sold me. I can hand a brief to a colleague and they can check every line in a minute instead of an afternoon.",
  },
  {
    id: "1",
    name: "Tom Achterberg",
    role: "Managing editor, Orbital Press",
    text: "We use it for first drafts and copy edits. The tracked suggestions mean nobody has to wonder what the model quietly changed.",
  },
  {
    id: "2",
    name: "Priya Nandakumar",
    role: "Brand designer, Kettle Studio",
    text: "Presets fixed my biggest problem with image tools: the fifth image never matched the first. Now a series actually looks like a series.",
  },
  {
    id: "3",
    name: "Jonas Lindqvist",
    role: "PhD candidate, Northfield University",
    text: "I loaded 180 papers into one project. It does not replace reading them, but it tells me where to read, and that is a lot.",
  },
  {
    id: "4",
    name: "Rachel Owusu",
    role: "Content lead, Mercer & Lane",
    text: "Our style guide lives in Aster now. New writers sound like us in their first week, which used to take a quarter.",
  },
  {
    id: "5",
    name: "Daniel Sato",
    role: "Independent analyst",
    text: "It says when the sources do not support an answer. That one behaviour is why I trust it with client work.",
  },
];

export const stats = [
  { id: "0", value: 41, suffix: "k", label: "Researchers and writers each week", decimals: 0 },
  { id: "1", value: 1.9, suffix: "M", label: "Sources cited last month", decimals: 1 },
  { id: "2", value: 31, suffix: "", label: "Languages supported", decimals: 0 },
  { id: "3", value: 4.8, suffix: "/5", label: "Average rating, 2,300 reviews", decimals: 1 },
];

// Usage dashboard sample data (credits used per day, last 14 days)
export const usageDaily = [
  { day: "Oct 24", research: 42, writing: 28, images: 12 },
  { day: "Oct 25", research: 18, writing: 12, images: 4 },
  { day: "Oct 26", research: 9, writing: 6, images: 2 },
  { day: "Oct 27", research: 55, writing: 31, images: 16 },
  { day: "Oct 28", research: 61, writing: 40, images: 22 },
  { day: "Oct 29", research: 48, writing: 36, images: 9 },
  { day: "Oct 30", research: 66, writing: 29, images: 26 },
  { day: "Oct 31", research: 39, writing: 22, images: 31 },
  { day: "Nov 1", research: 14, writing: 9, images: 3 },
  { day: "Nov 2", research: 11, writing: 15, images: 6 },
  { day: "Nov 3", research: 58, writing: 44, images: 18 },
  { day: "Nov 4", research: 72, writing: 38, images: 21 },
  { day: "Nov 5", research: 64, writing: 47, images: 14 },
  { day: "Nov 6", research: 51, writing: 33, images: 24 },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const pricingFaq = [
  {
    q: "Is the Free plan actually free?",
    a: "Yes. Free includes 40 research questions and 20 images a month, with no card required. Limits reset on the first of each month.",
  },
  {
    q: "What counts as a research question?",
    a: "One message you send in a project with sources attached. Follow-ups count as new questions; rewrites and edits in the writing view do not.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual plans are billed once a year and cost about 17% less than paying monthly. You can switch at any time; we prorate the difference.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes, from Settings, in two clicks. You keep access until the end of the billing period and can export every project before you go.",
  },
  {
    q: "Is my data used to train models?",
    a: "No. Files, conversations and images are never used for training, on any plan. Team workspaces can also choose EU or US hosting.",
  },
  {
    q: "Do you offer education or non-profit pricing?",
    a: "Students, teachers and registered non-profits get Pro at 50% off. Write to us from the contact page with proof of eligibility.",
  },
];

/* ------------------------------------------------------------------ */
/*  Product tour                                                       */
/* ------------------------------------------------------------------ */

export const tourSteps = [
  {
    id: "0",
    visual: "sources",
    title: "Create a project and add sources",
    text: "Drop in PDFs, paste links or connect a Drive folder. Aster indexes them privately in a few seconds per file.",
    tip: "Tip: drag a whole folder onto the sources panel to add every file at once.",
  },
  {
    id: "1",
    visual: "chat",
    title: "Ask, and check the citations",
    text: "Ask in plain language. Each claim in the answer carries a numbered citation that opens the exact passage.",
    tip: "Tip: press / anywhere in the app to focus the message box.",
  },
  {
    id: "2",
    visual: "write",
    title: "Turn findings into a draft",
    text: "Ask for a brief, a section or an email. Edits arrive as tracked suggestions that follow your style guide.",
    tip: "Tip: select text and press E to ask for an edit on just that passage.",
  },
  {
    id: "3",
    visual: "images",
    title: "Add images from a preset",
    text: "Generate four variations from a saved preset, then upscale the one you like. Same look, every time.",
    tip: "Tip: add --wide to any prompt for a 16:9 result.",
  },
];

/* ------------------------------------------------------------------ */
/*  Image studio                                                       */
/* ------------------------------------------------------------------ */

// Each style is a palette used by the procedural <Artwork /> renderer.
export const imageStyles = [
  { id: "editorial", label: "Editorial" },
  { id: "film", label: "Warm film" },
  { id: "riso", label: "Risograph" },
  { id: "nocturne", label: "Nocturne" },
  { id: "mono", label: "Monochrome" },
];

export const imageAspects = [
  { id: "1:1", label: "1:1", className: "aspect-square" },
  { id: "4:3", label: "4:3", className: "aspect-[4/3]" },
  { id: "16:9", label: "16:9", className: "aspect-video" },
];

// Scenes the procedural renderer knows how to draw.
export const generatedImagePool = ["dunes", "peaks", "bloom", "city", "orbit", "contour", "still", "waves"];

export const imagePromptIdeas = [
  "Low sun over layered sand dunes, quiet editorial cover",
  "A single aster flower, top view, flat shapes",
  "City blocks at dusk, lit windows, wide framing",
  "Topographic map of an imaginary island",
];

/* ------------------------------------------------------------------ */
/*  Changelog                                                          */
/* ------------------------------------------------------------------ */

export const changelog = [
  {
    version: "3.4.0",
    date: "October 28, 2026",
    title: "Shared projects preview",
    items: [
      { type: "New", text: "Invite up to five collaborators to a project (beta)." },
      { type: "Improved", text: "Source indexing is about twice as fast for large PDFs." },
      { type: "Fixed", text: "Citations could point to the previous page in two-column layouts." },
    ],
  },
  {
    version: "3.3.0",
    date: "September 16, 2026",
    title: "Voice and presets",
    items: [
      { type: "New", text: "Voice dictation in 30 languages, on web and desktop." },
      { type: "New", text: "Image presets can now be shared across a workspace." },
      { type: "Improved", text: "Upscaling to 2048 px keeps fine text legible." },
    ],
  },
  {
    version: "3.2.0",
    date: "August 5, 2026",
    title: "Tables from PDFs",
    items: [
      { type: "New", text: "Ask about tables in PDFs and scanned reports." },
      { type: "Improved", text: "Keyboard navigation across the sources panel." },
    ],
  },
  {
    version: "3.1.0",
    date: "July 9, 2026",
    title: "Citation export",
    items: [
      { type: "New", text: "Export sources as BibTeX, RIS, APA, Chicago or MLA." },
      { type: "Fixed", text: "Copy now preserves code block formatting." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export const team = [
  { id: "0", name: "Lena Hartmann", role: "Co-founder, CEO", bio: "Previously ran research operations at a policy think tank." },
  { id: "1", name: "Mateo Ruiz", role: "Co-founder, CTO", bio: "Built search infrastructure for a large academic publisher." },
  { id: "2", name: "Aiko Brennan", role: "Head of Design", bio: "Designs tools for people who read for a living." },
  { id: "3", name: "Samuel Okoye", role: "Head of Models", bio: "Works on retrieval, evaluation and citation accuracy." },
];

export const values = [
  {
    id: "0",
    title: "Show the work",
    text: "An answer you cannot check is a rumour. Aster cites, links and admits gaps so you can trust what you publish.",
  },
  {
    id: "1",
    title: "Quiet tools",
    text: "Software you use all day should stay out of the way. We remove features more often than we add them.",
  },
  {
    id: "2",
    title: "Your work is not our data",
    text: "We do not train on customer content. It keeps the product honest and the conversations with legal short.",
  },
];

export const milestones = [
  { year: "2023", text: "Lena and Mateo build a citation checker for a think tank's weekly briefings." },
  { year: "2024", text: "Private beta with 40 research teams. Aster gets projects and the sources panel." },
  { year: "2025", text: "Writing view, style guides and the first version of the image studio." },
  { year: "2026", text: "Aster 2, image presets, voice and shared projects. 41,000 weekly users." },
];

/* ------------------------------------------------------------------ */
/*  Careers                                                            */
/* ------------------------------------------------------------------ */

export const perks = [
  { id: "0", title: "Remote in Europe", text: "Work within two hours of CET. We meet in person twice a year." },
  { id: "1", title: "Four-day focus weeks", text: "One week a month has no recurring meetings at all." },
  { id: "2", title: "Learning budget", text: "€1,500 a year for books, courses and conferences." },
  { id: "3", title: "Equity", text: "Every full-time role includes meaningful stock options." },
];

export const jobs = [
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote, Europe",
    type: "Full-time",
    salary: "€80k – €105k",
    summary: "Build the reading and writing surfaces people use for hours a day: the sources panel, the editor and the image studio.",
    responsibilities: [
      "Own core surfaces of the web app end to end",
      "Keep the interface fast with large documents and long conversations",
      "Work closely with design on interaction details and accessibility",
    ],
    requirements: [
      "5+ years building production React applications",
      "Strong grasp of browser performance and accessibility",
      "Care for typography and small interaction details",
    ],
  },
  {
    slug: "retrieval-engineer",
    title: "Retrieval Engineer",
    department: "Models",
    location: "Remote, Europe",
    type: "Full-time",
    salary: "€95k – €125k",
    summary: "Improve how Aster finds, ranks and cites passages across millions of customer documents.",
    responsibilities: [
      "Design and evaluate retrieval and re-ranking pipelines",
      "Build citation accuracy benchmarks from real use cases",
      "Ship improvements behind measured experiments",
    ],
    requirements: [
      "Production experience with search or retrieval systems",
      "Solid Python and evaluation methodology",
      "Clear written communication",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Berlin or Remote",
    type: "Full-time",
    salary: "€70k – €90k",
    summary: "Design calm, dense, keyboard-friendly tools for people whose job is reading and writing.",
    responsibilities: [
      "Lead design for new areas such as shared projects",
      "Prototype in code or Figma and test with real users",
      "Maintain and extend the Aster design system",
    ],
    requirements: [
      "A portfolio showing interaction and visual craft",
      "Experience with data-rich or text-heavy products",
      "Comfort presenting and defending decisions",
    ],
  },
  {
    slug: "technical-writer",
    title: "Technical Writer",
    department: "Product",
    location: "Remote, Europe",
    type: "Part-time",
    salary: "€45k – €55k pro rata",
    summary: "Write the docs, guides and release notes that help people get real work done with Aster.",
    responsibilities: [
      "Own the help centre and API documentation",
      "Write release notes for every version",
      "Turn support questions into better guides",
    ],
    requirements: [
      "A portfolio of clear technical writing",
      "Comfort reading code and testing APIs",
      "Excellent English; a second European language is a plus",
    ],
  },
  {
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    department: "Operations",
    location: "Remote, Europe",
    type: "Full-time",
    salary: "€55k – €68k",
    summary: "Help research and editorial teams roll Aster out and get value from it in their first 90 days.",
    responsibilities: [
      "Onboard new Team workspaces",
      "Run quarterly reviews with larger customers",
      "Bring customer feedback into product planning",
    ],
    requirements: [
      "3+ years in customer success for a SaaS product",
      "Experience with research, publishing or agency teams",
      "Comfortable with usage data and reporting",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Blog                                                               */
/* ------------------------------------------------------------------ */

export const blogCategories = ["All", "Product", "Guides", "Engineering", "Company"];

export const blogPosts = [
  {
    slug: "how-aster-cites-sources",
    title: "How Aster decides what to cite",
    excerpt: "A walk through retrieval, passage ranking and the checks that run before a citation reaches your screen.",
    category: "Engineering",
    date: "Oct 14, 2026",
    readTime: "9 min read",
    cover: { scene: "contour", style: "editorial", seed: 4 },
    author: { name: "Samuel Okoye", role: "Head of Models" },
    body: [
      { type: "p", text: "Every claim in an Aster answer carries a citation. That sounds simple, and it is the hardest thing we do. This post explains the pipeline behind it." },
      { type: "h2", text: "Retrieval is only the first step" },
      { type: "p", text: "When you ask a question, we retrieve candidate passages from your project, then re-rank them with a smaller model trained to judge whether a passage actually supports a statement." },
      { type: "code", text: "candidates: 120 passages\nafter re-rank: 14 passages\ncited in answer: 6 passages" },
      { type: "h2", text: "A second pass for every claim" },
      { type: "p", text: "After the answer is drafted, each sentence is checked against the passage it cites. If support is weak, the sentence is rewritten or removed, and Aster says that the sources do not cover it." },
      { type: "quote", text: "We would rather show a gap than hide one." },
    ],
  },
  {
    slug: "a-research-brief-in-30-minutes",
    title: "A research brief in 30 minutes",
    excerpt: "A practical workflow for turning a folder of reports into a two-page brief your team can check.",
    category: "Guides",
    date: "Oct 2, 2026",
    readTime: "7 min read",
    cover: { scene: "still", style: "film", seed: 2 },
    author: { name: "Lena Hartmann", role: "Co-founder, CEO" },
    body: [
      { type: "p", text: "Most briefs follow the same shape: what we know, what we do not, and what it means for us. Here is how to get there quickly without losing rigour." },
      { type: "h2", text: "1. Start with a narrow question" },
      { type: "code", text: "What does the evidence say about X in Y, published after 2020?" },
      { type: "p", text: "A narrow question gives Aster something it can answer from your sources instead of something it has to guess at." },
      { type: "h2", text: "2. Read the citations, not just the answer" },
      { type: "list", items: ["Open every citation that supports a key number", "Ask for counter-evidence explicitly", "Pin the claims you will rely on"] },
      { type: "h2", text: "3. Draft with the brief template" },
      { type: "p", text: "Ask for a draft using the project brief and your style guide. Accept the suggestions you agree with and edit the rest yourself." },
    ],
  },
  {
    slug: "image-presets",
    title: "Image presets, and why consistency matters",
    excerpt: "Presets store palette, style and framing so a series of images reads as one. Here is what is new.",
    category: "Product",
    date: "Sep 16, 2026",
    readTime: "5 min read",
    cover: { scene: "dunes", style: "riso", seed: 7 },
    author: { name: "Aiko Brennan", role: "Head of Design" },
    body: [
      { type: "p", text: "The most common complaint about image tools is not quality. It is drift: the fifth image in a series no longer matches the first. Presets are our answer." },
      { type: "h2", text: "What a preset stores" },
      { type: "list", items: ["Palette and contrast", "Style and level of detail", "Aspect ratio and framing", "Negative prompts you always use"] },
      { type: "h2", text: "Shared across a workspace" },
      { type: "p", text: "On Team plans, presets live at the workspace level, so a designer can define the look once and everyone else can use it." },
      { type: "quote", text: "A good preset is a style guide you can run." },
    ],
  },
  {
    slug: "designing-a-calm-interface",
    title: "Designing a calm interface for long sessions",
    excerpt: "Why Aster uses graphite surfaces, one accent colour and very little motion.",
    category: "Product",
    date: "Aug 21, 2026",
    readTime: "6 min read",
    cover: { scene: "waves", style: "mono", seed: 3 },
    author: { name: "Aiko Brennan", role: "Head of Design" },
    body: [
      { type: "p", text: "People spend hours in Aster reading dense material. The interface should feel like a quiet desk, not a dashboard competing for attention." },
      { type: "h2", text: "One accent, used rarely" },
      { type: "p", text: "Lime marks the one thing you can act on next: the send button, the selected citation, the active filter. Everything else is graphite." },
      { type: "h2", text: "Motion that explains" },
      { type: "p", text: "A caret shows text is streaming. A progress line shows an image is rendering. If motion does not explain something, we remove it, and we respect reduced-motion settings everywhere." },
    ],
  },
  {
    slug: "aster-seed-round",
    title: "Aster raises a €9M seed round",
    excerpt: "We are hiring in retrieval and design, and opening a Frankfurt region for EU customers.",
    category: "Company",
    date: "Jun 4, 2026",
    readTime: "3 min read",
    cover: { scene: "orbit", style: "nocturne", seed: 5 },
    author: { name: "Lena Hartmann", role: "Co-founder, CEO" },
    body: [
      { type: "p", text: "Today we are sharing that Aster has raised a €9M seed round to build the most trustworthy assistant for research and writing." },
      { type: "h2", text: "What the funding is for" },
      { type: "list", items: ["Growing the retrieval and evaluation team", "An EU hosting region in Frankfurt", "Shared projects for teams", "A public API"] },
      { type: "p", text: "Nothing changes about how we treat your data: we do not train on it, and you can delete it at any time." },
    ],
  },
  {
    slug: "connecting-zotero",
    title: "Connecting Zotero in five minutes",
    excerpt: "Sync a collection, ask questions across it and insert citations in your preferred style.",
    category: "Guides",
    date: "Apr 3, 2026",
    readTime: "4 min read",
    cover: { scene: "bloom", style: "editorial", seed: 9 },
    author: { name: "Mateo Ruiz", role: "Co-founder, CTO" },
    body: [
      { type: "p", text: "If your reading lives in Zotero, Aster can work with it directly. This guide covers setup and a first useful question." },
      { type: "h2", text: "1. Connect your library" },
      { type: "p", text: "Open Integrations, choose Zotero and sign in. Pick the collections Aster may read; it never sees the rest." },
      { type: "h2", text: "2. Ask across a collection" },
      { type: "code", text: "Which papers in this collection measure effects after 12 months?" },
      { type: "h2", text: "3. Insert citations" },
      { type: "p", text: "In the writing view, type @ to insert a citation from the synced library in APA, Chicago or MLA." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Mock chat                                                          */
/* ------------------------------------------------------------------ */

export const chatModels = [
  { id: "aster-2", label: "Aster 2", description: "Deep research and long documents", meta: "200k context" },
  { id: "aster-swift", label: "Aster Swift", description: "Fast drafts and quick edits", meta: "Fastest" },
  { id: "aster-vision", label: "Aster Vision", description: "Images, scans and screenshots", meta: "Multimodal" },
];

export const suggestedPrompts = [
  "Summarise the evidence on four-day work weeks",
  "Rewrite this intro to be half as long",
  "Compare PostgreSQL and SQLite for a desktop app",
  "Write a debounce function in JavaScript",
];

export const cannedResponses = [
  {
    keywords: ["four-day", "4-day", "work week", "workweek"],
    text: "Across the six sources in this project, the evidence is broadly positive but limited in scope:\n\n- **Wellbeing improves consistently.** Reported burnout fell in every trial that measured it [1][2].\n- **Output mostly held steady.** Four of five organisations reported unchanged or higher revenue during the trial period [1].\n- **Retention improved** in the UK pilot, with resignations down by 57% [1].\n\nTwo caveats: most participants opted in, so the results may not generalise, and few studies run longer than 12 months [3].\n\nSources: [1] Autonomy, UK pilot report, p. 23 · [2] Schor et al., 2023 · [3] OECD working paper, p. 8",
  },
  {
    keywords: ["rewrite", "intro", "shorter", "half"],
    text: "Here is a version at roughly half the length (58 words, from 117):\n\n> Most teams do not lack information. They lack time to check it. Aster reads your sources, answers with citations and drafts in your voice, so the hours go into judgement instead of searching.\n\nChanges: merged the first two sentences, removed the list of file types and cut the closing question. Want a version that keeps the list?",
  },
  {
    keywords: ["postgres", "postgresql", "sqlite", "database"],
    text: "For a desktop app, **SQLite is usually the better default**:\n\n- **Zero setup.** It is a single file inside your app bundle, no server process to install or update.\n- **Fast for one user.** Reads are very fast and writes are fine unless many processes write at once.\n- **Easy backups.** Copy the file, or use the online backup API.\n\nChoose **PostgreSQL** if several users share data, you need row-level security, or you expect heavy concurrent writes. A common pattern is SQLite locally plus a sync service to Postgres on the server.",
  },
  {
    keywords: ["debounce", "javascript", "code", "function"],
    text: "A small, dependency-free debounce:\n\n```js\nfunction debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n```\n\nUse it as `const onSearch = debounce(search, 250)`. The function runs once the user has stopped typing for 250 ms.",
  },
  {
    keywords: ["image", "generate", "cover", "draw", "picture", "illustration"],
    text: "I can do that in the image studio. Based on your project preset (**Editorial**, 16:9), I suggest this prompt:\n\n`City blocks at midday, heat haze, muted ochre and slate palette, wide framing, space for a title on the left`\n\nOpen **How it works** and scroll to the image studio to generate four variations.",
  },
  {
    keywords: ["private", "privacy", "data", "secure", "security", "files", "uploaded"],
    text: "Short version: your files stay yours.\n\n- Files and conversations are encrypted in transit (TLS 1.3) and at rest (AES-256).\n- They are **never used to train models**, on any plan.\n- Team workspaces choose EU (Frankfurt) or US (Virginia) hosting.\n- Deleting a project removes its files from our systems within 30 days.",
  },
  {
    keywords: ["sample size", "decide", "decided", "survey"],
    text: "On October 29 the team agreed on **n = 1,200**, stratified by region, with a 5% oversample for the two smallest regions [1]. The pinned note also says the pilot of 80 responses should run first [2].\n\nSources: [1] Meeting notes, Oct 29 · [2] Pinned message from Ines",
  },
  {
    keywords: ["price", "pricing", "cost", "plan"],
    text: "Aster has three plans:\n\n- **Free**: 40 research questions and 20 images a month\n- **Pro**: $18 a month, or $15 a month billed annually\n- **Team**: $30 per seat a month, or $25 billed annually, with SSO and shared projects\n\nThe Pricing page has the full comparison.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    text: "Hello. I am Aster. I can answer questions from your sources with citations, draft and edit text, and generate images from your presets. What are you working on?",
  },
];

export const fallbackResponses = [
  "This demo runs on a small set of prepared answers, so I cannot research that one properly here.\n\nTry one of the suggested prompts to see a full answer with citations.",
  "Here is how I would approach it:\n\n1. Narrow the question to something your sources can answer\n2. Collect the three or four strongest sources\n3. Ask for a summary with citations, then for counter-evidence\n\nWant me to start with step one?",
  "Before I answer, a clarifying question: is this for an internal note or something you will publish? The level of sourcing I suggest is different for each.",
];

/* ------------------------------------------------------------------ */
/*  Legal                                                              */
/* ------------------------------------------------------------------ */

export const legalUpdated = "November 1, 2026";

export const privacySections = [
  { id: "overview", title: "Overview", body: ["This Privacy Policy explains what information Aster collects, how we use it and the choices you have. We collect as little as possible and never sell personal data.", "Aster is a concept product. This text is illustrative and does not constitute a legal agreement."] },
  { id: "data-we-collect", title: "Information we collect", body: ["Account information such as your name and email address.", "Content you provide, including messages, uploaded files and generated images, stored encrypted.", "Basic usage data such as device type and feature usage, collected in aggregate."] },
  { id: "how-we-use", title: "How we use information", body: ["To provide, maintain and improve Aster.", "To contact you about your account and, if you opt in, product news.", "We never use your content to train models."] },
  { id: "sharing", title: "Sharing", body: ["We share data only with processors who help us run Aster, under written contracts, or when required by law."] },
  { id: "retention", title: "Retention and deletion", body: ["You can export or delete your data at any time from Settings. Deleted content is removed from our systems within 30 days."] },
  { id: "contact", title: "Contact", body: ["Questions about privacy? Use the contact page and choose Privacy as the topic."] },
];

export const termsSections = [
  { id: "acceptance", title: "Acceptance of terms", body: ["By using Aster you agree to these Terms of Service. If you use Aster for an organisation, you agree on its behalf.", "Aster is a concept product. This text is illustrative and does not constitute a legal agreement."] },
  { id: "accounts", title: "Your account", body: ["You are responsible for keeping your login details secure and for activity under your account."] },
  { id: "acceptable-use", title: "Acceptable use", body: ["Do not use Aster to break the law, harm others, generate malware or infringe anyone's rights.", "We may suspend accounts that break these rules."] },
  { id: "content", title: "Your content", body: ["You own the content you upload and create. You grant us a limited licence to process it only to provide the service."] },
  { id: "billing", title: "Billing", body: ["Paid plans renew automatically until cancelled. You keep access until the end of the billing period."] },
  { id: "liability", title: "Limitation of liability", body: ["Aster is provided as is. AI output can be wrong; check citations before relying on important information."] },
];
