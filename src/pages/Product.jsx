import { useEffect, useState } from "react";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import ImagePlayground from "../components/ImagePlayground";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Accordion from "../components/ui/Accordion";
import AppFrame from "../components/product/AppFrame";
import { ChatMock, ImageGridMock, SourcesMock, WriteMock } from "../components/product/Mocks";
import { tourSteps } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import useReducedMotion from "../hooks/useReducedMotion";
import useInView from "../hooks/useInView";

const STEP_MS = 6000;

const shortcuts = [
  { keys: ["Ctrl / ⌘", "K"], label: "Open the command palette" },
  { keys: ["/"], label: "Focus the message box" },
  { keys: ["Enter"], label: "Send message" },
  { keys: ["Shift", "Enter"], label: "New line" },
  { keys: ["E"], label: "Edit the selected passage" },
  { keys: ["Esc"], label: "Close dialogs and menus" },
];

const productFaq = [
  { q: "Do I need to install anything?", a: "No. Aster runs in any modern browser. Desktop apps for macOS and Windows are optional and sync automatically." },
  { q: "Which file types can I add as sources?", a: "PDF, DOCX, TXT, Markdown, CSV and XLSX files, web pages, and folders from Google Drive or Zotero. Scanned PDFs are read with OCR." },
  { q: "How many sources fit in one project?", a: "25 on Free, 500 on Pro and 2,000 on Team. Large projects are indexed in the background while you keep working." },
  { q: "Can I share a project?", a: "Shared projects are in beta on Team plans. Until then you can export any answer, with its sources, as a page or a document." },
];

const frames = {
  sources: { title: "Urban heat brief / Sources", node: <SourcesMock /> },
  chat: { title: "Urban heat brief / Night temperatures", node: <ChatMock /> },
  write: { title: "Urban heat brief / Brief, draft 2", node: <WriteMock /> },
  images: { title: "Cover series / Report header", node: <ImageGridMock /> },
};

const Tour = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.3 });
  const autoplay = !paused && !reduced && inView;

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % tourSteps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, autoplay]);

  const step = tourSteps[active];
  const frame = frames[step.visual];

  return (
    <div
      ref={ref}
      className="grid-12 gap-y-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
    >
      <div
        role="tablist"
        aria-label="Product tour steps"
        aria-orientation="vertical"
        className="col-span-4 md:col-span-8 lg:col-span-4 flex flex-col border-t border-line"
      >
        {tourSteps.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.id}
              role="tab"
              id={`tour-tab-${i}`}
              aria-selected={isActive}
              aria-controls="tour-panel"
              onClick={() => setActive(i)}
              className={`relative text-left py-5 pl-5 pr-4 border-b border-line overflow-hidden transition-colors ${
                isActive ? "" : "hover:bg-surface/60"
              }`}
            >
              <span className={`absolute left-0 top-0 bottom-0 w-px ${isActive ? "bg-line-strong" : "bg-transparent"}`} aria-hidden="true" />
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-2xs text-fg-4">0{i + 1}</span>
                <span className={`t-h4 ${isActive ? "text-fg" : "text-fg-2"}`}>{s.title}</span>
              </span>
              <span className={`grid transition-[grid-template-rows] duration-200 ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <span className="overflow-hidden">
                  <span className="block pt-3 pl-7 text-sm leading-6 text-fg-3">{s.text}</span>
                </span>
              </span>
              {isActive && (
                <span
                  key={`${active}-${autoplay}`}
                  className="absolute left-0 top-0 w-px h-full bg-accent origin-top"
                  style={{
                    transform: autoplay ? undefined : "scaleY(1)",
                    animation: autoplay ? `progress-y ${STEP_MS}ms linear forwards` : "none",
                  }}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${active}`} className="col-span-4 md:col-span-8 lg:col-span-8">
        <div className="p-4 md:p-8 rounded-xl border border-line bg-surface bg-dotgrid">
          <AppFrame key={step.id} title={`aster.app / ${frame.title}`} className="animate-fade-in">
            {frame.node}
          </AppFrame>
        </div>
        <p className="mt-4 font-mono text-xs text-fg-3">{step.tip}</p>
      </div>
    </div>
  );
};

const Product = () => {
  usePageMeta(
    "How it works",
    "From sources to a checked brief to a matching cover image: a guided tour of Aster, plus an image studio you can try without an account."
  );

  return (
    <>
      <PageHero
        label="How it works"
        title="From a folder of sources to a brief you can defend"
        text="Four steps cover most of what people do in Aster. Follow the tour, then try the image studio below. No account needed."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#tour" variant="primary" size="lg">
            Start the tour
          </Button>
          <Button href="#studio" variant="secondary" size="lg">
            Open the image studio
          </Button>
        </div>
      </PageHero>

      <Section id="tour">
        <div className="container">
          <Heading
            label="01 / Tour"
            title="Four steps, one project"
            text="Each step happens in the same project, so sources, decisions and presets carry through."
          />
          <Tour />
        </div>
      </Section>

      <Section id="studio">
        <div className="container">
          <Heading
            label="02 / Image studio"
            title="Generate four variations from a prompt"
            text="Pick a style and an aspect ratio, then generate. This playground is a front-end mock: images are drawn procedurally in your browser."
          />
          <Reveal>
            <ImagePlayground />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container grid-12 gap-y-14">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="t-label mb-5 text-fg-3">03 / Keyboard</p>
            <h2 className="t-h2 mb-5">Keyboard first</h2>
            <p className="t-body mb-8 text-fg-3">The shortcuts that matter most. They work across this site and in the app.</p>
            <ul className="border-t border-line">
              {shortcuts.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-6 py-3.5 border-b border-line">
                  <span className="text-sm text-fg-2">{s.label}</span>
                  <span className="flex gap-1.5">
                    {s.keys.map((k) => (
                      <kbd key={k} className="kbd">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <p className="t-label mb-5 text-fg-3">04 / Questions</p>
            <h2 className="t-h2 mb-8">Common questions</h2>
            <Accordion items={productFaq} />
          </Reveal>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default Product;
