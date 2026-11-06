import { LogoMark } from "../brand/Logo";

const PageLoader = ({ className = "min-h-[70vh]" }) => (
  <div className={`flex flex-col items-center justify-center gap-4 ${className}`} role="status" aria-label="Loading page">
    <LogoMark size={28} className="animate-pulse" />
    <span className="block w-24 h-px overflow-hidden bg-line">
      <span className="block h-full w-1/3 bg-fg-3 animate-[marquee_1.2s_linear_infinite]" />
    </span>
  </div>
);

export default PageLoader;
