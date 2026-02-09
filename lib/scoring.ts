import { MacModel } from './types';

// Helper to calculate a synthetic "Tier Score" for ranking
export const calculateTierScore = (mac: MacModel) => {
  // Weighted score: 35% Single Core, 45% Multi Core, 20% Metal
  // We normalize slightly based on max observed values (approx) to keep them in readable ranges
  const sc = mac.singleCoreScore / 4000;
  const mc = mac.multiCoreScore / 25000;
  const mt = mac.metalScore / 200000;
  
  // Weights (Sums to 100)
  const total = (sc * 35) + (mc * 45) + (mt * 20); 
  // Scale by 100 to get a "Geekbench-like" 4-5 digit score (e.g., 90.5 -> 9050)
  return Math.round(total * 100); 
};

export const calculateTierScoreV2 = (mac: MacModel) => {
    const sc = mac.singleCoreScore / 4000;
    const mc = mac.multiCoreScore / 25000;
    const mt = mac.metalScore / 200000;
    const total = (sc * 35) + (mc * 45) + (mt * 20); 
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