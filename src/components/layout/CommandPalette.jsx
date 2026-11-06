import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import Icon from "../ui/Icon";
import { CommandPaletteContext } from "../../context/command-palette-context";
import { benefits, blogPosts, collabApps, jobs } from "../../constants";

const pages = [
  { title: "Home", url: "/", group: "Pages", icon: "arrowRight" },
  { title: "Product overview", url: "/features", group: "Pages", icon: "layers" },
  { title: "How it works", url: "/how-to-use", group: "Pages", icon: "info" },
  { title: "Pricing", url: "/pricing", group: "Pages", icon: "briefcase" },
  { title: "Roadmap and changelog", url: "/roadmap", group: "Pages", icon: "mapPin" },
  { title: "Integrations", url: "/integrations", group: "Pages", icon: "link" },
  { title: "Blog", url: "/blog", group: "Pages", icon: "file" },
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
  ...benefits.map((b) => ({ title: b.title, url: `/features/${b.slug}`, group: "Features", icon: "layers" })),
  ...collabApps.map((a) => ({ title: a.title, url: `/integrations/${a.slug}`, group: "Integrations", icon: "link" })),
  ...blogPosts.map((p) => ({ title: p.title, url: `/blog/${p.slug}`, group: "Blog", icon: "file" })),
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
      <div className="flex items-center gap-3 px-4 border-b border-line">
        <Icon name="search" size={18} className="text-fg-3" />
        <input
          data-autofocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search pages, features, articles"
          aria-label="Search"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-results"
          aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
          className="flex-1 h-14 bg-transparent outline-none text-fg placeholder:text-fg-4"
        />
        <kbd className="kbd hidden sm:inline-flex">esc</kbd>
      </div>
      <ul id="command-results" role="listbox" ref={listRef} className="max-h-[50vh] overflow-y-auto scrollbar-thin p-1.5">
        {results.length === 0 && (
          <li className="px-4 py-10 text-center text-sm text-fg-3">No results for “{query}”.</li>
        )}
        {results.map((item, index) => {
          const showGroup = item.group !== lastGroup;
          lastGroup = item.group;
          return (
            <li key={`${item.group}-${item.url}`} role="presentation">
              {showGroup && (
                <p className="px-2.5 pt-3 pb-1.5 t-label text-fg-4">{item.group}</p>
              )}
              <button
                type="button"
                id={`cmd-${index}`}
                role="option"
                aria-selected={index === active}
                data-index={index}
                onMouseMove={() => setActive(index)}
                onClick={() => go(item)}
                className={`flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-left text-sm transition-colors ${
                  index === active ? "bg-raised text-fg" : "text-fg-2"
                }`}
              >
                <Icon name={item.icon} size={15} className={index === active ? "text-accent" : "text-fg-4"} />
                <span className="flex-1 truncate">{item.title}</span>
                <span className="font-mono text-2xs text-fg-4 truncate max-w-[40%]">{item.url}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="hidden sm:flex items-center gap-4 px-4 py-2.5 border-t border-line text-xs text-fg-3">
        <span><kbd className="kbd">↑↓</kbd> navigate</span>
        <span><kbd className="kbd">↵</kbd> open</span>
        <span><kbd className="kbd">esc</kbd> close</span>
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
