'use client';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useContext } from 'react';
import { ToastContext } from './toast-context';

/**
 * Toast notification display component
 * Shows a single toast at the top-right corner of the screen
 * Does not stack - only one toast visible at a time
 */
export function ToastDisplay() {
  const context = useContext(ToastContext);

  if (!context || !context.toast) {
    return null;
  }

  const { toast, dismissToast } = context;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-900',
          icon: 'text-green-600',
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-900',
          icon: 'text-red-600',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-900',
          icon: 'text-yellow-600',
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          icon: 'text-blue-600',
        };
    }
  };

  const colors = getColors();

  if (!colors) return null;

  return (
    <div className="fixed right-4 top-4 z-50 max-w-sm">
      <div
        className={`${colors.bg} ${colors.border} ${colors.text} flex items-start gap-3 rounded-lg border p-4 shadow-lg`}
      >
        <div className={colors.icon}>{getIcon()}</div>
        <div className="flex-1">
          <p className="font-sans text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          className={`${colors.icon} flex-shrink-0 transition-opacity hover:opacity-70`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
