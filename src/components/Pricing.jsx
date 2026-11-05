import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import PricingList from "./PricingList";
import BillingToggle from "./BillingToggle";
import { LeftLine, RightLine } from "./design/Pricing";

const Pricing = ({ showSphere = true, showDetailsLink = true, billing: billingProp, onBillingChange }) => {
  const [localBilling, setLocalBilling] = useState("monthly");
  const billing = billingProp ?? localBilling;
  const setBilling = onBillingChange ?? setLocalBilling;

  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        {showSphere && (
          <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
            <img src={smallSphere} className="relative z-1" width={255} height={255} alt="" loading="lazy" />
            <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <img src={stars} className="w-full" width={950} height={400} alt="" loading="lazy" />
            </div>
          </div>
        )}

        <Heading tag="Get started with Brainwave" title="Start free, upgrade anytime" className="!mb-10" />

        <div className="flex justify-center mb-12 lg:mb-16">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>

        <div className="relative">
          <PricingList billing={billing} />
          <LeftLine />
          <RightLine />
        </div>

        {showDetailsLink && (
          <div className="flex justify-center mt-10">
            <Link
              className="text-xs font-code font-bold tracking-wider uppercase border-b transition-colors hover:text-color-1 hover:border-color-1"
              to="/pricing"
            >
              See the full details
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Pricing;
