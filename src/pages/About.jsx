import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Testimonials from "../components/Testimonials";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import GradientCard from "../components/ui/GradientCard";
import { milestones, stats, team, values } from "../constants";
import { robot, benefitIcon1, benefitIcon2, benefitIcon3 } from "../assets";
import usePageMeta from "../hooks/usePageMeta";

const valueIcons = [benefitIcon1, benefitIcon2, benefitIcon3];

const About = () => {
  usePageMeta("About", "Meet the team behind Brainwave and learn why we're building a calm, private AI assistant for everyone.");

  return (
    <>
      <PageHero
        tag="About us"
        title={
          <>
            We build AI that feels like a <span className="text-gradient">creative partner</span>
          </>
        }
        text="Brainwave started as a weekend project between two friends who wanted an assistant that was fast, private and genuinely pleasant to use. Today millions of people rely on it every day."
      />

      <Section crosses>
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative p-0.5 rounded-3xl bg-conic-gradient">
              <div className="aspect-[4/3] rounded-[1.4rem] overflow-hidden bg-n-8">
                <img src={robot} alt="The Brainwave assistant" loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="h2 mb-6">Our mission</h2>
            <p className="body-1 mb-6 text-n-3">
              To give everyone a thoughtful, trustworthy assistant that helps them learn faster, create more and spend less time on busywork.
            </p>
            <p className="body-2 mb-10 text-n-4">
              We believe the best tools disappear into your workflow. That’s why we obsess over speed, design details and privacy, so you can focus on your ideas.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((s) => (
                <div key={s.id}>
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} className="block h3 text-gradient" />
                  <p className="tagline mt-1 text-n-4">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section crosses>
        <div className="container">
          <Heading tag="What we believe" title="Our values" />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.id} delay={i * 100}>
                <GradientCard muted={i !== 1} className="h-full" innerClassName="p-8">
                  <img src={valueIcons[i]} width={48} height={48} alt="" className="mb-6" loading="lazy" />
                  <h3 className="h5 mb-3">{v.title}</h3>
                  <p className="body-2 text-n-4">{v.text}</p>
                </GradientCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section crosses>
        <div className="container">
          <Heading tag="Our story" title="From side project to 2.4M users" />
          <ol className="grid gap-6 md:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 100} className="relative pt-8 border-t border-n-6">
                <span className="absolute -top-1.5 left-0 w-3 h-3 rounded-full bg-conic-gradient" />
                <p className="h4 mb-3 text-gradient">{m.year}</p>
                <p className="body-2 text-n-3">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section crosses id="team">
        <div className="container">
          <Heading tag="The team" title="Small team, big ambitions" text="We're a remote-first team of 42 across 14 countries." />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal as="li" key={m.id} delay={i * 80}>
                <div className="group p-0.25 rounded-3xl bg-n-6 transition-colors hover:bg-conic-gradient">
                  <div className="p-6 text-center bg-n-8 rounded-[1.4375rem]">
                    <div className="w-24 h-24 mx-auto mb-5 p-0.5 rounded-full bg-conic-gradient transition-transform duration-500 group-hover:rotate-12">
                      <img src={m.avatar} alt={m.name} width={96} height={96} loading="lazy" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <h3 className="h6">{m.name}</h3>
                    <p className="text-sm text-n-4">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="flex justify-center mt-12">
            <Button href="/careers">We’re hiring</Button>
          </div>
        </div>
      </Section>

      <Testimonials />
      <CtaBanner title="Come build with us" text="We're always looking for curious people who care about craft." primary={{ label: "See open roles", url: "/careers" }} secondary={{ label: "Get in touch", url: "/contact" }} />
    </>
  );
};

export default About;
