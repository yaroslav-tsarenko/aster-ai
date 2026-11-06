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
      setValue((v) => (v ? `${v} ` : "") + "Summarise the evidence on four-day work weeks");
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
      className="relative flex items-end gap-1 p-1.5 pl-2 bg-surface border border-line-strong rounded-lg transition-colors focus-within:border-fg-4"
    >
      {showTools && (
        <button
          type="button"
          onClick={() => toast("File uploads are disabled in this demo", { tone: "info" })}
          className="flex items-center justify-center w-9 h-9 shrink-0 rounded-md text-fg-3 transition-colors hover:text-fg hover:bg-raised"
          aria-label="Attach a file"
          title="Attach a file"
        >
          <Icon name="paperclip" size={17} />
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
        placeholder={recording ? "Listening" : placeholder || "Ask about your sources, or start a draft"}
        className="flex-1 min-w-0 py-1.5 px-1 bg-transparent resize-none outline-none focus-visible:outline-none text-fg placeholder:text-fg-4 text-[0.9375rem] leading-6 scrollbar-thin"
      />
      {showTools && (
        <button
          type="button"
          onClick={() => setRecording((r) => !r)}
          className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-md transition-colors ${
            recording ? "bg-danger text-bg animate-rec" : "text-fg-3 hover:text-fg hover:bg-raised"
          }`}
          aria-label={recording ? "Stop voice input" : "Start voice input"}
          aria-pressed={recording}
          title="Voice input"
        >
          <Icon name="mic" size={17} />
        </button>
      )}
      {busy ? (
        <button
          type="button"
          onClick={onStop}
          className="flex items-center justify-center w-9 h-9 shrink-0 rounded-md bg-fg text-bg transition-colors hover:bg-white"
          aria-label="Stop generating"
          title="Stop generating"
        >
          <Icon name="stop" size={13} strokeWidth={2.5} className="fill-current" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!value.trim()}
          className="flex items-center justify-center w-9 h-9 shrink-0 rounded-md bg-accent text-accent-ink transition-colors hover:bg-accent-hover disabled:bg-raised disabled:text-fg-4"
          aria-label="Send message"
          title="Send message"
        >
          <Icon name="arrowUp" size={17} strokeWidth={2.25} />
        </button>
      )}
    </form>
  );
});

export default ChatComposer;
