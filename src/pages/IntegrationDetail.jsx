import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../components/Section";
import Button from "../components/Button";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Reveal from "../components/ui/Reveal";
import GradientCard from "../components/ui/GradientCard";
import Icon from "../components/ui/Icon";
import Spinner from "../components/ui/Spinner";
import CtaBanner from "../components/CtaBanner";
import { brainwaveSymbol, check } from "../assets";
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
    <Button white={state !== "connected"} onClick={onClick} disabled={state === "connecting"} aria-live="polite">
      {state === "connecting" && <Spinner />}
      {state === "connected" && <Icon name="check" size={16} />}
      {state === "idle" ? `Connect ${app.title}` : state === "connecting" ? "Connecting…" : "Connected · Disconnect"}
    </Button>
  );
};

const IntegrationDetail = () => {
  const { slug } = useParams();
  const app = collabApps.find((a) => a.slug === slug);
  usePageMeta(app ? `${app.title} integration` : "Integration not found", app?.description);

  if (!app) return <NotFound />;

  const related = collabApps.filter((a) => a.slug !== slug && a.category === app.category).slice(0, 3);
  const more = related.length ? related : collabApps.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Section crosses customPaddings className="pt-12 pb-16 md:pt-20 lg:pt-24 lg:pb-24 overflow-hidden">
        <div className="absolute -top-40 left-1/2 w-[60rem] h-[30rem] -translate-x-1/2 bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" aria-hidden="true" />
        <div className="container relative z-2">
          <Breadcrumbs
            className="mb-10"
            items={[
              { label: "Home", to: "/" },
              { label: "Integrations", to: "/integrations" },
              { label: app.title },
            ]}
          />
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <Reveal>
              <span className="inline-block mb-5 px-3 py-1 rounded-full bg-n-7 tagline text-n-3">{app.category}</span>
              <h1 className="h1 mb-6">Brainwave for {app.title}</h1>
              <p className="body-1 mb-10 text-n-3">{app.description}</p>
              <div className="flex flex-wrap items-center gap-5">
                <ConnectButton app={app} />
                <span className="text-sm text-n-4">{app.installs} teams connected</span>
              </div>
            </Reveal>

            <Reveal delay={150} className="flex justify-center">
              <div className="relative flex items-center justify-center w-[18rem] aspect-square border border-n-6 rounded-full">
                <div className="absolute inset-10 border border-n-6 rounded-full" />
                <div className="absolute inset-0 rounded-full border border-dashed border-n-1/10 animate-spin-slow" />
                <div className="relative flex items-center gap-6">
                  <div className="flex items-center justify-center w-20 h-20 bg-n-7 border border-n-1/15 rounded-2xl">
                    <img src={app.icon} width={app.width * 1.4} height={app.height * 1.4} alt={app.title} />
                  </div>
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-color-1" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </span>
                  <div className="w-20 h-20 p-0.5 rounded-2xl bg-conic-gradient">
                    <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-[0.9rem]">
                      <img src={brainwaveSymbol} width={40} height={40} alt="Brainwave" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section crosses>
        <div className="container grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="h3 mb-8">What you can do</h2>
            <ul>
              {app.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-4 py-5 border-t border-n-6">
                  <img src={check} width={24} height={24} alt="" />
                  <span className="body-2">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <GradientCard innerClassName="p-8">
              <h2 className="h5 mb-6">Set up in 3 steps</h2>
              <ol className="space-y-6">
                {[
                  `Click “Connect ${app.title}” above`,
                  "Approve the requested permissions",
                  `Type /brainwave in ${app.title} to get started`,
                ].map((s, i) => (
                  <li key={s} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-n-7 font-code text-sm text-color-1">{i + 1}</span>
                    <span className="body-2 pt-1 text-n-2">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 pt-6 border-t border-n-6 text-xs text-n-4">
                Permissions can be revoked at any time. Read our{" "}
                <Link to="/privacy" className="text-n-2 underline hover:text-color-1">privacy policy</Link>.
              </p>
            </GradientCard>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="container">
          <h2 className="h4 mb-8">Related integrations</h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {more.map((a) => (
              <li key={a.id}>
                <Link to={`/integrations/${a.slug}`} className="group flex items-center gap-4 p-5 border border-n-6 rounded-2xl transition-colors hover:border-color-1">
                  <span className="flex items-center justify-center w-12 h-12 bg-n-7 rounded-xl">
                    <img src={a.icon} width={a.width * 0.8} height={a.height * 0.8} alt="" loading="lazy" />
                  </span>
                  <span className="flex-1">
                    <span className="block h6">{a.title}</span>
                    <span className="block text-xs text-n-4">{a.category}</span>
                  </span>
                  <Icon name="arrowRight" size={18} className="text-n-4 transition-transform group-hover:translate-x-1 group-hover:text-n-1" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-12">
            <Link to="/integrations" className="text-xs font-code font-bold tracking-wider uppercase border-b transition-colors hover:text-color-1 hover:border-color-1">
              All integrations
            </Link>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
};

export default IntegrationDetail;
