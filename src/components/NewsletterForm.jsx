import { useId, useState } from "react";
import useToast from "../hooks/useToast";
import { isValidEmail, wait } from "../lib/utils";
import Icon from "./ui/Icon";
import Spinner from "./ui/Spinner";

const NewsletterForm = ({ className = "", cta = "Subscribe", successMessage = "You are subscribed. The next issue goes out on the first Tuesday of the month." }) => {
  const { toast } = useToast();
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setState("loading");
    await wait(800);
    setState("done");
    setEmail("");
    toast(successMessage, { title: "Subscribed" });
  };

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div
        className={`flex items-center gap-2 p-1 pl-3 bg-surface border rounded-md transition-colors focus-within:border-fg-3 ${
          error ? "border-danger" : "border-line-strong"
        }`}
      >
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
            if (state === "done") setState("idle");
          }}
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="flex-1 min-w-0 h-8 bg-transparent outline-none text-sm placeholder:text-fg-4"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded bg-fg text-bg text-[0.8125rem] font-medium transition-colors hover:bg-white disabled:opacity-70"
        >
          {state === "loading" ? <Spinner className="w-3.5 h-3.5" /> : state === "done" ? <Icon name="check" size={14} /> : null}
          {state === "done" ? "Done" : cta}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
