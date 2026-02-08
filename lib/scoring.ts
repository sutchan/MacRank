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
  return Math.round(total * 100); // Scale to nicer numbers (e.g., 9000 -> 90) or keep logic consistent with previous version
};

// Fix logic: The previous calculateTierScore returned raw roughly 0-100 range but multiplied by 100 at the end in some versions or removed decimals.
// Let's standardize to the logic used in v0.1.6 which seemed to output 0-100 range integers.
// Original v0.1.6 logic: return Math.round(total); 
// Wait, looking at previous data.ts content provided in context:
// const total = (sc * 35) + (mc * 45) + (mt * 20); 
// return Math.round(total); 
// Let's stick strictly to the extracted logic.

export const calculateTierScoreV2 = (mac: MacModel) => {
    const sc = mac.singleCoreScore / 4000;
    const mc = mac.multiCoreScore / 25000;
    const mt = mac.metalScore / 200000;
    const total = (sc * 35) + (mc * 45) + (mt * 20); 
    return Math.round(total);
};

export const getTierLabel = (score: number) => {
  if (score >= 90) return 'S+';
  if (score >= 80) return 'S';
  if (score >= 70) return 'A+';
  if (score >= 60) return 'A';
  if (score >= 45) return 'B';
  if (score >= 30) return 'C';
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