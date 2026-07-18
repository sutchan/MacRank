// app/hooks/useInteraction.ts v0.7.6
import { useState, useEffect, useRef, useCallback } from 'react';
import { macData, refData } from '../data/data';
import { parseUrlParams, updateUrlHash } from '../lib/urlParams';
import { MacModel } from '../types';

export const useInteraction = () => {
    const [selectedModel, setSelectedModel] = useState<MacModel | null>(null);
    const [compareList, setCompareList] = useState<MacModel[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const initialLoadRef = useRef(true);
    const [isTradeInOpen, setIsTradeInOpen] = useState(false);

    useEffect(() => {
        const params = parseUrlParams();
        
        if (params.compare?.length) {
            const list = macData.filter(m => params.compare!.includes(m.id)).slice(0, 2);
            setCompareList(list);
            if (list.length === 2) setIsCompareModalOpen(true);
        }

        if (params.model) {
            const found = [...macData, ...refData].find(m => m.id === params.model);
            if (found) setSelectedModel(found);
        }
        
        initialLoadRef.current = false;
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleCompare = useCallback((mac: MacModel) => {
        setCompareList(prev => {
            const exists = prev.some(p => p.id === mac.id);
            if (exists) {
                const updated = prev.filter(p => p.id !== mac.id);
                updateUrlHash({ compare: updated.map(m => m.id) });
                return updated;
            }
            if (prev.length < 2) {
                const updated = [...prev, mac];
                updateUrlHash({ compare: updated.map(m => m.id) });
                return updated;
            }
            return prev;
        });
    }, []);

    const setCompareListCallback = useCallback((value: MacModel[] | ((prev: MacModel[]) => MacModel[])) => {
        setCompareList(prev => {
            const updated = typeof value === 'function' ? value(prev) : value;
            updateUrlHash({ compare: updated.map(m => m.id) });
            return updated;
        });
    }, []);

    const setSelectedModelCallback = useCallback((model: MacModel | null) => {
        setSelectedModel(model);
        updateUrlHash({ model: model?.id || undefined });
    }, []);

    const handleShowToast = useCallback(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    }, []);

    return {
        selectedModel,
        setSelectedModel: setSelectedModelCallback,
        compareList,
        setCompareList: setCompareListCallback,
        handleToggleCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isTradeInOpen,
        setIsTradeInOpen,
        showBackToTop,
        showToast,
        handleShowToast,
        isInitialLoad: initialLoadRef.current
    };
};