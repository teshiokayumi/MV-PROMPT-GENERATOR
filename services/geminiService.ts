
import { GoogleGenAI, Type } from "@google/genai";
import { PromptConfig, GenerationResult } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export const generateMvPrompts = async (config: PromptConfig): Promise<GenerationResult[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Total Duration: ${config.duration} seconds
    Style: ${config.style}
    Character Settings: ${config.character || "Standard character"}
    Lyrics:
    ${config.lyrics}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timestamp: { type: Type.STRING },
              prompt: { type: Type.STRING },
              keywordsJp: { type: Type.STRING }
            },
            required: ["timestamp", "prompt", "keywordsJp"]
          }
        }
      }
    });

    const resultText = response.text || "[]";
    return JSON.parse(resultText) as GenerationResult[];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("プロンプトの生成に失敗しました。APIキーまたはネットワークを確認してください。");
  }
};
