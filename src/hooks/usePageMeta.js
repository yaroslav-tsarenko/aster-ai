import { useEffect } from "react";

const SITE_NAME = "Brainwave";
const DEFAULT_DESCRIPTION =
  "Brainwave is the AI chat app that helps you write, code, design and create faster. Ask anything, generate images and collaborate across your favourite tools.";

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
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} - Your AI Assistant`;
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
