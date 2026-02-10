import { createContext } from 'react';
import { en } from './locales/en';
import { zh } from './locales/zh';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { ja } from './locales/ja';
import { pt } from './locales/pt';
import { ru } from './locales/ru';
import { ko } from './locales/ko';
import { hi } from './locales/hi';

export type Language = 'en' | 'zh' | 'es' | 'fr' | 'de' | 'ja' | 'pt' | 'ru' | 'ko' | 'hi';

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

// Approximate exchange rates relative to USD (1.0)
const currencyMap: Record<Language, { rate: number; symbol: string; code: string }> = {
  en: { rate: 1, symbol: '$', code: 'USD' },
  zh: { rate: 7.2, symbol: '¥', code: 'CNY' },
  es: { rate: 0.92, symbol: '€', code: 'EUR' },
  fr: { rate: 0.92, symbol: '€', code: 'EUR' },
  de: { rate: 0.92, symbol: '€', code: 'EUR' },
  ja: { rate: 150, symbol: '¥', code: 'JPY' },
  pt: { rate: 5.0, symbol: 'R$', code: 'BRL' },
  ru: { rate: 92, symbol: '₽', code: 'RUB' },
  ko: { rate: 1380, symbol: '₩', code: 'KRW' },
  hi: { rate: 84, symbol: '₹', code: 'INR' },
};

export const formatCurrency = (priceUSD: number, language: Language) => {
  const { rate, symbol, code } = currencyMap[language] || currencyMap['en'];
  const converted = Math.round(priceUSD * rate);
  
  // Format with commas
  const formattedNumber = new Intl.NumberFormat(language === 'en' ? 'en-US' : language).format(converted);
  
  return `${symbol}${formattedNumber}`;
};

export const translations = {
  en, zh, es, fr, de, ja, pt, ru, ko, hi
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => translations['en'][key] || String(key),
});