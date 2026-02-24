// app/hooks/useInteraction.ts v0.6.0
import { useState, useEffect, useRef } from 'react';
import { macData, refData } from '../data/data';
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
        if (typeof window !== 'undefined' && window.location.hash) {
            const params = new URLSearchParams(window.location.hash.substring(1));
            const compareIds = params.get('compare')?.split(',').filter(Boolean) || [];
            const modelId = params.get('model') || null;

            if (compareIds.length > 0) {
                const list = macData.filter(m => compareIds.includes(m.id)).slice(0, 2);
                setCompareList(list);
                if (list.length === 2) setIsCompareModalOpen(true);
            }

            if (modelId) {
                const found = [...macData, ...refData].find(m => m.id === modelId);
                if (found) setSelectedModel(found);
            }
        }
        initialLoadRef.current = false;
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleCompare = (mac: MacModel) => {
        setCompareList(prev => {
            const exists = prev.some(p => p.id === mac.id);
            if (exists) return prev.filter(p => p.id !== mac.id);
            if (prev.length < 2) return [...prev, mac];
            return prev;
        });
    };

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    }

    return {
        selectedModel,
        setSelectedModel,
        compareList,
        setCompareList,
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