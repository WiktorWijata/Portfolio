import { Tile, Text, TextSize, TextVariant, TextWeight, Alignment } from '../../../../design-system/components';
import { useTheme } from '../../../../design-system/themes';
import type { DeveloperDescriptionProps } from './DeveloperDescription.types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function DeveloperDescription({ 
  title, 
  greeting, 
  paragraphs,
  className = '' 
}: DeveloperDescriptionProps) {
  const { currentTheme } = useTheme();

  return (
    <div className={`relative ${className}`}>
      <Tile className="p-0 w-full overflow-hidden">
        <div 
          className="px-4 py-2 flex items-center gap-2 border-b"
          style={{ borderBottomColor: currentTheme.colors.neutral.border }}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <Text size={TextSize.SM} variant={TextVariant.MUTED} className="ml-2">
            developer.info
          </Text>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex items-start gap-2">
              <span className="animate-pulse font-mono" style={{ color: currentTheme.colors.primary.borderHover, fontSize: '1.5rem', lineHeight: '1.2' }}>
                &gt;_
              </span>
              <SyntaxHighlighter
                language="csharp"
                style={vscDarkPlus}
                customStyle={{
                  backgroundColor: 'transparent',
                  margin: 0,
                  padding: 0,
                }}
                codeTagProps={{
                  style: {
                    fontFamily: 'monospace',
                    fontSize: '1.5rem',
                    lineHeight: '1.2'
                  }
                }}
              >
                {title}
              </SyntaxHighlighter>
            </div>
            
            <Text 
              size={TextSize.MD} 
              variant={TextVariant.MUTED} 
              weight={TextWeight.SEMIBOLD}
              align={Alignment.JUSTIFY}
              className="leading-relaxed"
            >
              {greeting}
            </Text>
            
            {paragraphs.map((paragraph, index) => (
              <Text 
                key={index}
                size={TextSize.MD}
                variant={TextVariant.MUTED}
                className="leading-relaxed"
              >
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </Tile>
    </div>
  );
}
