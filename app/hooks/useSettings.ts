// app/hooks/useSettings.ts v0.6.0
import { useState, useEffect, useCallback } from 'react';
import { translations, Language } from '../locales/translations';

export const useSettings = () => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem('language');
    if (stored && translations[stored as Language]) return stored as Language;
    const systemLang = navigator.language.split('-')[0] as Language;
    if (translations[systemLang]) return systemLang;
    return 'zh';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored) return stored as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const t = useCallback((key: keyof typeof translations['en']) => {
    const dict = (translations[language] || translations['en']) as any;
    return dict[key] || (translations['en'] as any)[key] || key;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.title = `${t('appTitle')}`;
  }, [language, t]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return {
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
  };
};