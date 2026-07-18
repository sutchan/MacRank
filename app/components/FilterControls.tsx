// app/components/FilterControls.tsx v0.8.0
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
    <section id="filter-controls-section" className="sticky top-12 z-30 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-border transition-colors duration-300">
       <div id="filter-controls-top-row" className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div id="search-input-wrapper" className="relative w-full md:flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" size={16} aria-hidden="true" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 h-9"
              aria-label="Search Models"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={t('clear_all')}
              >
                <X size={14} />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div id="scenario-menu-wrapper" className="relative" ref={scenarioRef}>
              <Button variant="outline" size="sm" onClick={() => setIsScenarioMenuOpen(!isScenarioMenuOpen)} className="flex items-center gap-2">
                {currentScenario?.icon && <currentScenario.icon size={14} aria-hidden="true" />} <span>{currentScenario?.label}</span> <ChevronDown size={14} className={`transition-transform ${isScenarioMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </Button>
              {isScenarioMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-popover/95 backdrop-blur-md rounded-xl shadow-lg border border-border z-10 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                  {scenarios.map(({ key, icon: Icon, label, desc }) => (
                    <button key={key} onClick={() => { setRankingScenario(key); setIsScenarioMenuOpen(false); }} className="w-full text-left p-2 rounded-md hover:bg-accent flex items-start gap-3 transition-colors">
                      <Icon size={16} className="mt-1 text-muted-foreground" aria-hidden="true" />
                      <div> <p className="text-sm font-semibold text-foreground">{label}</p> <p className="text-[10px] text-muted-foreground">{desc}</p> </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div id="view-menu-wrapper" className="relative" ref={viewRef}>
              <Button variant="outline" size="sm" onClick={() => setIsViewMenuOpen(!isViewMenuOpen)} className="flex items-center gap-2">
                <Settings2 size={14} aria-hidden="true" /> <span>{t('view_options')}</span> <ChevronDown size={14} className={`transition-transform ${isViewMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </Button>
              {isViewMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-popover/95 backdrop-blur-md rounded-xl shadow-lg border border-border z-10 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                    <div className="p-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t('sort_by')}</label>
                        <div className="flex flex-col items-start gap-1 mt-2">
                            {(['score', 'price', 'year', 'name'] as const).map(option => (
                                <button key={option} onClick={() => onSort(option)} className="w-full text-left text-sm flex items-center gap-2 p-1.5 rounded-md hover:bg-accent text-foreground transition-colors">
                                    <div className="w-4">{sortBy === option && <Check size={14} className="text-primary" />}</div>
                                    {t(option as any) || option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-px bg-border my-1"></div>
                    <div onClick={() => setShowReference(!showReference)} className="w-full flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <Cpu size={16} className="text-muted-foreground" aria-hidden="true" /> <span className="text-sm font-medium text-foreground">{t('pc_reference')}</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${showReference ? 'bg-primary' : 'bg-input'}`}>
                            <div className={`w-4 h-4 bg-background rounded-full shadow-sm transform transition-transform ${showReference ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </div>
              )}
            </div>
          </div>
       </div>
       <div id="filter-controls-bottom-row" className="max-w-[980px] mx-auto grid grid-cols-3 gap-2 mt-3">
          <Select value={filterType} onValueChange={(val) => setFilterType(val as DeviceType | 'All')}>
            <SelectTrigger className="w-full" aria-label="Filter by Type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">{t('all')}</SelectItem>
              <SelectItem value={DeviceType.Laptop}>{t('laptops')}</SelectItem>
              <SelectItem value={DeviceType.Desktop}>{t('desktops')}</SelectItem>
              <SelectItem value={DeviceType.Tablet}>{t('tablets')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterFamily} onValueChange={(val) => setFilterFamily(val as ChipFamily | 'All')}>
            <SelectTrigger className="w-full" aria-label="Filter by Family">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableFamilies.map(f => (
                <SelectItem key={f} value={f}>{f === 'All' ? t('allChips') : t(`family_${f.toLowerCase()}` as any) || `${f} Series`}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterOS} onValueChange={setFilterOS}>
            <SelectTrigger className="w-full" aria-label="Filter by OS">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableOS.map(os => (
                <SelectItem key={os} value={os}>{os === 'All' ? '所有系统' : os}</SelectItem>
              ))}
            </SelectContent>
          </Select>
       </div>
    </section>
  );
};

export default FilterControls;
