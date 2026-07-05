'use client';

// app/components/MacTable.tsx v0.7.8
import React, { useContext } from 'react';
import { MacModel, RankingScenario, SortKey } from '../types';
import SortHeader from './SortHeader';
import MacRow from './MacRow';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MacTableProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
  compareList: MacModel[];
  onToggleCompare: (mac: MacModel) => void;
  scenario: RankingScenario;
  maxScore?: number;
  sortConfig?: { key: SortKey; direction: 'asc' | 'desc' };
  onSort?: (key: SortKey) => void;
  onResetFilters?: () => void;
}

const MacTable: React.FC<MacTableProps> = ({
  data, onSelect, compareList, onToggleCompare, scenario, maxScore = 10000,
  sortConfig, onSort, onResetFilters
}) => {
  const { t, language } = useContext(LanguageContext) as LanguageContextType;

  const isSelected = (id: string) => compareList.some(c => c.id === id);
  const isMaxSelected = compareList.length >= 2;
  const activeKey = sortConfig?.key;
  const direction = sortConfig?.direction;

  if (data.length === 0) {
    return (
      <div id="mac-table-empty" className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('no_results_title')}</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">{t('no_results_desc')}</p>
        {onResetFilters && (
          <Button onClick={onResetFilters}>{t('clear_filters')}</Button>
        )}
      </div>
    );
  }

  return (
    <div id="mac-table-wrapper" className="overflow-x-auto relative custom-scrollbar bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <table id="mac-table-element" className="w-full text-left border-collapse md:min-w-[750px]">
        <thead id="mac-table-header-element">
          <tr className="border-b border-gray-100 dark:border-gray-900 bg-gray-50/30 dark:bg-white/5">
            <th className="py-4 pl-3 w-10 text-center"></th>
            <th className="py-4 pr-2 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest w-10 text-center">#</th>
            <th className="py-4 pr-2 w-14 text-center">
               <SortHeader label={t('rank')} sortKey="score" align="center" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>

            <th className="py-4 px-3 sticky left-0 z-20 bg-gray-50 dark:bg-black shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] md:shadow-none md:static min-w-[200px] md:min-w-[280px]">
               <SortHeader label={t('modelChip')} sortKey="name" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>

            <th className="hidden md:table-cell py-4 px-2 w-28">
               <SortHeader label={t('cpuCores')} sortKey="cpu" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>
            <th className="hidden lg:table-cell py-4 px-2 w-28">
               <SortHeader label={t('gpuCores')} sortKey="gpu" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>

            <th className="hidden xl:table-cell py-4 px-2 w-28 whitespace-nowrap">
               <SortHeader label={t('memory')} sortKey="memory" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>

            <th className="py-4 px-3 text-right w-32 md:w-40 whitespace-nowrap">
               <SortHeader label={t('performance')} sortKey="score" align="right" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>

            <th className="hidden sm:table-cell py-4 px-2 text-right w-24 whitespace-nowrap">
               <SortHeader label={t('valueScore')} sortKey="value" align="right" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>

            <th className="hidden sm:table-cell py-4 pl-2 pr-3 text-right w-28 whitespace-nowrap">
               <SortHeader label={t('price')} sortKey="price" align="right" activeKey={activeKey} direction={direction} onSort={onSort} />
            </th>
          </tr>
        </thead>
        <tbody id="mac-table-body-element">
          {data.map((mac, index) => (
            <MacRow
              key={mac.id}
              mac={mac}
              index={index}
              rank={index}
              isSelected={isSelected(mac.id)}
              isMaxSelected={isMaxSelected}
              disabled={!isSelected(mac.id) && isMaxSelected}
              scenario={scenario}
              maxScore={maxScore}
              onSelect={onSelect}
              onToggleCompare={onToggleCompare}
              t={t}
              language={language}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MacTable);
