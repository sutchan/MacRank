'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Scale, Code, Palette, Coffee, Cpu, Settings2, Check } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { DeviceType, ChipFamily, RankingScenario, SortKey } from '../types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [isScenarioMenuOpen, setIsScenarioMenuOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  
  const scenarioRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (scenarioRef.current && !scenarioRef.current.contains(event.target as Node)) setIsScenarioMenuOpen(false);
      if (viewRef.current && !viewRef.current.contains(event.target as Node)) setIsViewMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scenarios: { key: RankingScenario; icon: React.ElementType; label: string, desc: string }[] = [
    { key: 'balanced', icon: Scale, label: t('scenario_balanced'), desc: t('scenario_desc_balanced') },
    { key: 'developer', icon: Code, label: t('scenario_developer'), desc: t('scenario_desc_developer') },
    { key: 'creative', icon: Palette, label: t('scenario_creative'), desc: t('scenario_desc_creative') },
    { key: 'daily', icon: Coffee, label: t('scenario_daily'), desc: t('scenario_desc_daily') },
  ];

  const currentScenario = scenarios.find(s => s.key === rankingScenario);

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
            <div id="scenario-menu-wrapper" className="relative" ref={scenarioRef}>
              <Button
                onClick={() => setIsScenarioMenuOpen(!isScenarioMenuOpen)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {currentScenario?.icon && <currentScenario.icon size={14} />}
                <span>{currentScenario?.label}</span>
                <ChevronDown size={14} className={`transition-transform ${isScenarioMenuOpen ? 'rotate-180' : ''}`} />
              </Button>
              {isScenarioMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                  {scenarios.map(({ key, icon: Icon, label, desc }) => (
                    <Button
                      key={key}
                      onClick={() => { setRankingScenario(key); setIsScenarioMenuOpen(false); }}
                      variant="ghost"
                      className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-start gap-3"
                    >
                      <Icon size={16} className="mt-1 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300">{desc}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
            
            <div id="view-menu-wrapper" className="relative" ref={viewRef}>
              <Button
                onClick={() => setIsViewMenuOpen(!isViewMenuOpen)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings2 size={14} />
                <span>{t('view_options')}</span>
                <ChevronDown size={14} className={`transition-transform ${isViewMenuOpen ? 'rotate-180' : ''}`} />
              </Button>
              {isViewMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                    <div className="p-2">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{t('sort_by')}</label>
                        <div className="flex flex-col items-start gap-1 mt-2">
                            {(['score', 'price', 'year', 'name'] as const).map(option => (
                                <Button
                                  key={option}
                                  onClick={() => onSort(option)}
                                  variant="ghost"
                                  className="w-full text-left text-sm flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                                >
                                    <div className="w-4">{sortBy === option && <Check size={14} className="text-blue-500" />}</div>
                                    {t(option as any) || option}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                    <div onClick={() => setShowReference(!showReference)} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Cpu size={16} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('pc_reference')}</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${showReference ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${showReference ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </div>
              )}
            </div>
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
                  {f === 'All' ? t('allChips') : t(`family_${f.toLowerCase()}` as any) || `${f} Series`}
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