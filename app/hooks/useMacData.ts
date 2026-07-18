// app/hooks/useMacData.ts v0.7.6
import { useState, useMemo, useEffect, useCallback } from 'react';
import { macData, refData } from '../data/data';
import { calculateTierScore } from '../lib/scoring';
import { calculateValueScore, fetchRealTimePrices } from '../services/priceService';
import { parseUrlParams, updateUrlHash } from '../lib/urlParams';
import { ChipFamily, DeviceType, MacModel, RankingScenario, SortKey } from '../types';

const getDefaultState = () => ({
  search: '', 
  type: 'All' as DeviceType | 'All', 
  family: 'All' as ChipFamily | 'All', 
  os: 'All' as string,
  sortConfig: { key: 'score' as SortKey, direction: 'desc' as 'asc' | 'desc' }, 
  scenario: 'balanced' as RankingScenario, 
  showRef: false, 
});

export const useMacData = () => {
  const [searchTerm, setSearchTerm] = useState(getDefaultState().search);
  const [filterType, setFilterType] = useState<DeviceType | 'All'>(getDefaultState().type);
  const [filterFamily, setFilterFamily] = useState<ChipFamily | 'All'>(getDefaultState().family);
  const [filterOS, setFilterOS] = useState<string>(getDefaultState().os);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>(getDefaultState().sortConfig);
  const [rankingScenario, setRankingScenario] = useState<RankingScenario>(getDefaultState().scenario);
  const [showReference, setShowReference] = useState(getDefaultState().showRef);
  const [liveData, setLiveData] = useState<MacModel[]>(macData);

  useEffect(() => {
    const params = parseUrlParams();
    if (params.search !== undefined) setSearchTerm(params.search || '');
    if (params.type !== undefined) setFilterType(params.type);
    if (params.family !== undefined) setFilterFamily(params.family);
    if (params.os !== undefined) setFilterOS(params.os || 'All');
    if (params.sort !== undefined || params.dir !== undefined) {
      setSortConfig({
        key: params.sort || 'score',
        direction: params.dir || 'desc'
      });
    }
    if (params.scenario !== undefined) setRankingScenario(params.scenario);
    if (params.ref !== undefined) setShowReference(params.ref);
  }, []);

  useEffect(() => {
    fetchRealTimePrices(macData).then(setLiveData);
  }, []);
  
  const availableFamilies = useMemo(() => {
    const familySet = new Set(macData.filter(m => !m.isReference).map(m => m.family));
    return ['All', ...Object.values(ChipFamily).filter(f => familySet.has(f) && f !== ChipFamily.Reference)] as (ChipFamily | 'All')[];
  }, []);

  const availableOS = useMemo(() => {
    const osSet = new Set(macData.map(m => m.os).filter(Boolean) as string[]);
    return ['All', ...Array.from(osSet).sort((a,b) => b.localeCompare(a))];
  }, []);

  const cachedValueScores = useMemo(() => {
    const scores: Record<string, number> = {};
    [...liveData, ...refData].forEach(item => {
      scores[item.id] = calculateValueScore(item, rankingScenario);
    });
    return scores;
  }, [liveData, rankingScenario]);

  const filteredData = useMemo(() => {
    const sourceData = showReference ? [...liveData, ...refData] : liveData;
    const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);
    
    const result = sourceData.filter(item => {
      if (searchTerms.length > 0) {
        const dataStr = `${item.name} ${item.chip} ${item.releaseYear} ${item.memory} ${item.cores_cpu} ${item.cores_gpu} ${item.os || ''}`.toLowerCase();
        const matchesSearch = searchTerms.every(term => dataStr.includes(term));
        if (!matchesSearch) return false;
      }
      
      if (item.isReference) return true;
      
      if (filterType !== 'All' && item.type !== filterType) return false;
      if (filterFamily !== 'All' && item.family !== filterFamily) return false;
      if (filterOS !== 'All' && item.os !== filterOS) return false;
      
      return true;
    });

    result.sort((a, b) => {
      let valA: any, valB: any;
      if (sortConfig.key === 'score') {
        valA = calculateTierScore(a, rankingScenario);
        valB = calculateTierScore(b, rankingScenario);
      } else if (sortConfig.key === 'value') {
        valA = cachedValueScores[a.id] || 0;
        valB = cachedValueScores[b.id] || 0;
      } else if (sortConfig.key === 'price') {
        valA = a.currentPriceUSD || a.basePriceUSD;
        valB = b.currentPriceUSD || b.basePriceUSD;
      } else {
        valA = a[sortConfig.key as keyof MacModel] ?? 0;
        valB = b[sortConfig.key as keyof MacModel] ?? 0;
      }
      return sortConfig.direction === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
    });

    result.forEach(item => {
      item.valueScore = cachedValueScores[item.id];
    });

    return result;
  }, [searchTerm, filterType, filterFamily, filterOS, sortConfig, rankingScenario, showReference, liveData, cachedValueScores]);

  const handleSort = useCallback((key: SortKey) => {
    setSortConfig(prev => ({
        key,
        direction: prev.key === key ? (prev.direction === 'asc' ? 'desc' : 'asc') : 'desc'
    }));
  }, []);

  useEffect(() => {
    updateUrlHash({
      search: searchTerm || undefined,
      type: filterType,
      family: filterFamily,
      os: filterOS,
      sort: sortConfig.key,
      dir: sortConfig.direction,
      scenario: rankingScenario,
      ref: showReference
    });
  }, [searchTerm, filterType, filterFamily, filterOS, sortConfig, rankingScenario, showReference]);

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