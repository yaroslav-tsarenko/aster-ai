import { Link } from "react-router-dom";
import Section from "../Section";
import Accordion from "../ui/Accordion";
import Reveal from "../ui/Reveal";
import { pricingFaq } from "../../constants";

const Faq = ({ items = pricingFaq, label = "FAQ", title = "Questions people ask before they start" }) => (
  <Section id="faq">
    <div className="container grid-12 gap-y-10">
      <Reveal className="col-span-4 md:col-span-8 lg:col-span-4">
        <p className="t-label mb-5 text-fg-3">{label}</p>
        <h2 className="t-h2 mb-5">{title}</h2>
        <p className="t-small text-fg-3">
          Something else? <Link to="/contact" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg">Write to us</Link> and a person replies within one working day.
        </p>
      </Reveal>
      <Reveal delay={80} className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
        <Accordion items={items} />
      </Reveal>
    </div>
  </Section>
);

export default Faq;
