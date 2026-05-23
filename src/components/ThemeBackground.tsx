import { useEffect, useState } from 'react';
import { AppTheme } from '../types';

interface Particle {
  id: number;
  type: 'leaf' | 'bee' | 'bubble';
  left: string;
  delay: string;
  duration: string;
  scale: number;
  content?: string;
}

export default function ThemeBackground({ theme }: { theme: AppTheme }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const list: Particle[] = [];
    const count = theme === 'pooh' ? 20 : 35; // Higher count for rich Ariel water bubbles

    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`;
      
      // Negative delays make some elements start IMMEDIATELY at random vertical heights (halfway through the animation)
      const isNegative = Math.random() > 0.3;
      const delayVal = Math.random() * 12;
      const delay = isNegative ? `-${delayVal}s` : `${delayVal}s`;
      
      const duration = theme === 'pooh' 
        ? `${9 + Math.random() * 12}s` // Fluttering down slowly
        : `${5 + Math.random() * 8}s`; // Rising up faster

      const scale = 0.4 + Math.random() * 1.3;

      if (theme === 'pooh') {
        const isBee = Math.random() > 0.8;
        list.push({
          id: i,
          type: isBee ? 'bee' : 'leaf',
          left,
          delay,
          duration,
          scale,
          content: isBee ? '🐝' : ['🍁', '🍂', '🍃', '🍯'][Math.floor(Math.random() * 4)],
        });
      } else {
        list.push({
          id: i,
          type: 'bubble',
          left,
          delay,
          duration,
          scale,
        });
      }
    }

    setParticles(list);
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic underwater background overlay when Ariel is active */}
      {theme === 'ariel' && (
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b from-[#E0F7FA]/40 via-[#80DEEA]/25 to-[#00ACC1]/20 -z-10 mix-blend-multiply opacity-80" />
      )}
      
      {particles.map((p) => {
        if (theme === 'pooh') {
          return (
            <div
              key={`${theme}-${p.id}`}
              className="absolute text-xl select-none animate-particle-fall"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                transform: `scale(${p.scale})`,
                top: '-50px',
              }}
            >
              <span className="inline-block hover:scale-125 transition-transform duration-300">
                {p.content}
              </span>
            </div>
          );
        } else {
          // Ariel theme: bubbles with glass/translucent styling
          return (
            <div
              key={`${theme}-${p.id}`}
              className="absolute animate-particle-rise rounded-full"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                width: `${10 + p.scale * 20}px`,
                height: `${10 + p.scale * 20}px`,
                border: '1.2px solid rgba(255, 255, 255, 0.6)',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(220,250,255,0.2) 60%, rgba(0,188,212,0.15) 100%)',
                boxShadow: 'inset -2px -2px 6px rgba(0, 188, 212, 0.2), 0 0 6px rgba(255, 255, 255, 0.35)',
                bottom: '-50px',
              }}
            />
          );
        }
      })}
    </div>
  );
}
