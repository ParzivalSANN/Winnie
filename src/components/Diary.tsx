import { useState, useEffect } from 'react';
import { BookOpen, Mic, MicOff, Plus, AlertCircle, Sparkles, Heart, Trash2 } from 'lucide-react';
import { AppTheme, Mood, DiaryEntry } from '../types';

// Theme specific moods
const POOH_MOODS: Mood[] = [
  { id: 'pooh-happy', emoji: '🍯', label: 'Mutlu Pooh', character: 'Winnie' },
  { id: 'pooh-tigger', emoji: '🐯', label: 'Enerjik Tigger', character: 'Tigger' },
  { id: 'pooh-piglet', emoji: '🐷', label: 'Duygusal Piglet', character: 'Piglet' },
  { id: 'pooh-eeyore', emoji: '🐴', label: 'Melankolik Eeyore', character: 'Eeyore' },
];

const ARIEL_MOODS: Mood[] = [
  { id: 'ariel-flounder', emoji: '🐠', label: 'Neşeli Flounder', character: 'Flounder' },
  { id: 'ariel-sebastian', emoji: '🦀', label: 'Huysuz Sebastian', character: 'Sebastian' },
  { id: 'ariel-ariel', emoji: '🧜‍♀️', label: 'Özgür Ariel', character: 'Ariel' },
  { id: 'ariel-triton', emoji: '🔱', label: 'Asil Kral Triton', character: 'Triton' },
];

interface DiaryProps {
  theme: AppTheme;
}

