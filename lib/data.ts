import { MacModel, ChipFamily, DeviceType } from './types';

export const macData: MacModel[] = [
  // --- M4 Series (2024) ---
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

  // --- M3 Series (2023-2024) ---
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
    name: 'MacBook Air 13"/15" (2024)',
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

  // --- M2 Series (2022-2023) ---
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

  // --- M1 Series (2020-2022) ---
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
  },

  // --- Intel Era (2010 - 2020) ---
  
  // 2020
  {
    id: 'intel-imac-27-2020',
    name: 'iMac 27" (2020)',
    type: DeviceType.Desktop,
    chip: 'Core i9-10910',
    family: ChipFamily.Intel,
    cores_cpu: '10',
    cores_gpu: 40,
    memory: '8GB - 128GB',
    releaseYear: 2020,
    singleCoreScore: 1650,
    multiCoreScore: 9000,
    metalScore: 55000,
    basePriceUSD: 2699,
    description: 'The final 27-inch iMac. A beautiful 5K display, but runs much hotter than M-series.'
  },
  {
    id: 'intel-mbp-13-2020',
    name: 'MacBook Pro 13" (2020)',
    type: DeviceType.Laptop,
    chip: 'Core i7-1068NG7',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 64, // Iris Plus
    memory: '16GB - 32GB',
    releaseYear: 2020,
    singleCoreScore: 1250,
    multiCoreScore: 4500,
    metalScore: 9000,
    basePriceUSD: 1999,
    description: 'The last 13-inch Intel MacBook Pro. Quickly overshadowed by the M1.'
  },

  // 2019
  {
    id: 'intel-macpro-2019',
    name: 'Mac Pro (2019)',
    type: DeviceType.Desktop,
    chip: 'Xeon W (28-core)',
    family: ChipFamily.Intel,
    cores_cpu: '28',
    cores_gpu: 60,
    memory: '32GB - 1.5TB',
    releaseYear: 2019,
    singleCoreScore: 1350,
    multiCoreScore: 20500,
    metalScore: 140000,
    basePriceUSD: 12999,
    description: 'The modular "Cheese Grater". Extremely expensive, but expandable.'
  },
  {
    id: 'intel-mbp-16-2019',
    name: 'MacBook Pro 16" (2019)',
    type: DeviceType.Laptop,
    chip: 'Core i9-9980HK',
    family: ChipFamily.Intel,
    cores_cpu: '8',
    cores_gpu: 24,
    memory: '16GB - 64GB',
    releaseYear: 2019,
    singleCoreScore: 1380,
    multiCoreScore: 7100,
    metalScore: 28000,
    basePriceUSD: 2799,
    description: 'Fixed the butterfly keyboard but suffered from significant thermal throttling.'
  },
  {
    id: 'intel-imac-21-2019',
    name: 'iMac 21.5" (2019)',
    type: DeviceType.Desktop,
    chip: 'Core i7-8700',
    family: ChipFamily.Intel,
    cores_cpu: '6',
    cores_gpu: 20, // Vega 20
    memory: '8GB - 32GB',
    releaseYear: 2019,
    singleCoreScore: 1400,
    multiCoreScore: 6000,
    metalScore: 22000,
    basePriceUSD: 1499,
    description: 'A solid mid-range desktop for its time.'
  },

  // 2018
  {
    id: 'intel-mini-2018',
    name: 'Mac Mini (2018)',
    type: DeviceType.Desktop,
    chip: 'Core i7-8700B',
    family: ChipFamily.Intel,
    cores_cpu: '6',
    cores_gpu: 0, // Integrated
    memory: '8GB - 64GB',
    releaseYear: 2018,
    singleCoreScore: 1400,
    multiCoreScore: 6000,
    metalScore: 4000,
    basePriceUSD: 1099,
    description: 'Space Gray finish. A very popular headless Mac for servers and farms.'
  },
  {
    id: 'intel-air-2018',
    name: 'MacBook Air (2018)',
    type: DeviceType.Laptop,
    chip: 'Core i5-8210Y',
    family: ChipFamily.Intel,
    cores_cpu: '2',
    cores_gpu: 0,
    memory: '8GB - 16GB',
    releaseYear: 2018,
    singleCoreScore: 950,
    multiCoreScore: 1900,
    metalScore: 3500,
    basePriceUSD: 1199,
    description: 'The first Retina MacBook Air. Beautiful screen but weak performance.'
  },

  // 2017
  {
    id: 'intel-imac-pro-2017',
    name: 'iMac Pro (2017)',
    type: DeviceType.Desktop,
    chip: 'Xeon W (10-core)',
    family: ChipFamily.Intel,
    cores_cpu: '10',
    cores_gpu: 56, // Vega 56
    memory: '32GB - 128GB',
    releaseYear: 2017,
    singleCoreScore: 1300,
    multiCoreScore: 10000,
    metalScore: 55000,
    basePriceUSD: 4999,
    description: 'Space Gray all-in-one workstation. Bridged the gap before the 2019 Mac Pro.'
  },
  {
    id: 'intel-mbp-15-2017',
    name: 'MacBook Pro 15" (2017)',
    type: DeviceType.Laptop,
    chip: 'Core i7-7920HQ',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 16,
    memory: '16GB',
    releaseYear: 2017,
    singleCoreScore: 1100,
    multiCoreScore: 4500,
    metalScore: 14000,
    basePriceUSD: 2799,
    description: 'Touch Bar era refinement. Kaby Lake processors.'
  },
  {
    id: 'intel-macbook-12-2017',
    name: 'MacBook 12" (2017)',
    type: DeviceType.Laptop,
    chip: 'Core i5-7Y54',
    family: ChipFamily.Intel,
    cores_cpu: '2',
    cores_gpu: 0,
    memory: '8GB - 16GB',
    releaseYear: 2017,
    singleCoreScore: 800,
    multiCoreScore: 1600,
    metalScore: 3000,
    basePriceUSD: 1299,
    description: 'The final iteration of the ultra-portable 12-inch MacBook.'
  },

  // 2016
  {
    id: 'intel-mbp-15-2016',
    name: 'MacBook Pro 15" (2016)',
    type: DeviceType.Laptop,
    chip: 'Core i7-6920HQ',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 16,
    memory: '16GB',
    releaseYear: 2016,
    singleCoreScore: 1000,
    multiCoreScore: 3800,
    metalScore: 11000,
    basePriceUSD: 2799,
    description: 'Introduced the Touch Bar and USB-C only design.'
  },

  // 2015
  {
    id: 'intel-imac-27-2015',
    name: 'iMac 27" 5K (2015)',
    type: DeviceType.Desktop,
    chip: 'Core i7-6700K',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 24, // R9 M395X
    memory: '8GB - 64GB',
    releaseYear: 2015,
    singleCoreScore: 1300,
    multiCoreScore: 4800,
    metalScore: 15000,
    basePriceUSD: 2299,
    description: 'The refined 5K iMac with Skylake processors.'
  },
  {
    id: 'intel-mbp-15-2015',
    name: 'MacBook Pro 15" (Mid 2015)',
    type: DeviceType.Laptop,
    chip: 'Core i7-4980HQ',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 10, // R9 M370X
    memory: '16GB',
    releaseYear: 2015,
    singleCoreScore: 950,
    multiCoreScore: 3600,
    metalScore: 9000,
    basePriceUSD: 2499,
    description: 'Widely considered one of the best MacBook Pros ever made due to its port selection.'
  },

  // 2014
  {
    id: 'intel-mini-2014',
    name: 'Mac Mini (2014)',
    type: DeviceType.Desktop,
    chip: 'Core i5-4278U',
    family: ChipFamily.Intel,
    cores_cpu: '2',
    cores_gpu: 0,
    memory: '4GB - 16GB',
    releaseYear: 2014,
    singleCoreScore: 900,
    multiCoreScore: 1900,
    metalScore: 2500,
    basePriceUSD: 699,
    description: 'Removed the quad-core option from 2012, making it controversial.'
  },

  // 2013
  {
    id: 'intel-macpro-2013',
    name: 'Mac Pro (2013)',
    type: DeviceType.Desktop,
    chip: 'Xeon E5 12-Core',
    family: ChipFamily.Intel,
    cores_cpu: '12',
    cores_gpu: 64, // Dual D700 (simulated)
    memory: '12GB - 64GB',
    releaseYear: 2013,
    singleCoreScore: 800,
    multiCoreScore: 7000,
    metalScore: 30000,
    basePriceUSD: 2999,
    description: 'The "Trash Can". Innovative design but thermally constrained.'
  },
  {
    id: 'intel-mbp-15-2013',
    name: 'MacBook Pro 15" (Late 2013)',
    type: DeviceType.Laptop,
    chip: 'Core i7-4960HQ',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 10, // GT 750M
    memory: '16GB',
    releaseYear: 2013,
    singleCoreScore: 900,
    multiCoreScore: 3400,
    metalScore: 2000,
    basePriceUSD: 2599,
    description: 'Solid Retina model with Haswell processors.'
  },
  {
    id: 'intel-air-2013',
    name: 'MacBook Air (2013)',
    type: DeviceType.Laptop,
    chip: 'Core i7-4650U',
    family: ChipFamily.Intel,
    cores_cpu: '2',
    cores_gpu: 0,
    memory: '4GB - 8GB',
    releaseYear: 2013,
    singleCoreScore: 800,
    multiCoreScore: 1600,
    metalScore: 1500,
    basePriceUSD: 1299,
    description: 'Massive battery life improvement over 2012.'
  },

  // 2012
  {
    id: 'intel-mini-2012',
    name: 'Mac Mini (2012)',
    type: DeviceType.Desktop,
    chip: 'Core i7-3720QM',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 0,
    memory: '4GB - 16GB',
    releaseYear: 2012,
    singleCoreScore: 800,
    multiCoreScore: 3000,
    metalScore: 500,
    basePriceUSD: 799,
    description: 'Last user-upgradable quad-core mini for many years. Cult classic.'
  },
  {
    id: 'intel-mbp-15-2012-retina',
    name: 'MacBook Pro 15" Retina (2012)',
    type: DeviceType.Laptop,
    chip: 'Core i7-3720QM',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 8, // GT 650M
    memory: '8GB - 16GB',
    releaseYear: 2012,
    singleCoreScore: 800,
    multiCoreScore: 3000,
    metalScore: 1000,
    basePriceUSD: 2199,
    description: 'The very first Retina MacBook Pro.'
  },

  // 2011
  {
    id: 'intel-imac-27-2011',
    name: 'iMac 27" (2011)',
    type: DeviceType.Desktop,
    chip: 'Core i7-2600',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 10, // HD 6970M
    memory: '4GB - 32GB',
    releaseYear: 2011,
    singleCoreScore: 800,
    multiCoreScore: 2800,
    metalScore: 500, // Legacy support
    basePriceUSD: 1999,
    description: 'Thick chassis design, notoriously hot running GPU.'
  },
  {
    id: 'intel-mbp-17-2011',
    name: 'MacBook Pro 17" (2011)',
    type: DeviceType.Laptop,
    chip: 'Core i7-2720QM',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 8, // HD 6750M
    memory: '4GB - 16GB',
    releaseYear: 2011,
    singleCoreScore: 750,
    multiCoreScore: 2700,
    metalScore: 400, // Legacy support
    basePriceUSD: 2499,
    description: 'The last 17-inch MacBook Pro until the 16-inch arrived years later.'
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