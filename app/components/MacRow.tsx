'use client';

// app/components/MacRow.tsx v0.7.8
import React from 'react';
import { calculateTierScore, getTierLabel } from '../lib/scoring';
import { MacModel, RankingScenario } from '../types';
import TierBadge from './TierBadge';
import { Check } from 'lucide-react';
import { formatCurrency, Language, TranslationKey } from '../locales/translations';

interface MacRowProps {
  mac: MacModel;
  index: number;
  rank: number;
  isSelected: boolean;
  isMaxSelected: boolean;
  disabled: boolean;
  scenario: RankingScenario;
  maxScore: number;
  onSelect: (mac: MacModel) => void;
  onToggleCompare: (mac: MacModel) => void;
  t: (key: TranslationKey) => string;
  language: Language;
}

const MacRow: React.FC<MacRowProps> = ({
  mac, index, rank, isSelected, isMaxSelected, disabled, scenario, maxScore, onSelect, onToggleCompare, t, language
}) => {
  const score = calculateTierScore(mac, scenario);
  const tier = getTierLabel(score);
  const scoreWidth = Math.max(8, (score / maxScore) * 100);

  const isRef = mac.isReference;
  const rowClass = isRef
      ? 'bg-gray-50/50 dark:bg-gray-800/10 text-gray-500 dark:text-gray-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all'
      : `group border-b border-gray-50 dark:border-gray-900 transition-all duration-300 ${
        isSelected
          ? 'bg-blue-50/70 dark:bg-blue-900/20 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-blue-500'
          : 'hover:bg-gray-50 dark:hover:bg-gray-900/30'
      }`;

  return (
    <tr
      className={rowClass}
      id={`mac-row-${mac.id}`}
    >
      <td className="py-3 md:py-4 pl-3 text-center">
         {!isRef && (
         <button
           onClick={(e) => { e.stopPropagation(); onToggleCompare(mac); }}
           disabled={disabled}
           className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-blue-500 border-blue-500 text-white scale-110 shadow-lg shadow-blue-500/20'
                : disabled
                   ? 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 opacity-20 cursor-not-allowed'
                   : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-blue-300 dark:hover:border-blue-700'
           }`}
         >
           {isSelected && <Check size={12} strokeWidth={4} />}
         </button>
         )}
      </td>
      <td className="py-3 md:py-4 pr-2 text-center text-[11px] font-black text-gray-300 dark:text-gray-700 tabular-nums">
        {isRef ? '-' : (rank + 1).toString().padStart(2, '0')}
      </td>
      <td className={`py-3 md:py-4 pr-2 text-center ${!isRef && 'cursor-pointer'}`} onClick={() => !isRef && onSelect(mac)}>
        {isRef ? (
            <span className="text-[9px] font-black border-2 border-gray-200 dark:border-gray-800 px-1.5 py-0.5 rounded-md text-gray-400 tracking-tighter">REF</span>
        ) : (
            <TierBadge tier={tier} />
        )}
      </td>

      <td
        className={`py-3 md:py-4 px-3 cursor-pointer sticky left-0 z-20 md:static transition-colors duration-300
          ${isRef
              ? 'bg-gray-50 dark:bg-gray-900/50'
              : isSelected
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
              {!isRef && <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{mac.releaseYear}</span>}
          </div>
        </div>
      </td>

      <td className="hidden md:table-cell py-4 px-2 text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
        {mac.cores_cpu}
      </td>
      <td className="hidden lg:table-cell py-4 px-2 text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
        {mac.cores_gpu} <span className="text-[10px] opacity-50">GPU</span>
      </td>

      <td className="hidden xl:table-cell py-4 px-2 text-xs font-medium text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
        <span className="truncate block max-w-[140px]">{mac.memory}</span>
      </td>

      <td className="py-3 md:py-4 px-3 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
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

      <td className="hidden sm:table-cell py-4 px-2 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
        <div className="flex flex-col items-end">
          <span className={`text-xs font-black ${
            (mac.valueScore || 0) > 150 ? 'text-emerald-500' :
            (mac.valueScore || 0) > 100 ? 'text-blue-500' :
            'text-gray-500 dark:text-gray-400'
          }`}>
            {mac.valueScore}
          </span>
          <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-tighter">{t('pts_per_10')}</span>
        </div>
      </td>

      <td className="hidden sm:table-cell py-4 pl-2 pr-3 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
        <div className="flex flex-col items-end gap-0.5">
          <span className={`text-sm font-bold tabular-nums ${isRef ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
            {formatCurrency(mac.currentPriceUSD || mac.basePriceUSD, language)}
          </span>
          {mac.currentPriceUSD && mac.currentPriceUSD < mac.basePriceUSD && (
            <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 line-through opacity-70 tabular-nums">
              {formatCurrency(mac.basePriceUSD, language)}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default React.memo(MacRow);
