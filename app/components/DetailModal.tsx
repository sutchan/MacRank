// app/components/DetailModal.tsx v0.6.1
import React, { useContext, useState } from 'react';
import { X, Cpu, Layers, HardDrive, CheckCircle2, Share2, Check, Monitor, Zap } from 'lucide-react';
import { calculateTierScore, getTierLabel } from '../lib/scoring';
import { MacModel, RankingScenario } from '../types';
import { LanguageContext, LanguageContextType, formatCurrency } from '../locales/translations';
import TierBadge from './TierBadge';
import { shareContent } from '../lib/share';

interface DetailModalProps {
  mac: MacModel | null;
  onClose: () => void;
  scenario: RankingScenario;
}

const DetailModal: React.FC<DetailModalProps> = ({ mac, onClose, scenario }) => {
  const { t, language } = useContext(LanguageContext) as LanguageContextType;
  const [showCopied, setShowCopied] = useState(false);

  if (!mac) return null;

  const score = calculateTierScore(mac, scenario);
  const tier = getTierLabel(score);

  const descKey = `desc_${mac.id}`;
  const translatedText = t(descKey as any);
  const description = translatedText !== descKey ? translatedText : mac.description;

  const handleShare = async () => {
    const currentHash = window.location.hash.substring(1);
    const params = new URLSearchParams(currentHash);
    params.set('model', mac.id);
    const baseUrl = window.location.href.split('#')[0];
    const newUrl = `${baseUrl}#${params.toString()}`;
    
    const result = await shareContent({
      title: `${mac.name} - MacRank`,
      text: `Check out the ${mac.name} on MacRank!\nScore: ${score} (${tier})\nChip: ${mac.chip}`,
      url: newUrl
    });
    if (result === 'copied') { setShowCopied(true); setTimeout(() => setShowCopied(false), 2000); }
  };

  const TechParam = ({ icon: Icon, label, value, fullWidth = false }: { icon: any, label: string, value: string | number, fullWidth?: boolean }) => (
    <div className={`flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-colors ${fullWidth ? 'col-span-2 md:col-span-1' : ''}`}>
      <Icon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" strokeWidth={1.5} />
      <div>
        <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );

  return (
    <div id="detail-modal-overlay-container" className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div id="detail-modal-content-wrapper" className="relative w-full max-w-2xl bg-white dark:bg-apple-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/10 max-h-[90vh] flex flex-col">
        
        <div className="p-6 md:p-8 pb-4 flex justify-between items-start shrink-0 bg-white dark:bg-apple-gray-900">
             <div>
                 <div className="flex items-center gap-3 mb-3">
                    <TierBadge tier={tier} />
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">{mac.releaseYear}</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{mac.name}</h2>
                 <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">{mac.chip}</p>
             </div>
             <div className="flex gap-2">
                <button onClick={handleShare} className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full text-gray-500 hover:text-blue-600 transition-colors" title={t('share')}>
                  {showCopied ? <Check size={20} className="text-green-500"/> : <Share2 size={20} />}
                </button>
                <button onClick={onClose} className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={t('close')}><X size={20} /></button>
             </div>
        </div>

        <div id="detail-modal-scroll-container" className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 pt-0 space-y-8">
            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-normal italic border-l-2 border-blue-500 pl-4 bg-blue-50/30 dark:bg-blue-500/5 py-2 rounded-r-xl">
                {description}
            </p>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{t('specs')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <TechParam icon={Cpu} label="CPU" value={mac.cores_cpu} />
                  <TechParam icon={Layers} label="GPU" value={`${mac.cores_gpu} ${t('cores')}`} />
                  <TechParam icon={HardDrive} label={t('memory')} value={mac.memory} />
                  {mac.ramType && <TechParam icon={Zap} label={t('ram_type')} value={mac.ramType} fullWidth />}
                  {mac.displayInfo && <TechParam icon={Monitor} label={t('display')} value={mac.displayInfo} fullWidth />}
                  <TechParam icon={Zap} label="MSRP" value={formatCurrency(mac.basePriceUSD, language)} />
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{t('benchmarkScores')}</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: t('singleCore'), score: mac.singleCoreScore, max: 5000, color: 'bg-blue-500' },
                    { label: t('multiCore'), score: mac.multiCoreScore, max: 35000, color: 'bg-purple-500' },
                    { label: t('metal'), score: mac.metalScore, max: 250000, color: 'bg-emerald-500' }
                  ].map((b, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{b.label}</span>
                        <span className="text-lg font-bold tabular-nums dark:text-white">{b.score.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${b.color} rounded-full transition-all duration-1000`} style={{ width: `${Math.min(100, (b.score / b.max) * 100)}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-100 dark:border-white/5 text-green-600 dark:text-green-400 text-xs font-bold">
               <CheckCircle2 size={16} />
               <span>{t('verifiedSpecs')}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;