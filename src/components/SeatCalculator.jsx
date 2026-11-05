import { useId, useState } from "react";
import useAnimatedNumber from "../hooks/useAnimatedNumber";
import { formatCurrency } from "../lib/utils";
import { pricing } from "../constants";
import GradientCard from "./ui/GradientCard";
import BillingToggle from "./BillingToggle";
import Button from "./Button";

const tiers = [
  { min: 100, discount: 0.2 },
  { min: 50, discount: 0.15 },
  { min: 10, discount: 0.1 },
  { min: 1, discount: 0 },
];

const premium = pricing.find((p) => p.slug === "premium");

const Money = ({ value, className = "" }) => {
  const v = useAnimatedNumber(value, { duration: 450 });
  return <span className={`tabular-nums ${className}`}>${formatCurrency(v)}</span>;
};

const SeatCalculator = ({ billing, onBillingChange }) => {
  const id = useId();
  const [seats, setSeats] = useState(12);
  const max = 250;
  const tier = tiers.find((t) => seats >= t.min);
  const base = billing === "annual" ? premium.annual : premium.monthly;
  const perSeat = base * (1 - tier.discount);
  const monthly = perSeat * seats;
  const yearly = monthly * 12;
  const savings = premium.monthly * seats * 12 - yearly;

  return (
    <GradientCard innerClassName="p-6 md:p-10 lg:p-12" rounded="rounded-[2rem]" innerRounded="rounded-[1.9375rem]">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <h2 className="h4 mb-3">Team seat calculator</h2>
          <p className="body-2 mb-8 text-n-4">
            Premium for teams. Volume discounts apply automatically from 10 seats.
          </p>

          <div className="flex items-end justify-between mb-4">
            <label htmlFor={id} className="tagline text-n-3">
              Number of seats
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSeats((s) => Math.max(1, s - 1))}
                className="w-9 h-9 rounded-lg border border-n-6 text-n-3 transition-colors hover:text-n-1 hover:border-n-4"
                aria-label="Remove a seat"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={max}
                value={seats}
                onChange={(e) => setSeats(Math.min(max, Math.max(1, Number(e.target.value) || 1)))}
                className="w-20 h-9 px-2 text-center bg-n-7 border border-n-6 rounded-lg font-code outline-none focus:border-color-1"
                aria-label="Number of seats"
              />
              <button
                type="button"
                onClick={() => setSeats((s) => Math.min(max, s + 1))}
                className="w-9 h-9 rounded-lg border border-n-6 text-n-3 transition-colors hover:text-n-1 hover:border-n-4"
                aria-label="Add a seat"
              >
                +
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
          <div className="flex justify-between mt-3 font-code text-xs text-n-4">
            <span>1</span>
            <span>10</span>
            <span>50</span>
            <span>100</span>
            <span>{max}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <BillingToggle value={billing} onChange={onBillingChange} />
            {tier.discount > 0 && (
              <span key={tier.discount} className="px-3 py-1.5 rounded-full bg-color-4/15 text-color-4 text-xs font-code animate-pop-in">
                Volume discount −{tier.discount * 100}%
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col p-6 bg-n-7 rounded-2xl md:p-8">
          <dl className="space-y-4 mb-8">
            <div className="flex justify-between gap-4">
              <dt className="text-n-4 text-sm">Per seat / month</dt>
              <dd><Money value={perSeat} /></dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-n-4 text-sm">Total / month</dt>
              <dd><Money value={monthly} className="h5 font-semibold" /></dd>
            </div>
            <div className="flex justify-between gap-4 pt-4 border-t border-n-6">
              <dt className="text-n-4 text-sm">Total / year</dt>
              <dd><Money value={yearly} /></dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-n-4 text-sm">You save / year</dt>
              <dd><Money value={Math.max(0, savings)} className="text-color-4" /></dd>
            </div>
          </dl>
          <Button href={`/signup?plan=premium&seats=${seats}`} white className="w-full mt-auto">
            Start with {seats} {seats === 1 ? "seat" : "seats"}
          </Button>
        </div>
      </div>
    </GradientCard>
  );
};

export default SeatCalculator;
