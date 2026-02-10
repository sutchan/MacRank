import React, { useContext } from 'react';
import { Settings } from 'lucide-react';
import { LanguageContext } from '../lib/translations';

interface HeaderProps {
  onScrollToSection: (id: string) => void;
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onScrollToSection, onOpenSettings }) => {
  const { t } = useContext(LanguageContext);

  return (
    <header className="fixed w-full top-0 z-40 bg-[rgba(251,251,253,0.8)] dark:bg-[rgba(22,22,23,0.8)] backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="max-w-[980px] mx-auto px-4 h-12 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
           <a href="/" className="text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 transition-opacity" aria-label="Home">
             <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 9.6c-.7 0-1.7-.5-1.7-1.7s1-2.2 2-2.3c.1 0 .2 0 .2 0-1-1.3-2.6-1.5-3.2-1.5-1.4 0-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-3 1-3.9 2.4-1.6 2.4-.4 5.9 1.1 8 1 1.4 2 2.9 3.4 2.9.7 0 1-.2 1.9-.2.9 0 1.1.2 1.9.2 1.3 0 2.2-1.3 3.1-2.6.9-1.3 1.3-2.7 1.3-2.7s-2.1-1-2.2-2.9zM15 4.6c.6-.7 1-1.8 1-2.8 0-.1 0-.3 0-.4-.9.1-2 .7-2.6 1.4-.6.6-1 1.6-1 2.6 0 .1 0 .3 0 .4 1-.1 2.1-.6 2.6-1.2z"/></svg>
           </a>
           <span className="font-semibold text-gray-900 dark:text-white tracking-wide cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('appTitle')}</span>
        </div>
        
        <nav className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
          <button onClick={() => onScrollToSection('leaderboard')} className="cursor-pointer hover:text-blue-500 transition-colors hidden sm:block font-medium">{t('leaderboard')}</button>
          <button onClick={() => onScrollToSection('charts')} className="cursor-pointer hover:text-blue-500 transition-colors hidden sm:block font-medium">{t('charts')}</button>
          
          <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-4">
             <button 
               onClick={onOpenSettings}
               className="hover:text-gray-900 dark:hover:text-white transition-colors" 
               aria-label="Settings"
             >
               <Settings size={16} />
             </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;