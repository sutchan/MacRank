// App.tsx v0.7.0
import React, { useEffect } from 'react';
import MacTable from './app/components/MacTable';
import PerformanceChart from './app/components/PerformanceChart';
import DetailModal from './app/components/DetailModal';
import CompareModal from './app/components/CompareModal';
import CompareBar from './app/components/CompareBar';
import SettingsModal from './app/components/SettingsModal';
import AIChat from './app/components/AIChat';
import Header from './app/components/Header';
import Hero from './app/components/Hero';
import FilterControls from './app/components/FilterControls';
import Footer from './app/components/Footer';
import { LanguageContext } from './app/locales/translations';
import { ArrowUp, Check } from 'lucide-react';
import { shareContent } from './app/lib/share';
import { useSettings } from './app/hooks/useSettings';
import { useMacData } from './app/hooks/useMacData';
import { useInteraction } from './app/hooks/useInteraction';

const APP_VERSION = '0.7.0';

const App: React.FC = () => {
  const settings = useSettings();
  const data = useMacData();
  const interaction = useInteraction();
  const { t } = settings;

  // URL Hash State Management
  useEffect(() => {
    if (interaction.isInitialLoad) return;
    
    const params = new URLSearchParams();
    if (data.searchTerm) params.set('search', data.searchTerm);
    if (data.filterType !== 'All') params.set('type', data.filterType);
    if (data.filterFamily !== 'All') params.set('family', data.filterFamily);
    if (data.filterOS !== 'All') params.set('os', data.filterOS);
    if (data.sortConfig.key !== 'score' || data.sortConfig.direction !== 'desc') {
        params.set('sort', data.sortConfig.key);
        params.set('dir', data.sortConfig.direction);
    }
    if (data.rankingScenario !== 'balanced') params.set('scenario', data.rankingScenario);
    if (data.showReference) params.set('ref', 'true');
    if (interaction.compareList.length > 0) params.set('compare', interaction.compareList.map(m => m.id).join(','));
    if (interaction.selectedModel) params.set('model', interaction.selectedModel.id);

    const newHash = params.toString();
    if (window.location.hash.substring(1) !== newHash) {
      window.location.hash = newHash;
    }
  }, [
    data.searchTerm, data.filterType, data.filterFamily, data.filterOS, data.sortConfig, 
    data.rankingScenario, data.showReference, interaction.compareList, 
    interaction.selectedModel, interaction.isInitialLoad
  ]);

  const handleAppShare = async () => {
    const result = await shareContent({ title: t('appTitle'), text: t('share_message'), url: window.location.href });
    if (result === 'copied') { interaction.handleShowToast(); }
  };

  return (
    <LanguageContext.Provider value={settings}>
      <div id="main-layout-container" className="min-h-screen pb-32 bg-gray-50 dark:bg-black transition-colors duration-500 font-sans relative selection:bg-blue-100 dark:selection:bg-blue-900/30">
        <Header 
            onScrollToSection={(id) => {
                const el = document.getElementById(id);
                if (el) window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' });
            }} 
            onOpenSettings={() => interaction.setIsSettingsOpen(true)} 
        />

        <main id="app-main-content" className="max-w-[980px] mx-auto px-4 pt-28 space-y-12">
          <Hero onShare={handleAppShare} />
          
          <FilterControls 
            searchTerm={data.searchTerm} setSearchTerm={data.setSearchTerm}
            filterType={data.filterType} setFilterType={data.setFilterType}
            filterFamily={data.filterFamily} setFilterFamily={data.setFilterFamily}
            filterOS={data.filterOS} setFilterOS={data.setFilterOS}
            availableFamilies={data.availableFamilies}
            availableOS={data.availableOS}
            sortBy={data.sortConfig.key} onSort={data.handleSort}
            rankingScenario={data.rankingScenario} setRankingScenario={data.setRankingScenario}
            showReference={data.showReference} setShowReference={data.setShowReference}
          />
          
          <section id="charts-section" className="scroll-mt-32">
            <PerformanceChart data={data.filteredData} onSelect={interaction.setSelectedModel} scenario={data.rankingScenario} />
          </section>
          
          <section id="leaderboard-section" className="scroll-mt-32">
            <MacTable 
              data={data.filteredData} 
              onSelect={interaction.setSelectedModel} 
              compareList={interaction.compareList} 
              onToggleCompare={interaction.handleToggleCompare}
              scenario={data.rankingScenario} 
              sortConfig={data.sortConfig} 
              onSort={data.handleSort}
            />
          </section>
          
          <Footer version={APP_VERSION} />
        </main>

        <button 
          id="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className={`fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full shadow-lg glass-panel flex items-center justify-center transition-all ${interaction.showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
          aria-label={t('back_to_top')}
        >
          <ArrowUp size={24} />
        </button>

        <CompareBar 
          models={interaction.compareList}
          isVisible={interaction.compareList.length > 0 && !interaction.isCompareModalOpen}
          onRemove={(id) => interaction.setCompareList(prev => prev.filter(p => p.id !== id))}
          onClear={() => interaction.setCompareList([])}
          onCompare={() => interaction.setIsCompareModalOpen(true)}
        />

        <DetailModal mac={interaction.selectedModel} onClose={() => interaction.setSelectedModel(null)} scenario={data.rankingScenario} />
        
        {interaction.compareList.length === 2 && interaction.isCompareModalOpen && (
          <CompareModal models={interaction.compareList} onClose={() => interaction.setIsCompareModalOpen(false)} scenario={data.rankingScenario} />
        )}
        
        {interaction.isSettingsOpen && (
          <SettingsModal 
            onClose={() => interaction.setIsSettingsOpen(false)} 
            theme={settings.theme} 
            toggleTheme={settings.toggleTheme} 
            version={APP_VERSION}
          />
        )}

        <AIChat macData={data.filteredData} />
        
        {interaction.showToast && (
          <div id="toast-notification" className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
             <Check size={18} className="text-green-400" />
             <span className="text-sm font-medium">{t('link_copied')}</span>
          </div>
        )}
      </div>
    </LanguageContext.Provider>
  );
};

export default App;