import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import Icon from "../ui/Icon";
import { CommandPaletteContext } from "../../context/command-palette-context";
import { benefits, blogPosts, collabApps, jobs } from "../../constants";

const pages = [
  { title: "Home", url: "/", group: "Pages", icon: "chat" },
  { title: "Features", url: "/features", group: "Pages", icon: "sparkle" },
  { title: "How to use", url: "/how-to-use", group: "Pages", icon: "info" },
  { title: "Pricing", url: "/pricing", group: "Pages", icon: "briefcase" },
  { title: "Roadmap", url: "/roadmap", group: "Pages", icon: "mapPin" },
  { title: "Integrations", url: "/integrations", group: "Pages", icon: "link" },
  { title: "Blog", url: "/blog", group: "Pages", icon: "image" },
  { title: "About", url: "/about", group: "Pages", icon: "info" },
  { title: "Careers", url: "/careers", group: "Pages", icon: "briefcase" },
  { title: "Contact", url: "/contact", group: "Pages", icon: "mail" },
  { title: "Open the chat app", url: "/app", group: "Actions", icon: "chat" },
  { title: "Create an account", url: "/signup", group: "Actions", icon: "plus" },
  { title: "Sign in", url: "/login", group: "Actions", icon: "arrowRight" },
  { title: "Privacy policy", url: "/privacy", group: "Legal", icon: "info" },
  { title: "Terms of service", url: "/terms", group: "Legal", icon: "info" },
];

const allItems = [
  ...pages,
  ...benefits.map((b) => ({ title: b.title, url: `/features/${b.slug}`, group: "Features", icon: "sparkle" })),
  ...collabApps.map((a) => ({ title: a.title, url: `/integrations/${a.slug}`, group: "Integrations", icon: "link" })),
  ...blogPosts.map((p) => ({ title: p.title, url: `/blog/${p.slug}`, group: "Blog", icon: "image" })),
  ...jobs.map((j) => ({ title: j.title, url: `/careers/${j.slug}`, group: "Careers", icon: "briefcase" })),
];

const Palette = ({ onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pages;
    return allItems
      .map((item) => {
        const title = item.title.toLowerCase();
        const score = title.startsWith(q) ? 0 : title.includes(q) ? 1 : item.group.toLowerCase().includes(q) ? 2 : -1;
        return { item, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((r) => r.item);
  }, [query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (item) => {
    onClose();
    navigate(item.url);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  let lastGroup = null;

  return (
    <div>
      <div className="flex items-center gap-3 px-5 border-b border-n-6">
        <Icon name="search" size={20} className="text-n-4" />
        <input
          data-autofocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search pages, features, articles…"
          aria-label="Search"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-results"
          aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
          className="flex-1 h-16 bg-transparent outline-none text-n-1 placeholder:text-n-4"
        />
        <kbd className="hidden sm:block px-2 py-1 rounded bg-n-7 font-code text-[0.625rem] text-n-4">ESC</kbd>
      </div>
      <ul id="command-results" role="listbox" ref={listRef} className="max-h-[50vh] overflow-y-auto scrollbar-thin p-2">
        {results.length === 0 && (
          <li className="px-4 py-10 text-center body-2 text-n-4">No results for “{query}”.</li>
        )}
        {results.map((item, index) => {
          const showGroup = item.group !== lastGroup;
          lastGroup = item.group;
          return (
            <li key={`${item.group}-${item.url}`} role="presentation">
              {showGroup && (
                <p className="px-3 pt-3 pb-2 tagline text-n-4">{item.group}</p>
              )}
              <button
                type="button"
                id={`cmd-${index}`}
                role="option"
                aria-selected={index === active}
                data-index={index}
                onMouseMove={() => setActive(index)}
                onClick={() => go(item)}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left text-sm transition-colors ${
                  index === active ? "bg-n-7 text-n-1" : "text-n-3"
                }`}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${index === active ? "bg-color-1 text-n-1" : "bg-n-7 text-n-4"}`}>
                  <Icon name={item.icon} size={16} />
                </span>
                <span className="flex-1 truncate">{item.title}</span>
                <span className="font-code text-xs text-n-4 truncate max-w-[40%]">{item.url}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="hidden sm:flex items-center gap-4 px-5 py-3 border-t border-n-6 text-xs text-n-4">
        <span><kbd className="font-code">↑↓</kbd> navigate</span>
        <span><kbd className="font-code">↵</kbd> open</span>
        <span><kbd className="font-code">esc</kbd> close</span>
      </div>
    </div>
  );
};

const CommandPaletteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <Modal open={isOpen} onClose={close} title="Command palette" className="max-w-xl" position="top" hideClose>
        <Palette onClose={close} />
      </Modal>
    </CommandPaletteContext.Provider>
  );
};

export default CommandPaletteProvider;
