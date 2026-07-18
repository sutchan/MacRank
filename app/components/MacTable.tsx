// app/components/MacTable.tsx v0.8.0
import React, { useContext } from 'react';
import { calculateTierScore, getTierLabel } from '../lib/scoring';
import { MacModel, RankingScenario, SortKey } from '../types';
import TierBadge from './TierBadge';
import { ArrowUp, ArrowDown, ChevronsUpDown, Check, Inbox } from 'lucide-react';
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
        <span className={`transition-colors text-[10px] tracking-widest ${isActive ? 'text-foreground font-black' : 'text-muted-foreground group-hover:text-foreground'}`}>
          {label}
        </span>
        <span className="text-muted-foreground" aria-hidden="true">
          {isActive ? (
            sortConfig.direction === 'asc' ? <ArrowUp size={10} strokeWidth={4} className="text-primary" /> : <ArrowDown size={10} strokeWidth={4} className="text-primary" />
          ) : (
            <ChevronsUpDown size={10} className="opacity-30 group-hover:opacity-100 transition-opacity" />
          )}
        </span>
      </div>
    );
  };

  return (
    <div id="mac-table-wrapper" className="overflow-x-auto relative custom-scrollbar bg-card rounded-3xl border border-border shadow-sm">
      <table id="mac-table-element" className="w-full text-left border-collapse md:min-w-[750px]">
        <thead id="mac-table-header-element">
          <tr className="border-b border-border bg-muted/30">
            <th className="py-4 pl-3 w-8 text-center"></th>
            <th className="py-4 pr-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest w-10 text-center">#</th>
            <th className="py-4 pr-2 w-14 text-center">
               <SortHeader label={t('rank')} sortKey="score" align="center" />
            </th>

            <th className="py-4 px-3 sticky left-0 z-20 bg-muted/30 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] md:shadow-none md:static min-w-[200px] md:min-w-[280px]">
               <SortHeader label={t('modelChip')} sortKey="name" />
            </th>

            <th className="hidden md:table-cell py-4 px-2 w-24">
               <SortHeader label={t('cpuCores')} sortKey="cpu" />
            </th>
            <th className="hidden lg:table-cell py-4 px-2 w-24">
               <SortHeader label={t('gpuCores')} sortKey="gpu" />
            </th>

            <th className="hidden xl:table-cell py-4 px-2 w-28">
               <SortHeader label={t('memory')} sortKey="memory" />
            </th>

            <th className="py-4 px-3 text-right w-32 md:w-40">
               <SortHeader label={t('performance')} sortKey="score" align="right" />
            </th>

            <th className="hidden sm:table-cell py-4 px-2 text-right w-24">
               <SortHeader label={t('valueScore')} sortKey="value" align="right" />
            </th>

            <th className="hidden sm:table-cell py-4 pl-2 pr-3 text-right w-24">
               <SortHeader label={t('price')} sortKey="price" align="right" />
            </th>
          </tr>
        </thead>
        <tbody id="mac-table-body-element">
          {data.length === 0 && (
            <tr>
              <td colSpan={10} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Inbox size={40} strokeWidth={1.5} aria-hidden="true" />
                  <p className="text-sm font-medium">{t('no_data')}</p>
                </div>
              </td>
            </tr>
          )}
          {data.map((mac, index) => {
            const score = calculateTierScore(mac, scenario);
            const tier = getTierLabel(score);
            const selected = isSelected(mac.id);
            const disabled = !selected && isMaxSelected;
            const scoreWidth = Math.max(8, (score / maxScore) * 100);

            const isRef = mac.isReference;
            const rowClass = isRef
                ? 'bg-muted/40 text-muted-foreground grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all'
                : `group border-b border-border transition-colors duration-300 ${
                  selected
                    ? 'bg-primary/10 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-primary'
                    : 'hover:bg-muted'
                }`;

            return (
              <tr
                key={mac.id}
                className={rowClass}
                id={`mac-row-${mac.id}`}
              >
                <td className="py-3 md:py-4 pl-3 text-center">
                   {!isRef && (
                   <button
                     onClick={(e) => { e.stopPropagation(); onToggleCompare(mac); }}
                     disabled={disabled}
                     aria-label={selected ? t('close') : t('selectToCompare')}
                     aria-pressed={selected}
                     className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                        selected
                          ? 'bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20'
                          : disabled
                             ? 'border-border bg-muted opacity-20 cursor-not-allowed'
                             : 'border-border bg-background hover:border-primary'
                     }`}
                   >
                     {selected && <Check size={12} strokeWidth={4} aria-hidden="true" />}
                   </button>
                   )}
                </td>
                <td className="py-3 md:py-4 pr-2 text-center text-[11px] font-black text-muted-foreground/60 tabular-nums">
                  {isRef ? '-' : (index + 1).toString().padStart(2, '0')}
                </td>
                <td className={`py-3 md:py-4 pr-2 text-center ${!isRef && 'cursor-pointer'}`} onClick={() => !isRef && onSelect(mac)}>
                  {isRef ? (
                      <span className="text-[9px] font-black border-2 border-border px-1.5 py-0.5 rounded-md text-muted-foreground tracking-tighter">REF</span>
                  ) : (
                      <TierBadge tier={tier} />
                  )}
                </td>

                <td
                  className={`py-3 md:py-4 px-3 cursor-pointer sticky left-0 z-20 md:static transition-colors duration-300
                    ${isRef
                        ? 'bg-muted/40'
                        : selected
                            ? 'bg-primary/5'
                            : 'bg-card group-hover:bg-muted'
                    }`}
                  onClick={() => !isRef && onSelect(mac)}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm md:text-[15px] font-semibold transition-colors line-clamp-1 ${isRef ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'}`}>
                        {mac.name}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded leading-none uppercase">{mac.chip}</span>
                        {!isRef && <span className="text-[10px] font-medium text-muted-foreground">{mac.releaseYear}</span>}
                    </div>
                  </div>
                </td>

                <td className="hidden md:table-cell py-4 px-2 text-xs font-medium text-muted-foreground cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  {mac.cores_cpu}
                </td>
                <td className="hidden lg:table-cell py-4 px-2 text-xs font-medium text-muted-foreground cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  {mac.cores_gpu} <span className="text-[10px] opacity-50">GPU</span>
                </td>

                <td className="hidden xl:table-cell py-4 px-2 text-xs font-medium text-muted-foreground cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  <span className="truncate block max-w-[140px]">{mac.memory}</span>
                </td>

                <td className="py-3 md:py-4 px-3 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                    <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-base md:text-lg font-black tabular-nums tracking-tighter ${isRef ? 'text-muted-foreground' : 'text-foreground'}`}>{score.toLocaleString()}</span>
                        <div className="w-full h-[3px] bg-muted rounded-full overflow-hidden">
                           <div
                             className={`h-full rounded-full transition-[width] duration-1000 ${isRef ? 'bg-muted-foreground' : 'bg-gradient-to-r from-primary/60 to-primary'}`}
                             style={{ width: `${scoreWidth}%` }}
                           ></div>
                        </div>
                    </div>
                </td>

                <td className="hidden sm:table-cell py-4 px-2 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-black ${
                      (mac.valueScore || 0) > 150 ? 'text-chart-2' :
                      (mac.valueScore || 0) > 100 ? 'text-primary' :
                      'text-muted-foreground'
                    }`}>
                      {mac.valueScore}
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">{t('pts_per_10')}</span>
                  </div>
                </td>

                <td className="hidden sm:table-cell py-4 pl-2 pr-3 text-right cursor-pointer" onClick={() => !isRef && onSelect(mac)}>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-bold tabular-nums ${mac.currentPriceUSD && mac.currentPriceUSD < mac.basePriceUSD ? 'text-chart-2' : 'text-muted-foreground'}`}>
                      {formatCurrency(mac.currentPriceUSD || mac.basePriceUSD, language)}
                    </span>
                    {mac.currentPriceUSD && mac.currentPriceUSD < mac.basePriceUSD && (
                      <span className="text-[9px] font-medium text-chart-2 line-through opacity-50">
                        {formatCurrency(mac.basePriceUSD, language)}
                      </span>
                    )}
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
