import React, { useContext } from 'react';
import { X, Trophy, Minus } from 'lucide-react';
import { MacModel } from '../lib/types';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { LanguageContext } from '../App';
import TierBadge from './TierBadge';
import { formatCurrency } from '../lib/translations';

interface CompareModalProps {
  models: MacModel[];
  onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ models, onClose }) => {
  const { t, language } = useContext(LanguageContext);

  if (models.length !== 2) return null;

  const [m1, m2] = models;
  const score1 = calculateTierScore(m1);
  const score2 = calculateTierScore(m2);

  const getBarColor = (val1: number, val2: number) => {
    if (val1 > val2) return 'bg-blue-600 dark:bg-blue-500';
    if (val1 < val2) return 'bg-gray-400 dark:bg-gray-600';
    return 'bg-blue-400 dark:bg-blue-400';
  };

  const ComparisonRow = ({ label, val1, val2, suffix = '' }: { label: string, val1: number, val2: number, suffix?: string }) => {
    const max = Math.max(val1, val2);
    const safeMax = max === 0 ? 1 : max;
    
    // Calculate percentage relative to the local maximum (winner)
    const p1 = (val1 / safeMax) * 100;
    const p2 = (val2 / safeMax) * 100;
    
    const diff = val1 - val2;
    // Handle division by zero for diffPercent
    const minVal = Math.min(val1, val2);
    const diffPercent = minVal > 0 ? Math.round((Math.abs(diff) / minVal) * 100) : 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
           <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
           {diff !== 0 && (
             <span className={`text-xs font-bold ${diff > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {diff > 0 ? m1.name : m2.name} +{diffPercent}%
             </span>
           )}
        </div>
        
        {/* Model 1 Bar */}
        <div className="flex items-center gap-3 mb-2">
           <div className="w-24 text-right text-xs font-medium truncate text-gray-600 dark:text-gray-300">{m1.chip}</div>
           <div className="relative flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
             <div className={`h-full rounded-full transition-all duration-500 ${getBarColor(val1, val2)}`} style={{ width: `${p1}%` }}></div>
             {/* Marker on Winner Bar showing Loser's position */}
             {val1 > val2 && (
                <div className="absolute top-0 bottom-0 w-[2px] bg-white/40 dark:bg-black/30 z-10 shadow-[0_0_2px_rgba(0,0,0,0.2)]" style={{ left: `${p2}%` }}></div>
             )}
           </div>
           <div className="w-20 text-right text-sm font-bold text-gray-900 dark:text-white tabular-nums">{val1.toLocaleString()}{suffix}</div>
        </div>

        {/* Model 2 Bar */}
        <div className="flex items-center gap-3">
           <div className="w-24 text-right text-xs font-medium truncate text-gray-600 dark:text-gray-300">{m2.chip}</div>
           <div className="relative flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
             <div className={`h-full rounded-full transition-all duration-500 ${getBarColor(val2, val1)}`} style={{ width: `${p2}%` }}></div>
             {/* Marker on Winner Bar showing Loser's position */}
             {val2 > val1 && (
                <div className="absolute top-0 bottom-0 w-[2px] bg-white/40 dark:bg-black/30 z-10 shadow-[0_0_2px_rgba(0,0,0,0.2)]" style={{ left: `${p1}%` }}></div>
             )}
           </div>
           <div className="w-20 text-right text-sm font-bold text-gray-900 dark:text-white tabular-nums">{val2.toLocaleString()}{suffix}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[rgba(50,50,50,0.5)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20 dark:border-white/10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#151516]">
           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('compareModels')}</h2>
           <button 
              onClick={onClose}
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
           >
              <X size={20} />
           </button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
          
          {/* Models Header */}
          <div className="grid grid-cols-2 gap-8 mb-10">
             {[m1, m2].map((m, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                    <TierBadge tier={getTierLabel(calculateTierScore(m))} />
                    <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white leading-tight px-4">{m.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{m.chip} ({m.releaseYear})</p>
                    <div className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(m.basePriceUSD, language)}</div>
                </div>
             ))}
             
             {/* VS Circle */}
             <div className="absolute left-1/2 top-[130px] -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-400 border-4 border-white dark:border-[#1c1c1e]">
               {t('vs')}
             </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-8 mb-10 text-center border-t border-b border-gray-200 dark:border-gray-800 py-6">
             <div>
                <p className="text-sm text-gray-500 mb-1">{t('cpuCores')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{m1.cores_cpu}</p>
                <div className="h-4"></div>
                <p className="text-sm text-gray-500 mb-1">{t('gpuCores')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{m1.cores_gpu}</p>
                 <div className="h-4"></div>
                <p className="text-sm text-gray-500 mb-1">{t('memory')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{m1.memory}</p>
             </div>
             <div>
                <p className="text-sm text-gray-500 mb-1">{t('cpuCores')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{m2.cores_cpu}</p>
                 <div className="h-4"></div>
                <p className="text-sm text-gray-500 mb-1">{t('gpuCores')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{m2.cores_gpu}</p>
                 <div className="h-4"></div>
                <p className="text-sm text-gray-500 mb-1">{t('memory')}</p>
                <p className="font-medium text-gray-900 dark:text-white">{m2.memory}</p>
             </div>
          </div>

          {/* Performance Charts */}
          <div className="max-w-3xl mx-auto">
              <ComparisonRow 
                 label={t('composite')} 
                 val1={score1} 
                 val2={score2} 
              />
              <ComparisonRow 
                 label={t('singleCore')} 
                 val1={m1.singleCoreScore} 
                 val2={m2.singleCoreScore} 
              />
              <ComparisonRow 
                 label={t('multiCore')} 
                 val1={m1.multiCoreScore} 
                 val2={m2.multiCoreScore} 
              />
              <ComparisonRow 
                 label={t('metal')} 
                 val1={m1.metalScore} 
                 val2={m2.metalScore} 
              />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompareModal;