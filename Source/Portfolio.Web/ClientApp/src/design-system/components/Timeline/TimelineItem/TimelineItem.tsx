import { useTheme } from '../../../themes';
import { Alignment } from '../../../tokens';
import { useTimelineContext } from '../Timeline.context';
import type { TimelineItemProps } from './TimelineItem.types';

export function TimelineItem({ children, className = '' }: TimelineItemProps) {
  const { currentTheme } = useTheme();
  const { align } = useTimelineContext();
  const padding = align === Alignment.LEFT ? 'pl-12' : 'pr-12';
  const dotPosition = align === Alignment.LEFT ? '-left-3' : '-right-3';
  
  return (
    <div
      className={`relative ${padding} ${className}`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute ${dotPosition} w-6 h-6 rounded-full border-4`}
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          borderColor: currentTheme.colors.primary.borderHover,
          backgroundColor: currentTheme.colors.neutral.bgDarkest,
          boxShadow: currentTheme.colors.primary.glow
        }}
      ></div>
      {children}
    </div>
  );
}
