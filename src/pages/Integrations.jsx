import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Collaboration from "../components/Collaboration";
import CtaBanner from "../components/CtaBanner";
import Reveal from "../components/ui/Reveal";
import SegmentedControl from "../components/ui/SegmentedControl";
import Icon from "../components/ui/Icon";
import { collabApps, integrationCategories } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const Integrations = () => {
  usePageMeta("Integrations", "Connect Brainwave to Figma, Notion, Slack, Discord and more. Bring AI into the tools your team already uses.");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return collabApps.filter(
      (a) =>
        (category === "All" || a.category === category) &&
        (!q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <>
      <PageHero
        tag="Integrations"
        title={
          <>
            Brainwave, <span className="text-gradient">everywhere you work</span>
          </>
        }
        text="Connect your favourite tools in a click. Summarise threads, draft docs and critique designs without switching tabs."
      >
        <div className="relative max-w-xl mx-auto">
          <Icon name="search" size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-n-4" />
          <label htmlFor="integration-search" className="sr-only">
            Search integrations
          </label>
          <input
            id="integration-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search integrations…"
            className="w-full h-14 pl-14 pr-5 bg-n-7 border border-n-6 rounded-2xl outline-none transition-colors focus:border-color-1 placeholder:text-n-4"
          />
        </div>
      </PageHero>

      <Section id="directory">
        <div className="container">
          <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
            <SegmentedControl
              label="Filter by category"
              value={category}
              onChange={setCategory}
              size="sm"
              options={integrationCategories.map((c) => ({ value: c, label: c }))}
            />
            <p className="text-sm text-n-4" aria-live="polite">
              {results.length} {results.length === 1 ? "integration" : "integrations"}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-n-6 rounded-3xl">
              <p className="h6 mb-2">No integrations match “{query}”.</p>
              <p className="body-2 mb-6 text-n-4">Can’t find your tool? Tell us and we’ll prioritise it.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="button text-color-1 transition-colors hover:text-n-1"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((app, i) => (
                <Reveal as="li" key={app.id} delay={(i % 4) * 70}>
                  <Link
                    to={`/integrations/${app.slug}`}
                    className="group block h-full p-0.25 rounded-3xl bg-n-6 transition-colors hover:bg-conic-gradient"
                  >
                    <div className="flex flex-col h-full p-6 bg-n-8 rounded-[1.4375rem]">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center justify-center w-14 h-14 bg-n-7 border border-n-1/15 rounded-xl transition-transform duration-300 group-hover:scale-110">
                          <img src={app.icon} width={app.width} height={app.height} alt="" loading="lazy" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-n-7 tagline text-n-3">{app.category}</span>
                      </div>
                      <h2 className="h6 mb-2">{app.title}</h2>
                      <p className="body-2 flex-1 mb-6 text-n-4">{app.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-n-4">{app.installs} installs</span>
                        <span className="inline-flex items-center gap-1 button text-n-1 transition-colors group-hover:text-color-1">
                          Details <Icon name="arrowRight" size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Collaboration />

      <CtaBanner title="Missing an integration?" text="Our plugin marketplace is coming in 2027. Until then, tell us which tools you'd like to connect." primary={{ label: "Request an integration", url: "/contact?topic=integrations" }} secondary={{ label: "View roadmap", url: "/roadmap" }} />
    </>
  );
};

export default Integrations;
