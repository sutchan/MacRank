import React, { useState, useMemo, useEffect, useRef } from 'react';
import { macData, calculateTierScore } from './lib/data';
import { ChipFamily, DeviceType, MacModel } from './lib/types';
import MacTable from './components/MacTable';
import PerformanceChart from './components/PerformanceChart';
import DetailModal from './components/DetailModal';
import CompareModal from './components/CompareModal';
import SettingsModal from './components/SettingsModal';
import AIChat from './components/AIChat';
import { translations, languages, Language, LanguageContext } from './lib/translations';
import { Search, ChevronDown, Scale, X, Github, Share2, ArrowUp, Check, Settings, Globe, Moon, Sun } from 'lucide-react';

const APP_VERSION = '0.1.13';

const App: React.FC = () => {
  // --- State Initialization with URL Parsing ---
  // We initialize state lazily to parse URL params once on mount
  const getInitialState = (): {
    search: string;
    type: DeviceType | 'All';
    family: ChipFamily | 'All';
    sort: 'score' | 'price' | 'year';
    compareIds: string[];
  } => {
    if (typeof window === 'undefined') return {
      search: '', type: 'All', family: 'All', sort: 'score', compareIds: []
    };
    
    const params = new URLSearchParams(window.location.search);
    
    // Explicitly check against string arrays to ensure type safety
    const validTypes: string[] = ['All', DeviceType.Laptop, DeviceType.Desktop, DeviceType.Tablet];
    const validFamilies: string[] = ['All', ChipFamily.M4, ChipFamily.M3, ChipFamily.M2, ChipFamily.M1, ChipFamily.Intel];
    const validSorts: string[] = ['score', 'price', 'year'];

    const typeParam = params.get('type') || '';
    const familyParam = params.get('family') || '';
    const sortParam = params.get('sort') || '';

    return {
      search: params.get('search') || '',
      type: (validTypes.includes(typeParam) ? typeParam : 'All') as DeviceType | 'All',
      family: (validFamilies.includes(familyParam) ? familyParam : 'All') as ChipFamily | 'All',
      sort: (validSorts.includes(sortParam) ? sortParam : 'score') as 'score' | 'price' | 'year',
      compareIds: params.get('compare') ? params.get('compare')?.split(',') || [] : []
    };
  };

  const initialState = getInitialState();

  const [selectedModel, setSelectedModel] = useState<MacModel | null>(null);
  
  // Initialize compare list based on IDs found in URL
  const [compareList, setCompareList] = useState<MacModel[]>(() => {
    return macData.filter(m => initialState.compareIds.includes(m.id)).slice(0, 2);
  });
  
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialState.search);
  const [filterType, setFilterType] = useState<DeviceType | 'All'>(initialState.type);
  const [filterFamily, setFilterFamily] = useState<ChipFamily | 'All'>(initialState.family);
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'year'>(initialState.sort);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Auto-open compare modal if 2 items were loaded from URL
  const initialLoadRef = useRef(true);
  useEffect(() => {
    if (initialLoadRef.current && compareList.length === 2) {
      setIsCompareModalOpen(true);
    }
    initialLoadRef.current = false;
  }, []);

  // --- URL Synchronization ---
  useEffect(() => {
    if (initialLoadRef.current) return; // Skip on first render to avoid overwriting initial parse

    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (filterType !== 'All') params.set('type', filterType);
    if (filterFamily !== 'All') params.set('family', filterFamily);
    if (sortBy !== 'score') params.set('sort', sortBy);
    if (compareList.length > 0) params.set('compare', compareList.map(m => m.id).join(','));

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [searchTerm, filterType, filterFamily, sortBy, compareList]);

  // --- Scroll Listener for Back to Top ---
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
    
    // SEO: Dynamic Title Update based on Language
    const titles: Record<Language, string> = {
      en: "MacRank - Apple Silicon Performance Leaderboard & Tier List",
      zh: "MacRank - 苹果电脑性能天梯榜 (M1/M2/M3/M4)",
      es: "MacRank - Ranking de Rendimiento Apple Silicon",
      fr: "MacRank - Classement de Performance Apple Silicon",
      de: "MacRank - Apple Silicon Leistungs-Rangliste",
      ja: "MacRank - Apple Silicon 性能ランキング",
      pt: "MacRank - Ranking de Desempenho Apple Silicon",
      ru: "MacRank - Рейтинг производительности Apple Silicon",
      ko: "MacRank - Apple Silicon 성능 등급표",
      hi: "MacRank - Apple Silicon प्रदर्शन टियर सूची"
    };
    document.title = titles[language] || titles['en'];
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

  const handleToggleCompare = (mac: MacModel) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === mac.id);
      if (exists) {
        return prev.filter(p => p.id !== mac.id);
      }
      if (prev.length >= 2) return prev; // Max 2
      return [...prev, mac];
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Header (48px) + Sticky Controls (~60px) + Padding
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen pb-32 bg-gray-50 dark:bg-black transition-colors duration-500 font-sans relative">
        
        {/* Apple Global Nav Style Header */}
        <header className="fixed w-full top-0 z-40 bg-[rgba(251,251,253,0.8)] dark:bg-[rgba(22,22,23,0.8)] backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
          <div className="max-w-[980px] mx-auto px-4 h-12 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
               <a href="/" className="text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 transition-opacity" aria-label="Home">
                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 9.6c-.7 0-1.7-.5-1.7-1.7s1-2.2 2-2.3c.1 0 .2 0 .2 0-1-1.3-2.6-1.5-3.2-1.5-1.4 0-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-3 1-3.9 2.4-1.6 2.4-.4 5.9 1.1 8 1 1.4 2 2.9 3.4 2.9.7 0 1-.2 1.9-.2.9 0 1.1.2 1.9.2 1.3 0 2.2-1.3 3.1-2.6.9-1.3 1.3-2.7 1.3-2.7s-2.1-1-2.2-2.9zM15 4.6c.6-.7 1-1.8 1-2.8 0-.1 0-.3 0-.4-.9.1-2 .7-2.6 1.4-.6.6-1 1.6-1 2.6 0 .1 0 .3 0 .4 1-.1 2.1-.6 2.6-1.2z"/></svg>
               </a>
               <span className="font-semibold text-gray-900 dark:text-white tracking-wide cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>{t('appTitle')}</span>
            </div>
            
            <nav className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <button onClick={() => scrollToSection('leaderboard')} className="cursor-pointer hover:text-blue-500 transition-colors hidden sm:block font-medium">{t('leaderboard')}</button>
              <button onClick={() => scrollToSection('charts')} className="cursor-pointer hover:text-blue-500 transition-colors hidden sm:block font-medium">{t('charts')}</button>
              
              <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-4">
                 <button 
                   onClick={() => setIsSettingsOpen(true)}
                   className="hover:text-gray-900 dark:hover:text-white transition-colors" 
                   aria-label="Settings"
                 >
                   <Settings size={16} />
                 </button>
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-[980px] mx-auto px-4 pt-28 space-y-16">
          
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
               {t('heroTitle')}
             </h1>
             <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
               {t('heroSubtitle')}
             </p>
          </div>

          {/* Controls - Sticky */}
          <section className="sticky top-14 z-30 bg-[rgba(251,251,253,0.8)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-xl py-4 -mx-4 px-4 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
             <div className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search - Pill Style */}
                <div className="flex w-full md:w-auto items-center gap-2">
                  <div className="relative w-full md:w-80 group">
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
                  <button 
                    onClick={handleShare}
                    className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label={t('share')}
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                    {/* Segmented Control */}
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

                    {/* Dropdowns - Minimal */}
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
          </section>

          {/* Charts Section - Clean & Minimal */}
          <section id="charts" className="py-8 border-b border-gray-200 dark:border-gray-800 scroll-mt-32">
             <div className="mb-8">
               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{t('charts')}</h3>
               <p className="text-gray-500 dark:text-gray-400 text-sm">{t('perf_subtitle')}</p>
             </div>
            <PerformanceChart data={filteredData} onSelect={setSelectedModel} />
          </section>

          {/* List Section */}
          <section id="leaderboard" className="space-y-6 scroll-mt-32">
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
            />
          </section>

          {/* Footnote */}
          <footer className="text-xs text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800 text-center">
             <p>{t('footer_disclaimer')}</p>
             <p className="mt-2">{t('footer_copyright')}</p>
             <div className="mt-6 flex flex-col items-center gap-3">
               <a 
                 href="https://github.com/sutchan/MacRank" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200 group"
                 aria-label="View on GitHub"
               >
                 <Github size={16} className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                 <span className="font-medium">GitHub</span>
               </a>
               <span className="font-mono text-[10px] opacity-40">v{APP_VERSION}</span>
             </div>
          </footer>

        </main>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          aria-label={t('back_to_top')}
          className={`fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
            showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
          }`}
        >
          <ArrowUp size={20} />
        </button>

        {/* Floating Compare Bar */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10 duration-300">
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

        {/* Toast Notification */}
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 bg-black/80 dark:bg-white/90 text-white dark:text-black px-4 py-2 rounded-full shadow-lg text-sm font-medium transition-all duration-300 z-[60] flex items-center gap-2 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           <Check size={14} />
           {t('link_copied')}
        </div>

        <DetailModal mac={selectedModel} onClose={() => setSelectedModel(null)} />
        {isCompareModalOpen && (
           <CompareModal models={compareList} onClose={() => setIsCompareModalOpen(false)} />
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
};

export default App;