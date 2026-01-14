import { useEffect, useState } from 'react';
import type { Comet, CosmosProps, Star } from './Cosmos.types';
import { CosmosVariant } from './Cosmos.types';

export function Cosmos({ variant = CosmosVariant.STARS_WITH_COMETS }: CosmosProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [comets, setComets] = useState<Comet[]>([]);
  const [dots, setDots] = useState<Star[]>(() =>
    [...Array(150)].map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const depth = Math.random(); // Losowa głębokość 0-1
      return {
        x,
        y,
        originalX: x,
        originalY: y,
        size: 1.5 + depth * 3, // Większe gwiazdy są bliżej
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 3,
        depth,
      };
    })
  );

  useEffect(() => {
    let animationFrameId: number;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const updateDots = () => {
      setMousePosition({ x: lastMouseX, y: lastMouseY });
      animationFrameId = requestAnimationFrame(updateDots);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateDots);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Generowanie komet w losowych odstępach czasu
  useEffect(() => {
    const createComet = () => {
      // Sprawdź czy nie ma już 15 komet na ekranie
      setComets(prev => {
        if (prev.length >= 15) {
          return prev;
        }

        const id = Date.now();
        const side = Math.floor(Math.random() * 4); // 0: góra, 1: prawo, 2: dół, 3: lewo
        let startX, startY, endX, endY;

        switch (side) {
          case 0: // Z góry na dół
            startX = Math.random() * 100;
            startY = -10;
            endX = startX + (Math.random() * 40 - 20);
            endY = 110;
            break;
          case 1: // Z prawa na lewo
            startX = 110;
            startY = Math.random() * 100;
            endX = -10;
            endY = startY + (Math.random() * 40 - 20);
            break;
          case 2: // Z dołu na górę
            startX = Math.random() * 100;
            startY = 110;
            endX = startX + (Math.random() * 40 - 20);
            endY = -10;
            break;
          default: // Z lewej na prawo
            startX = -10;
            startY = Math.random() * 100;
            endX = 110;
            endY = startY + (Math.random() * 40 - 20);
        }

        const duration = 10 + Math.random() * 8; // 10-18 sekund
        const tailLength = 40 + Math.random() * 30; // 40-70px

        const newComet: Comet = { id, startX, startY, endX, endY, duration, tailLength };

        setTimeout(() => {
          setComets(current => current.filter(c => c.id !== id));
        }, duration * 1000);

        return [...prev, newComet];
      });
    };

    // Pierwsze 2-3 komety szybko
    const firstTimeout = setTimeout(createComet, 1000 + Math.random() * 2000);
    const secondTimeout = setTimeout(createComet, 2000 + Math.random() * 3000);

    // Kolejne komety co 3-6 sekund
    const interval = setInterval(() => {
      createComet();
    }, 3000 + Math.random() * 3000);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
      clearInterval(interval);
    };
  }, []);

  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };
  
  useEffect(() => {
    let animationFrameId: number;
    const maxDistance = 200;

    const animate = () => {
      setDots(prevDots =>
        prevDots.map(dot => {
          const dotX = (dot.originalX * window.innerWidth) / 100;
          const dotY = (dot.originalY * window.innerHeight) / 100;
          const distance = getDistance(mousePosition.x, mousePosition.y, dotX, dotY);

          if (distance < maxDistance && distance > 0 && dot.depth > 0.4) {
            const pullStrength = 0.6 * dot.depth;
            const pullAmount = ((maxDistance - distance) / maxDistance) * pullStrength;

            const newX = dot.originalX + (((mousePosition.x - dotX) / window.innerWidth) * 100) * pullAmount;
            const newY = dot.originalY + (((mousePosition.y - dotY) / window.innerHeight) * 100) * pullAmount;

            return { ...dot, x: newX, y: newY };
          }

          return {
            ...dot,
            x: dot.x + (dot.originalX - dot.x) * 0.1,
            y: dot.y + (dot.originalY - dot.y) * 0.1,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  if (variant === CosmosVariant.MINIMAL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]"
            style={{ top: '10%', left: '5%' }}
          />
          <div 
            className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
            style={{ top: '50%', right: '10%' }}
          />
        </div>
      </div>
    );
  }

  const showComets = variant === CosmosVariant.STARS_WITH_COMETS;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {showComets && comets.map((comet) => {
        const dx = comet.endX - comet.startX;
        const dy = comet.endY - comet.startY;
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        
        return (
          <div
            key={comet.id}
            style={{
              position: 'absolute',
              left: `${comet.startX}%`,
              top: `${comet.startY}%`,
              '--rotation': `${rotation}deg`,
              '--dx': dx,
              '--dy': dy,
            } as React.CSSProperties & { '--rotation': string; '--dx': number; '--dy': number }}
          >
            <div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.5)',
                animation: `comet-fly ${comet.duration}s linear forwards`,
              }}
            />
            <div
              className="absolute"
              style={{
                left: 0,
                top: 0,
                width: '1px',
                height: `${comet.tailLength}px`,
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'top center',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0))',
                animation: `comet-fly ${comet.duration}s linear forwards`,
              }}
            />
          </div>
        );
      })}

      <div className="absolute inset-0">
        {dots.map((dot, i) => {
          const starColor = i % 15 === 0 ? 'bg-blue-100' : 
                           i % 20 === 0 ? 'bg-yellow-50' : 
                           'bg-white';
          
          const opacity = 0.3 + (dot.depth * 0.7);
          const glowIntensity = dot.depth * 0.8;
          const glowColor = `0 0 ${2 + glowIntensity * 4}px rgba(255, 255, 255, ${glowIntensity}), 0 0 ${4 + glowIntensity * 8}px rgba(255, 255, 255, ${glowIntensity * 0.3})`;
          
          return (
            <div
              key={i}
              className={`absolute ${starColor} rounded-full`}
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                opacity: opacity,
                boxShadow: glowColor,
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
