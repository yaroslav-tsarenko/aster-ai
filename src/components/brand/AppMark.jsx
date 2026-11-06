/**
 * Monogram tile used for third-party integrations (we do not ship their logos).
 */
const AppMark = ({ mark, size = "md", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs rounded-md",
    md: "w-11 h-11 text-sm rounded-lg",
    lg: "w-16 h-16 text-lg rounded-xl",
  };
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 border border-line-strong bg-raised font-mono font-medium tracking-tight text-fg ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {mark}
    </span>
  );
};

export default AppMark;
