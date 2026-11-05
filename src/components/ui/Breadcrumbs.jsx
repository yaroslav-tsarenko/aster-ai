import { Link } from "react-router-dom";
import Icon from "./Icon";

const Breadcrumbs = ({ items, className = "" }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-wider text-n-4">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <li key={item.label} className="flex items-center gap-2">
            {last || !item.to ? (
              <span aria-current={last ? "page" : undefined} className="text-n-2 line-clamp-1">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="transition-colors hover:text-color-1">
                {item.label}
              </Link>
            )}
            {!last && <Icon name="chevronRight" size={14} />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
