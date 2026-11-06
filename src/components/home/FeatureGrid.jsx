import { Link } from "react-router-dom";
import Section from "../Section";
import Heading from "../Heading";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import { benefits } from "../../constants";

export const FeatureCell = ({ item, index = 0 }) => (
  <Reveal delay={(index % 3) * 60} className="border-r border-b border-line">
    <Link to={`/features/${item.slug}`} className="group flex flex-col h-full p-6 transition-colors hover:bg-surface lg:p-8">
      <div className="flex items-center justify-between mb-10">
        <span className="flex items-center justify-center w-9 h-9 rounded-md border border-line-strong text-fg-2">
          <Icon name={item.icon} size={17} />
        </span>
        <span className="font-mono text-2xs text-fg-4">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="t-h4 mb-2">{item.title}</h3>
      <p className="t-small flex-1 text-fg-3">{item.text}</p>
      <span className="inline-flex items-center gap-1.5 mt-6 text-sm text-fg-2 transition-colors group-hover:text-fg">
        Learn more <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  </Reveal>
);

const FeatureGrid = ({ label = "03 / Features", title = "Built for work you have to stand behind", text, items = benefits }) => (
  <Section id="features">
    <div className="container">
      <Heading label={label} title={title} text={text} />
      <div className="grid border-t border-l border-line md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <FeatureCell key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  </Section>
);

export default FeatureGrid;
