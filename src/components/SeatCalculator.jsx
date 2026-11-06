import { useId, useState } from "react";
import useAnimatedNumber from "../hooks/useAnimatedNumber";
import { formatCurrency } from "../lib/utils";
import { pricing } from "../constants";
import BillingToggle from "./BillingToggle";
import Button from "./Button";
import Icon from "./ui/Icon";

const tiers = [
  { min: 100, discount: 0.2 },
  { min: 50, discount: 0.15 },
  { min: 10, discount: 0.1 },
  { min: 1, discount: 0 },
];

const team = pricing.find((p) => p.slug === "team");

const Money = ({ value, className = "" }) => {
  const v = useAnimatedNumber(value, { duration: 400 });
  return <span className={`font-mono tabular ${className}`}>${formatCurrency(v)}</span>;
};

const SeatCalculator = ({ billing, onBillingChange }) => {
  const id = useId();
  const [seats, setSeats] = useState(12);
  const max = 250;
  const tier = tiers.find((t) => seats >= t.min);
  const base = billing === "annual" ? team.annual : team.monthly;
  const perSeat = base * (1 - tier.discount);
  const monthly = perSeat * seats;
  const yearly = monthly * 12;
  const savings = team.monthly * seats * 12 - yearly;

  return (
    <div className="grid border border-line rounded-xl overflow-hidden lg:grid-cols-12">
      <div className="p-6 md:p-10 lg:col-span-7">
        <h2 className="t-h3 mb-2">Team seat calculator</h2>
        <p className="t-small mb-10 text-fg-3">
          Team is ${team.monthly} per seat a month, or ${team.annual} billed annually. Volume discounts apply automatically from 10 seats.
        </p>

        <div className="flex items-end justify-between gap-4 mb-4">
          <label htmlFor={id} className="t-label text-fg-3">
            Number of seats
          </label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-line-strong text-fg-2 transition-colors hover:text-fg hover:border-fg-4"
              aria-label="Remove a seat"
            >
              <Icon name="minus" size={14} />
            </button>
            <input
              type="number"
              min={1}
              max={max}
              value={seats}
              onChange={(e) => setSeats(Math.min(max, Math.max(1, Number(e.target.value) || 1)))}
              className="w-16 h-8 px-2 text-center bg-surface border border-line-strong rounded-md font-mono text-sm outline-none focus:border-fg-3"
              aria-label="Number of seats"
            />
            <button
              type="button"
              onClick={() => setSeats((s) => Math.min(max, s + 1))}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-line-strong text-fg-2 transition-colors hover:text-fg hover:border-fg-4"
              aria-label="Add a seat"
            >
              <Icon name="plus" size={14} />
            </button>
          </div>
        </div>
        <input
          id={id}
          type="range"
          min={1}
          max={max}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="range"
          style={{ "--range-progress": `${((seats - 1) / (max - 1)) * 100}%` }}
        />
        <div className="flex justify-between mt-3 font-mono text-2xs text-fg-4">
          <span>1</span>
          <span>10</span>
          <span>50</span>
          <span>100</span>
          <span>{max}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-10">
          <BillingToggle value={billing} onChange={onBillingChange} />
          <span className="font-mono text-xs text-fg-3" aria-live="polite">
            {tier.discount > 0 ? `Volume discount -${tier.discount * 100}% applied` : "Volume discount from 10 seats"}
          </span>
        </div>
      </div>

      <div className="flex flex-col p-6 border-t border-line bg-surface md:p-10 lg:col-span-5 lg:border-t-0 lg:border-l">
        <dl className="mb-8 divide-y divide-line border-y border-line">
          <div className="flex justify-between gap-4 py-3.5">
            <dt className="text-sm text-fg-3">Per seat / month</dt>
            <dd><Money value={perSeat} className="text-sm" /></dd>
          </div>
          <div className="flex justify-between items-baseline gap-4 py-3.5">
            <dt className="text-sm text-fg-3">Total / month</dt>
            <dd><Money value={monthly} className="text-2xl font-medium tracking-tight" /></dd>
          </div>
          <div className="flex justify-between gap-4 py-3.5">
            <dt className="text-sm text-fg-3">Total / year</dt>
            <dd><Money value={yearly} className="text-sm" /></dd>
          </div>
          <div className="flex justify-between gap-4 py-3.5">
            <dt className="text-sm text-fg-3">Saved vs. monthly list price</dt>
            <dd><Money value={Math.max(0, savings)} className="text-sm text-accent" /></dd>
          </div>
        </dl>
        <Button href={`/signup?plan=team&seats=${seats}`} variant="primary" size="lg" className="w-full mt-auto">
          Start team trial with {seats} {seats === 1 ? "seat" : "seats"}
        </Button>
      </div>
    </div>
  );
};

export default SeatCalculator;
