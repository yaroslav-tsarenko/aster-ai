const TypingIndicator = ({ label = "Reading sources" }) => (
  <div className="flex items-center gap-2.5 text-fg-3" role="status" aria-label={label}>
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-fg-2" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
    <span className="font-mono text-xs">{label}</span>
  </div>
);

export default TypingIndicator;
