import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import { TextField, TextArea, SelectField, Checkbox } from "../components/ui/Field";
import Faq from "../components/home/Faq";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import { isValidEmail, wait } from "../lib/utils";

const topics = [
  { value: "general", label: "General question" },
  { value: "sales", label: "Sales and teams" },
  { value: "billing", label: "Billing" },
  { value: "integrations", label: "Integrations" },
  { value: "careers", label: "Careers" },
  { value: "privacy", label: "Privacy" },
  { value: "press", label: "Press" },
];

const channels = [
  { icon: "mail", title: "Support", text: "hello@aster.example", meta: "Reply within one working day" },
  { icon: "users", title: "Sales and teams", text: "sales@aster.example", meta: "Demos for 10 seats or more" },
  { icon: "shield", title: "Security and privacy", text: "security@aster.example", meta: "DPA and sub-processor list on request" },
  { icon: "mapPin", title: "Office", text: "Torstraße 140, 10119 Berlin", meta: "Fictional address, concept product" },
];

const Contact = () => {
  usePageMeta("Contact", "Questions about Aster? Contact support, sales or the security team.");
  const { toast } = useToast();
  const [params] = useSearchParams();
  const initialTopic = topics.some((t) => t.value === params.get("topic")) ? params.get("topic") : "general";

  const [values, setValues] = useState({ name: "", email: "", company: "", topic: initialTopic, message: "", consent: false });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = "Tell us your name.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (values.message.trim().length < 20) next.message = "Write at least 20 characters so we can help.";
    if (!values.consent) next.consent = "Accept the privacy policy to continue.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast("Check the highlighted fields", { tone: "error" });
      return;
    }
    setState("loading");
    await wait(1200);
    setState("done");
    toast("A person will reply within one working day.", { title: "Message sent" });
  };

  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to the people who build Aster"
        text="Questions about plans, a security review, a bug or an idea. Every message is read by a person on the team."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container grid-12 gap-y-12">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-4">
            <ul className="border-t border-line">
              {channels.map((c) => (
                <li key={c.title} className="flex gap-4 py-5 border-b border-line">
                  <Icon name={c.icon} size={17} className="mt-0.5 text-fg-3" />
                  <div className="min-w-0">
                    <h2 className="text-sm font-medium mb-1">{c.title}</h2>
                    <p className="text-sm text-fg-2 break-words">{c.text}</p>
                    <p className="mt-1 font-mono text-2xs text-fg-4">{c.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 t-small text-fg-3">
              Looking for a job? See <Link to="/careers" className="text-fg underline underline-offset-4 decoration-line-strong hover:decoration-fg">open roles</Link>.
            </p>
          </Reveal>

          <Reveal delay={80} id="contact-form" className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <div className="p-6 rounded-xl border border-line bg-surface md:p-10">
              {state === "done" ? (
                <div className="py-12 animate-pop-in" role="status">
                  <div className="flex items-center justify-center w-11 h-11 mb-6 rounded-md bg-accent text-accent-ink">
                    <Icon name="check" size={20} strokeWidth={2.25} />
                  </div>
                  <h2 className="t-h3 mb-2">Thanks, {values.name.split(" ")[0]}</h2>
                  <p className="t-body mb-8 text-fg-3">Your message is in the queue. We will reply to {values.email} within one working day.</p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setValues({ name: "", email: "", company: "", topic: "general", message: "", consent: false });
                      setState("idle");
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <h2 className="t-h3 mb-1">Send a message</h2>
                    <p className="t-small text-fg-3">All fields except company are required.</p>
                  </div>
                  <TextField label="Name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
                  <TextField label="Work email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                  <TextField label="Company (optional)" value={values.company} onChange={set("company")} autoComplete="organization" />
                  <SelectField label="Topic" value={values.topic} onChange={set("topic")} options={topics} />
                  <TextArea className="md:col-span-2" label="Message" maxLength={1000} value={values.message} onChange={set("message")} error={errors.message} placeholder="What are you working on, and how can we help?" />
                  <Checkbox
                    className="md:col-span-2"
                    checked={values.consent}
                    onChange={set("consent")}
                    error={errors.consent}
                    label={
                      <>
                        I agree to the <Link to="/privacy" className="text-fg underline underline-offset-2">privacy policy</Link>.
                      </>
                    }
                  />
                  <div className="md:col-span-2">
                    <Button type="submit" variant="primary" size="lg" disabled={state === "loading"}>
                      {state === "loading" ? "Sending" : "Send message"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Faq label="Quick answers" title="Before you write" />
    </>
  );
};

export default Contact;
