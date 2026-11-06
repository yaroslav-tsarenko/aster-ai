export * from "./content";

/* ------------------------------------------------------------------ */
/*  Brand                                                              */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "Aster",
  product: "Aster AI",
  tagline: "The AI assistant for research, writing and images",
  description:
    "Aster reads your sources, cites every claim, drafts in your voice and generates images that match your brief. One calm workspace for research, writing and visuals.",
};

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

// `desktop: false` items only show in the mobile menu (desktop users reach
// them through the footer and the Ctrl/Cmd+K command palette).
export const navigation = [
  { id: "0", title: "Product", url: "/features" },
  { id: "1", title: "How it works", url: "/how-to-use" },
  { id: "2", title: "Integrations", url: "/integrations" },
  { id: "3", title: "Pricing", url: "/pricing" },
  { id: "4", title: "Changelog", url: "/roadmap" },
  { id: "5", title: "Blog", url: "/blog", desktop: false },
  { id: "6", title: "About", url: "/about", desktop: false },
  { id: "7", title: "Careers", url: "/careers", desktop: false },
  { id: "8", title: "Contact", url: "/contact", desktop: false },
];

export const footerLinks = [
  {
    title: "Product",
    links: [
      { title: "Overview", url: "/features" },
      { title: "How it works", url: "/how-to-use" },
      { title: "Pricing", url: "/pricing" },
      { title: "Integrations", url: "/integrations" },
      { title: "Roadmap and changelog", url: "/roadmap" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", url: "/about" },
      { title: "Blog", url: "/blog" },
      { title: "Careers", url: "/careers" },
      { title: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { title: "Open the app", url: "/app" },
      { title: "Create account", url: "/signup" },
      { title: "Sign in", url: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy policy", url: "/privacy" },
      { title: "Terms of service", url: "/terms" },
    ],
  },
];

// Fictional customer wordmarks rendered as type (no third-party logos).
export const customerNames = [
  { name: "Halden Institute", style: "font-semibold tracking-tight" },
  { name: "NORTHFIELD", style: "font-mono tracking-[0.2em] text-sm" },
  { name: "Mercer & Lane", style: "italic font-medium" },
  { name: "fieldnote", style: "font-semibold tracking-[-0.04em] text-xl" },
  { name: "Orbital Press", style: "font-medium uppercase tracking-wide text-sm" },
  { name: "Kettle Studio", style: "font-light tracking-tight text-xl" },
];

/* ------------------------------------------------------------------ */
/*  Roadmap                                                            */
/* ------------------------------------------------------------------ */

export const roadmapStatuses = {
  done: { label: "Shipped", color: "#c6f432" },
  progress: { label: "In progress", color: "#e6b94f" },
  planned: { label: "Planned", color: "#8b9098" },
};

export const roadmap = [
  {
    id: "0",
    title: "Tables from PDFs",
    text: "Aster now reads tables inside PDFs and scanned reports, so you can ask for a figure and get the exact row it came from.",
    date: "Aug 2026",
    status: "done",
    progress: 100,
    votes: 1312,
  },
  {
    id: "1",
    title: "Shared projects",
    text: "Invite collaborators to a project with its own sources, style guide and image presets. Comments and mentions included.",
    date: "Q4 2026",
    status: "progress",
    progress: 68,
    votes: 947,
  },
  {
    id: "2",
    title: "Citation export",
    text: "Export the sources behind any answer as BibTeX, RIS or a formatted reference list in APA, Chicago or MLA.",
    date: "Jul 2026",
    status: "done",
    progress: 100,
    votes: 1104,
  },
  {
    id: "3",
    title: "Image in-painting",
    text: "Select part of a generated image and describe the change. Keep the composition, swap the detail.",
    date: "Q4 2026",
    status: "progress",
    progress: 41,
    votes: 862,
  },
  {
    id: "4",
    title: "Team style guides",
    text: "One place to define tone, banned phrases and formatting rules. Every draft in the workspace follows it by default.",
    date: "Q1 2027",
    status: "planned",
    progress: 10,
    votes: 1288,
  },
  {
    id: "5",
    title: "Voice dictation",
    text: "Dictate notes and questions in 30 languages. Aster transcribes, punctuates and keeps your wording.",
    date: "Sep 2026",
    status: "done",
    progress: 100,
    votes: 731,
  },
  {
    id: "6",
    title: "Offline drafts",
    text: "The desktop app keeps working without a connection using a compact local model for drafting and edits.",
    date: "Q1 2027",
    status: "planned",
    progress: 4,
    votes: 689,
  },
  {
    id: "7",
    title: "Public API",
    text: "Run research and image jobs from your own tools with the same models and citation format as the app.",
    date: "Q2 2027",
    status: "planned",
    progress: 0,
    votes: 1006,
  },
];

/* ------------------------------------------------------------------ */
/*  Integrations                                                       */
/* ------------------------------------------------------------------ */

export const integrationCategories = ["All", "Research", "Writing", "Design", "Workspace"];

export const collabApps = [
  {
    id: "0",
    slug: "zotero",
    title: "Zotero",
    mark: "Zo",
    category: "Research",
    installs: "21k",
    description:
      "Sync your Zotero library so Aster can answer questions across every paper you have saved, with page-level citations.",
    capabilities: [
      "Two-way sync of collections and tags",
      "Ask questions across a whole collection",
      "Insert citations in your preferred style",
    ],
  },
  {
    id: "1",
    slug: "google-drive",
    title: "Google Drive",
    mark: "GD",
    category: "Workspace",
    installs: "58k",
    description:
      "Point Aster at a Drive folder of docs, sheets and PDFs. It indexes them privately and cites the file and paragraph it used.",
    capabilities: [
      "Folder-level access, never the whole drive",
      "Reads Docs, Sheets, Slides and PDFs",
      "Answers update when files change",
    ],
  },
  {
    id: "2",
    slug: "notion",
    title: "Notion",
    mark: "No",
    category: "Writing",
    installs: "44k",
    description:
      "Send drafts and research briefs to Notion as clean pages with headings, tables and a linked source list.",
    capabilities: [
      "Export any answer as a Notion page",
      "Search selected workspaces from Aster",
      "Keep sources as linked references",
    ],
  },
  {
    id: "3",
    slug: "obsidian",
    title: "Obsidian",
    mark: "Ob",
    category: "Writing",
    installs: "17k",
    description:
      "Use your vault as a private knowledge base. Notes stay on your machine; Aster only reads the folders you allow.",
    capabilities: [
      "Local-first plugin, no vault upload",
      "Backlinks included as context",
      "Write answers straight into a note",
    ],
  },
  {
    id: "4",
    slug: "slack",
    title: "Slack",
    mark: "Sl",
    category: "Workspace",
    installs: "39k",
    description:
      "Ask Aster in a thread and get an answer with sources from your connected docs, visible only to the people in that channel.",
    capabilities: [
      "/aster command in any channel",
      "Thread summaries with decisions and owners",
      "Respects channel permissions",
    ],
  },
  {
    id: "5",
    slug: "figma",
    title: "Figma",
    mark: "Fi",
    category: "Design",
    installs: "26k",
    description:
      "Generate images with your project presets and place them on the canvas at the exact frame size you need.",
    capabilities: [
      "Fill frames with generated images",
      "Reuse project style presets",
      "Rewrite UI copy in place",
    ],
  },
  {
    id: "6",
    slug: "github",
    title: "GitHub",
    mark: "Gh",
    category: "Research",
    installs: "15k",
    description:
      "Connect a repository so Aster can explain code, draft documentation and answer questions about how things work.",
    capabilities: [
      "Read-only access to selected repos",
      "Draft READMEs and changelogs",
      "Answers cite file and line numbers",
    ],
  },
  {
    id: "7",
    slug: "readwise",
    title: "Readwise",
    mark: "Rw",
    category: "Research",
    installs: "12k",
    description:
      "Bring years of highlights into Aster and turn them into outlines, reading notes and first drafts.",
    capabilities: [
      "Import highlights by book or tag",
      "Find connections across your reading",
      "Quote highlights with their source",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

export const pricing = [
  {
    id: "0",
    slug: "free",
    title: "Free",
    description: "For trying Aster on real work.",
    monthly: 0,
    annual: 0,
    unit: "forever",
    cta: "Start free",
    url: "/signup?plan=free",
    features: [
      "40 research questions per month",
      "20 image generations per month",
      "3 projects with up to 25 sources each",
      "Aster Swift model",
    ],
  },
  {
    id: "1",
    slug: "pro",
    title: "Pro",
    description: "For people who research and write every day.",
    monthly: 18,
    annual: 15,
    unit: "per month",
    popular: true,
    cta: "Start 14-day trial",
    url: "/signup?plan=pro",
    features: [
      "Unlimited research and writing",
      "600 image generations per month",
      "Unlimited projects, 500 sources each",
      "All models, including Aster 2",
      "Citation export and style guides",
    ],
  },
  {
    id: "2",
    slug: "team",
    title: "Team",
    description: "For editorial, research and marketing teams.",
    monthly: 30,
    annual: 25,
    unit: "per seat / month",
    perSeat: true,
    cta: "Start team trial",
    url: "/signup?plan=team",
    features: [
      "Everything in Pro",
      "Shared projects and image presets",
      "Admin console, SSO and audit log",
      "EU or US data residency",
      "Priority support, 4-hour response",
    ],
  },
];

export const pricingComparison = [
  {
    group: "Research and writing",
    rows: [
      { label: "Research questions", values: ["40 / month", "Unlimited", "Unlimited"] },
      { label: "Sources per project", values: ["25", "500", "2,000"] },
      { label: "Aster 2 (deep research model)", values: [false, true, true] },
      { label: "Citation export (BibTeX, RIS)", values: [false, true, true] },
      { label: "Style guides", values: [false, "Personal", "Shared"] },
    ],
  },
  {
    group: "Images",
    rows: [
      { label: "Image generations", values: ["20 / month", "600 / month", "1,000 / seat"] },
      { label: "Max resolution", values: ["1024 px", "2048 px", "4096 px"] },
      { label: "Commercial use", values: [false, true, true] },
    ],
  },
  {
    group: "Workspace",
    rows: [
      { label: "Integrations", values: ["2", "All", "All"] },
      { label: "Usage dashboard", values: [true, true, true] },
      { label: "SSO and audit log", values: [false, false, true] },
      { label: "Support", values: ["Community", "Email", "Priority"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

export const benefits = [
  {
    id: "0",
    slug: "research-with-sources",
    icon: "library",
    title: "Research with sources",
    text: "Ask a question across your PDFs, links and notes. Every sentence in the answer links to the passage it came from.",
    tagline: "Citations on every claim",
    long: "Aster reads the material you give it, not a guess at the internet. Answers are assembled from your sources and every claim carries a numbered citation you can open, check and export.",
    highlights: [
      { title: "Page-level citations", text: "Click a citation to open the exact passage, highlighted, in the source panel." },
      { title: "Says when it does not know", text: "If your sources do not cover a question, Aster tells you instead of filling the gap." },
      { title: "Mixed source types", text: "PDFs, web pages, spreadsheets, transcripts and your own notes in one project." },
    ],
    stats: [
      { value: 97, suffix: "%", label: "Claims traced to a source in internal evals" },
      { value: 500, suffix: "", label: "Sources per project on Pro" },
    ],
    prompt: "Summarise the evidence on four-day work weeks",
  },
  {
    id: "1",
    slug: "write-in-your-voice",
    icon: "pen",
    title: "Write in your voice",
    text: "Drafts, rewrites and edits that follow your style guide. Changes arrive as suggestions you accept or reject.",
    tagline: "Suggestions, not surprises",
    long: "Paste a few things you have written and Aster learns the rhythm. Edits come back as tracked suggestions, so you always see what changed and why.",
    highlights: [
      { title: "Tracked suggestions", text: "Every rewrite shows a clear diff. Accept all, or go line by line." },
      { title: "Style guides", text: "Set tone, spelling, banned phrases and formatting once. Aster follows them." },
      { title: "Length control", text: "Ask for half as long, or exactly 120 words, and get exactly that." },
    ],
    stats: [
      { value: 6, suffix: " h", label: "Saved per week, median Pro user" },
      { value: 31, suffix: "", label: "Languages for drafting and editing" },
    ],
    prompt: "Rewrite this intro to be half as long",
  },
  {
    id: "2",
    slug: "image-studio",
    icon: "image",
    title: "Image studio",
    text: "Generate covers, illustrations and product shots with saved presets, so a series of images looks like one series.",
    tagline: "On-brief, on-brand",
    long: "Save a palette, a style and an aspect ratio as a preset. Every image you generate from it stays consistent, from the first cover to the fortieth.",
    highlights: [
      { title: "Presets", text: "Store style, palette and framing as a preset you can share with your team." },
      { title: "Four at a time", text: "Each prompt returns four variations. Pick one, then upscale or vary it." },
      { title: "Commercial use", text: "Images generated on paid plans are yours to publish." },
    ],
    stats: [
      { value: 2048, suffix: " px", label: "Output resolution on Pro" },
      { value: 9, suffix: " s", label: "Median time for four images" },
    ],
    prompt: "Generate a cover image for a report on urban heat",
  },
  {
    id: "3",
    slug: "projects-and-memory",
    icon: "layers",
    title: "Projects that remember",
    text: "Keep sources, drafts, images and decisions for each piece of work together. Aster picks up where you left off.",
    tagline: "Context that stays put",
    long: "A project holds everything for one piece of work: the sources, the brief, the style guide and every conversation. Open it next week and Aster still knows what you decided.",
    highlights: [
      { title: "Project briefs", text: "A short brief at the top of the project guides every answer and draft inside it." },
      { title: "Pinned decisions", text: "Pin a message to keep it in context for future questions." },
      { title: "Clean separation", text: "Nothing leaks between projects unless you link them." },
    ],
    stats: [
      { value: 200, suffix: "k", label: "Token context on Aster 2" },
      { value: 0, suffix: "", label: "Projects mixed without your say" },
    ],
    prompt: "What did we decide about the survey sample size?",
  },
  {
    id: "4",
    slug: "models-and-speed",
    icon: "gauge",
    title: "The right model per task",
    text: "Aster 2 for deep research, Aster Swift for quick drafts, Aster Vision for images and scans. Switch mid-conversation.",
    tagline: "Fast when it can be",
    long: "Not every question needs the largest model. Aster routes quick edits to Swift and long research to Aster 2, and you can override it at any point.",
    highlights: [
      { title: "Model picker", text: "Choose a model per message. The conversation keeps its context." },
      { title: "Streaming answers", text: "Text starts appearing in under half a second on Swift." },
      { title: "Usage you can read", text: "A plain dashboard shows what each project used this month." },
    ],
    stats: [
      { value: 0.4, suffix: " s", label: "Time to first token, Swift", decimals: 1 },
      { value: 3, suffix: "", label: "Models included on Pro" },
    ],
    prompt: "Compare PostgreSQL and SQLite for a desktop app",
  },
  {
    id: "5",
    slug: "private-by-default",
    icon: "shield",
    title: "Private by default",
    text: "Your files and conversations are never used for training. Choose EU or US hosting and delete anything at any time.",
    tagline: "Your work stays yours",
    long: "Aster is built for unpublished work. Data is encrypted in transit and at rest, never used to train models, and deleted within 30 days of your request.",
    highlights: [
      { title: "No training on your data", text: "Not by default, not by opt-out. It is simply not done." },
      { title: "Data residency", text: "Team workspaces choose EU (Frankfurt) or US (Virginia) hosting." },
      { title: "Admin controls", text: "SSO, audit log and retention rules for every workspace." },
    ],
    stats: [
      { value: 256, suffix: "-bit", label: "AES encryption at rest" },
      { value: 30, suffix: " days", label: "Maximum time to full deletion" },
    ],
    prompt: "How does Aster handle my uploaded files?",
  },
];

/* ------------------------------------------------------------------ */
/*  Socials (placeholder profile URLs)                                 */
/* ------------------------------------------------------------------ */

export const socials = [
  { id: "0", title: "X", url: "https://x.com" },
  { id: "1", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "2", title: "GitHub", url: "https://github.com" },
  { id: "3", title: "YouTube", url: "https://www.youtube.com" },
];
