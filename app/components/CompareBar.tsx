// app/components/CompareBar.tsx v0.6.1
import React, { useContext } from 'react';
import { X, ArrowRightLeft, Trash2 } from 'lucide-react';
import { MacModel } from '../types';
import { LanguageContext, LanguageContextType } from '../locales/translations';

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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] w-[95%] max-w-2xl transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div id="compare-bar-inner-panel" className="glass-panel rounded-2xl shadow-2xl border border-blue-500/20 dark:border-blue-400/20 p-3 md:p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
            <ArrowRightLeft size={20} />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {models.map((m) => (
              <div 
                key={m.id} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 whitespace-nowrap animate-in fade-in zoom-in-95"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-900 dark:text-white leading-tight truncate max-w-[80px] md:max-w-[120px]">{m.name}</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-tighter">{m.chip}</span>
                </div>
                <button 
                  onClick={() => onRemove(m.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            
            {models.length < 2 && (
              <div className="flex items-center justify-center px-4 py-2 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 text-[10px] font-bold uppercase tracking-widest">
                {t('selectToCompare')}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={onClear}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            title={t('clear_all')}
          >
            <Trash2 size={18} />
          </button>
          
          <button 
            onClick={onCompare}
            disabled={models.length < 2}
            className={`px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-lg active:scale-95 ${
              models.length === 2 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20' 
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            {t('compare_now')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;