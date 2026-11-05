import {
  benefitImage2,
  hero,
  notification1,
  notification2,
  notification3,
  notification4,
  robot,
  roadmap2,
  roadmap3,
  roadmap4,
  service1,
  service2,
  service3,
} from "../assets";

/* ------------------------------------------------------------------ */
/*  Social proof                                                       */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    id: "0",
    name: "Maya Thompson",
    role: "Product Designer, Lumen",
    avatar: notification1,
    text: "Brainwave replaced three tools in my workflow. I sketch an idea, ask for copy and get a mockup before my coffee gets cold.",
  },
  {
    id: "1",
    name: "Daniel Okafor",
    role: "Founder, Stackwise",
    avatar: notification2,
    text: "The answers are fast and actually useful. Our support team cut first-response time in half in the first month.",
  },
  {
    id: "2",
    name: "Sofia Marin",
    role: "Content Lead, Northwind",
    avatar: notification3,
    text: "The image studio is ridiculous. We generate a full week of social graphics in one afternoon now.",
  },
  {
    id: "3",
    name: "Kenji Watanabe",
    role: "Staff Engineer, Orbit",
    avatar: notification4,
    text: "I use it as a rubber duck that talks back. Code explanations are clear and it never gets tired of my questions.",
  },
  {
    id: "4",
    name: "Amara Diallo",
    role: "Marketing Manager, Brightly",
    avatar: notification2,
    text: "Slack summaries alone are worth the subscription. I finally start Mondays without 400 unread messages.",
  },
  {
    id: "5",
    name: "Lucas Brennan",
    role: "Student, TU Delft",
    avatar: notification3,
    text: "It explains concepts the way my professors wish they could. Exam season is way less scary now.",
  },
];

