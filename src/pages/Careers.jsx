import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import SegmentedControl from "../components/ui/SegmentedControl";
import Icon from "../components/ui/Icon";
import { jobs, perks } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const process = [
  { title: "Intro call", text: "30 minutes with the hiring manager about the role and what you want next." },
  { title: "Work sample", text: "A paid, time-boxed task close to the real job. Four hours at most." },
  { title: "Team conversations", text: "Two calls with future colleagues. You ask as many questions as we do." },
  { title: "Offer", text: "A written offer within three working days, with salary and equity in full." },
];

const Careers = () => {
  usePageMeta("Careers", "Join Aster. We are hiring engineers, a designer and a technical writer, remote in Europe.");
  const departments = useMemo(() => ["All", ...new Set(jobs.map((j) => j.department))], []);
  const [dept, setDept] = useState("All");
  const list = jobs.filter((j) => dept === "All" || j.department === dept);

  return (
    <>
      <PageHero
        label="Careers"
        title="Build the assistant people trust with their work"
        text="We are a team of 24, remote in Europe, building tools for researchers, editors and designers. Salaries are listed on every role."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      >
        <Button href="#open-roles" variant="primary" size="lg">
          See {jobs.length} open roles
        </Button>
      </PageHero>

      <Section>
        <div className="container">
          <Heading label="01 / How we work" title="Small team, long focus" />
          <div className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.id} delay={i * 60} className="p-6 border-r border-b border-line">
                <p className="mb-10 font-mono text-2xs text-fg-4">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h4 mb-2">{p.title}</h3>
                <p className="t-small text-fg-3">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="open-roles">
        <div className="container">
          <Heading label="02 / Open roles" title="Current openings">
            <div className="mt-8">
              <SegmentedControl label="Filter by department" value={dept} onChange={setDept} options={departments.map((d) => ({ value: d, label: d }))} />
            </div>
          </Heading>
          <ul className="border-t border-line">
            {list.map((job) => (
              <li key={job.slug} className="border-b border-line animate-fade-in">
                <Link to={`/careers/${job.slug}`} className="group grid-12 gap-y-3 py-6 transition-colors hover:bg-surface/60">
                  <div className="col-span-4 md:col-span-5 lg:col-span-6">
                    <h3 className="t-h4 mb-1">{job.title}</h3>
                    <p className="t-small text-fg-3">{job.summary}</p>
                  </div>
                  <div className="col-span-4 md:col-span-3 lg:col-span-5 flex flex-wrap content-start gap-x-5 gap-y-1 font-mono text-xs text-fg-3 lg:pt-1">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <span className="text-fg-2">{job.salary}</span>
                  </div>
                  <div className="hidden lg:flex lg:col-span-1 justify-end pt-1">
                    <Icon name="arrowRight" size={17} className="text-fg-4 transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 t-small text-fg-3">
            No role that fits?{" "}
            <Link to="/contact?topic=careers" className="text-fg underline underline-offset-4 decoration-line-strong hover:decoration-fg">
              Send an open application
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section>
        <div className="container">
          <Heading label="03 / Process" title="Four steps, about three weeks" />
          <ol className="grid border-t border-line md:grid-cols-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60} className="pt-6 pb-2 md:pr-8">
                <p className="mb-3 font-mono text-2xs text-fg-4">Step {i + 1}</p>
                <h3 className="t-h4 mb-2">{s.title}</h3>
                <p className="t-small text-fg-3">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <CtaBanner
        title="Want to know us first?"
        text="Read how Aster started, what we value and who you would work with."
        primary={{ label: "About Aster", url: "/about" }}
        secondary={{ label: "Read the blog", url: "/blog" }}
      />
    </>
  );
};

export default Careers;
