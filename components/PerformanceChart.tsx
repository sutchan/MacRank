import React, { useContext, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ScatterChart, Scatter, Label } from 'recharts';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import { LanguageContext } from '../App';
import { BarChart3, Cpu, DollarSign, TrendingUp, MousePointerClick } from 'lucide-react';
import { formatCurrency } from '../lib/translations';

interface PerformanceChartProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
}

type Metric = 'composite' | 'single' | 'multi' | 'metal' | 'value' | 'value-ratio';

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, onSelect }) => {
  const { t, language } = useContext(LanguageContext);
  const [metric, setMetric] = useState<Metric>('composite');

  // Prepare and sort data based on selected metric
  const { chartData, stats } = useMemo(() => {
    // Basic enrichment
    const enriched = data.map(m => {
        const score = calculateTierScore(m);
        // Create shortened display name combining model and chip
        const shortModelName = m.name.replace(/MacBook Pro/, 'MBP').replace(/MacBook Air/, 'MBA').replace(/Mac mini/, 'Mini').replace(/Mac Studio/, 'Studio').split('(')[0].trim();
        const displayName = `${shortModelName} - ${m.chip}`;

        return {
          ...m,
          displayName,
          compositeScore: score,
          tier: getTierLabel(score),
          valueRatio: m.basePriceUSD > 0 ? score / m.basePriceUSD : 0 // Points per dollar
        };
    });

    // For scatter chart, we need averages for quadrants
    const totalScore = enriched.reduce((sum, item) => sum + item.compositeScore, 0);
    const totalPrice = enriched.reduce((sum, item) => sum + item.basePriceUSD, 0);
    const stats = {
        avgScore: enriched.length ? totalScore / enriched.length : 0,
        avgPrice: enriched.length ? totalPrice / enriched.length : 0
    };

    // Filter/Sort logic
    let processedData = [...enriched];

    if (metric === 'value') {
       // Scatter chart uses all data, generally doesn't need slice unless massive
       return { chartData: processedData, stats };
    } else if (metric === 'value-ratio') {
       // Points per dollar - sort descending
       processedData.sort((a, b) => b.valueRatio - a.valueRatio);
    } else {
       // Standard performance bars - sort descending
       processedData.sort((a, b) => {
        if (metric === 'single') return b.singleCoreScore - a.singleCoreScore;
        if (metric === 'multi') return b.multiCoreScore - a.multiCoreScore;
        if (metric === 'metal') return b.metalScore - a.metalScore;
        return b.compositeScore - a.compositeScore;
      });
    }

    // Slice for bar charts to keep it readable
    processedData = processedData.slice(0, 15);

    return { chartData: processedData, stats };
  }, [data, metric]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl text-xs transition-colors z-50 min-w-[200px]">
          <div className="flex justify-between items-start mb-2">
             <p className="font-bold text-gray-900 dark:text-white text-sm max-w-[150px] leading-tight">{d.name}</p>
             <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                 d.tier === 'S+' ? 'bg-purple-100 text-purple-700' :
                 d.tier === 'S' ? 'bg-purple-100 text-purple-700' :
                 d.tier.startsWith('A') ? 'bg-blue-100 text-blue-700' :
                 'bg-gray-100 text-gray-700'
             }`}>{d.tier}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-700 pb-2">
            <Cpu size={12} /> {d.chip}
          </p>
          <div className="space-y-1.5">
            {/* Contextual Metric Highlighting */}
            <div className={`flex justify-between gap-4 ${metric === 'composite' || metric === 'value' ? 'font-bold text-purple-600 dark:text-purple-400' : 'text-gray-500'}`}>
              <span>{t('composite')}:</span>
              <span>{Math.round(d.compositeScore)}</span>
            </div>

            <div className={`flex justify-between gap-4 ${metric === 'value-ratio' ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
              <span>{t('chart_ratio')}:</span>
              <span>{(d.valueRatio * 10).toFixed(2)} pts/$10</span>
            </div>

            <div className="flex justify-between gap-4 text-gray-600 dark:text-gray-400">
               <span>{t('price')}:</span>
               <span>{formatCurrency(d.basePriceUSD, language)}</span>
            </div>

            {/* Detailed Stats (Smaller) */}
            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700 text-[10px] text-gray-400 grid grid-cols-2 gap-x-2 gap-y-1">
                 <div>Single: {d.singleCoreScore}</div>
                 <div>Multi: {d.multiCoreScore}</div>
                 <div className="col-span-2">Metal: {d.metalScore.toLocaleString()}</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getDataKey = () => {
    if (metric === 'single') return 'singleCoreScore';
    if (metric === 'multi') return 'multiCoreScore';
    if (metric === 'metal') return 'metalScore';
    if (metric === 'value-ratio') return 'valueRatio';
    return 'compositeScore';
  };

  const getBarFill = () => {
    if (metric === 'single') return 'url(#colorSingle)';
    if (metric === 'multi') return 'url(#colorMulti)';
    if (metric === 'metal') return 'url(#colorMetal)';
    if (metric === 'value-ratio') return 'url(#colorValue)';
    return undefined; // Composite uses cell mapping
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
      
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {metric === 'value' || metric === 'value-ratio' ? <DollarSign size={20} className="text-gray-400" /> : <BarChart3 size={20} className="text-gray-400" />}
            {metric === 'value' ? t('chart_value') : metric === 'value-ratio' ? t('chart_ratio') : t('topIndex')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
             {metric === 'value' 
                ? t('chart_value_desc')
                : metric === 'value-ratio'
                   ? t('chart_ratio_desc')
                   : `${t('showing')} Top 15 • ${t('clickToDetail')}`}
             {metric === 'value' && <MousePointerClick size={10} />}
          </p>
        </div>

        {/* Metric Switcher */}
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex flex-wrap gap-1 sm:gap-0 sm:flex-nowrap overflow-x-auto max-w-full no-scrollbar">
           {(['composite', 'single', 'multi', 'metal', 'value-ratio', 'value'] as const).map((m) => (
             <button
               key={m}
               onClick={() => setMetric(m)}
               className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex-grow sm:flex-grow-0 ${
                 metric === m 
                   ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                   : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
               }`}
             >
               {t(`chart_${m}` as any)}
             </button>
           ))}
        </div>
      </div>

      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metric === 'value' ? (
             <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }} onClick={(e) => e && e.activePayload && onSelect(e.activePayload[0].payload)}>
               <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
               <XAxis 
                 type="number" 
                 dataKey="basePriceUSD" 
                 name="Price" 
                 unit="$" 
                 tick={{ fontSize: 11, fill: '#6b7280' }}
                 label={{ value: t('price'), position: 'bottom', offset: 0, fontSize: 12, fill: '#6b7280' }}
                 domain={['dataMin - 100', 'dataMax + 100']}
               />
               <YAxis 
                 type="number" 
                 dataKey="compositeScore" 
                 name="Score" 
                 tick={{ fontSize: 11, fill: '#6b7280' }}
                 label={{ value: t('score'), angle: -90, position: 'left', offset: 10, fontSize: 12, fill: '#6b7280' }}
                 domain={['dataMin - 5', 'dataMax + 5']}
               />
               <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
               
               {/* Reference Lines for Quadrants */}
               <ReferenceLine x={stats.avgPrice} stroke="#9ca3af" strokeDasharray="3 3" strokeOpacity={0.5}>
                  <Label value="Avg Price" position="insideTopRight" fontSize={10} fill="#9ca3af" />
               </ReferenceLine>
               <ReferenceLine y={stats.avgScore} stroke="#9ca3af" strokeDasharray="3 3" strokeOpacity={0.5}>
                  <Label value="Avg Score" position="insideTopRight" fontSize={10} fill="#9ca3af" />
               </ReferenceLine>

               <Scatter name="Macs" data={chartData} className="cursor-pointer">
                  {chartData.map((entry, index) => {
                     let color = '#9ca3af';
                     if (entry.tier === 'S+') color = '#db2777';
                     else if (entry.tier === 'S') color = '#9333ea';
                     else if (entry.tier.startsWith('A')) color = '#3b82f6';
                     else if (entry.tier.startsWith('B')) color = '#22c55e';
                     else if (entry.tier.startsWith('C')) color = '#eab308';
                     return <Cell key={`cell-${index}`} fill={color} />;
                  })}
               </Scatter>
             </ScatterChart>
          ) : (
             <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              onClick={(e) => e && e.activePayload && onSelect(e.activePayload[0].payload)}
            >
              <defs>
                <linearGradient id="colorSingle" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="colorMulti" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="colorMetal" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
                   <stop offset="0%" stopColor="#86efac" />
                   <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#374151" strokeOpacity={0.1} />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="displayName" 
                width={160} 
                tick={{ fontSize: 11, fill: '#6b7280' }} 
                interval={0}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} />
              <Bar 
                dataKey={getDataKey()} 
                radius={[0, 4, 4, 0]} 
                barSize={20}
                fill={getBarFill()}
                animationDuration={500}
                className="cursor-pointer"
              >
                {metric === 'composite' && chartData.map((entry, index) => {
                  let color = '#9ca3af';
                  if (entry.tier === 'S+') color = '#db2777';
                  else if (entry.tier === 'S') color = '#9333ea';
                  else if (entry.tier.startsWith('A')) color = '#3b82f6';
                  else if (entry.tier.startsWith('B')) color = '#22c55e';
                  else if (entry.tier.startsWith('C')) color = '#eab308';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;