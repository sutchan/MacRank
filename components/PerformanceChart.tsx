import React, { useContext, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Defs, LinearGradient, Stop } from 'recharts';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import { LanguageContext } from '../App';
import { BarChart3, Cpu, Layers } from 'lucide-react';

interface PerformanceChartProps {
  data: MacModel[];
}

type Metric = 'composite' | 'single' | 'multi' | 'metal';

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const { t } = useContext(LanguageContext);
  const [metric, setMetric] = useState<Metric>('composite');

  // Prepare and sort data based on selected metric
  const chartData = useMemo(() => {
    return [...data]
      .map(m => ({
        ...m,
        compositeScore: calculateTierScore(m),
        tier: getTierLabel(calculateTierScore(m))
      }))
      .sort((a, b) => {
        if (metric === 'single') return b.singleCoreScore - a.singleCoreScore;
        if (metric === 'multi') return b.multiCoreScore - a.multiCoreScore;
        if (metric === 'metal') return b.metalScore - a.metalScore;
        return b.compositeScore - a.compositeScore;
      })
      .slice(0, 15);
  }, [data, metric]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl text-xs transition-colors z-50">
          <p className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{data.name}</p>
          <p className="text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
            <Cpu size={12} /> {data.chip}
          </p>
          <div className="space-y-1.5">
            <div className={`flex justify-between gap-4 ${metric === 'single' ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{t('singleCore')}:</span>
              <span>{data.singleCoreScore.toLocaleString()}</span>
            </div>
            <div className={`flex justify-between gap-4 ${metric === 'multi' ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{t('multiCore')}:</span>
              <span>{data.multiCoreScore.toLocaleString()}</span>
            </div>
            <div className={`flex justify-between gap-4 ${metric === 'metal' ? 'font-bold text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{t('metal')}:</span>
              <span>{data.metalScore.toLocaleString()}</span>
            </div>
            
            <div className={`pt-2 mt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between gap-4 ${metric === 'composite' ? 'font-bold text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-500'}`}>
              <span>{t('composite')}:</span>
              <span>{data.compositeScore}</span>
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
    return 'compositeScore';
  };

  const getBarFill = () => {
    if (metric === 'single') return 'url(#colorSingle)';
    if (metric === 'multi') return 'url(#colorMulti)';
    if (metric === 'metal') return 'url(#colorMetal)';
    return undefined; // Use cell mapping for composite
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 size={20} className="text-gray-400" />
            {t('topIndex')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('showing')} Top 15</p>
        </div>

        {/* Metric Switcher */}
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex overflow-x-auto max-w-full no-scrollbar">
           {(['composite', 'single', 'multi', 'metal'] as const).map((m) => (
             <button
               key={m}
               onClick={() => setMetric(m)}
               className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
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
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
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
            </defs>

            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#374151" strokeOpacity={0.1} />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="chip" 
              width={100} 
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
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;