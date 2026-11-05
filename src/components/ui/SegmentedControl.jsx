/**
 * Pill-style segmented control used for billing toggles and filters.
 */
const SegmentedControl = ({ options, value, onChange, label, className = "", size = "md" }) => (
  <div
    role="radiogroup"
    aria-label={label}
    className={`inline-flex max-w-full gap-1 p-1 overflow-x-auto scrollbar-none bg-n-7 border border-n-6 rounded-full ${className}`}
  >
    {options.map((opt) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt.value)}
          className={`relative shrink-0 whitespace-nowrap button rounded-full transition-colors ${
            size === "sm" ? "px-3 py-1.5" : "px-5 py-2.5"
          } ${active ? "bg-n-1 text-n-8" : "text-n-3 hover:text-n-1"}`}
        >
          {opt.label}
          {opt.badge && (
            <span
              className={`ml-2 px-1.5 py-0.5 rounded text-[0.625rem] ${
                active ? "bg-color-1 text-n-1" : "bg-n-6 text-color-4"
              }`}
            >
              {opt.badge}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

export default SegmentedControl;
