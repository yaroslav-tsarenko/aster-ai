import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import SegmentedControl from "../components/ui/SegmentedControl";
import GradientCard from "../components/ui/GradientCard";
import Icon from "../components/ui/Icon";
import { jobs, perks } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const Careers = () => {
  usePageMeta("Careers", "Join the Brainwave team. We're hiring engineers, designers and researchers to build a calm, private AI assistant.");
  const departments = useMemo(() => ["All", ...new Set(jobs.map((j) => j.department))], []);
  const [dept, setDept] = useState("All");
  const list = jobs.filter((j) => dept === "All" || j.department === dept);

  return (
    <>
      <PageHero
        tag="Careers"
        title={
          <>
            Help us shape the <span className="text-gradient">future of AI</span>
          </>
        }
        text="We're a remote-first team of builders who care deeply about craft, privacy and the people who use our product."
      >
        <Button href="#open-roles" white>
          See open roles
        </Button>
      </PageHero>

      <Section crosses>
        <div className="container">
          <Heading tag="Perks" title="Why you'll love working here" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <GradientCard muted={i !== 0} className="h-full" innerClassName="p-7">
                  <span className="block mb-5 font-code text-sm text-color-1">0{i + 1}</span>
                  <h3 className="h6 mb-2">{p.title}</h3>
                  <p className="body-2 text-n-4">{p.text}</p>
                </GradientCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section crosses id="open-roles">
        <div className="container">
          <Heading tag={`${jobs.length} open roles`} title="Find your role" />
          <div className="flex justify-center mb-10">
            <SegmentedControl label="Filter by department" value={dept} onChange={setDept} size="sm" options={departments.map((d) => ({ value: d, label: d }))} />
          </div>
          <ul className="max-w-4xl mx-auto border-t border-n-6">
            {list.map((job) => (
              <li key={job.slug} className="border-b border-n-6 animate-fade-in">
                <Link to={`/careers/${job.slug}`} className="group flex flex-col gap-4 py-7 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3 className="h6 mb-1 transition-colors group-hover:text-color-1">{job.title}</h3>
                    <p className="body-2 text-n-4">{job.summary}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end md:w-72">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-n-7 text-xs text-n-3">
                      <Icon name="briefcase" size={14} />
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-n-7 text-xs text-n-3">
                      <Icon name="mapPin" size={14} />
                      {job.location}
                    </span>
                  </div>
                  <Icon name="arrowRight" size={20} className="hidden md:block text-n-4 transition-transform group-hover:translate-x-1 group-hover:text-n-1" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center body-2 text-n-4">
            Don’t see your role?{" "}
            <Link to="/contact?topic=careers" className="text-n-1 underline transition-colors hover:text-color-1">
              Send us an open application
            </Link>
            .
          </p>
        </div>
      </Section>

      <CtaBanner title="Curious about our culture?" text="Read how we work, what we value and how Brainwave started." primary={{ label: "About Brainwave", url: "/about" }} secondary={{ label: "Read the blog", url: "/blog" }} />
    </>
  );
};

export default Careers;
