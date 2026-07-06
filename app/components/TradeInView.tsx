'use client';

import React, { useContext } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import TradeInCalculator from './TradeInCalculator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TradeInViewProps {
  onClose: () => void;
}

const TradeInView: React.FC<TradeInViewProps> = ({ onClose }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col overflow-hidden bg-white dark:bg-apple-gray-900 border border-white/10 rounded-3xl">
        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-white dark:bg-apple-gray-900">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                 <RotateCcw size={20} aria-hidden="true" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{t('tradeIn')}</DialogTitle>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estimate your upgrade cost</p>
              </DialogHeader>
           </div>
           <Button onClick={onClose} variant="outline" size="icon-sm" className="bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white" aria-label="Close">
              <X size={20} />
           </Button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-gray-50 dark:bg-black/20">
           <TradeInCalculator />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeInView;