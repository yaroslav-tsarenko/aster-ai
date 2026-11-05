import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/**
 * Smoothly tweens a number towards `value` (easeOutCubic).
 */
const useAnimatedNumber = (value, { duration = 600, enabled = true } = {}) => {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(enabled ? 0 : value);
  const fromRef = useRef(enabled ? 0 : value);
  const frameRef = useRef();

  useEffect(() => {
    if (!enabled) return;
    if (reduced) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    const from = fromRef.current;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (value - from) * eased;
      setDisplay(next);
      fromRef.current = next;
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration, enabled, reduced]);

  return display;
};

export default useAnimatedNumber;
