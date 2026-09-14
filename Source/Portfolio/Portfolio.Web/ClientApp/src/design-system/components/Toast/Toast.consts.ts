export const ToastVariant = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  INFO: 'INFO',
  WARNING: 'WARNING',
} as const;

export type ToastVariantType = typeof ToastVariant[keyof typeof ToastVariant];

export const toastVariantBorderColors: Record<ToastVariantType, string> = {
  [ToastVariant.SUCCESS]: '#4ade80',
  [ToastVariant.ERROR]: '#f87171',
  [ToastVariant.INFO]: '#60a5fa',
  [ToastVariant.WARNING]: '#fbbf24',
};

export const toastVariantIcons: Record<ToastVariantType, string> = {
  [ToastVariant.SUCCESS]: '✓',
  [ToastVariant.ERROR]: '✕',
  [ToastVariant.INFO]: 'ℹ',
  [ToastVariant.WARNING]: '⚠',
};
