import { pricing } from "../constants";
import Button from "./Button";
import Icon from "./ui/Icon";
import useAnimatedNumber from "../hooks/useAnimatedNumber";

const Price = ({ value }) => {
  const animated = useAnimatedNumber(value, { duration: 400 });
  return <span className="tabular">{Math.round(animated)}</span>;
};

/**
 * Three pricing tiers in a hairline grid. The recommended tier gets the only lime button.
 */
const PricingList = ({ billing = "monthly", className = "" }) => (
  <div className={`grid border border-line rounded-lg overflow-hidden md:grid-cols-3 ${className}`}>
    {pricing.map((item, i) => {
      const price = billing === "annual" ? item.annual : item.monthly;
      return (
        <div
          key={item.id}
          className={`relative flex flex-col p-6 lg:p-8 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""} ${
            item.popular ? "bg-surface" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="t-h4">{item.title}</h3>
            {item.popular && <span className="t-label text-accent">Recommended</span>}
          </div>
          <p className="t-small min-h-[3rem] text-fg-3">{item.description}</p>

          <div className="flex items-baseline gap-1.5 mt-6 mb-1">
            <span className="text-fg-3 text-lg">$</span>
            <span className="font-mono text-5xl font-medium tracking-[-0.04em]">
              <Price value={price} />
            </span>
          </div>
          <p className="h-5 mb-6 text-xs text-fg-3">
            {price === 0 ? "Free forever" : `${item.unit}${billing === "annual" ? ", billed annually" : ", billed monthly"}`}
          </p>

          <Button href={item.url} variant={item.popular ? "primary" : "secondary"} className="w-full mb-7">
            {item.cta}
          </Button>

          <ul className="space-y-3">
            {item.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-fg-2">
                <Icon name="check" size={15} className="mt-[0.2rem] text-fg-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
);

export default PricingList;
