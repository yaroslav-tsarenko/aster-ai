import { brainwaveSymbol } from "../../assets";

const PageLoader = ({ className = "min-h-[70vh]" }) => (
  <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading page">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full bg-conic-gradient animate-spin-slow" />
      <div className="absolute inset-0.5 flex items-center justify-center rounded-full bg-n-8">
        <img src={brainwaveSymbol} width={28} height={28} alt="" className="animate-pulse" />
      </div>
    </div>
  </div>
);

export default PageLoader;
