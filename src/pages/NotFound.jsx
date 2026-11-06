import { Link } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/ui/Icon";
import usePageMeta from "../hooks/usePageMeta";
import useCommandPalette from "../hooks/useCommandPalette";

const suggestions = [
  { label: "Product overview", to: "/features" },
  { label: "How it works", to: "/how-to-use" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  usePageMeta("Page not found", "The page you are looking for does not exist.");
  const palette = useCommandPalette();

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="container grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="t-label mb-6 text-fg-3">Error 404</p>
          <h1 className="t-h1 mb-6">No source for that page.</h1>
          <p className="t-lead max-w-xl mb-10">
            The link may be old, or the page moved when we renamed things. Search the site, or start from one of the pages on the right.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/" variant="primary" size="lg">
              Back to home
            </Button>
            <Button onClick={palette.open} variant="secondary" size="lg">
              <Icon name="search" size={15} /> Search the site
            </Button>
          </div>
        </div>
        <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <div className="p-4 rounded-lg border border-line bg-surface font-mono text-xs leading-6 text-fg-3 mb-6" aria-hidden="true">
            <p><span className="text-fg-4">GET</span> {typeof window !== "undefined" ? window.location.pathname : "/"}</p>
            <p><span className="text-danger">404</span> Not found, 0 sources matched</p>
          </div>
          <ul className="border-t border-line">
            {suggestions.map((s) => (
              <li key={s.to} className="border-b border-line">
                <Link to={s.to} className="group flex items-center justify-between py-3 text-sm text-fg-2 transition-colors hover:text-fg">
                  {s.label}
                  <Icon name="arrowRight" size={14} className="text-fg-4 group-hover:text-fg" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
