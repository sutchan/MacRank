// Version: 0.3.4
import React, { useContext } from 'react';
import { Github } from 'lucide-react';
import { LanguageContext } from '../lib/translations';

interface FooterProps {
  version: string;
}

const Footer: React.FC<FooterProps> = ({ version }) => {
  const { t } = useContext(LanguageContext);

  return (
    <footer id="app-footer" className="py-16 border-t border-gray-200 dark:border-gray-800 transition-colors bg-white/50 dark:bg-black/20 mt-12">
      <div id="footer-content" className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-8 text-center">
         
         {/* Top: Primary Action */}
         <div>
            <a 
              href="https://github.com/sutchan/MacRank" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-all duration-200 group text-sm font-medium shadow-sm hover:shadow-md"
              aria-label={t('view_on_github')}
            >
              <Github size={16} className="group-hover:scale-110 transition-transform" />
              <span>{t('star_on_github')}</span>
            </a>
         </div>

         {/* Middle: Brand & Version Info */}
         <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {t('footer_copyright')}
            </p>
            
            <div className="flex items-center justify-center gap-2">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="font-mono text-xs text-gray-400 dark:text-gray-600 tracking-wide uppercase">
                 v{version} • {t('stable')}
               </span>
            </div>
         </div>

         {/* Bottom: Disclaimer (Low contrast) */}
         <div className="max-w-sm pt-4 border-t border-gray-100 dark:border-gray-800/50 w-full">
            <p className="text-[10px] leading-relaxed text-gray-400 dark:text-gray-600">
              {t('footer_disclaimer')}
            </p>
         </div>

      </div>
    </footer>
  );
};

export default Footer;
