
// app/components/Hero.tsx v0.5.0
import React, { useContext } from 'react';
import { Share2, Zap } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';

interface HeroProps {
  onShare?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShare }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <div id="hero-section" className="relative text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-8 overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-blue-500/5 dark:bg-blue-400/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
       
       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
         <Zap size={10} fill="currentColor" />
         <span>2025 Mac Performance Data Loaded</span>
       </div>
       
       <div className="space-y-4">
         <h1 className="text-5xl md:text-7xl font-black tracking-tightest text-gray-900 dark:text-white drop-shadow-sm">
           {t('heroTitle')}
         </h1>
         <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
           {t('heroSubtitle')}
         </p>
       </div>

       {onShare && (
         <div className="flex justify-center pt-2">
            <button
              onClick={onShare}
              className="group flex items-center gap-2 px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Share2 size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>{t('share')}</span>
            </button>
         </div>
       )}
    </div>
  );
};

export default Hero;
