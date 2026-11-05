# Brainwave – AI chat app marketing site

A multi-page, front-end-only marketing site and product demo for **Brainwave**, a fictional AI chat
assistant. Everything interactive (chat, image generation, sign-in, forms) is a polished **mock** that
runs entirely in the browser: there is no backend and no real AI calls.

Built with **Vite 5**, **React 18**, **React Router 6**, **Tailwind CSS 3** and `react-just-parallax`.

## Getting started

```bash
npm install
npm run dev       # start the dev server on http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint (zero warnings allowed)
```

Node 18+ is recommended.

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page: hero, features, live chat demo, collaboration, services, testimonials, pricing, roadmap, CTA |
| `/features` | All features, animated stats, in-depth spotlights, live chat demo |
| `/features/:slug` | Feature detail (6 features) with highlights, stats, a feature-specific chat demo and prev/next navigation |
| `/how-to-use` | Product tour (auto-advancing stepper), image generation studio, services, shortcuts, FAQ |
| `/pricing` | Plans with monthly/annual toggle, team seat calculator, comparison table, FAQ |
| `/roadmap` | Overall progress ring, status filters, sorting, upvotes, changelog timeline, "suggest a feature" form |
| `/integrations` | Searchable / filterable integration directory |
| `/integrations/:slug` | Integration detail with mock "Connect" flow and related integrations |
| `/about` | Mission, values, story timeline, team, testimonials |
| `/blog`, `/blog/:slug` | Blog index (featured post, category filter, search) and 6 articles with reading progress and share actions |
| `/careers`, `/careers/:slug` | Perks, department filter, 5 job descriptions with a validated mock application form |
| `/contact` | Contact channels, validated contact form (pre-selects topic via `?topic=`), quick-answer FAQ |
| `/login`, `/signup` | Mock auth: validation, show/hide password, strength meter, reset-password flow, success states |
| `/app` | Mock chat dashboard: conversation history (saved in `localStorage`), model picker, streaming replies |
| `/privacy`, `/terms` | Legal pages with a scroll-spy table of contents (placeholder copy) |
| `*` | Styled 404 page |

## Mock interactive features

- **AI chat demo** (home, features, feature pages, `/app`): suggested prompts, typing indicator,
  character-by-character streamed canned answers with light markdown (lists, bold, code blocks),
  stop generating, regenerate (with version counter), copy to clipboard, thumbs up/down, mock voice
  input and attachment buttons.
- **Chat dashboard** (`/app`): new chat, searchable conversation list grouped by date, delete,
  persistence in `localStorage`, model switcher (Turbo streams faster), mobile drawer sidebar.
- **Image studio** (`/how-to-use#studio`): prompt ideas, style presets, aspect ratios, staged progress
  bar with skeleton shimmer, result reveal using bundled artwork + CSS style filters, history strip,
  download.
- **Pricing**: animated price change between monthly/annual billing, seat calculator with volume
  discounts and animated totals, comparison table.
- **Roadmap**: filters, sorting, progress bars that fill on scroll, upvotes, progress ring.
- **Command palette**: press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> (or the search button in the
  header) to jump to any page, feature, integration, article or job.
- **Forms**: login, signup, contact, job application, newsletter and feature suggestions all have
  client-side validation, loading and success states, plus toast notifications.
- Scroll-reveal animations, testimonial marquee, count-up stats, hover effects. All motion respects
  `prefers-reduced-motion`.

## Project structure

```
src/
  App.jsx                 route table (pages are lazy-loaded)
  main.jsx                BrowserRouter + Toast + Command palette providers
  assets/                 images (heavy images converted to WebP) and SVG components
  components/
    layout/               Layout (header/footer shell), ScrollToTop, CommandPalette, PageLoader
    chat/                 ChatWindow, ChatMessage, ChatComposer, Markdown, TypingIndicator
    ui/                   Reveal, Modal, Accordion, Marquee, Field, SegmentedControl, PageHero, Icon …
    design/               decorative pieces from the original design (rings, gradients, curves)
    *.jsx                 landing sections and shared blocks (Hero, Benefits, Pricing, Roadmap …)
  constants/              navigation, features, pricing, roadmap, integrations (index.js)
                          blog, jobs, team, testimonials, chat responses, legal copy (content.js)
  hooks/                  usePageMeta, useMockChat, useInView, useAnimatedNumber, useToast …
  lib/                    small utilities and the mock "AI" response picker
  pages/                  one file per route
```

Content is data-driven: add a blog post, job, feature or integration in `src/constants` and its
list entry, detail page and command-palette entry appear automatically.

## Deployment

This is a single-page app using the History API, so the host must rewrite unknown paths to
`index.html` for deep links (e.g. `/blog/some-post`) to work:

- **Vercel**: `vercel.json` (included) rewrites everything to `/index.html` and caches hashed assets.
- **Netlify**: `public/_redirects` (included) does the same.
- Other hosts: configure an equivalent SPA fallback.

Per-page `<title>`, meta description and Open Graph tags are set client-side by `usePageMeta`;
`index.html` contains the defaults and `public/og-image.jpg` is the share image.

## Placeholders to replace before going live

- Social links in `src/constants/index.js` point to the platforms' home pages.
- All people, companies, stats, prices, testimonials, articles and legal text are mock content.
- `og:url` is relative; set your production domain in `index.html` if you need absolute URLs.
