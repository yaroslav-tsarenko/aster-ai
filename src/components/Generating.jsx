import { useEffect, useState } from "react";
import { loading } from "../assets";
import useReducedMotion from "../hooks/useReducedMotion";

const phrases = ["AI is generating", "Composing a reply", "Rendering your image", "Summarising threads"];

const Generating = ({ className, cycle = false }) => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!cycle || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 2600);
    return () => clearInterval(t);
  }, [cycle, reduced]);

  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
      role="status"
    >
      <img className="w-5 h-5 mr-4 animate-spin" src={loading} alt="" />
      <span key={index} className="animate-fade-in">
        {phrases[index]}
      </span>
      <span className="inline-flex ml-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot" style={{ animationDelay: `${i * 0.15}s` }}>
            .
          </span>
        ))}
      </span>
    </div>
  );
};

export default Generating;
