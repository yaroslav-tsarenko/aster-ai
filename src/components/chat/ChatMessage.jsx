import { useState } from "react";
import { brainwaveWhiteSymbol } from "../../assets";
import Icon from "../ui/Icon";
import Markdown from "./Markdown";
import TypingIndicator from "./TypingIndicator";
import useToast from "../../hooks/useToast";
import { copyToClipboard } from "../../lib/utils";

const ActionButton = ({ label, onClick, active, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    aria-pressed={active}
    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-n-6 hover:text-n-1 ${
      active ? "text-color-1" : "text-n-4"
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
      toast("Couldn't access the clipboard", { tone: "error" });
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end animate-pop-in">
        <div className="max-w-[85%] px-5 py-3 rounded-2xl rounded-br-md bg-n-6 text-n-1 body-2 !font-normal whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    );
  }

  const streaming = message.status === "streaming";
  const done = message.status === "done" || message.status === "stopped";

  return (
    <div className="flex gap-3 md:gap-4 animate-pop-in">
      <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl bg-color-1">
        <img src={brainwaveWhiteSymbol} width={22} height={22} alt="" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`${compact ? "text-sm leading-6" : "body-2 !font-normal"} text-n-2 break-words ${
            streaming ? "stream-caret" : ""
          }`}
          aria-live={streaming ? "polite" : undefined}
        >
          {message.status === "typing" ? (
            <TypingIndicator />
          ) : (
            <Markdown text={message.content} />
          )}
        </div>

        {done && (
          <div className="flex items-center gap-1 mt-2 -ml-1.5">
            <ActionButton label={copied ? "Copied" : "Copy response"} onClick={handleCopy}>
              <Icon name={copied ? "check" : "copy"} size={16} />
            </ActionButton>
            {onRegenerate && (
              <ActionButton label="Regenerate response" onClick={() => onRegenerate(message.id)}>
                <Icon name="refresh" size={16} />
              </ActionButton>
            )}
            {onFeedback && (
              <>
                <ActionButton
                  label="Good response"
                  active={message.feedback === "up"}
                  onClick={() => {
                    onFeedback(message.id, message.feedback === "up" ? null : "up");
                    if (message.feedback !== "up") toast("Thanks for the feedback!", { tone: "info" });
                  }}
                >
                  <Icon name="thumbUp" size={16} />
                </ActionButton>
                <ActionButton
                  label="Bad response"
                  active={message.feedback === "down"}
                  onClick={() => {
                    onFeedback(message.id, message.feedback === "down" ? null : "down");
                    if (message.feedback !== "down") toast("Thanks, we'll use this to improve.", { tone: "info" });
                  }}
                >
                  <Icon name="thumbDown" size={16} />
                </ActionButton>
              </>
            )}
            {message.variant > 0 && (
              <span className="ml-2 font-code text-[0.6875rem] uppercase tracking-wider text-n-4">
                Version {message.variant + 1}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
