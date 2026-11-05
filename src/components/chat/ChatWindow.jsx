import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatComposer from "./ChatComposer";
import Icon from "../ui/Icon";
import { brainwaveSymbol } from "../../assets";

/**
 * Message list + composer. Purely presentational; pass a `chat` object from useMockChat.
 */
const ChatWindow = ({
  chat,
  prompts = [],
  className = "",
  listClassName = "",
  emptyTitle = "How can I help you today?",
  emptyText = "Type a message or pick one of the suggestions below.",
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
            <div className="w-16 h-16 p-0.5 mb-5 rounded-2xl bg-conic-gradient">
              <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-[0.9rem]">
                <img src={brainwaveSymbol} width={32} height={32} alt="" />
              </div>
            </div>
            <h3 className="h6 mb-2">{emptyTitle}</h3>
            <p className="body-2 text-n-4 max-w-sm">{emptyText}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
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
                className="group inline-flex items-center gap-2 shrink-0 px-3.5 py-2 rounded-full border border-n-6 bg-n-8/60 text-xs text-n-3 transition-colors hover:border-color-1 hover:text-n-1 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Icon name="sparkle" size={14} className="text-color-1" />
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
