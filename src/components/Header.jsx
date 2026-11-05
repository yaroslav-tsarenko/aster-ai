import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import Icon from "./ui/Icon";
import useCommandPalette from "../hooks/useCommandPalette";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const Header = () => {
  const { pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const navRef = useRef(null);
  const palette = useCommandPalette();

  const lockedRef = useRef(false);

  const lock = () => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    disablePageScroll(navRef.current);
  };

  const unlock = () => {
    if (!lockedRef.current) return;
    lockedRef.current = false;
    enablePageScroll(navRef.current);
  };

  const closeNavigation = () => {
    setOpenNavigation(false);
    unlock();
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      closeNavigation();
    } else {
      setOpenNavigation(true);
      lock();
    }
  };

  // Close the mobile menu on navigation (e.g. via the command palette)
  useEffect(() => {
    setOpenNavigation(false);
    if (lockedRef.current) {
      lockedRef.current = false;
      enablePageScroll(navRef.current);
    }
  }, [pathname]);

  // Close on Escape, or when resizing up to the desktop layout
  useEffect(() => {
    if (!openNavigation) return;
    const close = () => {
      setOpenNavigation(false);
      if (lockedRef.current) {
        lockedRef.current = false;
        enablePageScroll(navRef.current);
      }
    };
    const onKey = (e) => e.key === "Escape" && close();
    const mql = window.matchMedia("(min-width: 1024px)");
    const onResize = () => mql.matches && close();
    document.addEventListener("keydown", onKey);
    mql.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onResize);
    };
  }, [openNavigation]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Link className="block w-[10.5rem] md:w-[12rem] xl:mr-8" to="/" aria-label="Brainwave home">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </Link>

        <nav
          ref={navRef}
          id="mobile-navigation"
          aria-label="Main"
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[4.75rem] left-0 right-0 bottom-0 bg-n-8 overflow-y-auto overflow-x-hidden lg:overflow-visible lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto py-8 lg:py-0 lg:flex-row">
            {navigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                onClick={closeNavigation}
                className={({ isActive }) =>
                  `block relative font-code text-xl md:text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                    item.onlyMobile || item.desktop === false ? "lg:hidden" : ""
                  } px-6 py-3 md:py-5 lg:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                    isActive ? "z-2 text-color-1 lg:text-n-1" : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.title}
                    {isActive && (
                      <span className="hidden lg:block absolute left-6 right-6 bottom-0 h-0.5 bg-conic-gradient xl:left-12 xl:right-12" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <button
          type="button"
          onClick={palette.open}
          className="hidden lg:flex items-center gap-2 h-9 mr-6 pl-3 pr-2 rounded-lg border border-n-6 text-n-4 text-xs transition-colors hover:text-n-1 hover:border-n-4"
          aria-label="Search pages (command palette)"
        >
          <Icon name="search" size={16} />
          <span className="hidden xl:inline">Search</span>
          <kbd className="px-1.5 py-0.5 rounded bg-n-7 font-code text-[0.625rem] text-n-3">
            {isMac ? "⌘" : "Ctrl"} K
          </kbd>
        </button>

        <Link
          to="/signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </Link>
        <Button className="hidden lg:flex" href="/login">
          Sign in
        </Button>

        <button
          type="button"
          onClick={palette.open}
          className="ml-auto mr-3 flex items-center justify-center w-11 h-11 rounded-xl text-n-3 transition-colors hover:text-n-1 lg:hidden"
          aria-label="Search pages"
        >
          <Icon name="search" size={20} />
        </button>

        <Button
          className="lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
          aria-label={openNavigation ? "Close menu" : "Open menu"}
          aria-expanded={openNavigation}
          aria-controls="mobile-navigation"
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
