import Section from "../Section";
import TagLine from "../Tagline";
import Reveal from "./Reveal";
import { BackgroundCircles } from "../design/Header";
import Breadcrumbs from "./Breadcrumbs";

const Rings = () => (
  <div className="absolute top-1/2 left-1/2 w-[46rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <div className="absolute top-1/2 left-1/2 w-[34rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute top-1/2 left-1/2 w-[22rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
  </div>
);

/**
 * Shared hero used by every inner page so they share the landing page's
 * visual language (crosses, rings, gradient glow, tagline brackets).
 */
const PageHero = ({ tag, title, text, children, breadcrumbs, align = "center", className = "" }) => (
  <Section
    crosses
    customPaddings
    className={`pt-12 pb-14 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28 overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute -top-40 left-1/2 w-[60rem] h-[30rem] -translate-x-1/2 bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% opacity-80" />
      <Rings />
      <div className="hidden md:block">
        <BackgroundCircles />
      </div>
    </div>

    <div
      className={`container relative z-2 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      {breadcrumbs && (
        <Breadcrumbs
          items={breadcrumbs}
          className={`mb-8 flex ${align === "center" ? "justify-center" : ""}`}
        />
      )}
      <Reveal>
        {tag && (
          <TagLine className={`mb-5 ${align === "center" ? "justify-center" : ""}`}>
            {tag}
          </TagLine>
        )}
        <h1 className={`h1 mb-6 ${align === "center" ? "max-w-[50rem] mx-auto" : "max-w-[50rem]"}`}>
          {title}
        </h1>
        {text && (
          <p
            className={`body-1 text-n-3 ${
              align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl"
            }`}
          >
            {text}
          </p>
        )}
      </Reveal>
      {children && (
        <Reveal delay={150} className="mt-8 lg:mt-10">
          {children}
        </Reveal>
      )}
    </div>
  </Section>
);

export default PageHero;
