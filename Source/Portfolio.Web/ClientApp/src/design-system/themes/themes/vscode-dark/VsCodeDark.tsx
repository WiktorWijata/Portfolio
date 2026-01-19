import { useEffect, useState } from 'react';
import type { CodeSymbol, VsCodeDarkProps } from './VsCodeDark.types';
import { CodeVariant } from './VsCodeDark.types';

export function VsCodeDark({ variant = CodeVariant.MEDIUM }: VsCodeDarkProps) {
  const codeSymbols = ['{', '}', '<', '>', '/', '(', ')', '[', ']', '=', ';', ':', '.', ',', '+', '-', '*'];
  
  const [symbols, setSymbols] = useState<CodeSymbol[]>(() => {
    const count = variant === CodeVariant.LIGHT ? 20 : variant === CodeVariant.MEDIUM ? 35 : 50;
    return [...Array(count)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      char: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      size: 12 + Math.random() * 16,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.2,
    }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSymbols((prev) =>
        prev.map((symbol) => ({
          ...symbol,
          opacity: 0.1 + Math.random() * 0.2,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: '#1e1e1e',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-5"
        style={{
          background: 'radial-gradient(circle, #007acc 0%, transparent 70%)',
          top: '20%',
          right: '10%',
          animation: 'float 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-5"
        style={{
          background: 'radial-gradient(circle, #4ec9b0 0%, transparent 70%)',
          bottom: '15%',
          left: '15%',
          animation: 'float 35s ease-in-out infinite reverse',
        }}
      />

      {symbols.map((symbol, index) => (
        <div
          key={index}
          className="absolute font-mono font-bold"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}px`,
            color: index % 4 === 0 ? '#569cd6' : index % 4 === 1 ? '#4ec9b0' : index % 4 === 2 ? '#ce9178' : '#dcdcaa',
            opacity: symbol.opacity,
            animation: `floatSlow ${symbol.duration}s ease-in-out ${symbol.delay}s infinite`,
            textShadow: `0 0 10px currentColor`,
          }}
        >
          {symbol.char}
        </div>
      ))}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
