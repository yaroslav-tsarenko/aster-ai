import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Testimonials from "../components/Testimonials";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Stats from "../components/home/Stats";
import Avatar from "../components/brand/Avatar";
import Artwork from "../components/brand/Artwork";
import { milestones, team, values } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const About = () => {
  usePageMeta("About", "The team behind Aster and why we build an AI assistant that shows its sources.");

  return (
    <>
      <PageHero
        label="About"
        title="We build tools for people who read for a living"
        text="Aster began as a citation checker for a think tank's weekly briefings. It is now a workspace for research, writing and images, used by analysts, editors and designers."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <Section>
        <div className="container grid-12 gap-y-12 items-center">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-line">
              <Artwork scene="bloom" palette="editorial" seed={11} title="An aster flower drawn in flat shapes" />
            </div>
            <p className="mt-3 font-mono text-2xs text-fg-4">Generated in the Aster image studio, preset Editorial.</p>
          </Reveal>
          <Reveal delay={80} className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <p className="t-label mb-5 text-fg-3">Mission</p>
            <h2 className="t-h2 mb-6">Make AI answers you can check</h2>
            <p className="t-lead mb-5">
              Most assistants sound confident whether or not they are right. We think the useful version shows its work: where
              each claim came from, and what the sources do not cover.
            </p>
            <p className="t-body text-fg-3">
              We are 24 people across nine countries, funded by a seed round in 2026. We keep the team small, ship every two
              weeks and publish our roadmap.
            </p>
          </Reveal>
        </div>
      </Section>

      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container">
          <Stats />
        </div>
      </section>

      <Section>
        <div className="container">
          <Heading label="01 / Values" title="Three rules we use to make decisions" />
          <div className="grid border-t border-l border-line md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.id} delay={i * 60} className="p-6 border-r border-b border-line lg:p-8">
                <p className="mb-10 font-mono text-2xs text-fg-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h4 mb-2">{v.title}</h3>
                <p className="t-small text-fg-3">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container">
          <Heading label="02 / Story" title="From a citation checker to a workspace" />
          <ol className="grid border-t border-line md:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 60} className="relative pt-6 pb-2 md:pr-8">
                <span className={`absolute -top-px left-0 w-10 h-px ${i === milestones.length - 1 ? "bg-accent" : "bg-fg-3"}`} aria-hidden="true" />
                <p className="mb-3 font-mono text-xl font-medium tracking-tight">{m.year}</p>
                <p className="t-small text-fg-3">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="team">
        <div className="container">
          <Heading label="03 / Team" title="The people behind Aster" text="Four of the 24. Everyone else is on the careers page soon, we hope." />
          <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="li" key={m.id} delay={i * 60} className="p-6 border-r border-b border-line">
                <Avatar name={m.name} size={48} className="mb-8" />
                <h3 className="t-h4">{m.name}</h3>
                <p className="mb-3 text-sm text-fg-2">{m.role}</p>
                <p className="t-small text-fg-3">{m.bio}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/careers" variant="secondary">
              See open roles
            </Button>
          </div>
        </div>
      </Section>

      <Testimonials label="04 / Customers" />
      <CtaBanner
        title="Come build it with us."
        text="We are hiring engineers, a designer and a technical writer. Remote in Europe."
        primary={{ label: "See open roles", url: "/careers" }}
        secondary={{ label: "Get in touch", url: "/contact" }}
      />
    </>
  );
};

export default About;
