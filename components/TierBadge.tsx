import React from 'react';
import { getTierColor } from '../lib/data';

interface TierBadgeProps {
  tier: string;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const colorClass = getTierColor(tier);
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold shadow-sm ${colorClass}`}>
      {tier}
    </span>
  );
};

export default TierBadge;