const tones = ["bg-[#2a2e33]", "bg-[#2d3328]", "bg-[#33302a]", "bg-[#2a3036]", "bg-[#322b31]"];

const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * Initials avatar (no stock portraits). Tone is derived from the name so it stays stable.
 */
const Avatar = ({ name, size = 36, className = "" }) => {
  const tone = tones[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % tones.length];
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full border border-line-strong font-mono font-medium text-fg-2 ${tone} ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.32) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
};

export default Avatar;
