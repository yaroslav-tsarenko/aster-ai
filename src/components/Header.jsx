import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { navigation } from "../constants";
import Button from "./Button";
import Logo from "./brand/Logo";
import Icon from "./ui/Icon";
import useCommandPalette from "../hooks/useCommandPalette";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const Header = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const lockedRef = useRef(false);
  const palette = useCommandPalette();

  const unlock = () => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    enablePageScroll(navRef.current);
  };

  const close = () => {
    setOpen(false);
    unlock();
  };

  const toggle = () => {
    if (open) return close();
    setOpen(true);
    lockedRef.current = true;
    disablePageScroll(navRef.current);
  };

  useEffect(() => {
    setOpen(false);
    unlock();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    const mql = window.matchMedia("(min-width: 1024px)");
    const onResize = () => mql.matches && close();
    document.addEventListener("keydown", onKey);
    mql.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors ${
        scrolled || open ? "bg-bg border-line" : "bg-bg/0 border-transparent"
      }`}
    >
      <div className="container flex items-center h-16">
        <Link to="/" aria-label="Aster home" className="mr-10">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation
              .filter((item) => item.desktop !== false)
              .map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `inline-flex items-center h-8 px-3 rounded-md text-sm transition-colors ${
                        isActive ? "text-fg bg-surface" : "text-fg-3 hover:text-fg"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={palette.open}
            className="hidden lg:inline-flex items-center gap-2 h-8 pl-2.5 pr-1.5 rounded-md border border-line text-fg-3 text-[0.8125rem] transition-colors hover:text-fg hover:border-line-strong"
            aria-label="Search pages (command palette)"
          >
            <Icon name="search" size={14} />
            <span className="hidden xl:inline">Search</span>
            <span className="kbd h-5 min-w-0 px-1">{isMac ? "⌘K" : "Ctrl K"}</span>
          </button>
          <Link to="/login" className="hidden lg:inline-flex items-center h-8 px-3 text-sm text-fg-2 transition-colors hover:text-fg">
            Sign in
          </Link>
          <Button href="/signup" variant="primary" size="sm" className="hidden sm:inline-flex">
            Start free
          </Button>

          <button
            type="button"
            onClick={palette.open}
            className="flex items-center justify-center w-9 h-9 rounded-md text-fg-2 transition-colors hover:text-fg hover:bg-surface lg:hidden"
            aria-label="Search pages"
          >
            <Icon name="search" size={18} />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex items-center justify-center w-9 h-9 -mr-1.5 rounded-md text-fg transition-colors hover:bg-surface lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      <nav
        ref={navRef}
        id="mobile-navigation"
        aria-label="Mobile"
        className={`${open ? "flex" : "hidden"} fixed top-16 inset-x-0 bottom-0 flex-col bg-bg overflow-y-auto lg:hidden`}
      >
        <ul className="container py-4">
          {navigation.map((item) => (
            <li key={item.id} className="border-b border-line">
              <NavLink
                to={item.url}
                onClick={close}
                className={({ isActive }) =>
                  `flex items-center justify-between py-4 text-xl tracking-[-0.02em] transition-colors ${
                    isActive ? "text-fg" : "text-fg-2 hover:text-fg"
                  }`
                }
              >
                {item.title}
                <Icon name="arrowRight" size={18} className="text-fg-4" />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="container grid grid-cols-2 gap-3 pb-8 mt-auto">
          <Button href="/login" variant="secondary" size="lg" onClick={close}>
            Sign in
          </Button>
          <Button href="/signup" variant="primary" size="lg" onClick={close}>
            Start free
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
