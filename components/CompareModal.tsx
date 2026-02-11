
import React, { useContext, useState } from 'react';
import { X, Share2, Check } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { MacModel, RankingScenario } from '../lib/types';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { LanguageContext, formatCurrency } from '../lib/translations';
import TierBadge from './TierBadge';

interface CompareModalProps {
  models: MacModel[];
  onClose: () => void;
  scenario: RankingScenario;
}

const CompareModal: React.FC<CompareModalProps> = ({ models, onClose, scenario }) => {
  const { t, language } = useContext(LanguageContext);
  const [showCopied, setShowCopied] = useState(false);

  if (models.length !== 2) return null;

  const [m1, m2] = models;
  const score1 = calculateTierScore(m1, scenario);
  const score2 = calculateTierScore(m2, scenario);

  // Prepare Radar Data
  const radarData = [
    {
      subject: t('singleCore'),
      A: (m1.singleCoreScore / 4200) * 100, // Normalized to max approx
      B: (m2.singleCoreScore / 4200) * 100,
      fullMark: 100,
    },
    {
      subject: t('multiCore'),
      A: (m1.multiCoreScore / 28000) * 100,
      B: (m2.multiCoreScore / 28000) * 100,
      fullMark: 100,
    },
    {
      subject: t('metal'),
      A: (m1.metalScore / 200000) * 100,
      B: (m2.metalScore / 200000) * 100,
      fullMark: 100,
    },
    {
      subject: t('chart_ratio'), // Value
      // Simple value calc: Composite Score / Price * constant to normalize roughly to 100
      A: Math.min(100, (score1 / m1.basePriceUSD) * 15), 
      B: Math.min(100, (score2 / m2.basePriceUSD) * 15),
      fullMark: 100,
    },
    {
      subject: t('memory'), // Ram Capacity (Max) approximation logic
      // Crude parsing of memory string "48GB - 128GB" -> 128
      A: Math.min(100, (parseInt(m1.memory.split('-').pop() || '0') / 192) * 100),
      B: Math.min(100, (parseInt(m2.memory.split('-').pop() || '0') / 192) * 100),
      fullMark: 100,
    }
  ];

  const getBarColor = (val1: number, val2: number) => {
    if (val1 > val2) return 'bg-blue-600 dark:bg-blue-500';
    if (val1 < val2) return 'bg-gray-400 dark:bg-gray-600';
    return 'bg-blue-400 dark:bg-blue-400';
  };

  const handleShare = () => {
    const compareTitle = t('share_compare_msg') || 'Performance Battle:';
    const shareText = `${compareTitle} ${m1.name} ${t('vs')} ${m2.name}\n${t('compareModels')} - MacRank\n\n👉 ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const ComparisonRow = ({ label, val1, val2, suffix = '' }: { label: string, val1: number, val2: number, suffix?: string }) => {
    const max = Math.max(val1, val2);
    const safeMax = max === 0 ? 1 : max;
    
    // Calculate percentage relative to the local maximum (winner)
    const p1 = (val1 / safeMax) * 100;
    const p2 = (val2 / safeMax) * 100;
    
    const diff = val1 - val2;
    const minVal = Math.min(val1, val2);
    const diffPercent = minVal > 0 ? Math.round((Math.abs(diff) / minVal) * 100) : 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
           <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
           {diff !== 0 && (
             <span className={`text-xs font-bold ${diff > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {diff > 0 ? m1.name : m2.name} +{diffPercent}%
             </span>
           )}
        </div>
        
        {/* Model 1 Bar */}
        <div className="flex items-center gap-3 mb-2">
           <div className="w-16 md:w-24 text-right text-xs font-medium truncate text-gray-600 dark:text-gray-300 shrink-0">{m1.chip}</div>
           <div className="relative flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
             <div className={`h-full rounded-full transition-all duration-500 ${getBarColor(val1, val2)}`} style={{ width: `${p1}%` }}></div>
             {val1 > val2 && (
                <div className="absolute top-0 bottom-0 w-[2px] bg-white/40 dark:bg-black/30 z-10 shadow-[0_0_2px_rgba(0,0,0,0.2)]" style={{ left: `${p2}%` }}></div>
             )}
           </div>
           <div className="w-16 md:w-20 text-right text-xs md:text-sm font-bold text-gray-900 dark:text-white tabular-nums shrink-0">{val1.toLocaleString()}{suffix}</div>
        </div>

        {/* Model 2 Bar */}
        <div className="flex items-center gap-3">
           <div className="w-16 md:w-24 text-right text-xs font-medium truncate text-gray-600 dark:text-gray-300 shrink-0">{m2.chip}</div>
           <div className="relative flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
             <div className={`h-full rounded-full transition-all duration-500 ${getBarColor(val2, val1)}`} style={{ width: `${p2}%` }}></div>
             {val2 > val1 && (
                <div className="absolute top-0 bottom-0 w-[2px] bg-white/40 dark:bg-black/30 z-10 shadow-[0_0_2px_rgba(0,0,0,0.2)]" style={{ left: `${p1}%` }}></div>
             )}
           </div>
           <div className="w-16 md:w-20 text-right text-xs md:text-sm font-bold text-gray-900 dark:text-white tabular-nums shrink-0">{val2.toLocaleString()}{suffix}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[rgba(50,50,50,0.5)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20 dark:border-white/10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#151516]">
           <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{t('compareModels')}</h2>
           <div className="flex items-center gap-2">
             <button 
                onClick={handleShare}
                aria-label={t('share')}
                className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
             >
                {showCopied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                {showCopied && <span className="text-xs font-medium text-green-600 dark:text-green-400 hidden sm:inline">{t('link_copied')}</span>}
             </button>
             <button 
                onClick={onClose}
                aria-label={t('close')}
                className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
             >
                <X size={20} />
             </button>
           </div>
        </div>

        <div className="overflow-y-auto p-4 md:p-6 custom-scrollbar">
          
          {/* Models Header & Radar Chart */}
          <div className="flex flex-col md:flex-row gap-8 mb-10 items-center justify-center">
             
             {/* Model 1 Info */}
             <div className="flex-1 flex flex-col items-center text-center order-2 md:order-1">
                <div className="mb-3">
                   <TierBadge tier={getTierLabel(score1)} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{m1.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{m1.chip}</p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{formatCurrency(m1.basePriceUSD, language)}</p>
             </div>

             {/* Radar Chart - Centerpiece */}
             <div className="w-[240px] h-[200px] shrink-0 order-1 md:order-2 -my-4 md:my-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" strokeOpacity={0.5} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name={m1.name}
                      dataKey="A"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name={m2.name}
                      dataKey="B"
                      stroke="#9333ea"
                      strokeWidth={2}
                      fill="#a855f7"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
             </div>

             {/* Model 2 Info */}
             <div className="flex-1 flex flex-col items-center text-center order-3">
                <div className="mb-3">
                   <TierBadge tier={getTierLabel(score2)} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{m2.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{m2.chip}</p>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{formatCurrency(m2.basePriceUSD, language)}</p>
             </div>
          </div>

          <div className="space-y-1">
            <ComparisonRow label={t('composite')} val1={score1} val2={score2} />
            <ComparisonRow label={t('singleCore')} val1={m1.singleCoreScore} val2={m2.singleCoreScore} />
            <ComparisonRow label={t('multiCore')} val1={m1.multiCoreScore} val2={m2.multiCoreScore} />
            <ComparisonRow label={t('metal')} val1={m1.metalScore} val2={m2.metalScore} />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8 mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
              <div className="text-center">
                 <p className="text-xs text-gray-500 uppercase mb-1">{t('memory')}</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white">{m1.memory}</p>
              </div>
              <div className="text-center">
                 <p className="text-xs text-gray-500 uppercase mb-1">{t('memory')}</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white">{m2.memory}</p>
              </div>

              <div className="text-center">
                 <p className="text-xs text-gray-500 uppercase mb-1">{t('gpuCores')}</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white">{m1.cores_gpu}</p>
              </div>
              <div className="text-center">
                 <p className="text-xs text-gray-500 uppercase mb-1">{t('gpuCores')}</p>
                 <p className="text-sm font-medium text-gray-900 dark:text-white">{m2.cores_gpu}</p>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompareModal;