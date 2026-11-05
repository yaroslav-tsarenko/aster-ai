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
import { Gradient } from "../components/design/Roadmap";
import { changelog, roadmap, roadmapStatuses } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import useInView from "../hooks/useInView";
import { wait } from "../lib/utils";

const typeColors = {
  New: "bg-color-4/15 text-color-4",
  Improved: "bg-color-5/15 text-color-5",
  Fixed: "bg-color-2/15 text-color-2",
};

const ProgressRing = ({ value }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="relative w-36 h-36">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="ring-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFC876" />
            <stop offset="50%" stopColor="#79FFF7" />
            <stop offset="100%" stopColor="#9F53FF" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="#252134" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={inView ? c * (1 - value / 100) : c}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Counter value={value} suffix="%" className="h4 font-semibold" />
        <span className="tagline text-n-4">Complete</span>
      </div>
    </div>
  );
};

const SuggestForm = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("chat");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 6) {
      setError("Tell us a little more (at least 6 characters).");
      return;
    }
    setError("");
    setLoading(true);
    await wait(900);
    setLoading(false);
    setTitle("");
    toast("Thanks! Our product team reviews every suggestion.", { title: "Idea submitted" });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 md:grid-cols-[1fr_12rem_auto] md:items-start">
      <TextField
        label="Your idea"
        placeholder="e.g. Export conversations to PDF"
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
          { value: "chat", label: "Chat" },
          { value: "images", label: "Images" },
          { value: "integrations", label: "Integrations" },
          { value: "other", label: "Other" },
        ]}
      />
      <Button type="submit" white className="md:mt-7" disabled={loading}>
        {loading ? "Sending…" : "Submit idea"}
      </Button>
    </form>
  );
};

const RoadmapPage = () => {
  usePageMeta("Roadmap", "See what the Brainwave team is building next, vote on upcoming features and browse the changelog.");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("votes");

  const counts = useMemo(
    () =>
      roadmap.reduce(
        (acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }),
        { all: roadmap.length }
      ),
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
        tag="Public roadmap"
        title={
          <>
            What we’re <span className="text-gradient">building next</span>
          </>
        }
        text="Our roadmap is shaped by the community. Filter by status, upvote the features you want most and see what shipped recently."
      />

      <Section crosses customPaddings className="py-12 lg:py-16">
        <div className="container flex flex-col items-center gap-10 md:flex-row md:justify-between">
          <ProgressRing value={overall} />
          <div className="grid grid-cols-3 gap-6 w-full md:max-w-2xl">
            {Object.entries(roadmapStatuses).map(([key, s]) => (
              <div key={key} className="p-5 text-center border border-n-6 rounded-2xl">
                <span className="inline-block w-2.5 h-2.5 mb-3 rounded-full" style={{ background: s.color }} />
                <Counter value={counts[key] || 0} className="block h4" />
                <p className="tagline text-n-4">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="overflow-hidden" id="board">
        <div className="container">
          <div className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between">
            <SegmentedControl
              label="Filter by status"
              value={filter}
              onChange={setFilter}
              size="sm"
              options={[
                { value: "all", label: `All ${counts.all}` },
                ...Object.entries(roadmapStatuses).map(([value, s]) => ({
                  value,
                  label: `${s.label} ${counts[value] || 0}`,
                })),
              ]}
            />
            <SelectField
              aria-label="Sort roadmap items"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="md:w-52"
              options={[
                { value: "votes", label: "Most voted" },
                { value: "timeline", label: "Timeline" },
              ]}
            />
          </div>

          <div className="relative grid gap-6 md:grid-cols-2 md:gap-4">
            {items.map((item) => (
              <RoadmapCard key={item.id} item={item} showProgress showVotes className="animate-pop-in" />
            ))}
            <Gradient />
          </div>
        </div>
      </Section>

      <Section crosses id="changelog">
        <div className="container">
          <Heading tag="Changelog" title="Recently shipped" />
          <ol className="relative max-w-3xl mx-auto border-l border-n-6 ml-3 md:ml-auto">
            {changelog.map((release, i) => (
              <Reveal as="li" key={release.version} delay={i * 80} className="relative pl-8 pb-12 last:pb-0 md:pl-12">
                <span className="absolute -left-[0.4375rem] top-1.5 w-3.5 h-3.5 rounded-full bg-conic-gradient ring-4 ring-n-8" />
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-n-7 font-code text-xs text-n-1">v{release.version}</span>
                  <time className="tagline text-n-4">{release.date}</time>
                </div>
                <h3 className="h5 mb-4">{release.title}</h3>
                <ul className="space-y-2.5">
                  {release.items.map((it) => (
                    <li key={it.text} className="flex items-start gap-3 body-2 text-n-3">
                      <span className={`shrink-0 px-2 py-0.5 rounded font-code text-[0.6875rem] uppercase ${typeColors[it.type]}`}>{it.type}</span>
                      {it.text}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section crosses id="suggest">
        <div className="container max-w-4xl">
          <Heading tag="Have an idea?" title="Suggest a feature" text="Tell us what would make Brainwave better for you. Popular ideas land on the board above." />
          <Reveal>
            <SuggestForm />
          </Reveal>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default RoadmapPage;
