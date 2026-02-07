import React from 'react';
import { X, Cpu, Layers, HardDrive, Monitor, Zap, CheckCircle2 } from 'lucide-react';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import TierBadge from './TierBadge';

interface DetailModalProps {
  mac: MacModel | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ mac, onClose }) => {
  if (!mac) return null;

  const score = calculateTierScore(mac);
  const tier = getTierLabel(score);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-transparent dark:border-gray-800">
        {/* Header Image/Banner Area */}
        <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 w-full relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 rounded-full shadow-sm transition-all text-gray-600 dark:text-gray-300"
          >
            <X size={20} />
          </button>
          <div className="absolute -bottom-8 left-8 flex items-end">
             <div className="bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-lg">
                <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold text-white shadow-inner ${
                    tier.startsWith('S') ? 'bg-purple-500' : 
                    tier.startsWith('A') ? 'bg-blue-500' :
                    tier.startsWith('B') ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                    {tier}
                </div>
             </div>
             <div className="ml-4 mb-2">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{mac.name}</h2>
                 <p className="text-gray-500 dark:text-gray-400 font-medium">{mac.releaseYear} • {mac.chip}</p>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-12 pb-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {mac.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Specifications</h3>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                        <Cpu className="text-blue-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Processor</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{mac.chip}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{mac.cores_cpu} Cores</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                        <Layers className="text-purple-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Graphics</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{mac.cores_gpu} Core GPU</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors">
                        <HardDrive className="text-green-500" size={20} />
                        <div>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Memory</p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{mac.memory}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Benchmark Scores</h3>
                    
                     <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">Single-Core</span>
                                <span className="font-mono font-medium text-gray-900 dark:text-white">{mac.singleCoreScore}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(mac.singleCoreScore / 4500) * 100}%`}}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">Multi-Core</span>
                                <span className="font-mono font-medium text-gray-900 dark:text-white">{mac.multiCoreScore}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(mac.multiCoreScore / 30000) * 100}%`}}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">Metal (GPU)</span>
                                <span className="font-mono font-medium text-gray-900 dark:text-white">{mac.metalScore}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(mac.metalScore / 250000) * 100}%`}}></div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                     <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">Launch Price</p>
                     <p className="text-xl font-bold text-gray-900 dark:text-white">${mac.basePriceUSD}</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-100 dark:border-green-900/30">
                    <CheckCircle2 size={16} />
                    Verified Specs
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;