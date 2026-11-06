import Section from "./Section";
import Heading from "./Heading";
import Reveal from "./ui/Reveal";
import Avatar from "./brand/Avatar";
import { testimonials } from "../constants";

const Testimonials = ({ label = "Customers", title = "Used by people who have to stand behind their work", items = testimonials }) => (
  <Section id="testimonials">
    <div className="container">
      <Heading label={label} title={title} />
      <div className="grid border-t border-l border-line md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal as="figure" key={t.id} delay={(i % 3) * 60} className="flex flex-col p-6 border-r border-b border-line lg:p-8">
            <blockquote className="flex-1 mb-8 text-[0.9375rem] leading-7 text-fg-2">“{t.text}”</blockquote>
            <figcaption className="flex items-center gap-3">
              <Avatar name={t.name} size={34} />
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-fg-3">{t.role}</p>
              </div>
            </figcaption>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 font-mono text-2xs text-fg-4">People and organisations quoted on this site are fictional.</p>
    </div>
  </Section>
);

export default Testimonials;
