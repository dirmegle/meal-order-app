import { ReactNode, createContext, useCallback, useMemo, useRef, useState } from 'react';
import Toast, { ToastProps } from '../components/Toast/Toast';
import styles from './toastContext.module.css';

interface Toasts extends ToastProps {
  id: number;
}

export interface ToastContextValue {
  addToast: (toast: ToastProps) => number;
  removeToast: (id: number) => void;
}

interface ToastContectProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export default function ToastContextProvider({ children }: ToastContectProviderProps) {
  const [toasts, setToasts] = useState<Toasts[]>([]);
  const toastIdRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: ToastProps) => {
      toastIdRef.current += 1;
      const id = toastIdRef.current;
      setToasts((prevToasts) => [{ ...toast, id }, ...prevToasts]);
      if (toast.toastType !== 'warning') {
        setTimeout(() => removeToast(id), 5000);
      }

      return id;
    },
    [removeToast]
  );

  const contextValue = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toastType={toast.toastType}
            icon={toast.icon}
            onClose={() => removeToast(toast.id)}>
            {toast.children}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
