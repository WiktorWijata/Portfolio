import { CodeEditor } from '../../../../design-system/components';
import type { HeroCodeProps } from './HeroCode.types';

export function HeroCode({ quote, className = '' }: HeroCodeProps) {
  const codeString = `public string GetMotto()
{
    return "${quote}";
}`;
  
  return (
    <CodeEditor 
      fileName="Program.cs" 
      code={codeString}
      language="csharp"
      className={className}
    />
  );
}
