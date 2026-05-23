import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, ShieldAlert, Award, Heart, HelpCircle, Gamepad2 } from 'lucide-react';
import { AppTheme } from '../types';

interface GameThemeItem {
  id: string;
  name: string;
  emoji: string;
  matchMessage: string;
}

// Items for the game based on theme
const POOH_GAME_ITEMS: GameThemeItem[] = [
  { id: 'bal', name: 'Altın Bal Kavanozu', emoji: '🍯', matchMessage: 'Mmm! Winnie balları hüpletti!' },
  { id: 'piglet', name: 'Ürkek Piglet', emoji: '🐷', matchMessage: 'Sevginiz Piglet\'e sonsuz cesaret verdi!' },
  { id: 'tigger', name: 'Zıplayan Tigger', emoji: '🐯', matchMessage: 'Wuhu! Neşe dolu bir sıçrayış!' },
  { id: 'eeyore', name: 'Bilge Eeyore', emoji: '🐴', matchMessage: 'Eeyore\'un kuyruğu bulundu ve yüzü güldü!' },
  { id: 'balon', name: 'Kırmızı Balon', emoji: '🎈', matchMessage: 'Havada süzülen sevgi balonlarımız!' },
  { id: 'agac', name: 'Yüz Dönüm Ormanı', emoji: '🌳', matchMessage: 'Doğa canlandı, ağaçlar çiçek açtı!' }
];

const ARIEL_GAME_ITEMS: GameThemeItem[] = [
  { id: 'ariel', name: 'Özgür Ariel', emoji: '🧜‍♀️', matchMessage: 'Ariel senin dünyanda karaya ayak basıyor!' },
  { id: 'flounder', name: 'Tombul Flounder', emoji: '🐠', matchMessage: 'Flounder neşeyle etrafında yüzüyor!' },
  { id: 'sebastian', name: 'Şef Sebastian', emoji: '🦀', matchMessage: 'Saray orkestrası bizim şarkımızı çalıyor!' },
  { id: 'kabuk', name: 'Deniz Kabuğu', emoji: '🐚', matchMessage: 'Büyülü sesler çıkaran deniz kabuğu eşleşti!' },
  { id: 'parilti', name: 'Büyük İnciler', emoji: '✨', matchMessage: 'Derin suların en değerli parıltısı sensin!' },
  { id: 'triton', name: 'Kral Amblemi', emoji: '🔱', matchMessage: 'Kral Triton\'un büyülü asası kalpleri birleştirdi!' }
];

interface CardState {
  index: number;
  itemId: string;
  emoji: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function AnniversaryGame({ theme }: { theme: AppTheme }) {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [gameMode, setGameMode] = useState<'coop' | 'vs'>('coop'); // Coop vs Player VS Player!
  const [scores, setScores] = useState({ p1: 0, p2: 0 }); // Player 1 (Sevgilim) vs Player 2 (Ben)
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1); // Active turn for 'vs' mode
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [unlockedMessage, setUnlockedMessage] = useState('');

  // Generate cards
  const initGame = () => {
    const activeItems = theme === 'pooh' ? POOH_GAME_ITEMS : ARIEL_GAME_ITEMS;
    
    // Duplicate items to create pairs of 12 cards total
    const pool = [...activeItems, ...activeItems]
      .map((item, index) => ({
        index,
        itemId: item.id,
        emoji: item.emoji,
        name: item.name,
        isFlipped: false,
        isMatched: false,
      }))
      // Randomly shuffle
      .sort(() => Math.random() - 0.5)
      // Re-assign index safely after shuffle
      .map((item, idx) => ({ ...item, index: idx }));

    setCards(pool);
    setFlippedIndices([]);
    setScores({ p1: 0, p2: 0 });
    setActivePlayer(1);
    setTimer(0);
    setIsGameActive(true);
    setIsCompleted(false);
    setStatusMessage(theme === 'pooh' ? 'Bal toplama serüvenimiz başlıyor sevgilim!' : 'Denizlerin gizli incilerini bulma serüveni!');
    setUnlockedMessage('');
  };

  useEffect(() => {
    initGame();
  }, [theme, gameMode]);

