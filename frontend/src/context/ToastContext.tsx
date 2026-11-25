import { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";

type Kind = "ok" | "error";
const ToastContext = createContext<(msg: string, kind?: Kind) => void>(() => undefined);

/** Toast di bawah tengah layar; error berlatar merah bata. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ msg: string; kind: Kind } | null>(null);
  const timer = useRef<number>();

  const show = useCallback((msg: string, kind: Kind = "ok") => {
    setToast({ msg, kind });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-card ${
            toast.kind === "error" ? "bg-miss text-white" : "bg-brand text-brand-ink"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
