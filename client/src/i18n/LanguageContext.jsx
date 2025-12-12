import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('language');
      if (saved && translations[saved]) {
        return saved;
      }
    }
    return 'ar';
  });

  const t = translations[language];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.localStorage) {
        localStorage.setItem('language', language);
      }
      document.documentElement.dir = t.dir;
      document.documentElement.lang = language;
    }
  }, [language, t.dir]);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const toggleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex(l => l.code === language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIndex].code);
  };

  const getCurrentLanguage = () => {
    return LANGUAGES.find(l => l.code === language);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      toggleLanguage, 
      t,
      languages: LANGUAGES,
      currentLanguage: getCurrentLanguage()
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
