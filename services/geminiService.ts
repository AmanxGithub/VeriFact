import { GoogleGenAI } from "@google/genai";
import { FactCheckResult, Source, GroundingMetadata } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkFactWithGemini = async (statement: string): Promise<FactCheckResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a professional, objective fact-checker. 
        Analyze the following statement: "${statement}".
        
        Your response must start with a line explicitly stating the verdict in this format: "Verdict: [Status]", where [Status] is one of: True, False, Misleading, Mixed, or Unverified.
        
        After the verdict line, provide a clear, concise explanation of why this is the case, citing specific details. 
        
        Do not output JSON. Output natural text formatted with Markdown. 
        Used grounded information from Google Search to support your claims.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType cannot be JSON when using googleSearch
      },
    });

    const text = response.text || "No response generated.";
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata as GroundingMetadata | undefined;

    // Parse Sources from Grounding Metadata
    const sources: Source[] = [];
    if (groundingMetadata?.groundingChunks) {
      groundingMetadata.groundingChunks.forEach((chunk) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri,
          });
        }
      });
    }

    // Extract Verdict
    const verdictMatch = text.match(/^Verdict:\s*(True|False|Misleading|Mixed|Unverified)/i);
    let verdict: FactCheckResult['verdict'] = 'Unverified';
    let cleanText = text;

    if (verdictMatch && verdictMatch[1]) {
      const rawVerdict = verdictMatch[1].toLowerCase();
      // Capitalize first letter for type safety matching
      const formattedVerdict = rawVerdict.charAt(0).toUpperCase() + rawVerdict.slice(1);
      
      if (['True', 'False', 'Misleading', 'Mixed', 'Unverified'].includes(formattedVerdict)) {
        verdict = formattedVerdict as FactCheckResult['verdict'];
      }
      
      // Remove the "Verdict: ..." line from the display text for cleaner UI
      cleanText = text.replace(/^Verdict:.*$/im, '').trim();
    }

    // Remove citations markers like [1], [2] often returned by grounding if they clutter the view, 
    // though sometimes they are useful. Let's keep them if they exist, or clean them if they look broken.
    // For now, raw text is fine.

    return {
      text: cleanText,
      verdict,
      sources,
    };

  } catch (error) {
    console.error("Fact check failed:", error);
    throw new Error("Failed to verify the fact. Please try again.");
  }
};
