// app/components/CompareModal.tsx v0.8.0
import React, { useContext, useState } from 'react';
import { X, Share2, Check } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { MacModel, RankingScenario } from '../types';
import { calculateTierScore, getTierLabel } from '../lib/scoring';
import { LanguageContext, LanguageContextType, formatCurrency } from '../locales/translations';
import TierBadge from './TierBadge';
import { shareContent } from '../lib/share';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CompareModalProps {
  models: MacModel[];
  onClose: () => void;
  scenario: RankingScenario;
}

const CompareModal: React.FC<CompareModalProps> = ({ models, onClose, scenario }) => {
  const { t, language } = useContext(LanguageContext) as LanguageContextType;
  const [showCopied, setShowCopied] = useState(false);

  if (models.length !== 2) return null;

  const [m1, m2] = models;
  const score1 = calculateTierScore(m1, scenario);
  const score2 = calculateTierScore(m2, scenario);

  const radarData = [
    {
      subject: t('singleCore'),
      A: (m1.singleCoreScore / 5000) * 100,
      B: (m2.singleCoreScore / 5000) * 100,
      fullMark: 100,
    },
    {
      subject: t('multiCore'),
      A: (m1.multiCoreScore / 35000) * 100,
      B: (m2.multiCoreScore / 35000) * 100,
      fullMark: 100,
    },
    {
      subject: t('metal'),
      A: (m1.metalScore / 250000) * 100,
      B: (m2.metalScore / 250000) * 100,
      fullMark: 100,
    },
    {
      subject: t('chart_ratio'),
      A: Math.min(100, (score1 / m1.basePriceUSD) * 15),
      B: Math.min(100, (score2 / m2.basePriceUSD) * 15),
      fullMark: 100,
    },
    {
      subject: t('memory'),
      A: Math.min(100, (parseInt(m1.memory.split('-').pop() || '0') / 192) * 100),
      B: Math.min(100, (parseInt(m2.memory.split('-').pop() || '0') / 192) * 100),
      fullMark: 100,
    }
  ];

  const handleShare = async () => {
    const compareTitle = t('share_compare_msg') || 'Performance Battle:';
    const shareText = `${compareTitle} ${m1.name} ${t('vs')} ${m2.name}`;

    const result = await shareContent({
      title: 'MacRank Comparison',
      text: shareText,
      url: window.location.href
    });

    if (result === 'copied') {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const ComparisonRow = ({ label, val1, val2, suffix = '' }: { label: string, val1: number, val2: number, suffix?: string }) => {
    const max = Math.max(val1, val2);
    const safeMax = max === 0 ? 1 : max;
    const p1 = (val1 / safeMax) * 100;
    const p2 = (val2 / safeMax) * 100;
    const diff = val1 - val2;
    const minVal = Math.min(val1, val2);
    const diffPercent = minVal > 0 ? Math.round((Math.abs(diff) / minVal) * 100) : 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
           <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
           {diff !== 0 && (
             <span className={`text-[10px] font-bold ${diff > 0 ? 'text-primary' : 'text-chart-4'}`}>
                {diff > 0 ? m1.name : m2.name} +{diffPercent}%
             </span>
           )}
        </div>

        <div className="flex items-center gap-3 mb-2">
           <div className="w-16 md:w-24 text-right text-[10px] font-medium truncate text-muted-foreground shrink-0">{m1.chip}</div>
           <div className="relative flex-1 h-2 bg-muted rounded-full overflow-hidden">
             <div className={`h-full rounded-full transition-[width] duration-500 ${val1 >= val2 ? 'bg-primary' : 'bg-muted-foreground/40'}`} style={{ width: `${p1}%` }}></div>
           </div>
           <div className="w-16 md:w-20 text-right text-xs md:text-sm font-bold text-foreground tabular-nums shrink-0">{val1.toLocaleString()}{suffix}</div>
        </div>

        <div className="flex items-center gap-3">
           <div className="w-16 md:w-24 text-right text-[10px] font-medium truncate text-muted-foreground shrink-0">{m2.chip}</div>
           <div className="relative flex-1 h-2 bg-muted rounded-full overflow-hidden">
             <div className={`h-full rounded-full transition-[width] duration-500 ${val2 > val1 ? 'bg-chart-4' : 'bg-muted-foreground/40'}`} style={{ width: `${p2}%` }}></div>
           </div>
           <div className="w-16 md:w-20 text-right text-xs md:text-sm font-bold text-foreground tabular-nums shrink-0">{val2.toLocaleString()}{suffix}</div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-3xl p-0 gap-0 overflow-hidden flex flex-col max-h-[90vh]" showCloseButton={false}>
        <div className="p-4 md:p-6 border-b border-border flex justify-between items-center bg-muted">
           <h2 className="text-lg md:text-xl font-semibold text-foreground">{t('compareModels')}</h2>
           <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon-sm" onClick={handleShare} aria-label={t('share')}>
                {showCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
             </Button>
             <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label={t('close')}>
                <X size={20} aria-hidden="true" />
             </Button>
           </div>
        </div>

        <div id="compare-modal-scroll-container" className="overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="flex flex-col lg:flex-row gap-8 mb-10 items-center justify-center">
             <div className="flex-1 flex flex-col items-center text-center order-2 lg:order-1">
                <div className="mb-3"><TierBadge tier={getTierLabel(score1)} /></div>
                <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{m1.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter mb-2">{m1.chip}</p>
                <p className="text-sm font-black text-primary">{formatCurrency(m1.basePriceUSD, language)}</p>
             </div>

             <div className="w-[280px] h-[220px] shrink-0 order-1 lg:order-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" strokeOpacity={0.2} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 9 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name={m1.name} dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name={m2.name} dataKey="B" stroke="#a855f7" strokeWidth={2} fill="#a855f7" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
             </div>

             <div className="flex-1 flex flex-col items-center text-center order-3">
                <div className="mb-3"><TierBadge tier={getTierLabel(score2)} /></div>
                <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{m2.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter mb-2">{m2.chip}</p>
                <p className="text-sm font-black text-chart-4">{formatCurrency(m2.basePriceUSD, language)}</p>
             </div>
          </div>

          <div className="space-y-1">
            <ComparisonRow label={t('composite')} val1={score1} val2={score2} />
            <ComparisonRow label={t('singleCore')} val1={m1.singleCoreScore} val2={m2.singleCoreScore} />
            <ComparisonRow label={t('multiCore')} val1={m1.multiCoreScore} val2={m2.multiCoreScore} />
            <ComparisonRow label={t('metal')} val1={m1.metalScore} val2={m2.metalScore} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompareModal;
