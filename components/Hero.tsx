
import React, { useContext } from 'react';
import { Share2 } from 'lucide-react';
import { LanguageContext } from '../lib/translations';

interface HeroProps {
  onShare?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShare }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div id="hero-section" className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-2">
       <div className="space-y-4">
         <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
           {t('heroTitle')}
         </h1>
         <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
           {t('heroSubtitle')}
         </p>
       </div>

       {onShare && (
         <div className="flex justify-center">
            <button
              onClick={onShare}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
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
