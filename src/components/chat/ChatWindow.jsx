import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatComposer from "./ChatComposer";
import Icon from "../ui/Icon";
import { LogoMark } from "../brand/Logo";

/**
 * Message list + composer. Purely presentational; pass a `chat` object from useMockChat.
 */
const ChatWindow = ({
  chat,
  prompts = [],
  className = "",
  listClassName = "",
  emptyTitle = "Ask about your sources",
  emptyText = "Type a question or pick a suggestion. Answers in this demo are prepared in advance.",
  compact = false,
  showTools = true,
  composerRef,
  footer,
  emptyContent,
  inputPlaceholder,
}) => {
  const { messages, send, stop, regenerate, setFeedback, isBusy } = chat;
  const listRef = useRef(null);
  const stickRef = useRef(true);

  useEffect(() => {
    const el = listRef.current;
    if (el && stickRef.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const handleSend = (text) => {
    stickRef.current = true;
    send(text);
  };

  return (
    <div className={`flex flex-col min-h-0 ${className}`}>
      <div
        ref={listRef}
        onScroll={onScroll}
        className={`flex-1 min-h-0 overflow-y-auto scrollbar-thin ${listClassName}`}
      >
        {messages.length === 0 && emptyContent ? (
          emptyContent(handleSend)
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <LogoMark size={32} className="mb-5" />
            <h3 className="t-h4 mb-2">{emptyTitle}</h3>
            <p className="t-small text-fg-3 max-w-sm">{emptyText}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-7">
            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                message={m}
                compact={compact}
                onRegenerate={m.role === "assistant" ? regenerate : undefined}
                onFeedback={m.role === "assistant" ? setFeedback : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pt-4">
        {prompts.length > 0 && (
          <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                disabled={isBusy}
                onClick={() => handleSend(p)}
                className="group inline-flex items-center gap-1.5 shrink-0 h-8 px-3 rounded-md border border-line bg-bg text-xs text-fg-2 transition-colors hover:border-line-strong hover:text-fg disabled:opacity-50 disabled:pointer-events-none"
              >
                <Icon name="arrowUpRight" size={13} className="text-fg-4 group-hover:text-accent" />
                {p}
              </button>
            ))}
          </div>
        )}
        <ChatComposer
          ref={composerRef}
          onSend={handleSend}
          onStop={stop}
          busy={isBusy}
          showTools={showTools}
          placeholder={inputPlaceholder}
        />
        {footer}
      </div>
    </div>
  );
};

export default ChatWindow;
