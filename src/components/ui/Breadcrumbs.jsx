import { Link } from "react-router-dom";

const Breadcrumbs = ({ items, className = "" }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-fg-3">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <li key={item.label} className="flex items-center gap-2">
            {last || !item.to ? (
              <span aria-current={last ? "page" : undefined} className="text-fg-2 line-clamp-1">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="transition-colors hover:text-fg">
                {item.label}
              </Link>
            )}
            {!last && <span className="text-fg-4">/</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
