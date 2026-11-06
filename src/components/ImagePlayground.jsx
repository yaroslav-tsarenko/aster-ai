import { useEffect, useRef, useState } from "react";
import { generatedImagePool, imageAspects, imagePromptIdeas, imageStyles } from "../constants";
import Button from "./Button";
import Icon from "./ui/Icon";
import Artwork from "./brand/Artwork";
import useToast from "../hooks/useToast";
import useReducedMotion from "../hooks/useReducedMotion";

const STAGES = [
  { at: 0, label: "Reading prompt" },
  { at: 22, label: "Applying preset" },
  { at: 55, label: "Rendering four variations" },
  { at: 85, label: "Upscaling to 2048 px" },
];

// Map prompt words to a scene so the result roughly matches what was asked for.
const sceneHints = [
  { scene: "dunes", words: ["dune", "sand", "desert"] },
  { scene: "peaks", words: ["mountain", "peak", "hill", "alps"] },
  { scene: "bloom", words: ["flower", "aster", "bloom", "petal", "botanical"] },
  { scene: "city", words: ["city", "street", "building", "skyline", "urban"] },
  { scene: "orbit", words: ["planet", "space", "orbit", "moon", "star"] },
  { scene: "contour", words: ["map", "topographic", "contour", "island", "terrain"] },
  { scene: "still", words: ["vase", "still life", "product", "object", "table"] },
  { scene: "waves", words: ["sea", "ocean", "wave", "sunset", "water"] },
];

const pickScene = (prompt, fallbackIndex) => {
  const p = prompt.toLowerCase();
  const hit = sceneHints.find((h) => h.words.some((w) => p.includes(w)));
  return hit ? hit.scene : generatedImagePool[fallbackIndex % generatedImagePool.length];
};

// A finished example so the studio never opens on an empty canvas.
const starter = {
  id: "starter",
  scene: "dunes",
  prompt: imagePromptIdeas[0],
  style: imageStyles[0],
  aspect: imageAspects[0],
  seeds: [48213, 48220, 48232, 48244],
};

const Chip = ({ active, onClick, children, className = "" }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`h-8 px-3 rounded-md border text-[0.8125rem] transition-colors ${
      active ? "border-fg-3 bg-raised text-fg" : "border-line text-fg-3 hover:text-fg hover:border-line-strong"
    } ${className}`}
  >
    {children}
  </button>
);

/**
 * Mock image studio: style + aspect selection, staged progress, then four
 * procedurally drawn variations. One is shown large and can be downloaded as SVG.
 */
