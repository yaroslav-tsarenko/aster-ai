import { useCallback, useMemo, useRef, useState } from "react";
import { ToastContext } from "../../context/toast-context";
import Icon from "./Icon";

const tones = {
  success: { icon: "check", className: "text-accent" },
  error: { icon: "warning", className: "text-danger" },
  info: { icon: "info", className: "text-fg-2" },
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, { tone = "success", title, duration = 3800 } = {}) => {
      const id = ++idRef.current;
      setToasts((list) => [...list.slice(-3), { id, message, tone, title }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed z-[70] bottom-4 left-4 right-4 flex flex-col items-center gap-3 pointer-events-none sm:left-auto sm:right-6 sm:bottom-6 sm:items-end"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => {
          const tone = tones[t.tone] || tones.info;
          return (
            <div
              key={t.id}
              role="status"
              className="pointer-events-auto animate-toast-in flex items-start gap-3 w-full max-w-sm p-3.5 bg-raised border border-line-strong rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
            >
              <Icon name={tone.icon} size={16} className={`mt-0.5 ${tone.className}`} />
              <div className="flex-1 min-w-0">
                {t.title && <p className="text-sm font-medium mb-0.5">{t.title}</p>}
                <p className="text-sm text-fg-2">{t.message}</p>
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="p-0.5 rounded text-fg-3 transition-colors hover:text-fg"
                aria-label="Dismiss notification"
              >
                <Icon name="close" size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
