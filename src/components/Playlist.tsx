import React, { useState, useEffect } from 'react';
import { Play, Heart, Film, Sparkles, Star, Award, CheckCircle } from 'lucide-react';
import { AppTheme } from '../types';

interface CartoonEpisode {
  id: number;
  title: string;
  originalName: string;
  duration: string;
  videoId: string;
  defaultNote: string;
}

const POOH_EPISODES: CartoonEpisode[] = [
  {
    id: 1,
    title: "Bölüm 1: Winnie the Pooh ve Bal Ağacı",
    originalName: "Winnie the Pooh and the Honey Tree",
    duration: "25:35",
    videoId: "g3H9_A7O0_M",
    defaultNote: "Winnie'nin balonla yukarı uçup arılardan bal avlamaya çalıştığı o masalsı efsanevi ilk macera."
  },
  {
    id: 2,
    title: "Bölüm 2: Esintili Fırtınalı Bir Gün",
    originalName: "Winnie the Pooh and the Blustery Day",
    duration: "24:12",
    videoId: "as0pLa76T68",
    defaultNote: "Yüz Dönüm Ormanı'nda rüzgarın estiği, Pooh ve Piglet'in dostluklarını sınayan harika bir gün."
  },
  {
    id: 3,
    title: "Bölüm 3: Winnie the Pooh ve Zıpzıp Tigger",
    originalName: "Winnie the Pooh and Tigger Too",
    duration: "23:55",
    videoId: "SgM_mG8p9b0",
    defaultNote: "Halk arasında zıplama şampiyonu Tigger'ın ormana neşe saçtığı ve ağaçta mahsur kaldığı unutulmaz anlar."
  },
  {
    id: 4,
    title: "Bölüm 4: Piglet'in Korkularını Aştığı Gün",
    originalName: "Piglet's Big Heroic Adventure",
    duration: "22:10",
    videoId: "U5pPlD8H_O0",
    defaultNote: "Zarif, duyarlı, ürkek küçük dostumuz Piglet'in hepimizden daha cesur bir kalbe sahip olduğunu kanıtladığı gün."
  },
  {
    id: 5,
    title: "Bölüm 5: Bilge Eeyore'un Mutlu Günü",
    originalName: "A Day For Eeyore",
    duration: "21:40",
    videoId: "as0pLa76T68",
    defaultNote: "Her zaman biraz mahzun olan sevimli eşeğimiz Eeyore'un kayıp kuyruğunu bulduğumuz ve onun için parti yaptığımız gün."
  },
  {
    id: 6,
    title: "Bölüm 6: Büyük Bal Hırsızı Gizemi",
    originalName: "The Great Honey Pot Mystery",
    duration: "20:50",
    videoId: "g3H9_A7O0_M",
    defaultNote: "Pooh'un ballarının nereye kaybolduğunu bulmak için kurduğumuz sevimli, eğlenceli ve komik tuzaklar."
  },
  {
    id: 7,
    title: "Bölüm 7: Tigger Ormanlar Kralı Oluyor",
    originalName: "King of the Beasts",
    duration: "19:30",
    videoId: "SgM_mG8p9b0",
    defaultNote: "Tigger'ın kendisini vahşi ormanın aslanı zannederek masalsı kükremelerle herkesi güldürdüğü neşeli bölüm."
  },
  {
    id: 8,
    title: "Bölüm 8: Rabbitt'in Özel Lahana Bahçesi",
    originalName: "Rabbit's Perfect Garden Plan",
    duration: "22:15",
    videoId: "U5pPlD8H_O0",
    defaultNote: "Detaycı, titiz ve komik tavşan dostumuzun havuçları korumak için yaptığı absürt stratejiler."
  },
  {
    id: 9,
    title: "Bölüm 9: Baykuş'un Aile Soy Ağacı Masalı",
    originalName: "Owl's Grand Family Tree",
    duration: "18:45",
    videoId: "as0pLa76T68",
    defaultNote: "Yüz Dönüm Ormanı'nın en entelektüel ama bir o kadar dalgın üyesi Baykuş'un saatlerce anlattığı kahkaha dolu aile anıları."
  },
  {
    id: 10,
    title: "Bölüm 10: Sonsuza Kadar En İyi Dostlar",
    originalName: "Forever and Ever Friends",
    duration: "26:10",
    videoId: "g3H9_A7O0_M",
    defaultNote: "Pooh ve Christopher Robin'in el ele verip 'Biz her nerede olursak olalım, hep birlikteyiz' dedikleri muhteşem final."
  }
];

