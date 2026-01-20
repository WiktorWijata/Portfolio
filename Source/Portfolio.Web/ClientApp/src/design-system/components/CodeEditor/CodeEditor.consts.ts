export const WindowColors = {
  CLOSE: '#FF5F57',
  MINIMIZE: '#FEBC2E',
  MAXIMIZE: '#28C840',
} as const;

export const EditorColors = {
  BACKGROUND: 'rgba(0, 0, 0, 0.3)',
  HEADER_BACKGROUND: 'rgba(0, 0, 0, 0.4)',
  LINE_NUMBERS: 'rgba(255, 255, 255, 0.3)',
} as const;

export const ResponsiveStyles = {
  FONT_SIZE: 'clamp(0.875rem, 2.5vw, 1.25rem)',
  PADDING_LEFT: 'clamp(0rem, 1vw, 1em)',
  PADDING_RIGHT: 'clamp(0rem, 2vw, 4em)',
  LINE_NUMBER_WIDTH: 'clamp(2em, 4vw, 3em)',
} as const;

export const MonospaceFont = "'Fira Code', 'Courier New', monospace" as const;
