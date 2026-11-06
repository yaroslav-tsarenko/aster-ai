import { Link, useParams } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import ChatDemo from "../components/ChatDemo";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import Icon from "../components/ui/Icon";
import { FeatureCell } from "../components/home/FeatureGrid";
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
        label={`${String(index + 1).padStart(2, "0")} / ${feature.tagline}`}
        title={feature.title}
        text={feature.long}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Product", to: "/features" },
          { label: feature.title },
        ]}
        aside={
          <dl className="grid grid-cols-2 border-t border-l border-line">
            {feature.stats.map((s) => (
              <div key={s.label} className="p-5 border-r border-b border-line">
                <dd className="mb-2 font-mono text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                  <Counter value={s.value} decimals={s.decimals ?? (Number.isInteger(s.value) ? 0 : 1)} suffix={s.suffix} />
                </dd>
                <dt className="text-xs leading-5 text-fg-3">{s.label}</dt>
              </div>
            ))}
          </dl>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/signup" variant="primary" size="lg">
            Try it free
          </Button>
          <Button href="#demo" variant="secondary" size="lg">
            See it in action
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="container">
          <Heading label="What it does" title={`${feature.title}, in detail`} />
          <div className="grid border-t border-l border-line md:grid-cols-3">
            {feature.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 60} className="p-6 border-r border-b border-line lg:p-8">
                <div className="flex items-center justify-between mb-10">
                  <span className="flex items-center justify-center w-9 h-9 rounded-md border border-line-strong text-fg-2">
                    <Icon name={feature.icon} size={17} />
                  </span>
                  <span className="font-mono text-2xs text-fg-4">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="t-h4 mb-2">{h.title}</h2>
                <p className="t-small text-fg-3">{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="demo">
        <div className="container">
          <Heading
            label="Try it"
            title="Start with the prompt for this feature"
            text="Or type your own question. Answers in this demo are prepared in advance and run in your browser."
          />
          <Reveal className="lg:w-3/4">
            <ChatDemo prompts={prompts} />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container">
          <nav aria-label="Feature navigation" className="grid mb-20 border-t border-l border-line sm:grid-cols-2">
            <Link
              to={`/features/${prev.slug}`}
              className="group flex items-center gap-4 p-6 border-r border-b border-line transition-colors hover:bg-surface"
            >
              <Icon name="arrowRight" size={16} className="rotate-180 text-fg-3 transition-transform group-hover:-translate-x-0.5" />
              <span>
                <span className="block t-label mb-1 text-fg-4">Previous</span>
                <span className="block t-h4">{prev.title}</span>
              </span>
            </Link>
            <Link
              to={`/features/${next.slug}`}
              className="group flex items-center justify-end gap-4 p-6 text-right border-r border-b border-line transition-colors hover:bg-surface"
            >
              <span>
                <span className="block t-label mb-1 text-fg-4">Next</span>
                <span className="block t-h4">{next.title}</span>
              </span>
              <Icon name="arrowRight" size={16} className="text-fg-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </nav>

          <h2 className="t-h3 mb-8">More of what Aster does</h2>
          <div className="grid border-t border-l border-line md:grid-cols-3">
            {others.map((item) => (
              <FeatureCell key={item.id} item={item} index={benefits.indexOf(item)} />
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default FeatureDetail;
