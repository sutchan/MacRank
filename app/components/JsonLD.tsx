import React from 'react';

/**
 * JSON-LD Structured Data for MacRank
 * @see https://schema.org/
 */

interface StructuredDataProps {
  version: string;
}

export const WebSiteStructuredData: React.FC<StructuredDataProps> = ({ version }) => {
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MacRank",
    "alternateName": "MacRank - Apple Mac Performance Leaderboard",
    "url": "https://macrank.app",
    "description": "Interactive Apple Mac performance ranking with AI buying assistant, hardware comparison, Geekbench 6 scores and value analysis.",
    "inLanguage": "en",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://macrank.app/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MacRank",
      "url": "https://macrank.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://macrank.app/icon.svg",
        "width": 512,
        "height": 512
      }
    },
    "version": version,
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
    />
  );
};

export const SoftwareApplicationStructuredData: React.FC<StructuredDataProps> = ({ version }) => {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MacRank",
    "applicationCategory": "Utilities,Reference",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "description": "Interactive Apple Mac performance ranking with AI buying assistant, hardware comparison, Geekbench 6 scores and value analysis.",
    "url": "https://macrank.app",
    "version": version,
    "author": {
      "@type": "Organization",
      "name": "MacRank Team"
    },
    "featureList": [
      "Apple Mac performance ranking",
      "Geekbench 6 benchmark scores",
      "AI buying assistant",
      "Hardware comparison tool",
      "Value analysis",
      "Trade-in calculator"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
  );
};

export const BreadcrumbStructuredData: React.FC = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://macrank.app"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
};

/**
 * FAQ Schema for common questions about MacRank
 */
export const FAQStructuredData: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is MacRank?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MacRank is an interactive Apple Mac performance ranking tool that helps users compare Mac computers using Geekbench 6 scores, value analysis, and an AI buying assistant."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the benchmark scores?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All benchmark scores are sourced from Geekbench 6 official results and updated regularly to reflect the latest hardware performance data."
        }
      },
      {
        "@type": "Question",
        "name": "Is MacRank free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, MacRank is completely free to use with no registration required."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};