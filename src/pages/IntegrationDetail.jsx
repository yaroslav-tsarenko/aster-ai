import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../components/Section";
import Button from "../components/Button";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import Spinner from "../components/ui/Spinner";
import CtaBanner from "../components/CtaBanner";
import AppMark from "../components/brand/AppMark";
import { LogoMark } from "../components/brand/Logo";
import { collabApps } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import NotFound from "./NotFound";

const ConnectButton = ({ app }) => {
  const { toast } = useToast();
  const [state, setState] = useState("idle");
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = () => {
    if (state === "connected") {
      setState("idle");
      toast(`${app.title} disconnected`, { tone: "info" });
      return;
    }
    setState("connecting");
    timer.current = setTimeout(() => {
      setState("connected");
      toast(`${app.title} connected to your demo workspace`, { title: "Connected" });
    }, 1400);
  };

  return (
    <Button
      variant={state === "connected" ? "secondary" : "primary"}
      size="lg"
      onClick={onClick}
      disabled={state === "connecting"}
      aria-live="polite"
    >
      {state === "connecting" && <Spinner className="w-3.5 h-3.5" />}
      {state === "connected" && <Icon name="check" size={15} className="text-accent" />}
      {state === "idle" ? `Connect ${app.title}` : state === "connecting" ? "Connecting" : "Connected. Disconnect"}
    </Button>
  );
};

const ConnectionCard = ({ app }) => (
  <div className="p-5 rounded-xl border border-line bg-surface bg-dotgrid md:p-6">
    <div className="flex items-center justify-between gap-4 p-5 rounded-lg border border-line-strong bg-bg">
      <div className="flex flex-col items-center gap-2">
        <AppMark mark={app.mark} size="lg" />
        <span className="font-mono text-2xs text-fg-3">{app.title}</span>
      </div>
      <div className="flex-1 flex items-center gap-2" aria-hidden="true">
        <span className="flex-1 h-px bg-line-strong" />
        <Icon name="arrowRight" size={14} className="text-fg-3" />
        <span className="flex-1 h-px bg-line-strong" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <LogoMark size={64} />
        <span className="font-mono text-2xs text-fg-3">Aster</span>
      </div>
    </div>
    <dl className="grid grid-cols-2 mt-4 text-xs">
      <div className="py-2.5 border-b border-line">
        <dt className="text-fg-4">Access</dt>
        <dd className="mt-0.5 text-fg-2">Read only, scoped</dd>
      </div>
      <div className="py-2.5 border-b border-line">
        <dt className="text-fg-4">Sync</dt>
        <dd className="mt-0.5 text-fg-2">Every 15 minutes</dd>
      </div>
      <div className="py-2.5">
        <dt className="text-fg-4">Workspaces</dt>
        <dd className="mt-0.5 font-mono text-fg-2">{app.installs}</dd>
      </div>
      <div className="py-2.5">
        <dt className="text-fg-4">Plans</dt>
        <dd className="mt-0.5 text-fg-2">Free, Pro, Team</dd>
      </div>
    </dl>
  </div>
);

const IntegrationDetail = () => {
  const { slug } = useParams();
  const app = collabApps.find((a) => a.slug === slug);
  usePageMeta(app ? `${app.title} integration` : "Integration not found", app?.description);

  if (!app) return <NotFound />;

  const related = collabApps.filter((a) => a.slug !== slug && a.category === app.category).slice(0, 3);
  const more = related.length ? related : collabApps.filter((a) => a.slug !== slug).slice(0, 3);
  const steps = [
    `Select Connect ${app.title} and sign in to ${app.title}.`,
    "Choose exactly which folders, collections or channels Aster may read.",
    `Ask a question in any project. Answers cite the ${app.title} item they used.`,
  ];

  return (
    <>
      <PageHero
        label={app.category}
        title={`Aster for ${app.title}`}
        text={app.description}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Integrations", to: "/integrations" },
          { label: app.title },
        ]}
        aside={<ConnectionCard app={app} />}
      >
        <ConnectButton app={app} />
      </PageHero>

      <Section>
        <div className="container grid-12 gap-y-12">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="t-label mb-5 text-fg-3">Capabilities</p>
            <h2 className="t-h2 mb-8">What you can do</h2>
            <ul className="border-t border-line">
              {app.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 py-4 border-b border-line text-[0.9375rem] text-fg-2">
                  <Icon name="check" size={16} className="mt-1 text-fg-3" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <p className="t-label mb-5 text-fg-3">Setup</p>
            <h2 className="t-h2 mb-8">Three steps</h2>
            <ol className="border-t border-line">
              {steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4 py-4 border-b border-line">
                  <span className="font-mono text-xs text-fg-4 pt-0.5">0{i + 1}</span>
                  <span className="text-[0.9375rem] text-fg-2">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-fg-3">
              Disconnecting removes the index within 24 hours. Read the{" "}
              <Link to="/privacy" className="text-fg-2 underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                privacy policy
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="t-h3">Related integrations</h2>
            <Link to="/integrations" className="inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors hover:text-fg">
              All integrations <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <ul className="grid border-t border-l border-line md:grid-cols-3">
            {more.map((a) => (
              <li key={a.id} className="border-r border-b border-line">
                <Link to={`/integrations/${a.slug}`} className="group flex items-center gap-4 p-5 transition-colors hover:bg-surface">
                  <AppMark mark={a.mark} size="sm" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium">{a.title}</span>
                    <span className="block font-mono text-2xs text-fg-4">{a.category}</span>
                  </span>
                  <Icon name="arrowUpRight" size={14} className="text-fg-4 transition-colors group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default IntegrationDetail;
