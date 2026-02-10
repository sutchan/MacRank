import React, { useContext } from 'react';
import { X, Cpu, Layers, HardDrive, CheckCircle2 } from 'lucide-react';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel, DeviceType } from '../lib/types';
import { LanguageContext } from '../lib/translations';
import TierBadge from './TierBadge';
import { formatCurrency } from '../lib/translations';

interface DetailModalProps {
  mac: MacModel | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ mac, onClose }) => {
  const { t, language } = useContext(LanguageContext);

  if (!mac) return null;

  const score = calculateTierScore(mac);
  const tier = getTierLabel(score);

  const getTypeLabel = (type: DeviceType) => {
    switch (type) {
      case DeviceType.Laptop: return t('type_laptop');
      case DeviceType.Desktop: return t('type_desktop');
      case DeviceType.Tablet: return t('type_tablet');
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[rgba(50,50,50,0.4)] dark:bg-[rgba(0,0,0,0.7)] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20 dark:border-white/10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 md:p-8 pb-0 flex justify-between items-start">
             <div>
                 <div className="flex items-center gap-3 mb-2">
                    <TierBadge tier={tier} />
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{getTypeLabel(mac.type)}</span>
                 </div>
                 <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight leading-tight">{mac.name}</h2>
                 <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mt-2 font-light">{mac.chip} <span className="mx-2">•</span> {mac.releaseYear}</p>
             </div>
             <button 
                onClick={onClose}
                aria-label={t('close')}
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
             >
                <X size={20} />
             </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar space-y-8 md:space-y-10">
            
            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                {mac.description}
            </p>

            {/* Grid Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Column 1: Core Specs */}
                <div>
                   <h3 className="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">{t('specs')}</h3>
                   <div className="space-y-6">
                        <div className="flex gap-4">
                            <Cpu className="text-gray-400 w-6 h-6 shrink-0" strokeWidth={1.5} />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{mac.chip}</p>
                                <p className="text-sm text-gray-500">{mac.cores_cpu} {t('cores')}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Layers className="text-gray-400 w-6 h-6 shrink-0" strokeWidth={1.5} />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{mac.cores_gpu} {t('core_gpu')}</p>
                                <p className="text-sm text-gray-500">{t('graphics')}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <HardDrive className="text-gray-400 w-6 h-6 shrink-0" strokeWidth={1.5} />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{mac.memory}</p>
                                <p className="text-sm text-gray-500">{t('memory')}</p>
                            </div>
                        </div>
                   </div>
                </div>

                {/* Column 2: Performance Bars */}
                <div>
                   <h3 className="text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">{t('benchmarkScores')}</h3>
                   
                   <div className="space-y-6">
                        {/* Single Core */}
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">{t('singleCore')}</span>
                                <span className="font-mono text-gray-900 dark:text-white">{mac.singleCoreScore}</span>
                             </div>
                             <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(mac.singleCoreScore / 4500) * 100}%`}}></div>
                             </div>
                        </div>

                        {/* Multi Core */}
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">{t('multiCore')}</span>
                                <span className="font-mono text-gray-900 dark:text-white">{mac.multiCoreScore}</span>
                             </div>
                             <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(mac.multiCoreScore / 30000) * 100}%`}}></div>
                             </div>
                        </div>

                        {/* Metal */}
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">{t('metal')}</span>
                                <span className="font-mono text-gray-900 dark:text-white">{mac.metalScore}</span>
                             </div>
                             <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(mac.metalScore / 250000) * 100}%`}}></div>
                             </div>
                        </div>
                   </div>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="text-center sm:text-left">
                    <div className="text-xs text-gray-500 uppercase font-semibold">{t('launchPrice')}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(mac.basePriceUSD, language)}</div>
                 </div>
                 <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                    <CheckCircle2 size={16} />
                    {t('verifiedSpecs')}
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DetailModal;