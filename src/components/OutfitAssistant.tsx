import { useState } from 'react';
import { CloudSun, Sparkles, Shirt, Sparkle, ShoppingBag, Eye, Heart } from 'lucide-react';
import { AppTheme } from '../types';

interface ColorCircle {
  hex: string;
  name: string;
}

interface AssistData {
  assistantName: string;
  recommendation: string;
  colors: ColorCircle[];
  accessories: string[];
  vibe: string;
}

const THEME_ASSISTS: Record<AppTheme, AssistData> = {
  pooh: {
    assistantName: "Piglet'in Asistanı",
    recommendation: "Hava çok tatlı, o sevdiğin tatlı sarı elbiseyi giymelisin sevgilim! Yanına küçük bir hırka almayı unutma. 🧸",
    colors: [
      { hex: "#FFD166", name: "Bal Sarısı" },
      { hex: "#FF9F9F", name: "Piglet Pembesi" },
      { hex: "#A8DADC", name: "Orman Yeşili" }
    ],
    accessories: ["Tatlı Arı Motifli Toka", "Krem Rengi Mini Hırka", "İnci Küpeler"],
    vibe: "Sıcak, Sevimli ve Masalsı"
  },
  ariel: {
    assistantName: "Flounder'ın Asistanı",
    recommendation: "Denizler ısındı, rüzgarlar sakin! Bugün efil efil, uçușan mercan rengi elbiseni giyme zamanı sevgilim! 🧜‍♀️",
    colors: [
      { hex: "#26C6DA", name: "Okyanus Mavisi" },
      { hex: "#FF8A65", name: "Mercan Kırmızısı" },
      { hex: "#BA68C8", name: "Deniz Shell Moru" }
    ],
    accessories: ["Deniz Kabuğu Kolye", "Göz Kamaştıran Hasır Şapka", "Cam Sörf Bileklik"],
    vibe: "Serin, Ferah ve Özgür"
  }
};

export default function OutfitAssistant({ theme }: { theme: AppTheme }) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const data = THEME_ASSISTS[theme];

  const handleCopyColor = (color: ColorCircle) => {
    setCopiedColor(color.name);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div id="wardrobe-section" className="glass-panel p-6 rounded-3xl w-full flex flex-col gap-5 relative overflow-hidden animate-fade-in-up delay-400">
      
      {/* Mini glowing ornament */}
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[var(--theme-primary)]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--theme-card-border)] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-lg">
            <Shirt size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg font-serif">Akıllı Kıyafet Asistanı</h3>
            <p className="text-[11px] opacity-75">Hava durumuna göre en tatlı kombin rehberin</p>
          </div>
        </div>

        {/* Samsun Weather Widget */}
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-xl border border-[var(--theme-card-border)] shadow-xs select-none">
          <CloudSun className="text-[var(--theme-primary)] animate-pulse" size={16} />
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-tight uppercase">Samsun Türkiye</p>
            <p className="text-[9px] opacity-75 font-mono">22°C • Parçalı Bulutlu</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        
        {/* Recommendation bubble */}
        <div className="space-y-3.5 bg-white/10 p-4 rounded-2xl border border-[var(--theme-card-border)] relative">
          
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--theme-secondary)] animate-ping" />
            <h4 className="font-bold text-sm text-[var(--theme-primary)] flex items-center gap-1 font-serif">
              {data.assistantName}
              <Sparkles size={12} />
            </h4>
          </div>

          <p className="text-xs md:text-sm leading-relaxed opacity-95">
            &quot;{data.recommendation}&quot;
          </p>

          <div className="flex items-center justify-between text-[10px] opacity-50 pt-2 border-t border-[var(--theme-card-border)]/50">
            <span>Önerilen Tarz: <span className="font-bold text-[var(--theme-text)]">{data.vibe}</span></span>
            <Sparkle size={10} className="text-[var(--theme-primary)]" />
          </div>
        </div>

        {/* Accessoire & Color palette */}
        <div className="space-y-4">
          
          {/* Colors palette */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1 block select-none">
              <ShoppingBag size={11} />
              Günün Renk Kombini
            </span>
            
            <div className="flex items-center gap-3">
              {data.colors.map((c, idx) => (
                <button
                  key={c.hex}
                  onClick={() => handleCopyColor(c)}
                  className="group flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-full border border-black/10 shadow-md group-hover:scale-110 active:scale-95 duration-200 transition-all relative flex items-center justify-center text-white"
                    style={{ backgroundColor: c.hex }}
                  >
                    <Heart size={10} className="opacity-0 group-hover:opacity-100 fill-current text-white/80 transition-opacity" />
                  </div>
                  <span className="text-[9px] opacity-75 group-hover:opacity-100 font-medium">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>

            {copiedColor && (
              <span className="text-[9px] text-[var(--theme-secondary)] font-bold block animate-fade-in-up">
                🌸 {copiedColor} kombine eklendi!
              </span>
            )}
          </div>

          {/* Accessoires List */}
          <div className="space-y-1 bg-white/10 p-2.5 rounded-xl border border-[var(--theme-card-border)]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Tamamlayıcı Aksesuarlar
            </span>
            <ul className="space-y-1">
              {data.accessories.map((acc, index) => (
                <li key={index} className="text-[11px] flex items-center gap-2 opacity-90">
                  <span className="w-1 h-1 rounded-full bg-[var(--theme-primary)]" />
                  <span>{acc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
