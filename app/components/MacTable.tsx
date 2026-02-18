// app/components/MacTable.tsx v0.6.1
import React, { useContext } from 'react';
import { calculateTierScore, getTierLabel } from '../lib/scoring';
import { MacModel, RankingScenario, SortKey } from '../types';
import TierBadge from './TierBadge';
import { ArrowUp, ArrowDown, ChevronsUpDown, Check } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { formatCurrency } from '../locales/translations';

interface MacTableProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
  compareList: MacModel[];
  onToggleCompare: (mac: MacModel) => void;
  scenario: RankingScenario;
  maxScore?: number;
  sortConfig?: { key: SortKey; direction: 'asc' | 'desc' };
  onSort?: (key: SortKey) => void;
}

const MacTable: React.FC<MacTableProps> = ({ 
  data, onSelect, compareList, onToggleCompare, scenario, maxScore = 10000,
  sortConfig, onSort
}) => {
  const { t, language } = useContext(LanguageContext) as LanguageContextType;

  const isSelected = (id: string) => compareList.some(c => c.id === id);
  const isMaxSelected = compareList.length >= 2;

  const SortHeader = ({ label, sortKey, align = 'left', className = '' }: { label: string, sortKey: SortKey, align?: 'left' | 'right' | 'center', className?: string }) => {
    const isActive = sortConfig?.key === sortKey;
    return (
      <div 
        className={`flex items-center gap-1 cursor-pointer group ${className} ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'}`}
        onClick={() => onSort && onSort(sortKey)}
      >
        <span className={`transition-colors text-[10px] tracking-widest ${isActive ? 'text-gray-900 dark:text-white font-black' : 'group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
          {label}
        </span>
        <span className="text-gray-400">
          {isActive ? (
            sortConfig.direction === 'asc' ? <ArrowUp size={10} strokeWidth={4} className="text-blue-500" /> : <ArrowDown size={10} strokeWidth={4} className="text-blue-500" />
          ) : (
            <ChevronsUpDown size={10} className="opacity-30 group-hover:opacity-100 transition-opacity" />
          )}
        </span>
      </div>
    );
  };

  return (
    <div id="mac-table-wrapper" className="overflow-x-auto relative custom-scrollbar bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <table id="mac-table-element" className="w-full text-left border-collapse md:min-w-[750px]">
        <thead id="mac-table-header-element">
          <tr className="border-b border-gray-100 dark:border-gray-900 bg-gray-50/30 dark:bg-white/5">
            <th className="py-5 pl-5 w-12 text-center"></th>
            <th className="py-5 pr-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-14 text-center">#</th>
            <th className="py-5 pr-4 w-18 text-center">
               <SortHeader label={t('rank')} sortKey="score" align="center" />
            </th>
            
            <th className="py-5 px-5 sticky left-0 z-20 bg-gray-50 dark:bg-black shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] md:shadow-none md:static">
               <SortHeader label={t('modelChip')} sortKey="name" />
            </th>
            
            <th className="hidden md:table-cell py-5 px-4 w-32">
               <SortHeader label={t('cpuCores')} sortKey="cpu" />
            </th>
            <th className="hidden lg:table-cell py-5 px-4 w-32">
               <SortHeader label={t('gpuCores')} sortKey="gpu" />
            </th>
            
            <th className="hidden xl:table-cell py-5 px-4 w-40">
               <SortHeader label={t('memory')} sortKey="memory" />
            </th>
            
            <th className="py-5 px-5 text-right w-44">
               <SortHeader label={t('performance')} sortKey="score" align="right" />
            </th>
            
            <th className="hidden sm:table-cell py-5 pl-5 pr-5 text-right w-28">
               <SortHeader label={t('price')} sortKey="price" align="right" />
            </th>
          </tr>
        </thead>
        <tbody id="mac-table-body-element">
          {data.map((mac, index) => {
            const score = calculateTierScore(mac, scenario);
            const tier = getTierLabel(score);
            const selected = isSelected(mac.id);
            const disabled = !selected && isMaxSelected;
            const scoreWidth = Math.max(8, (score / maxScore) * 100);
            
            const isRef = mac.isReference;
            const rowClass = isRef 
                ? 'bg-gray-50/50 dark:bg-gray-800/10 text-gray-500 dark:text-gray-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all' 
                : `group border-b border-gray-50 dark:border-gray-900 transition-all duration-300 ${
                  selected 
                    ? 'bg-blue-50/70 dark:bg-blue-900/20 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-blue-500' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-900/30'
                }`;

            return (
              <tr 
                key={mac.id} 
                className={rowClass}
                id={`mac-row-${mac.id}`}
              >
                <td className="py-4 md:py-6 pl-5 text-center">
                   {!isRef && (
                   <button 
                     onClick={(e) => { e.stopPropagation(); onToggleCompare(mac); }}
                     disabled={disabled}
                     className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        selected 
                          ? 'bg-blue-500 border-blue-500 text-white scale-110 shadow-lg shadow-blue-500/20' 
                          : disabled 
                             ? 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-20 cursor-not-allowed'
                             : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-blue-300 dark:hover:border-blue-700'
                     }`}
                   >
                     {selected && <Check size={12} strokeWidth={4} />}
                   </button>
                   )}
                </td>
                <td className="py-4 md:py-6 pr-4 text-center text-[11px] font-black text-gray-300 dark:text-gray-700 tabular-nums">
                  {isRef ? '-' : (index + 1).toString().padStart(2, '0')}
                </td>
                <td className={`py-4 md:py-6 pr-4 text-center ${!isRef && 'cursor-pointer'}`} onClick={() => !isRef && onSelect(mac)}>
                  {isRef ? (
                      <span className="text-[9px] font-black border-2 border-gray-200 dark:border-gray-800 px-1.5 py-0.5 rounded-md text-gray-400 tracking-tighter">REF</span>
                  ) : (
                      <TierBadge tier={tier} />
                  )}
                </td>
                
                <td 
                  className={`py-4 md:py-6 px-5 cursor-pointer sticky left-0 z-20 md:static transition-colors duration-300
                    ${isRef 
                        ? 'bg-gray-50 dark:bg-gray-900/50' 
                        : selected 
                            ? 'bg-blue-50/50 dark:bg-blue-950/20' 
                            : 'bg-white dark:bg-black group-hover:bg-gray-50 dark:group-hover:bg-gray-900/50'
                    }`} 
                  onClick={() => !isRef && onSelect(mac)}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm md:text-[15px] font-semibold transition-colors line-clamp-1 ${isRef ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                        {mac.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded leading-none uppercase">{mac.chip}</span>
                        {!isRef && <span className="text-[10px] font-medium text-gray-400">{mac.releaseYear}</span>}
                    </div>
                  </div>
                </td>

                <td className="hidden md:table-cell py-6 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  {mac.cores_cpu}
                </td>
                <td className="hidden lg:table-cell py-6 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  {mac.cores_gpu} <span className="text-[10px] opacity-50">GPU</span>
                </td>

                <td className="hidden xl:table-cell py-6 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  <span className="truncate block max-w-[140px]">{mac.memory}</span>
                </td>

                <td className="py-4 md:py-6 px-5 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                    <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-base md:text-lg font-black tabular-nums tracking-tighter ${isRef ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>{score.toLocaleString()}</span>
                        <div className="w-full h-[3px] bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full transition-all duration-1000 ${isRef ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-400'}`} 
                             style={{ width: `${scoreWidth}%` }}
                           ></div>
                        </div>
                    </div>
                </td>

                <td className="hidden sm:table-cell py-6 pl-5 pr-5 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tabular-nums">{formatCurrency(mac.basePriceUSD, language)}</span>
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