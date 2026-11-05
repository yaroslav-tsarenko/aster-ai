import { useEffect, useRef, useState } from "react";
import { generatedImagePool, imageAspects, imagePromptIdeas, imageStyles } from "../constants";
import Button from "./Button";
import Icon from "./ui/Icon";
import useToast from "../hooks/useToast";
import useReducedMotion from "../hooks/useReducedMotion";
import { loading } from "../assets";

const STAGES = [
  { at: 0, label: "Parsing prompt" },
  { at: 22, label: "Composing scene" },
  { at: 55, label: "Diffusing details" },
  { at: 85, label: "Upscaling to 2048px" },
];

/**
 * Mock image generation studio: style + aspect selection, animated progress,
 * skeleton shimmer, then reveals one of the bundled images with a style filter.
 */
const ImagePlayground = ({ className = "" }) => {
  const { toast } = useToast();
  const reduced = useReducedMotion();
  const [prompt, setPrompt] = useState(imagePromptIdeas[0]);
  const [style, setStyle] = useState(imageStyles[0].id);
  const [aspect, setAspect] = useState(imageAspects[0].id);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | generating | done
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const counter = useRef(0);
  const frame = useRef();

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const styleObj = imageStyles.find((s) => s.id === style);
  const aspectObj = imageAspects.find((a) => a.id === aspect);
  const stage = [...STAGES].reverse().find((s) => progress >= s.at);

  const generate = (e) => {
    e?.preventDefault();
    if (!prompt.trim()) {
      toast("Describe what you'd like to see first", { tone: "error" });
      return;
    }
    if (status === "generating") return;

    setStatus("generating");
    setProgress(0);
    const duration = reduced ? 400 : 2600 + Math.random() * 800;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease in-out with a little hesitation in the middle
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        const image = generatedImagePool[counter.current++ % generatedImagePool.length];
        const item = {
          id: `${Date.now()}`,
          src: image,
          prompt: prompt.trim(),
          style: styleObj,
          aspect: aspectObj,
          seed: Math.floor(Math.random() * 900000 + 100000),
        };
        setResult(item);
        setHistory((h) => [item, ...h].slice(0, 6));
        setStatus("done");
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  return (
    <div className={`grid gap-6 lg:grid-cols-[22rem_1fr] xl:grid-cols-[24rem_1fr] ${className}`}>
      <form onSubmit={generate} className="flex flex-col gap-6 p-6 bg-n-7 border border-n-1/10 rounded-3xl">
        <div>
          <label htmlFor="image-prompt" className="block mb-2 tagline text-n-3">
            Prompt
          </label>
          <textarea
            id="image-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full p-4 bg-n-8 border border-n-6 rounded-xl resize-none text-sm leading-6 outline-none transition-colors focus:border-color-1 placeholder:text-n-4"
            placeholder="A friendly robot reading a book…"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {imagePromptIdeas.slice(1).map((idea) => (
              <button
                key={idea}
                type="button"
                onClick={() => setPrompt(idea)}
                className="px-3 py-1.5 rounded-full bg-n-8 border border-n-6 text-xs text-n-3 text-left transition-colors hover:border-color-1 hover:text-n-1"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 tagline text-n-3">Style</legend>
          <div className="flex flex-wrap gap-2">
            {imageStyles.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={style === s.id}
                onClick={() => setStyle(s.id)}
                className={`px-4 py-2 rounded-xl text-sm transition-colors border ${
                  style === s.id
                    ? "bg-n-1 text-n-8 border-n-1"
                    : "bg-n-8 text-n-3 border-n-6 hover:text-n-1 hover:border-n-4"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 tagline text-n-3">Aspect ratio</legend>
          <div className="grid grid-cols-3 gap-2">
            {imageAspects.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={aspect === a.id}
                onClick={() => setAspect(a.id)}
                className={`flex flex-col items-center gap-2 py-3 rounded-xl border text-xs font-code transition-colors ${
                  aspect === a.id
                    ? "border-color-1 text-n-1 bg-color-1/10"
                    : "border-n-6 text-n-3 bg-n-8 hover:border-n-4"
                }`}
              >
                <span className={`block w-8 border-2 rounded-sm border-current ${a.className}`} />
                {a.label}
              </button>
            ))}
          </div>
        </fieldset>

        <Button type="submit" white className="w-full" disabled={status === "generating"}>
          {status === "generating" ? "Generating…" : status === "done" ? "Generate again" : "Generate image"}
        </Button>
      </form>

      <div className="flex flex-col gap-4 min-w-0">
        <div className="relative flex items-center justify-center p-4 min-h-[20rem] bg-n-7 border border-n-1/10 rounded-3xl overflow-hidden md:p-8">
          <div className={`relative w-full max-w-2xl ${aspectObj.className} rounded-2xl overflow-hidden transition-all duration-500`}>
            {status === "idle" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-n-6 rounded-2xl text-center p-6">
                <Icon name="image" size={36} className="text-n-4" />
                <p className="body-2 text-n-4">Your generated image will appear here.</p>
              </div>
            )}

            {status === "generating" && (
              <div className="absolute inset-0 skeleton flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
                <img src={loading} width={32} height={32} alt="" className="w-8 h-8 animate-spin" />
                <p className="font-code text-sm text-n-2">{stage.label}…</p>
                <div className="w-2/3 max-w-xs h-1.5 bg-n-8/60 rounded-full overflow-hidden">
                  <div className="h-full bg-conic-gradient rounded-full transition-[width] duration-100" style={{ width: `${progress}%` }} />
                </div>
                <p className="font-code text-xs text-n-3 tabular-nums">{progress}%</p>
              </div>
            )}

            {status === "done" && result && (
              <figure className="absolute inset-0 animate-fade-in">
                <img
                  src={result.src}
                  alt={`Generated image: ${result.prompt}`}
                  className="w-full h-full object-cover"
                  style={{ filter: result.style.filter }}
                />
                <figcaption className="absolute left-3 right-3 bottom-3 flex flex-wrap items-center gap-2 p-3 bg-n-8/80 backdrop-blur rounded-xl text-xs">
                  <span className="flex-1 min-w-[10rem] line-clamp-1 text-n-2">“{result.prompt}”</span>
                  <span className="px-2 py-1 rounded bg-n-6 font-code text-n-3">{result.style.label}</span>
                  <span className="px-2 py-1 rounded bg-n-6 font-code text-n-3">seed {result.seed}</span>
                  <a
                    href={result.src}
                    download={`brainwave-${result.seed}.webp`}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-n-1 text-n-8 transition-colors hover:bg-color-1 hover:text-n-1"
                    aria-label="Download image"
                    title="Download image"
                  >
                    <Icon name="download" size={16} />
                  </a>
                </figcaption>
              </figure>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div>
            <p className="tagline mb-3 text-n-4">Recent generations</p>
            <ul className="flex gap-3 overflow-x-auto scrollbar-thin pb-2">
              {history.map((h) => (
                <li key={h.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setResult(h);
                      setStatus("done");
                    }}
                    className={`block w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      result?.id === h.id ? "border-color-1" : "border-transparent hover:border-n-4"
                    }`}
                    aria-label={`Show generation: ${h.prompt}`}
                  >
                    <img src={h.src} alt="" className="w-full h-full object-cover" style={{ filter: h.style.filter }} />
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
