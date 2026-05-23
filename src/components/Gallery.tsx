import React, { useState, useEffect } from 'react';
import { Camera, Heart, Sparkles, X, ChevronLeft, ChevronRight, ZoomIn, Plus, Trash2 } from 'lucide-react';
import { PhotoCard } from '../types';

export default function Gallery() {
  const [photos, setPhotos] = useState<PhotoCard[]>([]);
  const [activePhoto, setActivePhoto] = useState<PhotoCard | null>(null);
  
  // Create / Add Form States
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Read photos from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('anniversary_photos');
      if (stored) {
        setPhotos(JSON.parse(stored));
      } else {
        setPhotos([]);
        localStorage.setItem('anniversary_photos', JSON.stringify([]));
      }
    } catch (e) {
      console.error("Error reading gallery photos", e);
    }
  }, []);

  const openLightbox = (photo: PhotoCard) => {
    setActivePhoto(photo);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!activePhoto || photos.length === 0) return;
    const currentIndex = photos.findIndex((p) => p.id === activePhoto.id);
    let nextIndex = currentIndex;

    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % photos.length;
    } else {
      nextIndex = (currentIndex - 1 + photos.length) % photos.length;
    }
    setActivePhoto(photos[nextIndex]);
  };

  const handleAddPhoto = () => {
    if (!newUrl.trim() || !newCaption.trim() || !newDate.trim()) {
      setErrorMsg('Lütfen resim adresi (URL), fotoğraf notu ve tarihi boş bırakma sevgilim.');
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    // Direct url fallback suggestion or validator
    const randomRotation = Math.floor(Math.random() * 8) - 4; // between -4 and +4 degrees

    const created: PhotoCard = {
      id: Date.now().toString(),
      url: newUrl.trim(),
      caption: newCaption.trim(),
      date: newDate.trim(),
      rotation: randomRotation === 0 ? 2 : randomRotation,
    };

    const updated = [created, ...photos];
    setPhotos(updated);
    localStorage.setItem('anniversary_photos', JSON.stringify(updated));

    // Reset Form
    setNewUrl('');
    setNewCaption('');
    setNewDate('');
    setIsAdding(false);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    localStorage.setItem('anniversary_photos', JSON.stringify(updated));
    if (activePhoto?.id === id) {
      setActivePhoto(null);
    }
  };

  return (
    <div id="gallery-section" className="glass-panel p-6 rounded-3xl w-full flex flex-col gap-6 relative overflow-hidden animate-fade-in-up">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[var(--theme-secondary)]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="flex items-center justify-between border-b border-[var(--theme-card-border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-xl">
            <Camera size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-serif">Aşk Defterimizden Kareler</h2>
            <p className="text-xs opacity-75">Sizin yükleyeceğiniz polaroid anılar, gezip biriktirdiğiniz saniyeler</p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-full bg-[var(--theme-primary)] text-white text-xs font-bold flex items-center gap-1.5 shadow-md border-none hover:opacity-95 active:scale-95 duration-150 transition-transform cursor-pointer"
        >
          {isAdding ? 'Fotoğrafları Gör' : 'Yeni Fotoğraf Ekle'}
          <Plus size={13} className={`transform transition-transform ${isAdding ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {isAdding ? (
        /* Create New Photo Card form panel */
        <div className="bg-white/30 p-5 rounded-2xl border border-[var(--theme-card-border)] animate-fade-in-up space-y-4 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1 select-none">
            <Sparkles size={12} />
            Pristine Polaroid Hatırası Yükle
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase">Fotoğraf Adresi (Direct Image URL)</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/... veya Imgur linki"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]"
              />
              <span className="text-[9px] opacity-60 block">İpucu: Resim adresini kopyalayıp buraya yapıştır sevgilim.</span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase">Fotoğrafın Çekildiği Tarih</label>
              <input
                type="text"
                placeholder="Örn: 9 Ekim 2021 veya 14 Şubat 2024"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase">Fotoğrafın Altındaki Elyazısı Notun</label>
            <input
              type="text"
              placeholder="Örn: 'Samsun sahilinde el ele rüzgarla dans ederken...'"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full p-2.5 rounded-xl glass-input text-xs focus:outline-none focus:ring-1 focus:ring-[var(--theme-primary)]"
              maxLength={70}
            />
          </div>

          {errorMsg && (
            <div className="text-red-600 text-[11px] font-semibold bg-red-500/10 p-2.5 rounded-xl flex items-center gap-1 animate-pulse">
              <span>⚠️ {errorMsg}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAddPhoto}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white text-xs font-semibold flex items-center gap-1 border-none hover:opacity-95 active:scale-95 cursor-pointer shadow-md"
            >
              <Heart size={13} className="fill-current" />
              Polaroidi Askıya Çıkar
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer"
            >
              Vazgeç
            </button>
          </div>
        </div>
      ) : (
        /* Polaroid Grid with dynamic photos array */
        <div className="w-full">
          {photos.length === 0 ? (
            <div className="py-16 text-center select-none space-y-3">
              <div className="text-3xl animate-bounce">📸</div>
              <p className="text-xs font-medium text-pink-600 opacity-90 max-w-md mx-auto leading-relaxed">
                Aşk albümümüz bomboş sevgilim! Sağ üstteki <strong>'Yeni Fotoğraf Ekle'</strong> butonuna tıklayarak en güzel anlarımızın fotoğraflarını, Unsplash/Imgur adreslerini ve altına yazacağın o tatlı elyazısı notları ekleyebilirsin!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4 px-2">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo)}
                  id={`polaroid-${photo.id}`}
                  style={{ transform: `rotate(${photo.rotation}deg)` }}
                  className="polaroid-card bg-white p-4 pb-6 rounded-sm border border-slate-200/60 shadow-lg relative group cursor-zoom-in transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-20 hover:shadow-2xl"
                >
                  
                  {/* Soft decorative tape effect at top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/40 border border-amber-200/10 rotate-1 backdrop-blur-[1px] pointer-events-none shadow-[0_1px_3px_rgba(0,0,0,0.02)]" />

                  {/* Polaroid Image */}
                  <div className="aspect-square w-full rounded-xs overflow-hidden relative bg-slate-100 border border-slate-100">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" size={24} />
                    </div>
                  </div>

                  {/* Handwritten Label with cave font */}
                  <div className="pt-4 text-center relative">
                    <p 
                      className="text-lg text-[#2C1B18] font-medium leading-tight select-none" 
                      style={{ fontFamily: 'var(--font-family-hand)' }}
                    >
                      {photo.caption}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider block mt-1.5 uppercase font-semibold select-none">
                      {photo.date}
                    </span>

                    {/* Delete Icon on hover */}
                    <button
                      onClick={(e) => handleDeletePhoto(photo.id, e)}
                      className="absolute bottom-0 right-0 p-1 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer border-none"
                      title="Fotoğrafı sil"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal (Full-Screen) */}
      {activePhoto && photos.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-8">
          
          {/* Close Area click */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />

          {/* Close Button top-right */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full transition-all cursor-pointer z-10 border-none"
          >
            <X size={22} />
          </button>

          {/* Nav buttons */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full transition-all cursor-pointer z-10 border-none"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-full transition-all cursor-pointer z-10 border-none"
          >
            <ChevronRight size={24} />
          </button>

          {/* The Large Polaroid container */}
          <div className="bg-white p-5 pb-8 rounded-sm shadow-2xl relative max-w-lg w-full flex flex-col justify-center animate-fade-in-up items-center z-10">
            {/* Tape decoration */}
            <div className="absolute -top-4 w-24 h-8 bg-amber-100/50 backdrop-blur-[2px] border border-amber-200/20 rotate-1 shadow-sm pointer-events-none" />
            
            {/* Enlarged image */}
            <div className="w-full aspect-square rounded-xs overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Enlarged Caption label */}
            <div className="pt-5 text-center px-4">
              <p 
                className="text-2xl text-[#2C1B18] font-bold"
                style={{ fontFamily: 'var(--font-family-hand)' }}
              >
                {activePhoto.caption}
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-slate-400 font-mono tracking-wider font-semibold">
                <Heart size={10} className="fill-rose-500 text-rose-500 animate-pulse" />
                <span>KAYIT: {activePhoto.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
