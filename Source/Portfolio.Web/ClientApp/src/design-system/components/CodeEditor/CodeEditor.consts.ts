export const WINDOW_COLORS = {
  close: '#FF5F57',
  minimize: '#FEBC2E',
  maximize: '#28C840',
} as const;

export const EDITOR_COLORS = {
  background: 'rgba(0, 0, 0, 0.3)',
  headerBackground: 'rgba(0, 0, 0, 0.4)',
  lineNumbers: 'rgba(255, 255, 255, 0.3)',
} as const;

export const RESPONSIVE_STYLES = {
  fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
  paddingLeft: 'clamp(0rem, 1vw, 1em)',
  paddingRight: 'clamp(0rem, 2vw, 4em)',
  lineNumberWidth: 'clamp(2em, 4vw, 3em)',
} as const;

export const MONOSPACE_FONT = "'Fira Code', 'Courier New', monospace" as const;
