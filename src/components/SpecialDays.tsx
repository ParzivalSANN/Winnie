import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Gift, Camera, Sparkles, Trash2, Plus, AlertCircle, Award } from 'lucide-react';
import { SpecialDay } from '../types';

const INITIAL_DAYS: SpecialDay[] = [];

const ICONS = ['💖', '💍', '🎬', '🌊', '🧁', '🧸', '🧜‍♀️', '✨', '✈️', '🍕'];

export default function SpecialDays() {
  const [specialDays, setSpecialDays] = useState<SpecialDay[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('💖');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('anniversary_special_days');
      if (stored) {
        setSpecialDays(JSON.parse(stored));
      } else {
        setSpecialDays([]);
        localStorage.setItem('anniversary_special_days', JSON.stringify([]));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveDay = () => {
    if (!title.trim() || !date || !note.trim()) {
      setErrorMessage('Lütfen başlık, tarih ve o güne özel küçük notu boş bırakma sevgilim.');
      setTimeout(() => setErrorMessage(''), 3500);
      return;
    }

    const newDay: SpecialDay = {
      id: Date.now().toString(),
      title: title.trim(),
      date,
      note: note.trim(),
      icon: selectedIcon,
    };

    const updated = [newDay, ...specialDays].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setSpecialDays(updated);
    localStorage.setItem('anniversary_special_days', JSON.stringify(updated));

    // Reset Form
    setTitle('');
    setDate('');
    setNote('');
    setSelectedIcon('💖');
    setIsAdding(false);
  };

  const handleDeleteDay = (id: string) => {
    const updated = specialDays.filter((d) => d.id !== id);
    setSpecialDays(updated);
    localStorage.setItem('anniversary_special_days', JSON.stringify(updated));
  };

  // Human friendly date helper
  const formatFriendlyDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div id="special-days-section" className="glass-panel p-6 rounded-3xl w-full flex flex-col gap-6 relative overflow-hidden animate-fade-in-up delay-400">
      
      {/* Decorative top pink light */}
      <div className="absolute top-0 right-1/4 w-32 h-12 bg-pink-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Section Title */}
      <div className="flex items-center justify-between border-b border-[var(--theme-card-border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-pink-500/10 text-pink-500 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif">Özel Kilometre Taşlarımız</h2>
            <p className="text-xs opacity-75">Tarihlerle aşkımızın kısa, gururlu ve mutlu kronolojisi</p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          id="toggle-add-milestone-btn"
          className="px-3.5 py-1.5 rounded-full bg-[var(--theme-primary)] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:opacity-90 active:scale-95 duration-150 cursor-pointer border-none"
        >
          {isAdding ? 'Listeyi Gör' : 'Yeni Tarih Ekle'}
          <Plus size={13} className={`transform transition-transform ${isAdding ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {isAdding ? (
        /* Expanded Input Card layout */
        <div className="bg-white/30 p-5 rounded-2xl border border-[var(--theme-card-border)] animate-fade-in-up space-y-4 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1 select-none">
            <Sparkles size={12} />
            Bir Yeni Miras Bırak
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase">Milat Başlığı (Örn: Tanışmamız)</label>
              <input
                type="text"
                placeholder="Özel günün adı nedir?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={45}
                className="w-full p-2.5 rounded-xl glass-input text-xs focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase">Tarih Seçimi</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]"
              />
            </div>
          </div>

          {/* Icon Choice Row */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase block">Mini İkon (Sembol Seç)</label>
            <div className="flex flex-wrap items-center gap-2">
              {ICONS.map((ico) => (
                <button
                  key={ico}
                  type="button"
                  onClick={() => setSelectedIcon(ico)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                    selectedIcon === ico 
                      ? 'bg-[var(--theme-primary)] border border-[var(--theme-primary)] scale-110 shadow-sm' 
                      : 'bg-white/40 border border-[var(--theme-card-border)]'
                  }`}
                >
                  {ico}
                </button>
              ))}
            </div>
          </div>

          {/* Brief sentiment note */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase">Bu Günü Unutulmaz Kılan Detaylar</label>
            <textarea
              placeholder="O gün neler oldu sevgilim? Neden bu kadar özeldik?..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={250}
              className="w-full h-20 p-3 rounded-xl glass-input text-xs focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)] resize-none"
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-1.5 text-red-600 text-[11px] font-semibold bg-red-500/10 p-2.5 rounded-xl animate-pulse">
              <AlertCircle size={13} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleSaveDay}
              id="confirm-add-milestone-btn"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white text-xs font-semibold flex items-center gap-1 border-none hover:opacity-95 active:scale-95 cursor-pointer shadow-md"
            >
              <Heart size={14} className="fill-current" />
              Tarihi Kaydet
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer transition-colors"
            >
              Vazgeç
            </button>
          </div>
        </div>
      ) : (
        /* Timeline Feed Layout */
        <div className="relative py-4">
          
          {/* Vertical central dotted indicator line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-[var(--theme-card-border)] transform -translate-x-1/2 hidden sm:block pointer-events-none" />

          {/* Cards collection */}
          <div className="space-y-8">
            {specialDays.map((day, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={day.id} 
                  className={`flex flex-col sm:flex-row items-stretch w-full relative group ${
                    isEven ? 'sm:justify-start' : 'sm:justify-end'
                  }`}
                >
                  {/* Central Node Dot icon */}
                  <div className="absolute left-6 md:left-1/2 top-5 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[var(--theme-primary)] shadow-md flex items-center justify-center text-sm z-10 select-none group-hover:scale-110 group-hover:bg-[var(--theme-primary)]/10 transition-transform duration-300 hidden sm:flex">
                    {day.icon}
                  </div>

                  {/* Bubble Container Card */}
                  <div className={`w-full sm:w-[45%] p-5 rounded-2xl border border-[var(--theme-card-border)] bg-white/40 text-xs space-y-2 relative transition-all duration-300 hover:shadow-lg hover:border-[var(--theme-primary)]-30 ${
                    isEven ? 'sm:mr-auto' : 'sm:ml-auto'
                  }`}>
                    
                    {/* Compact Date Tag */}
                    <div className="flex items-center justify-between gap-1.5 border-b border-[var(--theme-card-border)] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="sm:hidden text-base">{day.icon}</span>
                        <h4 className="font-bold text-sm text-[var(--theme-text)] font-serif group-hover:text-[var(--theme-primary)] transition-colors">
                          {day.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono opacity-60 font-semibold px-2 py-0.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-full">
                        {formatFriendlyDate(day.date)}
                      </span>
                    </div>

                    <p className="opacity-90 leading-relaxed font-sans font-medium text-slate-700">
                      {day.note}
                    </p>

                    <div className="flex items-center justify-between pt-1 opacity-50 text-[10px]">
                      <span className="flex items-center gap-0.5 font-bold uppercase tracking-wider text-[var(--theme-primary)]">
                        <Award size={10} />
                        Kilometre Taşı #{specialDays.length - idx}
                      </span>
                      
                      {/* Delete icon */}
                      <button
                        onClick={() => handleDeleteDay(day.id)}
                        className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-500/10 active:scale-95 duration-100 cursor-pointer"
                        title="Tarihi sil"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {specialDays.length === 0 && (
            <div className="py-12 text-center text-xs opacity-80 text-pink-600 font-medium">
              Kayıtlı herhangi bir özel dönüm noktası yok sevgilim. Yeni Tarih Ekle butonundan, beraberliğimizin miladı olan 09.10.2021 tarihini ve tüm o eşsiz günleri ekleyerek aşk kronolojimizi başlatabilirsin. 💕
            </div>
          )}
        </div>
      )}

    </div>
  );
}
