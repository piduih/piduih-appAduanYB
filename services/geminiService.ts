import { GoogleGenAI, Type } from "@google/genai";

// FIX: Aligned with Gemini API guidelines by removing manual API key checks and
// using process.env.API_KEY directly for initialization. The API key is
// assumed to be present, and any errors (like a missing key) will be handled
// by the try/catch block below.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const suggestCategory = async (description: string): Promise<string> => {
  try {
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
    return "Lain-lain"; // Fallback category
  }
};
