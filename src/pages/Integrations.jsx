import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import CtaBanner from "../components/CtaBanner";
import Reveal from "../components/ui/Reveal";
import SegmentedControl from "../components/ui/SegmentedControl";
import Icon from "../components/ui/Icon";
import AppMark from "../components/brand/AppMark";
import { collabApps, integrationCategories } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const principles = [
  { icon: "lock", title: "Scoped access", text: "You choose the folder, collection or channel. Aster never asks for your whole account." },
  { icon: "quote", title: "Cited by file", text: "Answers point to the file, page or message they came from, wherever it lives." },
  { icon: "refresh", title: "Revocable in one click", text: "Disconnect any integration from Settings and its index is deleted within 24 hours." },
];

const Integrations = () => {
  usePageMeta(
    "Integrations",
    "Connect Zotero, Google Drive, Notion, Obsidian, Slack, Figma, GitHub and Readwise. Aster reads only what you allow and cites the file it used."
  );
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

  const counts = useMemo(
    () =>
      integrationCategories.reduce(
        (acc, c) => ({ ...acc, [c]: c === "All" ? collabApps.length : collabApps.filter((a) => a.category === c).length }),
        {}
      ),
    []
  );

  return (
    <>
      <PageHero
        label="Integrations"
        title="Work with sources where they already live"
        text="Connect a library, a folder or a workspace. Aster indexes only what you allow, keeps it private and cites the exact file it used."
      >
        <div className="relative max-w-md">
          <Icon name="search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-3" />
          <label htmlFor="integration-search" className="sr-only">
            Search integrations
          </label>
          <input
            id="integration-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search integrations"
            className="w-full h-11 pl-10 pr-4 bg-surface border border-line-strong rounded-md text-[0.9375rem] outline-none transition-colors focus:border-fg-3 placeholder:text-fg-4"
          />
        </div>
      </PageHero>

      <Section id="directory">
        <div className="container">
          <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
            <SegmentedControl
              label="Filter by category"
              value={category}
              onChange={setCategory}
              options={integrationCategories.map((c) => ({ value: c, label: c, badge: String(counts[c]) }))}
            />
            <p className="font-mono text-xs text-fg-3" aria-live="polite">
              {results.length} {results.length === 1 ? "integration" : "integrations"}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="py-20 px-6 text-center border border-dashed border-line-strong rounded-lg">
              <p className="t-h4 mb-2">No integrations match “{query}”.</p>
              <p className="t-small mb-6 text-fg-3">Tell us which tool you need and we will look at it for the roadmap.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="text-sm text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((app, i) => (
                <Reveal as="li" key={app.id} delay={(i % 4) * 50} className="border-r border-b border-line">
                  <Link to={`/integrations/${app.slug}`} className="group flex flex-col h-full p-6 transition-colors hover:bg-surface">
                    <div className="flex items-start justify-between mb-8">
                      <AppMark mark={app.mark} />
                      <span className="font-mono text-2xs text-fg-4">{app.category}</span>
                    </div>
                    <h2 className="t-h4 mb-2">{app.title}</h2>
                    <p className="t-small flex-1 mb-6 text-fg-3">{app.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-fg-4">{app.installs} workspaces</span>
                      <span className="inline-flex items-center gap-1 text-fg-2 transition-colors group-hover:text-fg">
                        Details <Icon name="arrowRight" size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section>
        <div className="container">
          <Heading
            label="How connections work"
            title="Your tools, on your terms"
            text="Every integration follows the same three rules, whichever plan you are on."
          />
          <div className="grid border-t border-l border-line md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 60} className="p-6 border-r border-b border-line lg:p-8">
                <span className="flex items-center justify-center w-9 h-9 mb-8 rounded-md border border-line-strong text-fg-2">
                  <Icon name={p.icon} size={17} />
                </span>
                <h3 className="t-h4 mb-2">{p.title}</h3>
                <p className="t-small text-fg-3">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Missing an integration?"
        text="A public API is planned for Q2 2027. Until then, tell us which tools you want to connect and we will prioritise the most requested."
        primary={{ label: "Request an integration", url: "/contact?topic=integrations" }}
        secondary={{ label: "View the roadmap", url: "/roadmap" }}
      />
    </>
  );
};

export default Integrations;
