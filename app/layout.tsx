import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import '../app/globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YKBHMQRHC8" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YKBHMQRHC8');
          `}
        </Script>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        
        {/* Primary Meta Tags */}
        <title>MacRank 2025: 苹果电脑性能天梯榜 v0.7.0</title>
        <meta name="title" content="MacRank 2025: 苹果电脑性能天梯榜 v0.7.0" />
        <meta name="description" content="最全的苹果电脑性能天梯查询表。包含 AI 选购助手、硬件深度对比、Geekbench 6 跑分与性价比分析。版本: 0.7.0" />
        <meta name="keywords" content="苹果性能天梯, Mac天梯图, MacBook跑分, M4 Max跑分, Apple Silicon排行榜, MacRank" />
        <meta name="author" content="MacRank" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://macrank.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macrank.app/" />
        <meta property="og:title" content="MacRank 2025: Mac 性能天梯榜 v0.7.0" />
        <meta property="og:description" content="交互式苹果电脑性能排名与 AI 选购顾问。" />
        <meta property="og:image" content="https://macrank.app/og-image.jpg" />
      </head>
      <body className="bg-gray-50 dark:bg-black text-gray-700 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
