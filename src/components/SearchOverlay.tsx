import { useState, useEffect, useRef } from 'react';
import { Search, X, Heart, Sparkles, AlertCircle, Play, Camera, BookOpen, Shirt, Calendar, Gamepad2, Star } from 'lucide-react';

interface SearchResult {
  sectionId: string;
  title: string;
  description: string;
  icon: any;
}

const SEARCHABLE_SECTIONS: SearchResult[] = [
  {
    sectionId: 'playlist-section',
    title: 'Özel Oynatma Listesi',
    description: 'En sevdiğimiz romantik melodilerle dolu 10 bölümlük özel şarkı listesi ve anı videosu.',
    icon: Play,
  },
  {
    sectionId: 'diary-section',
    title: 'Günlük ve Sesli Notlar',
    description: 'Ruh halimizi yansıtan tatlı günlük notları ve kırmızı yanıp sönen mikrofona sahip sesli mesaj alanı.',
    icon: BookOpen,
  },
  {
    sectionId: 'gallery-section',
    title: 'En Güzel Anılarımız',
    description: 'Hover edince dönen ve canlanan, altı el yazılı Polaroid fotoğraf albümümüz.',
    icon: Camera,
  },
  {
    sectionId: 'wardrobe-section',
    title: 'Akıllı Kıyafet Asistanı',
    description: 'Samsun hava durumuna ve seçilen Pooh/Ariel temasına göre tasarlanmış kıyafet ve renk kombini önerileri.',
    icon: Shirt,
  },
  {
    sectionId: 'special-days-section',
    title: 'Özel Kilometre Taşlarımız',
    description: 'Tanışma günümüz, ilk tatilimiz ve yıldönümlerimizin kronolojik harika aşk çizelgesi.',
    icon: Calendar,
  },
  {
    sectionId: 'game-section',
    title: 'Aşk Bahçesi Hafıza Oyunu',
    description: 'Çift kişilik ortaklaşa veya VS moduyla bal ve deniz incileri toplama ve sırlar açma hafıza oyunu.',
    icon: Gamepad2,
  },
  {
    sectionId: 'characters-section',
    title: 'Karakterlerimizin Sihirli Sözleri',
    description: 'Winnie the Pooh ve Prenses Ariel karakterlerinden aşk ve dostluk felsefeli sözler.',
    icon: Star,
  },
];

interface SecretMessage {
  keywords: string[];
  response: string;
  emoji: string;
}

const ROMANTIC_SECRETS: SecretMessage[] = [
  {
    keywords: ['seni seviyorum', 'seviyorum', 'love', 'i love you'],
    response: 'Seni her geçen gün, her saniye daha da çok seviyorum biriciğim. Son 5 yılımızı dünyanın en büyülü macerasına dönüştürdüğün için teşekkür ederim! ❤️',
    emoji: '💖',
  },
  {
    keywords: ['yıl dönümü', 'yıldönümü', 'anniversary', '5 yıl', '5.yıl', 'kutlu olsun'],
    response: 'Tam 5 yıl önce bugün, hayatım seninle aydınlandı. Göz açıp kapayıncaya kadar geçen bu harika yıllarda biriktirdiğimiz tüm kahkahalar kalbimin en değerli köşesinde saklı! 🎉',
    emoji: '💍',
  },
  {
    keywords: ['aşk', 'birtanem', 'canım', 'sevgilim', 'ömrüm'],
    response: 'Gülüşünde huzur bulduğum, ellerinde dünyayı unuttuğum sevgilim... Sen benim hayat arkadaşım, ruh eşim ve en büyük şansımsın. İyi ki varsın! 🥰',
    emoji: '🌹',
  },
  {
    keywords: ['pooh', 'piglet', 'tigger', 'bal', 'honey'],
    response: 'Yüz Dönüm Ormanı\'nın en tatlı sakini ve Piglet\'in kalbini ısıtan o muhteşem sevgi yolculuğu bizim hikayemizle şekilleniyor. Bal kavanozundan bile daha tatlısın sevgilim! 🍯',
    emoji: '🐻',
  },
  {
    keywords: ['ariel', 'küçük deniz kızı', 'okyanus', 'deniz', 'flounder'],
    response: 'Atlantika Kralı Triton\'un krallığındaki tüm elmaslar, senin gözlerindeki ışıltı kadar değerli olamaz. Birlikte denizlerin altında ve karaların üstünde sonsuz ufuklara! 🧜‍♀️',
    emoji: '🧜‍♀️',
  },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (id: string) => void;
}

