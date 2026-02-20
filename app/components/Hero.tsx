
import React, { useContext } from 'react';
import { LanguageContext } from '../lib/translations';

const Hero: React.FC = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div id="hero-section" className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
       <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
         {t('heroTitle')}
       </h1>
       <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
         {t('heroSubtitle')}
       </p>
    </div>
  );
};

export default Hero;
