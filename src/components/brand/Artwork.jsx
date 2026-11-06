import { useId } from "react";

/*
 * Procedural "generated image" renderer used by the image studio mocks,
 * blog covers and tour visuals. Original SVG work, no external images.
 *
 * <Artwork scene="dunes" palette="film" seed={3} />
 */

import { palettes } from "./palettes";

const rng = (seed) => {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const wave = (r, y, amp, w = 400) => {
  const pts = [];
  const steps = 8;
  const phase = r() * Math.PI * 2;
  const freq = 1 + r() * 1.5;
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    pts.push([x, y + Math.sin(phase + (i / steps) * Math.PI * freq) * amp]);
  }
  let d = `M0 400 L0 ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y2] = pts[i];
    const cx = (px + x) / 2;
    d += ` C${cx.toFixed(1)} ${py.toFixed(1)} ${cx.toFixed(1)} ${y2.toFixed(1)} ${x.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return `${d} L${w} 400 Z`;
};

const Dunes = ({ p, r }) => (
  <>
    <rect width="400" height="400" fill={p.bg} />
    <circle cx={110 + r() * 180} cy={120 + r() * 40} r={34 + r() * 16} fill={p.hi} />
    <path d={wave(r, 200, 18)} fill={p.c1} />
    <path d={wave(r, 245, 22)} fill={p.c2} />
    <path d={wave(r, 295, 20)} fill={p.c3} />
    <path d={wave(r, 345, 16)} fill={p.c4} />
  </>
);

const Waves = ({ p, r }) => (
  <>
    <rect width="400" height="400" fill={p.bg} />
    <circle cx="200" cy={170 + r() * 20} r="70" fill={p.hi} />
    <rect y="210" width="400" height="190" fill={p.c3} />
    {Array.from({ length: 9 }).map((_, i) => (
      <rect key={i} x={40 + r() * 120} y={222 + i * 19} width={120 + r() * 160} height="3" rx="1.5" fill={i % 2 ? p.c1 : p.c2} opacity="0.8" />
    ))}
  </>
);

const Peaks = ({ p, r }) => {
  const ridge = (base, h, color) => {
    let d = `M0 400 L0 ${base}`;
    let x = 0;
    while (x < 400) {
      const step = 40 + r() * 70;
      const peak = base - h * (0.4 + r() * 0.6);
      d += ` L${(x + step / 2).toFixed(0)} ${peak.toFixed(0)} L${(x + step).toFixed(0)} ${(base - r() * 20).toFixed(0)}`;
      x += step;
    }
    return <path d={`${d} L400 400 Z`} fill={color} />;
  };
  return (
    <>
      <rect width="400" height="400" fill={p.bg} />
      <circle cx={80 + r() * 240} cy="90" r="26" fill={p.hi} />
      {ridge(220, 110, p.c1)}
      {ridge(270, 90, p.c2)}
      {ridge(320, 70, p.c3)}
      {ridge(370, 40, p.c4)}
    </>
  );
};

const Bloom = ({ p, r }) => {
  const petals = 14 + Math.floor(r() * 6);
  const len = 120 + r() * 20;
  return (
    <>
      <rect width="400" height="400" fill={p.c4} />
      <g transform={`translate(200 200) rotate(${r() * 30})`}>
        {Array.from({ length: petals }).map((_, i) => (
          <ellipse key={i} cx="0" cy={-len / 2} rx="15" ry={len / 2} fill={i % 2 ? p.c1 : p.bg} transform={`rotate(${(360 / petals) * i})`} />
        ))}
        {Array.from({ length: petals }).map((_, i) => (
          <ellipse key={`s${i}`} cx="0" cy={-len / 3.4} rx="9" ry={len / 3.4} fill={p.c2} transform={`rotate(${(360 / petals) * i + 180 / petals})`} />
        ))}
        <circle r="34" fill={p.hi} />
        <circle r="20" fill={p.c3} />
      </g>
    </>
  );
};

const City = ({ p, r }) => {
  const blocks = [];
  let x = -10;
  while (x < 410) {
    const w = 30 + r() * 46;
    const h = 90 + r() * 170;
    blocks.push({ x, w, h, back: r() > 0.5 });
    x += w + 4;
  }
  return (
    <>
      <rect width="400" height="400" fill={p.bg} />
      <circle cx={260 + r() * 80} cy="96" r="30" fill={p.hi} />
      {blocks.map((b, i) => (
        <rect key={`b${i}`} x={b.x + 12} y={380 - b.h - 40} width={b.w} height={b.h + 60} fill={p.c1} />
      ))}
      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={380 - b.h} width={b.w} height={b.h + 20} fill={b.back ? p.c3 : p.c4} />
          {Array.from({ length: Math.floor(b.h / 22) }).map((_, j) =>
            Array.from({ length: Math.max(1, Math.floor(b.w / 16)) }).map((__, k) =>
              r() > 0.62 ? (
                <rect key={`${j}-${k}`} x={b.x + 6 + k * 14} y={380 - b.h + 10 + j * 22} width="6" height="9" fill={p.hi} opacity="0.85" />
              ) : null
            )
          )}
        </g>
      ))}
    </>
  );
};

