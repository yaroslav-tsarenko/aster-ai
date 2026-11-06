import { useState } from "react";
import Icon from "../ui/Icon";
import Markdown from "./Markdown";
import TypingIndicator from "./TypingIndicator";
import useToast from "../../hooks/useToast";
import { copyToClipboard } from "../../lib/utils";
import { LogoMark } from "../brand/Logo";

const ActionButton = ({ label, onClick, active, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    aria-pressed={active}
    className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors hover:bg-raised hover:text-fg ${
      active ? "text-accent" : "text-fg-3"
    }`}
  >
    {children}
  </button>
);

const ChatMessage = ({ message, onRegenerate, onFeedback, compact }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    const ok = await copyToClipboard(message.content);
    if (ok) {
      setCopied(true);
      toast("Response copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } else {
      toast("Could not access the clipboard", { tone: "error" });
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end animate-pop-in">
        <div className="max-w-[85%] px-4 py-2.5 rounded-lg bg-raised border border-line text-fg text-[0.9375rem] leading-6 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    );
  }

  const streaming = message.status === "streaming";
  const done = message.status === "done" || message.status === "stopped";

  return (
    <div className="flex gap-3 animate-pop-in">
      <LogoMark size={24} className="mt-0.5" />
      <div className="flex-1 min-w-0">
        <div
          className={`${compact ? "text-sm leading-6" : "text-[0.9375rem] leading-7"} text-fg-2 break-words ${
            streaming ? "stream-caret" : ""
          }`}
          aria-live={streaming ? "polite" : undefined}
        >
          {message.status === "typing" ? <TypingIndicator /> : <Markdown text={message.content} />}
        </div>

        {done && (
          <div className="flex items-center gap-0.5 mt-2 -ml-1.5">
            <ActionButton label={copied ? "Copied" : "Copy response"} onClick={handleCopy}>
              <Icon name={copied ? "check" : "copy"} size={14} />
            </ActionButton>
            {onRegenerate && (
              <ActionButton label="Regenerate response" onClick={() => onRegenerate(message.id)}>
                <Icon name="refresh" size={14} />
              </ActionButton>
            )}
            {onFeedback && (
              <>
                <ActionButton
                  label="Good response"
                  active={message.feedback === "up"}
                  onClick={() => {
                    onFeedback(message.id, message.feedback === "up" ? null : "up");
                    if (message.feedback !== "up") toast("Thanks for the feedback", { tone: "info" });
                  }}
                >
                  <Icon name="thumbUp" size={14} />
                </ActionButton>
                <ActionButton
                  label="Bad response"
                  active={message.feedback === "down"}
                  onClick={() => {
                    onFeedback(message.id, message.feedback === "down" ? null : "down");
                    if (message.feedback !== "down") toast("Thanks, this helps us improve answers", { tone: "info" });
                  }}
                >
                  <Icon name="thumbDown" size={14} />
                </ActionButton>
              </>
            )}
            {message.variant > 0 && (
              <span className="ml-2 font-mono text-2xs text-fg-3">v{message.variant + 1}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
