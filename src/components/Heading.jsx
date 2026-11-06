import Reveal from "./ui/Reveal";

/**
 * Section header on the 12-column grid: mono label in the left rail,
 * title and supporting text across the remaining columns.
 * `tag` is accepted as an alias of `label`.
 */
const Heading = ({ className = "", label, tag, title, text, as: Title = "h2", children, align = "split" }) => {
  const l = label || tag;
  if (align === "center") {
    return (
      <Reveal className={`max-w-2xl mx-auto mb-12 text-center lg:mb-16 ${className}`}>
        {l && <p className="t-label mb-5 text-fg-3">{l}</p>}
        {title && <Title className="t-h2">{title}</Title>}
        {text && <p className="t-lead mt-5">{text}</p>}
        {children}
      </Reveal>
    );
  }
  return (
    <Reveal className={`grid-12 gap-y-4 mb-12 lg:mb-16 ${className}`}>
      <div className="col-span-4 md:col-span-8 lg:col-span-3">
        {l && <p className="t-label text-fg-3 lg:pt-3">{l}</p>}
      </div>
      <div className="col-span-4 md:col-span-7 lg:col-span-8">
        {title && <Title className="t-h2 max-w-3xl">{title}</Title>}
        {text && <p className="t-lead max-w-2xl mt-5">{text}</p>}
        {children}
      </div>
    </Reveal>
  );
};

export default Heading;
