import { useTheme } from '../../themes';
import { Alignment } from '../../tokens';
import type { TimelineProps } from './Timeline.types';
import { TimelineProvider } from './Timeline.context';

export function Timeline({ children, className = '', align = Alignment.LEFT }: TimelineProps) {
  const { currentTheme } = useTheme();
  const linePosition = align === Alignment.LEFT ? 'left-0' : 'right-0';
  
  return (
    <TimelineProvider value={{ align }}>
      <div className={`w-full max-w-[1406px] mx-auto relative px-0 ${className}`}>
        <div
          className={`absolute ${linePosition} w-0.5`}
          style={{
            top: '-60px',
            height: 'calc(100% + 120px)',
            background: currentTheme.colors.gradient.title,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        ></div>
        <div className="space-y-12">
          {children}
        </div>
      </div>
    </TimelineProvider>
  );
}
