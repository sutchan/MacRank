// app/components/Footer.tsx v0.8.0
import React, { useContext } from 'react';
import { Github, Heart } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';

interface FooterProps {
  version: string;
}

const Footer: React.FC<FooterProps> = ({ version }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;

  return (
    <footer id="app-footer" className="py-16 border-t border-border transition-colors bg-background/50 mt-12">
      <div id="footer-content" className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-8 text-center">

         <div className="flex flex-col items-center gap-4">
            <a
              href="https://github.com/sutchan/MacRank"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200 group text-sm font-medium shadow-sm hover:shadow-md"
              aria-label={t('view_on_github')}
            >
              <Github size={16} className="group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t('star_on_github')}</span>
            </a>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
               <span>Created by</span>
               <a href="https://github.com/sutchan" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">Sut</a>
               <Heart size={10} className="text-red-500 fill-current" aria-hidden="true" />
            </div>
         </div>

         <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">
              {t('footer_copyright')}
            </p>

            <div className="flex items-center justify-center gap-2">
               <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="font-mono text-xs text-muted-foreground tracking-wide uppercase">
                 v{version} • {t('stable')}
               </span>
            </div>
         </div>

         <div className="max-w-sm pt-4 border-t border-border w-full">
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              {t('footer_disclaimer')}
            </p>
         </div>

      </div>
    </footer>
  );
};

export default Footer;
