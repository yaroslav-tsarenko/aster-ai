const TypingIndicator = ({ label = "Brainwave is thinking" }) => (
  <div className="flex items-center gap-3 text-n-3" role="status" aria-label={label}>
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-2 h-2 rounded-full bg-color-1"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
    <span className="text-sm">{label}…</span>
  </div>
);

export default TypingIndicator;