const ImagePlayground = ({ className = "" }) => {
  const { toast } = useToast();
  const reduced = useReducedMotion();
  const [prompt, setPrompt] = useState(imagePromptIdeas[0]);
  const [style, setStyle] = useState(imageStyles[0].id);
  const [aspect, setAspect] = useState(imageAspects[0].id);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("done"); // idle | generating | done
  const [result, setResult] = useState(starter);
  const [selected, setSelected] = useState(0);
  const [history, setHistory] = useState([starter]);
  const counter = useRef(0);
  const frame = useRef();
  const mainRef = useRef(null);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const styleObj = imageStyles.find((s) => s.id === style);
  const aspectObj = imageAspects.find((a) => a.id === aspect);
  const stage = [...STAGES].reverse().find((s) => progress >= s.at);
  const shownAspect = result ? result.aspect : aspectObj;

  const generate = (e) => {
    e?.preventDefault();
    if (!prompt.trim()) {
      toast("Describe the image you want first", { tone: "error" });
      return;
    }
    if (status === "generating") return;

    setStatus("generating");
    setProgress(0);
    const duration = reduced ? 400 : 2400 + Math.random() * 800;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        const base = Math.floor(Math.random() * 900000 + 100000);
        const item = {
          id: `${Date.now()}`,
          scene: pickScene(prompt, counter.current++),
          prompt: prompt.trim(),
          style: styleObj,
          aspect: aspectObj,
          seeds: [base, base + 7, base + 19, base + 31],
        };
        setResult(item);
        setSelected(0);
        setHistory((h) => [item, ...h].slice(0, 6));
        setStatus("done");
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  const download = () => {
    const svg = mainRef.current?.querySelector("svg");
    if (!svg || !result) return;
    const markup = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${markup}`], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aster-${result.scene}-${result.seeds[selected]}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("Image saved as SVG");
  };

  return (
    <div className={`grid-12 gap-y-6 ${className}`}>
      <form onSubmit={generate} className="col-span-4 md:col-span-8 lg:col-span-4 flex flex-col gap-7 p-5 rounded-xl border border-line bg-surface md:p-6">
        <div>
          <label htmlFor="image-prompt" className="block mb-2.5 t-label text-fg-3">
            Prompt
          </label>
          <textarea
            id="image-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full p-3 bg-bg border border-line-strong rounded-md resize-none text-sm leading-6 outline-none transition-colors focus:border-fg-3 placeholder:text-fg-4"
            placeholder="Describe the image, the mood and the framing"
          />
          <div className="flex flex-col gap-1 mt-2">
            {imagePromptIdeas.slice(1).map((idea) => (
              <button
                key={idea}
                type="button"
                onClick={() => setPrompt(idea)}
                className="group flex items-center gap-2 py-1 text-left text-xs text-fg-3 transition-colors hover:text-fg"
              >
                <Icon name="arrowUpRight" size={12} className="text-fg-4 group-hover:text-accent" />
                {idea}
              </button>
            ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2.5 t-label text-fg-3">Style preset</legend>
          <div className="flex flex-wrap gap-1.5">
            {imageStyles.map((s) => (
              <Chip key={s.id} active={style === s.id} onClick={() => setStyle(s.id)}>
                {s.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2.5 t-label text-fg-3">Aspect ratio</legend>
          <div className="grid grid-cols-3 gap-1.5">
            {imageAspects.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={aspect === a.id}
                onClick={() => setAspect(a.id)}
                className={`flex flex-col items-center gap-2 py-3 rounded-md border font-mono text-2xs transition-colors ${
                  aspect === a.id ? "border-fg-3 bg-raised text-fg" : "border-line text-fg-3 hover:border-line-strong"
                }`}
              >
                <span className={`block w-7 border-[1.5px] rounded-[2px] border-current ${a.className}`} />
                {a.label}
              </button>
            ))}
          </div>
        </fieldset>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-auto" disabled={status === "generating"}>
          {status === "generating" ? "Generating" : status === "done" ? "Generate again" : "Generate four images"}
        </Button>
      </form>

      <div className="col-span-4 md:col-span-8 lg:col-span-8 flex flex-col gap-4 min-w-0">
        <div className="relative flex flex-col p-4 rounded-xl border border-line bg-surface bg-dotgrid md:p-6">
          <div className="flex items-center gap-3 mb-4 min-h-[1.5rem]">
            <p className="flex-1 min-w-0 text-[0.8125rem] text-fg-2 truncate">
              {result ? result.prompt : "No generation yet"}
            </p>
            {result && (
              <>
                <span className="shrink-0 font-mono text-2xs text-fg-3">{result.style.label}</span>
                <span className="shrink-0 hidden sm:block font-mono text-2xs text-fg-4">seed {result.seeds[selected]}</span>
              </>
            )}
          </div>

          <div ref={mainRef} className={`relative w-full max-w-2xl mx-auto ${shownAspect.className} rounded-md overflow-hidden`}>
            {status === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 border border-dashed border-line-strong rounded-md text-center bg-bg">
                <Icon name="image" size={28} className="text-fg-4" />
                <p className="text-sm text-fg-3">Four variations will appear here.</p>
              </div>
            )}

            {status === "generating" && (
              <div className="absolute inset-0 skeleton flex flex-col items-center justify-center gap-4 border border-line rounded-md" role="status" aria-live="polite">
                <p className="font-mono text-xs text-fg-2">{stage.label}</p>
                <div className="w-2/3 max-w-xs h-px bg-line-strong overflow-hidden">
                  <div className="h-full bg-accent transition-[width] duration-100" style={{ width: `${progress}%` }} />
                </div>
                <p className="font-mono text-2xs text-fg-3 tabular">{progress}%</p>
              </div>
            )}

            {status === "done" && result && (
              <figure className="absolute inset-0 animate-fade-in">
                <Artwork
                  scene={result.scene}
                  palette={result.style.id}
                  seed={result.seeds[selected]}
                  title={`Generated image: ${result.prompt}`}
                />
              </figure>
            )}
          </div>

          {status === "done" && result && (
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <ul className="flex gap-2" aria-label="Variations">
                {result.seeds.map((seed, i) => (
                  <li key={seed}>
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-pressed={selected === i}
                      aria-label={`Show variation ${i + 1}`}
                      className={`relative block w-14 h-14 rounded overflow-hidden md:w-16 md:h-16 ${
                        selected === i ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Artwork scene={result.scene} palette={result.style.id} seed={seed} />
                      <span className="absolute left-1 bottom-1 px-1 rounded-sm bg-bg/80 font-mono text-[0.5625rem] text-fg-2">V{i + 1}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 ml-auto">
                <Button variant="secondary" size="sm" onClick={generate}>
                  <Icon name="refresh" size={13} /> Vary
                </Button>
                <Button variant="light" size="sm" onClick={download} aria-label="Download selected image as SVG">
                  <Icon name="download" size={13} /> Download
                </Button>
              </div>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div>
            <p className="t-label mb-3 text-fg-4">Recent generations</p>
            <ul className="flex gap-2 overflow-x-auto scrollbar-thin pb-2">
              {history.map((h) => (
                <li key={h.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setResult(h);
                      setSelected(0);
                      setStatus("done");
                    }}
                    className={`block w-16 h-16 rounded overflow-hidden border transition-colors ${
                      result?.id === h.id ? "border-fg-3" : "border-line hover:border-line-strong"
                    }`}
                    aria-label={`Show generation: ${h.prompt}`}
                  >
                    <Artwork scene={h.scene} palette={h.style.id} seed={h.seeds[0]} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePlayground;
