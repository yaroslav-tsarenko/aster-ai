import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";
import useAnimatedNumber from "../hooks/useAnimatedNumber";
import { formatCurrency } from "../lib/utils";

const Price = ({ value }) => {
  const animated = useAnimatedNumber(value, { duration: 500 });
  const [whole, cents] = formatCurrency(animated).split(".");
  return (
    <>
      <div className="h3">$</div>
      <div className="text-[5.5rem] leading-none font-bold tabular-nums">
        {value === 0 ? "0" : whole}
      </div>
      {value !== 0 && <div className="self-start mt-3 h5 font-bold tabular-nums">.{cents}</div>}
    </>
  );
};

const PricingList = ({ billing = "monthly" }) => {
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item) => {
        const price = billing === "annual" ? item.annual : item.monthly;
        return (
          <div
            key={item.id}
            className="relative w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h3]:first:text-color-2 [&>h3]:even:text-color-1 [&>h3]:last:text-color-3 transition-colors hover:border-n-5"
          >
            {item.popular && (
              <span className="absolute top-5 right-6 px-3 py-1 rounded-full bg-color-1/15 border border-color-1/40 tagline text-color-1">
                Most popular
              </span>
            )}
            <h3 className="h4 mb-4">{item.title}</h3>

            <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">{item.description}</p>

            <div className="flex items-center h-[5.5rem] mb-1">
              {price !== null ? (
                <Price value={price} />
              ) : (
                <div className="h3 font-bold">Custom</div>
              )}
            </div>
            <p className="h-5 mb-6 text-xs text-n-4">
              {price === null
                ? "Tailored to your organisation"
                : price === 0
                ? "Free forever"
                : billing === "annual"
                ? `per month, billed $${formatCurrency(price * 12)} yearly`
                : "per month, billed monthly"}
            </p>

            <Button className="w-full mb-6" href={item.url} white={item.price !== null}>
              {item.cta}
            </Button>

            <ul>
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-start py-5 border-t border-n-6">
                  <img src={check} width={24} height={24} alt="" />
                  <p className="body-2 ml-4">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PricingList;
