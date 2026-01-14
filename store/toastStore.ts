import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  timeoutId?: NodeJS.Timeout;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (type, message, duration = 3000) => {
    const id = Math.random().toString(36).substring(7);
    let timeoutId: NodeJS.Timeout | undefined;

    if (duration > 0) {
      timeoutId = setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id)
        }));
      }, duration);
    }

    const toast: Toast = { id, type, message, duration, timeoutId };

    set((state) => ({
      toasts: [...state.toasts, toast]
    }));
  },

  removeToast: (id) => {
    const toast = get().toasts.find((t) => t.id === id);
    if (toast?.timeoutId) {
      clearTimeout(toast.timeoutId);
    }
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  }
}));
