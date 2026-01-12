import type { ReactNode } from 'react';

interface TimelineItemProps {
  children: ReactNode;
  className?: string;
  animationDelay?: number;
}

function TimelineItem({ children, className = '', animationDelay = 0 }: TimelineItemProps) {
  return (
    <div
      className={`relative pl-12 ${className}`}
      style={{
        animation: `fadeIn 0.6s ease-out ${animationDelay}s both`
      }}
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-3 w-6 h-6 rounded-full border-4"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          borderColor: '#a855f7',
          backgroundColor: '#1a0a2e',
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
        }}
      ></div>
      {children}
    </div>
  );
}

export default TimelineItem;
