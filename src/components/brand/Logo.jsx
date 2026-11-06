/*
 * Aster mark: a six-armed aster drawn as three crossing strokes inside a lime tile.
 */
export const LogoMark = ({ size = 24, className = "", mono = false }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={`shrink-0 ${className}`} aria-hidden="true">
    <rect width="32" height="32" rx="8" fill={mono ? "#26292e" : "#c6f432"} />
    <g stroke={mono ? "#c6f432" : "#0e0f11"} strokeWidth="3.2" strokeLinecap="round">
      <path d="M16 7.5v17" />
      <path d="M8.64 11.75l14.72 8.5" />
      <path d="M8.64 20.25l14.72-8.5" />
    </g>
    <circle cx="16" cy="16" r="2.4" fill={mono ? "#26292e" : "#c6f432"} />
  </svg>
);

const Logo = ({ className = "", size = 24, showWord = true }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoMark size={size} />
    {showWord && <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-fg">Aster</span>}
  </span>
);

export default Logo;
