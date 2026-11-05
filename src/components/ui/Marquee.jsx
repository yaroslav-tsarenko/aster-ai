/**
 * Infinite horizontal marquee. Children are rendered twice for a seamless loop.
 * Pauses on hover; becomes a horizontally scrollable strip for reduced motion.
 */
const Marquee = ({ children, duration = 40, className = "", reverse = false }) => (
  <div
    className={`group relative overflow-hidden motion-reduce:overflow-x-auto scrollbar-none [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] ${className}`}
  >
    <div
      className="flex w-max animate-marquee"
      style={{
        "--marquee-duration": `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <div className="flex shrink-0 gap-5 pr-5">{children}</div>
      <div className="flex shrink-0 gap-5 pr-5" aria-hidden="true">
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
