import React, { useContext } from 'react';
import { X, Moon, Sun } from 'lucide-react';
import { LanguageContext, languages } from '../lib/translations';

interface SettingsModalProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, theme, toggleTheme }) => {
  const { t, language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[rgba(50,50,50,0.5)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20 dark:border-white/10">
        
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

        <div className="p-4 space-y-6">
          
          {/* Theme Section */}
          <div className="space-y-3">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('appearance')}</h3>
             <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    theme === 'light' 
                      ? 'bg-blue-50 border-blue-500 text-blue-600' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sun size={24} />
                  <span className="text-sm font-medium">{t('theme_light')}</span>
                </button>
                <button
                  onClick={() => theme === 'light' && toggleTheme()}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    theme === 'dark' 
                      ? 'bg-blue-900/20 border-blue-500 text-blue-400' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Moon size={24} />
                  <span className="text-sm font-medium">{t('theme_dark')}</span>
                </button>
             </div>
          </div>

          {/* Language Section */}
          <div className="space-y-3">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('language')}</h3>
             <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      language === lang.code
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </button>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;