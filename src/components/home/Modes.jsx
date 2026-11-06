import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../Section";
import Heading from "../Heading";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import AppFrame from "../product/AppFrame";
import { ImageGridMock, ResearchMock, WriteMock } from "../product/Mocks";

const modes = [
  {
    id: "research",
    icon: "library",
    title: "Research",
    text: "Ask across PDFs, links, spreadsheets and notes. Every claim carries a citation you can open and check.",
    link: "/features/research-with-sources",
    frame: "Urban heat brief / Interventions that work",
  },
  {
    id: "write",
    icon: "pen",
    title: "Write",
    text: "Turn findings into a brief, a section or an email. Edits arrive as tracked suggestions that follow your style guide.",
    link: "/features/write-in-your-voice",
    frame: "Urban heat brief / Brief, draft 2",
  },
  {
    id: "images",
    icon: "image",
    title: "Images",
    text: "Generate four variations from a saved preset, then vary or upscale. A series of covers that actually matches.",
    link: "/features/image-studio",
    frame: "Cover series / Report header",
  },
];

const Modes = () => {
  const [active, setActive] = useState("research");
  const mode = modes.find((m) => m.id === active);

  return (
    <Section id="workspace">
      <div className="container">
        <Heading
          label="01 / Workspace"
          title="One workspace for the whole piece of work"
          text="Sources, drafts and images live in the same project, so context carries from the first question to the final cover."
        />

        <div className="grid-12 gap-y-8">
          <div role="tablist" aria-label="Aster modes" aria-orientation="vertical" className="col-span-4 md:col-span-8 lg:col-span-4 flex flex-col border-t border-line">
            {modes.map((m, i) => {
              const isActive = m.id === active;
              return (
                <button
                  key={m.id}
                  role="tab"
                  id={`mode-tab-${m.id}`}
                  aria-selected={isActive}
                  aria-controls="mode-panel"
                  onClick={() => setActive(m.id)}
                  className={`relative text-left py-5 pl-5 pr-4 border-b border-line transition-colors ${isActive ? "" : "hover:bg-surface/60"}`}
                >
                  <span className={`absolute left-0 top-0 bottom-0 w-px ${isActive ? "bg-accent" : "bg-transparent"}`} aria-hidden="true" />
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-2xs text-fg-4">0{i + 1}</span>
                    <Icon name={m.icon} size={16} className={isActive ? "text-fg" : "text-fg-3"} />
                    <span className={`t-h4 ${isActive ? "text-fg" : "text-fg-2"}`}>{m.title}</span>
                  </span>
                  <span className={`grid transition-[grid-template-rows] duration-200 ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <span className="overflow-hidden">
                      <span className="block pt-3 pl-12 text-sm leading-6 text-fg-3">{m.text}</span>
                    </span>
                  </span>
                </button>
              );
            })}
            <Link to={mode.link} className="inline-flex items-center gap-1.5 mt-6 text-sm text-fg-2 transition-colors hover:text-fg">
              More about {mode.title.toLowerCase()} <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <Reveal
            id="mode-panel"
            role="tabpanel"
            aria-labelledby={`mode-tab-${active}`}
            className="col-span-4 md:col-span-8 lg:col-span-8"
          >
            <div className="h-full p-4 md:p-8 rounded-xl border border-line bg-surface bg-dotgrid">
              <AppFrame title={`aster.app / ${mode.frame}`} key={active} className="animate-fade-in">
                {active === "research" && (
                  <ResearchMock sidebar={false} followUps={false} heightClass="h-[30rem]" />
                )}
                {active === "write" && <WriteMock />}
                {active === "images" && <ImageGridMock />}
              </AppFrame>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default Modes;
