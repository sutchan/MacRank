
// Version: 0.3.5
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Scale, Code, Palette, Coffee, Cpu, Settings2, Check } from 'lucide-react';
import { LanguageContext } from '../lib/translations';
import { DeviceType, ChipFamily, RankingScenario } from '../lib/types';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: DeviceType | 'All';
  setFilterType: (type: DeviceType | 'All') => void;
  filterFamily: ChipFamily | 'All';
  setFilterFamily: (family: ChipFamily | 'All') => void;
  sortBy: 'score' | 'price' | 'year';
  setSortBy: (sort: 'score' | 'price' | 'year') => void;
  rankingScenario: RankingScenario;
  setRankingScenario: (scenario: RankingScenario) => void;
  onShare: () => void; // Kept for potential future use, but button removed from this component
  showReference: boolean;
  setShowReference: (show: boolean) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm, setSearchTerm,
  filterType, setFilterType,
  filterFamily, setFilterFamily,
  sortBy, setSortBy,
  rankingScenario, setRankingScenario,
  showReference, setShowReference
}) => {
  const { t } = useContext(LanguageContext);
  const [isScenarioMenuOpen, setIsScenarioMenuOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  
  const scenarioRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (scenarioRef.current && !scenarioRef.current.contains(event.target as Node)) {
        setIsScenarioMenuOpen(false);
      }
      if (viewRef.current && !viewRef.current.contains(event.target as Node)) {
        setIsViewMenuOpen(false);
      }
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
    <section id="filter-controls" className="sticky top-12 z-30 bg-gray-50/80 dark:bg-black/80 backdrop-blur-xl py-3 -mx-4 px-4 border-b border-gray-200/80 dark:border-gray-800/80 transition-all duration-300">
       <div id="filter-controls-inner" className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Search & Main Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-gray-200/50 dark:bg-gray-800/50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white placeholder-gray-500 transition-all"
                aria-label="Search Models"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="hidden md:flex bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-lg">
              {(['All', DeviceType.Laptop, DeviceType.Desktop, DeviceType.Tablet] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                    filterType === type 
                      ? 'bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {type === 'All' ? t('all') : t(type.toLowerCase() + 's' as any)}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Advanced Options */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="relative" ref={scenarioRef}>
              <button
                onClick={() => setIsScenarioMenuOpen(!isScenarioMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
              >
                {currentScenario?.icon && <currentScenario.icon size={14} />}
                <span>{currentScenario?.label}</span>
                <ChevronDown size={14} className={`transition-transform ${isScenarioMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isScenarioMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                  {scenarios.map(({ key, icon: Icon, label, desc }) => (
                    <button
                      key={key}
                      onClick={() => { setRankingScenario(key); setIsScenarioMenuOpen(false); }}
                      className="w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-start gap-3"
                    >
                      <Icon size={16} className="mt-1 text-gray-500" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">{desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative" ref={viewRef}>
              <button
                onClick={() => setIsViewMenuOpen(!isViewMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <Settings2 size={14} />
                <span>{t('view_options')}</span>
                <ChevronDown size={14} className={`transition-transform ${isViewMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isViewMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                    {/* Sort By */}
                    <div className="p-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('sort_by')}</label>
                        <div className="flex flex-col items-start gap-1 mt-2">
                            {(['score', 'price', 'year'] as const).map(option => (
                                <button key={option} onClick={() => setSortBy(option)} className="w-full text-left text-sm flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                                    <div className="w-4">{sortBy === option && <Check size={14} className="text-blue-500" />}</div>
                                    {t(option)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                    {/* PC Ref Toggle */}
                    <div
                        onClick={() => setShowReference(!showReference)}
                        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
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
    </section>
  );
};

export default FilterControls;
