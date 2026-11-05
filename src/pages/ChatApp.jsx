import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { brainwave, brainwaveSymbol, notification1 } from "../assets";
import { chatModels, suggestedPrompts } from "../constants";
import ChatWindow from "../components/chat/ChatWindow";
import Icon from "../components/ui/Icon";
import useMockChat from "../hooks/useMockChat";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import useCommandPalette from "../hooks/useCommandPalette";
import { makeTitle, uid } from "../lib/mockAi";
import { copyToClipboard } from "../lib/utils";

const STORAGE_KEY = "brainwave-demo-chats-v1";
const DAY = 86400000;

const seed = () => {
  const now = Date.now();
  const msg = (role, content, t) => ({ id: uid(), role, content, status: "done", createdAt: t, prompt: role === "assistant" ? "" : undefined });
  return [
    {
      id: uid(),
      title: "Launch plan for v2.4",
      updatedAt: now - 3600000,
      messages: [
        msg("user", "Help me outline a launch plan for our v2.4 release.", now - 3700000),
        msg("assistant", "Here's a lightweight launch plan:\n\n1. **T-7 days**: finalise release notes and screenshots\n2. **T-3 days**: brief support and prepare FAQ\n3. **Launch day**: blog post, newsletter and social thread\n4. **T+7 days**: collect feedback and share metrics\n\nWant me to draft the release notes next?", now - 3600000),
      ],
    },
    {
      id: uid(),
      title: "Explain React Server Components",
      updatedAt: now - DAY * 1.2,
      messages: [
        msg("user", "Explain React Server Components in two sentences.", now - DAY * 1.2),
        msg("assistant", "React Server Components render on the server and send a lightweight description of the UI to the browser, so they can fetch data directly without shipping their code to the client. You mix them with regular client components for interactivity.", now - DAY * 1.2),
      ],
    },
    {
      id: uid(),
      title: "Birthday message for Sam",
      updatedAt: now - DAY * 4,
      messages: [
        msg("user", "Write a short, funny birthday message for my friend Sam who loves coffee.", now - DAY * 4),
        msg("assistant", "Happy birthday, Sam! ☕ May your day be as strong as your espresso and your year as smooth as a perfect flat white. Here's to another trip around the sun, fuelled entirely by caffeine.", now - DAY * 4),
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
        className="flex items-center gap-2 h-10 px-3 rounded-xl text-sm font-semibold transition-colors hover:bg-n-7"
      >
        {current.label}
        <Icon name="chevronDown" size={16} className={`text-n-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" aria-label="Choose a model" className="absolute left-0 top-12 z-30 w-64 p-1.5 bg-n-7 border border-n-6 rounded-2xl shadow-2xl animate-pop-in">
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
                className="flex items-start gap-3 w-full p-3 rounded-xl text-left transition-colors hover:bg-n-6"
              >
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{m.label}</span>
                  <span className="block text-xs text-n-4">{m.description}</span>
                </span>
                {m.id === value && <Icon name="check" size={16} className="mt-0.5 text-color-1" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ChatPanel = ({ conversation, model, onChange }) => {
  const chat = useMockChat({ initialMessages: conversation.messages, speed: model === "brainwave-turbo" ? 2.5 : 1 });
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
      className="flex-1 w-full max-w-3xl mx-auto px-4 pb-4 md:px-6 md:pb-6"
      listClassName="pt-6 pr-1"
      inputPlaceholder={`Message ${chatModels.find((m) => m.id === model).label}…`}
      footer={<p className="mt-2 text-center text-[0.6875rem] text-n-4">Demo assistant with canned responses. Brainwave can make mistakes.</p>}
      emptyContent={(send) => (
        <div className="flex flex-col items-center justify-center min-h-full py-10 text-center">
          <div className="w-16 h-16 p-0.5 mb-6 rounded-2xl bg-conic-gradient">
            <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-[0.9rem]">
              <img src={brainwaveSymbol} width={32} height={32} alt="" />
            </div>
          </div>
          <h1 className="h5 mb-2 md:h4">How can I help you today?</h1>
          <p className="body-2 mb-10 text-n-4">Pick a suggestion or write your own message.</p>
          <div className="grid w-full gap-3 sm:grid-cols-2">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                className="group p-4 rounded-2xl border border-n-6 text-left text-sm text-n-3 transition-colors hover:border-color-1 hover:text-n-1 hover:bg-n-7/50"
              >
                <Icon name="sparkle" size={16} className="mb-2 text-color-1" />
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    />
  );
};

/* ------------------------------------------------------------------ */

const ChatApp = () => {
  usePageMeta("Chat", "Chat with Brainwave, the AI assistant.");
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
    toast(ok ? "Share link copied (demo)" : "Couldn't copy link", { tone: ok ? "success" : "error" });
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-n-8">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-n-8/70 backdrop-blur-sm lg:hidden ${sidebarOpen ? "block animate-fade-in" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="chat-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[18rem] bg-n-7 border-r border-n-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Conversations"
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/" aria-label="Brainwave home" className="block w-[9.5rem]">
            <img src={brainwave} width={152} height={32} alt="Brainwave" />
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-n-4 transition-colors hover:text-n-1 hover:bg-n-6 lg:hidden"
            aria-label="Close sidebar"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="px-4">
          <button
            type="button"
            onClick={newChat}
            className="flex items-center justify-center gap-2 w-full h-11 mb-3 rounded-xl bg-n-1 text-n-8 button transition-colors hover:bg-color-1 hover:text-n-1"
          >
            <Icon name="plus" size={16} strokeWidth={2.5} /> New chat
          </button>
          <div className="relative mb-2">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-n-4" />
            <label htmlFor="chat-search" className="sr-only">Search conversations</label>
            <input
              id="chat-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats"
              className="w-full h-10 pl-9 pr-3 bg-n-8 border border-n-6 rounded-xl text-sm outline-none transition-colors focus:border-color-1 placeholder:text-n-4"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4" aria-label="Chat history">
          {filtered.length === 0 && <p className="px-3 py-6 text-sm text-n-4">No conversations found.</p>}
          {Object.entries(groups).map(([label, items]) => (
            <div key={label} className="mt-4">
              <p className="px-3 mb-2 tagline text-n-4">{label}</p>
              <ul>
                {items.map((c) => (
                  <li key={c.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => select(c.id)}
                      aria-current={c.id === activeId ? "page" : undefined}
                      className={`flex items-center gap-3 w-full pl-3 pr-10 py-2.5 rounded-xl text-left text-sm transition-colors ${
                        c.id === activeId ? "bg-n-6 text-n-1" : "text-n-3 hover:bg-n-6/60 hover:text-n-1"
                      }`}
                    >
                      <Icon name="chat" size={16} className="text-n-4" />
                      <span className="truncate">{c.title}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(c.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg text-n-4 opacity-100 transition-opacity hover:text-color-3 hover:bg-n-7 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100"
                      aria-label={`Delete conversation: ${c.title}`}
                    >
                      <Icon name="trash" size={15} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-n-6">
          <Link to="/pricing" className="block p-0.25 mb-4 rounded-2xl bg-conic-gradient">
            <span className="block p-4 bg-n-7 rounded-[0.9375rem]">
              <span className="flex items-center gap-2 mb-1 text-sm font-semibold">
                <Icon name="sparkle" size={16} className="text-color-2" /> Upgrade to Premium
              </span>
              <span className="block text-xs text-n-4">Unlimited messages & image generation.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <img src={notification1} width={36} height={36} alt="" className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Demo User</p>
              <p className="text-xs text-n-4 truncate">Basic plan</p>
            </div>
            <button
              type="button"
              onClick={() => {
                toast("Signed out of the demo", { tone: "info" });
                navigate("/login");
              }}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-n-4 transition-colors hover:text-n-1 hover:bg-n-6"
              aria-label="Sign out"
              title="Sign out"
            >
              <Icon name="logout" size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-col flex-1 min-w-0">
        <header className="flex items-center gap-2 h-16 px-3 border-b border-n-6 md:px-5">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-n-3 transition-colors hover:text-n-1 hover:bg-n-7 lg:hidden"
            aria-label="Open sidebar"
            aria-controls="chat-sidebar"
            aria-expanded={sidebarOpen}
          >
            <Icon name="menu" size={20} />
          </button>
          <ModelPicker value={model} onChange={(m) => {
            setModel(m);
            toast(`Switched to ${chatModels.find((x) => x.id === m).label}`, { tone: "info" });
          }} />
          <p className="hidden md:block ml-2 text-sm text-n-4 truncate">{current.title}</p>
          <div className="flex items-center gap-1 ml-auto">
            <button type="button" onClick={palette.open} className="flex items-center justify-center w-10 h-10 rounded-xl text-n-3 transition-colors hover:text-n-1 hover:bg-n-7" aria-label="Search pages" title="Search (Ctrl/⌘ K)">
              <Icon name="search" size={18} />
            </button>
            <button type="button" onClick={share} className="flex items-center justify-center w-10 h-10 rounded-xl text-n-3 transition-colors hover:text-n-1 hover:bg-n-7" aria-label="Share conversation" title="Share">
              <Icon name="link" size={18} />
            </button>
            <button type="button" onClick={newChat} className="flex items-center justify-center w-10 h-10 rounded-xl text-n-3 transition-colors hover:text-n-1 hover:bg-n-7 lg:hidden" aria-label="New chat">
              <Icon name="plus" size={18} />
            </button>
            <Link to="/" className="hidden sm:inline-flex items-center gap-2 h-10 ml-2 px-4 rounded-xl border border-n-6 text-xs button text-n-3 transition-colors hover:text-n-1 hover:border-n-4">
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
