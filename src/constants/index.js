import {
  benefitCard1,
  benefitCard2,
  benefitCard3,
  benefitCard4,
  benefitCard5,
  benefitCard6,
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export * from "./content";

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

// `desktop: false` items only show in the mobile menu (desktop users reach
// them through the footer and the Ctrl/Cmd+K command palette).
export const navigation = [
  { id: "0", title: "Features", url: "/features" },
  { id: "1", title: "How to use", url: "/how-to-use" },
  { id: "2", title: "Pricing", url: "/pricing" },
  { id: "3", title: "Roadmap", url: "/roadmap" },
  { id: "4", title: "Integrations", url: "/integrations", desktop: false },
  { id: "5", title: "Blog", url: "/blog", desktop: false },
  { id: "6", title: "About", url: "/about", desktop: false },
  { id: "7", title: "Contact", url: "/contact", desktop: false },
  { id: "8", title: "New account", url: "/signup", onlyMobile: true },
  { id: "9", title: "Sign in", url: "/login", onlyMobile: true },
];

export const footerLinks = [
  {
    title: "Product",
    links: [
      { title: "Features", url: "/features" },
      { title: "How to use", url: "/how-to-use" },
      { title: "Pricing", url: "/pricing" },
      { title: "Integrations", url: "/integrations" },
      { title: "Roadmap", url: "/roadmap" },
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
    title: "Get started",
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

export const heroIcons = [
  { icon: homeSmile, title: "Home", url: "/app" },
  { icon: file02, title: "Documents", url: "/features/ask-anything" },
  { icon: searchMd, title: "Search", url: "/features/fast-responding" },
  { icon: plusSquare, title: "New chat", url: "/app" },
];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  { icon: recording03, title: "Record voice" },
  { icon: recording01, title: "Record screen" },
  { icon: disc02, title: "Generate video" },
  { icon: chromecast, title: "Cast to device" },
  { icon: sliders04, title: "Adjust settings" },
];

/* ------------------------------------------------------------------ */
/*  Roadmap                                                            */
/* ------------------------------------------------------------------ */

export const roadmapStatuses = {
  done: { label: "Done", color: "#7ADB78" },
  progress: { label: "In progress", color: "#FFC876" },
  planned: { label: "Planned", color: "#858DFF" },
};

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "Mar 2026",
    status: "done",
    progress: 100,
    votes: 1284,
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "Q4 2026",
    status: "progress",
    progress: 64,
    votes: 842,
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "Jul 2026",
    status: "done",
    progress: 100,
    votes: 1103,
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "Q4 2026",
    status: "progress",
    progress: 38,
    votes: 967,
    imageUrl: roadmap4,
  },
  {
    id: "4",
    title: "Team workspaces",
    text: "Shared folders, prompt libraries and role-based permissions so whole teams can build on each other's conversations.",
    date: "Q1 2027",
    status: "planned",
    progress: 12,
    votes: 1521,
    imageUrl: roadmap2,
  },
  {
    id: "5",
    title: "Image generation v2",
    text: "A brand-new diffusion pipeline with 4x sharper output, style presets and in-painting directly inside the chat.",
    date: "Sep 2026",
    status: "done",
    progress: 100,
    votes: 2033,
    imageUrl: roadmap1,
  },
  {
    id: "6",
    title: "Offline mode",
    text: "Run a compact on-device model for drafts and quick answers when you are on a plane, in a tunnel or simply off the grid.",
    date: "Q1 2027",
    status: "planned",
    progress: 5,
    votes: 734,
    imageUrl: roadmap4,
  },
  {
    id: "7",
    title: "Plugin marketplace",
    text: "Discover, install and publish community plugins that teach Brainwave brand-new skills in a single click.",
    date: "Q2 2027",
    status: "planned",
    progress: 0,
    votes: 1189,
    imageUrl: roadmap3,
  },
];

/* ------------------------------------------------------------------ */
/*  Collaboration / integrations                                       */
/* ------------------------------------------------------------------ */

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  { id: "0", title: "Seamless Integration", text: collabText },
  { id: "1", title: "Smart Automation" },
  { id: "2", title: "Top-notch Security" },
];

export const integrationCategories = [
  "All",
  "Design",
  "Communication",
  "Productivity",
];