const ARIEL_EPISODES: CartoonEpisode[] = [
  {
    id: 1,
    title: "Bölüm 1: Balina Spotty ve İlk Melodi",
    originalName: "Whale of a Tale",
    duration: "24:50",
    videoId: "SXKlJuO07RE",
    defaultNote: "Ariel'in sevimli kayıp yavru katil balina Spotty ile dost olup kraliyet sarayını neşelendirdiği büyülü dalgalar."
  },
  {
    id: 2,
    title: "Bölüm 2: Sebastian Sirkin Yıldızı",
    originalName: "The Great Sebastian",
    duration: "23:15",
    videoId: "GC_mV1IpjWA",
    defaultNote: "Huysuz ama sadık saray yengecimiz Sebastian'ın okyanus dışı gösterilerde şöhret olmaya çalıştığı komik macera."
  },
  {
    id: 3,
    title: "Bölüm 3: Vahşi Denizatı Stormy",
    originalName: "Stormy the Wild Seahorse",
    duration: "22:40",
    videoId: "tXmLRHnoSAs",
    defaultNote: "Özgür ruhlu Ariel'in hiç kimsenin evcilleştiremediği fırtına saçlı mavi denizatı ile bağ kurduğu derin sular."
  },
  {
    id: 4,
    title: "Bölüm 4: Denizlerin Sokak Çocuğu",
    originalName: "Urchin",
    duration: "23:05",
    videoId: "VxMrZ8Msz_Y",
    defaultNote: "Yalnız yaşayan yaramaz deniz erkeği Urchin'in Ariel ve Flounder ile gerçek aile sıcaklığını keşfettiği büyülü hikaye."
  },
  {
    id: 5,
    title: "Bölüm 5: İki Kat Kahkaha Köpük Kedisi",
    originalName: "Double Bubble",
    duration: "21:50",
    videoId: "SXKlJuO07RE",
    defaultNote: "Ariel'in sevimli ikiz yaramaz deniz canlılarına bakıcılık yapmaya çalışırken sarayı alt üst ettiği tatlı kaos."
  },
  {
    id: 6,
    title: "Bölüm 6: Şişedeki Sihirli Mesaj",
    originalName: "Message in a Bottle",
    duration: "22:15",
    videoId: "GC_mV1IpjWA",
    defaultNote: "Kovukların derinliğinden gelen bir yardım mektubunu okuyarak Ariel ve dostlarının çıktığı gizli hazine seyahati."
  },
  {
    id: 7,
    title: "Bölüm 7: Kral Triton'un Kayıp Tacı",
    originalName: "The Lost Crown of Triton",
    duration: "23:45",
    videoId: "tXmLRHnoSAs",
    defaultNote: "Okyanus güçlerinin sembolü olan asil tacın kaybolması üzerine denizlerin altındaki nefes kesen heyecan zinciri."
  },
  {
    id: 8,
    title: "Bölüm 8: Ariel'in Altın Saç Tokası",
    originalName: "Ariel's Golden Hair Clip",
    duration: "20:10",
    videoId: "VxMrZ8Msz_Y",
    defaultNote: "İnsan dünyasına ait olan parlak, gizemli bir tokanın Ariel'in eline geçmesiyle başlayan meraklı serüven."
  },
  {
    id: 9,
    title: "Bölüm 9: Flounder'ın Muazzam Cesareti",
    originalName: "Flounder's Super Bravery",
    duration: "21:20",
    videoId: "SXKlJuO07RE",
    defaultNote: "En küçük gölgelerden bile ürken tombul sarı balık Flounder'ın Ariel'i köpekbalıklarından kurtardığı o şanlı zafer."
  },
  {
    id: 10,
    title: "Bölüm 10: Denizden Karaya İlk Gizli Adım",
    originalName: "Land Adventure First Dreams",
    duration: "25:00",
    videoId: "GC_mV1IpjWA",
    defaultNote: "Erik ile tanışmadan çok önce, Ariel'in kıyıdaki kayaların arkasından insan dünyasının ışıklarını izlediği melankolik başlangıç."
  }
];

