import Section from "../Section";
import Heading from "../Heading";
import Reveal from "../ui/Reveal";
import AppFrame from "../product/AppFrame";
import { ModelMenu, ModelPill } from "../product/Mocks";
import UsageChart from "../product/UsageChart";

const routing = [
  ["Tighten the second paragraph", "Swift", "0.4 s"],
  ["Compare findings across 14 sources", "Aster 2", "6.2 s"],
  ["Read the table on page 41", "Vision", "2.1 s"],
];

const Control = () => (
  <Section id="control">
    <div className="container">
      <Heading
        label="04 / Control"
        title="Choose the model. See what it costs."
        text="Switch models per message without losing context, and read your usage on a dashboard that fits on one screen."
      />
      <div className="grid-12 gap-y-6">
        <Reveal className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col">
          <div className="flex-1 p-6 rounded-xl border border-line bg-surface bg-dotgrid">
            <ModelPill open />
            <ModelMenu className="mt-2" />
            <div className="mt-6 rounded-lg border border-line bg-bg">
              <p className="px-4 pt-3 pb-2 t-label text-fg-4">Auto routing, today</p>
              <ul className="divide-y divide-line">
                {routing.map(([task, model, time]) => (
                  <li key={task} className="flex items-center gap-3 px-4 py-2.5 text-xs">
                    <span className="flex-1 min-w-0 text-fg-2 truncate">{task}</span>
                    <span className="text-fg-3 whitespace-nowrap">{model}</span>
                    <span className="w-12 text-right font-mono text-fg-4 tabular">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-5">
            <h3 className="t-h4 mb-1.5">Three models, one conversation</h3>
            <p className="t-small text-fg-3">
              Aster routes quick edits to Swift and long research to Aster 2. Override it at any point; the thread keeps its context.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80} className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col">
          <AppFrame title="aster.app / Settings / Usage" className="flex-1">
            <UsageChart />
          </AppFrame>
          <div className="pt-5">
            <h3 className="t-h4 mb-1.5">Usage you can read</h3>
            <p className="t-small text-fg-3">Credits by day and by mode, per project. Hover a bar for exact numbers. Alerts at 80% and 100%.</p>
          </div>
        </Reveal>
      </div>
    </div>
  </Section>
);

export default Control;
