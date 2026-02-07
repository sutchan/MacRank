import React from 'react';
import { calculateTierScore, getTierLabel } from '../lib/data';
import { MacModel } from '../lib/types';
import TierBadge from './TierBadge';
import { Cpu, Zap, Layers, DollarSign } from 'lucide-react';

interface MacTableProps {
  data: MacModel[];
  onSelect: (mac: MacModel) => void;
}

const MacTable: React.FC<MacTableProps> = ({ data, onSelect }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
            <th className="p-4 rounded-tl-2xl">Rank</th>
            <th className="p-4">Model & Chip</th>
            <th className="p-4 hidden md:table-cell">CPU Cores</th>
            <th className="p-4 hidden md:table-cell">GPU Cores</th>
            <th className="p-4 text-right">Performance</th>
            <th className="p-4 text-right rounded-tr-2xl">Price (Launch)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {data.map((mac) => {
            const score = calculateTierScore(mac);
            const tier = getTierLabel(score);
            
            return (
              <tr 
                key={mac.id} 
                className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                onClick={() => onSelect(mac)}
              >
                <td className="p-4 w-16">
                  <TierBadge tier={tier} />
                </td>
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{mac.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-medium">{mac.chip}</span>
                    <span className="hidden sm:inline">• {mac.releaseYear}</span>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={14} className="text-gray-400" />
                    {mac.cores_cpu}
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Layers size={14} className="text-gray-400" />
                    {mac.cores_gpu}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-bold text-gray-900">{score} pts</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">Composite</span>
                  </div>
                </td>
                <td className="p-4 text-right font-medium text-gray-600">
                  <div className="flex items-center justify-end gap-1">
                    <DollarSign size={14} className="text-gray-400" />
                    {mac.basePriceUSD}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MacTable;