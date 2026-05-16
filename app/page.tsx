
// v0.3.1
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { macData, refData, calculateTierScore } from '@/app/lib/data';
import { ChipFamily, DeviceType, MacModel, RankingScenario } from '@/app/lib/types';
import MacTable from '@/app/components/MacTable';
import PerformanceChart from '@/app/components/PerformanceChart';
import DetailModal from '@/app/components/DetailModal';
import CompareModal from '@/app/components/CompareModal';
import SettingsModal from '@/app/components/SettingsModal';
import AIChat from '@/app/components/AIChat';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import FilterControls from '@/app/components/FilterControls';
import Footer from '@/app/components/Footer';
import { translations, Language, LanguageContext } from '@/app/lib/translations';
import { Scale, Check, ArrowUp } from 'lucide-react';
import { shareContent } from '@/app/lib/share';

const APP_VERSION = '0.3.1';

export default function Home() {
  const getInitialState = (): {
    search: string;
    type: DeviceType | 'All';
    family: ChipFamily | 'All';
    sort: 'score' | 'price' | 'year';
    scenario: RankingScenario;
    compareIds: string[];
    showRef: boolean;
  } => {
    if (typeof window === 'undefined') return {
      search: '', type: 'All', family: 'All', sort: 'score', scenario: 'balanced', compareIds: [], showRef: false
    };
    
    const params = new URLSearchParams(window.location.search);
    
    const validTypes: string[] = ['All', DeviceType.Laptop, DeviceType.Desktop, DeviceType.Tablet];
    const validFamilies: string[] = ['All', ChipFamily.M4, ChipFamily.M3, ChipFamily.M2, ChipFamily.M1, ChipFamily.Intel];
    const validSorts: string[] = ['score', 'price', 'year'];
    const validScenarios: string[] = ['balanced', 'developer', 'creative', 'daily'];

    const typeParam = params.get('type') || '';
    const familyParam = params.get('family') || '';
    const sortParam = params.get('sort') || '';
    const scenarioParam = params.get('scenario') || '';

    return {
      search: params.get('search') || '',
      type: (validTypes.includes(typeParam) ? typeParam : 'All') as DeviceType | 'All',
      family: (validFamilies.includes(familyParam) ? familyParam : 'All') as ChipFamily | 'All',
      sort: (validSorts.includes(sortParam) ? sortParam : 'score') as 'score' | 'price' | 'year',
      scenario: (validScenarios.includes(scenarioParam) ? scenarioParam : 'balanced') as RankingScenario,
      compareIds: params.get('compare') ? params.get('compare')?.split(',') || [] : [],
      showRef: params.get('ref') === 'true'
    };
  };

  const initialState = getInitialState();

  const [selectedModel, setSelectedModel] = useState<MacModel | null>(null);
  
  const [compareList, setCompareList] = useState<MacModel[]>(() => {
    return macData.filter(m => initialState.compareIds.includes(m.id)).slice(0, 2);
  });
  
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialState.search);
  const [filterType, setFilterType] = useState<DeviceType | 'All'>(initialState.type);
  const [filterFamily, setFilterFamily] = useState<ChipFamily | 'All'>(initialState.family);
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'year'>(initialState.sort);
  const [rankingScenario, setRankingScenario] = useState<RankingScenario>(initialState.scenario);
  const [showReference, setShowReference] = useState(initialState.showRef);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const initialLoadRef = useRef(true);
  useEffect(() => {
    if (initialLoadRef.current && compareList.length === 2) {
      setIsCompareModalOpen(true);
    }
    initialLoadRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareList.length]);

  useEffect(() => {
    if (initialLoadRef.current) return;

    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (filterType !== 'All') params.set('type', filterType);
    if (filterFamily !== 'All') params.set('family', filterFamily);
    if (sortBy !== 'score') params.set('sort', sortBy);
    if (rankingScenario !== 'balanced') params.set('scenario', rankingScenario);
    if (showReference) params.set('ref', 'true');
    if (compareList.length > 0) params.set('compare', compareList.map(m => m.id).join(','));

    try {
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
    } catch (e) {
      console.debug('URL sync skipped:', e);
    }
  }, [searchTerm, filterType, filterFamily, sortBy, compareList, rankingScenario, showReference]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('language');
      if (stored && translations[stored as Language]) return stored as Language;
    }
    return 'en';
  });

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || (translations['en'] as Record<string, string>)[key] || key;
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('theme');
      if (stored) return stored as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleToggleCompare = (mac: MacModel) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === mac.id);
      if (exists) {
        return prev.filter(p => p.id !== mac.id);
      }
      if (prev.length >= 2) return prev;
      return [...prev, mac];
    });
  };

  const filteredData = useMemo(() => {
    const sourceData = showReference ? [...macData, ...refData] : macData;

    const filtered = sourceData.filter(item => {
      if (item.isReference && !searchTerm) return true;

      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.chip.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (item.isReference) return matchesSearch;

      const matchesType = filterType === 'All' || item.type === filterType;
      const matchesFamily = filterFamily === 'All' || item.family === filterFamily;
      
      return matchesSearch && matchesType && matchesFamily;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'score') {
        return calculateTierScore(b, rankingScenario) - calculateTierScore(a, rankingScenario);
      } else if (sortBy === 'price') {
        return b.basePriceUSD - a.basePriceUSD;
      } else {
        return b.releaseYear - a.releaseYear;
      }
    });

    return sorted;
  }, [searchTerm, filterType, filterFamily, sortBy, rankingScenario, showReference]);

  const maxScoreInView = useMemo(() => {
      if (filteredData.length === 0) return 10000;
      return Math.max(...filteredData.map(m => calculateTierScore(m, rankingScenario)));
  }, [filteredData, rankingScenario]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAppShare = async () => {
    let contextTitle = '';
    if (filterFamily !== 'All') {
        contextTitle = t(('family_' + filterFamily.toLowerCase().replace(' ', '')) as keyof typeof translations['en']) || filterFamily;
    } else if (filterType !== 'All') {
         const typeKeyMap: Record<string, string> = {
            'Laptop': 'laptops',
            'Desktop': 'desktops',
            'Tablet': 'tablets'
         };
         const typeKey = typeKeyMap[filterType] || filterType;
         contextTitle = t(typeKey as keyof typeof translations['en']);
    }

    const shareTitle = contextTitle ? `${contextTitle} - MacRank` : t('appTitle');
    const baseMessage = t('share_message') || 'Check out MacRank!';
    const shareText = contextTitle 
        ? `${contextTitle} | ${baseMessage}`
        : baseMessage;

    const result = await shareContent({
        title: shareTitle,
        text: shareText,
        url: window.location.href
    });

    if (result === 'copied') {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div id="app-root" className="min-h-screen pb-32 bg-gray-50 dark:bg-black transition-colors duration-500 font-sans relative">
        
        <Header 
          onScrollToSection={scrollToSection} 
          onOpenSettings={() => setIsSettingsOpen(true)} 
        />

        <main id="main-content" className="max-w-[980px] mx-auto px-4 pt-28 space-y-12">
          
          <Hero />

          <FilterControls 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            filterType={filterType} setFilterType={setFilterType}
            filterFamily={filterFamily} setFilterFamily={setFilterFamily}
            sortBy={sortBy} setSortBy={setSortBy}
            rankingScenario={rankingScenario} setRankingScenario={setRankingScenario}
            onShare={handleAppShare}
            showReference={showReference}
            setShowReference={setShowReference}
          />

          <section id="charts-section" className="py-4 border-b border-gray-200 dark:border-gray-800 scroll-mt-36">
             <div className="mb-8">
               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t('charts')}</h3>
               <p className="text-gray-500 dark:text-gray-400 text-sm">{t('perf_subtitle')}</p>
             </div>
            <PerformanceChart data={filteredData} onSelect={setSelectedModel} scenario={rankingScenario} />
          </section>

          <section id="leaderboard-section" className="space-y-6 scroll-mt-36">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('leaderboard')}</h2>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                 {filteredData.length} {t('models')}
              </span>
            </div>
            <MacTable 
              data={filteredData} 
              onSelect={setSelectedModel} 
              compareList={compareList} 
              onToggleCompare={handleToggleCompare}
              scenario={rankingScenario}
              maxScore={maxScoreInView}
            />
          </section>

          <Footer version={APP_VERSION} />

        </main>

        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          aria-label={t('back_to_top')}
          className={`fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
            showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
          }`}
        >
          <ArrowUp size={20} />
        </button>

        {compareList.length > 0 && (
          <div id="compare-floating-bar" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10 duration-300">
             <div className="bg-white dark:bg-gray-800 rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 p-2 pl-6 pr-2 flex items-center gap-6">
                 <div className="flex items-center gap-3">
                   <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {compareList.length} {t('selectToCompare')}
                   </span>
                   <div className="flex -space-x-2">
                      {compareList.map(m => (
                        <div key={m.id} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                           {m.chip.split(' ')[0]}
                        </div>
                      ))}
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCompareList([])}
                      className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white px-3 py-1.5"
                    >
                      {t('clear')}
                    </button>
                    <button 
                      onClick={() => setIsCompareModalOpen(true)}
                      disabled={compareList.length < 2}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                       <Scale size={16} />
                       {t('compare')}
                    </button>
                 </div>
             </div>
          </div>
        )}

        <div id="toast-notification" className={`fixed top-20 left-1/2 -translate-x-1/2 bg-black/80 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-full shadow-lg text-sm font-medium transition-all duration-300 z-[60] flex items-center gap-2 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           <Check size={14} />
           {t('link_copied')}
        </div>

        <DetailModal mac={selectedModel} onClose={() => setSelectedModel(null)} scenario={rankingScenario} />
        {isCompareModalOpen && (
           <CompareModal models={compareList} onClose={() => setIsCompareModalOpen(false)} scenario={rankingScenario} />
        )}
        {isSettingsOpen && (
          <SettingsModal 
            onClose={() => setIsSettingsOpen(false)} 
            theme={theme} 
            toggleTheme={toggleTheme} 
          />
        )}
        <AIChat macData={filteredData} />
      </div>
    </LanguageContext.Provider>
  );
}
