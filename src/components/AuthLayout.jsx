import { Link } from "react-router-dom";
import Section from "./Section";
import Notification from "./Notification";
import Generating from "./Generating";
import { robot } from "../assets";
import { BackgroundCircles } from "./design/Header";
import useToast from "../hooks/useToast";

export const SocialButtons = () => {
  const { toast } = useToast();
  const providers = [
    {
      id: "google",
      label: "Google",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#FFC876" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.3Z" />
          <path fill="#7ADB78" d="M12 22c2.7 0 5-.9 6.7-2.5l-3.3-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z" />
          <path fill="#858DFF" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6Z" />
          <path fill="#FF776F" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.5l3.4 2.6C7.2 7.8 9.4 6 12 6Z" />
        </svg>
      ),
    },
    {
      id: "apple",
      label: "Apple",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7a4.6 4.6 0 0 0-3.6-2c-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.2-.9a4.8 4.8 0 0 0-4 2.5c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.4a10 10 0 0 0 1.3-2.7 4.2 4.2 0 0 1-2.3-3.9ZM14 5.4A4.3 4.3 0 0 0 15 2a4.4 4.4 0 0 0-2.9 1.5 4.1 4.1 0 0 0-1 3.2c1.1.1 2.2-.5 2.9-1.3Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {providers.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => toast(`${p.label} sign-in is not available in this demo`, { tone: "info" })}
          className="flex items-center justify-center gap-2 h-12 rounded-xl border border-n-6 bg-n-7 text-sm text-n-2 transition-colors hover:border-n-4 hover:text-n-1"
        >
          {p.icon}
          {p.label}
        </button>
      ))}
    </div>
  );
};

export const Divider = ({ label = "or" }) => (
  <div className="flex items-center gap-4 my-6 text-xs uppercase tracking-wider text-n-4">
    <span className="flex-1 h-px bg-n-6" />
    {label}
    <span className="flex-1 h-px bg-n-6" />
  </div>
);

const AuthLayout = ({ title, subtitle, children, footer }) => (
  <Section crosses customPaddings className="py-10 md:py-16 lg:py-20">
    <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className="w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end">
        <div className="p-0.25 rounded-[2rem] bg-conic-gradient">
          <div className="p-6 bg-n-8 rounded-[1.9375rem] md:p-10">
            <h1 className="h3 mb-2">{title}</h1>
            {subtitle && <p className="body-2 mb-8 text-n-4">{subtitle}</p>}
            {children}
          </div>
        </div>
        {footer && <div className="mt-6 text-center body-2 text-n-4">{footer}</div>}
        <p className="mt-6 text-center text-xs text-n-4">
          Demo only: no data is sent anywhere. <Link to="/privacy" className="underline hover:text-n-1">Privacy</Link> ·{" "}
          <Link to="/terms" className="underline hover:text-n-1">Terms</Link>
        </p>
      </div>

      <div className="relative hidden lg:block">
        <div className="absolute inset-0 -m-20 pointer-events-none" aria-hidden="true">
          <BackgroundCircles />
        </div>
        <div className="relative p-0.5 rounded-3xl bg-conic-gradient">
          <div className="relative h-[32rem] xl:h-[36rem] rounded-[1.4rem] overflow-hidden bg-n-8">
            <img src={robot} alt="" className="w-full h-full object-cover" />
            <Generating cycle className="absolute left-6 right-6 bottom-6 border border-n-1/10" />
          </div>
        </div>
        <Notification className="absolute -left-10 top-16 w-[18rem]" title="Welcome aboard!" />
      </div>
    </div>
  </Section>
);

export default AuthLayout;
