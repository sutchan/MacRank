'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Scale, Code, Palette, Coffee, ChevronDown, Settings2, Check, Cpu } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { RankingScenario, SortKey } from '../types';
import { Button } from '@/components/ui/button';

interface ScenarioMenuProps {
  scenario: RankingScenario;
  setRankingScenario: (s: RankingScenario) => void;
}

export const ScenarioMenu = React.memo(function ScenarioMenu({ scenario, setRankingScenario }: ScenarioMenuProps) {
  const { t } = useContext(LanguageContext) as LanguageContextType;
  const [isScenarioMenuOpen, setIsScenarioMenuOpen] = useState(false);
  const scenarioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (scenarioRef.current && !scenarioRef.current.contains(event.target as Node)) setIsScenarioMenuOpen(false);
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

  const currentScenario = scenarios.find(s => s.key === scenario);

  return (
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
  );
});

interface ViewMenuProps {
  sortBy: SortKey;
  onSort: (k: SortKey) => void;
  showReference: boolean;
  setShowReference: (b: boolean) => void;
}

export const ViewMenu = React.memo(function ViewMenu({ sortBy, onSort, showReference, setShowReference }: ViewMenuProps) {
  const { t } = useContext(LanguageContext) as LanguageContextType;
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (viewRef.current && !viewRef.current.contains(event.target as Node)) setIsViewMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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
  );
});
