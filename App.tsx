import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { macData, calculateTierScore } from './lib/data';
import { ChipFamily, DeviceType, MacModel } from './lib/types';
import MacTable from './components/MacTable';
import PerformanceChart from './components/PerformanceChart';
import DetailModal from './components/DetailModal';
import AIChat from './components/AIChat';
import { translations, languages, Language } from './lib/translations';
import { Search, Monitor, Laptop, Filter, ArrowUpDown, Moon, Sun, Globe, ChevronDown } from 'lucide-react';

// Create Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => translations['en'][key] || key,
});

const App: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<MacModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<DeviceType | 'All'>('All');
  const [filterFamily, setFilterFamily] = useState<ChipFamily | 'All'>('All');
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'year'>('score');
  
  // Language State
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('language');
      if (stored && translations[stored as Language]) return stored as Language;
    }
    return 'en';
  });

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Theme State
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

  const filteredData = useMemo(() => {
    let result = macData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.chip.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || item.type === filterType;
      const matchesFamily = filterFamily === 'All' || item.family === filterFamily;
      
      return matchesSearch && matchesType && matchesFamily;
    });

    return result.sort((a, b) => {
      if (sortBy === 'score') {
        return calculateTierScore(b) - calculateTierScore(a);
      } else if (sortBy === 'price') {
        return b.basePriceUSD - a.basePriceUSD;
      } else {
        return b.releaseYear - a.releaseYear;
      }
    });
  }, [searchTerm, filterType, filterFamily, sortBy, macData]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen pb-32 bg-gray-50 dark:bg-black transition-colors duration-500 font-sans">
        
        {/* Apple Global Nav Style Header */}
        <header className="fixed w-full top-0 z-40 bg-[rgba(251,251,253,0.8)] dark:bg-[rgba(22,22,23,0.8)] backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
          <div className="max-w-[980px] mx-auto px-4 h-12 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
               <a href="#" className="text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 transition-opacity">
                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 9.6c-.7 0-1.7-.5-1.7-1.7s1-2.2 2-2.3c.1 0 .2 0 .2 0-1-1.3-2.6-1.5-3.2-1.5-1.4 0-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-3 1-3.9 2.4-1.6 2.4-.4 5.9 1.1 8 1 1.4 2 2.9 3.4 2.9.7 0 1-.2 1.9-.2.9 0 1.1.2 1.9.2 1.3 0 2.2-1.3 3.1-2.6.9-1.3 1.3-2.7 1.3-2.7s-2.1-1-2.2-2.9zM15 4.6c.6-.7 1-1.8 1-2.8 0-.1 0-.3 0-.4-.9.1-2 .7-2.6 1.4-.6.6-1 1.6-1 2.6 0 .1 0 .3 0 .4 1-.1 2.1-.6 2.6-1.2z"/></svg>
               </a>
               <span className="font-semibold text-gray-900 dark:text-white tracking-wide">{t('appTitle')}</span>
            </div>
            
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <span className="cursor-pointer hover:text-blue-500 transition-colors hidden sm:block">{t('leaderboard')}</span>
              <span className="cursor-pointer hover:text-blue-500 transition-colors hidden sm:block">{t('charts')}</span>
              
              <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-4">
                 {/* Language & Theme Controls - Minimalist */}
                 <div className="relative group">
                    <button className="hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Globe size={14} />
                    </button>
                    <div className="absolute right-0 top-full pt-4 hidden group-hover:block w-32">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 p-1 overflow-hidden">
                        {languages.map((lang) => (
                           <button key={lang.code} onClick={() => setLanguage(lang.code)} className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-900 dark:text-white text-xs">
                             {lang.flag} {lang.label}
                           </button>
                        ))}
                      </div>
                    </div>
                 </div>
                 
                 <button onClick={toggleTheme} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                   {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                 </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[980px] mx-auto px-4 pt-28 space-y-16">
          
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
               {t('heroTitle')}
             </h2>
             <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
               {t('heroSubtitle')}
             </p>
          </div>

          {/* Controls - Sticky */}
          <section className="sticky top-14 z-30 bg-[rgba(251,251,253,0.8)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-xl py-4 -mx-4 px-4 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
             <div className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search - Pill Style */}
                <div className="relative w-full md:w-80 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-200/50 dark:bg-gray-800/50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm text-gray-900 dark:text-white placeholder-gray-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                    {/* Segmented Control */}
                    <div className="flex bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-lg">
                      {(['All', DeviceType.Laptop, DeviceType.Desktop] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilterType(type)}
                          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                            filterType === type 
                              ? 'bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm' 
                              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          {type === 'All' ? t('all') : type === DeviceType.Laptop ? t('laptops') : t('desktops')}
                        </button>
                      ))}
                    </div>

                    <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

                    {/* Dropdowns - Minimal */}
                    <div className="relative group">
                       <select 
                          value={filterFamily}
                          onChange={(e) => setFilterFamily(e.target.value as any)}
                          className="appearance-none bg-transparent pl-2 pr-8 py-1 text-sm font-medium text-gray-900 dark:text-white focus:outline-none cursor-pointer hover:text-blue-500 transition-colors"
                        >
                          <option value="All">{t('allChips')}</option>
                          <option value={ChipFamily.M4}>M4 Family</option>
                          <option value={ChipFamily.M3}>M3 Family</option>
                          <option value={ChipFamily.M2}>M2 Family</option>
                          <option value={ChipFamily.M1}>M1 Family</option>
                          <option value={ChipFamily.Intel}>Intel Series</option>
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
          </section>

          {/* Charts Section - Clean & Minimal */}
          <section className="py-8 border-b border-gray-200 dark:border-gray-800">
             <div className="mb-8">
               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t('topIndex')}</h3>
               <p className="text-gray-500 dark:text-gray-400 text-sm">{t('performance')} (Geekbench 6 & Metal)</p>
             </div>
            <PerformanceChart data={filteredData} />
          </section>

          {/* List Section */}
          <section className="space-y-6">
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t('leaderboard')}</h3>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                 {filteredData.length} {t('models')}
              </span>
            </div>
            <MacTable data={filteredData} onSelect={setSelectedModel} />
          </section>

          {/* Footnote */}
          <footer className="text-xs text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800 text-center">
             <p>MacRank uses synthetic scores based on Geekbench 6 data. Prices reflect launch MSRP in USD.</p>
             <p className="mt-2">Copyright © 2025 MacRank. Not affiliated with Apple Inc.</p>
          </footer>

        </main>

        <DetailModal mac={selectedModel} onClose={() => setSelectedModel(null)} />
        <AIChat macData={filteredData} />
      </div>
    </LanguageContext.Provider>
  );
};

export default App;