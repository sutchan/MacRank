import React, { useContext } from 'react';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import TierBadge from './TierBadge';
import { ChevronRight } from 'lucide-react';
import { LanguageContext } from '../App';

interface MacTableProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
}

const MacTable: React.FC<MacTableProps> = ({ data, onSelect }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
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
            
            return (
              <tr 
                key={mac.id} 
                className="group border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                onClick={() => onSelect(mac)}
              >
                <td className="py-6 pr-4 text-center">
                  <TierBadge tier={tier} />
                </td>
                <td className="py-6 px-4">
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{mac.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{mac.chip} • {mac.releaseYear}</span>
                  </div>
                </td>
                <td className="py-6 px-4 text-sm text-gray-700 dark:text-gray-300 font-normal">
                  {mac.cores_cpu}
                </td>
                <td className="py-6 px-4 text-sm text-gray-700 dark:text-gray-300 font-normal">
                  {mac.cores_gpu}
                </td>
                <td className="py-6 px-4 text-right">
                   <span className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums tracking-tight">{score}</span>
                </td>
                <td className="py-6 pl-4 text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">${mac.basePriceUSD}</span>
                </td>
                <td className="py-6 text-center text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors">
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