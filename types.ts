export enum ChipFamily {
  M1 = 'M1',
  M2 = 'M2',
  M3 = 'M3',
  M4 = 'M4',
  Intel = 'Intel'
}

export enum DeviceType {
  Laptop = 'Laptop',
  Desktop = 'Desktop'
}

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
  metalScore: number; // Geekbench Metal estimate
  basePriceUSD: number;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}