  // Timer interval for Coop
  useEffect(() => {
    let interval: any;
    if (isGameActive && !isCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isCompleted]);

  const handleCardClick = (clickedIdx: number) => {
    // Basic guards
    if (!isGameActive || isCompleted || flippedIndices.length >= 2) return;
    const clickedCard = cards[clickedIdx];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip current
    const updatedCards = [...cards];
    updatedCards[clickedIdx].isFlipped = true;
    setCards(updatedCards);

    const nextFlipped = [...flippedIndices, clickedIdx];
    setFlippedIndices(nextFlipped);

    // If we have flipped 2 cards, check match
    if (nextFlipped.length === 2) {
      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.itemId === secondCard.itemId) {
        // MATCH!
        setTimeout(() => {
          const matchedPool = updatedCards.map((c, i) => {
            if (i === firstIdx || i === secondIdx) {
              return { ...c, isMatched: true };
            }
            return c;
          });
          setCards(matchedPool);
          setFlippedIndices([]);

          // Add scores / trigger logs
          const gameItems = theme === 'pooh' ? POOH_GAME_ITEMS : ARIEL_GAME_ITEMS;
          const matchInfo = gameItems.find((item) => item.id === firstCard.itemId);
          setStatusMessage(matchInfo ? `Eşleşti! ✨ ${matchInfo.matchMessage}` : 'Uyumlu bir çift daha!');

          if (gameMode === 'vs') {
            setScores((prev) => {
              const updated = { ...prev };
              if (activePlayer === 1) updated.p1 += 1;
              else updated.p2 += 1;
              return updated;
            });
            // Player keeps turn on success!
          }

          // Check Win Condition
          const allMatched = matchedPool.every((c) => c.isMatched);
          if (allMatched) {
            setIsCompleted(true);
            setIsGameActive(false);
            triggerWinnerRevelation();
          }
        }, 600);
      } else {
        // MATCH FAIL
        setTimeout(() => {
          const resetPool = updatedCards.map((c, i) => {
            if (i === firstIdx || i === secondIdx) {
              return { ...c, isFlipped: false };
            }
            return c;
          });
          setCards(resetPool);
          setFlippedIndices([]);

          if (gameMode === 'vs') {
            // Switch player turn on fail
            setActivePlayer((prev) => (prev === 1 ? 2 : 1));
            setStatusMessage(`Eşleşmedi. Sıra ${activePlayer === 1 ? 'Ben' : 'Sevgilim'}'e geçti!`);
          } else {
            setStatusMessage('Tekrar dene sevgilim, kalbimiz bir!');
          }
        }, 1100);
      }
    }
  };

  const triggerWinnerRevelation = () => {
    let romanticConfession = '';
    if (gameMode === 'coop') {
      romanticConfession = theme === 'pooh'
        ? `Tebrikler bir tanem! El ele vererek ${timer} saniyede tüm balları topladık! Sen benim hayatımdaki en tatlı balsamın/balımsın. 🍯 Nice mutlu 5 senelere!`
        : `Harikasın deniz kızım! ${timer} saniyede okyanus derinliğindeki tüm parıldayan incileri çıkarttık! Benim gizli hazinem sensin. 🧜‍♀️`;
    } else {
      const winner = scores.p1 > scores.p2 ? 'Sevgilim' : scores.p2 > scores.p1 ? 'Ben' : 'Karşılıklı Aşk (Beraberlik)';
      romanticConfession = theme === 'pooh'
        ? `Eğlenceli mücadele bitti! Kazanan: ${winner}! Winnie ve Piglet diyor ki: 'Birbirini sevenlerin her oyunu tatlı bir bala dönüşür.' 🍯`
        : `Denizlerin altındaki krallık yarışımız tamamlandı! Kazanan: ${winner}! Ariel ve Eric gibi, karada ve suda kaderimiz bir yazılmış. ✨`;
    }
    setUnlockedMessage(romanticConfession);
  };

