import { useState } from "react";
import { usageDaily } from "../../constants";

const series = [
  { key: "research", label: "Research", className: "bg-accent", swatch: "bg-accent" },
  { key: "writing", label: "Writing", className: "bg-fg-2", swatch: "bg-fg-2" },
  { key: "images", label: "Images", className: "bg-fg-4", swatch: "bg-fg-4" },
];

const MAX = 140;
const ticks = [0, 35, 70, 105, 140];

/**
 * Stacked bar chart of credits used per day, built in HTML/CSS.
 * Hover or focus a bar to read the exact values.
 */
const UsageChart = ({ data = usageDaily, className = "" }) => {
  const [active, setActive] = useState(data.length - 1);
  const totals = series.map((s) => data.reduce((a, d) => a + d[s.key], 0));
  const total = totals.reduce((a, b) => a + b, 0);
  const current = data[active];

  return (
    <div className={`p-5 md:p-6 text-left ${className}`}>
      <div className="flex flex-wrap items-start gap-x-8 gap-y-4 mb-6">
        <div>
          <p className="t-label mb-2 text-fg-4">Credits, last 14 days</p>
          <p className="font-mono text-3xl font-medium tracking-tight tabular">{total.toLocaleString("en-US")}</p>
        </div>
        <dl className="flex gap-6 ml-auto">
          {series.map((s, i) => (
            <div key={s.key}>
              <dt className="flex items-center gap-1.5 mb-1 text-xs text-fg-3">
                <span className={`w-2 h-2 rounded-sm ${s.swatch}`} aria-hidden="true" />
                {s.label}
              </dt>
              <dd className="font-mono text-sm text-fg tabular">{totals[i]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative flex gap-3">
        <div className="flex flex-col-reverse justify-between h-44 font-mono text-2xs text-fg-4 tabular" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="leading-none">{t}</span>
          ))}
        </div>
        <div className="relative flex-1 h-44">
          <div className="absolute inset-0 flex flex-col-reverse justify-between pointer-events-none" aria-hidden="true">
            {ticks.map((t) => (
              <span key={t} className="block h-px bg-line" />
            ))}
          </div>
          <ul className="relative flex items-end h-full gap-[3px] sm:gap-1.5" aria-label="Credits used per day">
            {data.map((d, i) => {
              const sum = series.reduce((a, s) => a + d[s.key], 0);
              return (
                <li key={d.day} className="flex-1 h-full">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={`${d.day}: ${sum} credits, research ${d.research}, writing ${d.writing}, images ${d.images}`}
                    aria-pressed={i === active}
                    className={`relative flex flex-col-reverse justify-start w-full h-full transition-opacity focus-visible:outline-offset-4 ${
                      i === active ? "opacity-100" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {i === active && <span className="absolute -bottom-2 left-1/2 w-1 h-1 -translate-x-1/2 rounded-full bg-fg" aria-hidden="true" />}
                    {series.map((s) => (
                      <span
                        key={s.key}
                        className={`block w-full ${s.className} first:rounded-b-[2px] last:rounded-t-[2px]`}
                        style={{ height: `${(d[s.key] / MAX) * 100}%` }}
                      />
                    ))}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex justify-between mt-2 ml-7 font-mono text-2xs text-fg-4" aria-hidden="true">
        <span>{data[0].day}</span>
        <span>{data[data.length - 1].day}</span>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-5 pt-4 border-t border-line text-xs" aria-live="polite">
        <span className="font-mono text-fg-2">{current.day}</span>
        {series.map((s) => (
          <span key={s.key} className="text-fg-3">
            {s.label} <span className="font-mono text-fg tabular">{current[s.key]}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default UsageChart;
