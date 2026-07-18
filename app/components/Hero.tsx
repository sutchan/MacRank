
// app/components/Hero.tsx v0.8.0
import React, { useContext } from 'react';
import { Share2, Zap } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroProps {
  onShare?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShare }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <div id="hero-section" className="relative text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-8 overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" aria-hidden="true"></div>

       <div className="flex justify-center mb-2">
         <Badge variant="default" className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
           <Zap size={10} fill="currentColor" aria-hidden="true" />
           <span>2025 Mac Performance Data Loaded</span>
         </Badge>
       </div>

       <div className="space-y-4">
         <h1 className="text-5xl md:text-7xl font-black tracking-tightest text-foreground drop-shadow-sm">
           {t('heroTitle')}
         </h1>
         <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
           {t('heroSubtitle')}
         </p>
       </div>

       {onShare && (
         <div className="flex justify-center pt-2">
            <Button
              variant="default"
              size="lg"
              onClick={onShare}
              className="group flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-300"
            >
              <Share2 size={18} className="group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
              <span>{t('share')}</span>
            </Button>
         </div>
       )}
    </div>
  );
};

export default Hero;
