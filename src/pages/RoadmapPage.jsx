import { useMemo, useState } from "react";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import RoadmapCard from "../components/RoadmapCard";
import CtaBanner from "../components/CtaBanner";
import Reveal from "../components/ui/Reveal";
import SegmentedControl from "../components/ui/SegmentedControl";
import Counter from "../components/ui/Counter";
import Button from "../components/Button";
import { TextField, SelectField } from "../components/ui/Field";
import { changelog, roadmap, roadmapStatuses } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import { wait } from "../lib/utils";

const typeStyles = {
  New: "text-accent",
  Improved: "text-fg-2",
  Fixed: "text-warn",
};

const SuggestForm = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("research");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 6) {
      setError("Describe the idea in a few more words (at least 6 characters).");
      return;
    }
    setError("");
    setLoading(true);
    await wait(900);
    setLoading(false);
    setTitle("");
    toast("Thank you. The product team reads every suggestion on Mondays.", { title: "Idea submitted" });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 md:grid-cols-[1fr_12rem_auto] md:items-start">
      <TextField
        label="Your idea"
        placeholder="For example: export a brief as a Word document"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        error={error}
      />
      <SelectField
        label="Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        options={[
          { value: "research", label: "Research" },
          { value: "writing", label: "Writing" },
          { value: "images", label: "Images" },
          { value: "integrations", label: "Integrations" },
          { value: "other", label: "Other" },
        ]}
      />
      <Button type="submit" variant="primary" className="h-11 md:mt-7" disabled={loading}>
        {loading ? "Sending" : "Submit idea"}
      </Button>
    </form>
  );
};

const RoadmapPage = () => {
  usePageMeta("Roadmap and changelog", "What the Aster team is building next, what shipped recently, and where you can vote or suggest features.");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("votes");

  const counts = useMemo(
    () => roadmap.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), { all: roadmap.length }),
    []
  );

  const overall = Math.round(roadmap.reduce((sum, i) => sum + i.progress, 0) / roadmap.length);

  const items = useMemo(() => {
    const list = roadmap.filter((i) => filter === "all" || i.status === filter);
    return sort === "votes" ? [...list].sort((a, b) => b.votes - a.votes) : list;
  }, [filter, sort]);

  return (
    <>
      <PageHero
        label="Roadmap and changelog"
        title="What we are building, and what just shipped"
        text="The roadmap is public and shaped by votes. Filter by status, upvote what you need most, and read the release notes below."
        aside={
          <dl className="grid grid-cols-2 border-t border-l border-line">
            <div className="col-span-2 p-5 border-r border-b border-line">
              <dt className="mb-3 text-xs text-fg-3">Overall progress across {roadmap.length} items</dt>
              <dd>
                <span className="block mb-3 font-mono text-3xl font-medium tracking-[-0.03em]">
                  <Counter value={overall} suffix="%" />
                </span>
                <span className="block h-1 rounded-full bg-line overflow-hidden">
                  <span className="block h-full bg-fg-2" style={{ width: `${overall}%` }} />
                </span>
              </dd>
            </div>
            {Object.entries(roadmapStatuses).map(([key, s], i) => (
              <div key={key} className={`p-5 border-r border-b border-line ${i === 2 ? "col-span-2" : ""}`}>
                <dd className="mb-1 font-mono text-2xl font-medium">
                  <Counter value={counts[key] || 0} />
                </dd>
                <dt className="text-xs text-fg-3">{s.label}</dt>
              </div>
            ))}
          </dl>
        }
      />

      <Section id="board">
        <div className="container">
          <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-end md:justify-between">
            <SegmentedControl
              label="Filter by status"
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: "All", badge: String(counts.all) },
                ...Object.entries(roadmapStatuses).map(([value, s]) => ({
                  value,
                  label: s.label,
                  badge: String(counts[value] || 0),
                })),
              ]}
            />
            <SelectField
              aria-label="Sort roadmap items"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="md:w-48"
              options={[
                { value: "votes", label: "Most voted" },
                { value: "timeline", label: "Timeline" },
              ]}
            />
          </div>

          <div className="grid border-t border-l border-line md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <RoadmapCard key={item.id} item={item} showProgress showVotes className="animate-fade-in" />
            ))}
          </div>
        </div>
      </Section>

      <Section id="changelog">
        <div className="container">
          <Heading label="Changelog" title="Recently shipped" text="Release notes for every version. Desktop apps update automatically." />
          <ol className="border-t border-line">
            {changelog.map((release, i) => (
              <Reveal as="li" key={release.version} delay={i * 60} className="grid-12 gap-y-4 py-8 border-b border-line md:py-10">
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                  <p className="font-mono text-sm text-fg">v{release.version}</p>
                  <time className="font-mono text-2xs text-fg-4">{release.date}</time>
                </div>
                <div className="col-span-4 md:col-span-6 lg:col-span-8">
                  <h3 className="t-h4 mb-4">{release.title}</h3>
                  <ul className="space-y-2.5">
                    {release.items.map((it) => (
                      <li key={it.text} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm text-fg-2">
                        <span className={`font-mono text-2xs uppercase tracking-label pt-[0.2rem] ${typeStyles[it.type]}`}>{it.type}</span>
                        {it.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="suggest">
        <div className="container">
          <Heading
            label="Suggest"
            title="Have an idea?"
            text="Tell us what would make Aster more useful in your work. Popular suggestions move onto the board above."
          />
          <div className="grid-12">
            <Reveal className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-4">
              <SuggestForm />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default RoadmapPage;
