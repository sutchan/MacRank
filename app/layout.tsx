
// v0.3.1
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MacRank 2025: Apple Silicon M1/M2/M3/M4 Benchmark Leaderboard &amp; Tier List',
  description: 'The ultimate 2025 performance guide for Apple Mac computers. Compare Geekbench 6 &amp; Metal scores for M4 Max, M3, M2, M1 &amp; Intel models. AI-powered buying advice for MacBook Pro, Air, Mac Studio &amp; iMac.',
  keywords: ['Apple Silicon', 'M4 Max Benchmark', 'M3 Pro vs M4', 'Mac Tier List 2025', 'MacBook Performance Chart', 'Geekbench 6 Scores', 'Mac Buying Guide', 'MacRank', 'M1 vs M2 vs M3 vs M4', 'Mac Studio Ultra Benchmark'],
  authors: [{ name: 'MacRank' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: 'https://macrank.app/',
    title: 'MacRank 2025: Apple Silicon Performance Leaderboard',
    description: 'Compare M1/M2/M3/M4 benchmark scores. Find the best MacBook or Desktop for your workflow with our interactive tier list and AI advisor.',
    images: ['https://macrank.app/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://macrank.app/',
    title: 'MacRank 2025: Apple Silicon Performance Leaderboard',
    description: 'Detailed benchmarks for every Apple Silicon Mac and iPad. Interactive charts and comparison tools.',
    images: ['https://macrank.app/og-image.jpg'],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MacRank',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    &lt;html lang="en"&gt;
      &lt;head&gt;
        &lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-YKBHMQRHC8"&gt;&lt;/script&gt;
        &lt;script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YKBHMQRHC8');
          `
        }} /&gt;
        &lt;script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MacRank",
              "url": "https://macrank.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://macrank.app/?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "MacRank",
              "applicationCategory": "ReferenceApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "An interactive performance leaderboard and AI-powered purchasing advisor for Apple Mac computers and iPads, featuring Geekbench 6 and Metal benchmark data.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "150"
              },
              "featureList": "Apple Silicon Benchmarks, Mac Tier List, AI Buying Advisor, Performance Charts, Specs Comparison"
            },
            {
              "@context": "https://schema.org",
              "@type": "Dataset",
              "name": "Apple Silicon M-Series Benchmark Database 2025",
              "description": "A comprehensive collection of performance metrics for Apple M1, M2, M3, and M4 series chips, including Geekbench 6 Single-Core, Multi-Core, and Metal GPU scores.",
              "creator": {
                "@type": "Organization",
                "name": "MacRank"
              },
              "license": "https://creativecommons.org/licenses/by-sa/4.0/",
              "variableMeasured": ["Single-Core Score", "Multi-Core Score", "Metal Score", "Launch Price", "Release Year"]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the fastest Mac chip in 2025?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As of late 2024 and 2025, the Apple M4 Max chip features the highest mobile performance, achieving Multi-Core scores exceeding 26,000 in Geekbench 6."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does M4 compare to M1?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The M4 series represents a significant leap over the M1, with the M4 Max offering nearly double the CPU performance and substantially higher GPU capabilities compared to the original M1 Max, alongside improved power efficiency."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the Mac Studio M2 Ultra better than the Mac Pro?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Performance-wise, the Mac Studio M2 Ultra and Mac Pro M2 Ultra share the same chip and performance profile. The Mac Pro offers PCIe expansion slots, while the Mac Studio is a compact, non-expandable desktop at a lower price point."
                  }
                }
              ]
            }
          ])
        }} /&gt;
      &lt;/head&gt;
      &lt;body className="bg-gray-50 dark:bg-black text-gray-700 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden"&gt;
        {children}
      &lt;/body&gt;
    &lt;/html&gt;
  );
}
