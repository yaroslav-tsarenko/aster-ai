import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout, { Divider, SocialButtons } from "../components/AuthLayout";
import Button from "../components/Button";
import Icon from "../components/ui/Icon";
import Spinner from "../components/ui/Spinner";
import { Checkbox, TextField } from "../components/ui/Field";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import { isValidEmail, wait } from "../lib/utils";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState("login"); // login | reset | reset-sent
  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | loading | success
  const redirect = useRef();

  usePageMeta(mode === "login" ? "Sign in" : "Reset password", "Sign in to Aster to continue with your projects.");

  useEffect(() => () => clearTimeout(redirect.current), []);

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!isValidEmail(values.email)) next.email = "Please enter a valid email address.";
    if (mode === "login" && values.password.length < 8) next.password = "Password must be at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setState("loading");
    await wait(1100);

    if (mode === "reset") {
      setState("idle");
      setMode("reset-sent");
      return;
    }

    setState("success");
    toast("Signed in to the demo workspace", { title: "Welcome back" });
    redirect.current = setTimeout(() => navigate("/app"), 1200);
  };

  if (mode === "reset-sent") {
    return (
      <AuthLayout title="Check your inbox" subtitle={`If an account exists for ${values.email}, we've sent a reset link.`}>
        <div className="flex items-center justify-center w-11 h-11 mb-8 rounded-md border border-line-strong text-fg-2 animate-pop-in">
          <Icon name="mail" size={20} />
        </div>
        <Button className="w-full" variant="secondary" onClick={() => setMode("login")}>
          Back to sign in
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={mode === "login" ? "Sign in" : "Reset password"}
      subtitle={mode === "login" ? "Continue with your projects, sources and drafts." : "Enter your email and we will send you a reset link."}
      footer={
        <>
          New to Aster?{" "}
          <Link to="/signup" className="text-fg underline underline-offset-4 decoration-line-strong transition-colors hover:decoration-fg">
            Create an account
          </Link>
        </>
      }
    >
      {mode === "login" && (
        <>
          <SocialButtons />
          <Divider label="or with email" />
        </>
      )}

      {state === "success" ? (
        <div className="py-6 text-center animate-pop-in" role="status">
          <div className="flex items-center justify-center w-11 h-11 mx-auto mb-5 rounded-md bg-accent text-accent-ink">
            <Icon name="check" size={20} strokeWidth={2.25} />
          </div>
          <p className="t-h4 mb-1">You are signed in</p>
          <p className="t-small flex items-center justify-center gap-2 text-fg-3">
            <Spinner className="w-3.5 h-3.5" /> Opening your workspace
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-5">
          <TextField label="Email" type="email" autoComplete="email" value={values.email} onChange={set("email")} error={errors.email} placeholder="you@company.com" />
          {mode === "login" && (
            <TextField label="Password" type="password" autoComplete="current-password" value={values.password} onChange={set("password")} error={errors.password} placeholder="••••••••" />
          )}
          {mode === "login" && (
            <div className="flex items-center justify-between gap-4">
              <Checkbox label="Remember me" checked={values.remember} onChange={set("remember")} />
              <button type="button" onClick={() => setMode("reset")} className="text-sm text-fg-3 underline underline-offset-4 decoration-line-strong transition-colors hover:text-fg">
                Forgot password?
              </button>
            </div>
          )}
          <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={state === "loading"}>
            {state === "loading" && <Spinner />}
            {state === "loading" ? (mode === "login" ? "Signing in" : "Sending") : mode === "login" ? "Sign in" : "Send reset link"}
          </Button>
          {mode === "reset" && (
            <button type="button" onClick={() => setMode("login")} className="text-sm text-fg-3 transition-colors hover:text-fg">
              Back to sign in
            </button>
          )}
        </form>
      )}
    </AuthLayout>
  );
};

export default Login;
