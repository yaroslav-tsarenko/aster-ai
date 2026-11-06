import { Link } from "react-router-dom";
import useToast from "../hooks/useToast";
import AppFrame from "./product/AppFrame";
import { ChatMock } from "./product/Mocks";
import Avatar from "./brand/Avatar";

export const SocialButtons = () => {
  const { toast } = useToast();
  const providers = [
    {
      id: "google",
      label: "Google",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.3ZM12 22c2.7 0 5-.9 6.7-2.5l-3.3-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22Zm-5.6-8.1a6 6 0 0 1 0-3.8V7.5H3a10 10 0 0 0 0 9l3.4-2.6ZM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3 7.5l3.4 2.6C7.2 7.8 9.4 6 12 6Z" />
        </svg>
      ),
    },
    {
      id: "microsoft",
      label: "Microsoft",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {providers.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => toast(`${p.label} sign-in is not available in this demo`, { tone: "info" })}
          className="flex items-center justify-center gap-2 h-10 rounded-md border border-line-strong text-sm text-fg-2 transition-colors hover:border-fg-4 hover:text-fg hover:bg-surface"
        >
          {p.icon}
          {p.label}
        </button>
      ))}
    </div>
  );
};

export const Divider = ({ label = "or" }) => (
  <div className="flex items-center gap-3 my-6 t-label text-fg-4">
    <span className="flex-1 h-px bg-line" />
    {label}
    <span className="flex-1 h-px bg-line" />
  </div>
);

const AuthLayout = ({ title, subtitle, children, footer }) => (
  <section className="border-b border-line">
    <div className="container grid-12 gap-y-12 py-14 md:py-20 lg:py-24">
      <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-1">
        <div className="max-w-md">
          <h1 className="t-h2 mb-3">{title}</h1>
          {subtitle && <p className="t-body mb-8 text-fg-3">{subtitle}</p>}
          {children}
          {footer && <div className="mt-8 pt-6 border-t border-line t-small text-fg-3">{footer}</div>}
          <p className="mt-6 text-xs text-fg-4">
            Demo only: nothing you enter leaves your browser.{" "}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-fg">Privacy</Link>
            {" / "}
            <Link to="/terms" className="underline underline-offset-2 hover:text-fg">Terms</Link>
          </p>
        </div>
      </div>

      <aside className="hidden lg:flex flex-col col-span-6 col-start-7 p-8 rounded-xl border border-line bg-surface bg-dotgrid" aria-label="About Aster">
        <AppFrame title="aster.app / Urban heat brief">
          <ChatMock />
        </AppFrame>
        <figure className="mt-auto pt-10">
          <blockquote className="t-lead text-fg">
            “I can hand a brief to a colleague and they can check every line in a minute instead of an afternoon.”
          </blockquote>
          <figcaption className="flex items-center gap-3 mt-5">
            <Avatar name="Ines Marchetti" size={32} />
            <span>
              <span className="block text-sm font-medium">Ines Marchetti</span>
              <span className="block text-xs text-fg-3">Policy researcher, Halden Institute (fictional)</span>
            </span>
          </figcaption>
        </figure>
      </aside>
    </div>
  </section>
);

export default AuthLayout;
