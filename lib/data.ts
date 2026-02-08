import { siliconData } from './data-silicon';
import { intelData } from './data-intel';

// Aggregate all models
export const macData = [...siliconData, ...intelData];

// Re-export scoring logic and types to maintain compatibility with existing imports
export * from './scoring';
export * from './types';