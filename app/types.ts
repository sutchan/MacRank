// app/types.ts v0.6.2
export enum ChipFamily {
  M5 = 'M5',
  M4 = 'M4',
  M3 = 'M3',
  M2 = 'M2',
  M1 = 'M1',
  Intel = 'Intel',
  Reference = 'Reference'
}

export enum DeviceType {
  Laptop = 'Laptop',
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  GPU = 'GPU',
  CPU = 'CPU'
}

export type RankingScenario = 'balanced' | 'developer' | 'creative' | 'daily';

export type SortKey = 'score' | 'price' | 'year' | 'name' | 'cpu' | 'gpu' | 'memory';

export interface MacModel {
  id: string;
  name: string;
  type: DeviceType;
  chip: string;
  family: ChipFamily;
  cores_cpu: string;
  cores_gpu: number;
  memory: string;
  ramType?: string;
  displayInfo?: string;
  os?: string; // Added in v0.6.2
  releaseYear: number;
  singleCoreScore: number;
  multiCoreScore: number;
  metalScore: number;
  basePriceUSD: number;
  description: string;
  isReference?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}