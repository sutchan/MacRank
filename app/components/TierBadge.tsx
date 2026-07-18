// app/components/TierBadge.tsx v0.3.25
import React from 'react';

interface TierBadgeProps {
  tier: string;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const getBadgeStyle = (t: string) => {
     if (t === 'S+') return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm border-transparent tier-s-plus'; 
     if (t === 'S') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
     if (t.startsWith('A')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
     if (t.startsWith('B')) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
     if (t.startsWith('C')) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
     return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-transform hover:scale-110 ${getBadgeStyle(tier)}`}>
      {tier}
    </span>
  );
};

export default TierBadge;