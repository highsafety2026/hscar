import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('language');
      return saved || 'ar';
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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
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
