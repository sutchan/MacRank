
// app/lib/priceCache.ts v0.7.8
import { MacModel } from '../types';
import { fetchRealTimePrices } from '../services/priceService';

const PRICE_CACHE_TTL_MS = 60 * 1000;

interface PriceCacheEntry {
  data: MacModel[];
  timestamp: number;
}

let priceCache: PriceCacheEntry | null = null;
let priceFetchPromise: Promise<MacModel[]> | null = null;

// Module-level cache that deduplicates in-flight price fetches and serves
// cached results within the TTL window.
export async function getCachedPrices(models: MacModel[]): Promise<MacModel[]> {
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
