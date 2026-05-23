import { useState, useEffect } from 'react';
import { Sparkles, Heart, HelpCircle, X, ChevronRight, MessageSquare, Info, Star } from 'lucide-react';
import { AppTheme } from '../types';

interface CharacterDetail {
  id: string;
  name: string;
  role: string;
  image: string;
  bgGradient: string;
  trivia: string[];
  quote: string;
  friend: string;
}

const POOH_FRIENDS: CharacterDetail[] = [
  {
    id: 'pooh',
    name: 'Winnie the Pooh',
    role: 'Yüz Dönüm Ormanı’nın Bal Gurmesi',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300', // Cute Teddy Bear representing classic Pooh
    bgGradient: 'from-amber-100 to-yellow-200 border-amber-300',
    quote: 'Her günü seninle geçirmek, aldığım en güzel hediyedir sevgilim.',
    friend: 'Piglet, Tigger & Eeyore',
    trivia: [
      'Winnie the Pooh, yazar A.A. Milne’in oğlu Christopher Robin’in gerçek peluş ayısından esinlenmiştir.',
      'Oyuncağın adı, Londra Hayvanat Bahçesi’ndeki "Winnipeg" adlı gerçek bir Kanada kara ayısından gelmektedir.',
      'Pooh’nun orijinal peluş oyuncağı, şu anda New York Halk Kütüphanesi’nde koruma altında sergilenmektedir!',
      'En çok sevdiği şey olan bal kaplarının üzerinde her zaman "HUNNY" (tatlı bir yanlış yazım) yazar.'
    ]
  },
  {
    id: 'piglet',
    name: 'Piglet (Küçük Dost)',
    role: 'Dünyanın En Cesur Küçük Domuzcuğu',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300', // Soft pink toy visual representing Piglet
    bgGradient: 'from-pink-100 to-rose-200 border-pink-300',
    quote: 'Sevgi harflerle yazılmaz sevgilim, kalple hissedilir.',
    friend: 'Winnie the Pooh',
    trivia: [
      'Küçük ve hassas yapısına rağmen, Yüz Dönüm Ormanı’nda en zor anlarda arkadaşlarını kurtaran gizli kahramandır.',
      'Yazarın oğlunun peluş oyuncak koleksiyonundaki en eski ve en sevdiği ikinci oyuncaktır.',
      'Duygusal, şairane ve hassas ruhuyla arkadaş grubunun empati kaynağıdır.'
    ]
  },
  {
    id: 'tigger',
    name: 'Zıpzıp Tigger',
    role: 'Enerji ve Neşe Şampiyonu',
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=300', // Cute striped tiger toy visual
    bgGradient: 'from-orange-100 to-amber-200 border-orange-300',
    quote: 'Seninle yan yana zıplamak, tüm okyanuslar kadar heyecan verici!',
    friend: 'Roo & Winnie the Pooh',
    trivia: [
      'Tigger’ın meşhur zıplama sesi ve fırlama hareketleri, Disney animatörlerinin yaylı mekanizmalardan esinlenmesiyle çizilmiştir.',
      'Ormanda asla kaybolmayan, sürekli güler yüzlü ve hayat dolu olan tek karakterdir.',
      'Büyüleyici çizgileriyle her zaman grubun moralini zirvede tutar.'
    ]
  },
  {
    id: 'eeyore',
    name: 'Bilge Eeyore',
    role: 'Melankolik ve Sadık Dost',
    image: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=300', // Cozy donkey/gray tone representation
    bgGradient: 'from-blue-100 to-indigo-200 border-blue-300',
    quote: 'Kuyruğum kaybolsa da, kalbim seninle her zaman sapasağlam.',
    friend: 'Winnie the Pooh',
    trivia: [
      'Sık sık düşen kuyruğu aslında küçük pembe fiyonklu bir çiviyle tutturulmuştur.',
      'Dışarıdan melankolik görünse de, arkadaşlarının hiçbir doğum gününü asla unutmayan inanılmaz sadık bir hafızaya sahiptir.',
      'Yüz Dönüm Ormanı’ndaki dostluk felsefesinin empati ve koşulsuz kabul ayağını oluşturur.'
    ]
  }
];

