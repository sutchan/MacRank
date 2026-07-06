'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TierBadgeProps {
  tier: string;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const getBadgeStyle = (t: string) => {
    if (t === 'S+') return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 animate-pulse';
    if (t === 'S') return 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20';
    if (t.startsWith('A')) return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20';
    if (t.startsWith('B')) return 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20';
    if (t.startsWith('C')) return 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20';
    return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/20';
  };

  return (
    <Badge className={`w-8 h-8 rounded-full text-xs font-bold transition-transform duration-300 hover:scale-110 ${getBadgeStyle(tier)}`}>
      {tier}
    </Badge>
  );
};

export default TierBadge;