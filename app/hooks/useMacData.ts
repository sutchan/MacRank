// app/hooks/useMacData.ts v0.6.2
import { useState, useMemo } from 'react';
import { macData, refData } from '../data/data';
import { calculateTierScore } from '../lib/scoring';
import { ChipFamily, DeviceType, MacModel, RankingScenario, SortKey } from '../types';

const getInitialStateFromURL = () => {
  if (typeof window === 'undefined') return {
    search: '', 
    type: 'All' as DeviceType | 'All', 
    family: 'All' as ChipFamily | 'All', 
    os: 'All' as string,
    sortConfig: { key: 'score' as SortKey, direction: 'desc' as 'asc' | 'desc' }, 
    scenario: 'balanced' as RankingScenario, 
    showRef: false, 
  };
  
  const params = new URLSearchParams(window.location.hash.substring(1));
  return {
    search: params.get('search') || '',
    type: (params.get('type') || 'All') as DeviceType | 'All',
    family: (params.get('family') || 'All') as ChipFamily | 'All',
    os: (params.get('os') || 'All') as string,
    sortConfig: {
      key: (params.get('sort') || 'score') as SortKey,
      direction: (params.get('dir') === 'asc' ? 'asc' : 'desc') as 'asc' | 'desc'
    },
    scenario: (params.get('scenario') || 'balanced') as RankingScenario,
    showRef: params.get('ref') === 'true',
  };
};

export const useMacData = () => {
  const [initialState] = useState(() => getInitialStateFromURL());
  const [searchTerm, setSearchTerm] = useState(initialState.search);
  const [filterType, setFilterType] = useState<DeviceType | 'All'>(initialState.type);
  const [filterFamily, setFilterFamily] = useState<ChipFamily | 'All'>(initialState.family);
  const [filterOS, setFilterOS] = useState<string>(initialState.os);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>(initialState.sortConfig);
  const [rankingScenario, setRankingScenario] = useState<RankingScenario>(initialState.scenario);
  const [showReference, setShowReference] = useState(initialState.showRef);
  
  const availableFamilies = useMemo(() => {
    const familySet = new Set(macData.filter(m => !m.isReference).map(m => m.family));
    return ['All', ...Object.values(ChipFamily).filter(f => familySet.has(f) && f !== ChipFamily.Reference)];
  }, []);

  const availableOS = useMemo(() => {
    const osSet = new Set(macData.map(m => m.os).filter(Boolean) as string[]);
    return ['All', ...Array.from(osSet).sort((a,b) => b.localeCompare(a))];
  }, []);

  const filteredData = useMemo(() => {
    const sourceData = showReference ? [...macData, ...refData] : macData;
    const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);
    
    let result = sourceData.filter(item => {
      const dataStr = `${item.name} ${item.chip} ${item.releaseYear} ${item.memory} ${item.cores_cpu} ${item.cores_gpu} ${item.os || ''}`.toLowerCase();
      const matchesSearch = searchTerms.every(term => dataStr.includes(term));
      if (item.isReference) return matchesSearch;
      return matchesSearch 
        && (filterType === 'All' || item.type === filterType) 
        && (filterFamily === 'All' || item.family === filterFamily)
        && (filterOS === 'All' || item.os === filterOS);
    });

    return result.sort((a, b) => {
      let valA: any, valB: any;
      if (sortConfig.key === 'score') {
        valA = calculateTierScore(a, rankingScenario);
        valB = calculateTierScore(b, rankingScenario);
      } else {
        valA = a[sortConfig.key as keyof MacModel] ?? 0;
        valB = b[sortConfig.key as keyof MacModel] ?? 0;
      }
      return sortConfig.direction === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
    });
  }, [searchTerm, filterType, filterFamily, filterOS, sortConfig, rankingScenario, showReference]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => ({
        key,
        direction: prev.key === key ? (prev.direction === 'asc' ? 'desc' : 'asc') : 'desc'
    }));
  };

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterFamily,
    setFilterFamily,
    filterOS,
    setFilterOS,
    availableFamilies,
    availableOS,
    sortConfig,
    handleSort,
    rankingScenario,
    setRankingScenario,
    showReference,
    setShowReference,
    filteredData
  };
};