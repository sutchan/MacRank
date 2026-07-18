
// app/services/geminiService.ts v0.5.2
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { MacModel } from '../types';
import { translations, Language, formatCurrency, languages } from '../locales/translations';

const MODEL_NAME = 'gemini-3-flash-preview';

/**
 * Provides fallback advice when the Gemini API is unavailable.
 */
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
             const topPerformers = [...contextData].sort((a,b) => b.multiCoreScore - a.multiCoreScore).slice(0, 3);
             const responseParts = [
                t['offline_response_prefix'],
                `**Top Performance Models:**`
             ];
             topPerformers.forEach(m => {
                responseParts.push(`- **${m.name}** (${m.chip}): Multi-Core ${m.multiCoreScore}, GPU ${m.metalScore}`);
             });
             return responseParts.join('\n');
        }
        return t['offline_no_match'] || "I couldn't find specific models in the local database.";
    }

    const responseParts: string[] = [t['offline_response_prefix']];

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

/**
 * Fetches advice from the Google Gemini API.
 */
export const getMacAdvice = async (
  query: string,
  contextData: MacModel[],
  language: Language = 'en'
): Promise<string> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return getOfflineAdvice(query, contextData, language);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const optimizedContext = [...contextData]
      .sort((a, b) => b.releaseYear - a.releaseYear || b.multiCoreScore - a.multiCoreScore)
      .slice(0, 45);

    const specsContext = optimizedContext.map(m => {
      const price = m.currentPriceUSD || m.basePriceUSD;
      return `- ${m.name} (${m.chip}, ${m.releaseYear}): Single-Core ${m.singleCoreScore}, Multi-Core ${m.multiCoreScore}, GPU ${m.metalScore}, Current Price ~$${price}, Value Score: ${m.valueScore || 'N/A'}`;
    }).join('\n');
    
    const langInfo = languages.find(l => l.code === language);
    const langName = langInfo ? langInfo.label : 'English';

    const systemInstruction = `You are "MacRank Advisor", a world-class Apple hardware expert.
      Your goal: Help users select the best Mac based on technical benchmarks and real-time value analysis.
      
      RULES:
      1. Respond in **${langName}**.
      2. Use Markdown: **Bold** for models, \`code\` for scores, and tables for comparisons.
      3. For "M5" models, clearly state they are "industry-based predictions".
      4. Use the provided "Value Score" (Performance per $100) to justify recommendations. Higher is better.
      5. Mention if a model has a "Current Price" lower than its "Base Price" (indicating a discount).
      6. Always reference specific Geekbench 6 scores from the provided data.
      7. Be concise. Avoid fluff. Focus on ROI (Return on Investment) for the user's specific use case (Coding, Design, Office).`;

    const contents = `
      User Query: "${query}"

      --- HARDWARE DATABASE (Context) ---
      ${specsContext}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
      }
    });

    return response.text || "I apologize, but I couldn't generate advice right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getOfflineAdvice(query, contextData, language);
  }
};
