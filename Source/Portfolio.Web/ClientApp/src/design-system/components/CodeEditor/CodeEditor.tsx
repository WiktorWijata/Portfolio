import { memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../themes';
import { WindowColors, EditorColors, ResponsiveStyles, MonospaceFont } from './CodeEditor.consts';
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
        backgroundColor: EditorColors.BACKGROUND,
        border: `1px solid ${currentTheme.colors.neutral.border}`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: currentTheme.colors.shadow.tile,
        fontFamily: MonospaceFont
      }}
    >
      <div 
        className="flex items-center gap-2 px-4 py-3"
        style={{
          backgroundColor: EditorColors.HEADER_BACKGROUND,
          borderBottom: `1px solid ${currentTheme.colors.neutral.border}`
        }}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: WindowColors.CLOSE }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: WindowColors.MINIMIZE }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: WindowColors.MAXIMIZE }} />
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
          paddingLeft: ResponsiveStyles.PADDING_LEFT,
          paddingRight: ResponsiveStyles.PADDING_RIGHT
        }}
        codeTagProps={{
          style: {
            fontSize: ResponsiveStyles.FONT_SIZE
          }
        }}
        lineNumberStyle={{
          textAlign: 'center',
          color: EditorColors.LINE_NUMBERS,
          userSelect: 'none',
          display: 'inline-block',
          minWidth: ResponsiveStyles.LINE_NUMBER_WIDTH
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
});
