import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "./Section";
import Heading from "./Heading";
import PricingList from "./PricingList";
import BillingToggle from "./BillingToggle";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

const Pricing = ({ showDetailsLink = true, billing: billingProp, onBillingChange, label = "Pricing" }) => {
  const [localBilling, setLocalBilling] = useState("monthly");
  const billing = billingProp ?? localBilling;
  const setBilling = onBillingChange ?? setLocalBilling;

  return (
    <Section id="pricing">
      <div className="container">
        <Heading
          label={label}
          title="Start free. Pay when it is part of your week."
          text="Every plan includes citations, the writing view and the image studio. Paid plans remove the limits and add the larger models."
        >
          <div className="mt-8">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </Heading>

        <Reveal>
          <PricingList billing={billing} />
        </Reveal>

        {showDetailsLink && (
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 text-sm text-fg-3">
            <p>Prices in USD, excluding VAT. Education and non-profit discounts available.</p>
            <Link to="/pricing" className="inline-flex items-center gap-1.5 text-fg-2 transition-colors hover:text-fg">
              Compare all features <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Pricing;
