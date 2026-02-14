// Version: 0.3.4
import { GoogleGenAI } from "@google/genai";
import { MacModel } from '../lib/types';
import { translations, Language, formatCurrency } from '../lib/translations';

// Helper for offline logic: Calculate a simple relevance score for a query
const calculateRelevance = (query: string, model: MacModel): number => {
    const q = query.toLowerCase();
    const m = model.name.toLowerCase() + " " + model.chip.toLowerCase();
    let score = 0;
    
    // Exact chip match is high value
    if (m.includes(q)) score += 10;
    
    // Partial word matches
    const words = q.split(' ');
    words.forEach(w => {
        if (w.length > 2 && m.includes(w)) score += 1;
    });

    return score;
};

// Fallback logic when API is unreachable
const getOfflineAdvice = (query: string, contextData: MacModel[], language: Language = 'en'): string => {
    const t = translations[language] || translations['en'];
    const q = query.toLowerCase();
    
    // 1. Filter models based on query keywords
    const matches = contextData.filter(m => {
        const text = `${m.name} ${m.chip} ${m.type}`.toLowerCase();
        // Split query into terms, ignore common stop words
        const terms = q.split(' ').filter(w => w.length > 1 && !['the', 'is', 'a', 'for', 'vs', 'compare'].includes(w));
        // A model matches if it contains at least one specific term that isn't generic
        return terms.some(term => text.includes(term));
    });

    // 2. Sort matches by relevance (score or release year)
    matches.sort((a, b) => b.releaseYear - a.releaseYear || b.multiCoreScore - a.multiCoreScore);
    
    // Limit to top 3 matches for succinctness
    const topMatches = matches.slice(0, 3);

    if (topMatches.length === 0) {
        // If "best" or "top" is asked but no specific model, return top performers
        if (q.includes('best') || q.includes('fast') || q.includes('top')) {
             const topPerformers = [...contextData].sort((a,b) => b.multiCoreScore - a.multiCoreScore).slice(0, 3);
             let response = `${t['offline_response_prefix'] || 'Offline Mode:'}\n\n`;
             response += `**Top Performance Models:**\n`;
             topPerformers.forEach(m => {
                response += `- **${m.name}** (${m.chip}): Multi-Core ${m.multiCoreScore}, GPU ${m.metalScore}\n`;
             });
             return response;
        }
        return t['offline_no_match'] || "I couldn't find specific models in the local database.";
    }

    let response = `${t['offline_response_prefix'] || 'Offline Mode:'}\n\n`;

    topMatches.forEach(m => {
        response += `### ${m.name}\n`;
        response += `- **Chip**: ${m.chip} (${m.cores_cpu} CPU, ${m.cores_gpu} GPU)\n`;
        response += `- **Scores**: Single ${m.singleCoreScore}, Multi ${m.multiCoreScore}, Metal ${m.metalScore}\n`;
        response += `- **Price**: ${formatCurrency(m.basePriceUSD, language)}\n`;
        // Simple analysis based on keywords
        if (q.includes('cod') || q.includes('dev')) {
            response += `> *Dev Check*: ${m.memory} RAM. Multi-core score ${m.multiCoreScore} is ${m.multiCoreScore > 10000 ? 'great' : 'decent'} for compiling.\n`;
        } else if (q.includes('game') || q.includes('gpu') || q.includes('design')) {
            response += `> *Graphics Check*: Metal score ${m.metalScore}. ${m.metalScore > 50000 ? 'Excellent for heavy 3D.' : 'Good for basic creative work.'}\n`;
        }
        response += `\n`;
    });

    return response;
};

export const getMacAdvice = async (
  query: string,
  contextData: MacModel[],
  language: Language = 'en'
): Promise<string> => {
  // 1. Quick Check: Network Status
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return getOfflineAdvice(query, contextData, language);
  }

  try {
    // Guidelines: API key must be obtained exclusively from process.env.API_KEY and used directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';

    // OPTIMIZATION: Context Trimming
    const optimizedContext = [...contextData]
      .sort((a, b) => b.releaseYear - a.releaseYear || b.multiCoreScore - a.multiCoreScore)
      .slice(0, 40);

    const specsContext = optimizedContext.map(m => 
      `- ${m.name} (${m.chip}, ${m.releaseYear}): Single-Core ${m.singleCoreScore}, Multi-Core ${m.multiCoreScore}, GPU ${m.metalScore}, Price ~$${m.basePriceUSD}`
    ).join('\n');

    const langName = translations[language]?.appTitle === 'MacRank' && language !== 'en' 
        ? (language === 'zh' ? 'Chinese (Simplified)' : language) 
        : 'English';

    const prompt = `
      You are an expert Apple Mac purchasing advisor and technical specialist.
      
      User Query: "${query}"
      Target Language: ${langName}

      Here is the technical data for the available Mac models in our current database (Top 40 most relevant):
      ${specsContext}

      Instructions:
      1. Answer the user's question directly and concisely in **${langName}**.
      2. Use the provided data to support your arguments (quote scores or prices).
      3. If comparing, highlight the "sweet spot" for value vs performance.
      4. Keep the tone helpful, objective, and slightly enthusiastic about technology.
      5. If the user asks about a model not in the list, general knowledge is acceptable but mention it's not in the current comparison table.
      6. Format your response with Markdown (bolding key models, using lists for pros/cons).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful assistant specialized in Apple hardware comparisons.",
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for chat
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error (Falling back to offline mode):", error);
    // 2. Fallback: If API fails (e.g. key issue, quota, or network fluctuation), use offline logic
    return getOfflineAdvice(query, contextData, language);
  }
};
