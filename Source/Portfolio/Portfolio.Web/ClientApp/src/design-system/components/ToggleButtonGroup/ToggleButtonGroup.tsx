import { useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from '../../themes';
import type { RowEdge, ToggleButtonGroupProps } from './ToggleButtonGroup.types';
import { computeRowEdges, edgesEqual, getRowRoundingClass, singleRowEdge } from './ToggleButtonGroup.helpers';

export function ToggleButtonGroup<T = string>({
  value,
  onChange,
  options,
  className = '',
}: ToggleButtonGroupProps<T>) {
  const { currentTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const [rowEdges, setRowEdges] = useState<RowEdge[]>(() =>
    options.map((_, index) => singleRowEdge(index, options.length))
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recompute = () => {
      const next = computeRowEdges(container, options.length);
      setRowEdges((prev) => (edgesEqual(prev, next) ? prev : next));
    };

    recompute();

    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [options]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap gap-2 justify-center lg:inline-flex lg:flex-wrap lg:gap-x-0 lg:gap-y-2 ${className}`}
      role="group"
    >
      {options.map((option, index) => {
        const isActive = value === option.value;
        const edge = rowEdges[index] ?? singleRowEdge(index, options.length);
        const borderRadiusDesktop = getRowRoundingClass(edge);

        return (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            className={`px-3 sm:px-4 lg:px-6 py-2 font-medium backdrop-blur-sm transition-all rounded-lg ${borderRadiusDesktop} text-sm sm:text-base ${
              !edge.isRowLast ? 'lg:-mr-px' : ''
            }`}
            style={{
              border: `1px solid ${isActive ? currentTheme.colors.primary.borderGlow : currentTheme.colors.neutral.border}`,
              backgroundColor: isActive ? currentTheme.colors.primary.bgActive : currentTheme.colors.neutral.bg,
              boxShadow: isActive ? currentTheme.colors.primary.glow : 'none',
              color: isActive ? currentTheme.colors.text.secondary : currentTheme.colors.text.muted,
              position: 'relative',
              zIndex: isActive ? 10 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = currentTheme.colors.text.secondary;
                e.currentTarget.style.zIndex = '5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = currentTheme.colors.text.muted;
                e.currentTarget.style.zIndex = '1';
              }
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
