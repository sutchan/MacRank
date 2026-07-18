// app/components/TradeInCalculator.tsx v0.8.0
import React, { useState, useContext, useMemo } from 'react';
import { LanguageContext, LanguageContextType, formatCurrency } from '../locales/translations';
import { macData } from '../data/data';
import { estimateTradeInValue } from '../services/priceService';
import { MacModel } from '../types';
import { Calculator, ArrowRight, TrendingDown, Wallet } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="bg-muted rounded-3xl p-6 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary" aria-hidden="true">
          <Calculator size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">{t('tradeInCalc')}</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('value_desc')}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Select Old Mac */}
        <div>
          <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">
            {t('selectOldMac')}
          </label>
          <Select value={selectedOldId} onValueChange={setSelectedOldId}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder={`-- ${t('selectToCompare')} --`} />
            </SelectTrigger>
            <SelectContent>
              {[...macData].sort((a, b) => b.releaseYear - a.releaseYear).map(m => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name} ({m.releaseYear})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background p-4 rounded-2xl border border-border">
            <div className="flex items-center gap-2 mb-1 text-muted-foreground">
              <TrendingDown size={14} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-tight">{t('estimatedValue')}</span>
            </div>
            <span className="text-lg font-black text-chart-2 tabular-nums">
              {formatCurrency(estimatedValue, language)}
            </span>
          </div>

          <div className="bg-background p-4 rounded-2xl border border-border">
            <div className="flex items-center gap-2 mb-1 text-muted-foreground">
              <Wallet size={14} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-tight">{t('netCost')}</span>
            </div>
            <span className="text-lg font-black text-primary tabular-nums">
              {formatCurrency(netCost, language)}
            </span>
          </div>
        </div>

        {/* Target Summary */}
        {targetMac && (
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">{t('upgradeTo')}</span>
              <span className="text-xs font-bold text-foreground">{targetMac.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-foreground">
                  {formatCurrency(targetPrice, language)}
                </span>
              </div>
              <ArrowRight size={16} className="text-primary" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeInCalculator;