const ARIEL_FRIENDS: CharacterDetail[] = [
  {
    id: 'ariel',
    name: 'Prenses Ariel',
    role: 'Atlantika’nın Özgür Ruhlu Deniz Kızı',
    image: 'https://images.unsplash.com/photo-1550133130-0d330d64bcb6?auto=format&fit=crop&q=80&w=300', // Beautiful watercolor/sea mermaid vibe photo
    bgGradient: 'from-teal-100 to-cyan-200 border-teal-300',
    quote: 'Senin dünyanda, seninle el ele yürümek için her şeyi feda edebilirim.',
    friend: 'Flounder & Sebastian',
    trivia: [
      'Ariel’in göz alıcı kızıl saçları, yeşil deniz kızı kuyruğuyla mükemmel bir kontrast oluştursun diye özel olarak tasarlanmıştır.',
      'Kızıl saç rengi aynı zamanda o dönem popüler olan "Splash" filmindeki sarışın deniz kızından farklı olması için seçilmiştir.',
      'Ariel’in su altındaki saç süzülüşü, yerçekimsiz ortamda (Sally Ride astronotunun uzay videosu) süzülen saç hareketlerinden ilham alınarak çizilmiştir.',
      'Ünlü genç oyuncu Alyssa Milano, animatörlere Ariel’in yüz hatlarını tasarlarken ilham kaynağı olmuştur.'
    ]
  },
  {
    id: 'flounder',
    name: 'Flounder (Tombul Balık)',
    role: 'Ariel’in Okyanustaki En Cesur Sırdaşı',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=300', // Golden yellow tropical fish representation
    bgGradient: 'from-yellow-100 to-cyan-100 border-yellow-300',
    quote: 'En büyük dalgalar bile senin yanında küçük bir köpük gibi kalır.',
    friend: 'Prenses Ariel & Sebastian',
    trivia: [
      'İsmine rağmen Flounder biyolojik olarak bir "pisi balığı" (flounder) değildir; o sarı üzerine mavi çizgili sevimli bir tropikal resif balığıdır.',
      'Kendi gölgesinden bile korkacak kadar ürkek bir balık olmasına rağmen, Ariel tehlikede olduğunda hiç düşünmeden devasa köpekbalıklarına kafa tutmuştur.',
      'Okyanus koleksiyonundaki tüm insan eşyalarını saklamasında Ariel’e bizzat yardım eden tek sırdaştır.'
    ]
  },
  {
    id: 'sebastian',
    name: 'Şef Sebastian',
    role: 'Kraliyet Sarayı Baş Bestekarı',
    image: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&q=80&w=300', // Vibrant red crab representation
    bgGradient: 'from-red-100 to-rose-200 border-red-300',
    quote: 'Denizlerin altında binbir ahenk var ama en güzel müzik senin kalbinde.',
    friend: 'Deniz Kralı Triton & Ariel',
    trivia: [
      'Tam kraliyet adı: "Horatio Thelonious Ignacious Dustan Sebastian"dır.',
      'Aslen Jamaika kökenli kırmızı bir kraliyet yengecidir ve Atlantika saray orkestrasının dahi şefidir.',
      'Ariel’i korumak için sürekli sızlansa da, onun insan dünyasına kavuşması için Kral Triton’ın karşısına çıkıp onu savunan asil yüreklidir.'
    ]
  }
];

interface FloatingCompanionsProps {
  theme: AppTheme;
}