export const collabApps = [
  {
    id: "0",
    slug: "figma",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
    category: "Design",
    installs: "48k",
    description:
      "Generate UI copy, rename layers and turn frames into developer-ready specs without leaving your canvas.",
    capabilities: [
      "Write and localise UI copy right inside frames",
      "Summarise comment threads into action items",
      "Export frames to Brainwave for instant design critique",
    ],
  },
  {
    id: "1",
    slug: "notion",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
    category: "Productivity",
    installs: "62k",
    description:
      "Draft docs, summarise long pages and keep your knowledge base fresh with AI-written updates.",
    capabilities: [
      "Turn chat answers into Notion pages in one click",
      "Ask questions across your whole workspace",
      "Auto-generate meeting notes and weekly digests",
    ],
  },
  {
    id: "2",
    slug: "discord",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
    category: "Communication",
    installs: "91k",
    description:
      "Bring Brainwave into your server as a friendly bot that answers questions, moderates and runs games.",
    capabilities: [
      "Slash commands for answers, images and summaries",
      "Smart moderation with custom rules",
      "Channel recaps for members who were away",
    ],
  },
  {
    id: "3",
    slug: "slack",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
    category: "Communication",
    installs: "77k",
    description:
      "Ask Brainwave in any channel, get thread summaries and draft replies that match your team's tone.",
    capabilities: [
      "Summarise busy threads with one emoji reaction",
      "Draft replies in your team's tone of voice",
      "Daily stand-up digests delivered to a channel",
    ],
  },
  {
    id: "4",
    slug: "photoshop",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
    category: "Design",
    installs: "35k",
    description:
      "Send layers to Brainwave for background removal, generative fill and colour grading suggestions.",
    capabilities: [
      "Generative fill powered by Brainwave Vision",
      "Batch background removal",
      "Colour grading presets from a text prompt",
    ],
  },
  {
    id: "5",
    slug: "protopie",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
    category: "Design",
    installs: "12k",
    description:
      "Describe an interaction in plain English and get a ready-made prototype trigger and response.",
    capabilities: [
      "Text-to-interaction recipes",
      "Realistic placeholder content for prototypes",
      "Usability test scripts generated from your flows",
    ],
  },
  {
    id: "6",
    slug: "framer",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
    category: "Design",
    installs: "29k",
    description:
      "Write landing page copy, generate CMS entries and translate your Framer site in minutes.",
    capabilities: [
      "Section copy that adapts to your layout",
      "Bulk CMS content generation",
      "One-click site translation",
    ],
  },
  {
    id: "7",
    slug: "raindrop",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
    category: "Productivity",
    installs: "18k",
    description:
      "Let Brainwave read, tag and summarise every bookmark so your research is always one question away.",
    capabilities: [
      "Automatic tagging and collections",
      "Ask questions across saved articles",
      "Weekly reading digest with key takeaways",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

export const pricing = [
  {
    id: "0",
    slug: "basic",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    monthly: 0,
    annual: 0,
    cta: "Get started",
    url: "/signup?plan=basic",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    slug: "premium",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    monthly: 9.99,
    annual: 7.99,
    popular: true,
    cta: "Get started",
    url: "/signup?plan=premium",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    slug: "enterprise",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    monthly: null,
    annual: null,
    cta: "Contact us",
    url: "/contact?topic=sales",
    features: [
      "A custom AI chatbot trained on your company knowledge",
      "Advanced analytics, SSO and audit logs",
      "A dedicated account manager and 99.9% uptime SLA",
    ],
  },
];

export const pricingComparison = [
  {
    group: "Chat",
    rows: [
      { label: "Messages per month", values: ["100", "Unlimited", "Unlimited"] },
      { label: "Advanced reasoning model", values: [false, true, true] },
      { label: "Conversation history", values: ["7 days", "Forever", "Forever"] },
      { label: "Voice conversations", values: [false, true, true] },
    ],
  },
  {
    group: "Create",
    rows: [
      { label: "Image generations", values: ["10 / mo", "500 / mo", "Custom"] },
      { label: "Photo enhance", values: [true, true, true] },
      { label: "Video generation", values: [false, "Beta", true] },
    ],
  },
  {
    group: "Workspace",
    rows: [
      { label: "Integrations", values: ["2", "All", "All + custom"] },
      { label: "Analytics dashboard", values: [false, true, true] },
      { label: "SSO & audit logs", values: [false, false, true] },
      { label: "Support", values: ["Community", "Priority", "Dedicated manager"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Features (benefits)                                                */
/* ------------------------------------------------------------------ */

export const benefits = [
  {
    id: "0",
    slug: "ask-anything",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: benefitCard1,
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    tagline: "Answers, not links",
    long: "Brainwave reads, reasons and summarises so you don't have to open twenty tabs. Ask a question in plain language and get a clear answer with the context you need to act on it.",
    highlights: [
      { title: "Plain-language questions", text: "No prompt engineering required: just ask like you would ask a colleague." },
      { title: "Follow-up friendly", text: "Brainwave remembers the thread so you can dig deeper without repeating yourself." },
      { title: "Cites its sources", text: "Every answer can show where its facts came from, so you can double-check in a click." },
    ],
    stats: [
      { value: 3.2, suffix: "s", label: "Average answer time" },
      { value: 94, suffix: "%", label: "Answers rated helpful" },
    ],
    prompt: "Explain quantum computing like I'm five",
  },
  {
    id: "1",
    slug: "improve-everyday",
    title: "Improve everyday",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: benefitCard2,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
    tagline: "Learns your style",
    long: "The more you use Brainwave, the better it gets at matching your tone, preferred formats and favourite tools. Personal memory is opt-in and you can wipe it at any time.",
    highlights: [
      { title: "Personal memory", text: "Brainwave remembers your preferences, projects and writing style." },
      { title: "Smart suggestions", text: "Get proactive ideas based on what you are working on today." },
      { title: "Weekly insights", text: "See how much time you saved and which prompts work best for you." },
    ],
    stats: [
      { value: 6, suffix: "h", label: "Saved per week on average" },
      { value: 120, suffix: "+", label: "Languages understood" },
    ],
    prompt: "Write a friendly follow-up email to a client",
  },
  {
    id: "2",
    slug: "connect-everywhere",
    title: "Connect everywhere",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: benefitCard3,
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
    tagline: "Every device, one brain",
    long: "Start a conversation on your laptop, continue it on your phone and finish it in Slack. Brainwave syncs instantly across web, desktop, mobile and the tools your team already uses.",
    highlights: [
      { title: "Real-time sync", text: "Conversations follow you across every device in milliseconds." },
      { title: "Native apps", text: "Fast, lightweight apps for macOS, Windows, iOS and Android." },
      { title: "Works in your tools", text: "Use Brainwave inside Slack, Notion, Figma and more." },
    ],
    stats: [
      { value: 8, suffix: "", label: "Native integrations" },
      { value: 5, suffix: "", label: "Platforms supported" },
    ],
    prompt: "Summarise this week's Slack threads",
  },
  {
    id: "3",
    slug: "fast-responding",
    title: "Fast responding",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: benefitCard4,
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
    tagline: "Built for speed",
    long: "Responses start streaming in well under a second thanks to our edge inference network. Less waiting, more doing, even for long, complex answers.",
    highlights: [
      { title: "Streaming answers", text: "Read the response as it is written, word by word." },
      { title: "Edge network", text: "Requests are served from the region closest to you." },
      { title: "Turbo mode", text: "Switch to a lighter model for instant drafts and brainstorming." },
    ],
    stats: [
      { value: 280, suffix: "ms", label: "Time to first token" },
      { value: 99.9, suffix: "%", label: "Uptime last 12 months" },
    ],
    prompt: "Give me 5 startup ideas in 10 seconds",
  },
  {
    id: "4",
    slug: "create-visuals",
    title: "Create visuals",
    text: "Turn a single sentence into artwork, product shots or social graphics in seconds with the built-in image studio.",
    backgroundUrl: benefitCard5,
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    tagline: "From words to pixels",
    long: "Describe what you see in your head and Brainwave paints it. Pick a style, tweak the aspect ratio and iterate with natural-language edits like \"make it more neon\".",
    highlights: [
      { title: "Style presets", text: "Cinematic, neon, anime, photoreal and more, one tap away." },
      { title: "Conversational edits", text: "Refine any image by simply telling Brainwave what to change." },
      { title: "Commercial use", text: "Everything you generate on a paid plan is yours to use." },
    ],
    stats: [
      { value: 4, suffix: "x", label: "Sharper than v1" },
      { value: 12, suffix: "M", label: "Images generated" },
    ],
    prompt: "Generate a neon robot illustration",
  },
  {
    id: "5",
    slug: "private-by-design",
    title: "Private by design",
    text: "Your conversations are encrypted and never used to train models without your explicit consent.",
    backgroundUrl: benefitCard6,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    tagline: "Your data stays yours",
    long: "Security is not an add-on. Brainwave encrypts data in transit and at rest, offers regional data residency and gives you full control to export or delete everything.",
    highlights: [
      { title: "Encryption everywhere", text: "TLS 1.3 in transit and AES-256 at rest by default." },
      { title: "No training on your data", text: "Your chats are never used to train models unless you opt in." },
      { title: "Admin controls", text: "SSO, audit logs and retention policies for teams." },
    ],
    stats: [
      { value: 256, suffix: "-bit", label: "AES encryption" },
      { value: 0, suffix: "", label: "Chats used for training" },
    ],
    prompt: "How does Brainwave keep my data private?",
  },
];

/* ------------------------------------------------------------------ */
/*  Socials (placeholder profile URLs - replace with real handles)     */
/* ------------------------------------------------------------------ */

export const socials = [
  { id: "0", title: "Discord", iconUrl: discordBlack, url: "https://discord.com" },
  { id: "1", title: "Twitter", iconUrl: twitter, url: "https://x.com" },
  { id: "2", title: "Instagram", iconUrl: instagram, url: "https://www.instagram.com" },
  { id: "3", title: "Telegram", iconUrl: telegram, url: "https://telegram.org" },
  { id: "4", title: "Facebook", iconUrl: facebook, url: "https://www.facebook.com" },
];
