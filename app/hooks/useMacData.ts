
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { macData, refData } from '../data/data';
import { calculateTierScore } from '../lib/scoring';
import { calculateValueScore, fetchRealTimePrices } from '../services/priceService';
import { parseUrlParams, updateUrlHash } from '../lib/urlParams';
import { ChipFamily, DeviceType, MacModel, RankingScenario, SortKey } from '../types';

const PRICE_CACHE_TTL_MS = 60 * 1000;

interface PriceCacheEntry {
  data: MacModel[];
  timestamp: number;
}

let priceCache: PriceCacheEntry | null = null;
let priceFetchPromise: Promise<MacModel[]> | null = null;

async function getCachedPrices(models: MacModel[]): Promise<MacModel[]> {
  const now = Date.now();

  if (priceCache && now - priceCache.timestamp < PRICE_CACHE_TTL_MS) {
    return priceCache.data;
  }

  if (priceFetchPromise) {
    return priceFetchPromise;
  }

  priceFetchPromise = fetchRealTimePrices(models).then(result => {
    priceCache = { data: result, timestamp: Date.now() };
    priceFetchPromise = null;
    return result;
  });

  return priceFetchPromise;
}

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
  const [searchTerm, setSearchTerm] = useState<string>(getDefaultState().search);
  const [filterType, setFilterType] = useState<DeviceType | 'All'>(getDefaultState().type);
  const [filterFamily, setFilterFamily] = useState<ChipFamily | 'All'>(getDefaultState().family);
  const [filterOS, setFilterOS] = useState<string>(getDefaultState().os);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>(getDefaultState().sortConfig);
  const [rankingScenario, setRankingScenario] = useState<RankingScenario>(getDefaultState().scenario);
  const [showReference, setShowReference] = useState<boolean>(getDefaultState().showRef);
  const [liveData, setLiveData] = useState<MacModel[]>(macData);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const params = parseUrlParams();
    if (params.search !== undefined) setSearchTerm(params.search || '');
    if (params.type !== undefined) setFilterType(params.type);
    if (params.family !== undefined) setFilterFamily(params.family);
    if (params.os !== undefined) setFilterOS(params.os || 'All');
    if (params.sort !== undefined || params.dir !== undefined) {
      setSortConfig({
        key: params.sort || 'score',
        direction: params.dir || 'desc',
      });
    }
    if (params.scenario !== undefined) setRankingScenario(params.scenario);
    if (params.ref !== undefined) setShowReference(params.ref);
  }, []);

  useEffect(() => {
    getCachedPrices(macData).then(setLiveData);
  }, []);

  const availableFamilies = useMemo(() => {
    const familySet = new Set(macData.filter(m => !m.isReference).map(m => m.family));
    return ['All', ...Object.values(ChipFamily).filter(f => familySet.has(f) && f !== ChipFamily.Reference)] as (ChipFamily | 'All')[];
  }, []);

  const availableOS = useMemo(() => {
    const osSet = new Set(macData.map(m => m.os).filter(Boolean) as string[]);
    return ['All', ...Array.from(osSet).sort((a, b) => b.localeCompare(a))];
  }, []);

  const cachedValueScores = useMemo(() => {
    const scores: Record<string, number> = {};
    [...liveData, ...refData].forEach(item => {
      scores[item.id] = calculateValueScore(item, rankingScenario);
    });
    return scores;
  }, [liveData, rankingScenario]);

  const sortKey = sortConfig.key;
  const sortDirection = sortConfig.direction;

  const filteredData = useMemo(() => {
    const sourceData: MacModel[] = showReference ? [...liveData, ...refData] : liveData;
    const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);

    const matches = sourceData.filter(item => {
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

    matches.sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      if (sortKey === 'score') {
        valA = calculateTierScore(a, rankingScenario);
        valB = calculateTierScore(b, rankingScenario);
      } else if (sortKey === 'value') {
        valA = cachedValueScores[a.id] || 0;
        valB = cachedValueScores[b.id] || 0;
      } else if (sortKey === 'price') {
        valA = a.currentPriceUSD || a.basePriceUSD || 0;
        valB = b.currentPriceUSD || b.basePriceUSD || 0;
      } else if (sortKey === 'name') {
        valA = a.name;
        valB = b.name;
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (sortKey === 'cpu') {
        valA = a.multiCoreScore;
        valB = b.multiCoreScore;
      } else if (sortKey === 'gpu') {
        valA = a.metalScore;
        valB = b.metalScore;
      } else if (sortKey === 'memory') {
        valA = parseFloat(String(a.memory)) || 0;
        valB = parseFloat(String(b.memory)) || 0;
      } else if (sortKey === 'year') {
        valA = a.releaseYear;
        valB = b.releaseYear;
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });

    matches.forEach(item => {
      item.valueScore = cachedValueScores[item.id];
    });

    return matches;
  }, [
    searchTerm,
    filterType,
    filterFamily,
    filterOS,
    sortKey,
    sortDirection,
    rankingScenario,
    showReference,
    liveData,
    cachedValueScores,
  ]);

  const handleSort = useCallback((key: SortKey) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key ? (prev.direction === 'asc' ? 'desc' : 'asc') : 'desc',
    }));
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    updateUrlHash({
      search: searchTerm || undefined,
      type: filterType,
      family: filterFamily,
      os: filterOS,
      sort: sortConfig.key,
      dir: sortConfig.direction,
      scenario: rankingScenario,
      ref: showReference,
    });
  }, [searchTerm, filterType, filterFamily, filterOS, sortConfig, rankingScenario, showReference]);

  return useMemo(() => ({
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
    filteredData,
  }), [
    searchTerm,
    filterType,
    filterFamily,
    filterOS,
    availableFamilies,
    availableOS,
    sortConfig,
    handleSort,
    rankingScenario,
    showReference,
    filteredData,
  ]);
};
