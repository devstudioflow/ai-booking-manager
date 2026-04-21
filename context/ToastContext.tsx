'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, 'id'>) => void;
  success: (title: string, description?: string) => void;
  error:   (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info:    (title: string, description?: string) => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

// ── Single Toast component ────────────────────────────────────────────────────

const variantStyles: Record<ToastVariant, { wrapper: string; icon: React.ReactNode }> = {
  success: {
    wrapper: 'border-emerald-200 bg-white',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
  },
  error: {
    wrapper: 'border-red-200 bg-white',
    icon: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
  },
  warning: {
    wrapper: 'border-amber-200 bg-white',
    icon: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
  },
  info: {
    wrapper: 'border-indigo-200 bg-white',
    icon: <Info className="w-5 h-5 text-indigo-500 flex-shrink-0" />,
  },
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const styles = variantStyles[toast.variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full max-w-sm rounded-xl border p-4 shadow-lg shadow-black/5',
        'animate-slide-up',
        styles.wrapper
      )}
      role="alert"
    >
      {styles.icon}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 leading-snug">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 p-0.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-zinc-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Provider + Toaster ────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: Omit<Toast, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => {
        // Keep max 4 toasts
        const next = [...prev.slice(-3), { ...opts, id }];
        return next;
      });
      const timer = setTimeout(() => dismiss(id), 4500);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  const success = useCallback((title: string, description?: string) => toast({ variant: 'success', title, description }), [toast]);
  const error   = useCallback((title: string, description?: string) => toast({ variant: 'error',   title, description }), [toast]);
  const warning = useCallback((title: string, description?: string) => toast({ variant: 'warning', title, description }), [toast]);
  const info    = useCallback((title: string, description?: string) => toast({ variant: 'info',    title, description }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}

      {/* Toaster — fixed bottom-right */}
      <div
        aria-live="assertive"
        className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto w-full">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
