/**
 * Segmented control used for billing toggles and filters.
 */
const SegmentedControl = ({ options, value, onChange, label, className = "", size = "md" }) => (
  <div
    role="radiogroup"
    aria-label={label}
    className={`inline-flex max-w-full gap-0.5 p-0.5 overflow-x-auto scrollbar-none bg-surface border border-line rounded-md ${className}`}
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
          className={`relative inline-flex items-center gap-2 shrink-0 whitespace-nowrap rounded font-medium transition-colors ${
            size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3.5 text-[0.8125rem]"
          } ${active ? "bg-raised text-fg shadow-[inset_0_0_0_1px_#363a41]" : "text-fg-3 hover:text-fg"}`}
        >
          {opt.label}
          {opt.badge && (
            <span className={`font-mono text-2xs ${active ? "text-accent" : "text-fg-3"}`}>{opt.badge}</span>
          )}
        </button>
      );
    })}
  </div>
);

export default SegmentedControl;
