// app/hooks/useSettings.ts v0.6.0
import { useState, useEffect, useCallback } from 'react';
import { translations, Language } from '../locales/translations';

export const useSettings = () => {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem('language');
    if (storedLang && translations[storedLang as Language]) {
      setLanguage(storedLang as Language);
    } else {
      const systemLang = navigator.language.split('-')[0] as Language;
      if (translations[systemLang]) {
        setLanguage(systemLang);
      } else {
        setLanguage('zh');
      }
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark');
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  const t = useCallback((key: keyof typeof translations['en']) => {
    const dict = (translations[language] || translations['en']) as any;
    return dict[key] || (translations['en'] as any)[key] || key;
  }, [language]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.title = `${t('appTitle')}`;
    }
  }, [language, t, mounted]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return {
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    mounted,
  };
};