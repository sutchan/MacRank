// app/components/Header.tsx v0.8.0
import React, { useContext } from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { Button } from '@/components/ui/button';

import Link from 'next/link';

interface HeaderProps {
  onScrollToSection: (id: string) => void;
  onOpenSettings: () => void;
  onOpenTradeIn: () => void;
}

const Header: React.FC<HeaderProps> = ({ onScrollToSection, onOpenSettings, onOpenTradeIn }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <header id="app-header" className="fixed w-full top-0 z-40 bg-frost-light dark:bg-frost-dark backdrop-blur-md border-b border-border transition-colors duration-500">
      <div id="header-container" className="max-w-[980px] mx-auto px-4 h-12 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
           <Link href="/" className="text-foreground opacity-80 hover:opacity-100 transition-opacity" aria-label="Home">
             <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary text-primary-foreground text-[10px] font-black tracking-tighter">MR</span>
           </Link>
           <span className="font-semibold text-foreground tracking-wide cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('appTitle')}</span>
        </div>

        <nav className="flex items-center gap-2 text-muted-foreground">
          <Button variant="ghost" size="sm" onClick={() => onScrollToSection('leaderboard-section')} className="hidden sm:flex font-medium">
            {t('leaderboard')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onScrollToSection('charts-section')} className="hidden sm:flex font-medium">
            {t('charts')}
          </Button>

          <div className="flex items-center gap-2 border-l border-border pl-3 ml-2">
             <Button
               variant="ghost"
               size="sm"
               onClick={onOpenTradeIn}
               className="flex items-center gap-1.5"
               aria-label={t('tradeIn')}
               title={t('tradeIn')}
             >
               <RotateCcw size={16} />
               <span className="hidden md:inline text-xs font-medium">{t('tradeIn')}</span>
             </Button>

             <Button
               variant="ghost"
               size="icon-sm"
               onClick={onOpenSettings}
               className="text-muted-foreground"
               aria-label={t('settings') as string}
             >
               <Settings size={16} />
             </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
