import { Link } from "react-router-dom";
import Section from "../components/Section";
import Button from "../components/Button";
import Icon from "../components/ui/Icon";
import { BackgroundCircles } from "../components/design/Header";
import usePageMeta from "../hooks/usePageMeta";
import useCommandPalette from "../hooks/useCommandPalette";

const suggestions = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  usePageMeta("Page not found", "The page you're looking for doesn't exist.");
  const palette = useCommandPalette();

  return (
    <Section crosses customPaddings className="py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 w-[50rem] aspect-square -translate-x-1/2 -translate-y-1/2 bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70%" />
        {[46, 34, 22].map((w) => (
          <div key={w} className="absolute top-1/2 left-1/2 aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ width: `${w}rem` }} />
        ))}
        <BackgroundCircles />
      </div>
      <div className="container relative z-2 text-center">
        <p className="mb-4 font-code text-sm uppercase tracking-tagline text-n-4">Error 404</p>
        <h1 className="mb-6 font-semibold text-[7rem] leading-none md:text-[10rem] text-gradient">404</h1>
        <h2 className="h3 mb-4">This page wandered off</h2>
        <p className="body-1 max-w-xl mx-auto mb-10 text-n-3">
          Even our AI couldn’t find what you were looking for. Try one of these instead, or search the site.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row">
          <Button href="/" white>
            Back to home
          </Button>
          <Button onClick={palette.open}>
            <Icon name="search" size={16} /> Search the site
          </Button>
        </div>
        <ul className="flex flex-wrap justify-center gap-3">
          {suggestions.map((s) => (
            <li key={s.to}>
              <Link to={s.to} className="inline-block px-4 py-2 rounded-full border border-n-6 text-sm text-n-3 transition-colors hover:border-color-1 hover:text-n-1">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default NotFound;
