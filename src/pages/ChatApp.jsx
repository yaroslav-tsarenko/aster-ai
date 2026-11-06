import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo, { LogoMark } from "../components/brand/Logo";
import Avatar from "../components/brand/Avatar";
import { chatModels, suggestedPrompts } from "../constants";
import ChatWindow from "../components/chat/ChatWindow";
import Icon from "../components/ui/Icon";
import useMockChat from "../hooks/useMockChat";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import useCommandPalette from "../hooks/useCommandPalette";
import { makeTitle, uid } from "../lib/mockAi";
import { copyToClipboard } from "../lib/utils";

const STORAGE_KEY = "aster-demo-chats-v1";
const DAY = 86400000;

const seed = () => {
  const now = Date.now();
  const msg = (role, content, t) => ({ id: uid(), role, content, status: "done", createdAt: t, prompt: role === "assistant" ? "" : undefined });
  return [
    {
      id: uid(),
      title: "Outline for the urban heat brief",
      updatedAt: now - 3600000,
      messages: [
        msg("user", "Give me an outline for a two-page brief on cooling dense neighbourhoods.", now - 3700000),
        msg("assistant", "Here is a two-page outline built from the 12 sources in this project:\n\n1. **Why it matters**: heat deaths and costs, with the two strongest local figures [1]\n2. **What works**: street trees, cool roofs and shade, ranked by measured effect [2][3]\n3. **What it costs**: cost per degree of cooling, where the sources allow it\n4. **Recommendations**: three actions for the next budget cycle\n\nWant me to draft section 2 first?", now - 3600000),
      ],
    },
    {
      id: uid(),
      title: "React Server Components in two sentences",
      updatedAt: now - DAY * 1.2,
      messages: [
        msg("user", "Explain React Server Components in two sentences.", now - DAY * 1.2),
        msg("assistant", "React Server Components render on the server and send a compact description of the UI to the browser, so they can read data directly without shipping their code to the client. You combine them with regular client components wherever you need interactivity.", now - DAY * 1.2),
      ],
    },
    {
      id: uid(),
      title: "Cover prompt for the spring series",
      updatedAt: now - DAY * 4,
      messages: [
        msg("user", "Write an image prompt for the spring report cover, matching the Editorial preset.", now - DAY * 4),
        msg("assistant", "Try this with the Editorial preset at 16:9:\n\n`A single aster flower seen from above, flat shapes, slate and pale blue palette, generous empty space on the left for the title`\n\nIf the flower feels too literal, swap it for layered paper hills in the same palette.", now - DAY * 4),
      ],
    },
  ];
};

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* ignore corrupted storage */
  }
  return seed();
};

const groupLabel = (t) => {
  const diff = Date.now() - t;
  if (diff < DAY) return "Today";
  if (diff < DAY * 2) return "Yesterday";
  if (diff < DAY * 7) return "Previous 7 days";
  return "Older";
};

/* ------------------------------------------------------------------ */

const ModelPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = chatModels.find((m) => m.id === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 h-8 px-2.5 rounded-md border text-[0.8125rem] font-medium transition-colors ${
          open ? "border-line-strong bg-raised" : "border-line hover:border-line-strong"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        {current.label}
        <Icon name="chevronDown" size={14} className={`text-fg-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" aria-label="Choose a model" className="absolute left-0 top-10 z-30 w-72 p-1 bg-raised border border-line-strong rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-pop-in">
          {chatModels.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                role="option"
                aria-selected={m.id === value}
                onClick={() => {
                  onChange(m.id);
                  setOpen(false);
                }}
                className={`flex items-start gap-3 w-full px-2.5 py-2 rounded-md text-left transition-colors ${
                  m.id === value ? "bg-surface" : "hover:bg-surface"
                }`}
              >
                <span className="flex-1">
                  <span className="block text-[0.8125rem] font-medium">{m.label}</span>
                  <span className="block text-xs text-fg-3">{m.description}</span>
                </span>
                {m.id === value ? (
                  <Icon name="check" size={14} className="mt-0.5 text-accent" />
                ) : (
                  <span className="mt-0.5 font-mono text-2xs text-fg-4">{m.meta}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ChatPanel = ({ conversation, model, onChange }) => {
  const chat = useMockChat({ initialMessages: conversation.messages, speed: model === "aster-swift" ? 2.5 : 1 });
  const { messages, isBusy } = chat;
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!isBusy && messages !== conversation.messages) onChangeRef.current(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isBusy]);

  return (
    <ChatWindow
      chat={chat}
      className="flex-1 w-full max-w-3xl mx-auto px-4 pb-4 md:px-6 md:pb-5"
      listClassName="pt-8 pr-1"
      inputPlaceholder={`Message ${chatModels.find((m) => m.id === model).label}`}
      footer={<p className="mt-2 text-center text-2xs text-fg-4">Demo assistant with prepared answers. Check citations before you rely on them.</p>}
      emptyContent={(send) => (
        <div className="flex flex-col justify-center min-h-full py-10">
          <LogoMark size={32} className="mb-6" />
          <h1 className="t-h3 mb-2">What are you working on?</h1>
          <p className="t-small mb-8 text-fg-3">Ask about your sources, start a draft, or pick one of these.</p>
          <div className="grid w-full border-t border-l border-line rounded-lg overflow-hidden sm:grid-cols-2">
            {suggestedPrompts.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                className="group flex items-start gap-3 p-4 border-r border-b border-line text-left text-sm text-fg-2 transition-colors hover:bg-surface hover:text-fg"
              >
                <span className="font-mono text-2xs text-fg-4 mt-0.5">0{i + 1}</span>
                <span className="flex-1">{p}</span>
                <Icon name="arrowUpRight" size={14} className="mt-0.5 text-fg-4 group-hover:text-accent" />
              </button>
            ))}
          </div>
        </div>
      )}
    />
  );
};

/* ------------------------------------------------------------------ */

const iconBtn = "flex items-center justify-center w-9 h-9 rounded-md text-fg-3 transition-colors hover:text-fg hover:bg-surface";

const ChatApp = () => {
  usePageMeta("App", "Aster demo workspace: chat with citations, model picker and history.");
  const navigate = useNavigate();
  const { toast } = useToast();
  const palette = useCommandPalette();
  const [conversations, setConversations] = useState(load);
  const [activeId, setActiveId] = useState(null);
  const [model, setModel] = useState(chatModels[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [conversations]);

  const active = conversations.find((c) => c.id === activeId) || null;
  const draft = useMemo(() => ({ id: "draft", title: "New chat", messages: [] }), []);
  const current = active || draft;
  // A new key resets the chat engine when switching conversations
  const [panelKey, setPanelKey] = useState(() => uid());

  const select = (id) => {
    setActiveId(id);
    setPanelKey(uid());
    setSidebarOpen(false);
  };

  const newChat = () => {
    setActiveId(null);
    setPanelKey(uid());
    setSidebarOpen(false);
  };

  const remove = (id) => {
    setConversations((list) => list.filter((c) => c.id !== id));
    if (id === activeId) newChat();
    toast("Conversation deleted", { tone: "info" });
  };

  const handleChange = useCallback(
    (messages) => {
      if (!messages.length) return;
      if (activeId) {
        setConversations((list) =>
          list.map((c) => (c.id === activeId ? { ...c, messages, updatedAt: Date.now() } : c))
        );
        return;
      }
      const id = uid();
      const firstUser = messages.find((m) => m.role === "user");
      const conversation = { id, title: makeTitle(firstUser?.content || "New chat"), messages, updatedAt: Date.now() };
      setActiveId(id);
      setConversations((list) => [conversation, ...list]);
    },
    [activeId]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const filtered = conversations
    .filter((c) => !search || c.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const groups = filtered.reduce((acc, c) => {
    const label = groupLabel(c.updatedAt);
    (acc[label] ||= []).push(c);
    return acc;
  }, {});

  const share = async () => {
    const ok = await copyToClipboard(window.location.href);
    toast(ok ? "Share link copied (demo)" : "Could not copy the link", { tone: ok ? "success" : "error" });
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-bg">
      <div
        className={`fixed inset-0 z-40 bg-black/60 lg:hidden ${sidebarOpen ? "block animate-fade-in" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="chat-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[17rem] bg-surface border-r border-line transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Conversations"
      >
        <div className="flex items-center justify-between h-14 px-4">
          <Link to="/" aria-label="Aster home">
            <Logo size={22} />
          </Link>
          <button type="button" onClick={() => setSidebarOpen(false)} className={`${iconBtn} lg:hidden`} aria-label="Close sidebar">
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="px-3">
          <button
            type="button"
            onClick={newChat}
            className="flex items-center gap-2 w-full h-9 mb-2 px-3 rounded-md border border-line-strong text-sm font-medium transition-colors hover:bg-raised"
          >
            <Icon name="plus" size={15} /> New chat
          </button>
          <div className="relative">
            <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-4" />
            <label htmlFor="chat-search" className="sr-only">Search conversations</label>
            <input
              id="chat-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats"
              className="w-full h-9 pl-8 pr-3 bg-bg border border-line rounded-md text-sm outline-none transition-colors focus:border-fg-4 placeholder:text-fg-4"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4" aria-label="Chat history">
          {filtered.length === 0 && <p className="px-3 py-6 text-sm text-fg-3">No conversations found.</p>}
          {Object.entries(groups).map(([label, items]) => (
            <div key={label} className="mt-5">
              <p className="px-2.5 mb-1.5 t-label text-fg-4">{label}</p>
              <ul className="space-y-0.5">
                {items.map((c) => (
                  <li key={c.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => select(c.id)}
                      aria-current={c.id === activeId ? "page" : undefined}
                      className={`flex items-center w-full h-8 pl-2.5 pr-9 rounded-md text-left text-[0.8125rem] transition-colors ${
                        c.id === activeId ? "bg-raised text-fg" : "text-fg-2 hover:bg-raised/60 hover:text-fg"
                      }`}
                    >
                      <span className="truncate">{c.title}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(c.id)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-md text-fg-4 transition-opacity hover:text-danger lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                      aria-label={`Delete conversation: ${c.title}`}
                    >
                      <Icon name="trash" size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-line">
          <Link to="/pricing" className="block p-3 mb-3 rounded-md border border-line transition-colors hover:border-line-strong">
            <span className="flex items-center justify-between mb-2 text-xs">
              <span className="text-fg-2">Free plan</span>
              <span className="font-mono text-fg-3">28 / 40</span>
            </span>
            <span className="block h-1 mb-2 rounded-full bg-line">
              <span className="block h-full w-[70%] rounded-full bg-fg-2" />
            </span>
            <span className="block text-xs text-fg-3">
              Research questions this month. <span className="text-fg underline underline-offset-2 decoration-line-strong">Upgrade</span>
            </span>
          </Link>
          <div className="flex items-center gap-2.5">
            <Avatar name="Demo User" size={32} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Demo User</p>
              <p className="text-xs text-fg-3 truncate">demo@aster.app</p>
            </div>
            <button
              type="button"
              onClick={() => {
                toast("Signed out of the demo", { tone: "info" });
                navigate("/login");
              }}
              className={iconBtn}
              aria-label="Sign out"
              title="Sign out"
            >
              <Icon name="logout" size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex flex-col flex-1 min-w-0">
        <header className="flex items-center gap-2 h-14 px-3 border-b border-line md:px-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className={`${iconBtn} lg:hidden`}
            aria-label="Open sidebar"
            aria-controls="chat-sidebar"
            aria-expanded={sidebarOpen}
          >
            <Icon name="menu" size={18} />
          </button>
          <ModelPicker
            value={model}
            onChange={(m) => {
              setModel(m);
              toast(`Switched to ${chatModels.find((x) => x.id === m).label}`, { tone: "info" });
            }}
          />
          <p className="hidden md:block ml-2 text-[0.8125rem] text-fg-3 truncate">{current.title}</p>
          <div className="flex items-center gap-0.5 ml-auto">
            <button type="button" onClick={palette.open} className={iconBtn} aria-label="Search pages" title="Search (Ctrl/Cmd K)">
              <Icon name="search" size={16} />
            </button>
            <button type="button" onClick={share} className={iconBtn} aria-label="Share conversation" title="Share">
              <Icon name="link" size={16} />
            </button>
            <button type="button" onClick={newChat} className={`${iconBtn} lg:hidden`} aria-label="New chat">
              <Icon name="plus" size={16} />
            </button>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 h-8 ml-2 px-3 rounded-md border border-line text-[0.8125rem] text-fg-2 transition-colors hover:text-fg hover:border-line-strong"
            >
              Back to site
            </Link>
          </div>
        </header>

        <ChatPanel key={panelKey} conversation={current} model={model} onChange={handleChange} />
      </main>
    </div>
  );
};

export default ChatApp;