export const stats = [
  { id: "0", value: 2.4, suffix: "M", label: "Monthly active users", decimals: 1 },
  { id: "1", value: 180, suffix: "M", label: "Messages answered", decimals: 0 },
  { id: "2", value: 120, suffix: "+", label: "Countries", decimals: 0 },
  { id: "3", value: 4.9, suffix: "/5", label: "Average app rating", decimals: 1 },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const pricingFaq = [
  {
    q: "Is the Basic plan really free?",
    a: "Yes. Basic is free forever with 100 messages and 10 image generations every month. No credit card required to sign up.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual plans are billed once a year and save you 20% compared with paying monthly. You can switch between monthly and annual at any time from your account settings.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Absolutely. You can cancel in two clicks and keep access until the end of your billing period. We never lock your data: export everything whenever you like.",
  },
  {
    q: "Do you offer discounts for teams?",
    a: "Teams of 10 or more seats get automatic volume discounts. Use the seat calculator on this page to see your price, or contact sales for Enterprise pricing.",
  },
  {
    q: "Is my data used to train your models?",
    a: "No. Conversations are never used for training unless you explicitly opt in. Enterprise workspaces can also choose their data residency region.",
  },
  {
    q: "Do you have student or non-profit pricing?",
    a: "Yes. Students and registered non-profits get 50% off Premium. Reach out through the contact page with proof of eligibility.",
  },
];

/* ------------------------------------------------------------------ */
/*  Product tour                                                       */
/* ------------------------------------------------------------------ */

export const tourSteps = [
  {
    id: "0",
    title: "Create your account",
    text: "Sign up with your email in under 30 seconds. No credit card, no setup wizard, just a blank chat waiting for your first question.",
    image: robot,
    tip: "Tip: invite teammates later from Settings, Workspace.",
  },
  {
    id: "1",
    title: "Ask your first question",
    text: "Type anything or pick a suggested prompt. Brainwave streams the answer in real time and keeps the context for follow-ups.",
    image: service1,
    tip: "Tip: press / to focus the message box from anywhere.",
  },
  {
    id: "2",
    title: "Generate and edit images",
    text: "Switch to the image studio, describe what you want and pick a style. Refine it with natural-language edits until it is perfect.",
    image: service2,
    tip: "Tip: add \"--wide\" to any prompt for a 16:9 result.",
  },
  {
    id: "3",
    title: "Connect your tools",
    text: "Link Slack, Notion, Figma and more so Brainwave can summarise threads, draft docs and critique designs where you work.",
    image: service3,
    tip: "Tip: every integration can be disconnected with one click.",
  },
];

export const imageStyles = [
  { id: "cinematic", label: "Cinematic", filter: "contrast(1.1) saturate(1.1)" },
  { id: "neon", label: "Neon", filter: "hue-rotate(250deg) saturate(1.6) contrast(1.1)" },
  { id: "anime", label: "Anime", filter: "saturate(1.8) brightness(1.05)" },
  { id: "noir", label: "Noir", filter: "grayscale(1) contrast(1.25)" },
  { id: "vapor", label: "Vaporwave", filter: "hue-rotate(140deg) saturate(1.4)" },
];

export const imageAspects = [
  { id: "1:1", label: "1:1", className: "aspect-square" },
  { id: "4:3", label: "4:3", className: "aspect-[4/3]" },
  { id: "16:9", label: "16:9", className: "aspect-video" },
];

export const generatedImagePool = [
  service1,
  service2,
  service3,
  robot,
  hero,
  roadmap2,
  roadmap3,
  roadmap4,
];

export const imagePromptIdeas = [
  "A friendly robot reading a book in a neon library",
  "Retro-futuristic city skyline at dusk",
  "Astronaut floating above a purple ocean",
  "Minimal product shot of headphones on marble",
];

/* ------------------------------------------------------------------ */
/*  Roadmap changelog                                                  */
/* ------------------------------------------------------------------ */

export const changelog = [
  {
    version: "2.4.0",
    date: "October 28, 2026",
    title: "Gamification preview",
    items: [
      { type: "New", text: "Daily streaks and achievement badges (beta)." },
      { type: "Improved", text: "Conversation search is now 3x faster." },
      { type: "Fixed", text: "Images occasionally failing to load on Safari." },
    ],
  },
  {
    version: "2.3.0",
    date: "September 16, 2026",
    title: "Image generation v2",
    items: [
      { type: "New", text: "Style presets and aspect ratio controls in the image studio." },
      { type: "New", text: "In-painting: select an area and describe the change." },
      { type: "Improved", text: "Output resolution increased to 2048px." },
    ],
  },
  {
    version: "2.2.0",
    date: "July 9, 2026",
    title: "Make it yours",
    items: [
      { type: "New", text: "Custom assistant names, avatars and personalities." },
      { type: "Improved", text: "Dark theme contrast and keyboard navigation." },
    ],
  },
  {
    version: "2.1.0",
    date: "March 21, 2026",
    title: "Talk to Brainwave",
    items: [
      { type: "New", text: "Voice conversations with 30+ natural voices." },
      { type: "Fixed", text: "Copy button now preserves code formatting." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export const team = [
  { id: "0", name: "Elena Novak", role: "Co-founder & CEO", avatar: notification1 },
  { id: "1", name: "Marcus Lee", role: "Co-founder & CTO", avatar: notification2 },
  { id: "2", name: "Priya Raman", role: "Head of Design", avatar: notification3 },
  { id: "3", name: "Tomás García", role: "Head of AI Research", avatar: notification4 },
];

export const values = [
  {
    id: "0",
    title: "Curiosity first",
    text: "We build the assistant we always wanted: one that makes learning and creating feel effortless.",
  },
  {
    id: "1",
    title: "Privacy is a feature",
    text: "Trust is earned. We collect as little as possible and are transparent about everything else.",
  },
  {
    id: "2",
    title: "Ship, learn, repeat",
    text: "Small teams, short cycles and a public roadmap that our community helps shape every week.",
  },
];

export const milestones = [
  { year: "2023", text: "Brainwave starts as a weekend project between two friends." },
  { year: "2024", text: "Public beta launches; 100k people join the waitlist in a week." },
  { year: "2025", text: "Series A, native apps and the first eight integrations." },
  { year: "2026", text: "Voice, image generation v2 and 2.4M monthly users." },
];

/* ------------------------------------------------------------------ */
/*  Careers                                                            */
/* ------------------------------------------------------------------ */

export const perks = [
  { id: "0", title: "Remote-first", text: "Work from anywhere within ±4h of CET, with yearly team offsites." },
  { id: "1", title: "Learning budget", text: "$2,000 a year for courses, books and conferences." },
  { id: "2", title: "Health & wellbeing", text: "Private health insurance and a monthly wellness stipend." },
  { id: "3", title: "Real ownership", text: "Meaningful equity for every full-time team member." },
];

export const jobs = [
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote, Europe",
    type: "Full-time",
    salary: "€85k – €110k",
    summary:
      "Craft the fast, delightful interfaces millions of people use to talk to Brainwave every day.",
    responsibilities: [
      "Own major surfaces of the web app, from chat to the image studio",
      "Build a shared component library with our design team",
      "Push performance budgets and accessibility standards",
    ],
    requirements: [
      "5+ years building production React applications",
      "Deep understanding of browser performance and accessibility",
      "A good eye for motion and interaction details",
    ],
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    department: "AI Research",
    location: "Remote, Worldwide",
    type: "Full-time",
    salary: "$140k – $180k",
    summary:
      "Train, evaluate and ship the models that power Brainwave's answers, voice and images.",
    responsibilities: [
      "Fine-tune and evaluate large language and diffusion models",
      "Design evaluation suites that reflect real user needs",
      "Collaborate with product to bring research into production",
    ],
    requirements: [
      "Strong Python and PyTorch experience",
      "Experience training or fine-tuning large models",
      "Clear written communication",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Lisbon or Remote",
    type: "Full-time",
    salary: "€70k – €90k",
    summary:
      "Shape how people collaborate with AI, from first prompt to finished project.",
    responsibilities: [
      "Lead end-to-end design for new product areas",
      "Prototype interactions and test them with real users",
      "Evolve the Brainwave design language",
    ],
    requirements: [
      "A portfolio that shows strong interaction and visual design",
      "Comfort prototyping in Figma, Protopie or code",
      "Experience designing for complex, data-rich products",
    ],
  },
  {
    slug: "developer-advocate",
    title: "Developer Advocate",
    department: "Marketing",
    location: "Remote, Americas",
    type: "Full-time",
    salary: "$110k – $135k",
    summary:
      "Help developers build amazing things on top of the Brainwave platform and plugin marketplace.",
    responsibilities: [
      "Create tutorials, demos and sample apps",
      "Speak at meetups and conferences",
      "Turn community feedback into product improvements",
    ],
    requirements: [
      "Hands-on experience building with APIs",
      "A track record of technical writing or speaking",
      "Genuine love for developer communities",
    ],
  },
  {
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    department: "Operations",
    location: "Remote, Europe",
    type: "Contract",
    salary: "€50k – €65k",
    summary:
      "Be the trusted partner for our Enterprise customers as they roll Brainwave out to their teams.",
    responsibilities: [
      "Onboard new Enterprise workspaces",
      "Run quarterly business reviews",
      "Advocate for customer needs inside the product team",
    ],
    requirements: [
      "3+ years in customer success for a SaaS product",
      "Excellent communication in English",
      "Comfortable with analytics and reporting tools",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Blog                                                               */
/* ------------------------------------------------------------------ */

export const blogCategories = ["All", "Product", "Guides", "Engineering", "Company"];

export const blogPosts = [
  {
    slug: "introducing-image-generation-v2",
    title: "Introducing image generation v2",
    excerpt:
      "Sharper output, style presets and in-painting. Here is everything that is new in the Brainwave image studio.",
    category: "Product",
    date: "Sep 16, 2026",
    readTime: "5 min read",
    cover: service2,
    author: { name: "Priya Raman", role: "Head of Design", avatar: notification3 },
    body: [
      { type: "p", text: "When we launched the image studio last year, we were blown away by what you created. Today we are shipping the biggest upgrade yet: a new diffusion pipeline that produces images four times sharper, with far better control over style and composition." },
      { type: "h2", text: "Style presets" },
      { type: "p", text: "Pick from Cinematic, Neon, Anime, Noir and Vaporwave to instantly change the look of your image. Presets are tuned by our design team and work with any prompt." },
      { type: "h2", text: "In-painting inside the chat" },
      { type: "p", text: "Select any region of an image and describe what should change. Swap a background, add a character or fix a detail without starting over." },
      { type: "quote", text: "The fastest way to get an image right is to have a conversation about it." },
      { type: "h2", text: "What's next" },
      { type: "list", items: ["Video generation for Premium users", "Brand kits with your colours and fonts", "Batch generation for social campaigns"] },
    ],
  },
  {
    slug: "10-prompts-to-boost-productivity",
    title: "10 prompts that will boost your productivity",
    excerpt:
      "From inbox zero to meeting prep, these battle-tested prompts save our team hours every week.",
    category: "Guides",
    date: "Oct 2, 2026",
    readTime: "7 min read",
    cover: service1,
    author: { name: "Elena Novak", role: "Co-founder & CEO", avatar: notification1 },
    body: [
      { type: "p", text: "Great prompts are like keyboard shortcuts for your brain. We asked everyone at Brainwave to share the prompts they use most, and these ten came up again and again." },
      { type: "h2", text: "Planning your day" },
      { type: "code", text: "Here are my tasks for today: [paste]. Group them by energy level and suggest an order." },
      { type: "p", text: "Brainwave is surprisingly good at spotting which tasks can be batched together and which ones deserve your sharpest hours." },
      { type: "h2", text: "Writing faster" },
      { type: "list", items: ["Turn bullet points into a friendly email", "Rewrite this paragraph to be half as long", "Give me three subject lines for this newsletter"] },
      { type: "h2", text: "Learning anything" },
      { type: "p", text: "Ask Brainwave to explain a concept at three levels: to a child, to a student and to an expert. Reading all three is a shortcut to real understanding." },
    ],
  },
  {
    slug: "how-we-made-responses-3x-faster",
    title: "How we made responses 3x faster",
    excerpt:
      "A look under the hood at the edge inference network that powers Brainwave's streaming answers.",
    category: "Engineering",
    date: "Aug 21, 2026",
    readTime: "9 min read",
    cover: service3,
    author: { name: "Marcus Lee", role: "Co-founder & CTO", avatar: notification2 },
    body: [
      { type: "p", text: "Latency is a feature. Every 100ms we shave off the time to first token measurably increases how much people enjoy using Brainwave. This post explains how we went from 900ms to under 300ms." },
      { type: "h2", text: "Moving inference to the edge" },
      { type: "p", text: "We now run smaller draft models in twelve regions and only route complex reasoning to our central clusters. Most requests never leave your continent." },
      { type: "code", text: "p50 time-to-first-token: 280ms\np95 time-to-first-token: 610ms" },
      { type: "h2", text: "Speculative decoding" },
      { type: "p", text: "A fast draft model proposes several tokens at once and the larger model verifies them in a single pass. When the draft is right, which is most of the time, you get multiple tokens for the price of one." },
      { type: "quote", text: "The best optimisation is the request you never have to make." },
    ],
  },
  {
    slug: "brainwave-raises-series-a",
    title: "Brainwave raises a $24M Series A",
    excerpt:
      "We are doubling down on privacy, native apps and the integrations you asked for most.",
    category: "Company",
    date: "Jun 4, 2026",
    readTime: "3 min read",
    cover: hero,
    author: { name: "Elena Novak", role: "Co-founder & CEO", avatar: notification1 },
    body: [
      { type: "p", text: "Today we are excited to share that Brainwave has raised a $24M Series A to help everyone think, write and create with AI." },
      { type: "h2", text: "What the funding is for" },
      { type: "list", items: ["Growing our research team", "Native apps for every platform", "A public plugin marketplace", "Regional data residency"] },
      { type: "p", text: "Most importantly, nothing changes about our commitment to privacy: your conversations remain yours." },
    ],
  },
  {
    slug: "designing-a-calm-ai-interface",
    title: "Designing a calm AI interface",
    excerpt:
      "Why we chose dark surfaces, soft gradients and subtle motion for an assistant you use all day.",
    category: "Product",
    date: "May 12, 2026",
    readTime: "6 min read",
    cover: robot,
    author: { name: "Priya Raman", role: "Head of Design", avatar: notification3 },
    body: [
      { type: "p", text: "An assistant you use for hours a day should feel like a quiet studio, not a casino. Here are the principles behind the Brainwave interface." },
      { type: "h2", text: "Dark, but never flat" },
      { type: "p", text: "Our surfaces are layered in subtle shades of violet so depth is communicated without heavy shadows. Gradients are reserved for moments that matter." },
      { type: "h2", text: "Motion with meaning" },
      { type: "p", text: "Animations explain what is happening: a streaming caret, a progress ring while an image renders. If motion is not helping, it goes. And it always respects your reduced-motion setting." },
      { type: "quote", text: "Good interfaces feel inevitable." },
    ],
  },
  {
    slug: "getting-started-with-integrations",
    title: "Getting started with integrations",
    excerpt:
      "Connect Slack, Notion and Figma in minutes and let Brainwave work where your team already does.",
    category: "Guides",
    date: "Apr 3, 2026",
    readTime: "4 min read",
    cover: benefitImage2,
    author: { name: "Tomás García", role: "Head of AI Research", avatar: notification4 },
    body: [
      { type: "p", text: "Integrations turn Brainwave from a chat window into a teammate. This guide walks you through connecting your first tool." },
      { type: "h2", text: "1. Open the integrations page" },
      { type: "p", text: "Head to Integrations, search for the tool you want and open its page." },
      { type: "h2", text: "2. Connect and authorise" },
      { type: "p", text: "Click Connect and approve the requested permissions. You can review and revoke access at any time." },
      { type: "h2", text: "3. Try a starter prompt" },
      { type: "code", text: "/brainwave summarise this thread" },
      { type: "p", text: "That's it. Brainwave will reply right in the thread with a concise summary and action items." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Mock chat                                                          */
/* ------------------------------------------------------------------ */

export const chatModels = [
  { id: "brainwave-2", label: "Brainwave 2.0", description: "Best for complex tasks" },
  { id: "brainwave-turbo", label: "Brainwave Turbo", description: "Fastest responses" },
  { id: "brainwave-vision", label: "Brainwave Vision", description: "Images and documents" },
];

export const suggestedPrompts = [
  "Explain quantum computing like I'm five",
  "Write a friendly follow-up email to a client",
  "Give me 5 startup ideas in 10 seconds",
  "Write a JavaScript debounce function",
];

export const cannedResponses = [
  {
    keywords: ["quantum"],
    text: "Imagine you have a magic coin. A normal coin is either **heads** or **tails**. A quantum coin can be a little bit of both at the same time, until you look at it!\n\nQuantum computers use these magic coins, called **qubits**, to try many answers at once:\n\n- Normal computers check one path at a time\n- Quantum computers explore lots of paths together\n- That makes them great at puzzles like chemistry and cryptography\n\nThey're still very young, a bit like a toddler learning to walk, but they're getting stronger every year.",
  },
  {
    keywords: ["email", "follow-up", "follow up", "client"],
    text: "Here's a friendly follow-up you can send:\n\n**Subject:** Quick follow-up on our chat\n\nHi Alex,\n\nThanks again for taking the time to meet last week. I really enjoyed hearing about your plans for the new launch.\n\nI've attached the proposal we discussed. Happy to jump on a quick call if anything needs tweaking.\n\nBest,\nSam\n\nWant me to make it more formal or shorter?",
  },
  {
    keywords: ["startup", "ideas", "idea"],
    text: "Five quick startup ideas:\n\n1. **PlantPal**: AI that diagnoses sick houseplants from a photo\n2. **MeetLess**: turns recurring meetings into async video updates\n3. **ChefBot**: weekly meal plans built from what's already in your fridge\n4. **StudyBuddy**: flashcards auto-generated from lecture recordings\n5. **LocalLoop**: hyper-local marketplace for borrowing tools from neighbours\n\nWant me to sketch a business model for any of these?",
  },
  {
    keywords: ["debounce", "javascript", "code", "function"],
    text: "Here's a small, dependency-free debounce:\n\n```js\nfunction debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n```\n\nCall it like `const onSearch = debounce(search, 250)` and the function only runs once the user stops typing for 250ms.",
  },
  {
    keywords: ["image", "generate", "draw", "picture", "illustration"],
    text: "I'd love to! Open the **image studio** on the How to use page, describe your idea and pick a style like *Neon* or *Cinematic*.\n\nPro tip: be specific about lighting and mood, e.g. \"a friendly robot, soft rim light, purple haze\".",
  },
  {
    keywords: ["private", "privacy", "data", "secure", "security"],
    text: "Great question. Brainwave keeps your data private by default:\n\n- Conversations are encrypted in transit (TLS 1.3) and at rest (AES-256)\n- Your chats are **never** used for training unless you opt in\n- You can export or delete everything at any time\n\nTeams on Enterprise also get SSO, audit logs and data residency.",
  },
  {
    keywords: ["slack", "summar*"],
    text: "Here's a summary of this week's highlights:\n\n- **#product**: v2.4 shipped on Tuesday; feedback is very positive\n- **#design**: new onboarding illustrations are ready for review\n- **#support**: response time dropped to 14 minutes on average\n\nAction items: review onboarding art (Priya) and plan the gamification beta (Marcus).",
  },
  {
    keywords: ["price", "pricing", "cost", "plan"],
    text: "Brainwave has three plans:\n\n- **Basic**: free forever\n- **Premium**: $9.99/month, or $7.99/month billed annually\n- **Enterprise**: custom pricing with SSO and a dedicated manager\n\nYou can compare everything on the Pricing page.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    text: "Hey there! 👋 I'm Brainwave, your AI assistant. I can answer questions, write and edit text, explain code or help you brainstorm. What are you working on today?",
  },
];

export const fallbackResponses = [
  "That's a great question! In this demo I'm running on canned answers, but the real Brainwave would dig into it right away.\n\nTry one of the suggested prompts to see what a full answer looks like.",
  "Interesting! Here's how I'd approach it:\n\n1. Clarify the goal you want to reach\n2. Break it into small, testable steps\n3. Start with the step that unblocks the most\n\nWant me to go deeper on any of these?",
  "I love that idea. Let me think out loud:\n\n- What's the simplest version that would still be useful?\n- Who benefits most from it?\n- What would make it delightful instead of just functional?\n\nTell me a bit more and I'll help you refine it.",
];

/* ------------------------------------------------------------------ */
/*  Legal                                                              */
/* ------------------------------------------------------------------ */

export const legalUpdated = "November 1, 2026";

export const privacySections = [
  { id: "overview", title: "Overview", body: ["This Privacy Policy explains what information Brainwave collects, how we use it and the choices you have. We collect as little as possible and never sell your personal data.", "This is a demo website. The text below is illustrative placeholder content and does not constitute a legal agreement."] },
  { id: "data-we-collect", title: "Information we collect", body: ["Account information such as your name and email address.", "Content you provide, including messages, prompts and uploaded files, which is stored encrypted.", "Basic usage data such as device type and feature usage, collected in aggregate to improve the product."] },
  { id: "how-we-use", title: "How we use information", body: ["To provide, maintain and improve Brainwave.", "To communicate with you about your account and, if you opt in, product news.", "We never use your conversations to train models unless you explicitly opt in."] },
  { id: "sharing", title: "Sharing", body: ["We share data only with service providers who help us operate Brainwave, under strict contractual obligations, or when required by law."] },
  { id: "retention", title: "Retention & deletion", body: ["You can export or delete your data at any time from Settings. Deleted conversations are removed from our systems within 30 days."] },
  { id: "contact", title: "Contact", body: ["Questions about privacy? Reach our team through the contact page and choose \"Privacy\" as the topic."] },
];

export const termsSections = [
  { id: "acceptance", title: "Acceptance of terms", body: ["By using Brainwave you agree to these Terms of Service. If you use Brainwave on behalf of an organisation, you agree on its behalf.", "This is a demo website. The text below is illustrative placeholder content and does not constitute a legal agreement."] },
  { id: "accounts", title: "Your account", body: ["You are responsible for keeping your login details secure and for all activity under your account."] },
  { id: "acceptable-use", title: "Acceptable use", body: ["Don't use Brainwave to break the law, harm others, generate malware or infringe on anyone's rights.", "We may suspend accounts that violate these rules."] },
  { id: "content", title: "Your content", body: ["You own the content you create with Brainwave. You grant us a limited licence to process it only to provide the service."] },
  { id: "billing", title: "Billing", body: ["Paid plans renew automatically until cancelled. You can cancel at any time and keep access until the end of the billing period."] },
  { id: "liability", title: "Limitation of liability", body: ["Brainwave is provided \"as is\". AI output can be inaccurate; please review important information before relying on it."] },
];
