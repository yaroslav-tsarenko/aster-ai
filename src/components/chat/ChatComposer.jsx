import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import Icon from "../ui/Icon";
import useToast from "../../hooks/useToast";

/**
 * Message input with auto-resize, Enter to send (Shift+Enter for new line),
 * stop button while streaming and mock attach / voice actions.
 */
const ChatComposer = forwardRef(function ChatComposer(
  { onSend, onStop, busy, placeholder, showTools = true, autoFocus = false },
  ref
) {
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [recording, setRecording] = useState(false);
  const areaRef = useRef(null);
  const inputId = useId();

  useImperativeHandle(ref, () => ({
    focus: () => areaRef.current?.focus(),
    setValue: (v) => setValue(v),
  }));

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    if (!value) {
      el.style.height = "";
      return;
    }
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [value]);

  useEffect(() => {
    if (!recording) return;
    const t = setTimeout(() => {
      setRecording(false);
      setValue((v) => (v ? `${v} ` : "") + "Summarise this week's Slack threads");
      toast("Voice note transcribed", { tone: "info" });
      areaRef.current?.focus();
    }, 2200);
    return () => clearTimeout(t);
  }, [recording, toast]);

  const submit = (e) => {
    e?.preventDefault();
    if (busy || !value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="relative flex items-end gap-2 p-2 pl-3 bg-n-7 border border-n-1/10 rounded-[1.25rem] transition-colors focus-within:border-color-1/60"
    >
      {showTools && (
        <button
          type="button"
          onClick={() => toast("File uploads are disabled in this demo", { tone: "info" })}
          className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl text-n-4 transition-colors hover:text-n-1 hover:bg-n-6"
          aria-label="Attach a file"
          title="Attach a file"
        >
          <Icon name="paperclip" size={20} />
        </button>
      )}
      <label className="sr-only" htmlFor={inputId}>
        Message
      </label>
      <textarea
        id={inputId}
        ref={areaRef}
        rows={1}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) submit(e);
        }}
        placeholder={recording ? "Listening…" : placeholder || "Ask Brainwave anything…"}
        className="flex-1 min-w-0 py-2.5 bg-transparent resize-none outline-none focus-visible:outline-none text-n-1 placeholder:text-n-4 text-sm md:text-base leading-6 scrollbar-thin"
      />
      {showTools && (
        <button
          type="button"
          onClick={() => setRecording((r) => !r)}
          className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-xl transition-colors ${
            recording ? "bg-color-3 text-n-1 animate-pulse-ring" : "text-n-4 hover:text-n-1 hover:bg-n-6"
          }`}
          aria-label={recording ? "Stop voice input" : "Start voice input"}
          aria-pressed={recording}
          title="Voice input"
        >
          <Icon name="mic" size={20} />
        </button>
      )}
      {busy ? (
        <button
          type="button"
          onClick={onStop}
          className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-n-1 text-n-8 transition-transform hover:scale-105"
          aria-label="Stop generating"
          title="Stop generating"
        >
          <Icon name="stop" size={18} />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!value.trim()}
          className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-color-1 text-n-1 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          aria-label="Send message"
          title="Send message"
        >
          <Icon name="arrowUp" size={20} strokeWidth={2.25} />
        </button>
      )}
    </form>
  );
});

export default ChatComposer;
