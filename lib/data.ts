import { MacModel, ChipFamily, DeviceType } from './types';

export const macData: MacModel[] = [
  // ==========================================
  // M4 Series (2024)
  // ==========================================
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
    description: 'The absolute pinnacle of mobile computing. Destroys desktop workstations in 3D rendering and LLM training tasks.'
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
    description: 'Portable powerhouse. The 14-inch form factor with Max chip is the densest performance-per-inch laptop available.'
  },
  {
    id: 'm4-pro-16-14-20',
    name: 'MacBook Pro 16" (Late 2024)',
    type: DeviceType.Laptop,
    chip: 'M4 Pro',
    family: ChipFamily.M4,
    cores_cpu: '14 (10P+4E)',
    cores_gpu: 20,
    memory: '24GB - 48GB',
    releaseYear: 2024,
    singleCoreScore: 3950,
    multiCoreScore: 22800,
    metalScore: 112000,
    basePriceUSD: 2499,
    description: 'The sweet spot for high-end creative pros. Incredible battery life with near-Max CPU performance.'
  },
  {
    id: 'm4-pro-14-12-16',
    name: 'MacBook Pro 14" (Late 2024)',
    type: DeviceType.Laptop,
    chip: 'M4 Pro',
    family: ChipFamily.M4,
    cores_cpu: '12 (8P+4E)',
    cores_gpu: 16,
    memory: '24GB - 48GB',
    releaseYear: 2024,
    singleCoreScore: 3920,
    multiCoreScore: 22000,
    metalScore: 105000,
    basePriceUSD: 1999,
    description: 'Replaces the previous entry-level Pro with significantly higher bandwidth and ray-tracing capabilities.'
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
    description: 'The definitive all-in-one. M4 makes it surprisingly capable for video editing and light gaming.'
  },
  {
    id: 'm4-mini-pro',
    name: 'Mac Mini Pro (2024)',
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
    description: 'A tiny cube with workstation power. The best value-for-performance desktop on the market.'
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
    description: 'Smaller footprint, massive power jump. The entry-level king.'
  },
  {
    id: 'ipad-pro-m4-13',
    name: 'iPad Pro 13" (M4)',
    type: DeviceType.Tablet,
    chip: 'M4',
    family: ChipFamily.M4,
    cores_cpu: '10 (4P+6E)',
    cores_gpu: 10,
    memory: '8GB - 16GB',
    releaseYear: 2024,
    singleCoreScore: 3700,
    multiCoreScore: 14500,
    metalScore: 53000,
    basePriceUSD: 1299,
    description: 'The thinnest Apple product ever. M4 brings massive neural engine improvements for AI tasks on the go.'
  },

  // ==========================================
  // M3 Series (2023-2024)
  // ==========================================
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
    description: 'Introduced Hardware Ray Tracing. A monster for 3D work.'
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
    description: 'Extreme power density.'
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
    description: 'Efficient and powerful, though slightly less memory bandwidth than its predecessor.'
  },
  {
    id: 'm3-mbp-14-base',
    name: 'MacBook Pro 14" (Late 2023)',
    type: DeviceType.Laptop,
    chip: 'M3',
    family: ChipFamily.M3,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 10,
    memory: '8GB - 24GB',
    releaseYear: 2023,
    singleCoreScore: 3080,
    multiCoreScore: 11900,
    metalScore: 48000,
    basePriceUSD: 1599,
    description: 'Replaced the 13" MacBook Pro. Great screen, but base model had 8GB RAM.'
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
    description: 'A colorful all-in-one update.'
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
    description: 'The standard for consumer laptops. Supports two external displays with lid closed.'
  },

  // ==========================================
  // M2 Series (2022-2023)
  // ==========================================
  {
    id: 'm2-ultra-macpro',
    name: 'Mac Pro (2023)',
    type: DeviceType.Desktop,
    chip: 'M2 Ultra',
    family: ChipFamily.M2,
    cores_cpu: '24 (16P+8E)',
    cores_gpu: 76,
    memory: '64GB - 192GB',
    releaseYear: 2023,
    singleCoreScore: 2850,
    multiCoreScore: 21800,
    metalScore: 225000,
    basePriceUSD: 6999,
    description: 'The return of PCIe expansion, but limited by Apple Silicon architecture (no dGPU support).'
  },
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
    description: 'Same power as the Mac Pro for $3000 less. The ultimate compact workstation.'
  },
  {
    id: 'm2-max-studio',
    name: 'Mac Studio (2023)',
    type: DeviceType.Desktop,
    chip: 'M2 Max',
    family: ChipFamily.M2,
    cores_cpu: '12 (8P+4E)',
    cores_gpu: 38,
    memory: '32GB - 96GB',
    releaseYear: 2023,
    singleCoreScore: 2780,
    multiCoreScore: 15000,
    metalScore: 136000,
    basePriceUSD: 1999,
    description: 'Excellent value for video editors who don\'t need Ultra power.'
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
    description: 'HDMI 2.1 support and WiFi 6E arrived with this generation.'
  },
  {
    id: 'm2-pro-14',
    name: 'MacBook Pro 14" (Early 2023)',
    type: DeviceType.Laptop,
    chip: 'M2 Pro',
    family: ChipFamily.M2,
    cores_cpu: '12 (8P+4E)',
    cores_gpu: 19,
    memory: '16GB - 32GB',
    releaseYear: 2023,
    singleCoreScore: 2650,
    multiCoreScore: 14200,
    metalScore: 52000,
    basePriceUSD: 1999,
    description: 'A solid iterative update over the M1 Pro.'
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
    description: 'The first time a "Pro" chip came to the Mac Mini.'
  },
  {
    id: 'm2-mini',
    name: 'Mac Mini (2023)',
    type: DeviceType.Desktop,
    chip: 'M2',
    family: ChipFamily.M2,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 10,
    memory: '8GB - 24GB',
    releaseYear: 2023,
    singleCoreScore: 2600,
    multiCoreScore: 9800,
    metalScore: 45000,
    basePriceUSD: 599,
    description: 'Price drop to $599 made this an instant recommendation.'
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
    description: 'The first 15-inch Air. Perfect for non-pro users needing screen real estate.'
  },
  {
    id: 'm2-air-13',
    name: 'MacBook Air 13" (2022)',
    type: DeviceType.Laptop,
    chip: 'M2',
    family: ChipFamily.M2,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 8,
    memory: '8GB - 24GB',
    releaseYear: 2022,
    singleCoreScore: 2580,
    multiCoreScore: 9700,
    metalScore: 40000,
    basePriceUSD: 1199,
    description: 'Redesigned chassis, MagSafe returns, Midnight color.'
  },
  {
    id: 'm2-mbp-13',
    name: 'MacBook Pro 13" (2022)',
    type: DeviceType.Laptop,
    chip: 'M2',
    family: ChipFamily.M2,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 10,
    memory: '8GB - 24GB',
    releaseYear: 2022,
    singleCoreScore: 2580,
    multiCoreScore: 9800,
    metalScore: 45000,
    basePriceUSD: 1299,
    description: 'The last Touch Bar Mac. An odd duck in the lineup.'
  },
  {
    id: 'ipad-pro-m2-12',
    name: 'iPad Pro 12.9" (M2)',
    type: DeviceType.Tablet,
    chip: 'M2',
    family: ChipFamily.M2,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 10,
    memory: '8GB - 16GB',
    releaseYear: 2022,
    singleCoreScore: 2600,
    multiCoreScore: 9700,
    metalScore: 46000,
    basePriceUSD: 1099,
    description: 'Hover pencil support and ProRes video capture.'
  },

  // ==========================================
  // M1 Series (2020-2022)
  // ==========================================
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
    description: 'Two M1 Max chips fused together using UltraFusion.'
  },
  {
    id: 'm1-max-studio',
    name: 'Mac Studio (2022)',
    type: DeviceType.Desktop,
    chip: 'M1 Max',
    family: ChipFamily.M1,
    cores_cpu: '10 (8P+2E)',
    cores_gpu: 32,
    memory: '32GB - 64GB',
    releaseYear: 2022,
    singleCoreScore: 2390,
    multiCoreScore: 12600,
    metalScore: 110000,
    basePriceUSD: 1999,
    description: 'Introduced the Studio form factor.'
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
    description: 'XDR Display, ports returned. A massive leap for pros.'
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
    description: 'Perhaps the most beloved modern MacBook Pro.'
  },
  {
    id: 'm1-imac',
    name: 'iMac 24" (2021)',
    type: DeviceType.Desktop,
    chip: 'M1',
    family: ChipFamily.M1,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 8,
    memory: '8GB - 16GB',
    releaseYear: 2021,
    singleCoreScore: 2320,
    multiCoreScore: 8400,
    metalScore: 21000,
    basePriceUSD: 1499,
    description: 'Ultra-thin colorful design.'
  },
  {
    id: 'm1-mini',
    name: 'Mac Mini (2020)',
    type: DeviceType.Desktop,
    chip: 'M1',
    family: ChipFamily.M1,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 8,
    memory: '8GB - 16GB',
    releaseYear: 2020,
    singleCoreScore: 2330,
    multiCoreScore: 8500,
    metalScore: 21500,
    basePriceUSD: 699,
    description: 'First desktop to get Apple Silicon.'
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
    description: 'The legend. Fanless design that changed the industry.'
  },
  {
    id: 'm1-mbp-13',
    name: 'MacBook Pro 13" (2020)',
    type: DeviceType.Laptop,
    chip: 'M1',
    family: ChipFamily.M1,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 8,
    memory: '8GB - 16GB',
    releaseYear: 2020,
    singleCoreScore: 2310,
    multiCoreScore: 8400,
    metalScore: 21000,
    basePriceUSD: 1299,
    description: 'Same chassis as Intel, new heart.'
  },
  {
    id: 'ipad-pro-m1',
    name: 'iPad Pro 12.9" (M1)',
    type: DeviceType.Tablet,
    chip: 'M1',
    family: ChipFamily.M1,
    cores_cpu: '8 (4P+4E)',
    cores_gpu: 8,
    memory: '8GB - 16GB',
    releaseYear: 2021,
    singleCoreScore: 2300,
    multiCoreScore: 8400,
    metalScore: 32000,
    basePriceUSD: 1099,
    description: 'Mini-LED XDR display meets M1.'
  },

  // ==========================================
  // Intel Era (2015 - 2020) - Comprehensive
  // ==========================================
  
  // 2020
  {
    id: 'intel-imac-27-2020-i9',
    name: 'iMac 27" (2020)',
    type: DeviceType.Desktop,
    chip: 'Core i9-10910',
    family: ChipFamily.Intel,
    cores_cpu: '10',
    cores_gpu: 40, // Radeon Pro 5700 XT
    memory: '8GB - 128GB',
    releaseYear: 2020,
    singleCoreScore: 1650,
    multiCoreScore: 9000,
    metalScore: 75000,
    basePriceUSD: 2699,
    description: 'The final 27-inch iMac. A beautiful 5K display and nano-texture option.'
  },
  {
    id: 'intel-imac-27-2020-i7',
    name: 'iMac 27" (2020)',
    type: DeviceType.Desktop,
    chip: 'Core i7-10700K',
    family: ChipFamily.Intel,
    cores_cpu: '8',
    cores_gpu: 36, // Radeon Pro 5500 XT
    memory: '8GB - 128GB',
    releaseYear: 2020,
    singleCoreScore: 1600,
    multiCoreScore: 7800,
    metalScore: 45000,
    basePriceUSD: 2299,
    description: 'Solid desktop workhorse before the transition.'
  },
  {
    id: 'intel-mbp-13-2020-i7',
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
    description: 'Four Thunderbolt ports. Runs hot compared to M1.'
  },
  {
    id: 'intel-mbp-13-2020-i5',
    name: 'MacBook Pro 13" (2020)',
    type: DeviceType.Laptop,
    chip: 'Core i5-8257U',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 48, // Iris Plus 645
    memory: '8GB - 16GB',
    releaseYear: 2020,
    singleCoreScore: 980,
    multiCoreScore: 3900,
    metalScore: 6000,
    basePriceUSD: 1299,
    description: 'Base model with 2 ports and older 8th gen chip.'
  },
  {
    id: 'intel-air-2020-i5',
    name: 'MacBook Air (Early 2020)',
    type: DeviceType.Laptop,
    chip: 'Core i5-1030NG7',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 48,
    memory: '8GB - 16GB',
    releaseYear: 2020,
    singleCoreScore: 1100,
    multiCoreScore: 3300,
    metalScore: 8000,
    basePriceUSD: 1099,
    description: 'Finally fixed the keyboard (Scissor switch), but thermal throttling was severe.'
  },

  // 2019
  {
    id: 'intel-macpro-2019',
    name: 'Mac Pro (2019)',
    type: DeviceType.Desktop,
    chip: 'Xeon W (28-core)',
    family: ChipFamily.Intel,
    cores_cpu: '28',
    cores_gpu: 60, // Pro Vega II Duo
    memory: '32GB - 1.5TB',
    releaseYear: 2019,
    singleCoreScore: 1350,
    multiCoreScore: 20500,
    metalScore: 140000,
    basePriceUSD: 12999,
    description: 'The modular "Cheese Grater". Extremely expensive, but expandable.'
  },
   {
    id: 'intel-macpro-2019-base',
    name: 'Mac Pro (2019)',
    type: DeviceType.Desktop,
    chip: 'Xeon W (8-core)',
    family: ChipFamily.Intel,
    cores_cpu: '8',
    cores_gpu: 32, // Radeon Pro 580X
    memory: '32GB - 1.5TB',
    releaseYear: 2019,
    singleCoreScore: 1100,
    multiCoreScore: 8000,
    metalScore: 35000,
    basePriceUSD: 5999,
    description: 'Overpriced base model.'
  },
  {
    id: 'intel-mbp-16-2019-i9',
    name: 'MacBook Pro 16" (2019)',
    type: DeviceType.Laptop,
    chip: 'Core i9-9980HK',
    family: ChipFamily.Intel,
    cores_cpu: '8',
    cores_gpu: 24, // Radeon Pro 5500M
    memory: '16GB - 64GB',
    releaseYear: 2019,
    singleCoreScore: 1380,
    multiCoreScore: 7100,
    metalScore: 32000,
    basePriceUSD: 2799,
    description: 'Replaced the 15-inch. Good speakers, good keyboard, loud fans.'
  },
  {
    id: 'intel-mbp-16-2019-i7',
    name: 'MacBook Pro 16" (2019)',
    type: DeviceType.Laptop,
    chip: 'Core i7-9750H',
    family: ChipFamily.Intel,
    cores_cpu: '6',
    cores_gpu: 20, // Radeon Pro 5300M
    memory: '16GB - 64GB',
    releaseYear: 2019,
    singleCoreScore: 1250,
    multiCoreScore: 5800,
    metalScore: 28000,
    basePriceUSD: 2399,
    description: 'The base model 16-inch.'
  },
  {
    id: 'intel-imac-21-2019',
    name: 'iMac 21.5" 4K (2019)',
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
  {
    id: 'intel-mbp-15-2019',
    name: 'MacBook Pro 15" (2019)',
    type: DeviceType.Laptop,
    chip: 'Core i9-9980HK',
    family: ChipFamily.Intel,
    cores_cpu: '8',
    cores_gpu: 20, // Vega 20
    memory: '16GB - 32GB',
    releaseYear: 2019,
    singleCoreScore: 1300,
    multiCoreScore: 6800,
    metalScore: 28000,
    basePriceUSD: 2799,
    description: 'Butterfly keyboard era peak.'
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
    description: 'Space Gray all-in-one workstation. A stopgap before the 2019 Mac Pro.'
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
    description: 'Touch Bar era refinement.'
  },
  {
    id: 'intel-imac-27-2017',
    name: 'iMac 27" 5K (2017)',
    type: DeviceType.Desktop,
    chip: 'Core i5-7600K',
    family: ChipFamily.Intel,
    cores_cpu: '4',
    cores_gpu: 16, // Radeon Pro 580
    memory: '8GB - 64GB',
    releaseYear: 2017,
    singleCoreScore: 1150,
    multiCoreScore: 3800,
    metalScore: 35000,
    basePriceUSD: 2299,
    description: 'Very popular 5K iMac model.'
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
    description: 'Underpowered but impossibly light. The design precursor to the modern Air.'
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
    description: 'Introduced the Touch Bar and USB-C only design. Controversial.'
  },
  {
    id: 'intel-mbp-13-2016',
    name: 'MacBook Pro 13" (2016)',
    type: DeviceType.Laptop,
    chip: 'Core i5-6267U',
    family: ChipFamily.Intel,
    cores_cpu: '2',
    cores_gpu: 0,
    memory: '8GB - 16GB',
    releaseYear: 2016,
    singleCoreScore: 850,
    multiCoreScore: 2100,
    metalScore: 4000,
    basePriceUSD: 1499,
    description: 'The "Escape" key model (no Touch Bar).'
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
    description: 'The "Holy Grail" MacBook Pro. Last with MagSafe 2, HDMI, and USB-A until 2021.'
  },
  {
    id: 'intel-mbp-13-2015',
    name: 'MacBook Pro 13" (Early 2015)',
    type: DeviceType.Laptop,
    chip: 'Core i5-5257U',
    family: ChipFamily.Intel,
    cores_cpu: '2',
    cores_gpu: 0,
    memory: '8GB - 16GB',
    releaseYear: 2015,
    singleCoreScore: 800,
    multiCoreScore: 1700,
    metalScore: 3000,
    basePriceUSD: 1299,
    description: 'A very reliable workhorse that lasted many people 7+ years.'
  },

  // Older Classics (Brief)
  {
    id: 'intel-macpro-2013',
    name: 'Mac Pro (2013)',
    type: DeviceType.Desktop,
    chip: 'Xeon E5 12-Core',
    family: ChipFamily.Intel,
    cores_cpu: '12',
    cores_gpu: 64, // Dual D700
    memory: '12GB - 64GB',
    releaseYear: 2013,
    singleCoreScore: 800,
    multiCoreScore: 7000,
    metalScore: 30000,
    basePriceUSD: 2999,
    description: 'The "Trash Can".'
  },
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
    description: 'Last user-upgradable quad-core mini for many years.'
  }
];

// Helper to calculate a synthetic "Tier Score" for ranking
export const calculateTierScore = (mac: MacModel) => {
  // Weighted score: 35% Single Core, 45% Multi Core, 20% Metal
  // We normalize slightly based on max observed values (approx) to keep them in readable ranges
  const sc = mac.singleCoreScore / 4000;
  const mc = mac.multiCoreScore / 25000;
  const mt = mac.metalScore / 200000;
  
  // Weights (Sums to 100)
  const total = (sc * 35) + (mc * 45) + (mt * 20); 
  return Math.round(total); // Remove decimals
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