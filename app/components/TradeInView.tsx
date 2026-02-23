import React, { useContext } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import TradeInCalculator from './TradeInCalculator';

interface TradeInViewProps {
  onClose: () => void;
}

const TradeInView: React.FC<TradeInViewProps> = ({ onClose }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-apple-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/10 max-h-[90vh] flex flex-col">
        
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-white dark:bg-apple-gray-900">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                 <RotateCcw size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('tradeIn')}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estimate your upgrade cost</p>
              </div>
           </div>
           <button 
              onClick={onClose}
              className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
           >
              <X size={20} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-gray-50 dark:bg-black/20">
           <TradeInCalculator />
        </div>
      </div>
    </div>
  );
};

export default TradeInView;
