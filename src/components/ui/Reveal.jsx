import useInView from "../../hooks/useInView";

/**
 * Fades + slides children in when they scroll into view.
 * Motion is disabled automatically for `prefers-reduced-motion` (see index.css).
 */
const Reveal = ({ as: Tag = "div", className = "", delay = 0, children, style, ...rest }) => {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
