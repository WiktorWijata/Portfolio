import { useEffect, useState } from 'react';
import { Radius } from '../../tokens';
import { useTheme } from '../../themes';
import { slideInRight, slideOutRight } from '../../utils/animations';
import type { ToastProps } from './Toast.types';
import { ToastVariant, toastVariantBorderColors, toastVariantIcons } from './Toast.consts';

export function Toast({ 
  children, 
  variant = ToastVariant.INFO, 
  className = '',
  show = true,
  duration = 3000,
  onClose
}: ToastProps) {
  const { currentTheme } = useTheme();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const borderColor = toastVariantBorderColors[variant];
  const icon = toastVariantIcons[variant];

  return (
    <div
      className={`fixed top-8 right-8 z-50 ${Radius.CARD} backdrop-blur-sm font-semibold shadow-lg transition-all duration-300 overflow-hidden ${className}`}
      style={{
        border: `1px solid ${borderColor}`,
        backgroundColor: `${borderColor}13`,
        color: currentTheme.colors.text.primary,
        ...(isClosing ? slideOutRight() : slideInRight()),
        opacity: isClosing ? 0 : 1,
      }}
    >
      <div className="px-6 py-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all hover:bg-black/30"
          aria-label="Zamknij"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 16 16" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
            className="text-gray-400 hover:text-gray-200"
          >
            <path d="M12 4L4 12M4 4l8 8" />
          </svg>
        </button>
        
        <div className="flex items-center gap-3 pr-6">
          <span className="text-xl" style={{ color: borderColor }}>{icon}</span>
          <span>{children}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div 
        className="h-1 w-full"
        style={{
          backgroundColor: borderColor,
          animation: `toastProgress ${duration}ms linear`,
        }}
      />
    </div>
  );
}
