import React from 'react';
import { AppTheme } from '../types';
import { Heart, Sparkles, Star, Quote } from 'lucide-react';

interface CharacterQuote {
  characterName: string;
  role: string;
  avatarEmoji: string;
  quote: string;
  accent: string;
}

const POOH_CHARACTERS: CharacterQuote[] = [
  {
    characterName: "Winnie the Pooh",
    role: "Yüz Dönüm Ormanı'nın Bal Sevdalısı",
    avatarEmoji: "🐻",
    quote: "Eğer sen yüz yıl yaşarsan, ben yüz yıl eksi bir gün yaşamak istiyorum; böylece sensiz hiç yaşamak zorunda kalmam sevgilim.",
    accent: "text-amber-500 bg-amber-500/10"
  },
  {
    characterName: "Korkusuz Piglet",
    role: "Winnie'nin En Cesur Küçük Arkadaşı",
    avatarEmoji: "🐷",
    quote: "Aşk kelimesini nasıl harf harf yazacağını biliyorum. Ama senin gözlerine baktığımda biliyorum ki, o yazılmaz, sadece yaşanır.",
    accent: "text-rose-400 bg-rose-400/10"
  },
  {
    characterName: "Zıpzıp Tigger",
    role: "Enerji ve Mutluluk Kaynağımız",
    avatarEmoji: "🐯",
    quote: "Zıplamak harika bir şeydir dostum! Ama seninle yan yana hayat boyu zıplamak, dünyadaki en tatlı maceradır!",
    accent: "text-orange-500 bg-orange-500/10"
  }
];

const ARIEL_CHARACTERS: CharacterQuote[] = [
  {
    characterName: "Prenses Ariel",
    role: "Atlantika'nın Büyülü Sesi",
    avatarEmoji: "🧜‍♀️",
    quote: "Senin dünyanda, senin ellerini tutarak karada yürümek... Bütün okyanusların hazinelerini verseler, senin bir gülüşün etmez sevgilim.",
    accent: "text-teal-500 bg-teal-500/10"
  },
  {
    characterName: "Sadık Flounder",
    role: "Ariel'in Okyanustaki Can Dostu",
    avatarEmoji: "🐠",
    quote: "Karanlık denizlerin en derin, en korkunç yerlerinde bile yüzebilirdim sevgilim, yeter ki sonunda senin tebessümün olsun.",
    accent: "text-cyan-400 bg-cyan-400/10"
  },
  {
    characterName: "Şef Sebastian",
    role: "Kraliyet Sarayı Orkestra Şefi",
    avatarEmoji: "🦀",
    quote: "Sular ılık ve akıp gider sevgilim... Denizlerin altında bir müzik yapıyorum ama en tatlı nağme senin sesinde saklıdır.",
    accent: "text-red-500 bg-red-500/10"
  }
];

export default function MagicCharacters({ theme }: { theme: AppTheme }) {
  const characters = theme === 'pooh' ? POOH_CHARACTERS : ARIEL_CHARACTERS;

  return (
    <div id="characters-section" className="glass-panel p-6 rounded-3xl w-full flex flex-col gap-5 relative overflow-hidden animate-fade-in-up delay-600">
      
      {/* Visual glowing overlay */}
      <div className="absolute top-1/2 left-2/3 w-28 h-28 bg-[var(--theme-primary)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title block */}
      <div className="flex items-center gap-3 border-b border-[var(--theme-card-border)] pb-3">
        <div className="p-2 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl">
          <Star className="animate-spin" style={{ animationDuration: '6s' }} size={20} />
        </div>
        <div>
          <h3 className="font-bold text-lg font-serif">Karakterlerimizin Sihirli Sözleri</h3>
          <p className="text-[11px] opacity-75">
            {theme === 'pooh' 
              ? "Yüz Dönüm Ormanı'ndaki sevimli dostlarımızın aşk felsefesi" 
              : "Atlantika krallığındaki okyanus korolarından fısıltılar"
            }
          </p>
        </div>
      </div>

      {/* Characters quote list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {characters.map((char) => (
          <div
            key={char.characterName}
            className="p-4 rounded-2xl bg-white/20 border border-[var(--theme-card-border)] hover:border-[var(--theme-primary)]/40 hover:scale-102 hover:shadow-md duration-300 transition-all flex flex-col justify-between gap-3 group relative"
          >
            
            {/* Top quote icon ornament */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 duration-200">
              <Quote size={32} />
            </div>

            {/* Profile Row */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl shadow-sm ${char.accent} group-hover:scale-110 duration-200 transition-transform select-none`}>
                {char.avatarEmoji}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-[var(--theme-text)] truncate">{char.characterName}</h4>
                <p className="text-[9px] opacity-60 font-semibold uppercase tracking-wider truncate">{char.role}</p>
              </div>
            </div>

            {/* Quote content */}
            <p className="text-xs italic leading-relaxed text-slate-700 font-medium pl-2.5 border-l-2 border-[var(--theme-secondary)] py-0.5">
              &quot;{char.quote}&quot;
            </p>

            {/* Micro heart button */}
            <div className="flex items-center justify-between text-[9px] opacity-40 pt-1 select-none">
              <span>Sonsuz Bağlılık</span>
              <Heart size={10} className="fill-[var(--theme-secondary)] text-[var(--theme-secondary)] animate-pulse" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
