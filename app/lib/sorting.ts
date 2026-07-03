
// app/lib/sorting.ts v0.7.8
import { calculateTierScore } from './scoring';
import { MacModel, RankingScenario, SortKey } from '../types';

// Pure comparator extracted from useMacData so the hook stays focused on state.
export function sortMacModels(
  models: MacModel[],
  sortKey: SortKey,
  sortDirection: 'asc' | 'desc',
  rankingScenario: RankingScenario,
  cachedValueScores: Record<string, number>,
): MacModel[] {
  const sorted = [...models];
  sorted.sort((a, b) => {
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
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
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
  return sorted;
}
