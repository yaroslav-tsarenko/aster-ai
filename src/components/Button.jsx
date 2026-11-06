import { Link } from "react-router-dom";

const isInternal = (href) => typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));
const isExternal = (href) => typeof href === "string" && /^https?:\/\//.test(href);

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-line-strong text-fg hover:border-fg-4 hover:bg-surface",
  ghost: "text-fg-2 hover:text-fg hover:bg-surface",
  light: "bg-fg text-bg hover:bg-white",
};

const sizes = {
  sm: "h-8 px-3 text-[0.8125rem] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-[0.9375rem] gap-2",
};

/**
 * Buttons: primary (lime, one per view), secondary (hairline), ghost and light.
 * `white` is kept as an alias for primary for older call sites.
 */
const Button = ({
  className = "",
  href,
  onClick,
  children,
  variant,
  size = "md",
  white,
  type = "button",
  disabled,
  ...rest
}) => {
  const v = variant || (white ? "primary" : "secondary");
  const classes = `inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:pointer-events-none ${variants[v]} ${sizes[size]} ${className}`;

  if (isInternal(href)) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
