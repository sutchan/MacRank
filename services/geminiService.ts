import { GoogleGenAI } from "@google/genai";
import { MacModel } from '../lib/types';

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMacAdvice = async (
  query: string,
  contextData: MacModel[]
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';

    // Create a summarized context string to save tokens but provide necessary info
    const specsContext = contextData.map(m => 
      `- ${m.name} (${m.chip}, ${m.releaseYear}): Single-Core ${m.singleCoreScore}, Multi-Core ${m.multiCoreScore}, GPU ${m.metalScore}, Price ~$${m.basePriceUSD}`
    ).join('\n');

    const prompt = `
      You are an expert Apple Mac purchasing advisor and technical specialist.
      
      User Query: "${query}"

      Here is the technical data for the available Mac models in our current database (Top 20 most relevant):
      ${specsContext}

      Instructions:
      1. Answer the user's question directly and concisely.
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
        systemInstruction: "You are a helpful assistant specialized in Apple hardware hardware comparisons.",
        thinkingConfig: { thinkingBudget: 0 } // Low latency preferred for chat
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI brain right now. Please check your API key or try again later.";
  }
};