// app/components/TradeInCalculator.tsx v0.7.0
import React, { useState, useContext, useMemo } from 'react';
import { LanguageContext, LanguageContextType, formatCurrency } from '../locales/translations';
import { macData } from '../data/data';
import { estimateTradeInValue } from '../services/priceService';
import { MacModel } from '../types';
import { Calculator, ArrowRight, TrendingDown, Wallet } from 'lucide-react';

interface TradeInCalculatorProps {
  targetMac?: MacModel | null;
}

const TradeInCalculator: React.FC<TradeInCalculatorProps> = ({ targetMac }) => {
  const { t, language } = useContext(LanguageContext) as LanguageContextType;
  const [selectedOldId, setSelectedOldId] = useState<string>('');
  
  const oldMac = useMemo(() => macData.find(m => m.id === selectedOldId), [selectedOldId]);
  const estimatedValue = useMemo(() => {
    if (!oldMac) return 0;
    return estimateTradeInValue(oldMac.basePriceUSD, oldMac.releaseYear);
  }, [oldMac]);

  const targetPrice = targetMac?.currentPriceUSD || targetMac?.basePriceUSD || 0;
  const netCost = Math.max(0, targetPrice - estimatedValue);

  return (
    <div className="bg-gray-50 dark:bg-apple-gray-850 rounded-3xl p-6 border border-gray-200 dark:border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
          <Calculator size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">{t('tradeInCalc')}</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{t('value_desc')}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Select Old Mac */}
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            {t('selectOldMac')}
          </label>
          <select
            value={selectedOldId}
            onChange={(e) => setSelectedOldId(e.target.value)}
            className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="">-- {t('selectToCompare')} --</option>
            {[...macData].sort((a, b) => b.releaseYear - a.releaseYear).map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.releaseYear})
              </option>
            ))}
          </select>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-1 text-gray-400">
              <TrendingDown size={14} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{t('estimatedValue')}</span>
            </div>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
              {formatCurrency(estimatedValue, language)}
            </span>
          </div>

          <div className="bg-white dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-1 text-gray-400">
              <Wallet size={14} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{t('netCost')}</span>
            </div>
            <span className="text-lg font-black text-blue-600 dark:text-blue-400 tabular-nums">
              {formatCurrency(netCost, language)}
            </span>
          </div>
        </div>

        {/* Target Summary */}
        {targetMac && (
          <div className="flex items-center justify-between p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-0.5">{t('upgradeTo')}</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white">{targetMac.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-gray-900 dark:text-white">
                  {formatCurrency(targetPrice, language)}
                </span>
              </div>
              <ArrowRight size={16} className="text-blue-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeInCalculator;
