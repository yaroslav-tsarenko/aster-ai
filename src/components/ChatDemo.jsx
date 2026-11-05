import { Link } from "react-router-dom";
import useMockChat from "../hooks/useMockChat";
import ChatWindow from "./chat/ChatWindow";
import { suggestedPrompts } from "../constants";
import { Gradient } from "./design/Hero";
import Icon from "./ui/Icon";

/**
 * Self-contained interactive chat demo framed like the hero "device" window.
 */
const ChatDemo = ({ prompts = suggestedPrompts, className = "", initialMessages, title = "Brainwave chat" }) => {
  const chat = useMockChat({ initialMessages });

  return (
    <div className={`relative ${className}`}>
      <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
        <div className="relative bg-n-8 rounded-[1rem] overflow-hidden">
          <div className="flex items-center gap-2 h-10 px-4 bg-n-10/60 border-b border-n-1/5">
            <span className="w-2.5 h-2.5 rounded-full bg-color-3" />
            <span className="w-2.5 h-2.5 rounded-full bg-color-2" />
            <span className="w-2.5 h-2.5 rounded-full bg-color-4" />
            <span className="ml-3 font-code text-xs text-n-4 truncate">{title}</span>
            <span className="ml-auto flex items-center gap-1.5 font-code text-[0.6875rem] uppercase tracking-wider text-n-4">
              <span className="w-1.5 h-1.5 rounded-full bg-color-4 animate-pulse" />
              Live demo
            </span>
          </div>

          <ChatWindow
            chat={chat}
            prompts={prompts}
            compact
            className="h-[30rem] md:h-[34rem] p-4 md:p-6"
            listClassName="pr-1"
            footer={
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs text-n-4">
                <span>Mock responses, no data leaves your browser.</span>
                <div className="flex items-center gap-4">
                  {chat.messages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => chat.reset()}
                      className="inline-flex items-center gap-1 transition-colors hover:text-n-1"
                    >
                      <Icon name="refresh" size={14} /> Clear
                    </button>
                  )}
                  <Link to="/app" className="inline-flex items-center gap-1 text-color-1 transition-colors hover:text-n-1">
                    Open full app <Icon name="arrowRight" size={14} />
                  </Link>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <Gradient />
    </div>
  );
};

export default ChatDemo;
