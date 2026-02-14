// Version: 0.3.4
import { MacModel, ChipFamily, DeviceType } from './types';

// Reference scores based on Geekbench 6 (CPU) and Geekbench 6 OpenCL (GPU)
// OpenCL is used as the closest cross-platform proxy to Metal for raw compute comparison.

export const referenceData: MacModel[] = [
  // --- GPUs ---
  {
    id: 'ref-rtx-4090',
    name: 'NVIDIA GeForce RTX 4090',
    type: DeviceType.GPU,
    chip: 'Ada Lovelace',
    family: ChipFamily.Reference,
    cores_cpu: '-',
    cores_gpu: 16384, // CUDA Cores
    memory: '24GB GDDR6X',
    releaseYear: 2022,
    singleCoreScore: 0,
    multiCoreScore: 0,
    metalScore: 335000, // Approximate OpenCL Score
    basePriceUSD: 1599,
    description: 'Reference: Top-tier Consumer Desktop GPU (OpenCL Score).',
    isReference: true
  },
  {
    id: 'ref-rtx-4060',
    name: 'NVIDIA GeForce RTX 4060',
    type: DeviceType.GPU,
    chip: 'Ada Lovelace',
    family: ChipFamily.Reference,
    cores_cpu: '-',
    cores_gpu: 3072,
    memory: '8GB GDDR6',
    releaseYear: 2023,
    singleCoreScore: 0,
    multiCoreScore: 0,
    metalScore: 105000, // Approximate OpenCL Score
    basePriceUSD: 299,
    description: 'Reference: Mid-range Desktop GPU (OpenCL Score). Similar to M2 Ultra GPU range.',
    isReference: true
  },
  
  // --- CPUs ---
  {
    id: 'ref-i9-14900k',
    name: 'Intel Core i9-14900K',
    type: DeviceType.CPU,
    chip: 'Raptor Lake',
    family: ChipFamily.Reference,
    cores_cpu: '24 (8P+16E)',
    cores_gpu: 0,
    memory: 'DDR5',
    releaseYear: 2023,
    singleCoreScore: 3080,
    multiCoreScore: 21500,
    metalScore: 0,
    basePriceUSD: 589,
    description: 'Reference: High-end Desktop CPU. Shows M-series efficiency context.',
    isReference: true
  },
  {
    id: 'ref-ryzen-9-7950x',
    name: 'AMD Ryzen 9 7950X',
    type: DeviceType.CPU,
    chip: 'Zen 4',
    family: ChipFamily.Reference,
    cores_cpu: '16',
    cores_gpu: 0,
    memory: 'DDR5',
    releaseYear: 2022,
    singleCoreScore: 2900,
    multiCoreScore: 22000,
    metalScore: 0,
    basePriceUSD: 699,
    description: 'Reference: High-end Workstation CPU.',
    isReference: true
  }
];
