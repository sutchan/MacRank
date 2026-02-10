
import React, { useContext } from 'react';
import { Github } from 'lucide-react';
import { LanguageContext } from '../lib/translations';

interface FooterProps {
  version: string;
}

const Footer: React.FC<FooterProps> = ({ version }) => {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
         
         {/* Disclaimer */}
         <p className="text-[10px] md:text-xs leading-relaxed text-gray-400 dark:text-gray-500 max-w-lg mx-auto">
           {t('footer_disclaimer')}
         </p>

         {/* Social / Actions */}
         <div className="flex items-center justify-center">
            <a 
              href="https://github.com/sutchan/MacRank" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-all duration-200 group text-xs font-medium"
              aria-label={t('view_on_github')}
            >
              <Github size={14} className="group-hover:scale-110 transition-transform" />
              <span>{t('star_on_github')}</span>
            </a>
         </div>

         {/* Copyright & Version */}
         <div className="flex flex-col items-center gap-1.5">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {t('footer_copyright')}
            </p>
            <div className="flex items-center gap-2">
               <span className="w-1 h-1 rounded-full bg-green-500"></span>
               <p className="font-mono text-[10px] text-gray-400 dark:text-gray-600">
                 v{version} • {t('stable')}
               </p>
            </div>
         </div>

      </div>
    </footer>
  );
};

export default Footer;