export default function Diary({ theme }: DiaryProps) {
  const [noteText, setNoteText] = useState('');
  const [selectedMoodId, setSelectedMoodId] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Get mood options based on theme
  const moods = theme === 'pooh' ? POOH_MOODS : ARIEL_MOODS;

  // Auto-set the first mood when theme changes
  useEffect(() => {
    setSelectedMoodId(moods[0].id);
  }, [theme]);

  // Read saved diary entries from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('anniversary_diary_entries');
      if (stored) {
        setEntries(JSON.parse(stored));
      } else {
        setEntries([]);
        localStorage.setItem('anniversary_diary_entries', JSON.stringify([]));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update voice timer when recording is active
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
  };

  const saveEntry = () => {
    if (!noteText.trim()) {
      setErrorMessage('Lütfen bugün hissettiğin şeyleri veya bir mesaj yaz sevgilim.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      content: noteText.trim(),
      moodId: selectedMoodId,
      date: new Date().toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isVoiceRecorded: isRecording,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('anniversary_diary_entries', JSON.stringify(updated));

    // Reset Form
    setNoteText('');
    setIsRecording(false);
    // Alert feedback natively styled
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter((ent) => ent.id !== id);
    setEntries(updated);
    localStorage.setItem('anniversary_diary_entries', JSON.stringify(updated));
  };

  const getMoodEmojiAndLabel = (id: string) => {
    const allMoods = [...POOH_MOODS, ...ARIEL_MOODS];
    const found = allMoods.find((m) => m.id === id);
    return found ? { emoji: found.emoji, label: found.label } : { emoji: '💖', label: 'Romantik' };
  };

  return (
    <div id="diary-section" className="glass-panel p-6 rounded-3xl w-full flex flex-col gap-6 relative overflow-hidden animate-fade-in-up delay-200">
      
      {/* Module Header */}
      <div className="flex items-center gap-3 border-b border-[var(--theme-card-border)] pb-4">
        <div className="p-2.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl">
          <BookOpen size={24} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-serif">Kişisel Hatıra Günlüğümüz</h2>
          <p className="text-xs opacity-75">Günün hissi, notlar ve sevgiline özel ses kayıtları</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editor Area (7 columns) */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-4">
          
          {/* Mood Selection Row */}
          <div className="space-y-2">
            <span className="text-xs font-semibold opacity-80 block flex items-center gap-1.5">
              <Sparkles size={12} className="text-[var(--theme-primary)]" />
              Bugünkü Karakter Ruh Halin Ne Sevgilim?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {moods.map((m) => {
                const isSelected = selectedMoodId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMoodId(m.id)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] font-bold shadow-md scale-102 font-serif'
                        : 'bg-white/30 border-[var(--theme-card-border)] hover:bg-white/50 hover:border-[var(--theme-primary)]/50'
                    }`}
                  >
                    <span className="text-base">{m.emoji}</span>
                    <span className="truncate">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Area Input */}
          <div className="relative">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Bugün ne hissediyorsun sevgilim? Günlük duygularını veya 5. yılımıza dair tatlı hislerini buraya dök..."
              maxLength={1000}
              className="w-full h-44 p-4 rounded-2xl glass-input placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] text-sm resize-none pr-12 focus:bg-white/65 transition-all shadow-inner leading-relaxed"
            />
            {noteText && (
              <span className="absolute bottom-3 right-4 text-[10px] opacity-40 font-mono">
                {noteText.length}/1000
              </span>
            )}
          </div>

          {/* Error Message if Empty */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs animate-pulse">
              <AlertCircle size={14} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Interactive Row: Recording Button & Add Button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Recording Action and Animation */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleRecordToggle}
                id="voice-recorder-btn"
                className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 relative cursor-pointer ${
                  isRecording 
                    ? 'bg-red-500 text-white pulse-mic shadow-lg' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300/40 active:scale-95'
                }`}
                title={isRecording ? "Kaydı Durdur" : "Sesli Not Ekle"}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  {isRecording ? 'Anı Defterine Sesli Not Ekle...' : 'Ses Kaydı Başlat'}
                </span>
                <span className="text-[10px] opacity-50">
                  {isRecording 
                    ? `Kırmızı mikrofon yanıp sönüyor (Kayıt: 00:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds})` 
                    : 'Sesli hislerini listene eklemek için tıkla'
                  }
                </span>
              </div>
            </div>

            {/* Note Save Button */}
            <button
              onClick={saveEntry}
              id="save-diary-entry-btn"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white font-semibold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 duration-200 transition-transform cursor-pointer shadow-md shadow-[var(--theme-primary)]/15 border-none"
            >
              <Plus size={16} />
              <span>Yıldönümü Günlüğüne Kaydet</span>
            </button>
          </div>
        </div>

        {/* History Area (5 columns) */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-3 min-w-0">
          <div className="glass-panel p-4 rounded-2xl border border-[var(--theme-card-border)] flex-grow flex flex-col h-full bg-white/25">
            <span className="text-xs font-bold text-[var(--theme-primary)] uppercase tracking-wider pb-3 border-b border-[var(--theme-card-border)] flex justify-between items-center select-none">
              <span>Geçmiş Aşk Notları ({entries.length})</span>
              <Heart size={12} className="fill-[var(--theme-secondary)] text-[var(--theme-secondary)] animate-pulse" />
            </span>

            {/* Note Records Scroll Container */}
            <div className="space-y-3 mt-3 overflow-y-auto max-h-[300px] flex-grow pr-1">
              {entries.length === 0 ? (
                <div className="py-12 text-center opacity-40 text-xs">
                  Henüz bir not yazılmadı. İlk aşk notunu hemen kaydedebilirsin sevgilim!
                </div>
              ) : (
                entries.map((ent) => {
                  const moodInfo = getMoodEmojiAndLabel(ent.moodId);
                  return (
                    <div
                      key={ent.id}
                      className="p-3.5 rounded-xl bg-white/40 border border-[var(--theme-card-border)]/60 text-xs space-y-2 relative group hover:border-[var(--theme-primary)]/40 transition-colors"
                    >
                      {/* Note Info header */}
                      <div className="flex items-center justify-between gap-2 border-b border-[var(--theme-card-border)]/30 pb-1.5 opacity-90">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span>{moodInfo.emoji}</span>
                          <span className="text-[10px]">{moodInfo.label} Hali</span>
                        </div>
                        <span className="text-[10px] opacity-50 font-mono">{ent.date}</span>
                      </div>

                      {/* Content block */}
                      <p className="opacity-95 text-xs text-slate-700 leading-relaxed font-sans font-medium whitespace-pre-wrap break-words">
                        {ent.content}
                      </p>

                      {/* Voice note indicator */}
                      {ent.isVoiceRecorded && (
                        <div className="flex items-center gap-1 text-[10px] text-red-500 font-bold bg-red-500/5 px-2 py-0.5 rounded-full w-max">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                          <span>Ses Kayıt Ekidir</span>
                        </div>
                      )}

                      {/* Delete action button */}
                      <button
                        onClick={() => deleteEntry(ent.id)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-red-500/5 active:scale-95 duration-100 cursor-pointer"
                        title="Hafızayı sil"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
