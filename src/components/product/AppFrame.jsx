/**
 * Neutral application window used for product shots.
 */
const AppFrame = ({ title, meta, children, className = "", bodyClassName = "" }) => (
  <div className={`relative overflow-hidden bg-bg border border-line-strong rounded-xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ${className}`}>
    <div className="flex items-center gap-3 h-10 px-4 border-b border-line bg-surface">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full border border-line-strong" />
        <span className="w-2.5 h-2.5 rounded-full border border-line-strong" />
        <span className="w-2.5 h-2.5 rounded-full border border-line-strong" />
      </span>
      {title && <span className="font-mono text-2xs text-fg-3 truncate">{title}</span>}
      {meta && <span className="ml-auto font-mono text-2xs text-fg-4 truncate">{meta}</span>}
    </div>
    <div className={bodyClassName}>{children}</div>
  </div>
);

export default AppFrame;
