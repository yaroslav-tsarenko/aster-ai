import { useCallback, useMemo, useRef, useState } from "react";
import { ToastContext } from "../../context/toast-context";
import Icon from "./Icon";

const tones = {
  success: { icon: "check", className: "text-color-4" },
  error: { icon: "warning", className: "text-color-3" },
  info: { icon: "info", className: "text-color-1" },
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
              className="pointer-events-auto animate-toast-in w-full max-w-sm p-0.25 rounded-2xl bg-conic-gradient shadow-2xl"
            >
              <div className="flex items-start gap-3 p-4 bg-n-8 rounded-[0.9375rem]">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-n-7 ${tone.className}`}>
                  <Icon name={tone.icon} size={18} />
                </span>
                <div className="flex-1 min-w-0 pt-0.5">
                  {t.title && <p className="font-semibold text-sm mb-0.5">{t.title}</p>}
                  <p className="text-sm text-n-3">{t.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  className="p-1 text-n-4 transition-colors hover:text-n-1"
                  aria-label="Dismiss notification"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
