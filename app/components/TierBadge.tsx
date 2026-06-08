'use client';

// app/components/TierBadge.tsx v0.7.6
import React from 'react';

interface TierBadgeProps {
  tier: string;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const getBadgeStyle = (t: string) => {
     // S+ - Gradient with glow animation
     if (t === 'S+') return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 animate-pulse';
     // S - Purple gradient
     if (t === 'S') return 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20';
     // A - Blue gradient
     if (t.startsWith('A')) return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20';
     // B - Green gradient
     if (t.startsWith('B')) return 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20';
     // C - Yellow/Amber gradient
     if (t.startsWith('C')) return 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20';
     // D - Gray gradient
     return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/20';
  };

  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 hover:scale-110 ${getBadgeStyle(tier)}`}>
      {tier}
    </span>
  );
};

export default TierBadge;