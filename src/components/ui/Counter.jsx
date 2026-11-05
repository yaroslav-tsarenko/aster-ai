import useAnimatedNumber from "../../hooks/useAnimatedNumber";
import useInView from "../../hooks/useInView";

/**
 * Number that counts up once it scrolls into view.
 */
const Counter = ({ value, decimals = 0, prefix = "", suffix = "", className = "", duration = 1400 }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const display = useAnimatedNumber(inView ? value : 0, { duration });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default Counter;
