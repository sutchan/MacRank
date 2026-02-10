import React, { useContext } from 'react';
import { X, Moon, Sun, ChevronRight, RotateCcw, Github, Globe, ChevronDown } from 'lucide-react';
import { LanguageContext, languages, Language } from '../lib/translations';

interface SettingsModalProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, theme, toggleTheme }) => {
  const { t, language, setLanguage } = useContext(LanguageContext);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all preferences?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[rgba(50,50,50,0.5)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20 dark:border-white/10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#151516]">
           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings')}</h2>
           <button 
              onClick={onClose}
              aria-label={t('close')}
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
           >
              <X size={18} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
          
          {/* Section: General */}
          <div className="space-y-4">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">{t('general' as any) || 'General'}</h3>
             
             {/* Language Dropdown */}
             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1">{t('language')}</label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full appearance-none bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} &nbsp; {lang.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
             </div>

             {/* Theme Toggle */}
             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1">{t('appearance')}</label>
                <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex">
                    <button
                      onClick={() => theme === 'dark' && toggleTheme()}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === 'light' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Sun size={16} />
                      {t('theme_light')}
                    </button>
                    <button
                      onClick={() => theme === 'light' && toggleTheme()}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white shadow-sm' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Moon size={16} />
                      {t('theme_dark')}
                    </button>
                </div>
             </div>
          </div>

          {/* Section: Data & About */}
          <div className="space-y-4">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">{t('about' as any) || 'About'}</h3>
             
             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                
                {/* Reset Data */}
                <button 
                  onClick={handleReset}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 text-left group"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                         <RotateCcw size={16} />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-gray-900 dark:text-white">{t('reset_data' as any) || 'Reset Data'}</p>
                         <p className="text-xs text-gray-500">{t('reset_desc' as any) || 'Clear local cache'}</p>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                </button>

                {/* Source Code */}
                <a 
                  href="https://github.com/sutchan/MacRank" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left group"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
                         <Github size={16} />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{t('source_code' as any) || 'Source Code'}</p>
                   </div>
                   <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                </a>

             </div>

             <div className="text-center pt-2">
                <p className="text-xs text-gray-400 font-mono">MacRank v0.2.0</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;