
// app/data/data.ts v0.5.2
import { siliconData } from './data-silicon';
import { intelData } from './data-intel';
import { referenceData } from './data-reference';

// Aggregate all models
export const macData = [...siliconData, ...intelData];
export const refData = referenceData; // Export separately to allow optional merging
