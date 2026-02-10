// Version: 0.1.13
import React, { useContext } from 'react';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel, RankingScenario } from '../lib/types';
import TierBadge from './TierBadge';
import { ChevronRight, Check } from 'lucide-react';
import { LanguageContext } from '../lib/translations';
import { formatCurrency } from '../lib/translations';

interface MacTableProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
  compareList: MacModel[];
  onToggleCompare: (mac: MacModel) => void;
  scenario: RankingScenario;
  maxScore?: number;
}

const MacTable: React.FC<MacTableProps> = ({ data, onSelect, compareList, onToggleCompare, scenario, maxScore = 10000 }) => {
  const { t, language } = useContext(LanguageContext);

  const isSelected = (id: string) => compareList.some(c => c.id === id);
  const isMaxSelected = compareList.length >= 2;

  return (
    <div className="overflow-x-auto relative">
      {/* Remove forced min-width on mobile to allow natural fitting, apply min-width only on desktop (md) */}
      <table className="w-full text-left border-collapse md:min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="py-4 pl-4 w-10 text-center">
              {/* Checkbox Header */}
            </th>
            <th className="py-4 pr-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12 text-center">#</th>
            <th className="py-4 pr-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16 text-center">{t('rank')}</th>
            
            {/* STICKY COLUMN HEADER */}
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 z-20 bg-gray-50 dark:bg-black shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] md:shadow-none md:static">{t('modelChip')}</th>
            
            {/* Hidden on mobile, shown on md+ */}
            <th className="hidden md:table-cell py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">{t('cpuCores')}</th>
            <th className="hidden md:table-cell py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">{t('gpuCores')}</th>
            
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right w-32">{t('performance')}</th>
            
            {/* Hidden on mobile, shown on md+ */}
            <th className="hidden md:table-cell py-4 pl-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right w-28">{t('price')}</th>
            
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((mac, index) => {
            const score = calculateTierScore(mac, scenario);
            const tier = getTierLabel(score);
            const selected = isSelected(mac.id);
            const disabled = !selected && isMaxSelected;
            // Calculate width percentage relative to max score in view (min width 10%)
            const scoreWidth = Math.max(10, (score / maxScore) * 100);
            
            return (
              <tr 
                key={mac.id} 
                className={`group border-b border-gray-200 dark:border-gray-800 transition-colors ${selected ? 'bg-blue-50 dark:bg-blue-900/10' : 'hover:bg-gray-100 dark:hover:bg-gray-900'}`}
              >
                <td className="py-4 md:py-6 pl-4 text-center">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onToggleCompare(mac); }}
                     disabled={disabled}
                     aria-label={`Compare ${mac.name}`}
                     className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        selected 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : disabled 
                             ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed'
                             : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-black hover:border-blue-400'
                     }`}
                   >
                     {selected && <Check size={12} strokeWidth={3} />}
                   </button>
                </td>
                <td className="py-4 md:py-6 pr-4 text-center text-sm text-gray-500 font-mono">
                  {index + 1}
                </td>
                <td className="py-4 md:py-6 pr-4 text-center cursor-pointer" onClick={() => onSelect(mac)}>
                  <TierBadge tier={tier} />
                </td>
                
                {/* STICKY COLUMN CELL */}
                <td 
                  className={`py-4 md:py-6 px-4 cursor-pointer sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] md:shadow-none md:static transition-colors duration-200
                    ${selected 
                        ? 'bg-blue-50 dark:bg-[#1a2333]' // Slightly transparent blue doesn't work well with sticky overlap, using solid approximation
                        : 'bg-gray-50 dark:bg-black group-hover:bg-gray-100 dark:group-hover:bg-gray-900' // Match row hover manually
                    }`} 
                  onClick={() => onSelect(mac)}
                >
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 md:line-clamp-1">{mac.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{mac.chip} • {mac.releaseYear}</span>
                  </div>
                </td>

                {/* Hidden on mobile */}
                <td className="hidden md:table-cell py-6 px-4 text-sm text-gray-700 dark:text-gray-300 font-normal cursor-pointer" onClick={() => onSelect(mac)}>
                  {mac.cores_cpu}
                </td>
                <td className="hidden md:table-cell py-6 px-4 text-sm text-gray-700 dark:text-gray-300 font-normal cursor-pointer" onClick={() => onSelect(mac)}>
                  {mac.cores_gpu}
                </td>

                <td className="py-4 md:py-6 px-4 text-right cursor-pointer" onClick={() => onSelect(mac)}>
                    <div className="relative inline-block w-full">
                        {/* Background Bar */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 h-8 rounded bg-blue-100/50 dark:bg-blue-900/20 -z-10 transition-all duration-500" style={{ width: `${scoreWidth}%` }}></div>
                        <span className="text-base md:text-lg font-semibold text-gray-900 dark:text-white tabular-nums tracking-tight relative z-10">{score}</span>
                    </div>
                </td>

                {/* Hidden on mobile */}
                <td className="hidden md:table-cell py-6 pl-4 text-right cursor-pointer" onClick={() => onSelect(mac)}>
                  <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">{formatCurrency(mac.basePriceUSD, language)}</span>
                </td>

                <td className="py-4 md:py-6 text-center text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors cursor-pointer" onClick={() => onSelect(mac)}>
                   <ChevronRight size={16} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MacTable;