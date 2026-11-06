import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import PricingList from "../components/PricingList";
import BillingToggle from "../components/BillingToggle";
import SeatCalculator from "../components/SeatCalculator";
import ComparisonTable from "../components/ComparisonTable";
import CtaBanner from "../components/CtaBanner";
import Faq from "../components/home/Faq";
import Reveal from "../components/ui/Reveal";
import usePageMeta from "../hooks/usePageMeta";

const PricingPage = () => {
  usePageMeta("Pricing", "Aster pricing: Free, Pro at $15 a month billed annually, and Team at $25 per seat with SSO and shared projects.");
  const [billing, setBilling] = useState("annual");

  return (
    <>
      <PageHero
        label="Pricing"
        title="Plans that grow with the work, not the hype"
        text="Every plan includes citations, the writing view and the image studio. Pay for higher limits, larger models and team controls."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Pricing" }]}
      >
        <BillingToggle value={billing} onChange={setBilling} />
      </PageHero>

      <section className="pb-20 md:pb-24">
        <div className="container">
          <Reveal>
            <PricingList billing={billing} />
          </Reveal>
          <p className="mt-5 text-sm text-fg-3">
            Prices in USD, excluding VAT. Need more than 250 seats, invoicing or a custom DPA?{" "}
            <a href="/contact?topic=sales" className="text-fg-2 underline underline-offset-4 decoration-line-strong hover:text-fg">Talk to sales</a>.
          </p>
        </div>
      </section>

      <Section id="calculator">
        <div className="container">
          <Heading label="01 / Teams" title="Price a team in a few seconds" text="Move the slider to your headcount. Discounts at 10, 50 and 100 seats are applied for you." />
          <Reveal>
            <SeatCalculator billing={billing} onBillingChange={setBilling} />
          </Reveal>
        </div>
      </Section>

      <Section id="compare">
        <div className="container">
          <Heading label="02 / Compare" title="Every limit, side by side" />
          <Reveal>
            <ComparisonTable billing={billing} />
          </Reveal>
        </div>
      </Section>

      <Faq label="03 / FAQ" title="Billing questions" />

      <CtaBanner title="Try Pro free for 14 days." secondary={{ label: "Talk to sales", url: "/contact?topic=sales" }} />
    </>
  );
};

export default PricingPage;
