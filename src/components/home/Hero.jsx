import Button from "../Button";
import Reveal from "../ui/Reveal";
import AppFrame from "../product/AppFrame";
import { ResearchMock } from "../product/Mocks";
import { customerNames } from "../../constants";

const Hero = () => (
  <section className="relative pt-14 md:pt-20 lg:pt-24" id="hero">
    <div className="container">
      <div className="grid-12 gap-y-8 items-end">
        <Reveal className="col-span-4 md:col-span-8 lg:col-span-7">
          <h1 className="t-display">
            The AI assistant that shows its sources.
          </h1>
        </Reveal>
        <Reveal delay={80} className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
          <p className="t-lead mb-7">
            Aster reads your PDFs, links and notes, answers with a citation on every claim, drafts in your voice and
            makes images that match your brief.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/signup" variant="primary" size="lg">
              Start free
            </Button>
            <Button href="#demo" variant="secondary" size="lg">
              Try the live demo
            </Button>
          </div>
          <p className="mt-4 font-mono text-2xs text-fg-3">Free plan. No card required.</p>
        </Reveal>
      </div>
    </div>

    <div className="relative mt-14 md:mt-20">
      <div className="absolute inset-x-0 top-24 bottom-0 bg-dotgrid [mask-image:linear-gradient(180deg,#000,transparent)] pointer-events-none" aria-hidden="true" />
      <div className="container relative">
        <Reveal delay={120}>
          <AppFrame title="aster.app / Urban heat brief" meta="Synced 2 min ago">
            <ResearchMock />
          </AppFrame>
        </Reveal>
      </div>
    </div>

    <div className="container pt-16 pb-6 md:pt-20">
      <p className="t-label mb-6 text-fg-3">Used by research, editorial and design teams at</p>
      <ul className="grid grid-cols-2 border-t border-l border-line md:grid-cols-3 lg:grid-cols-6">
        {customerNames.map((c) => (
          <li key={c.name} className="flex items-center justify-center h-20 px-4 border-r border-b border-line text-fg-3">
            <span className={`text-base whitespace-nowrap ${c.style}`}>{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Hero;
