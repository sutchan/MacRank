import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getTierColor, calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';

interface PerformanceChartProps {
  data: MacModel[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl text-xs">
        <p className="font-bold text-gray-900 mb-1">{data.name}</p>
        <p className="text-gray-500 mb-2">{data.chip}</p>
        <div className="space-y-1">
          <p className="text-blue-600 font-medium">Multi-Core: {data.multiCoreScore}</p>
          <p className="text-purple-600 font-medium">Metal (GPU): {data.metalScore}</p>
          <p className="text-gray-700 font-bold border-t border-gray-100 pt-1 mt-1">
            Composite: {payload[0].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  // Take top 15 models for the chart to avoid overcrowding, sorted by score
  const chartData = [...data]
    .map(m => ({
      ...m,
      compositeScore: calculateTierScore(m),
      tier: getTierLabel(calculateTierScore(m))
    }))
    .sort((a, b) => b.compositeScore - a.compositeScore)
    .slice(0, 15);

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 ml-2">Top 15 Performance Index</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#f0f0f0" />
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="chip" 
            width={100} 
            tick={{ fontSize: 11, fill: '#6b7280' }} 
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="compositeScore" radius={[0, 4, 4, 0]} barSize={18}>
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