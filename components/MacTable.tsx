import React, { useContext } from 'react';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import TierBadge from './TierBadge';
import { ChevronRight, Check } from 'lucide-react';
import { LanguageContext } from '../App';

interface MacTableProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
  compareList: MacModel[];
  onToggleCompare: (mac: MacModel) => void;
}

const MacTable: React.FC<MacTableProps> = ({ data, onSelect, compareList, onToggleCompare }) => {
  const { t } = useContext(LanguageContext);

  const isSelected = (id: string) => compareList.some(c => c.id === id);
  const isMaxSelected = compareList.length >= 2;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="py-4 pl-4 w-10 text-center">
              {/* Checkbox Header */}
            </th>
            <th className="py-4 pr-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16 text-center">{t('rank')}</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('modelChip')}</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">{t('cpuCores')}</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">{t('gpuCores')}</th>
            <th className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right w-32">{t('performance')}</th>
            <th className="py-4 pl-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right w-28">{t('price')}</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((mac) => {
            const score = calculateTierScore(mac);
            const tier = getTierLabel(score);
            const selected = isSelected(mac.id);
            const disabled = !selected && isMaxSelected;
            
            return (
              <tr 
                key={mac.id} 
                className={`group border-b border-gray-200 dark:border-gray-800 transition-colors ${selected ? 'bg-blue-50 dark:bg-blue-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-900'}`}
              >
                <td className="py-6 pl-4 text-center">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onToggleCompare(mac); }}
                     disabled={disabled}
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
                <td className="py-6 pr-4 text-center cursor-pointer" onClick={() => onSelect(mac)}>
                  <TierBadge tier={tier} />
                </td>
                <td className="py-6 px-4 cursor-pointer" onClick={() => onSelect(mac)}>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{mac.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{mac.chip} • {mac.releaseYear}</span>
                  </div>
                </td>
                <td className="py-6 px-4 text-sm text-gray-700 dark:text-gray-300 font-normal cursor-pointer" onClick={() => onSelect(mac)}>
                  {mac.cores_cpu}
                </td>
                <td className="py-6 px-4 text-sm text-gray-700 dark:text-gray-300 font-normal cursor-pointer" onClick={() => onSelect(mac)}>
                  {mac.cores_gpu}
                </td>
                <td className="py-6 px-4 text-right cursor-pointer" onClick={() => onSelect(mac)}>
                   <span className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums tracking-tight">{score}</span>
                </td>
                <td className="py-6 pl-4 text-right cursor-pointer" onClick={() => onSelect(mac)}>
                  <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">${mac.basePriceUSD}</span>
                </td>
                <td className="py-6 text-center text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors cursor-pointer" onClick={() => onSelect(mac)}>
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