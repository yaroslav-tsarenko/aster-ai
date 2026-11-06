import { Link } from "react-router-dom";
import Section from "../Section";
import Heading from "../Heading";
import Reveal from "../ui/Reveal";
import Icon from "../ui/Icon";
import AppMark from "../brand/AppMark";
import { collabApps } from "../../constants";

const IntegrationsStrip = () => (
  <Section id="integrations">
    <div className="container">
      <Heading
        label="05 / Integrations"
        title="Works with the places your sources already live"
        text="Connect a library, a folder or a workspace. Aster reads only what you allow and cites the file it used."
      >
        <Link to="/integrations" className="inline-flex items-center gap-1.5 mt-6 text-sm text-fg-2 transition-colors hover:text-fg">
          All integrations <Icon name="arrowRight" size={14} />
        </Link>
      </Heading>
      <ul className="grid grid-cols-2 border-t border-l border-line md:grid-cols-4">
        {collabApps.map((app, i) => (
          <Reveal as="li" key={app.id} delay={(i % 4) * 50} className="border-r border-b border-line">
            <Link to={`/integrations/${app.slug}`} className="group flex items-center gap-3 h-full p-4 transition-colors hover:bg-surface md:p-5">
              <AppMark mark={app.mark} size="sm" />
              <span className="min-w-0">
                <span className="block text-sm font-medium truncate">{app.title}</span>
                <span className="block font-mono text-2xs text-fg-4">{app.category}</span>
              </span>
              <Icon name="arrowUpRight" size={14} className="ml-auto text-fg-4 transition-colors group-hover:text-fg" />
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  </Section>
);

export default IntegrationsStrip;
