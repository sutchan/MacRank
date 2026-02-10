import React, { useContext } from 'react';
import { Github } from 'lucide-react';
import { LanguageContext } from '../lib/translations';

interface FooterProps {
  version: string;
}

const Footer: React.FC<FooterProps> = ({ version }) => {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="text-xs text-gray-400 dark:text-gray-600 py-12 border-t border-gray-200 dark:border-gray-800 text-center">
       <p>{t('footer_disclaimer')}</p>
       <p className="mt-2">{t('footer_copyright')}</p>
       <div className="mt-6 flex flex-col items-center gap-3">
         <a 
           href="https://github.com/sutchan/MacRank" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200 group"
           aria-label="View on GitHub"
         >
           <Github size={16} className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
           <span className="font-medium">GitHub</span>
         </a>
         <span className="font-mono text-[10px] opacity-40">v{version}</span>
       </div>
    </footer>
  );
};

export default Footer;