/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/*
 * Aster design tokens
 * ------------------------------------------------------------------
 * Colour: graphite neutrals + one accent (electric lime), used sparingly.
 * Type:   Geist for UI/body, Geist Mono for labels, numbers and code.
 * Grid:   12 columns on desktop, 8 on tablet, 4 on mobile (see .grid-12).
 */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0e0f11",
        surface: "#16181b",
        raised: "#1d2024",
        line: {
          DEFAULT: "#26292e",
          strong: "#363a41",
        },
        fg: {
          DEFAULT: "#ededee",
          2: "#b9bcc2",
          3: "#8b9098",
          4: "#5f646c",
        },
        accent: {
          DEFAULT: "#c6f432",
          hover: "#d4f75e",
          ink: "#0e0f11",
        },
        danger: "#f07a6a",
        warn: "#e6b94f",
        info: "#8fb2e8",
      },
      fontFamily: {
        sans: ['"Geist Variable"', "Geist", ...fontFamily.sans],
        mono: ['"Geist Mono Variable"', '"Geist Mono"', ...fontFamily.mono],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        label: "0.08em",
      },
      maxWidth: {
        site: "80rem",
        prose: "40rem",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      transitionDuration: {
        DEFAULT: "160ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.2, 0, 0, 1)",
      },
      zIndex: {
        1: "1",
        2: "2",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          "@apply w-full max-w-site mx-auto px-5 md:px-8 lg:px-10": {},
        },
        // 12-column grid that collapses to 8 (tablet) and 4 (mobile)
        ".grid-12": {
          "@apply grid grid-cols-4 gap-x-5 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12": {},
        },
        // Type scale ------------------------------------------------------
        ".t-display": {
          "@apply font-medium text-[2.5rem] leading-[1.05] tracking-[-0.04em] md:text-[3.5rem] lg:text-[4.25rem]": {},
        },
        ".t-h1": {
          "@apply font-medium text-[2.25rem] leading-[1.1] tracking-[-0.035em] md:text-[3rem] lg:text-[3.5rem]": {},
        },
        ".t-h2": {
          "@apply font-medium text-[1.875rem] leading-[1.15] tracking-[-0.03em] md:text-[2.25rem] lg:text-[2.625rem]": {},
        },
        ".t-h3": {
          "@apply font-medium text-xl leading-snug tracking-[-0.015em] md:text-2xl": {},
        },
        ".t-h4": {
          "@apply font-medium text-base leading-6 tracking-[-0.01em] md:text-lg": {},
        },
        ".t-lead": {
          "@apply text-[1.0625rem] leading-7 text-fg-2 md:text-lg md:leading-8": {},
        },
        ".t-body": {
          "@apply text-[0.9375rem] leading-6 md:text-base md:leading-7": {},
        },
        ".t-small": {
          "@apply text-sm leading-6": {},
        },
        ".t-label": {
          "@apply font-mono text-2xs font-medium uppercase tracking-label": {},
        },
        // Surfaces --------------------------------------------------------
        ".panel": {
          "@apply bg-surface border border-line rounded-lg": {},
        },
        ".kbd": {
          "@apply inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded border border-line-strong bg-raised font-mono text-2xs text-fg-2": {},
        },
      });
    }),
  ],
};
