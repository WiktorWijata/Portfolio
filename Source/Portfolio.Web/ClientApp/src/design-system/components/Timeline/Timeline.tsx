import type { TimelineProps } from './Timeline.types';

export function Timeline({ children, className = '' }: TimelineProps) {
  return (
    <div className={`w-[1406px] mx-auto relative px-0 ${className}`}>
      {/* Vertical timeline line */}
      <div
        className="absolute left-0 w-0.5"
        style={{
          top: '-60px',
          height: 'calc(100% + 120px)',
          background: 'linear-gradient(to bottom, #6b21a8, #a855f7, #c084fc, #e9d5ff)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      ></div>
      <div className="space-y-12">
        {children}
      </div>
    </div>
  );
}
