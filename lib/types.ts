// Version: 0.3.4
export enum ChipFamily {
  M5 = 'M5',
  M4 = 'M4',
  M3 = 'M3',
  M2 = 'M2',
  M1 = 'M1',
  Intel = 'Intel',
  Reference = 'Reference' // For PC parts
}

export enum DeviceType {
  Laptop = 'Laptop',
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  GPU = 'GPU', // For standalone Graphics Cards
  CPU = 'CPU'  // For standalone Processors
}

export type RankingScenario = 'balanced' | 'developer' | 'creative' | 'daily';

export interface MacModel {
  id: string;
  name: string;
  type: DeviceType;
  chip: string;
  family: ChipFamily;
  cores_cpu: string; // e.g., "8 (4P+4E)"
  cores_gpu: number;
  memory: string; // e.g., "8GB - 16GB"
  releaseYear: number;
  singleCoreScore: number; // Geekbench 6 estimate
  multiCoreScore: number; // Geekbench 6 estimate
  metalScore: number; // Geekbench Metal estimate (or OpenCL for PC)
  basePriceUSD: number;
  description: string;
  isReference?: boolean; // New flag to mark PC/Ref hardware
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
