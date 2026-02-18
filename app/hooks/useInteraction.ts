// app/hooks/useInteraction.ts v0.6.0
import { useState, useEffect, useRef } from 'react';
import { macData, refData } from '../data/data';
import { MacModel } from '../types';

const getInitialStateFromURL = () => {
  if (typeof window === 'undefined') return { compareIds: [] as string[], modelId: null as string | null };
  const params = new URLSearchParams(window.location.hash.substring(1));
  return {
    compareIds: params.get('compare')?.split(',').filter(Boolean) || [],
    modelId: params.get('model') || null,
  };
};

export const useInteraction = () => {
    const [initialState] = useState(() => getInitialStateFromURL());
    const [selectedModel, setSelectedModel] = useState<MacModel | null>(null);
    const [compareList, setCompareList] = useState<MacModel[]>(() => macData.filter(m => initialState.compareIds.includes(m.id)).slice(0, 2));
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const initialLoadRef = useRef(true);

    useEffect(() => {
        if (initialLoadRef.current) {
            if (compareList.length === 2) setIsCompareModalOpen(true);
            if (initialState.modelId) {
                const found = [...macData, ...refData].find(m => m.id === initialState.modelId);
                if (found) setSelectedModel(found);
            }
            initialLoadRef.current = false;
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        showBackToTop,
        showToast,
        handleShowToast,
        isInitialLoad: initialLoadRef.current
    };
};