export default function FloatingCompanions({ theme }: FloatingCompanionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pooh' | 'ariel'>(theme);
  const [selectedCharId, setSelectedCharId] = useState<string>('');

  // Auto-switch facts tab when global theme changes
  useEffect(() => {
    setActiveTab(theme);
    const list = theme === 'pooh' ? POOH_FRIENDS : ARIEL_FRIENDS;
    setSelectedCharId(list[0].id);
  }, [theme]);

  // Handle manual tab switches
  const handleTabSwitch = (type: 'pooh' | 'ariel') => {
    setActiveTab(type);
    const list = type === 'pooh' ? POOH_FRIENDS : ARIEL_FRIENDS;
    setSelectedCharId(list[0].id);
  };

  const charactersList = activeTab === 'pooh' ? POOH_FRIENDS : ARIEL_FRIENDS;
  const selectedChar = charactersList.find(c => c.id === selectedCharId) || charactersList[0];

  return (
    <>
      {/* Floating Animated Sticker Widgets (Sticky at bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        
        {/* Soft speech cloud greeting */}
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[var(--theme-card-border)] shadow-lg text-[11px] font-bold text-slate-700 animate-bounce flex items-center gap-1.5 select-none max-w-xs transition-all pointer-events-none">
          <Sparkles size={11} className="text-amber-500" />
          <span>Karakterlerimizin İnternet Sırlarını Keşfet! 🤫</span>
        </div>

        {/* Floating Core Avatar Trigger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[var(--theme-primary)] to-[var(--theme-secondary)] p-0.5 shadow-xl hover:scale-108 active:scale-95 duration-200 transition-transform cursor-pointer border-none flex items-center justify-center group relative"
          title="Karakterlerin İlginç Dünyası"
        >
          {/* Inner white circle */}
          <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center transition-colors group-hover:bg-white/70 overflow-hidden relative">
            <span className="text-2xl group-hover:scale-115 duration-200 transition-transform block">
              {theme === 'pooh' ? '🍯' : '🧜‍♀️'}
            </span>
          </div>

          {/* Micro Notification Heart */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 border-2 border-white animate-pulse">
            <Heart size={8} className="fill-current" />
          </span>
        </button>
      </div>

      {/* Retro Interactive Sidebar/Drawer for Character Trivia (Right Side) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop Overlay */}
          <div 
            className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel sheet */}
          <div className="w-full max-w-md bg-[var(--theme-bg)] h-full overflow-y-auto z-10 shadow-2xl border-l border-[var(--theme-card-border)] flex flex-col justify-between animate-fade-in-up duration-300 relative">
            
            {/* Top Header */}
            <div className="p-5 border-b border-[var(--theme-card-border)] flex items-center justify-between bg-white/40 sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl">
                  <Star className="animate-spin text-[var(--theme-primary)]" style={{ animationDuration: '8s' }} size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base font-serif text-[var(--theme-text)]">Karakterler & Sırlar Rehberi</h3>
                  <p className="text-[10px] opacity-75 font-semibold uppercase tracking-wider">İnternetten Resimli Gerçek Bilgiler</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 duration-150 border-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Core Body */}
            <div className="p-5 flex-grow space-y-5">
              
              {/* Theme Toggle Select Inside Panel */}
              <div className="grid grid-cols-2 gap-2 bg-slate-100/60 p-1 rounded-xl border border-slate-200/50">
                <button
                  type="button"
                  onClick={() => handleTabSwitch('pooh')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'pooh'
                      ? 'bg-amber-400 text-amber-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🐻 Winnie & Dostları
                </button>
                <button
                  type="button"
                  onClick={() => handleTabSwitch('ariel')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'ariel'
                      ? 'bg-cyan-400 text-cyan-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🧜‍♀️ Ariel & Dostları
                </button>
              </div>

              {/* Characters Horizontal Buttons Choice */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {charactersList.map((char) => {
                  const isCharSelected = selectedCharId === char.id;
                  return (
                    <button
                      key={char.id}
                      type="button"
                      onClick={() => setSelectedCharId(char.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all cursor-pointer border ${
                        isCharSelected
                          ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-md'
                          : 'bg-white/50 border-slate-200 hover:bg-white text-slate-700'
                      }`}
                    >
                      {char.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Active Character Presentation Card */}
              {selectedChar && (
                <div className={`p-5 rounded-2xl bg-gradient-to-b ${selectedChar.bgGradient} border border-[var(--theme-card-border)] shadow-md space-y-4 animate-fade-in-up`}>
                  
                  {/* Avatar and Title metadata */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex-shrink-0">
                      <img
                        src={selectedChar.image}
                        alt={selectedChar.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 leading-tight">{selectedChar.name}</h4>
                      <p className="text-[10px] text-slate-600 font-semibold">{selectedChar.role}</p>
                      <p className="text-[9px] bg-white/60 text-slate-700 px-2 py-0.5 rounded-full w-max mt-1 font-mono uppercase font-bold tracking-wider">
                        En Yakın Dost: {selectedChar.friend}
                      </p>
                    </div>
                  </div>

                  {/* Character Custom Handwritten Quote */}
                  <div className="p-3 bg-white/70 rounded-xl border border-white/40 shadow-inner relative">
                    <div className="absolute top-1.5 right-2 opacity-10">
                      <MessageSquare size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-[var(--theme-primary)] block uppercase tracking-wide">Aşk Manifestosu</span>
                    <p 
                      className="text-lg text-slate-800 leading-snug font-medium pt-1"
                      style={{ fontFamily: 'var(--font-family-hand)' }}
                    >
                      &ldquo;{selectedChar.quote}&rdquo;
                    </p>
                  </div>

                  {/* Refined Internet Sourced Real Trivia Bullets */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 border-b border-black/10 pb-1Select None">
                      <Info size={11} />
                      Resmi İnternet Bilgi Arşivi
                    </span>
                    <ul className="space-y-2">
                      {selectedChar.trivia.map((t, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-slate-800 font-medium leading-relaxed">
                          <span className="text-[var(--theme-secondary)] shrink-0 font-bold select-none">✦</span>
                          <p>{t}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Panel footer footer badge */}
            <div className="p-4 bg-white/40 border-t border-[var(--theme-card-border)] text-center text-[10px] opacity-75 font-mono select-none flex items-center justify-center gap-1.5">
              <Heart size={10} className="fill-red-500 text-red-500 animate-pulse" />
              <span>CRAFTED WITH INTENTIONAL ADVENTURES • 09.10.2021</span>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
