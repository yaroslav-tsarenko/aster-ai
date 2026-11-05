import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Pricing from "../components/Pricing";
import SeatCalculator from "../components/SeatCalculator";
import ComparisonTable from "../components/ComparisonTable";
import CtaBanner from "../components/CtaBanner";
import Reveal from "../components/ui/Reveal";
import Accordion from "../components/ui/Accordion";
import Button from "../components/Button";
import { pricingFaq } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const PricingPage = () => {
  usePageMeta("Pricing", "Simple, transparent pricing. Start free, upgrade to Premium for $7.99/month billed annually, or talk to us about Enterprise.");
  const [billing, setBilling] = useState("annual");

  return (
    <>
      <PageHero
        tag="Pricing"
        title={
          <>
            Simple pricing, <span className="text-gradient">no surprises</span>
          </>
        }
        text="Start for free and upgrade when you need more. Switch to annual billing to save 20%."
      />

      <Pricing billing={billing} onBillingChange={setBilling} showDetailsLink={false} showSphere={false} />

      <Section crosses id="calculator">
        <div className="container">
          <Reveal>
            <SeatCalculator billing={billing} onBillingChange={setBilling} />
          </Reveal>
        </div>
      </Section>

      <Section crosses id="compare">
        <div className="container">
          <Heading tag="Compare plans" title="Everything in detail" />
          <Reveal>
            <ComparisonTable billing={billing} />
          </Reveal>
        </div>
      </Section>

      <Section crosses id="faq">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <h2 className="h2 mb-6">Frequently asked questions</h2>
            <p className="body-2 mb-8 text-n-4">Can’t find the answer you’re looking for? Our team usually replies within a few hours.</p>
            <Button href="/contact?topic=billing">Contact support</Button>
          </Reveal>
          <Reveal delay={120}>
            <Accordion items={pricingFaq} />
          </Reveal>
        </div>
      </Section>

      <CtaBanner title="Start free today" secondary={{ label: "Compare plans", url: "#compare" }} />
    </>
  );
};

export default PricingPage;
