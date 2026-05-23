import { useState, useEffect } from 'react';
import Header from './components/Header';
import ThemeBackground from './components/ThemeBackground';
import Playlist from './components/Playlist';
import Diary from './components/Diary';
import Gallery from './components/Gallery';
import OutfitAssistant from './components/OutfitAssistant';
import SearchOverlay from './components/SearchOverlay';
import SpecialDays from './components/SpecialDays';
import AnniversaryGame from './components/AnniversaryGame';
import MagicCharacters from './components/MagicCharacters';
import FloatingCompanions from './components/FloatingCompanions';
import { AppTheme } from './types';
import { Sparkles, Heart, Film, Camera, Calendar, BookOpen, Gamepad2, MessageSquare } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<AppTheme>('pooh');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cartoon');

  // Sync theme with root dataset for gorgeous global background & variables transitions
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'pooh' ? 'ariel' : 'pooh'));
  };

  const handleNavigateToSection = (sectionId: string) => {
    // Map sectionId to target tab
    if (sectionId === 'playlist-section' || sectionId === 'outfit-section') {
      setActiveTab('cartoon');
    } else if (sectionId === 'gallery-section') {
      setActiveTab('gallery');
    } else if (sectionId === 'special-days-section') {
      setActiveTab('milestones');
    } else if (sectionId === 'game-section') {
      setActiveTab('game');
    } else if (sectionId === 'diary-section') {
      setActiveTab('diary');
    } else if (sectionId === 'characters-section') {
      setActiveTab('quotes');
    }

    // Scroll after render cycle to make sure DOM exists
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Temporary highlight effect for the jumped section
        el.classList.add('ring-4', 'ring-[var(--theme-primary)]/40', 'scale-[1.01]');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-[var(--theme-primary)]/40', 'scale-[1.01]');
        }, 1800);
      }
    }, 150);
  };

  return (
    <div className="relative min-h-screen pb-16 flex flex-col items-center">
      
      {/* Dynamic theme particle generator (leaves / bubble loops starting immediately with negative delays) */}
      <ThemeBackground theme={theme} />

      {/* Main Structural Container */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col gap-6">
        
        {/* Dynamic Header Component */}
        <Header 
          theme={theme} 
          onThemeToggle={handleThemeToggle} 
          onSearchOpen={() => setIsSearchOpen(true)} 
        />

        {/* Elegant Scrap-Book Tabs Navigation */}
        <div className="w-full flex justify-center py-2 relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/55 backdrop-blur-md p-2 rounded-2xl border border-[var(--theme-card-border)] shadow-md max-w-4xl">
            <button
              onClick={() => setActiveTab('cartoon')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none flex items-center gap-2 duration-200 ${
                activeTab === 'cartoon'
                  ? 'bg-[var(--theme-primary)] text-white shadow-md scale-102 font-serif'
                  : 'text-slate-705 hover:bg-slate-100/60 hover:text-[var(--theme-primary)]'
              }`}
            >
              <Film size={14} className={activeTab === 'cartoon' ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">Çizgi Sinemamız</span><span className="sm:hidden">Sinema</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none flex items-center gap-2 duration-200 ${
                activeTab === 'gallery'
                  ? 'bg-[var(--theme-primary)] text-white shadow-md scale-102 font-serif'
                  : 'text-slate-705 hover:bg-slate-100/60 hover:text-[var(--theme-primary)]'
              }`}
            >
              <Camera size={14} className={activeTab === 'gallery' ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">Fotoğraflarımız</span><span className="sm:hidden">Galeri</span>
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none flex items-center gap-2 duration-200 ${
                activeTab === 'milestones'
                  ? 'bg-[var(--theme-primary)] text-white shadow-md scale-102 font-serif'
                  : 'text-slate-705 hover:bg-slate-100/60 hover:text-[var(--theme-primary)]'
              }`}
            >
              <Calendar size={14} className={activeTab === 'milestones' ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">Kilometre Taşları</span><span className="sm:hidden">Doğum/Tanışma</span>
            </button>
            <button
              onClick={() => setActiveTab('diary')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none flex items-center gap-2 duration-200 ${
                activeTab === 'diary'
                  ? 'bg-[var(--theme-primary)] text-white shadow-md scale-102 font-serif'
                  : 'text-slate-705 hover:bg-slate-100/60 hover:text-[var(--theme-primary)]'
              }`}
            >
              <BookOpen size={14} className={activeTab === 'diary' ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">Aşk Günlüğümüz</span><span className="sm:hidden">Günlük</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none flex items-center gap-2 duration-200 ${
                activeTab === 'game'
                  ? 'bg-[var(--theme-primary)] text-white shadow-md scale-102 font-serif'
                  : 'text-slate-705 hover:bg-slate-100/60 hover:text-[var(--theme-primary)]'
              }`}
            >
              <Gamepad2 size={14} className={activeTab === 'game' ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">Hafıza Oyunu</span><span className="sm:hidden">Oyun</span>
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border-none flex items-center gap-2 duration-200 ${
                activeTab === 'quotes'
                  ? 'bg-[var(--theme-primary)] text-white shadow-md scale-102 font-serif'
                  : 'text-slate-705 hover:bg-slate-100/60 hover:text-[var(--theme-primary)]'
              }`}
            >
              <MessageSquare size={14} className={activeTab === 'quotes' ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">Karakter Sözleri</span><span className="sm:hidden">Sözler</span>
            </button>
          </div>
        </div>

        {/* Tab-driven Content Rendering */}
        <main className="w-full flex flex-col gap-6">
          
          {/* CARTOON EPISODES TAB */}
          {activeTab === 'cartoon' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start animate-fade-in-up">
              {/* Wide Cartoon Diary Playlist */}
              <div className="xl:col-span-2">
                <Playlist theme={theme} />
              </div>

              {/* Samsun Weather & Retro Outfit planner advice */}
              <div className="xl:col-span-1 h-full flex" id="outfit-section">
                <OutfitAssistant theme={theme} />
              </div>
            </div>
          )}

          {/* POLAROID PHOTO GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="animate-fade-in-up">
              <Gallery />
            </div>
          )}

          {/* CHRONOLOGY MILESTONES TAB */}
          {activeTab === 'milestones' && (
            <div className="animate-fade-in-up">
              <SpecialDays />
            </div>
          )}

          {/* INTERACTIVE HEART MEMORY MATCH GAME TAB */}
          {activeTab === 'game' && (
            <div className="animate-fade-in-up">
              <AnniversaryGame theme={theme} />
            </div>
          )}

          {/* SENTIMENTAL EMOTIONS LOG & SPEECH RECORDER TAB */}
          {activeTab === 'diary' && (
            <div className="animate-fade-in-up">
              <Diary theme={theme} />
            </div>
          )}

          {/* CARTOONS PHILOSOPHICAL QUOTES TAB */}
          {activeTab === 'quotes' && (
            <div className="animate-fade-in-up">
              <MagicCharacters theme={theme} />
            </div>
          )}

        </main>

        {/* Elegant Romantic Footer */}
        <footer className="mt-8 border-t border-[var(--theme-card-border)] pt-8 pb-4 text-center space-y-3">
          <div className="flex items-center justify-center gap-1 text-[var(--theme-secondary)] animate-pulse">
            <Heart size={14} className="fill-[var(--theme-secondary)]" />
            <Sparkles size={14} className="text-amber-400" />
            <Heart size={14} className="fill-[var(--theme-secondary)]" />
          </div>
          
          <div className="max-w-md mx-auto space-y-1">
            <p className="font-bold text-xs select-none italic text-slate-700 pl-4 pr-4">
              {theme === 'pooh' 
                ? '“Birlikte olduğumuz sürece her günü en sevdiğim gün ilan ediyorum sevgilim!” — Winnie the Pooh'
                : '“Sırf seninle aynı dünyada yaşamak için bütün okyanusu terk edebilirim sevgilim!” — Ariel'
              }
            </p>
            <p className="text-[10px] opacity-60 font-mono uppercase tracking-wider">
              09.10.2021&apos;den beri Beraberiz • Sevgiyle Dolu Sonsuzluğa...
            </p>
          </div>
        </footer>

      </div>

      {/* Blur Overlay Search Modal */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigateToSection={handleNavigateToSection} 
      />

      {/* Floating Companions sidebar trigger and animated widgets */}
      <FloatingCompanions theme={theme} />

    </div>
  );
}
