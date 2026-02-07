import React, { useState, useMemo, useEffect } from 'react';
import { macData, calculateTierScore } from './lib/data';
import { ChipFamily, DeviceType, MacModel } from './lib/types';
import MacTable from './components/MacTable';
import PerformanceChart from './components/PerformanceChart';
import DetailModal from './components/DetailModal';
import AIChat from './components/AIChat';
import { Search, Monitor, Laptop, Filter, ArrowUpDown, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<MacModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<DeviceType | 'All'>('All');
  const [filterFamily, setFilterFamily] = useState<ChipFamily | 'All'>('All');
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'year'>('score');
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('theme');
      if (stored) return stored as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply Theme
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
  }, [searchTerm, filterType, filterFamily, sortBy]);

  return (
    <div className="min-h-screen pb-20 bg-[#f5f5f7] dark:bg-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-xl transition-colors">
               
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">MacRank</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">Leaderboard</span>
              <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">Charts</span>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-2">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Apple Silicon Performance Tier List</h2>
             <p className="text-gray-500 dark:text-gray-400 max-w-xl">
               Comprehensive benchmark scores and specs for the M-series era. 
               Compare models, check tier rankings, and find the perfect Mac for your workflow.
             </p>
          </div>
        </div>

        {/* Charts Section */}
        <section>
          <PerformanceChart data={filteredData} />
        </section>

        {/* Controls Section */}
        <section className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 sticky top-20 z-20 transition-colors">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search MacBook, iMac, M3 Max..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                <button 
                  onClick={() => setFilterType('All')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filterType === 'All' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterType(DeviceType.Laptop)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filterType === DeviceType.Laptop ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <Laptop size={14} /> Laptops
                </button>
                <button 
                   onClick={() => setFilterType(DeviceType.Desktop)}
                   className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filterType === DeviceType.Desktop ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  <Monitor size={14} /> Desktops
                </button>
              </div>

              <select 
                value={filterFamily}
                onChange={(e) => setFilterFamily(e.target.value as any)}
                className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
              >
                <option value="All">All Chips</option>
                <option value={ChipFamily.M4}>M4 Family</option>
                <option value={ChipFamily.M3}>M3 Family</option>
                <option value={ChipFamily.M2}>M2 Family</option>
                <option value={ChipFamily.M1}>M1 Family</option>
                <option value={ChipFamily.Intel}>Intel Series</option>
              </select>

              <button 
                onClick={() => {
                   const next = sortBy === 'score' ? 'price' : sortBy === 'price' ? 'year' : 'score';
                   setSortBy(next);
                }}
                className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowUpDown size={14} />
                Sort: <span className="text-gray-900 dark:text-white capitalize">{sortBy}</span>
              </button>
            </div>
          </div>
        </section>

        {/* List Section */}
        <section>
          <div className="mb-2 flex items-center justify-between">
             <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-2">
               Showing {filteredData.length} Models
             </span>
          </div>
          <MacTable data={filteredData} onSelect={setSelectedModel} />
        </section>

      </main>

      {/* Modals & Overlays */}
      <DetailModal mac={selectedModel} onClose={() => setSelectedModel(null)} />
      <AIChat macData={filteredData} />
    </div>
  );
};

export default App;