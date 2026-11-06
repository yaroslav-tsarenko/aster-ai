import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthLayout, { Divider, SocialButtons } from "../components/AuthLayout";
import Button from "../components/Button";
import Icon from "../components/ui/Icon";
import Spinner from "../components/ui/Spinner";
import { Checkbox, TextField } from "../components/ui/Field";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import { isValidEmail, wait } from "../lib/utils";
import { pricing } from "../constants";

const strengthLabels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
const strengthColors = ["#f07a6a", "#f07a6a", "#e6b94f", "#c6f432", "#c6f432"];

const scorePassword = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(4, score);
};

const Signup = () => {
  usePageMeta("Create account", "Create a free Aster account in under a minute. No card required.");
  const { toast } = useToast();
  const [params] = useSearchParams();
  const plan = pricing.find((p) => p.slug === params.get("plan")) || pricing[0];
  const seats = Number(params.get("seats")) || null;

  const [values, setValues] = useState({ name: "", email: "", password: "", terms: false });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");
  const strength = useMemo(() => scorePassword(values.password), [values.password]);

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = "Enter your name.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (values.password.length < 8) next.password = "Use at least 8 characters.";
    else if (strength < 2) next.password = "Add upper-case letters, numbers or symbols.";
    if (!values.terms) next.terms = "You need to accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("loading");
    await wait(1300);
    setState("done");
    toast("Your demo account is ready", { title: "Account created" });
  };

  if (state === "done") {
    return (
      <AuthLayout title={`Welcome, ${values.name.split(" ")[0]}`} subtitle="Your account is ready. Three good first steps:">
        <ul className="mb-8 border-t border-line animate-pop-in">
          {[
            { icon: "chat", label: "Ask your first question", to: "/app" },
            { icon: "image", label: "Generate an image from a preset", to: "/how-to-use#studio" },
            { icon: "link", label: "Connect Zotero, Drive or Notion", to: "/integrations" },
          ].map((s) => (
            <li key={s.label}>
              <Link to={s.to} className="group flex items-center gap-4 py-4 border-b border-line transition-colors hover:text-fg">
                <Icon name={s.icon} size={17} className="text-fg-3" />
                <span className="flex-1 text-sm">{s.label}</span>
                <Icon name="arrowRight" size={15} className="text-fg-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
        <Button href="/app" variant="primary" size="lg" className="w-full">
          Open Aster
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start on the Free plan or a 14-day trial. No card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-fg underline underline-offset-4 decoration-line-strong transition-colors hover:decoration-fg">
            Sign in
          </Link>
        </>
      }
    >
      <div className="flex items-center justify-between gap-3 mb-6 p-4 rounded-md bg-surface border border-line">
        <div>
          <p className="t-label mb-1 text-fg-4">Selected plan</p>
          <p className="text-sm font-medium">
            {plan.title}
            {seats ? ` · ${seats} seats` : ""}
          </p>
        </div>
        <Link to="/pricing" className="text-sm text-fg-2 underline underline-offset-4 decoration-line-strong transition-colors hover:text-fg">
          Change
        </Link>
      </div>

      <SocialButtons />
      <Divider label="or with email" />

      <form onSubmit={onSubmit} noValidate className="grid gap-5">
        <TextField label="Full name" autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} />
        <TextField label="Email" type="email" autoComplete="email" value={values.email} onChange={set("email")} error={errors.email} placeholder="you@company.com" />
        <div>
          <TextField label="Password" type="password" autoComplete="new-password" value={values.password} onChange={set("password")} error={errors.password} />
          {values.password && (
            <div className="mt-3" aria-live="polite">
              <div className="flex gap-1.5 mb-1.5" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="flex-1 h-1 rounded-full transition-colors duration-300"
                    style={{ background: i < strength ? strengthColors[strength] : "#26292e" }}
                  />
                ))}
              </div>
              <p className="font-mono text-2xs" style={{ color: strengthColors[strength] }}>
                Password strength: {strengthLabels[strength]}
              </p>
            </div>
          )}
        </div>
        <Checkbox
          checked={values.terms}
          onChange={set("terms")}
          error={errors.terms}
          label={
            <>
              I agree to the <Link to="/terms" className="text-fg underline underline-offset-2">Terms</Link> and{" "}
              <Link to="/privacy" className="text-fg underline underline-offset-2">Privacy policy</Link>.
            </>
          }
        />
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={state === "loading"}>
          {state === "loading" && <Spinner />}
          {state === "loading" ? "Creating account" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
