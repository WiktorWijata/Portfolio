import { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../themes';
import { WINDOW_COLORS, EDITOR_COLORS, RESPONSIVE_STYLES, MONOSPACE_FONT } from './CodeEditor.consts';
import type { CodeEditorProps } from './CodeEditor.types';

export const CodeEditor = memo(function CodeEditor({ 
  fileName, 
  code,
  language = 'csharp',
  startLine = 1,
  className = '' 
}: CodeEditorProps) {
  const { currentTheme } = useTheme();
  
  return (
    <div 
      className={`rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundColor: EDITOR_COLORS.background,
        border: `1px solid ${currentTheme.colors.neutral.border}`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        fontFamily: MONOSPACE_FONT
      }}
    >
      <div 
        className="flex items-center gap-2 px-4 py-3"
        style={{
          backgroundColor: EDITOR_COLORS.headerBackground,
          borderBottom: `1px solid ${currentTheme.colors.neutral.border}`
        }}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: WINDOW_COLORS.close }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: WINDOW_COLORS.minimize }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: WINDOW_COLORS.maximize }} />
        </div>
        <span 
          className="ml-4 text-sm"
          style={{ color: currentTheme.colors.text.muted }}
        >
          {fileName}
        </span>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        startingLineNumber={startLine}
        wrapLongLines={false}
        customStyle={{
          backgroundColor: 'transparent',
          paddingLeft: RESPONSIVE_STYLES.paddingLeft,
          paddingRight: RESPONSIVE_STYLES.paddingRight
        }}
        codeTagProps={{
          style: {
            fontSize: RESPONSIVE_STYLES.fontSize
          }
        }}
        lineNumberStyle={{
          textAlign: 'center',
          color: EDITOR_COLORS.lineNumbers,
          userSelect: 'none',
          display: 'inline-block',
          minWidth: RESPONSIVE_STYLES.lineNumberWidth
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
});
