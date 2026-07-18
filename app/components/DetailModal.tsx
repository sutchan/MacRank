// app/components/DetailModal.tsx v0.8.0
import React, { useContext, useState } from 'react';
import { X, Cpu, Layers, HardDrive, CheckCircle2, Share2, Check, Monitor, Zap, RotateCcw, Wifi, Cable, BoxSelect } from 'lucide-react';
import { calculateTierScore, getTierLabel } from '../lib/scoring';
import { estimateRefurbishedPrice } from '../services/priceService';
import { getMacSpecs } from '../lib/specs';
import { MacModel, RankingScenario } from '../types';
import { LanguageContext, LanguageContextType, formatCurrency } from '../locales/translations';
import TierBadge from './TierBadge';
import TradeInCalculator from './TradeInCalculator';
import { shareContent } from '../lib/share';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  const specs = getMacSpecs(mac);

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
      text: `Check out the ${mac.name} on MacRank! Score: ${score.toLocaleString()} (${tier}) Chip: ${mac.chip}`,
      url: newUrl
    });
    if (result === 'copied') { setShowCopied(true); setTimeout(() => setShowCopied(false), 2000); }
  };

  const TechParam = ({ icon: Icon, label, value, fullWidth = false }: { icon: any, label: string, value: string | number, fullWidth?: boolean }) => (
    <div className={`flex items-start gap-3 p-3 rounded-xl bg-muted border border-border transition-colors ${fullWidth ? 'col-span-2 md:col-span-1' : ''}`}>
      <Icon className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-2xl p-0 gap-0 overflow-hidden flex flex-col max-h-[90vh]" showCloseButton={false}>
        <div className="p-6 md:p-8 pb-4 flex justify-between items-start shrink-0">
             <div>
                 <div className="flex items-center gap-3 mb-3">
                    <TierBadge tier={tier} />
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{mac.releaseYear}</span>
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{mac.name}</h2>
                 <p className="text-muted-foreground mt-1 font-medium">{mac.chip}</p>
             </div>
             <div className="flex gap-2">
                <Button variant="ghost" size="icon-sm" onClick={handleShare} title={t('share')} aria-label={t('share')}>
                  {showCopied ? <Check size={20} className="text-green-500"/> : <Share2 size={20} />}
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label={t('close')}>
                  <X size={20} aria-hidden="true" />
                </Button>
             </div>
        </div>

        <div id="detail-modal-scroll-container" className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 pt-0 space-y-8">
            <p className="text-base md:text-lg leading-relaxed text-foreground font-normal italic border-l-2 border-primary pl-4 bg-primary/5 py-2 rounded-r-xl">
                {description}
            </p>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">{t('specs')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <TechParam icon={Cpu} label="CPU" value={mac.cores_cpu} />
                  <TechParam icon={Layers} label="GPU" value={`${mac.cores_gpu} ${t('cores')}`} />
                  <TechParam icon={HardDrive} label={t('memory')} value={mac.memory} />
                  {mac.ramType && <TechParam icon={Zap} label={t('ram_type')} value={mac.ramType} fullWidth />}
                  {mac.displayInfo && <TechParam icon={Monitor} label={t('display')} value={mac.displayInfo} fullWidth />}
                  <TechParam icon={Zap} label="MSRP" value={formatCurrency(mac.basePriceUSD, language)} />
                  {!mac.isReference && mac.releaseYear < new Date().getFullYear() && (
                    <TechParam icon={RotateCcw} label={t('refurbished' as any)} value={`~${formatCurrency(estimateRefurbishedPrice(mac.basePriceUSD, mac.releaseYear), language)}`} />
                  )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">{t('connectivity' as any)}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <TechParam icon={Wifi} label={t('connectivity' as any)} value={specs.connectivity} fullWidth />
                  <TechParam icon={Cable} label={t('ports' as any)} value={specs.portsDescription} fullWidth />
                  <TechParam icon={Monitor} label={t('max_displays' as any)} value={`${specs.maxExternalDisplays}x`} />
                  <TechParam icon={BoxSelect} label={t('ram_upgrade' as any)} value={specs.ramUpgradable ? t('upgradable' as any) : t('not_upgradable' as any)} />
                  <TechParam icon={HardDrive} label={t('ssd_upgrade' as any)} value={specs.ssdUpgradable ? t('upgradable' as any) : t('not_upgradable' as any)} />
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">{t('benchmarkScores')}</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: t('singleCore'), score: mac.singleCoreScore, max: 5000, color: 'bg-primary' },
                    { label: t('multiCore'), score: mac.multiCoreScore, max: 35000, color: 'bg-chart-4' },
                    { label: t('metal'), score: mac.metalScore, max: 250000, color: 'bg-chart-2' }
                  ].map((b, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-muted border border-border">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{b.label}</span>
                        <span className="text-lg font-bold tabular-nums text-foreground">{b.score.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <div className={`h-full ${b.color} rounded-full transition-[width] duration-1000`} style={{ width: `${Math.min(100, (b.score / b.max) * 100)}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <TradeInCalculator targetMac={mac} />

            <div className="flex items-center justify-center gap-2 py-4 border-t border-border text-chart-2 text-xs font-bold">
               <CheckCircle2 size={16} aria-hidden="true" />
               <span>{t('verifiedSpecs')}</span>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
