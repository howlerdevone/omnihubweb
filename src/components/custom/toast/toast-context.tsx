'use client';
import { createContext, useContext, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: Toast | null;
  showToast: (message: string, type: ToastType, duration?: number) => void;
  dismissToast: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: ToastType, duration = 3000) => {
    // Dismiss any existing toast
    setToast(null);

    // Show new toast
    const id = Date.now().toString();
    setToast({ id, message, type, duration });

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        setToast((prev) => (prev?.id === id ? null : prev));
      }, duration);
    }
  };

  const dismissToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to trigger toast notifications
 *
 * @example
 * const { showToast } = useToast();
 * showToast('Success!', 'success');
 * showToast('Error occurred', 'error', 5000);
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