const Orbit = ({ p, r }) => {
  const cx = 170 + r() * 60;
  const cy = 190 + r() * 30;
  return (
    <>
      <rect width="400" height="400" fill={p.c4} />
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={i} cx={r() * 400} cy={r() * 400} r={r() * 1.4 + 0.4} fill={p.hi} opacity={0.3 + r() * 0.6} />
      ))}
      {[150, 115, 82].map((rad, i) => (
        <circle key={rad} cx={cx} cy={cy} r={rad} fill="none" stroke={i === 0 ? p.c2 : p.c3} strokeWidth="1.2" opacity="0.8" />
      ))}
      <circle cx={cx} cy={cy} r="52" fill={p.c2} />
      <path d={`M${cx - 52} ${cy} A52 52 0 0 0 ${cx + 52} ${cy} Z`} fill={p.c1} opacity="0.9" />
      <ellipse cx={cx} cy={cy} rx="92" ry="16" fill="none" stroke={p.hi} strokeWidth="3" transform={`rotate(-18 ${cx} ${cy})`} />
      <circle cx={cx + 115 * Math.cos(r() * 6.28)} cy={cy + 115 * Math.sin(1.2)} r="9" fill={p.hi} />
    </>
  );
};

const Contour = ({ p, r }) => {
  const cx = 160 + r() * 80;
  const cy = 170 + r() * 60;
  const rings = 11;
  const ring = (k) => {
    const n = 48;
    const base = 18 + k * 17;
    const ph = r() * 6.28;
    let d = "";
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2;
      const rr = base * (1 + 0.18 * Math.sin(a * 3 + ph) + 0.08 * Math.cos(a * 5 + k));
      const x = cx + Math.cos(a) * rr * 1.25;
      const y = cy + Math.sin(a) * rr;
      d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + "Z";
  };
  return (
    <>
      <rect width="400" height="400" fill={p.bg} />
      {Array.from({ length: rings }).map((_, k) => (
        <path key={k} d={ring(rings - k)} fill={k % 3 === 0 ? p.c1 : "none"} fillOpacity="0.35" stroke={k % 4 === 0 ? p.c4 : p.c3} strokeWidth={k % 4 === 0 ? 1.6 : 1} />
      ))}
      <circle cx={cx} cy={cy} r="4" fill={p.c4} />
      <path d={`M${cx + 30} ${cy - 120} l40 0`} stroke={p.c4} strokeWidth="1" />
    </>
  );
};

const Still = ({ p, r }) => (
  <>
    <rect width="400" height="400" fill={p.bg} />
    <rect y="270" width="400" height="130" fill={p.c1} />
    <rect x={70 + r() * 20} y="130" width="78" height="150" rx="34" fill={p.c3} />
    <rect x={92 + r() * 20} y="112" width="34" height="30" rx="6" fill={p.c3} />
    <circle cx={250 + r() * 30} cy="232" r="46" fill={p.c2} />
    <path d={`M${206 + r() * 30} 232 a46 46 0 0 0 92 0`} fill={p.c4} opacity="0.25" />
    <rect x="300" y="210" width="44" height="66" fill={p.hi} />
    <ellipse cx="200" cy="284" rx="160" ry="6" fill={p.c4} opacity="0.18" />
  </>
);

const scenes = { dunes: Dunes, waves: Waves, peaks: Peaks, bloom: Bloom, city: City, orbit: Orbit, contour: Contour, still: Still };

const Artwork = ({ scene = "dunes", palette = "editorial", seed = 1, className = "", title }) => {
  const id = useId();
  const Scene = scenes[scene] || Dunes;
  const p = palettes[palette] || palettes.editorial;
  const r = rng(seed + scene.length * 97);
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={`block w-full h-full ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      aria-labelledby={title ? `${id}-t` : undefined}
    >
      {title && <title id={`${id}-t`}>{title}</title>}
      <Scene p={p} r={r} />
    </svg>
  );
};

export default Artwork;
