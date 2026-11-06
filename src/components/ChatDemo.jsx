import { Link } from "react-router-dom";
import useMockChat from "../hooks/useMockChat";
import ChatWindow from "./chat/ChatWindow";
import AppFrame from "./product/AppFrame";
import { ModelPill } from "./product/Mocks";
import { suggestedPrompts } from "../constants";
import Icon from "./ui/Icon";

/**
 * Self-contained interactive chat demo inside an application frame.
 */
const ChatDemo = ({ prompts = suggestedPrompts, className = "", initialMessages, title = "aster.app / Demo project" }) => {
  const chat = useMockChat({ initialMessages });

  return (
    <AppFrame title={title} meta="Demo, runs in your browser" className={className}>
      <div className="flex items-center gap-3 h-11 px-4 border-b border-line">
        <ModelPill />
        <span className="hidden sm:block text-xs text-fg-3">6 sources attached</span>
        {chat.messages.length > 0 && (
          <button
            type="button"
            onClick={() => chat.reset()}
            className="ml-auto inline-flex items-center gap-1.5 h-7 px-2 rounded-md text-xs text-fg-3 transition-colors hover:text-fg hover:bg-surface"
          >
            <Icon name="refresh" size={13} /> Clear
          </button>
        )}
      </div>
      <ChatWindow
        chat={chat}
        prompts={prompts}
        compact
        className="h-[30rem] md:h-[32rem] p-4 md:p-6"
        listClassName="pr-1"
        footer={
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs text-fg-3">
            <span>Prepared answers. Nothing you type leaves your browser.</span>
            <Link to="/app" className="inline-flex items-center gap-1 text-fg-2 transition-colors hover:text-fg">
              Open the full app <Icon name="arrowRight" size={13} />
            </Link>
          </div>
        }
      />
    </AppFrame>
  );
};

export default ChatDemo;
