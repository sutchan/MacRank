'use client';

import React, { useContext } from 'react';
import { Moon, Sun, ChevronRight, RotateCcw, Github } from 'lucide-react';
import { LanguageContext, Language, LanguageContextType, languages } from '../locales/translations';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsModalProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  setThemeMode: (theme: 'light' | 'dark') => void;
  version: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, theme, setThemeMode, version }) => {
  const { t, language, setLanguage } = useContext(LanguageContext) as LanguageContextType;

  const handleReset = () => {
    if (confirm(t('reset_confirm'))) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">{t('settings')}</DialogTitle>
        </DialogHeader>

        <div id="settings-modal-scroll-container" className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
          
          <div className="space-y-4">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">{t('general')}</h3>
             
             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1">{t('language')}</label>
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('language')} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} &nbsp; {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1">{t('appearance')}</label>
                <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex">
                    <Button
                      onClick={() => setThemeMode('light')}
                      variant={theme === 'light' ? 'default' : 'ghost'}
                      size="sm"
                      className={`flex-1 ${theme === 'light' ? 'bg-white text-gray-900' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                      <Sun size={16} />
                      {t('theme_light')}
                    </Button>
                    <Button
                      onClick={() => setThemeMode('dark')}
                      variant={theme === 'dark' ? 'default' : 'ghost'}
                      size="sm"
                      className={`flex-1 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                      <Moon size={16} />
                      {t('theme_dark')}
                    </Button>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">{t('about')}</h3>
             
             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                
                <Button 
                  onClick={handleReset}
                  variant="ghost"
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                         <RotateCcw size={16} />
                      </div>
                      <div className="text-left">
                         <p className="text-sm font-medium text-gray-900 dark:text-white">{t('reset_data')}</p>
                         <p className="text-xs text-gray-500">{t('reset_desc')}</p>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-gray-400" />
                </Button>

                <a 
                  href="https://github.com/sutchan/MacRank" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
                         <Github size={16} />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{t('source_code')}</p>
                   </div>
                   <ChevronRight size={16} className="text-gray-400" />
                </a>

             </div>

             <div className="text-center pt-2">
                <p className="text-xs text-gray-400 font-mono">MacRank v{version}</p>
             </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;