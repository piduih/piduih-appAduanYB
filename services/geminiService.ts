
import { GoogleGenAI, Type } from "@google/genai";

// We strictly avoid global initialization of 'ai' to ensure we pick up the 
// latest API key selected by the user via window.aistudio.
// The API key is injected into process.env.API_KEY after selection.

export const suggestCategory = async (description: string): Promise<string> => {
  try {
    // Initialize the client immediately before use to grab the dynamic key
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Berdasarkan keterangan aduan berikut, kelaskan ke dalam salah satu kategori ini: "Infrastruktur", "Kebersihan", "Keselamatan", "Sosial", atau "Lain-lain".\n\nKeterangan: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: "Kategori aduan yang dicadangkan.",
            },
          },
          required: ["category"],
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.category || "Lain-lain";

  } catch (error) {
    console.error("Error suggesting category with Gemini:", error);
    
    // Check if the error is related to API Key validity
    if (error.toString().includes("API key not valid") || error.toString().includes("403")) {
        console.warn("API Key might be invalid or expired.");
    }
    
    return "Lain-lain"; // Fallback category
  }
};
