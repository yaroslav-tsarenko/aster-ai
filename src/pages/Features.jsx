import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import ChatDemo from "../components/ChatDemo";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import AppFrame from "../components/product/AppFrame";
import { ImageGridMock, ResearchMock, WriteMock } from "../components/product/Mocks";
import { FeatureCell } from "../components/home/FeatureGrid";
import Stats from "../components/home/Stats";
import { benefits, collabApps } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const spotlights = [
  {
    label: "Research",
    title: "Answers assembled from your sources, not from a guess",
    text: "Add PDFs, links, spreadsheets and notes to a project. Aster retrieves the passages that support each claim, then checks every sentence against its citation before you see it.",
    points: ["Page-level citations you can open in one click", "Says when your sources do not cover a question", "Export references as BibTeX, RIS, APA or MLA"],
    to: "/features/research-with-sources",
    frame: "Urban heat brief / Interventions that work",
    visual: "research",
  },
  {
    label: "Writing",
    title: "Edits you can see, in a voice you recognise",
    text: "Drafts and rewrites follow your style guide. Every change arrives as a tracked suggestion, so you accept what you agree with and keep control of the final text.",
    points: ["Tracked suggestions with accept and reject", "Personal and shared style guides", "Exact length control, down to the word"],
    to: "/features/write-in-your-voice",
    frame: "Urban heat brief / Brief, draft 2",
    visual: "write",
  },
  {
    label: "Images",
    title: "A series of images that looks like one series",
    text: "Save palette, style and framing as a preset. Each prompt returns four variations you can vary or upscale, and the fortieth cover still matches the first.",
    points: ["Presets shared across a workspace", "Four variations per prompt, upscale to 2048 px", `Place images in Figma and ${collabApps.length - 1} other tools`],
    to: "/features/image-studio",
    frame: "Cover series / Report header",
    visual: "images",
  },
];

const Visual = ({ type }) => {
  if (type === "research") return <ResearchMock sidebar={false} followUps={false} heightClass="h-[32rem]" />;
  if (type === "write") return <WriteMock />;
  return <ImageGridMock scene="peaks" palette="film" prompt="Layered hills at first light, quiet cover, space for a title" />;
};

const Features = () => {
  usePageMeta(
    "Product",
    "Research with citations, writing with tracked suggestions and an image studio with presets. Everything Aster does, in one place."
  );

  return (
    <>
      <PageHero
        label="Product"
        title="Research, writing and images in one project"
        text="Aster keeps your sources, drafts and visuals together, so the context from the first question is still there when you design the cover."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/signup" variant="primary" size="lg">
            Start free
          </Button>
          <Button href="#demo" variant="secondary" size="lg">
            Try the demo
          </Button>
        </div>
      </PageHero>

      <section className="pb-20 md:pb-24">
        <div className="container">
          <Stats />
        </div>
      </section>

      <Section id="capabilities">
        <div className="container">
          <Heading
            label="Capabilities"
            title="Six things Aster does well"
            text="Each one has its own page with the details, the limits and a prompt you can try."
          />
          <div className="grid border-t border-l border-line md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, i) => (
              <FeatureCell key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="in-depth">
        <div className="container">
          <Heading label="In depth" title="How the three modes work" />
          <div className="flex flex-col gap-20 lg:gap-28">
            {spotlights.map((s, i) => (
              <div key={s.title} className="grid-12 gap-y-10 items-center">
                <Reveal
                  className={`col-span-4 md:col-span-8 lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}
                >
                  <div className="p-4 md:p-6 rounded-xl border border-line bg-surface bg-dotgrid">
                    <AppFrame title={`aster.app / ${s.frame}`}>
                      <Visual type={s.visual} />
                    </AppFrame>
                  </div>
                </Reveal>
                <Reveal
                  delay={80}
                  className={`col-span-4 md:col-span-8 lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}
                >
                  <p className="t-label mb-4 text-fg-3">
                    0{i + 1} / {s.label}
                  </p>
                  <h3 className="t-h3 mb-4">{s.title}</h3>
                  <p className="t-body mb-6 text-fg-3">{s.text}</p>
                  <ul className="mb-7 border-t border-line">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 py-3 border-b border-line text-sm text-fg-2">
                        <Icon name="check" size={15} className="mt-[0.2rem] text-fg-3" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link to={s.to} className="inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors hover:text-fg">
                    More about {s.label.toLowerCase()} <Icon name="arrowRight" size={14} />
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="demo">
        <div className="container">
          <Heading
            label="Live demo"
            title="See it answer, then check the citations"
            text="Answers here are prepared in advance, but streaming, stop, copy and regenerate behave exactly as in the app."
          />
          <div className="grid-12">
            <Reveal className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
              <ChatDemo />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default Features;
