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

  usePageMeta(mode === "login" ? "Sign in" : "Reset password", "Sign in to Brainwave to continue your conversations.");

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
    toast("Signed in to the demo workspace", { title: "Welcome back!" });
    redirect.current = setTimeout(() => navigate("/app"), 1200);
  };

  if (mode === "reset-sent") {
    return (
      <AuthLayout title="Check your inbox" subtitle={`If an account exists for ${values.email}, we've sent a reset link.`}>
        <div className="flex items-center justify-center w-16 h-16 mb-8 rounded-full bg-color-1/15 text-color-1 animate-pop-in">
          <Icon name="mail" size={30} />
        </div>
        <Button className="w-full" onClick={() => setMode("login")}>
          Back to sign in
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={mode === "login" ? "Welcome back" : "Reset password"}
      subtitle={mode === "login" ? "Sign in to continue to Brainwave." : "Enter your email and we'll send you a reset link."}
      footer={
        <>
          New to Brainwave?{" "}
          <Link to="/signup" className="text-n-1 underline transition-colors hover:text-color-1">
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
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-full bg-color-4/15 text-color-4">
            <Icon name="check" size={30} />
          </div>
          <p className="h6 mb-1">You’re signed in</p>
          <p className="body-2 flex items-center justify-center gap-2 text-n-4">
            <Spinner className="w-3.5 h-3.5" /> Opening your workspace…
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
              <button type="button" onClick={() => setMode("reset")} className="text-sm text-n-3 underline transition-colors hover:text-color-1">
                Forgot password?
              </button>
            </div>
          )}
          <Button type="submit" white className="w-full mt-2" disabled={state === "loading"}>
            {state === "loading" && <Spinner />}
            {state === "loading" ? (mode === "login" ? "Signing in…" : "Sending…") : mode === "login" ? "Sign in" : "Send reset link"}
          </Button>
          {mode === "reset" && (
            <button type="button" onClick={() => setMode("login")} className="text-sm text-n-3 transition-colors hover:text-n-1">
              ← Back to sign in
            </button>
          )}
        </form>
      )}
    </AuthLayout>
  );
};

export default Login;
