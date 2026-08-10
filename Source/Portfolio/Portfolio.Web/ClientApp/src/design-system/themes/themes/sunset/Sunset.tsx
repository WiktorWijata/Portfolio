import { useEffect, useState } from 'react';
import type { Firefly, FireflyProps } from './Sunset.types';
import { FireflyVariant } from './Sunset.types';

export function Sunset({ variant = FireflyVariant.MEDIUM }: FireflyProps) {
  const [fireflies, setFireflies] = useState<Firefly[]>(() => {
    const count = variant === FireflyVariant.LIGHT ? 30 : variant === FireflyVariant.MEDIUM ? 50 : 80;
    return [...Array(count)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFireflies((prev) =>
        prev.map((firefly) => {
          let newX = firefly.x + firefly.speedX;
          let newY = firefly.y + firefly.speedY;
          let newSpeedX = firefly.speedX;
          let newSpeedY = firefly.speedY;

          if (newX <= 0 || newX >= 100) {
            newSpeedX = -firefly.speedX;
            newX = Math.max(0, Math.min(100, newX));
          }
          if (newY <= 0 || newY >= 100) {
            newSpeedY = -firefly.speedY;
            newY = Math.max(0, Math.min(100, newY));
          }

          return {
            ...firefly,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at bottom, #1a0f00 0%, #000000 50%, #000000 100%)',
        }}
      />
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #ff6b00 0%, transparent 70%)',
          top: '10%',
          right: '20%',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #ff8c00 0%, transparent 70%)',
          bottom: '20%',
          left: '10%',
          animation: 'float 25s ease-in-out infinite reverse',
        }}
      />

      {fireflies.map((firefly, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            background: `radial-gradient(circle, rgba(255, 140, 0, ${firefly.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${firefly.size * 3}px rgba(255, 140, 0, ${firefly.opacity * 0.8})`,
            animation: `glow ${firefly.duration}s ease-in-out ${firefly.delay}s infinite`,
            transition: 'left 0.05s linear, top 0.05s linear',
          }}
        />
      ))}

      <style>{`
        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(50px, -30px);
          }
          50% {
            transform: translate(0, -60px);
          }
          75% {
            transform: translate(-50px, -30px);
          }
        }
      `}</style>
    </div>
  );
}
