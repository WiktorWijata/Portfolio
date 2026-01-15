import { radius } from '../../tokens';
import type { ToastProps } from './Toast.types';
import { ToastVariant, toastVariantColors, toastVariantIcons } from './Toast.consts';

export function Toast({ 
  children, 
  variant = ToastVariant.INFO, 
  className = '',
  show = true 
}: ToastProps) {
  if (!show) return null;

  const color = toastVariantColors[variant];
  const icon = toastVariantIcons[variant];

  return (
    <div
      className={`${radius.card} px-4 py-3 backdrop-blur-sm font-semibold text-center transition-all ${className}`}
      style={{
        border: `1px solid ${color}`,
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </div>
  );
}
