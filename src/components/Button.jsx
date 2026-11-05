import { Link } from "react-router-dom";
import ButtonSvg from "../assets/svg/ButtonSvg";

const isInternal = (href) => typeof href === "string" && href.startsWith("/");
const isExternal = (href) => typeof href === "string" && /^https?:\/\//.test(href);

const Button = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
  type = "button",
  disabled,
  ...rest
}) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 disabled:opacity-60 disabled:pointer-events-none ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10 inline-flex items-center gap-2";

  const content = (
    <>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </>
  );

  if (isInternal(href)) {
    return (
      <Link to={href} className={classes} onClick={onClick} {...rest}>
        {content}
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
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
