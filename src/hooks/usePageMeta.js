import { useEffect } from "react";

const SITE_NAME = "Aster";
const DEFAULT_TITLE = "Aster AI - The assistant for research, writing and images";
const DEFAULT_DESCRIPTION =
  "Aster reads your sources, cites every claim, drafts in your voice and generates images that match your brief. A concept product by Yaroslav Tsarenko.";

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(name|property)="([^"]+)"\]/);
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

/**
 * Tiny per-page <title> / description manager (no extra dependencies).
 */
const usePageMeta = (title, description = DEFAULT_DESCRIPTION) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", window.location.href);
  }, [title, description]);
};

export default usePageMeta;
