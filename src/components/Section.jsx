/**
 * Page section with consistent vertical rhythm and an optional top hairline.
 */
const Section = ({ className = "", id, children, as: Tag = "section", border = true, customPaddings }) => (
  <Tag
    id={id}
    className={`relative ${border ? "border-t border-line" : ""} ${customPaddings || "py-20 md:py-24 lg:py-32"} ${className}`}
  >
    {children}
  </Tag>
);

export default Section;
