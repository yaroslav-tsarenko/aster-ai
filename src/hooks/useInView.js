import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, inView]. Once the element enters the viewport it stays "in view".
 */
const useInView = ({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, inView]);

  return [ref, inView];
};

export default useInView;
