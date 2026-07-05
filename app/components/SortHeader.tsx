'use client';

// app/components/SortHeader.tsx v0.7.8
import React from 'react';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import { SortKey } from '../types';

interface SortHeaderProps {
  label: string;
  sortKey: SortKey;
  activeKey?: SortKey;
  direction?: 'asc' | 'desc';
  onSort?: (key: SortKey) => void;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

// Extracted to module level so React reuses the same component type across
// MacTable renders (a component defined inside the parent body remounts on every render).
const SortHeader: React.FC<SortHeaderProps> = ({
  label, sortKey, activeKey, direction, onSort, align = 'left', className = '',
}) => {
  const isActive = activeKey === sortKey;
  return (
    <div
      className={`flex items-center gap-1 cursor-pointer group ${className} ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'}`}
      onClick={() => onSort && onSort(sortKey)}
    >
      <span className={`transition-colors text-[10px] tracking-widest whitespace-nowrap ${isActive ? 'text-gray-900 dark:text-white font-black' : 'group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
        {label}
      </span>
      <span className="text-gray-400">
        {isActive ? (
          direction === 'asc' ? <ArrowUp size={10} strokeWidth={4} className="text-blue-500" /> : <ArrowDown size={10} strokeWidth={4} className="text-blue-500" />
        ) : (
          <ChevronsUpDown size={10} className="opacity-30 group-hover:opacity-100 transition-opacity" />
        )}
      </span>
    </div>
  );
};

export default React.memo(SortHeader);
