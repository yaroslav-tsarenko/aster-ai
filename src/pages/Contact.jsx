import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Button from "../components/Button";
import Reveal from "../components/ui/Reveal";
import GradientCard from "../components/ui/GradientCard";
import Accordion from "../components/ui/Accordion";
import Icon from "../components/ui/Icon";
import { TextField, TextArea, SelectField, Checkbox } from "../components/ui/Field";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import { isValidEmail, wait } from "../lib/utils";
import { pricingFaq } from "../constants";

const topics = [
  { value: "general", label: "General question" },
  { value: "sales", label: "Sales & Enterprise" },
  { value: "billing", label: "Billing" },
  { value: "integrations", label: "Integrations" },
  { value: "careers", label: "Careers" },
  { value: "privacy", label: "Privacy" },
  { value: "press", label: "Press" },
];

const channels = [
  { icon: "chat", title: "Chat with us", text: "Average reply in 4 minutes", action: { label: "Open chat", to: "/app" } },
  { icon: "mail", title: "Email support", text: "We reply within one business day", action: { label: "Write a message", to: "#contact-form" } },
  { icon: "mapPin", title: "Visit us", text: "Rua Augusta 27, Lisbon, Portugal", action: { label: "Meet the team", to: "/about#team" } },
];

const Contact = () => {
  usePageMeta("Contact", "Questions about Brainwave? Contact our sales, support or press teams.");
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
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 20) next.message = "Your message should be at least 20 characters.";
    if (!values.consent) next.consent = "Please accept the privacy policy.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast("Please fix the highlighted fields", { tone: "error" });
      return;
    }
    setState("loading");
    await wait(1200);
    setState("done");
    toast("We'll get back to you within one business day.", { title: "Message sent" });
  };

  return (
    <>
      <PageHero
        tag="Contact"
        title={
          <>
            Let’s <span className="text-gradient">talk</span>
          </>
        }
        text="Whether you're curious about Enterprise, need help with your account or just want to say hi, we'd love to hear from you."
      />

      <Section>
        <div className="container">
          <div className="grid gap-6 mb-16 md:grid-cols-3">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="flex flex-col h-full p-7 border border-n-6 rounded-3xl transition-colors hover:border-n-5">
                  <span className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-n-7 text-color-1">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <h2 className="h6 mb-1">{c.title}</h2>
                  <p className="body-2 flex-1 mb-6 text-n-4">{c.text}</p>
                  <Link to={c.action.to} className="inline-flex items-center gap-2 button text-n-1 transition-colors hover:text-color-1">
                    {c.action.label} <Icon name="arrowRight" size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal id="contact-form">
              <GradientCard innerClassName="p-6 md:p-10" rounded="rounded-[2rem]" innerRounded="rounded-[1.9375rem]">
                {state === "done" ? (
                  <div className="py-16 text-center animate-pop-in">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-color-4/15 text-color-4">
                      <Icon name="check" size={32} />
                    </div>
                    <h2 className="h4 mb-3">Thanks, {values.name.split(" ")[0]}!</h2>
                    <p className="body-2 mb-8 text-n-4">Your message is on its way. We’ll reply to {values.email} soon.</p>
                    <Button
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
                    <h2 className="h4 md:col-span-2">Send us a message</h2>
                    <TextField label="Name" value={values.name} onChange={set("name")} error={errors.name} autoComplete="name" />
                    <TextField label="Work email" type="email" value={values.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                    <TextField label="Company (optional)" value={values.company} onChange={set("company")} autoComplete="organization" />
                    <SelectField label="Topic" value={values.topic} onChange={set("topic")} options={topics} />
                    <TextArea className="md:col-span-2" label="Message" maxLength={1000} value={values.message} onChange={set("message")} error={errors.message} placeholder="How can we help?" />
                    <Checkbox
                      className="md:col-span-2"
                      checked={values.consent}
                      onChange={set("consent")}
                      error={errors.consent}
                      label={
                        <>
                          I agree to the <Link to="/privacy" className="text-n-1 underline hover:text-color-1">privacy policy</Link>.
                        </>
                      }
                    />
                    <div className="md:col-span-2">
                      <Button type="submit" white disabled={state === "loading"}>
                        {state === "loading" ? "Sending…" : "Send message"}
                      </Button>
                    </div>
                  </form>
                )}
              </GradientCard>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="h4 mb-6">Quick answers</h2>
              <Accordion items={pricingFaq.slice(0, 4)} />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;
