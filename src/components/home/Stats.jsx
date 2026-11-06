import Counter from "../ui/Counter";
import { stats } from "../../constants";

const Stats = ({ items = stats, className = "" }) => (
  <dl className={`grid grid-cols-2 border-t border-l border-line lg:grid-cols-4 ${className}`}>
    {items.map((s) => (
      <div key={s.id} className="p-5 border-r border-b border-line md:p-7">
        <dd className="mb-2 font-mono text-3xl font-medium tracking-[-0.03em] md:text-4xl">
          <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
        </dd>
        <dt className="text-sm text-fg-3">{s.label}</dt>
      </div>
    ))}
  </dl>
);

export default Stats;
