import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getTierColor, calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import { LanguageContext } from '../App';

interface PerformanceChartProps {
  data: MacModel[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const { t } = useContext(LanguageContext);

  // Take top 15 models for the chart to avoid overcrowding, sorted by score
  const chartData = [...data]
    .map(m => ({
      ...m,
      compositeScore: calculateTierScore(m),
      tier: getTierLabel(calculateTierScore(m))
    }))
    .sort((a, b) => b.compositeScore - a.compositeScore)
    .slice(0, 15);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-xl text-xs transition-colors z-50">
          <p className="font-bold text-gray-900 dark:text-white mb-1">{data.name}</p>
          <p className="text-gray-500 dark:text-gray-400 mb-2">{data.chip}</p>
          <div className="space-y-1">
            <p className="text-blue-600 dark:text-blue-400 font-medium">{t('multiCore')}: {data.multiCoreScore}</p>
            <p className="text-purple-600 dark:text-purple-400 font-medium">{t('metal')}: {data.metalScore}</p>
            <p className="text-gray-700 dark:text-gray-200 font-bold border-t border-gray-100 dark:border-gray-700 pt-1 mt-1">
              {t('composite')}: {payload[0].value}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[600px] bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-colors">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 ml-2">{t('topIndex')}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#374151" strokeOpacity={0.1} />
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="chip" 
            width={95} 
            tick={{ fontSize: 11, fill: '#6b7280' }} 
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} />
          <Bar dataKey="compositeScore" radius={[0, 4, 4, 0]} barSize={22}>
            {chartData.map((entry, index) => {
               // Map tier label to actual hex colors approximately matching the tailwind classes in data.ts
               let color = '#9ca3af';
               if (entry.tier.startsWith('S')) color = '#a855f7'; // purple
               else if (entry.tier.startsWith('A')) color = '#3b82f6'; // blue
               else if (entry.tier.startsWith('B')) color = '#22c55e'; // green
               else if (entry.tier.startsWith('C')) color = '#eab308'; // yellow
               return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;