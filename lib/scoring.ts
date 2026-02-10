import { MacModel, RankingScenario } from './types';

// Normalization constants (approximate max values in current database)
const MAX_SC = 4200;   // Single Core max
const MAX_MC = 28000;  // Multi Core max
const MAX_MT = 200000; // Metal max

const SCENARIO_WEIGHTS: Record<RankingScenario, { sc: number; mc: number; mt: number }> = {
  balanced: { sc: 35, mc: 45, mt: 20 }, // Default: Balanced mix
  developer: { sc: 20, mc: 65, mt: 15 }, // Dev: Heavily favors Multi-Core (Compilation/Docker)
  creative: { sc: 15, mc: 30, mt: 55 },  // Creative: Heavily favors GPU (Rendering/3D)
  daily: { sc: 70, mc: 20, mt: 10 },     // Daily: Heavily favors Single-Core (Snappiness/Web)
};

// Helper to calculate a synthetic "Tier Score" for ranking based on scenario
export const calculateTierScore = (mac: MacModel, scenario: RankingScenario = 'balanced') => {
  const weights = SCENARIO_WEIGHTS[scenario];

  const sc = mac.singleCoreScore / MAX_SC;
  const mc = mac.multiCoreScore / MAX_MC;
  const mt = mac.metalScore / MAX_MT;
  
  // Calculate weighted sum
  const total = (sc * weights.sc) + (mc * weights.mc) + (mt * weights.mt);
  
  // Scale by 100 to get a "Geekbench-like" score format (e.g., 90.5 -> 9050)
  return Math.round(total * 100); 
};

export const getTierLabel = (score: number) => {
  if (score >= 9000) return 'S+';
  if (score >= 8000) return 'S';
  if (score >= 7000) return 'A+';
  if (score >= 6000) return 'A';
  if (score >= 4500) return 'B';
  if (score >= 3000) return 'C';
  return 'D';
};

export const getTierColor = (label: string) => {
  switch (label) {
    case 'S+': return 'bg-purple-600 text-white border-purple-600';
    case 'S': return 'bg-purple-500 text-white border-purple-500';
    case 'A+': return 'bg-blue-600 text-white border-blue-600';
    case 'A': return 'bg-blue-500 text-white border-blue-500';
    case 'B': return 'bg-green-500 text-white border-green-500';
    case 'C': return 'bg-yellow-500 text-white border-yellow-500';
    default: return 'bg-gray-500 text-white border-gray-500';
  }
};