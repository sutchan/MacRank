// app/components/TierBadge.tsx v0.8.0
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TierBadgeProps {
  tier: string;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const getBadgeStyle = (t: string) => {
     if (t === 'S+') return 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm border-transparent tier-s-plus';
     if (t === 'S') return 'bg-purple-100 text-purple-700';
     if (t.startsWith('A')) return 'bg-blue-100 text-blue-700';
     if (t.startsWith('B')) return 'bg-green-100 text-green-700';
     if (t.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
     return 'bg-muted text-muted-foreground';
  };

  return (
    <Badge
      variant="default"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-transform hover:scale-110 ${getBadgeStyle(tier)}`}
    >
      {tier}
    </Badge>
  );
};

export default TierBadge;
