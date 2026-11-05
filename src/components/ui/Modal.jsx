import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Icon from "./Icon";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const Modal = ({ open, onClose, title, children, className = "max-w-lg", labelledBy, position = "center", hideClose = false }) => {
  const panelRef = useRef(null);
  const lastFocused = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    disablePageScroll(panelRef.current);

    const panel = panelRef.current;
    const first = panel?.querySelector("[data-autofocus]") || panel?.querySelector(FOCUSABLE);
    (first || panel)?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onCloseRef.current?.();
      if (e.key === "Tab" && panel) {
        const items = [...panel.querySelectorAll(FOCUSABLE)];
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      enablePageScroll(panel);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className={`fixed inset-0 z-[60] flex justify-center p-4 ${position === "top" ? "items-start pt-[12vh]" : "items-end sm:items-center"}`}>
      <div
        className="absolute inset-0 bg-n-8/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : title}
        tabIndex={-1}
        className={`relative w-full ${className} max-h-[90vh] overflow-y-auto scrollbar-thin p-0.25 rounded-3xl bg-conic-gradient animate-pop-in`}
      >
        <div className="relative bg-n-8 rounded-[1.4375rem]">
          {!hideClose && <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-n-7 text-n-3 transition-colors hover:text-n-1 hover:bg-n-6"
            aria-label="Close dialog"
          >
            <Icon name="close" size={18} />
          </button>}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
