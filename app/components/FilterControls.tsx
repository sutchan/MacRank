'use client';

import React, { useContext } from 'react';
import { Search, X } from 'lucide-react';
import { LanguageContext, LanguageContextType, TranslationKey } from '../locales/translations';
import { DeviceType, ChipFamily, RankingScenario, SortKey } from '../types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScenarioMenu, ViewMenu } from './FilterMenus';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: DeviceType | 'All';
  setFilterType: (type: DeviceType | 'All') => void;
  filterFamily: ChipFamily | 'All';
  setFilterFamily: (family: ChipFamily | 'All') => void;
  filterOS: string;
  setFilterOS: (os: string) => void;
  availableFamilies: (ChipFamily | 'All')[];
  availableOS: string[];
  sortBy: SortKey;
  onSort: (key: SortKey) => void;
  rankingScenario: RankingScenario;
  setRankingScenario: (scenario: RankingScenario) => void;
  showReference: boolean;
  setShowReference: (show: boolean) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm, setSearchTerm,
  filterType, setFilterType,
  filterFamily, setFilterFamily,
  filterOS, setFilterOS,
  availableFamilies, availableOS,
  sortBy, onSort,
  rankingScenario, setRankingScenario,
  showReference, setShowReference
}) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <section id="filter-controls-section" className="sticky top-12 z-30 bg-gray-50/80 dark:bg-black/80 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-gray-200/80 dark:border-gray-800/80 transition-all duration-300">
       <div id="filter-controls-top-row" className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div id="search-input-wrapper" className="relative w-full md:flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-8 py-2.5 text-sm"
              aria-label="Search Models"
            />
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm('')}
                variant="ghost"
                size="icon-xs"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={14} />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <ScenarioMenu scenario={rankingScenario} setRankingScenario={setRankingScenario} />
            <ViewMenu sortBy={sortBy} onSort={onSort} showReference={showReference} setShowReference={setShowReference} />
          </div>
       </div>
       <div id="filter-controls-bottom-row" className="max-w-[980px] mx-auto grid grid-cols-3 gap-2 mt-3">
          <Select value={filterType} onValueChange={(value) => setFilterType(value as DeviceType | 'All')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {[
                { value: 'All', label: t('all') },
                { value: DeviceType.Laptop, label: t('laptops') },
                { value: DeviceType.Desktop, label: t('desktops') },
                { value: DeviceType.Tablet, label: t('tablets') },
              ].map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterFamily} onValueChange={(value) => setFilterFamily(value as ChipFamily | 'All')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chip" />
            </SelectTrigger>
            <SelectContent>
              {availableFamilies.map(f => (
                <SelectItem key={f} value={f}>
                  {f === 'All' ? t('allChips') : t(`family_${f.toLowerCase()}` as TranslationKey) || `${f} Series`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterOS} onValueChange={(value) => setFilterOS(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="OS" />
            </SelectTrigger>
            <SelectContent>
              {availableOS.map(os => (
                <SelectItem key={os} value={os}>
                  {os === 'All' ? t('all') : os}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
       </div>
    </section>
  );
};

export default FilterControls;
