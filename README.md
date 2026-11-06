# Aster AI

Aster is a concept product designed and built by **Yaroslav Tsarenko**: an AI assistant for research, writing and images. Aster answers from your own sources and puts a citation on every claim. It also drafts text in your voice and generates images from saved presets.

This is a **front-end-only** concept. No real AI, accounts or payments sit behind it. The chat, image generation, sign-in and every form are mocked in the browser.

## What is inside

- **Marketing site:** home, product overview, six feature pages, how it works (tour and image studio), pricing (seat calculator and comparison table), integrations, roadmap and changelog, blog, careers, about, contact, legal pages and a 404 page.
- **Demo app (`/app`):** a chat with streaming prepared answers and numbered citations. It has a model picker, chat history stored in `localStorage`, search, regenerate, stop, copy and feedback.
- **Image studio mock:** style presets and aspect ratios. Each run draws four variations procedurally as SVG, and you can download them as `.svg`.
- **Command palette** (Ctrl/Cmd + K), toasts, a mobile menu and reduced-motion support.

## Design system

- Calm intelligence: graphite surfaces (`#0e0f11`, `#16181b`) and a single electric lime accent (`#c6f432`) used sparingly. Hairline 1px borders.
- Type: Geist for UI and body text, Geist Mono for labels, numbers and code. Both are self-hosted via Fontsource.
- A 12-column grid (8 columns on tablet, 4 on mobile) and a fixed type scale (`t-display`, `t-h1` to `t-h4`, `t-lead`, `t-body`, `t-small`, `t-label`). Tokens live in `tailwind.config.js`.
- Product shots are real HTML/CSS UI: research workspace, writing view with tracked changes, image grid, model picker and usage chart.

## Tech

React 18, React Router 6, Vite 5, Tailwind CSS 3, lucide-react, @fontsource-variable/geist and geist-mono.

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run lint
```

## Credits

- Typefaces: Geist and Geist Mono by Vercel (SIL Open Font License), via Fontsource.
- Icons: Lucide (ISC License).
- Logo, illustrations, image-studio artwork, blog covers, favicon and Open Graph image are original SVG and CSS work made for this project. The site uses no stock photography and no third-party images.
- All people, companies, quotes and figures on the site are fictional.