  return (
    <div id="game-section" className="glass-panel p-6 rounded-3xl w-full flex flex-col gap-5 relative overflow-hidden animate-fade-in-up delay-500">
      
      {/* Visual background decor */}
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-[var(--theme-secondary)]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header and details */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[var(--theme-card-border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white rounded-xl">
            <Gamepad2 className="animate-pulse" size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-1.5 select-none">
              Aşk Bahçesi Hafıza Oyunu
              <Sparkles size={16} className="text-[var(--theme-primary)]" />
            </h2>
            <p className="text-xs opacity-75">Birlikte veya tatlıca rekabet ederek oynayabileceğiniz 2 kişilik mini oyun</p>
          </div>
        </div>

        {/* Action Toggle Mode */}
        <div className="flex items-center bg-white/20 p-1.5 rounded-xl border border-[var(--theme-card-border)] gap-1 self-start md:self-auto">
          <button
            onClick={() => setGameMode('coop')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border-none transition-all ${
              gameMode === 'coop' 
                ? 'bg-rose-500 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-white/10'
            }`}
          >
            Ortaklaşa (El Ele)
          </button>
          <button
            onClick={() => setGameMode('vs')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer border-none transition-all ${
              gameMode === 'vs' 
                ? 'bg-[var(--theme-primary)] text-white shadow-xs' 
                : 'text-slate-600 hover:bg-white/10'
            }`}
          >
            2 Kişilik Rekabet (VS)
          </button>
        </div>
      </div>

      {/* Turn info and scoring board */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/10 p-4 rounded-2xl border border-[var(--theme-card-border)]">
        <div className="text-xs font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-ping" />
          <span className="opacity-90">{statusMessage}</span>
        </div>

        {/* Interactive Stats Panel */}
        <div className="flex items-center gap-4 text-xs font-bold">
          {gameMode === 'coop' ? (
            <div className="flex items-center gap-1.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] px-3 py-1 rounded-lg font-mono">
              <span>Süre: {timer} sn</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 select-none">
              <span className={`px-2.5 py-1 rounded-lg transition-all ${
                activePlayer === 1 
                  ? 'bg-rose-500/15 text-rose-500 ring-2 ring-rose-500/30 font-bold' 
                  : 'opacity-70 bg-slate-100'
              }`}>
                💖 Sevgilim: {scores.p1} Puan
              </span>
              <span className="text-slate-400">vs</span>
              <span className={`px-2.5 py-1 rounded-lg transition-all ${
                activePlayer === 2 
                  ? 'bg-amber-500/15 text-amber-500 ring-2 ring-amber-500/30 font-bold' 
                  : 'opacity-70 bg-slate-100'
              }`}>
                🍯 Ben: {scores.p2} Puan
              </span>
            </div>
          )}

          <button
            onClick={initGame}
            id="reset-game-btn"
            className="p-1.5 rounded-lg bg-white/30 hover:bg-white/60 text-slate-600 cursor-pointer active:scale-90 duration-150 border-none"
            title="Yeniden Başlat"
            aria-label="Yeniden Başlat"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Cards 4x3 Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 py-1 max-w-4xl mx-auto w-full">
        {cards.map((card) => {
          const showFace = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.index}
              onClick={() => handleCardClick(card.index)}
              id={`game-card-${card.index}`}
              className={`aspect-square w-full rounded-2xl border flex items-center justify-center relative cursor-pointer select-none transition-all duration-300 ${
                showFace
                  ? 'bg-white border-[var(--theme-primary)] rotate-0 scale-100 font-bold shadow-md'
                  : 'bg-gradient-to-br from-[var(--theme-primary)]/30 to-[var(--theme-secondary)]/30 hover:scale-102 hover:shadow-md border-[var(--theme-card-border)]'
              }`}
              style={{
                perspective: '1000px',
              }}
            >
              {showFace ? (
                /* Card Front face */
                <div className="flex flex-col items-center gap-1.5 animate-fade-in-up">
                  <span className="text-3xl md:text-4xl animate-bounce" style={{ animationDuration: '2s' }}>
                    {card.emoji}
                  </span>
                  <span className="text-[8px] md:text-[9px] text-[var(--theme-text)] opacity-70 font-semibold line-clamp-1 truncate max-w-[70px] text-center">
                    {card.name}
                  </span>
                </div>
              ) : (
                /* Card Back face with gorgeous patterned heart icon */
                <div className="flex flex-col items-center gap-1.5">
                  <Heart size={20} className="fill-[var(--theme-secondary)] text-[var(--theme-secondary)]/50 animate-pulse" />
                  <span className="text-[10px] opacity-40 font-mono hidden sm:inline">EŞLEŞTİR</span>
                </div>
              )}

              {/* Matched overlay filter */}
              {card.isMatched && (
                <div className="absolute inset-0 bg-[var(--theme-secondary)]/10 rounded-2xl flex items-center justify-center p-1 border-2 border-[var(--theme-secondary)]/40 pointer-events-none">
                  <div className="bg-white/95 px-1.5 py-0.5 rounded-full text-[9px] text-[var(--theme-secondary)] font-bold flex items-center gap-0.5 shadow-sm transform rotate-12 scale-110">
                    <Heart size={8} className="fill-current" />
                    <span>Aşk</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Celebration Revelation Message when completed successfully */}
      {unlockedMessage && (
        <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-pink-500/20 via-amber-500/10 to-transparent border border-pink-500/30 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up">
          <div className="p-3 bg-pink-500 text-white rounded-full text-2xl select-none flex-shrink-0 animate-bounce">
            🎁
          </div>
          <div className="space-y-1.5 flex-grow text-center sm:text-left">
            <h4 className="font-bold text-base text-pink-600 font-serif flex items-center justify-center sm:justify-start gap-1.5">
              <span>Sihirli Sır Mesajı Açıldı!</span>
              <Sparkles size={14} className="text-amber-500 animate-pulse" />
            </h4>
            <p className="text-xs md:text-sm font-semibold opacity-90 leading-relaxed italic border-l-0 sm:border-l-2 border-pink-400 pl-0 sm:pl-4 py-0.5">
              &quot;{unlockedMessage}&quot;
            </p>
          </div>
          <button
            onClick={initGame}
            id="play-again-btn"
            className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold hover:bg-pink-600 active:scale-95 duration-200 transition-transform cursor-pointer border-none shadow-md flex-shrink-0"
          >
            Yeniden Oyna
          </button>
        </div>
      )}

    </div>
  );
}
