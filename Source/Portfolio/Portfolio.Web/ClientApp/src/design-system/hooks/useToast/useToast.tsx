import { useState, useCallback } from 'react';
import type { JSX } from 'react';
import type { ToastVariantType } from '../../components/Toast/Toast.consts';
import { ToastVariant } from '../../components/Toast/Toast.consts';
import { Toast } from '../../components/Toast/Toast';
import type { ToastState } from './useToast.types';

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    variant: ToastVariant.INFO,
  });

  const showToast = useCallback((message: string, variant: ToastVariantType = ToastVariant.INFO) => {
    setToast({
      show: true,
      message,
      variant,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  const ToastComponent = (): JSX.Element => (
    <Toast 
      variant={toast.variant} 
      show={toast.show}
      onClose={hideToast}
      duration={3000}
    >
      {toast.message}
    </Toast>
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
  };
}
