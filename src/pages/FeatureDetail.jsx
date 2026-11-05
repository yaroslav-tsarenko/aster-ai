import { Link, useParams } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import ChatDemo from "../components/ChatDemo";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import GradientCard from "../components/ui/GradientCard";
import Icon from "../components/ui/Icon";
import { BenefitCard } from "../components/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { benefits, suggestedPrompts } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import NotFound from "./NotFound";

const FeatureDetail = () => {
  const { slug } = useParams();
  const index = benefits.findIndex((b) => b.slug === slug);
  const feature = benefits[index];

  usePageMeta(feature ? feature.title : "Feature not found", feature?.long);

  if (!feature) return <NotFound />;

  const prev = benefits[(index - 1 + benefits.length) % benefits.length];
  const next = benefits[(index + 1) % benefits.length];
  const others = benefits.filter((b) => b.slug !== slug).slice(0, 3);
  const prompts = [feature.prompt, ...suggestedPrompts.filter((p) => p !== feature.prompt)].slice(0, 3);

  return (
    <>
      <PageHero
        tag={feature.tagline}
        title={feature.title}
        text={feature.long}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Features", to: "/features" },
          { label: feature.title },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/signup" white>
            Try it free
          </Button>
          <Button href="#demo">See it in action</Button>
        </div>
      </PageHero>

      <Section crosses>
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {feature.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 100}>
                <GradientCard muted={i !== 1} className="h-full" innerClassName="p-8">
                  <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-n-7">
                    <img src={feature.iconUrl} width={28} height={28} alt="" />
                  </div>
                  <h2 className="h6 mb-3">{h.title}</h2>
                  <p className="body-2 text-n-4">{h.text}</p>
                </GradientCard>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12 lg:mt-20">
            {feature.stats.map((s) => (
              <Reveal key={s.label} className="p-8 text-center border border-n-6 rounded-3xl">
                <Counter value={s.value} decimals={Number.isInteger(s.value) ? 0 : 1} suffix={s.suffix} className="block h2 mb-2 text-gradient" />
                <p className="tagline text-n-4">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section crosses id="demo">
        <div className="container">
          <Heading tag="Try it" title={`${feature.title}, live`} text="Start with the suggested prompt for this feature, or ask your own question." />
          <Reveal className="max-w-4xl mx-auto">
            <ChatDemo prompts={prompts} />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container">
          <nav aria-label="Feature navigation" className="grid gap-4 mb-20 sm:grid-cols-2">
            <Link to={`/features/${prev.slug}`} className="group flex items-center gap-4 p-6 border border-n-6 rounded-2xl transition-colors hover:border-color-1">
              <Icon name="chevronLeft" size={20} className="text-n-4 transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="tagline text-n-4">Previous</p>
                <p className="h6">{prev.title}</p>
              </div>
            </Link>
            <Link to={`/features/${next.slug}`} className="group flex items-center justify-end gap-4 p-6 text-right border border-n-6 rounded-2xl transition-colors hover:border-color-1">
              <div>
                <p className="tagline text-n-4">Next</p>
                <p className="h6">{next.title}</p>
              </div>
              <Icon name="chevronRight" size={20} className="text-n-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>

          <h2 className="h4 mb-10 text-center">More features</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {others.map((item, i) => (
              <BenefitCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <ClipPath />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default FeatureDetail;
