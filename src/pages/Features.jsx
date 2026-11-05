import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Benefits from "../components/Benefits";
import Section from "../components/Section";
import Heading from "../components/Heading";
import ChatDemo from "../components/ChatDemo";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import Icon from "../components/ui/Icon";
import { benefits, stats, collabApps } from "../constants";
import { service1, service2, service3, check } from "../assets";
import usePageMeta from "../hooks/usePageMeta";

const spotlights = [
  {
    title: "Answers that understand context",
    text: "Brainwave keeps track of the whole conversation, so follow-up questions just work. Ask it to shorten, translate or turn an answer into a table.",
    image: service1,
    points: ["Remembers the whole thread", "Rewrites in any tone", "Cites its sources"],
    to: "/features/ask-anything",
  },
  {
    title: "A full image studio inside your chat",
    text: "Generate artwork, enhance photos and iterate with plain-language edits. Style presets get you from idea to on-brand visuals in seconds.",
    image: service2,
    points: ["Five style presets", "Conversational edits", "Commercial use on paid plans"],
    to: "/features/create-visuals",
  },
  {
    title: "Works where your team works",
    text: "Summarise Slack threads, draft Notion docs and critique Figma frames without switching tabs. Every integration can be revoked in a click.",
    image: service3,
    points: [`${collabApps.length} native integrations`, "Real-time sync on every device", "Admin controls for teams"],
    to: "/integrations",
  },
];

const Features = () => {
  usePageMeta(
    "Features",
    "Explore everything Brainwave can do: instant answers, personal memory, image generation, integrations and privacy by design."
  );

  return (
    <>
      <PageHero
        tag="Features"
        title={
          <>
            Everything you need to <span className="text-gradient">think faster</span>
          </>
        }
        text="One assistant for answers, writing, code and visuals. Explore each capability below or jump straight into the live demo."
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/signup" white>
            Start for free
          </Button>
          <Button href="#demo">Try the demo</Button>
        </div>
      </PageHero>

      <Section crosses customPaddings className="py-12 lg:py-16">
        <div className="container grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.id} delay={i * 80} className="text-center">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} className="block h2 mb-2 text-gradient" />
              <p className="tagline text-n-4">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Benefits
        items={benefits}
        tag="Core capabilities"
        title="Six reasons people switch to Brainwave"
        showAllLink={false}
      />

      <Section crosses>
        <div className="container">
          <Heading tag="In depth" title="Built for real work" />
          <div className="flex flex-col gap-20 lg:gap-28">
            {spotlights.map((s, i) => (
              <div key={s.title} className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20`}>
                <Reveal className={`${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="relative p-0.5 rounded-3xl bg-conic-gradient">
                    <div className="relative aspect-[4/3] rounded-[1.4rem] overflow-hidden bg-n-8">
                      <img src={s.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <p className="tagline mb-4 text-color-1">0{i + 1}.</p>
                  <h3 className="h3 mb-5">{s.title}</h3>
                  <p className="body-2 mb-8 text-n-3">{s.text}</p>
                  <ul className="mb-8">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-4 py-3 border-t border-n-6">
                        <img src={check} width={24} height={24} alt="" />
                        <span className="body-2">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={s.to} className="inline-flex items-center gap-2 button text-n-1 transition-colors hover:text-color-1">
                    Learn more <Icon name="arrowRight" size={16} />
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section crosses id="demo">
        <div className="container">
          <Heading tag="Live demo" title="Don't take our word for it" text="Ask anything. Responses are canned in this demo, but the streaming, copy and regenerate controls work just like the real thing." />
          <Reveal className="max-w-4xl mx-auto">
            <ChatDemo />
          </Reveal>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default Features;
