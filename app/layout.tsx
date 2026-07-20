import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { TooltipProvider } from '@/components/ui/tooltip';
import { WebSiteStructuredData, SoftwareApplicationStructuredData, BreadcrumbStructuredData, FAQStructuredData } from '@/components/JsonLD';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const APP_VERSION = '0.8.0';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (!theme && prefersDark)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          `
        }} />

        {GA_ID && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* Primary Meta Tags */}
        <title>MacRank: Apple Mac Performance Leaderboard</title>
        <meta name="title" content={`MacRank: Apple Mac Performance Leaderboard v${APP_VERSION}`} />
        <meta name="description" content="Interactive Apple Mac performance ranking with AI buying assistant, hardware comparison, Geekbench 6 scores and value analysis." />
        <meta name="keywords" content="Mac ranking, Apple Silicon benchmarks, MacBook scores, M4 Max benchmarks, MacRank, Geekbench 6" />
        <meta name="author" content="MacRank" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0071E3" />
        <link rel="canonical" href="https://macrank.app/" />

        {/* Mobile App Meta Tags */}
        <meta name="application-name" content="MacRank" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MacRank" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macrank.app/" />
        <meta property="og:title" content={`MacRank: Mac Performance Leaderboard v${APP_VERSION}`} />
        <meta property="og:description" content="Interactive Apple Mac performance ranking with AI buying advisor." />
        <meta property="og:image" content="https://macrank.app/og-image.jpg" />
        <meta property="og:site_name" content="MacRank" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ja_JP" />
        <meta property="og:locale:alternate" content="de_DE" />
        <meta property="og:locale:alternate" content="es_ES" />
        <meta property="og:locale:alternate" content="fr_FR" />
        <meta property="og:locale:alternate" content="ko_KR" />
        <meta property="og:locale:alternate" content="pt_BR" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="hi_IN" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://macrank.app/" />
        <meta name="twitter:title" content={`MacRank: Mac Performance Leaderboard v${APP_VERSION}`} />
        <meta name="twitter:description" content="Interactive Apple Mac performance ranking with AI buying advisor." />
        <meta name="twitter:image" content="https://macrank.app/og-image.jpg" />
        <meta name="twitter:creator" content="@macrank" />
        <meta name="twitter:site" content="@macrank" />

        {/* GEO Meta Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Global" />
        <meta name="geo.position" content="37.0902;-95.7129" />
        <meta name="ICBM" content="37.0902, -95.7129" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="rating" content="general" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="1 days" />

        {/* Structured Data (JSON-LD) */}
        <WebSiteStructuredData version={APP_VERSION} />
        <SoftwareApplicationStructuredData version={APP_VERSION} />
        <BreadcrumbStructuredData />
        <FAQStructuredData />
      </head>
      <body className="bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
        <TooltipProvider delayDuration={300}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
};

export default RootLayout;
