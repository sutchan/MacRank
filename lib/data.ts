// Version: 0.3.4
import { siliconData } from './data-silicon';
import { intelData } from './data-intel';
import { referenceData } from './data-reference';

// Aggregate all models
export const macData = [...siliconData, ...intelData];
export const refData = referenceData; // Export separately to allow optional merging

// Re-export scoring logic and types to maintain compatibility with existing imports
export * from './scoring';
export * from './types';
