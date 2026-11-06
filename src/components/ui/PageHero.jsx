import Reveal from "./Reveal";
import Breadcrumbs from "./Breadcrumbs";

/**
 * Hero used by every inner page: left-aligned on the 12-column grid,
 * mono label, large title, lead text and optional actions or aside.
 */
const PageHero = ({ tag, label, title, text, children, breadcrumbs, aside, className = "" }) => (
  <section className={`relative pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 ${className}`}>
    <div className="container">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-10" />}
      <div className="grid-12 gap-y-10">
        <Reveal className={`col-span-4 md:col-span-8 ${aside ? "lg:col-span-7" : "lg:col-span-9"}`}>
          {(label || tag) && <p className="t-label mb-6 text-fg-3">{label || tag}</p>}
          <h1 className="t-h1 max-w-4xl">{title}</h1>
          {text && <p className="t-lead max-w-2xl mt-6">{text}</p>}
          {children && <div className="mt-9">{children}</div>}
        </Reveal>
        {aside && (
          <Reveal delay={100} className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