export default function SearchOverlay({ isOpen, onClose, onNavigateToSection }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSections, setFilteredSections] = useState<SearchResult[]>([]);
  const [secretMatch, setSecretMatch] = useState<SecretMessage | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      setSearchTerm('');
      setSecretMatch(null);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    const cleaned = val.toLowerCase().trim();

    if (!cleaned) {
      setFilteredSections([]);
      setSecretMatch(null);
      return;
    }

    // Check for romantic shortcuts
    const secret = ROMANTIC_SECRETS.find((s) =>
      s.keywords.some((keyword) => cleaned.includes(keyword))
    );
    setSecretMatch(secret || null);

    // Search existing modular sections
    const matches = SEARCHABLE_SECTIONS.filter(
      (sec) =>
        sec.title.toLowerCase().includes(cleaned) ||
        sec.description.toLowerCase().includes(cleaned)
    );
    setFilteredSections(matches);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start items-center bg-black/60 backdrop-blur-xl px-4 pt-20 transition-all duration-300">
      
      {/* Absolute Close Button */}
      <button
        onClick={onClose}
        id="close-search-overlay-btn"
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full transition-transform duration-200 cursor-pointer"
        aria-label="Kapat"
      >
        <X size={24} />
      </button>

      {/* Main Container */}
      <div className="w-full max-w-2xl flex flex-col gap-6 animate-fade-in-up">
        
        {/* Search Header Info */}
        <div className="text-center text-white/80 space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight font-serif flex items-center justify-center gap-2">
            <Sparkles className="text-amber-300 animate-pulse" size={24} />
            Büyülü Arama Paneli
          </h2>
          <p className="text-xs text-white/50">
            Modülleri arayabilir veya kalbinden geçen kelimeleri yazıp sırları keşfedebilirsin... (örn: &quot;seni seviyorum&quot;, &quot;5 yıl&quot;)
          </p>
        </div>

        {/* Big Search Input Field */}
        <div className="relative flex items-center">
          <Search className="absolute left-5 text-white/40" size={22} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Aramak istediğin kelime veya duygular..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-16 pl-14 pr-16 bg-white/10 border-2 border-white/25 focus:border-amber-300 rounded-2xl text-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 shadow-xl shadow-black/10"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-5 text-white/40 hover:text-white/80"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Results Stream */}
        <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4">
          
          {/* Secret/Romantic Sürpriz Karşılaşma */}
          {secretMatch && (
            <div className="w-full flex-col gap-3 p-6 rounded-2xl bg-gradient-to-br from-pink-500/20 via-pink-400/10 to-transparent border border-pink-500/30 flex items-start animate-fade-in-up">
              <div className="flex items-center gap-2.5 text-pink-300 font-bold text-lg">
                <span className="text-2xl">{secretMatch.emoji}</span>
                <span>Sevgilinden Bir Sır Mesajı Var!</span>
              </div>
              <p className="text-white/90 text-sm md:text-base leading-relaxed italic border-l-2 border-pink-400 pl-4 py-1">
                &quot;{secretMatch.response}&quot;
              </p>
              <div className="flex items-center gap-1.5 text-xs text-white/40 select-none">
                <Heart size={12} className="fill-pink-500 text-pink-500 animate-pulse" />
                <span>Her Şeyim, 5. Sene-i Devriyemiz Kutlu Olsun.</span>
              </div>
            </div>
          )}

          {/* Standard Modular Section Results */}
          {filteredSections.map((sec) => {
            const IconComponent = sec.icon;
            return (
              <button
                key={sec.sectionId}
                onClick={() => {
                  onNavigateToSection(sec.sectionId);
                  onClose();
                }}
                className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left flex items-start gap-4 transition-all duration-200 cursor-pointer hover:border-white/25 group"
              >
                <div className="p-3 rounded-lg bg-white/10 text-white group-hover:scale-110 transition-transform duration-200">
                  <IconComponent size={20} />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-white group-hover:text-amber-200 transition-colors text-base flex items-center gap-1.5">
                    {sec.title}
                    <Sparkles size={14} className="opacity-0 group-hover:opacity-100 text-amber-300 transition-opacity" />
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2">{sec.description}</p>
                </div>
              </button>
            );
          })}

          {/* No results prompt */}
          {searchTerm && filteredSections.length === 0 && !secretMatch && (
            <div className="py-12 text-center text-white/40 space-y-2 border border-white/5 rounded-2xl bg-white/2">
              <AlertCircle className="mx-auto text-white/30" size={32} />
              <p className="text-sm font-medium">Özel bir arama sonucu bulunamadı.</p>
              <p className="text-xs text-white/25">
                Başka bir kelime girmeyi deneyebilirsin sevgilim (örneğin: &quot;notlar&quot;, &quot;polaroid&quot;, &quot;seni seviyorum&quot;).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
