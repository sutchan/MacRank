// app/components/CompareBar.tsx v0.8.0
import React, { useContext } from 'react';
import { X, ArrowRightLeft, Trash2 } from 'lucide-react';
import { MacModel } from '../types';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { Button } from '@/components/ui/button';

interface CompareBarProps {
  models: MacModel[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
  isVisible: boolean;
}

const CompareBar: React.FC<CompareBarProps> = ({ models, onRemove, onClear, onCompare, isVisible }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  if (models.length === 0) return null;

  return (
    <div
      id="compare-bar-root"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] w-[95%] max-w-2xl transition-[transform,opacity] duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div id="compare-bar-inner-panel" className="glass-panel rounded-2xl shadow-2xl border border-primary/20 p-3 md:p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0" aria-hidden="true">
            <ArrowRightLeft size={20} />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {models.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border whitespace-nowrap animate-in fade-in zoom-in-95"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-foreground leading-tight truncate max-w-[80px] md:max-w-[120px]">{m.name}</span>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">{m.chip}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => onRemove(m.id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label={t('close')}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}

            {models.length < 2 && (
              <div className="flex items-center justify-center px-4 py-2 rounded-lg border-2 border-dashed border-border text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                {t('selectToCompare')}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('clear_all')}
            title={t('clear_all')}
          >
            <Trash2 size={18} />
          </Button>

          <Button
            variant="default"
            size="default"
            onClick={onCompare}
            disabled={models.length < 2}
            className={`px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold shadow-lg active:scale-95 transition-transform ${
              models.length === 2 ? 'shadow-primary/20' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {t('compare_now')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
