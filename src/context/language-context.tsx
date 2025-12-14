'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { i18n } from '../../i18n.config';

// Import all locale data
import en from '@/locales/en.json';
import ta from '@/locales/ta.json';
import hi from '@/locales/hi.json';
import te from '@/locales/te.json';
import ml from '@/locales/ml.json';
import kn from '@/locales/kn.json';

type Locale = typeof i18n['locales'][number];

// Define a type for your translations
type Translations = { [key: string]: string };

const translations: Record<Locale, Translations> = {
  en,
  ta,
  hi,
  te,
  ml,
  kn
};

interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Locale>(i18n.defaultLocale);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Locale;
    if (storedLanguage && i18n.locales.includes(storedLanguage)) {
      setLanguage(storedLanguage);
    }
    setLoaded(true);
  }, []);

  const handleSetLanguage = (newLanguage: Locale) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  if (!loaded) {
      return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
