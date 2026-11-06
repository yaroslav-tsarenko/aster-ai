import Hero from "../components/home/Hero";
import Modes from "../components/home/Modes";
import FeatureGrid from "../components/home/FeatureGrid";
import Control from "../components/home/Control";
import IntegrationsStrip from "../components/home/IntegrationsStrip";
import Stats from "../components/home/Stats";
import Faq from "../components/home/Faq";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import ChatDemo from "../components/ChatDemo";
import CtaBanner from "../components/CtaBanner";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import usePageMeta from "../hooks/usePageMeta";

const demoNotes = [
  { icon: "library", text: "The demo project has six sources on four-day work weeks, databases and Aster itself." },
  { icon: "quote", text: "Numbered citations in answers map to the sources line at the end of each reply." },
  { icon: "refresh", text: "Regenerate, stop, copy and rate any answer, exactly as in the app." },
];

const Home = () => {
  usePageMeta();

  return (
    <>
      <Hero />
      <Modes />
      <Section id="demo">
        <div className="container">
          <Heading
            label="02 / Live demo"
            title="Ask a question. Check the citations."
            text="Pick a suggestion or type your own. This demo runs in your browser with prepared answers."
          />
          <div className="grid-12 gap-y-8">
            <Reveal className="col-span-4 md:col-span-8 lg:col-span-3 lg:order-none order-last">
              <ul className="space-y-6">
                {demoNotes.map((n) => (
                  <li key={n.text} className="flex gap-3">
                    <Icon name={n.icon} size={16} className="mt-1 text-fg-3" />
                    <p className="t-small text-fg-3">{n.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="col-span-4 md:col-span-8 lg:col-span-9">
              <ChatDemo />
            </Reveal>
          </div>
        </div>
      </Section>
      <FeatureGrid />
      <Control />
      <IntegrationsStrip />
      <Testimonials label="06 / Customers" />
      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container">
          <Stats />
        </div>
      </section>
      <Pricing label="07 / Pricing" />
      <Faq label="08 / FAQ" />
      <CtaBanner />
    </>
  );
};

export default Home;
