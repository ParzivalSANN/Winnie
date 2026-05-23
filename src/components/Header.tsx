import { useState, useEffect } from 'react';
import { Search, Heart, Sparkles, Moon, Sun, Anchor, Calendar, Compass } from 'lucide-react';
import { AppTheme } from '../types';

interface HeaderProps {
  theme: AppTheme;
  onThemeToggle: () => void;
  onSearchOpen: () => void;
}

export default function Header({ theme, onThemeToggle, onSearchOpen }: HeaderProps) {
  const [timeTogether, setTimeTogether] = useState({
    days: 1826,
    hours: 43824,
    minutes: 2629440,
    seconds: 157766400,
  });

  // Anniversary date from user: 09.10.2021 (9th of October 2021)
  useEffect(() => {
    const anniversaryDate = new Date('2021-10-09T00:00:00');
    
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - anniversaryDate.getTime();
      
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor(diffMs / (1000 * 60));
      const seconds = Math.floor(diffMs / 1000);
      
      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const poohTitle = "Yüz Dönüm Ormanına Hoş Geldin Sevgilim!";
  const arielTitle = "Atlantika'nın Büyülü Sularına Hoş Geldin Sevgilim!";

  return (
    <header className="w-full relative py-6 flex flex-col gap-4 z-10 animate-fade-in-up">
      
      {/* Top action row */}
      <div className="w-full flex items-center justify-between">
        
        {/* Left branding badge */}
        <div className="flex items-center gap-2 select-none group">
          <div className="p-2 rounded-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white shadow-md group-hover:rotate-12 duration-300 transition-transform">
            <Heart size={18} className="fill-current animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs tracking-wider uppercase font-serif">Aşk Defterimiz</span>
            <span className="text-[10px] opacity-65 font-mono">BÖLÜM 5 // SÜREKLİ GÜNCEL</span>
          </div>
        </div>

        {/* Right side Actions (Theme Toggle & Search Button) */}
        <div className="flex items-center gap-2.5">
          
          {/* Round Elegant Search Button */}
          <button
            onClick={onSearchOpen}
            id="open-search-modal-btn"
            className="p-3 rounded-full bg-white/40 hover:bg-white/70 border border-[var(--theme-card-border)] text-[var(--theme-text)] hover:shadow-md hover:scale-105 active:scale-95 duration-200 cursor-pointer flex items-center justify-center"
            title="Büyülü Arama Yap"
            aria-label="Arama"
          >
            <Search size={18} />
          </button>

          {/* Majestic theme switch button */}
          <button
            onClick={onThemeToggle}
            id="theme-toggler-btn"
            className="relative px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white font-bold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all duration-300 cursor-pointer shadow-md shadow-[var(--theme-primary)]/15 border-none group"
            title="Dünyayı Değiştir"
          >
            <span className="text-sm select-none animate-bounce">
              {theme === 'pooh' ? '🍯' : '🧜‍♀️'}
            </span>
            <span className="hidden sm:inline">
              {theme === 'pooh' ? "Prenses Ariel Dünyası" : "Winnie the Pooh Dünyası"}
            </span>
            <span className="sm:hidden text-[10px]">
              {theme === 'pooh' ? "Ariel'e Geç" : "Pooh'a Geç"}
            </span>
            <Sparkles size={11} className="text-amber-100 group-hover:rotate-45 duration-300 transition-transform" />
          </button>

        </div>
      </div>

      {/* Main Banner Title */}
      <div className="text-center space-y-3 py-6 mt-2 relative">
        <div className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-[var(--theme-secondary)] bg-white/30 border border-[var(--theme-card-border)] px-3 py-1 rounded-full select-none">
          <Calendar size={10} />
          <span>5. YIL DÖNÜMÜMÜZ KUTLU OLSUN</span>
        </div>

        {/* Big Romantic Display Heading with theme variables smoothly transitioning */}
        <h1 
          className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-[var(--theme-text)] max-w-3xl mx-auto leading-[1.2]"
          style={{ fontFamily: 'var(--font-family-title)' }}
        >
          {theme === 'pooh' ? poohTitle : arielTitle}
        </h1>

        <p className="text-xs md:text-sm text-[var(--theme-text)]/75 max-w-xl mx-auto leading-relaxed">
          {theme === 'pooh' 
            ? "Yarım asırlık onca mevsim ve bal şelaleleri arasında kaybolduğumuz, her gün daha çok sevdiğimiz masalsı bahçemiz."
            : "Kristal okyanusların derinliğinde saklı duran, dalgaları aşan ve karada yeni dünyalar inşa eden eşsiz sevgimiz."
          }
        </p>
      </div>

      {/* Live Counter Widget - Showing exactly how much time has passed */}
      <div className="w-full glass-panel rounded-2xl p-4 border border-[var(--theme-card-border)] bg-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center select-none">
        
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[var(--theme-primary)] font-serif font-mono">
            {timeTogether.days.toLocaleString('tr-TR')}
          </span>
          <span className="text-[10px] uppercase font-bold text-[var(--theme-text)]/60">Birlikte Geçen Gün</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[var(--theme-secondary)] font-serif font-mono">
            {timeTogether.hours.toLocaleString('tr-TR')}
          </span>
          <span className="text-[10px] uppercase font-bold text-[var(--theme-text)]/60">Harikulade Saat</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[var(--theme-primary)] font-serif font-mono">
            {timeTogether.minutes.toLocaleString('tr-TR')}
          </span>
          <span className="text-[10px] uppercase font-bold text-[var(--theme-text)]/60">Büyülü Dakika</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[var(--theme-secondary)] font-serif font-mono">
            {timeTogether.seconds.toLocaleString('tr-TR')}
          </span>
          <span className="text-[10px] uppercase font-bold text-[var(--theme-text)]/60">Kalp Atışı Saniye</span>
        </div>

      </div>

    </header>
  );
}
