import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { TooltipProvider } from '@/components/ui/tooltip';
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

        {/* Primary Meta Tags */}
        <title>MacRank: Apple Mac Performance Leaderboard</title>
        <meta name="title" content={`MacRank: Apple Mac Performance Leaderboard v${APP_VERSION}`} />
        <meta name="description" content="Interactive Apple Mac performance ranking with AI buying assistant, hardware comparison, Geekbench 6 scores and value analysis." />
        <meta name="keywords" content="Mac ranking, Apple Silicon benchmarks, MacBook scores, M4 Max benchmarks, MacRank, Geekbench 6" />
        <meta name="author" content="MacRank" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0071E3" />
        <link rel="canonical" href="https://macrank.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macrank.app/" />
        <meta property="og:title" content={`MacRank: Mac Performance Leaderboard v${APP_VERSION}`} />
        <meta property="og:description" content="Interactive Apple Mac performance ranking with AI buying advisor." />
        <meta property="og:image" content="https://macrank.app/og-image.jpg" />
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
