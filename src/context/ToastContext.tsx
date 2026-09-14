/**
 * EDUCHOICE-AI — Toast Notification System
 * Accessible, animated, auto-dismissing toast notifications with sound cues
 */

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SoundEngine } from '../utils/soundEffects';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number; // Duration in ms, 0 for persistent
  sound?: boolean; // Whether to play audio cue (default true)
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastItem extends ToastOptions {
  id: string;
  type: ToastType;
  createdAt: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
  clearAll: () => void;
  // Convenience helpers
  success: (message: string, title?: string, options?: Partial<ToastOptions>) => string;
  error: (message: string, title?: string, options?: Partial<ToastOptions>) => string;
  warning: (message: string, title?: string, options?: Partial<ToastOptions>) => string;
  info: (message: string, title?: string, options?: Partial<ToastOptions>) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id || `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const type: ToastType = options.type || 'info';
      const duration = options.duration !== undefined ? options.duration : 4000;
      const sound = options.sound !== false;

      const newToast: ToastItem = {
        ...options,
        id,
        type,
        duration,
        createdAt: Date.now()
      };

      setToasts((prev) => {
        // Limit max concurrent toasts to 5 to avoid screen clutter
        const filtered = prev.filter((t) => t.id !== id);
        return [...filtered, newToast].slice(-5);
      });

      // Sound feedback
      if (sound) {
        if (type === 'success') {
          SoundEngine.playSuccess();
        } else if (type === 'error') {
          SoundEngine.playError();
        } else if (type === 'warning') {
          SoundEngine.playClick();
        } else {
          SoundEngine.playSelect();
        }
      }

      return id;
    },
    []
  );

  const success = useCallback(
    (message: string, title?: string, options?: Partial<ToastOptions>) => {
      return showToast({
        ...options,
        type: 'success',
        title: title || 'Thành công',
        message
      });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, title?: string, options?: Partial<ToastOptions>) => {
      return showToast({
        ...options,
        type: 'error',
        title: title || 'Có lỗi xảy ra',
        message,
        duration: options?.duration !== undefined ? options.duration : 6000 // Longer duration for errors
      });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, title?: string, options?: Partial<ToastOptions>) => {
      return showToast({
        ...options,
        type: 'warning',
        title: title || 'Cảnh báo',
        message
      });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, title?: string, options?: Partial<ToastOptions>) => {
      return showToast({
        ...options,
        type: 'info',
        title: title || 'Thông tin',
        message
      });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        clearAll,
        success,
        error,
        warning,
        info
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ==========================================
// TOAST CONTAINER & ITEM COMPONENTS
// ==========================================

const ToastContainer: React.FC<{
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="assertive"
      className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <SingleToast key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const SingleToast: React.FC<{
  toast: ToastItem;
  onDismiss: () => void;
}> = ({ toast, onDismiss }) => {
  const [isPaused, setIsPaused] = useState(false);
  const remainingTimeRef = useRef<number>(toast.duration || 4000);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<any>(null);

  const duration = toast.duration || 4000;

  // Auto-dismiss timer with pause on hover
  useEffect(() => {
    if (duration <= 0) return;

    if (!isPaused) {
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onDismiss();
      }, remainingTimeRef.current);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, duration, onDismiss]);

  // Color & Icon mapping
  const styles = {
    success: {
      card: 'bg-white border-emerald-300 shadow-emerald-500/10 text-gray-900',
      iconContainer: 'bg-emerald-100 text-emerald-600',
      icon: CheckCircle2,
      progressBar: 'bg-emerald-500',
      titleColor: 'text-emerald-900'
    },
    error: {
      card: 'bg-white border-rose-300 shadow-rose-500/10 text-gray-900',
      iconContainer: 'bg-rose-100 text-rose-600',
      icon: XCircle,
      progressBar: 'bg-rose-500',
      titleColor: 'text-rose-900'
    },
    warning: {
      card: 'bg-white border-amber-300 shadow-amber-500/10 text-gray-900',
      iconContainer: 'bg-amber-100 text-amber-600',
      icon: AlertTriangle,
      progressBar: 'bg-amber-500',
      titleColor: 'text-amber-900'
    },
    info: {
      card: 'bg-white border-indigo-200 shadow-indigo-500/10 text-gray-900',
      iconContainer: 'bg-indigo-100 text-indigo-600',
      icon: Sparkles,
      progressBar: 'bg-indigo-500',
      titleColor: 'text-indigo-900'
    }
  }[toast.type];

  const Icon = styles.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95, x: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 30, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role={toast.type === 'error' ? 'alert' : 'status'}
      className={`pointer-events-auto relative overflow-hidden rounded-2xl border p-4 shadow-xl backdrop-blur-md ${styles.card}`}
    >
      <div className="flex items-start gap-3">
        {/* Leading icon */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${styles.iconContainer}`}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Content text */}
        <div className="flex-1 min-w-0 pr-1">
          {toast.title && (
            <h4 className={`text-xs font-bold leading-tight ${styles.titleColor}`}>
              {toast.title}
            </h4>
          )}
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed break-words font-medium">
            {toast.message}
          </p>

          {/* Optional Action Button */}
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                onDismiss();
              }}
              className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 underline flex items-center gap-1 cursor-pointer"
            >
              <span>{toast.action.label}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          aria-label="Đóng thông báo"
          className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar (countdown indicator) */}
      {duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: isPaused ? undefined : '0%' }}
          transition={{
            duration: duration / 1000,
            ease: 'linear'
          }}
          className={`absolute bottom-0 left-0 h-1 ${styles.progressBar}`}
        />
      )}
    </motion.div>
  );
};
