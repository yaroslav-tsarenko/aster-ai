import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../components/Section";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Reveal from "../components/ui/Reveal";
import GradientCard from "../components/ui/GradientCard";
import Button from "../components/Button";
import Icon from "../components/ui/Icon";
import { TextField, TextArea } from "../components/ui/Field";
import { check } from "../assets";
import { jobs, perks } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import { isValidEmail, wait } from "../lib/utils";
import NotFound from "./NotFound";

const ApplyForm = ({ job }) => {
  const { toast } = useToast();
  const [values, setValues] = useState({ name: "", email: "", link: "", note: "" });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (!file && !values.link.trim()) next.link = "Add a portfolio / LinkedIn link or attach a CV.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("loading");
    await wait(1200);
    setState("done");
    toast(`Application for ${job.title} received`, { title: "Thank you!" });
  };

  if (state === "done") {
    return (
      <div className="py-10 text-center animate-pop-in">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-color-4/15 text-color-4">
          <Icon name="check" size={32} />
        </div>
        <h3 className="h5 mb-3">Application sent!</h3>
        <p className="body-2 mb-8 text-n-4">Thanks {values.name.split(" ")[0]}. We review every application and reply within 5 working days.</p>
        <Button href="/careers">Back to open roles</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <TextField label="Full name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
      <TextField label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      <TextField label="Portfolio or LinkedIn" placeholder="https://" value={values.link} onChange={set("link")} error={errors.link} />
      <div>
        <span className="block mb-2 text-sm text-n-2">CV (optional)</span>
        <label className="flex items-center gap-3 h-12 px-4 bg-n-7 border border-dashed border-n-5 rounded-xl text-sm text-n-4 cursor-pointer transition-colors hover:border-color-1 focus-within:border-color-1">
          <Icon name="paperclip" size={18} />
          <span className="truncate">{file ? file.name : "Attach PDF (stays in your browser)"}</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              if (errors.link) setErrors((er) => ({ ...er, link: undefined }));
            }}
          />
        </label>
      </div>
      <TextArea label="Why Brainwave?" maxLength={600} value={values.note} onChange={set("note")} placeholder="Tell us a little about yourself" />
      <Button type="submit" white className="w-full" disabled={state === "loading"}>
        {state === "loading" ? "Sending…" : "Submit application"}
      </Button>
      <p className="text-xs text-n-4">
        Demo form: nothing is uploaded or sent. See our <Link to="/privacy" className="underline hover:text-n-1">privacy policy</Link>.
      </p>
    </form>
  );
};

const JobDetail = () => {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug);
  usePageMeta(job ? `${job.title} · Careers` : "Role not found", job?.summary);

  if (!job) return <NotFound />;

  return (
    <>
      <Section crosses customPaddings className="pt-12 pb-12 md:pt-20 lg:pt-24">
        <div className="absolute -top-40 left-1/2 w-[60rem] h-[30rem] -translate-x-1/2 bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" aria-hidden="true" />
        <div className="container relative z-2">
          <Breadcrumbs className="mb-10" items={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: job.title }]} />
          <Reveal>
            <h1 className="h1 mb-6 max-w-3xl">{job.title}</h1>
            <p className="body-1 mb-8 max-w-3xl text-n-3">{job.summary}</p>
            <div className="flex flex-wrap gap-3">
              {[
                ["briefcase", job.department],
                ["mapPin", job.location],
                ["clock", job.type],
                ["sparkle", job.salary],
              ].map(([icon, label]) => (
                <span key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-n-7 border border-n-6 text-sm text-n-2">
                  <Icon name={icon} size={16} className="text-color-1" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            {[
              ["What you'll do", job.responsibilities],
              ["What you'll bring", job.requirements],
              ["What we offer", perks.map((p) => `${p.title}: ${p.text}`)],
            ].map(([title, items]) => (
              <Reveal key={title} className="mb-12">
                <h2 className="h4 mb-6">{title}</h2>
                <ul>
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-4 py-4 border-t border-n-6">
                      <img src={check} width={24} height={24} alt="" />
                      <span className="body-2 text-n-2">{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start" id="apply">
            <GradientCard innerClassName="p-6 md:p-8">
              <h2 className="h5 mb-6">Apply for this role</h2>
              <ApplyForm job={job} />
            </GradientCard>
          </div>
        </div>
      </Section>
    </>
  );
};

export default JobDetail;
