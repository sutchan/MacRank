// app/components/TradeInView.tsx v0.8.0
import React, { useContext } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import TradeInCalculator from './TradeInCalculator';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TradeInViewProps {
  onClose: () => void;
}

const TradeInView: React.FC<TradeInViewProps> = ({ onClose }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-lg p-0 gap-0 overflow-hidden flex flex-col max-h-[90vh]" showCloseButton={false}>
        <div className="p-6 border-b border-border flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center text-chart-2" aria-hidden="true">
                 <RotateCcw size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{t('tradeIn')}</h2>
                <p className="text-xs text-muted-foreground">Estimate your upgrade cost</p>
              </div>
           </div>
           <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label={t('close')}>
              <X size={20} aria-hidden="true" />
           </Button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-muted">
           <TradeInCalculator />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeInView;
