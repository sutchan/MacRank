
import { useState, useEffect, useCallback, useMemo } from 'react';
import { translations, Language } from '../locales/translations';

const STORAGE_KEYS = {
  LANGUAGE: 'language',
  THEME: 'theme',
} as const;

const VALID_LANGUAGES: Language[] = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'pt', 'ru', 'ko', 'hi'];
const VALID_THEMES = ['light', 'dark'] as const;
type ValidTheme = typeof VALID_THEMES[number];

function safeLocalStorageGet(key: string): string | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (raw && typeof raw === 'string' && raw.length > 0 && raw.length < 512) {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // swallow - storage access or quota errors
  }
}

function validateLanguage(raw: string | null): Language | null {
  if (raw && VALID_LANGUAGES.includes(raw as Language)) {
    return raw as Language;
  }
  return null;
}

function validateTheme(raw: string | null): ValidTheme | null {
  if (raw && VALID_THEMES.includes(raw as ValidTheme)) {
    return raw as ValidTheme;
  }
  return null;
}

function detectSystemLanguage(): Language {
  if (typeof navigator !== 'undefined' && navigator.language) {
    const shortCode = navigator.language.split('-')[0] as Language;
    if (VALID_LANGUAGES.includes(shortCode)) {
      return shortCode;
    }
  }
  return 'zh';
}

function detectSystemTheme(): ValidTheme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export const useSettings = () => {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('zh');
  const [theme, setTheme] = useState<ValidTheme>('light');

  useEffect(() => {
    const storedLang = validateLanguage(safeLocalStorageGet(STORAGE_KEYS.LANGUAGE));
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      setLanguage(detectSystemLanguage());
    }

    const storedTheme = validateTheme(safeLocalStorageGet(STORAGE_KEYS.THEME));
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(detectSystemTheme());
    }

    setMounted(true);
  }, []);

  const t = useCallback((key: keyof typeof translations['en']): string => {
    const dict = translations[language] || translations['en'];
    const value = dict[key];
    if (typeof value === 'string') {
      return value;
    }
    const enValue = translations['en'][key];
    return typeof enValue === 'string' ? enValue : String(key);
  }, [language]);

  useEffect(() => {
    if (!mounted) return;

    safeLocalStorageSet(STORAGE_KEYS.LANGUAGE, language);

    const rawTitle = t('appTitle');
    if (typeof document !== 'undefined' && rawTitle) {
      document.title = rawTitle;
    }
  }, [language, t, mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (typeof document !== 'undefined' && document.documentElement) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    safeLocalStorageSet(STORAGE_KEYS.THEME, theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setThemeMode = useCallback((newTheme: ValidTheme) => {
    setTheme(newTheme);
  }, []);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    setThemeMode,
    mounted,
  }), [language, t, theme, toggleTheme, setThemeMode, mounted]);

  return value;
};
