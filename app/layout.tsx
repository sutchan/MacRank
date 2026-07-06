import React from 'react';
import { Inter, JetBrains_Mono, Geist } from 'next/font/google';
import Script from 'next/script';
import '../app/globals.css';
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={cn(jetbrainsMono.variable, "font-sans", geist.variable, "dark:[color-scheme:dark]")} suppressHydrationWarning>
      <head>
        {/* 安全说明: 主题检测脚本使用 dangerouslySetInnerHTML 是为了避免 FOUC (闪烁)。
            该脚本内容为硬编码常量，不包含任何用户输入，因此不存在 XSS 风险。
            (REACT-XSS-001: 此处内容为可信静态代码) */}
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

        {/* Google Analytics - GA Measurement ID 通过环境变量配置 (NEXT-SECRETS-001) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#F9FAFB" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        
        {/* Primary Meta Tags */}
        <title>MacRank 2025: 苹果电脑性能天梯榜 v0.7.8</title>
        <meta name="title" content="MacRank 2025: 苹果电脑性能天梯榜 v0.7.8" />
        <meta name="description" content="最全的苹果电脑性能天梯查询表。包含 AI 选购助手、硬件深度对比、Geekbench 6 跑分与性价比分析。版本: 0.7.8" />
        <meta name="keywords" content="苹果性能天梯, Mac天梯图, MacBook跑分, M4 Max跑分, Apple Silicon排行榜, MacRank" />
        <meta name="author" content="MacRank" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://macrank.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macrank.app/" />
        <meta property="og:title" content="MacRank 2025: Mac 性能天梯榜 v0.7.8" />
        <meta property="og:description" content="交互式苹果电脑性能排名与 AI 选购顾问。" />
        <meta property="og:image" content="https://macrank.app/og-image.jpg" />
      </head>
      <body className="bg-gray-50 dark:bg-black text-gray-700 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
};

export default RootLayout;