export default function Playlist({ theme }: { theme: AppTheme }) {
  const episodes = theme === 'pooh' ? POOH_EPISODES : ARIEL_EPISODES;
  const [currentEpisode, setCurrentEpisode] = useState<CartoonEpisode>(episodes[0]);
  
  // Custom user diary about cartoon watch list (reviews, ratings, watched)
  // Saved cleanly in localStorage key: 'anniversary_cartoon_reviews_v2'
  const [reviews, setReviews] = useState<Record<string, { note: string; rating: number; watched: boolean }>>({});
  const [customNote, setCustomNote] = useState('');
  const [customRating, setCustomRating] = useState(5);
  const [customWatched, setCustomWatched] = useState(false);

  // Storing customizable, user-filled Youtube Video links/IDs
  const [customVideoIds, setCustomVideoIds] = useState<Record<string, string>>({});
  const [editorVideoLink, setEditorVideoLink] = useState('');
  const [showVideoEditor, setShowVideoEditor] = useState(false);

  const currentKey = `${theme}-${currentEpisode.id}`;
  const activeVideoId = customVideoIds[currentKey] || currentEpisode.videoId;
  const savedReview = reviews[currentKey];

  // Sync to theme shifts
  useEffect(() => {
    setCurrentEpisode(episodes[0]);
  }, [theme]);

  // Load custom video IDs and reviews on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('anniversary_cartoon_reviews_v2');
      if (stored) {
        setReviews(JSON.parse(stored));
      }
      
      const storedVideoIds = localStorage.getItem('anniversary_custom_video_ids_v2');
      if (storedVideoIds) {
        setCustomVideoIds(JSON.parse(storedVideoIds));
      }
    } catch (e) {
      console.error("Error loading playlist localstorage settings", e);
    }
  }, []);

  // Update form inputs when current episode shifts
  useEffect(() => {
    const key = `${theme}-${currentEpisode.id}`;
    const activeReview = reviews[key];
    if (activeReview) {
      setCustomNote(activeReview.note);
      setCustomRating(activeReview.rating);
      setCustomWatched(activeReview.watched);
    } else {
      setCustomNote('');
      setCustomRating(5);
      setCustomWatched(false);
    }
  }, [currentEpisode, reviews, theme]);

  const handleSaveReview = () => {
    const key = `${theme}-${currentEpisode.id}`;
    const updatedReviews = {
      ...reviews,
      [key]: {
        note: customNote,
        rating: customRating,
        watched: customWatched
      }
    };
    setReviews(updatedReviews);
    localStorage.setItem('anniversary_cartoon_reviews_v2', JSON.stringify(updatedReviews));
  };

  const handleSelectEpisode = (ep: CartoonEpisode) => {
    setCurrentEpisode(ep);
  };

   return (
    <div id="playlist-section" className="glass-panel p-6 rounded-3xl w-full flex flex-col gap-6 relative overflow-hidden animate-fade-in-up">
      
      {/* Decorative background light */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--theme-primary)]/10 rounded-full blur-2xl pointer-events-none" />
      
      {/* Module Header and metadata block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--theme-card-border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
            <Film className="animate-spin" style={{ animationDuration: '12s' }} size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif flex items-center gap-1.5 text-[var(--theme-text)]">
              {theme === 'pooh' ? 'Winnie the Pooh Çizgi Sineması' : 'Ariel Denizaltı Tiyatrosu'}
              <Sparkles size={16} className="text-amber-500 animate-pulse" />
            </h2>
            <p className="text-xs text-[var(--theme-text)] opacity-75">Birlikte izleyebileceğimiz, kişisel anı notlarımızı ekleyebileceğimiz 10 Harika Çizgi Film Bölümü</p>
          </div>
        </div>

        <div className="text-xs px-3.5 py-1.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold flex items-center gap-1.5 self-start md:self-auto border border-[var(--theme-card-border)]">
          ✨ Bölüm {currentEpisode.id} Seçili
        </div>
      </div>

      {/* Main Grid: Left for Player & Diary, Right for Direct Vertical Episode Selection List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Cartoon Video Box (8/12 area) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-panel border-2 border-[var(--theme-card-border)] shadow-md group">
            <iframe
              id="cartoon-video-player"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
              title={currentEpisode.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Interactive Link Customizer */}
          <div className="bg-slate-100/60 p-3 rounded-xl border border-slate-200/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase select-none">Video açılmıyor mu veya başka bir bölüm mü izlemek istersiniz sevgilim?</span>
              <button
                type="button"
                onClick={() => setShowVideoEditor(!showVideoEditor)}
                className="text-[10px] text-[var(--theme-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {showVideoEditor ? 'Güncellemeyi Kapat' : 'YouTube Linkini Değiştir 🔗'}
              </button>
            </div>

            {showVideoEditor && (
              <div className="flex gap-2 items-center animate-fade-in-up pt-1">
                <input
                  type="text"
                  value={editorVideoLink}
                  onChange={(e) => setEditorVideoLink(e.target.value)}
                  placeholder="Başka bir YouTube linki veya video ID'si yapıştır..."
                  className="flex-grow p-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] font-semibold text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!editorVideoLink.trim()) return;
                    let parsedId = editorVideoLink.trim();
                    // Parse Youtube standard link
                    if (parsedId.includes('v=')) {
                       parsedId = parsedId.split('v=')[1]?.split('&')[0] || parsedId;
                    } else if (parsedId.includes('youtu.be/')) {
                       parsedId = parsedId.split('youtu.be/')[1]?.split('?')[0] || parsedId;
                    } else if (parsedId.includes('embed/')) {
                       parsedId = parsedId.split('embed/')[1]?.split('?')[0] || parsedId;
                    }
                    
                    const updatedVideoIds = {
                      ...customVideoIds,
                      [currentKey]: parsedId
                    };
                    setCustomVideoIds(updatedVideoIds);
                    localStorage.setItem('anniversary_custom_video_ids_v2', JSON.stringify(updatedVideoIds));
                    setEditorVideoLink('');
                    setShowVideoEditor(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-[var(--theme-primary)] text-white text-[10px] font-bold cursor-pointer hover:opacity-90 active:scale-95 border-none shrink-0"
                >
                  Linki Kaydet
                </button>
              </div>
            )}
          </div>

          {/* Episode description with visual card */}
          <div className="bg-white/30 border border-[var(--theme-card-border)] p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-white/40 pb-2">
              <h3 className="font-bold text-sm text-[var(--theme-text)] font-serif">
                {currentEpisode.title}
              </h3>
              <span className="text-[10px] opacity-70 italic font-medium font-mono text-[var(--theme-text)]">
                &quot;{currentEpisode.originalName}&quot; ({currentEpisode.duration})
              </span>
            </div>
            <p className="text-xs text-slate-705 leading-relaxed font-semibold">
              {currentEpisode.defaultNote}
            </p>
          </div>

          {/* Dynamic Interactive Watch Diary (Our memories form inside) */}
          <div className="flex flex-col gap-4 bg-white/20 p-5 rounded-2xl border border-[var(--theme-card-border)]">
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1.5">
                <Star size={12} className="fill-current animate-pulse text-[var(--theme-primary)]" />
                Bu Bölüme Özel Bizim Anı Defterimiz
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Rating and checkbox */}
                <div className="space-y-4">
                  {/* Checkbox for watched status */}
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-slate-200/40 cursor-pointer select-none hover:bg-white/60 transition-colors">
                    <input
                      type="checkbox"
                      checked={customWatched}
                      onChange={(e) => setCustomWatched(e.target.checked)}
                      className="w-4.5 h-4.5 rounded text-[var(--theme-primary)] focus:ring-[var(--theme-primary)] border-slate-300 cursor-pointer"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800">Beraber İzledik Mi?</span>
                      <span className="text-[10px] opacity-70">Paylaştıysanız işaretle sevgilim.</span>
                    </div>
                  </label>

                  {/* Custom Interactive Hot Stars */}
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase block text-slate-600">Bölüme Aşk Puanımız</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setCustomRating(star)}
                          className={`text-xl hover:scale-110 active:scale-95 transition-transform cursor-pointer bg-transparent border-none p-0.5 ${
                            star <= customRating ? 'text-amber-500' : 'text-slate-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="text-[10px] font-mono font-bold text-amber-600 opacity-90 pl-1">{customRating} / 5 Yıldız</span>
                    </div>
                  </div>
                </div>

                {/* Right: Text area note */}
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold uppercase block text-slate-600">Bölüme Dair Özel Hatıra Notumuz</label>
                  <textarea
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Samsun sahilinde mısır patlatıp sular eşliğinde gülüşmüştük..."
                    className="w-full h-24 p-3 rounded-xl glass-input text-xs focus:ring-1 focus:ring-[var(--theme-primary)] focus:outline-none resize-none font-medium text-slate-800 bg-white/50"
                    maxLength={400}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[var(--theme-card-border)] flex flex-col md:flex-row md:items-center justify-between gap-3 font-semibold">
              <div className="flex-grow text-left">
                {savedReview && savedReview.watched && (
                  <div className="flex items-center gap-1.5 text-[10px] text-green-600 bg-green-500/10 p-2 rounded-xl font-bold">
                    <CheckCircle size={12} />
                    <span>Bu bölüm kalbimize kaydedildi ve beraber izlendi olarak işaretlendi! 💖</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleSaveReview}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white text-xs font-bold shadow-md hover:opacity-95 active:scale-95 duration-150 transition-transform cursor-pointer border-none flex items-center justify-center gap-1.5 shrink-0"
              >
                <Heart size={13} className="fill-current animate-pulse" />
                Bölüm Anılarını Kaydet ({theme === 'pooh' ? 'Winnie canlanıyor' : 'Kabuk parlıyor'})
              </button>
            </div>
          </div>
        </div>

        {/* REBUILT DIRECT VERTICAL PLAYLIST SELECTOR (4/12 area) */}
        <div className="lg:col-span-4 bg-white/30 border border-[var(--theme-card-border)] rounded-2xl p-4 flex flex-col gap-3 h-full">
          <div className="border-b border-[var(--theme-card-border)] pb-2.5 text-left">
            <h3 className="text-xs font-serif font-bold tracking-wider text-[var(--theme-text)] uppercase flex items-center gap-1.5 select-none">
              <Film size={12} className="text-[var(--theme-primary)] shrink-0 animate-pulse" />
              Bölüm Seçim Listesi (1 - 10)
            </h3>
            <p className="text-[10px] text-[var(--theme-text)] opacity-75 mt-0.5">İzlemek istediğin bölüme direkt tıkla sevgilim:</p>
          </div>

          <div className="flex flex-col gap-2 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[var(--theme-primary)]/20 hover:scrollbar-thumb-[var(--theme-primary)]/40 scrollbar-track-transparent">
            {episodes.map((ep) => {
              const isSelected = currentEpisode.id === ep.id;
              const revKey = `${theme}-${ep.id}`;
              const isRead = reviews[revKey]?.watched;

              return (
                <button
                  key={ep.id}
                  onClick={() => handleSelectEpisode(ep)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-md font-medium translate-x-1'
                      : 'bg-white/60 border-slate-200/50 hover:bg-white/90 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  {/* Left Indicator Number */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]'
                  }`}>
                    {ep.id < 10 ? `0${ep.id}` : ep.id}
                  </div>

                  {/* Mid Title & original name */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <p className="font-serif font-bold text-xs truncate leading-snug">{ep.title}</p>
                      {isRead && (
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold select-none whitespace-nowrap shrink-0 ${
                          isSelected ? 'bg-white text-[var(--theme-primary)] font-extrabold' : 'bg-green-500 text-white'
                        }`}>
                          ✔ İZLENDİ
                        </span>
                      )}
                    </div>
                    <p className={`text-[9px] opacity-80 mt-0.5 truncate ${isSelected ? 'text-[var(--theme-bg)]' : 'text-slate-500'}`}>
                      {ep.originalName}
                    </p>
                    <p className={`text-[9px] font-mono mt-0.5 font-bold ${isSelected ? 'text-amber-200' : 'text-[var(--theme-primary)]/95'}`}>
                      Süre: {ep.duration}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sourced badge for safety */}
          <div className="bg-slate-50/75 p-2 rounded-xl text-center text-[9px] font-semibold text-slate-500 opacity-90 border border-slate-200/30">
            🎬 YouTube Entegre Canlı Yayın Sistemi
          </div>
        </div>

      </div>

    </div>
  );
}
