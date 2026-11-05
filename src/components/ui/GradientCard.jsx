/**
 * Card with the signature Brainwave conic-gradient border.
 */
const GradientCard = ({ children, className = "", innerClassName = "", rounded = "rounded-3xl", innerRounded = "rounded-[1.4375rem]", muted = false, as: Tag = "div", ...rest }) => (
  <Tag className={`p-0.25 ${rounded} ${muted ? "bg-n-6" : "bg-conic-gradient"} ${className}`} {...rest}>
    <div className={`relative h-full bg-n-8 ${innerRounded} ${innerClassName}`}>{children}</div>
  </Tag>
);

export default GradientCard;
