import { useEffect, useState } from "react";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Services from "../components/Services";
import ImagePlayground from "../components/ImagePlayground";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Accordion from "../components/ui/Accordion";
import Generating from "../components/Generating";
import { tourSteps } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import useReducedMotion from "../hooks/useReducedMotion";
import useInView from "../hooks/useInView";

const STEP_MS = 6000;

const shortcuts = [
  { keys: ["Ctrl / ⌘", "K"], label: "Open the command palette" },
  { keys: ["Enter"], label: "Send message" },
  { keys: ["Shift", "Enter"], label: "New line" },
  { keys: ["Esc"], label: "Close dialogs and menus" },
];

const productFaq = [
  { q: "Do I need to install anything?", a: "No. Brainwave runs in any modern browser. Native apps for macOS, Windows, iOS and Android are optional and sync automatically." },
  { q: "Which languages does Brainwave speak?", a: "Brainwave understands and replies in more than 120 languages, and can translate between them on the fly." },
  { q: "Can I use Brainwave offline?", a: "Offline mode is on our public roadmap for Q1 2027. Until then, an internet connection is required." },
  { q: "How do I share a conversation?", a: "Open any chat, click Share and choose whether teammates can view or continue the conversation." },
];

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

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <div role="tablist" aria-label="Product tour steps" aria-orientation="vertical" className="flex flex-col gap-3">
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
              className={`relative text-left p-6 rounded-2xl border overflow-hidden transition-colors ${
                isActive ? "border-n-1/20 bg-n-7" : "border-n-6 hover:border-n-5"
              }`}
            >
              <div className="flex items-start gap-5">
                <span className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-xl font-code font-bold text-sm ${isActive ? "bg-color-1 text-n-1" : "bg-n-7 text-n-4"}`}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="h6 mb-1">{s.title}</h3>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="body-2 overflow-hidden text-n-3">{s.text}</p>
                  </div>
                </div>
              </div>
              {isActive && (
                <span
                  key={`${active}-${autoplay}`}
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-conic-gradient origin-left"
                  style={{
                    transform: autoplay ? undefined : "scaleX(0)",
                    animation: autoplay ? `progress-x ${STEP_MS}ms linear forwards` : "none",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${active}`} className="relative">
        <div className="relative p-0.5 rounded-3xl bg-conic-gradient">
          <div className="relative aspect-[4/3] bg-n-8 rounded-[1.4rem] overflow-hidden">
            <img key={step.id} src={step.image} alt={step.title} className="w-full h-full object-cover animate-fade-in" />
            <Generating cycle className="absolute left-4 right-4 bottom-4 border border-n-1/10 md:left-1/2 md:right-auto md:w-[22rem] md:-translate-x-1/2" />
          </div>
        </div>
        <p className="mt-5 font-code text-sm text-n-4">{step.tip}</p>
      </div>
    </div>
  );
};

const Product = () => {
  usePageMeta("How to use", "A guided tour of Brainwave: create an account, chat, generate images and connect your favourite tools.");

  return (
    <>
      <PageHero
        tag="Product tour"
        title={
          <>
            From first prompt to <span className="text-gradient">finished work</span>
          </>
        }
        text="Four steps is all it takes. Follow the interactive tour, then try the image studio yourself, no account needed."
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#tour" white>
            Start the tour
          </Button>
          <Button href="#studio">Open image studio</Button>
        </div>
      </PageHero>

      <Section crosses id="tour">
        <div className="container">
          <Heading tag="How it works" title="Getting started in 4 steps" />
          <Tour />
        </div>
      </Section>

      <Section crosses id="studio">
        <div className="container">
          <Heading
            tag="Image studio"
            title="Turn words into images"
            text="Pick a style and aspect ratio, then hit Generate. This playground is a front-end mock that reuses our sample artwork."
          />
          <Reveal>
            <ImagePlayground />
          </Reveal>
        </div>
      </Section>

      <Services />

      <Section crosses>
        <div className="container grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="h3 mb-6">Keyboard first</h2>
            <p className="body-2 mb-8 text-n-3">Power users never leave the keyboard. These shortcuts work across the site and the app.</p>
            <ul className="border-t border-n-6">
              {shortcuts.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-6 py-4 border-b border-n-6">
                  <span className="body-2">{s.label}</span>
                  <span className="flex gap-2">
                    {s.keys.map((k) => (
                      <kbd key={k} className="px-2.5 py-1 rounded-lg bg-n-7 border border-n-6 font-code text-xs text-n-2">{k}</kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="h3 mb-6">Common questions</h2>
            <Accordion items={productFaq} />
          </Reveal>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default Product;
