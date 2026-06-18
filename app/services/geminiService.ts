
import { MacModel } from '../types';
import { translations, Language, formatCurrency } from '../locales/translations';

const MAX_QUERY_LENGTH = 500;
const MAX_CONTEXT_ITEMS = 45;

function sanitizeInput(input: string): string {
  return input
    .slice(0, MAX_QUERY_LENGTH)
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();
}

const getOfflineAdvice = (query: string, contextData: MacModel[], language: Language = 'en'): string => {
  const t = translations[language] || translations['en'];
  const q = query.toLowerCase();

  const matches = contextData.filter(m => {
    const text = `${m.name} ${m.chip} ${m.type}`.toLowerCase();
    const terms = q.split(' ').filter(w => w.length > 1 && !['the', 'is', 'a', 'for', 'vs', 'compare'].includes(w));
    return terms.some(term => text.includes(term));
  });

  matches.sort((a, b) => b.releaseYear - a.releaseYear || b.multiCoreScore - a.multiCoreScore);

  const topMatches = matches.slice(0, 3);

  if (topMatches.length === 0) {
    if (q.includes('best') || q.includes('fast') || q.includes('top')) {
      const topPerformers = [...contextData].sort((a, b) => b.multiCoreScore - a.multiCoreScore).slice(0, 3);
      const responseParts = [
        t['offline_response_prefix'] || '(Offline mode)',
        `**Top Performance Models:**`
      ];
      topPerformers.forEach(m => {
        responseParts.push(`- **${m.name}** (${m.chip}): Multi-Core ${m.multiCoreScore}, GPU ${m.metalScore}`);
      });
      return responseParts.join('\n');
    }
    return t['offline_no_match'] || "I couldn't find specific models in the local database.";
  }

  const responseParts: string[] = [t['offline_response_prefix'] || '(Offline mode)'];

  topMatches.forEach(m => {
    const price = m.currentPriceUSD || m.basePriceUSD;
    const details = [
      `### ${m.name}`,
      `- **Chip**: ${m.chip} (${m.cores_cpu} CPU, ${m.cores_gpu} GPU)`,
      `- **Scores**: Single ${m.singleCoreScore}, Multi ${m.multiCoreScore}, Metal ${m.metalScore}`,
      `- **Price**: ${formatCurrency(price, language)}${m.currentPriceUSD && m.currentPriceUSD < m.basePriceUSD ? ' (Discounted)' : ''}`,
      `- **Value Score**: ${m.valueScore || 'N/A'} pts/$100`
    ];

    if (q.includes('cod') || q.includes('dev')) {
      details.push(`> *Dev Check*: ${m.memory} RAM. Multi-core score ${m.multiCoreScore} is ${m.multiCoreScore > 10000 ? 'great' : 'decent'} for compiling.`);
    } else if (q.includes('game') || q.includes('gpu') || q.includes('design')) {
      details.push(`> *Graphics Check*: Metal score ${m.metalScore}. ${m.metalScore > 50000 ? 'Excellent for heavy 3D.' : 'Good for basic creative work.'}`);
    }
    responseParts.push(details.join('\n'));
  });

  return responseParts.join('\n\n');
};

export const getMacAdvice = async (
  query: string,
  contextData: MacModel[],
  language: Language = 'en'
): Promise<string> => {
  const sanitizedQuery = sanitizeInput(query);

  if (!sanitizedQuery) {
    return getOfflineAdvice(query, contextData, language);
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return getOfflineAdvice(sanitizedQuery, contextData, language);
  }

  const trimmedContext = [...contextData].slice(0, MAX_CONTEXT_ITEMS);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: sanitizedQuery,
        contextData: trimmedContext,
        language,
      }),
    });

    if (response.status === 429) {
      return getOfflineAdvice(sanitizedQuery, contextData, language);
    }

    if (!response.ok) {
      return getOfflineAdvice(sanitizedQuery, contextData, language);
    }

    const data = await response.json();

    if (data && typeof data.text === 'string') {
      return data.text;
    }

    return getOfflineAdvice(sanitizedQuery, contextData, language);
  } catch {
    return getOfflineAdvice(sanitizedQuery, contextData, language);
  }
};
