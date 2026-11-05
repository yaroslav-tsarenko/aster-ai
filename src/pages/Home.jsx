import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Collaboration from "../components/Collaboration";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import Roadmap from "../components/Roadmap";
import Testimonials from "../components/Testimonials";
import ChatDemo from "../components/ChatDemo";
import CtaBanner from "../components/CtaBanner";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Reveal from "../components/ui/Reveal";
import usePageMeta from "../hooks/usePageMeta";

const Home = () => {
  usePageMeta();

  return (
    <>
      <Hero />
      <Benefits />
      <Section crosses id="demo">
        <div className="container relative z-2">
          <Heading
            tag="Live demo"
            title="Try Brainwave right here"
            text="Pick a suggestion or type your own question. This demo runs entirely in your browser with canned answers."
          />
          <Reveal className="max-w-4xl mx-auto">
            <ChatDemo />
          </Reveal>
        </div>
      </Section>
      <Collaboration />
      <Services />
      <Testimonials />
      <Pricing />
      <Roadmap />
      <CtaBanner />
    </>
  );
};

export default Home;
