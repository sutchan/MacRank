import { MacModel, ChipFamily, DeviceType } from './types';

export const macData: MacModel[] = [
  // --- M4 Series ---
  {
    id: 'm4-max-16-16-40',
    name: 'MacBook Pro 16" (Late 2024)',
    type: DeviceType.Laptop,
    chip: 'M4 Max',
    family: ChipFamily.M4,
    cores_cpu: '16 (12P+4E)',
    cores_gpu: 40,
    memory: '48GB - 128GB',
    releaseYear: 2024,
    singleCoreScore: 4060,
    multiCoreScore: 26800,
    metalScore: 192000,
    basePriceUSD: 3999,
    description: 'The absolute pinnacle of mobile computing performance. Ideal for 3D rendering and heavy ML workflows.'
  },
  {
    id: 'm4-max-14-14-32',
    name: 'MacBook Pro 14" (Late 2024)',
    type: DeviceType.Laptop,
    chip: 'M4 Max',
    family: ChipFamily.M4,
    cores_cpu: '14 (10P+4E)',
    cores_gpu: 32,
    memory: '36GB - 96GB',
    releaseYear: 2024,
    singleCoreScore: 4000,
    multiCoreScore: 24500,
    metalScore: 155000,
    basePriceUSD: 3199,
    description: 'A powerhouse in a portable form factor, capable of handling almost any creative task.'
  },
  {
    id: 'm4-pro-14-14-20',
    name: 'MacBook Pro 14" (Late 2024)',
    type: DeviceType.Laptop,
    chip: 'M4 Pro',
    family: ChipFamily.M4,
    cores_cpu: '14 (10P+4E)',
    cores_gpu: 20,
    memory: '24GB - 64GB',
    releaseYear: 2024,
    singleCoreScore: 3950,
    multiCoreScore: 22800,
    metalScore: 112000,
    basePriceUSD: 1999,
    description: 'Excellent balance of power and efficiency, surpassing the previous generation Max chips in CPU tasks.'
  },
  {
    id: 'm4-imac',
    name: 'iMac 24" (2024)',
    type: DeviceType.Desktop,
    chip: 'M4',
    family: ChipFamily.M4,
    cores_cpu: '10 (4P+6E)',
    cores_gpu: 10,
    memory: '16GB - 32GB',
    releaseYear: 2024,
    singleCoreScore: 3800,
    multiCoreScore: 15000,
    metalScore: 58000,
    basePriceUSD: 1299,
    description: 'The definitive all-in-one for general use and moderate creative work.'
  },
    {
    id: 'm4-mini',
    name: 'Mac Mini (2024)',
    type: DeviceType.Desktop,
    chip: 'M4',
    family: ChipFamily.M4,
    cores_cpu: '10 (4P+6E)',
    cores_gpu: 10,
    memory: '16GB - 32GB',
    releaseYear: 2024,
    singleCoreScore: 3800,
    multiCoreScore: 15000,
    metalScore: 58000,
    basePriceUSD: 599,
    description: 'Tiny but mighty. The best value desktop computer on the market.'
  },
  {
    id: 'm4-mini-pro',
    name: 'Mac Mini (2024)',
    type: DeviceType.Desktop,
    chip: 'M4 Pro',
    family: ChipFamily.M4,
    cores_cpu: '12 (8P+4E)',
    cores_gpu: 16,
    memory: '24GB - 64GB',
    releaseYear: 2024,
    singleCoreScore: 3900,
    multiCoreScore: 22000,
    metalScore: 105000,
    basePriceUSD: 1399,
    description: 'A desktop powerhouse that rivals larger workstations in a compact footprint.'
  },

  // --- M3 Series ---
  {
    id: 'm3-max-16-40',
    name: 'MacBook Pro 16" (Late 2023)',
    type: DeviceType.Laptop,
    chip: 'M3 Max',
    family: ChipFamily.M3,
    cores_cpu: '16 (12P+4E)',
    cores_gpu: 40,
    memory: '48GB - 128GB',
    releaseYear: 2023,
    singleCoreScore: 3200,
    multiCoreScore: 21500,
    metalScore: 156000,
    basePriceUSD: 3999,
    description: 'Top-tier M3 performance. Hardware ray tracing support enables new workflows.'
  },
  {
    id: 'm3-max-14-30',
    name: 'MacBook Pro 14" (Late 2023)',
    type: DeviceType.Laptop,
    chip: 'M3 Max',
    family: ChipFamily.M3,
    cores_cpu: '14 (10P+4E)',
    cores_gpu: 30,
    memory: '36GB - 96GB',
    releaseYear: 2023,
    singleCoreScore: 3150,
    multiCoreScore: 19500,
    metalScore: 128000,
    basePriceUSD: 3199,
    description: 'Extreme power in a compact chassis.'
  },
  {
    id: 'm3-pro-12-18',
    name: 'MacBook Pro 14"/16" (Late 2023)',
    type: DeviceType.Laptop,
    chip: 'M3 Pro',
    family: ChipFamily.M3,
    cores_cpu: '12 (6P+6E)',
    cores_gpu: 18,
    memory: '18GB - 36GB',
    releaseYear: 2023,
    singleCoreScore: 3100,
    multiCoreScore: 15500,
    metalScore: 78000,
    basePriceUSD: 1999,
    description: 'A balanced chip, though memory bandwidth is slightly lower than M2 Pro.'
  },
  {
    id: 'm3-imac',
    name: 'iMac 24" (2023)',
    type: DeviceType.Desktop,
    chip: 'M3',
    family: ChipFamily.M3,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 10,
    memory: '8GB - 24GB',
    releaseYear: 2023,
    singleCoreScore: 3050,
    multiCoreScore: 11800,
    metalScore: 48000,
    basePriceUSD: 1299,
    description: 'A colorful all-in-one with the efficient M3 chip.'
  },
    {
    id: 'm3-air-13',
    name: 'MacBook Air 13" (2024)',
    type: DeviceType.Laptop,
    chip: 'M3',
    family: ChipFamily.M3,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 10,
    memory: '8GB - 24GB',
    releaseYear: 2024,
    singleCoreScore: 3050,
    multiCoreScore: 11800,
    metalScore: 47500,
    basePriceUSD: 1099,
    description: 'The world\'s most popular laptop, now with M3 speed and dual display support (lid closed).'
  },

  // --- M2 Series ---
  {
    id: 'm2-ultra-studio',
    name: 'Mac Studio (2023)',
    type: DeviceType.Desktop,
    chip: 'M2 Ultra',
    family: ChipFamily.M2,
    cores_cpu: '24 (16P+8E)',
    cores_gpu: 76,
    memory: '64GB - 192GB',
    releaseYear: 2023,
    singleCoreScore: 2800,
    multiCoreScore: 21500,
    metalScore: 220000,
    basePriceUSD: 3999,
    description: 'Double the M2 Max. Ideally suited for high-end video production and compiling large codebases.'
  },
  {
    id: 'm2-max-16-38',
    name: 'MacBook Pro 16" (Early 2023)',
    type: DeviceType.Laptop,
    chip: 'M2 Max',
    family: ChipFamily.M2,
    cores_cpu: '12 (8P+4E)',
    cores_gpu: 38,
    memory: '32GB - 96GB',
    releaseYear: 2023,
    singleCoreScore: 2750,
    multiCoreScore: 14800,
    metalScore: 135000,
    basePriceUSD: 3499,
    description: 'Still a beast for GPU-heavy tasks.'
  },
  {
    id: 'm2-pro-mini',
    name: 'Mac Mini (2023)',
    type: DeviceType.Desktop,
    chip: 'M2 Pro',
    family: ChipFamily.M2,
    cores_cpu: '12 (8P+4E)',
    cores_gpu: 19,
    memory: '16GB - 32GB',
    releaseYear: 2023,
    singleCoreScore: 2650,
    multiCoreScore: 14200,
    metalScore: 52000,
    basePriceUSD: 1299,
    description: 'Great value for a pro-level desktop.'
  },
  {
    id: 'm2-air-15',
    name: 'MacBook Air 15" (2023)',
    type: DeviceType.Laptop,
    chip: 'M2',
    family: ChipFamily.M2,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 10,
    memory: '8GB - 24GB',
    releaseYear: 2023,
    singleCoreScore: 2600,
    multiCoreScore: 10000,
    metalScore: 45000,
    basePriceUSD: 1299,
    description: 'Large screen, thin design, great battery life.'
  },

  // --- M1 Series ---
  {
    id: 'm1-ultra-studio',
    name: 'Mac Studio (2022)',
    type: DeviceType.Desktop,
    chip: 'M1 Ultra',
    family: ChipFamily.M1,
    cores_cpu: '20 (16P+4E)',
    cores_gpu: 64,
    memory: '64GB - 128GB',
    releaseYear: 2022,
    singleCoreScore: 2400,
    multiCoreScore: 17500,
    metalScore: 150000,
    basePriceUSD: 3999,
    description: 'The first Ultra chip. Still very capable for multi-threaded workloads.'
  },
  {
    id: 'm1-max-16-32',
    name: 'MacBook Pro 16" (2021)',
    type: DeviceType.Laptop,
    chip: 'M1 Max',
    family: ChipFamily.M1,
    cores_cpu: '10 (8P+2E)',
    cores_gpu: 32,
    memory: '32GB - 64GB',
    releaseYear: 2021,
    singleCoreScore: 2380,
    multiCoreScore: 12500,
    metalScore: 110000,
    basePriceUSD: 3499,
    description: 'The game changer that brought ports back to the MacBook Pro.'
  },
  {
    id: 'm1-pro-14-16',
    name: 'MacBook Pro 14" (2021)',
    type: DeviceType.Laptop,
    chip: 'M1 Pro',
    family: ChipFamily.M1,
    cores_cpu: '10 (8P+2E)',
    cores_gpu: 16,
    memory: '16GB - 32GB',
    releaseYear: 2021,
    singleCoreScore: 2350,
    multiCoreScore: 12300,
    metalScore: 40000,
    basePriceUSD: 1999,
    description: 'A fantastic sweet spot for performance and price on the used market.'
  },
  {
    id: 'm1-air',
    name: 'MacBook Air 13" (2020)',
    type: DeviceType.Laptop,
    chip: 'M1',
    family: ChipFamily.M1,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 7,
    memory: '8GB - 16GB',
    releaseYear: 2020,
    singleCoreScore: 2300,
    multiCoreScore: 8300,
    metalScore: 20000,
    basePriceUSD: 999,
    description: 'The legend that started the Apple Silicon revolution. Still viable for basic tasks.'
  }
];

// Helper to calculate a synthetic "Tier Score" for ranking
export const calculateTierScore = (mac: MacModel) => {
  // Weighted score: 30% Single Core, 40% Multi Core, 30% Metal
  // We normalize slightly based on max observed values (approx) to keep them in readable ranges
  const sc = mac.singleCoreScore / 4000;
  const mc = mac.multiCoreScore / 25000;
  const mt = mac.metalScore / 200000;
  
  // Weights
  const total = (sc * 35) + (mc * 45) + (mt * 20); 
  return Math.round(total * 100);
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
