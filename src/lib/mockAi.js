import { cannedResponses, fallbackResponses } from "../constants";

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matches = (text, keyword) => {
  const prefix = keyword.endsWith("*");
  const word = escapeRe(prefix ? keyword.slice(0, -1) : keyword);
  return new RegExp(prefix ? `\\b${word}` : `\\b${word}\\b`, "i").test(text);
};

const alternates = [
  "Here's another take on that.\n\n",
  "Let me phrase that differently.\n\n",
  "Sure! A slightly different version:\n\n",
];

/**
 * Picks a canned response for a prompt. `variant` > 0 is used by "Regenerate".
 */
export const getMockResponse = (prompt, variant = 0) => {
  const match = cannedResponses.find((r) => r.keywords.some((k) => matches(prompt, k)));

  if (match) {
    if (variant === 0) return match.text;
    return alternates[(variant - 1) % alternates.length] + match.text;
  }

  // Stable but varied fallback per prompt
  const seed = [...prompt].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return fallbackResponses[(seed + variant) % fallbackResponses.length];
};

export const makeTitle = (text) => {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 38 ? `${clean.slice(0, 38).trim()}…` : clean || "New chat";
};

export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
