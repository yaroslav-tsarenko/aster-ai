import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Reveal from "../components/ui/Reveal";
import Button from "../components/Button";
import Icon from "../components/ui/Icon";
import { TextField, TextArea } from "../components/ui/Field";
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
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (!file && !values.link.trim()) next.link = "Add a portfolio or LinkedIn link, or attach a CV.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("loading");
    await wait(1200);
    setState("done");
    toast(`Application for ${job.title} received`, { title: "Application received" });
  };

  if (state === "done") {
    return (
      <div className="py-10 text-center animate-pop-in">
        <div className="flex items-center justify-center w-11 h-11 mx-auto mb-6 rounded-md bg-accent text-accent-ink">
          <Icon name="check" size={20} strokeWidth={2.25} />
        </div>
        <h3 className="t-h4 mb-2">Application sent</h3>
        <p className="t-small mb-8 text-fg-3">Thanks {values.name.split(" ")[0]}. We review every application and reply within 5 working days.</p>
        <Button href="/careers" variant="secondary">Back to open roles</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <TextField label="Full name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
      <TextField label="Email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      <TextField label="Portfolio or LinkedIn" placeholder="https://" value={values.link} onChange={set("link")} error={errors.link} />
      <div>
        <span className="block mb-2 text-sm font-medium text-fg-2">CV (optional)</span>
        <label className="flex items-center gap-3 h-11 px-3.5 bg-surface border border-dashed border-line-strong rounded-md text-sm text-fg-3 cursor-pointer transition-colors hover:border-fg-4 focus-within:border-fg-3">
          <Icon name="paperclip" size={16} />
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
      <TextArea label="Why Aster?" maxLength={600} value={values.note} onChange={set("note")} placeholder="Tell us a little about yourself" />
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={state === "loading"}>
        {state === "loading" ? "Sending" : "Submit application"}
      </Button>
      <p className="text-xs text-fg-4">
        Demo form: nothing is uploaded or sent. See the <Link to="/privacy" className="underline underline-offset-2 hover:text-fg">privacy policy</Link>.
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
      <section className="pt-14 pb-14 md:pt-20 md:pb-20">
        <div className="container">
          <Breadcrumbs className="mb-10" items={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: job.title }]} />
          <Reveal className="grid-12 gap-y-8">
            <div className="col-span-4 md:col-span-8 lg:col-span-8">
              <p className="t-label mb-5 text-fg-3">{job.department}</p>
              <h1 className="t-h1 mb-6">{job.title}</h1>
              <p className="t-lead max-w-2xl">{job.summary}</p>
            </div>
          </Reveal>
          <dl className="grid grid-cols-2 mt-12 border-t border-l border-line md:grid-cols-4">
            {[
              ["Team", job.department],
              ["Location", job.location],
              ["Type", job.type],
              ["Salary", job.salary],
            ].map(([label, value]) => (
              <div key={label} className="p-4 border-r border-b border-line md:p-5">
                <dt className="t-label mb-2 text-fg-4">{label}</dt>
                <dd className="text-sm text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            {[
              ["What you will do", job.responsibilities],
              ["What you will bring", job.requirements],
              ["What we offer", perks.map((p) => `${p.title}: ${p.text}`)],
            ].map(([title, items]) => (
              <Reveal key={title} className="mb-12">
                <h2 className="t-h3 mb-5">{title}</h2>
                <ul className="border-b border-line">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-3 py-3.5 border-t border-line">
                      <Icon name="check" size={15} className="mt-1 text-fg-3" />
                      <span className="t-body text-fg-2">{it}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-24 lg:self-start" id="apply">
            <div className="p-6 rounded-xl border border-line bg-surface md:p-7">
              <h2 className="t-h4 mb-1">Apply for this role</h2>
              <p className="t-small mb-6 text-fg-3">We reply to every application within five working days.</p>
              <ApplyForm job={job} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetail;
