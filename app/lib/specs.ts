import { MacModel, ChipFamily, DeviceType } from '../types';

export interface MacSpecs {
  ramUpgradable: boolean;
  ssdUpgradable: boolean;
  maxExternalDisplays: number;
  connectivity: string;
  portsDescription: string;
}

export const getMacSpecs = (mac: MacModel): MacSpecs => {
  const isAppleSilicon = [ChipFamily.M1, ChipFamily.M2, ChipFamily.M3, ChipFamily.M4, ChipFamily.M5].includes(mac.family);
  const isPro = mac.chip.includes('Pro');
  const isMax = mac.chip.includes('Max');
  const isUltra = mac.chip.includes('Ultra');
  const isBase = !isPro && !isMax && !isUltra;
  
  // Defaults
  let specs: MacSpecs = {
    ramUpgradable: false,
    ssdUpgradable: false,
    maxExternalDisplays: 1,
    connectivity: 'Wi-Fi 6 / BT 5.0',
    portsDescription: 'Thunderbolt / USB 4'
  };

  // 1. Upgradability
  if (mac.type === DeviceType.Desktop && mac.name.includes('Mac Pro') && mac.family === ChipFamily.Intel) {
    specs.ramUpgradable = true;
    specs.ssdUpgradable = true;
  } else if (mac.type === DeviceType.Desktop && mac.name.includes('iMac') && mac.family === ChipFamily.Intel && mac.name.includes('27-inch')) {
    specs.ramUpgradable = true; // 27-inch Intel iMacs had accessible RAM
  } else if (mac.type === DeviceType.Desktop && mac.name.includes('Mac mini') && mac.family === ChipFamily.Intel && mac.releaseYear === 2018) {
    specs.ramUpgradable = true;
  }

  // 2. External Displays (Apple Silicon Rules)
  if (isAppleSilicon) {
    if (isUltra) {
      specs.maxExternalDisplays = 8;
    } else if (isMax) {
      specs.maxExternalDisplays = 4;
    } else if (isPro) {
      specs.maxExternalDisplays = 2;
    } else {
      // Base chips (M1/M2/M3)
      if (mac.type === DeviceType.Desktop) {
        specs.maxExternalDisplays = 2; // Mac mini supports 2 (1 HDMI + 1 TB)
      } else {
        specs.maxExternalDisplays = 1; // MacBook Air/Pro 13" base only 1 external
      }
    }
    
    // M3 MacBook Air supports 2 if lid is closed, but let's keep it simple or note it.
    // M4 base might support 2.
    if (mac.family === ChipFamily.M3 && mac.type === DeviceType.Laptop && !isPro && !isMax) {
        // M3 Air supports 2 with lid closed
        specs.maxExternalDisplays = 2; 
    }
  } else {
    // Intel defaults
    specs.maxExternalDisplays = 2;
    if (mac.type === DeviceType.Desktop && mac.name.includes('Mac Pro')) specs.maxExternalDisplays = 12;
  }

  // 3. Connectivity
  if (mac.family === ChipFamily.M5) {
     specs.connectivity = 'Wi-Fi 7 / BT 5.4';
  } else if (mac.family === ChipFamily.M4) {
     specs.connectivity = 'Wi-Fi 6E / BT 5.3';
  } else if (mac.family === ChipFamily.M3) {
     specs.connectivity = 'Wi-Fi 6E / BT 5.3';
  } else if (mac.family === ChipFamily.M2) {
     if (isPro || isMax || isUltra) specs.connectivity = 'Wi-Fi 6E / BT 5.3';
     else specs.connectivity = 'Wi-Fi 6 / BT 5.3'; // M2 Air is Wi-Fi 6
  }

  // 4. Ports
  if (mac.type === DeviceType.Laptop) {
      if (isBase && mac.name.includes('Air')) {
          specs.portsDescription = '2x Thunderbolt / USB 4';
      } else if (isPro || isMax) {
          specs.portsDescription = '3x Thunderbolt 4, HDMI, SDXC';
      }
  } else if (mac.type === DeviceType.Desktop) {
      if (mac.name.includes('Mac Studio')) {
          specs.portsDescription = isUltra ? '6x Thunderbolt 4, HDMI, SDXC' : '4x Thunderbolt 4, HDMI, SDXC';
      } else if (mac.name.includes('mini')) {
          specs.portsDescription = isPro ? '4x Thunderbolt 4, HDMI' : '2x Thunderbolt 4, HDMI';
      }
  }

  return specs;
};
