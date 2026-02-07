import { GoogleGenAI } from "@google/genai";
import { MacModel } from '../lib/types';
import { translations, Language } from '../lib/translations';

export const getMacAdvice = async (
  query: string,
  contextData: MacModel[],
  language: Language = 'en'
): Promise<string> => {
  try {
    // FIX: Initialize client lazily inside the function.
    // This prevents the entire app from crashing on load if the API key is missing in the environment.
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("API Key is missing. Please check your .env file or deployment settings.");
      return language === 'zh' 
        ? "系统配置错误：未检测到 API Key。请联系管理员或检查部署设置。"
        : "Configuration Error: API Key is missing. Please check deployment settings.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-flash-preview';

    // OPTIMIZATION: Context Trimming
    // Sort by release year (newest first) and then by performance to ensure the AI sees the most relevant models.
    // Limit to top 40 items to avoid hitting token limits or increasing latency.
    const optimizedContext = [...contextData]
      .sort((a, b) => b.releaseYear - a.releaseYear || b.multiCoreScore - a.multiCoreScore)
      .slice(0, 40);

    // Create a summarized context string
    const specsContext = optimizedContext.map(m => 
      `- ${m.name} (${m.chip}, ${m.releaseYear}): Single-Core ${m.singleCoreScore}, Multi-Core ${m.multiCoreScore}, GPU ${m.metalScore}, Price ~$${m.basePriceUSD}`
    ).join('\n');

    // Get the language name for the prompt
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
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI brain right now. Please check your API key or try again later.";
  }
};