// app/services/priceService.ts v0.7.0
import { MacModel, RankingScenario } from '../types';

/**
 * Calculates a value score (Performance per Dollar) based on the scenario.
 */
export const calculateValueScore = (mac: MacModel, scenario: RankingScenario): number => {
  const price = mac.currentPriceUSD || mac.basePriceUSD;
  if (price <= 0) return 0;

  let performanceBasis = 0;
  switch (scenario) {
    case 'developer':
      performanceBasis = mac.multiCoreScore;
      break;
    case 'creative':
      performanceBasis = mac.metalScore / 5; // Normalize GPU score
      break;
    case 'daily':
      performanceBasis = mac.singleCoreScore * 5; // Normalize Single-core
      break;
    default: // balanced
      performanceBasis = (mac.multiCoreScore + (mac.metalScore / 5)) / 2;
  }

  // Score is performance per $100 to keep it readable
  return Math.round((performanceBasis / price) * 100);
};

/**
 * Estimates the trade-in value of a Mac based on its age and original price.
 * Simple depreciation model: 25% drop first year, 15% each year after.
 */
export const estimateTradeInValue = (originalPrice: number, releaseYear: number): number => {
  const currentYear = new Date().getFullYear();
  const age = Math.max(0, currentYear - releaseYear);
  
  if (age === 0) return originalPrice * 0.85;
  
  let value = originalPrice * 0.75; // First year drop
  for (let i = 1; i < age; i++) {
    value *= 0.85; // Subsequent years
  }
  
  return Math.max(originalPrice * 0.1, Math.round(value)); // Minimum 10% value
};

/**
 * Estimates the refurbished price (usually 15-20% off MSRP for recent models).
 */
export const estimateRefurbishedPrice = (originalPrice: number, releaseYear: number): number => {
  const age = new Date().getFullYear() - releaseYear;
  if (age < 0) return originalPrice;
  
  const discount = age === 0 ? 0.1 : 0.2 + (Math.min(age, 4) * 0.05);
  return Math.round(originalPrice * (1 - discount));
};

/**
 * Mock function for real-time price tracking.
 * In a real app, this would call Amazon/JD/Apple APIs.
 */
export const fetchRealTimePrices = async (models: MacModel[]): Promise<MacModel[]> => {
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return models.map(m => {
    // Simulate some discounts on older models
    const age = new Date().getFullYear() - m.releaseYear;
    let discount = 0;
    if (age === 1) discount = 0.05;
    if (age >= 2) discount = 0.15;
    
    // Random small fluctuation
    const fluctuation = (Math.random() * 0.04) - 0.02;
    
    return {
      ...m,
      currentPriceUSD: Math.round(m.basePriceUSD * (1 - discount + fluctuation))
    };
  });
};
