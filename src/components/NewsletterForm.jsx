import { useId, useState } from "react";
import useToast from "../hooks/useToast";
import { isValidEmail, wait } from "../lib/utils";
import Icon from "./ui/Icon";
import Spinner from "./ui/Spinner";

const NewsletterForm = ({ className = "", cta = "Subscribe", successMessage = "You're on the list! Check your inbox soon." }) => {
  const { toast } = useToast();
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setState("loading");
    await wait(900);
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
        className={`flex items-center gap-2 p-1.5 pl-4 bg-n-7 border rounded-2xl transition-colors focus-within:border-color-1 ${
          error ? "border-color-3" : "border-n-6"
        }`}
      >
        <Icon name="mail" size={18} className="text-n-4" />
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
          className="flex-1 min-w-0 h-10 bg-transparent outline-none text-sm placeholder:text-n-4"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="button inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-n-1 text-n-8 transition-colors hover:bg-color-1 hover:text-n-1 disabled:opacity-70"
        >
          {state === "loading" ? <Spinner /> : state === "done" ? <Icon name="check" size={16} /> : null}
          {state === "done" ? "Done" : cta}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-2 text-xs text-color-3">
          {error}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
