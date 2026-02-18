// app/components/PerformanceChart.tsx v0.6.1
import React, { useContext, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ScatterChart, Scatter } from 'recharts';
import { calculateTierScore, getTierLabel } from '../lib/scoring';
import { MacModel, RankingScenario } from '../types';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { BarChart3, Cpu, DollarSign, Info } from 'lucide-react';
import { formatCurrency } from '../locales/translations';

interface PerformanceChartProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
  scenario: RankingScenario;
}

type Metric = 'composite' | 'single' | 'multi' | 'metal' | 'value' | 'value-ratio';

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, onSelect, scenario }) => {
  const { t, language } = useContext(LanguageContext) as LanguageContextType;
  const [metric, setMetric] = useState<Metric>('composite');

  const { chartData, stats } = useMemo(() => {
    const enriched = data.map(m => {
        const score = calculateTierScore(m, scenario);
        const shortModelName = m.name.replace(/MacBook Pro/, 'MBP').replace(/MacBook Air/, 'MBA').split('(')[0].trim();
        const displayName = `${shortModelName} - ${m.chip}`;
        return { ...m, displayName, compositeScore: score, tier: getTierLabel(score), valueRatio: m.basePriceUSD > 0 ? score / m.basePriceUSD : 0 };
    });
    const stats = {
        avgScore: enriched.length ? enriched.reduce((s, i) => s + i.compositeScore, 0) / enriched.length : 0,
        avgPrice: enriched.length ? enriched.reduce((s, i) => s + i.basePriceUSD, 0) / enriched.length : 0
    };
    let processedData = [...enriched];
    if (metric === 'value-ratio') processedData.sort((a, b) => b.valueRatio - a.valueRatio);
    else if (metric !== 'value') {
       processedData.sort((a, b) => {
        if (metric === 'single') return b.singleCoreScore - a.singleCoreScore;
        if (metric === 'multi') return b.multiCoreScore - a.multiCoreScore;
        if (metric === 'metal') return b.metalScore - a.metalScore;
        return b.compositeScore - a.compositeScore;
      });
    }
    return { chartData: processedData.slice(0, 15), stats };
  }, [data, metric, scenario]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl text-xs z-50">
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{d.name}</p>
          <p className="text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1"><Cpu size={12} /> {d.chip}</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4"><span>{t('composite')}:</span><span>{Math.round(d.compositeScore)}</span></div>
            <div className="flex justify-between gap-4"><span>{t('price')}:</span><span>{formatCurrency(d.basePriceUSD, language)}</span></div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="performance-chart-wrapper" className="w-full bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
      <div id="performance-chart-header" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          {metric.includes('value') ? <DollarSign size={20} /> : <BarChart3 size={20} />}
          {metric === 'value' ? t('chart_value') : metric === 'value-ratio' ? t('chart_ratio') : t('topIndex')}
        </h3>
        <div id="performance-chart-metric-selector" className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex overflow-x-auto no-scrollbar w-full sm:w-auto">
           {(['composite', 'single', 'multi', 'metal', 'value-ratio', 'value'] as const).map((m) => (
             <button key={m} onClick={() => setMetric(m)} className={`px-3 py-1.5 text-[10px] md:text-xs font-medium rounded-md whitespace-nowrap transition-colors ${metric === m ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
               {m === 'value-ratio' ? t('chart_ratio') : t(`chart_${m}`)}
             </button>
           ))}
        </div>
      </div>

      <div id="performance-chart-viewport" className="h-[350px] md:h-[500px] w-full relative">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {metric === 'value' ? (
               <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }} onClick={(e: any) => e?.activePayload && onSelect(e.activePayload[0].payload)}>
                 <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                 <XAxis type="number" dataKey="basePriceUSD" name="Price" unit="$" tick={{ fontSize: 10 }} label={{ value: t('price'), position: 'bottom', offset: 0, fontSize: 10 }} />
                 <YAxis type="number" dataKey="compositeScore" name="Score" tick={{ fontSize: 10 }} label={{ value: t('score'), angle: -90, position: 'left', fontSize: 10 }} />
                 <Tooltip content={<CustomTooltip />} />
                 <ReferenceLine x={stats.avgPrice} stroke="#9ca3af" strokeDasharray="3 3" />
                 <ReferenceLine y={stats.avgScore} stroke="#9ca3af" strokeDasharray="3 3" />
                 <Scatter name="Macs" data={chartData} className="cursor-pointer">
                    {chartData.map((_entry, idx) => <Cell key={idx} fill="#3b82f6" />)}
                 </Scatter>
               </ScatterChart>
            ) : (
               <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }} onClick={(e: any) => e?.activePayload && onSelect(e.activePayload[0].payload)}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="displayName" width={160} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={metric === 'value-ratio' ? 'valueRatio' : metric === 'single' ? 'singleCoreScore' : metric === 'multi' ? 'multiCoreScore' : metric === 'metal' ? 'metalScore' : 'compositeScore'} radius={[0, 4, 4, 0]} barSize={20}>
                  {chartData.map((_entry, idx) => <Cell key={idx} fill="#3b82f6" />)}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div id="chart-empty-state" className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <Info size={40} className="mb-2 opacity-20" />
            <p className="text-sm font-medium opacity-50">No data matches your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;