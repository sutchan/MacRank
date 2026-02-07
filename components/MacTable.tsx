import React, { useContext } from 'react';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import TierBadge from './TierBadge';
import { Cpu, Zap, Layers, DollarSign } from 'lucide-react';
import { LanguageContext } from '../App';

interface MacTableProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
}

const MacTable: React.FC<MacTableProps> = ({ data, onSelect }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
      <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold transition-colors">
            <th className="p-4 rounded-tl-2xl">{t('rank')}</th>
            <th className="p-4">{t('modelChip')}</th>
            <th className="p-4 hidden md:table-cell">{t('cpuCores')}</th>
            <th className="p-4 hidden md:table-cell">{t('gpuCores')}</th>
            <th className="p-4 text-right">{t('performance')}</th>
            <th className="p-4 text-right rounded-tr-2xl">{t('launchPrice')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
          {data.map((mac) => {
            const score = calculateTierScore(mac);
            const tier = getTierLabel(score);
            
            return (
              <tr 
                key={mac.id} 
                className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors cursor-pointer group"
                onClick={() => onSelect(mac)}
              >
                <td className="p-4 w-16">
                  <TierBadge tier={tier} />
                </td>
                <td className="p-4">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{mac.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                    <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 font-medium">{mac.chip}</span>
                    <span className="hidden sm:inline">• {mac.releaseYear}</span>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={14} className="text-gray-400 dark:text-gray-500" />
                    {mac.cores_cpu}
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Layers size={14} className="text-gray-400 dark:text-gray-500" />
                    {mac.cores_gpu}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-bold text-gray-900 dark:text-white">{score} {t('pts')}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">{t('composite')}</span>
                  </div>
                </td>
                <td className="p-4 text-right font-medium text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-end gap-1">
                    <DollarSign size={14} className="text-gray-400 dark:text-gray-500" />
                    {mac.basePriceUSD}
                  </div>
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