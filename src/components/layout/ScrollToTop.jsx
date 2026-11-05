import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on route change, or to the element matching the URL hash.
 * Retries briefly so it also works with lazily loaded pages.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    let tries = 0;
    let timer;
    const attempt = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 20) {
        timer = setTimeout(attempt, 50);
      }
    };
    attempt();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
