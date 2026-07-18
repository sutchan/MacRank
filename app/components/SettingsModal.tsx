// app/components/SettingsModal.tsx v0.8.0
import React, { useContext } from 'react';
import { X, Moon, Sun, ChevronRight, RotateCcw, Github } from 'lucide-react';
import { LanguageContext, Language, LanguageContextType, languages } from '../locales/translations';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

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
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-md p-0 gap-0 overflow-hidden flex flex-col max-h-[90vh]" showCloseButton={false}>
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted">
           <h2 className="text-lg font-semibold text-foreground">{t('settings')}</h2>
           <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label={t('close')}>
              <X size={18} aria-hidden="true" />
           </Button>
        </div>

        <div id="settings-modal-scroll-container" className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">

          <div className="space-y-4">
             <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">{t('general')}</h3>

             <div className="space-y-2">
                <label className="text-sm font-medium text-foreground px-1">{t('language')}</label>
                <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder={t('language')} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium text-foreground px-1">{t('appearance')}</label>
                <div className="bg-muted p-1 rounded-xl flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setThemeMode('light')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                        theme === 'light'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Sun size={16} aria-hidden="true" />
                      {t('theme_light')}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setThemeMode('dark')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-foreground text-background shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Moon size={16} aria-hidden="true" />
                      {t('theme_dark')}
                    </Button>
                </div>
             </div>

             <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <span className="text-sm font-medium text-foreground">{t('theme_dark')}</span>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
                  aria-label={t('appearance')}
                />
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">{t('about')}</h3>

             <div className="bg-muted rounded-xl overflow-hidden border border-border">

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors border-b border-border text-left group"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                         <RotateCcw size={16} aria-hidden="true" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-foreground">{t('reset_data')}</p>
                         <p className="text-xs text-muted-foreground">{t('reset_desc')}</p>
                      </div>
                   </div>
                   <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                </button>

                <a
                  href="https://github.com/sutchan/MacRank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors text-left group"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                         <Github size={16} aria-hidden="true" />
                      </div>
                      <p className="text-sm font-medium text-foreground">{t('source_code')}</p>
                   </div>
                   <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                </a>

             </div>

             <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground font-mono">MacRank v{version}</p>
             </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
