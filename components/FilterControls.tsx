
import React, { useContext } from 'react';
import { Search, X, Share2, ChevronDown, Scale, Code, Palette, Coffee, Info, Cpu } from 'lucide-react';
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
  onShare: () => void;
  showReference: boolean;
  setShowReference: (show: boolean) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm, setSearchTerm,
  filterType, setFilterType,
  filterFamily, setFilterFamily,
  sortBy, setSortBy,
  rankingScenario, setRankingScenario,
  onShare,
  showReference, setShowReference
}) => {
  const { t } = useContext(LanguageContext);

  const ScenarioButton = ({ value, icon: Icon, labelKey }: { value: RankingScenario, icon: any, labelKey: string }) => (
     <button
        onClick={() => setRankingScenario(value)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
           rankingScenario === value
             ? 'bg-purple-600 text-white shadow-md'
             : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
     >
        <Icon size={14} />
        <span className="whitespace-nowrap">{t(labelKey as any)}</span>
     </button>
  );

  const getScenarioDescription = (scenario: RankingScenario) => {
      switch(scenario) {
          case 'developer': return t('scenario_desc_developer');
          case 'creative': return t('scenario_desc_creative');
          case 'daily': return t('scenario_desc_daily');
          default: return t('scenario_desc_balanced');
      }
  };

  return (
    <section id="filter-controls" className="sticky top-12 z-30 bg-[rgba(251,251,253,0.8)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-xl py-4 -mx-4 px-4 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 shadow-sm">
       <div id="filter-controls-inner" className="max-w-[980px] mx-auto flex flex-col gap-4">
          
          {/* Row 1: Search & Type Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex w-full md:w-auto items-center gap-2">
                <div className="relative w-full md:w-72 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-8 py-2 bg-gray-200/50 dark:bg-gray-800/50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white placeholder-gray-500 transition-all"
                    aria-label="Search Models"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-300/20 dark:bg-gray-600/20 rounded-full p-0.5 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                {/* Retaining small share button here for context sharing */}
                <button 
                  onClick={onShare}
                  className="p-2 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label={t('share')}
                >
                  <Share2 size={18} />
                </button>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                  <div className="flex bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-lg">
                    {(['All', DeviceType.Laptop, DeviceType.Desktop, DeviceType.Tablet] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                          filterType === type 
                            ? 'bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {type === 'All' ? t('all') : type === DeviceType.Laptop ? t('laptops') : type === DeviceType.Desktop ? t('desktops') : t('tablets')}
                      </button>
                    ))}
                  </div>

                  <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

                  <div className="relative group">
                     <select 
                        value={filterFamily}
                        onChange={(e) => setFilterFamily(e.target.value as any)}
                        className="appearance-none bg-transparent pl-2 pr-8 py-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none cursor-pointer hover:text-blue-500 transition-colors"
                        aria-label="Filter by Chip Family"
                      >
                        <option value="All">{t('allChips')}</option>
                        <option value={ChipFamily.M4}>{t('family_m4')}</option>
                        <option value={ChipFamily.M3}>{t('family_m3')}</option>
                        <option value={ChipFamily.M2}>{t('family_m2')}</option>
                        <option value={ChipFamily.M1}>{t('family_m1')}</option>
                        <option value={ChipFamily.Intel}>{t('family_intel')}</option>
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                  </div>

                  <button 
                    onClick={() => {
                      const next = sortBy === 'score' ? 'price' : sortBy === 'price' ? 'year' : 'score';
                      setSortBy(next);
                    }}
                    className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    {t('sort')}: <span className="text-gray-900 dark:text-white">{t(sortBy)}</span>
                  </button>
              </div>
          </div>

          {/* Row 2: Scenario Selector, PC Reference Toggle, Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">{t('scenario')}:</span>
                  <div className="flex gap-2 pb-1 sm:pb-0">
                     <ScenarioButton value="balanced" icon={Scale} labelKey="scenario_balanced" />
                     <ScenarioButton value="developer" icon={Code} labelKey="scenario_developer" />
                     <ScenarioButton value="creative" icon={Palette} labelKey="scenario_creative" />
                     <ScenarioButton value="daily" icon={Coffee} labelKey="scenario_daily" />
                  </div>
                  
                  <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1 shrink-0"></div>
                  
                  {/* PC Reference Toggle */}
                  <button
                    onClick={() => setShowReference(!showReference)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                      showReference
                        ? 'bg-gray-800 text-white dark:bg-white dark:text-black shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Cpu size={14} />
                    <span className="whitespace-nowrap">{t('pc_reference')}</span>
                  </button>
              </div>

              {/* Scenario Info Text */}
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-md animate-in fade-in duration-300">
                  <Info size={12} />
                  <span>{getScenarioDescription(rankingScenario)}</span>
              </div>
          </div>

       </div>
    </section>
  );
};

export default FilterControls;
